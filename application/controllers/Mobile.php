<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mobile extends CI_Controller {
    function __construct(){
        parent::__construct();
        $this->load->library('qdata');		
        $this->load->model('Queries');
        $this->load->library('Session');
        $this->load->helper('url');

        $this->qdata->_setBaseUrl(base_url());
        $this->_=array();
        // $this->load->library('pdf');
    }
    public function index(){
        return print_r($this->qdata->_getNKT("memb",false));
        // return print_r($kdMember);
        if($kdMember!=null) {
            return redirect("control/dashboard/null");
        }
        $this->_['page']="beranda";
        $this->_['html']=$this->qdata->_html("SBM","Sistem Busnis Modern",0);
		$this->load->view('index',$this->_);
    }
    function checkLogin($val){
       
	    $baseEND=json_decode((base64_decode($val)));
        $nama       =$baseEND->{'nama'};
        $password   =$baseEND->{'password'};
        $q="select 
                *,
                '".$this->qdata->_backCode($this->encryption->encrypt($this->qdata->_isCode()))."' as code from member 
            where UPPER(username)=UPPER('".$nama."') and UPPER(password)=UPPER('".$password."') 
            limit 1";
        $member=$this->Queries->_func($q);
        if(count($member)==1){
            array_push($this->_,array(
                'execTrue'=>true,
                'data'=>$member
            ));
        }else{
            array_push($this->_,array(
                'execTrue'=>false,
                'msg'=>$member
            ));
        }

        echo json_encode(array('Result'=>$this->_));
    }
    function donwload($val){
        $baseEND=json_decode((base64_decode($val)));
        $key    =$this->_settingKey($baseEND->key);
        
        if($this->_portalMobile($key)){
            $q      =$_POST['query'];
            $data   =$this->Queries->_func($q);
            if(count($data)>0){
                array_push($this->_,array(
                    'execTrue'=>true,
                    'data'=>$data
                ));
            }else{
                array_push($this->_,array(
                    'execTrue'=>false,
                    'msg'=>"Hasil tidak ditemukan !!!"
                ));
            }
        }else{
            array_push($this->_,array(
                'execTrue'=>false,
                'msg'=>"can't Access !!!"
            ));
        }
        return print_r(json_encode(array('Result'=>$this->_)));
        // echo json_encode(array('Result'=>$this->_));
    }
    function _settingKey($data){
        $keys   =explode("'",$data);
        $no=1;
        $key=array();
        foreach ($keys as $i => $v) {
            if($i==$no){
                $key[$v]=$keys[$no+2];
                $no+=4;
            }
        }
        return $key;
    }
    function _settingTextToArray($data){
        $split=explode("[",$data);
        $dt=array();
        foreach ($split as $key => $v) {
            if($key>0){
                array_push(
                    $dt,
                    $this->_settingKey(substr($v,0,strlen($v)-1))
                );
            }
        }
        // print_r("<pre>");
        // print_r($split);
        return $dt;
        // print_r($dt[0]['kdMember']);
        // print_r($split);
        
        // print_r($dt);
    }
    function _portalMobile($dt){
        $q="
                select 
                    a.* ,
                    b.nmKantor,
                    c.nmPrinter
                from member a 
                JOIN kantor b ON
                    a.kdKantor=concat('".$this->qdata->_getNKT("kant",false)."',b.kdKantor)
                LEFT JOIN localprinter c ON
                    concat('".$this->qdata->_getNKT("memb",false)."',a.kdMember)=c.kdMember
                where 
                    UPPER(a.username)=UPPER('".$dt['username']."') and 
                    UPPER(a.password)=UPPER('".$dt['password']."')";
        $member=$this->Queries->_func($q);
        if(count($member)>0){
            return true;
        }
        return false;
    }
    function addTransaksi($val){
        $baseEND=json_decode((base64_decode($val)));
        $key    =$this->_settingKey($baseEND->key);
        if($this->_portalMobile($key)){
            $data =$this->_settingTextToArray($_POST['data']);
            // $data =$this->_settingTextToArray("['kdMember'=>'2G18-memb-9','jmlPaket'=>'2','jmlItem'=>'1','ktgHarga'=>'0','jmlBelanja'=>'159787.2','jmlBayar'=>'200000.0','sisaBayar'=>'40212.79999999999','kdGB'=>'gbar-1','kdBarang'=>'null','jmlSatuan'=>'1','qty'=>'2','harga'=>'66578.0','jmlIB'=>'3','jumlahS'=>'141','noUpd'=>'0','jumlahT'=>'2']['kdGB'=>'gbar-1','kdBarang'=>'125','jmlSatuan'=>'1','qty'=>'1','harga'=>'13315.6','jmlIB'=>'3','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'1']['kdGB'=>'gbar-1','kdBarang'=>'126','jmlSatuan'=>'1','qty'=>'1','harga'=>'13315.6','jmlIB'=>'3','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'1']");
            // $data =$this->_settingTextToArray("['kdMember'=>'2G18-memb-9','jmlPaket'=>'0','jmlItem'=>'1','ktgHarga'=>'0','jmlBelanja'=>'66578.0','jmlBayar'=>'70000.0','sisaBayar'=>'3422.0','kdGB'=>'gbar-1','kdBarang'=>'null','jmlSatuan'=>'1','qty'=>'1','harga'=>'66578.0','jmlIB'=>'1','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'1']");
            // $data =$this->_settingTextToArray("['kdMember'=>'2G18-memb-9','jmlPaket'=>'3','jmlItem'=>'1','ktgHarga'=>'0','jmlBelanja'=>'53262.4','jmlBayar'=>'60000.0','sdetail'=>'60000.0','sisaBayar'=>'6737.5999999999985','jmlBayar'=>'3','kdGB'=>'1','kdBarang'=>'128','jmlSatuan'=>'1','qty'=>'1','harga'=>'13315.6','jmlIB'=>'4','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'Rp. 53,262.4']['kdGB'=>'1','kdBarang'=>'129','jmlSatuan'=>'1','qty'=>'1','harga'=>'13315.6','jmlIB'=>'4','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'Rp. 53,262.4']['kdGB'=>'1','kdBarang'=>'130','jmlSatuan'=>'1','qty'=>'1','harga'=>'13315.6','jmlIB'=>'4','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'Rp. 53,262.4']['kdGB'=>'1','kdBarang'=>'131','jmlSatuan'=>'1','qty'=>'1','harga'=>'13315.6','jmlIB'=>'4','jumlahS'=>'142','noUpd'=>'0','jumlahT'=>'Rp. 53,262.4']");
            // return print_r($data);
            // array_push($this->_,array(
            //     'execTrue'=>false,
            //     'msg'=>$data[0]
            // ));
            $jmlPaket   =$data[0]['jmlPaket'];
            $jmlItem    =$data[0]['jmlItem'];

            $ktgHarga   =$data[0]['ktgHarga'];
            $jmlBayar   =$data[0]['jmlBelanja'];
            $jmlPembayaran=$data[0]['jmlBayar'];
            $sisaBayar  =$data[0]['sisaBayar'];
            $kdMember   =$data[0]['kdMember'];
            
            $kdKT=$this->Queries->_func("select kdKT from keltransaksi where kdMember='".$kdMember."' and tahun=subString(now(),1,4) order by kdKT desc limit 1")[0]['kdKT']+1;
            // return print_r($kdKT);
            $qKel=" INSERT INTO keltransaksi(
                        kdKT, kdMember, jmlPaket, 
                        jmlItem, ktgHarga, jmlBelanja, 
                        jmlBayar, sisaBayar
                    ) VALUES 
                    (
                        ".$this->qdata->_checkStringQuery($kdKT).",".$this->qdata->_checkStringQuery($kdMember).",
                        ".$this->qdata->_checkStringQuery($jmlPaket).",".$this->qdata->_checkStringQuery($jmlItem).",
                        ".$this->qdata->_checkStringQuery($ktgHarga).",".$this->qdata->_checkStringQuery($jmlBayar).",
                        ".$this->qdata->_checkStringQuery($jmlPembayaran).",".$this->qdata->_checkStringQuery($sisaBayar)."
                    );";
            $qTrans=" INSERT INTO   transaksi(kdKelTrans, kdGB, kdBarang, 
                                    jmlSatuan, qty, harga, jmlIB, 
                                    jumlahS, jumlahT, noUpdBarang,kdMember
                    ) VALUES ";
            
            $qUpdate=";";
            foreach ($data as $key => $v) {
                if($v['kdBarang']=="null"){
                    $qTrans.="(
                        ".$this->qdata->_checkStringQuery($this->qdata->_getNKT('ktra',false).$kdKT).",
                        ".$this->qdata->_checkStringQuery($v['kdGB']).",'',".$this->qdata->_checkStringQuery($v['jmlSatuan']).",
                        ".$this->qdata->_checkStringQuery($v['qty']).",".$this->qdata->_checkStringQuery($v['harga']).",
                        ".$this->qdata->_checkStringQuery($v['jmlSatuan']*$v['qty']).",
                        (SELECT jumlahS-".$v['qty']." FROM gbarang WHERE concat('".$this->qdata->_getNKT("gbar",false)."',kdGB)='".$v['kdGB']."' and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and noUpd='".$v['noUpd']."'),
                        ".$this->qdata->_checkStringQuery($v['jumlahT']).",'".$v['noUpd']."',".$this->qdata->_checkStringQuery($kdMember)."
                    ),";
                    $qUpdate.="UPDATE gbarang SET jumlahS=jumlahS-".($v['jmlSatuan']*$v['qty'])." WHERE concat('".$this->qdata->_getNKT("gbar",false)."',kdGB)='".$v['kdGB']."' and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and noUpd='".$v['noUpd']."';";
                    // ".$this->qdata->_checkStringQuery($v->jumlahS).",".$this->qdata->_checkStringQuery($v->paket)."
                }else{// detail barang
                    $qTrans.="(
                        ".$this->qdata->_checkStringQuery($this->qdata->_getNKT('ktra',false).$kdKT).",
                        ".$this->qdata->_checkStringQuery($v['kdGB']).",
                        ".$this->qdata->_checkStringQuery($v['kdBarang']).",
                        '1','1',".$this->qdata->_checkStringQuery($v['harga']).
                        ",'1','0','1','".$v['noUpd']."',".$this->qdata->_checkStringQuery($kdMember)."
                    ),";
                    $qUpdate.="UPDATE barang SET status=0 WHERE concat('".$this->qdata->_getNKT('bara',false)."',kdBarang)='".$v['kdBarang']."';";
                }
            }
            $queries=$qKel.substr($qTrans,0,strlen($qTrans)-1).$qUpdate;
            // return print_r($queries);
            $check=$this->Queries->_multiProc($queries);
            if($check){
                array_push($this->_,array(
                    'execTrue'=>true,
                    'data'=>array()
                ));
            }else{
                array_push($this->_,array(
                    'execTrue'=>false,
                    'msg'=>"Error !!!"
                ));
            }
        }else{
            array_push($this->_,array(
                'execTrue'=>false,
                'msg'=>"can't Access !!!"
            ));
        }
        return print_r(json_encode(array('Result'=>$this->_)));
    }
    function addTransferBarang($val){
        $baseEND=json_decode((base64_decode($val)));
        $key    =$this->_settingKey($baseEND->key);
        if($this->_portalMobile($key)){
            $data =$this->_settingTextToArray($_POST['data']);
            $jmlPaket   =$data[0]['jmlPaket'];
            $jmlItem    =$data[0]['jmlItem'];

            $ktgHarga   =$data[0]['ktgHarga'];
            $jmlBayar   =$data[0]['jmlBelanja'];
            $kdMember   =$data[0]['kdMember'];
            $kdCabang   =$data[0]['kdCabang'];

            $kdTabel=$this->Queries->_func("select kdTf from tfbarang where kdMember='".$kdMember."' and subString(ins,1,4)=subString(now(),1,4) order by kdTf desc limit 1");
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0]['kdTf']+1;
                
            }else{
                $kdTabel=1;
            }
            
            $qKel=" INSERT INTO tfbarang(
                    kdTf, kdMember,kdCabang, jmlPaket, jmlItem, ktgHarga, jmlBelanja
                ) VALUES 
                (
                    ".$this->qdata->_checkStringQuery($kdTabel).",".$this->qdata->_checkStringQuery($kdMember).",
                    ".$this->qdata->_checkStringQuery($kdCabang).",
                    ".$this->qdata->_checkStringQuery($jmlPaket).",".$this->qdata->_checkStringQuery($jmlItem).",
                    ".$this->qdata->_checkStringQuery($ktgHarga).",".$this->qdata->_checkStringQuery($jmlBayar)."
                );";
            $qTrans=" INSERT INTO   tfdbarang(
                    kdTf, kdGB, kdBarang, jmlSatuan, 
                        qty, harga, jmlIB, jumlahS, jumlahT,noUpdBarang,kdMember,kdCabang
                    ) VALUES ";
            
            $qUpdate=";";
            
            foreach ($data as $key => $v) {
                if($v['kdBarang']=="null"){
                    $qTrans.="(
                        ".$this->qdata->_checkStringQuery($this->qdata->_getNKT('ktfb',false).$kdTabel).",
                        ".$this->qdata->_checkStringQuery($v['kdGB']).",'',".$this->qdata->_checkStringQuery($v['jmlSatuan']).",
                        ".$this->qdata->_checkStringQuery($v['qty']).",".$this->qdata->_checkStringQuery($v['harga']).",
                        ".$this->qdata->_checkStringQuery($v['jmlSatuan']*$v['qty']).",
                        (SELECT jumlahS-".$v['qty']." FROM gbarang WHERE concat('".$this->qdata->_getNKT("gbar",false)."',kdGB)='".$v['kdGB']."' and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and noUpd='".$v['noUpd']."'),
                        ".$this->qdata->_checkStringQuery($v['jumlahT']).",'".$v['noUpd']."',
                        ".$this->qdata->_checkStringQuery($kdMember).",".$this->qdata->_checkStringQuery($kdCabang)."
                    ),";
                    $qUpdate.="UPDATE gbarang SET jumlahS=jumlahS-".($v['jmlSatuan']*$v['qty'])." WHERE concat('".$this->qdata->_getNKT("gbar",false)."',kdGB)='".$v['kdGB']."' and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and noUpd='".$v['noUpd']."';";
                    // ".$this->qdata->_checkStringQuery($v->jumlahS).",".$this->qdata->_checkStringQuery($v->paket)."
                }else{// detail barang
                    $qTrans.="(
                        ".$this->qdata->_checkStringQuery($this->qdata->_getNKT('ktfb',false).$kdTabel).",
                        ".$this->qdata->_checkStringQuery($v['kdGB']).",
                        ".$this->qdata->_checkStringQuery($v['kdBarang']).",
                        '1','1',".$this->qdata->_checkStringQuery($v['harga']).
                        ",'1','0','1','".$v['noUpd']."',
                        ".$this->qdata->_checkStringQuery($kdMember).",".$this->qdata->_checkStringQuery($kdCabang)."
                    ),";
                    $qUpdate.="UPDATE barang SET status=0 WHERE concat('".$this->qdata->_getNKT('bara',false)."',kdBarang)='".$v['kdBarang']."';";
                }
            }
            $queries=$qKel.substr($qTrans,0,strlen($qTrans)-1).$qUpdate;
            $check=$this->Queries->_multiProc($queries);
            if($check){
                array_push($this->_,array(
                    'execTrue'=>true,
                    'data'=>array()
                ));
            }else{
                $check=$this->Queries->_proc($this->qdata->_iequery([
                    "kdMember"  =>"Bagus H",
                    "query"     =>$queries,
                    "action"    =>"mobile/addTransfer",
                    "msg"       =>"query error"
                ]));
                array_push($this->_,array(
                    'execTrue'=>false,
                    'msg'=>"Error !!!"
                ));
            }
        }else{
            array_push($this->_,array(
                'execTrue'=>false,
                'msg'=>"can't Access !!!"
            ));
        }
        return print_r(json_encode(array('Result'=>$this->_)));
    }
}
?>