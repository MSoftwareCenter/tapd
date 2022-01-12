<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WsKomponen extends CI_Controller {
    function __construct(){
        parent::__construct();
        $this->load->library('qdata');		
        $this->load->model('Queries');
        $this->load->library('Session');
        $this->load->helper('url');

        $this->qdata->_setBaseUrl(base_url());
        $this->_=array();
        $this->_['footer']    =$this->qdata->_getJs();
        $this->_['code']=$this->qdata->_backCode($this->encryption->encrypt($this->qdata->_isCode()));

        $this->startLokal();


        $this->tahun=$this->session->tahun;
        $this->kdMember=$this->session->kdMember;
        $this->kdJabatan=$this->session->kdJabatan;
        $this->kdDinas=$this->session->kdDinas;
        $this->noPembahasan=$this->session->noPembahasan;
        $this->progres=$this->session->progres;
        $this->finals=$this->session->finals;
        $this->perkada=$this->session->perkada;
        
        $this->_['progres']=$this->progres;
        $this->_['noPembahasan']=$this->noPembahasan;
        $this->_['finals']=$this->finals;
        $this->_['files']=$this->session->files;
        $this->_['perkada']=$this->perkada;
        $this->_['tahun']=$this->tahun;
        // $this->load->library('pdf');
    }
    function startLokal(){
        $res=$this->qdata->_getAllFile("/session");
        $data="";
        foreach ($res as $key => $value) {
            $exp=explode($this->qdata->_getIpClient()."=",$value['nama']);
            if(count($exp)>1){
                $data=$this->qdata->_readFileTxt($value['file']);
            }
        }
        if(strlen($data)==0){
            return $this->qdata->resF("session");
        }
        $data=json_decode($data);
        $data->{'kdMember'};
        $session=array(
            'kdMember'=>$data->{'kdMember'},
            'nmMember'=>$data->{'nmMember'},
            'kdJabatan'=>$data->{'kdJabatan'},
            'kdDinas'=>$data->{'kdDinas'},
            'nmDinas'=>$data->{'nmDinas'},
            'username'=>$data->{'username'},
            'password'=>$data->{'password'},

            'tahun'=>$data->{'tahun'},
            'noPembahasan'=>$data->{'noPembahasan'},
            'progres'=>$data->{'progres'},
            'finals'=>$data->{'finals'},
            'files'=>$data->{'files'},
            'perkada'=>$data->{'perkada'},
        );
        // return print_r($session);
        $this->session->set_userdata($session);
    }
    function beranda($page){
        $this->_['head']      =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        return print_r(json_encode($this->_));
    }
    function dashboard($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']      =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        //1 paket
        $this->_['dinfo']=$this->Queries->_func($this->qdata->_getNotification($this->kdMember," and b.status=0"));
        $this->Queries->_proc($this->qdata->_updDateInformasiDiakses($this->kdMember,""));
        return print_r(json_encode($this->_));
    }
    function referensi($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']      =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        $this->_['dperda']    =$this->Queries->_func("SELECT * FROM perda");
        $this->_['kodePage']=$this->qdata->_getNKA("c-perd");
        $this->_['qcode']=$this->Queries->_func(
            $this->qdata->_getKeyFitur(
                explode("/",$this->_['kodePage'])[0],
                " and kdFitur=".$this->qdata->_checkStringQuery($this->_['kodePage'])." and kdMember=".$this->qdata->_checkStringQuery($this->kdMember)
            )
        );
        //1 paket
        $this->_['dinfo']=$this->Queries->_func($this->qdata->_getNotification($this->kdMember," and b.status=0"));
        $this->Queries->_proc($this->qdata->_updDateInformasiDiakses($this->kdMember,""));
        return print_r(json_encode($this->_));
    }
    function dinas($page,$p){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->tahun==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
        }else{
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        // return print_r($pembahasan."/".$perkada);
        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        $this->_['ddinas']     =$this->Queries->_func($this->qdata->_ddinas($perkada,$tahun,""));
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."' "));
            }
        }
        return print_r(json_encode($this->_));
    }
    function jabatan($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        $this->_['djabatan']    =$this->Queries->_func("SELECT * FROM jabatan");
        return print_r(json_encode($this->_));
    }
    function member($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        $this->_['dmember']     =$this->Queries->_func($this->qdata->_dMember());
        $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas(" where perkada='".$this->perkada."' and tahun='".$this->tahun."'"));
        $this->_['djabatan']    =$this->Queries->_func($this->qdata->_cbJabatan());
        return print_r(json_encode($this->_));
    }
    function renstra($page,$p){
        $p=json_decode((base64_decode($p)));
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        if($p->perkada==0 && $p->tahun==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
        }else{
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        // return print_r($pembahasan."/".$perkada);
        $this->_['dtahun']      =$tahun;
        $this->_['dperkada']    =$perkada;

        $this->_['drenstra']['durusan']     =$this->Queries->_func($this->qdata->_durusan(" where taUrusan='".$tahun."'  and perkadaU='".$perkada."'"));
        $this->_['drenstra']['dbidang']     =$this->Queries->_func($this->qdata->_dbidang(" where a.taUrusan='".$tahun."'  and a.perkadaU='".$perkada."'"));
        $this->_['drenstra']['dprogram']    =$this->Queries->_func($this->qdata->_dprogram(false," where c.taUrusan='".$tahun."'  and c.perkadaU='".$perkada."'"));
        $this->_['drenstra']['dkegiatan']   =$this->Queries->_func($this->qdata->_dkegiatan(false," where d.taUrusan='".$tahun."'  and d.perkadaU='".$perkada."'"));
        $this->_['drenstra']['dsub']        =$this->Queries->_func($this->qdata->_dsub(false," where e.taUrusan='".$tahun."'  and e.perkadaU='".$perkada."'"));
        
        $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas(" where perkada='".$perkada."' and tahun='".$tahun."'"));
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        
        foreach ($this->_['ptahun'] as $i => $v) {
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
        }
        return print_r(json_encode($this->_));
    }
    function apbd($page,$p){
        $p=json_decode((base64_decode($p)));
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']            =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        // return print_r($p);
        if($p->perkada==0 && $p->pembahasan==0){
            $pembahasan =$this->noPembahasan;
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
        }else{
            $pembahasan =$p->pembahasan;
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        // return print_r($pembahasan."/".$perkada);
        $this->_['dtahun']      =$tahun;
        $this->_['dpembahasan'] =$pembahasan;
        $this->_['dperkada']    =$perkada;
        
        if($perkada==null || $tahun==null){
            $this->_['dapbd']['dsub1']  =[];
            $this->_['dapbd']['dsub2']  =[];
            $this->_['dapbd']['dsub3']  =[];
            $this->_['dapbd']['dsub4']  =[];
            $this->_['dapbd']['dsub5']  =[];
            $this->_['dapbd']['dsub6']  =[];
            $this->_['dapbd']['dsub7']  =[];
        }else{
            $this->_['dapbd']['dsub1']  =$this->Queries->_func($this->qdata->_dsub1($pembahasan,$tahun," and perkada1=".$perkada));
            $this->_['dapbd']['dsub2']  =$this->Queries->_func($this->qdata->_dsub2($pembahasan,$tahun," and b.perkada2=".$perkada));
            $this->_['dapbd']['dsub3']  =$this->Queries->_func($this->qdata->_dsub3(false,$pembahasan,$tahun," and c.perkada3=".$perkada));
            $this->_['dapbd']['dsub4']  =$this->Queries->_func($this->qdata->_dsub4(false,$pembahasan,$tahun," and d.perkada4=".$perkada));
            $this->_['dapbd']['dsub5']  =$this->Queries->_func($this->qdata->_dsub5(false,$pembahasan,$tahun," and e.perkada5=".$perkada));
            $this->_['dapbd']['dsub6']  =$this->Queries->_func($this->qdata->_dsub6(false,$pembahasan,$tahun," and f.perkada6=".$perkada));
            $this->_['dapbd']['dsub7']  =$this->Queries->_func($this->qdata->_dsub7(false,$pembahasan,$tahun," and g.perkada7=".$perkada));
        }

        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."' "));
            }
        }
        // return print_r($this->_);
        return print_r(json_encode($this->_));
    }
    function inpUsulan($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        $this->_['dkelompok']=[];
        if($this->noPembahasan!=null || $this->tahun!=null){
            $this->_['dkelompok']   =$this->Queries->_func($this->qdata->_cbSub1($this->noPembahasan,$this->tahun,""));
            // return $this->qdata->_log($this->_['dkelompok']);
        }

        
        if($this->kdJabatan>2){
            $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas(" where perkada='".$this->perkada."' and tahun='".$this->tahun."'"));
        }else{
            $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas("where kdDinas='".$this->kdDinas."' and perkada='".$this->perkada."' and tahun='".$this->tahun."'"));
        }

        $all=$this->_getAllDataSelectedSub($this->noPembahasan,$this->perkada,$this->tahun);
        
        $this->_['kodePage']=$this->qdata->_getNKA("p-usul");
        $this->_['qcode']=$this->Queries->_func(
            $this->qdata->_getKeyFitur(
                explode("/",$this->_['kodePage'])[0],
                " and kdFitur!=".$this->qdata->_checkStringQuery($this->_['kodePage'])." and kdMember=".$this->qdata->_checkStringQuery($this->kdMember)
            )
        );
        // return $this->qdata->_log($this->noPembahasan."BGS");
        foreach ($this->_['dkelompok'] as $i => $v) {
            $this->_['djenis'][$i]=array();
            foreach ($all as $i1 => $v1) {
                if($v1['kdSub1']==$v['value']){
                    array_push($this->_['djenis'][$i],$v1);
                }
            }
        }

        // return $this->qdata->_log($this->qdata->_cbSub7($this->noPembahasan,"2021"," and g.selected7=1"));

        $this->_['dsub']=$this->Queries->_func($this->qdata->_cbSub(false," where b.kdDinas='".$this->kdDinas."' and b.perkadaS='".$this->perkada."' and b.taSub='".$this->tahun."'"));
        
        $where=" and h.kdMember=".$this->qdata->_checkStringQuery($this->kdMember);
        
        $this->_['kdDinas']=$this->kdDinas;

        if($this->kdJabatan>2){
            $where="";
        }

        // return print_r($this->qdata->_getAllDataUsulan($this->noPembahasan,$this->perkada,$this->tahun,$where));
        $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulan($this->noPembahasan,$this->perkada,$this->tahun,$where));
        $this->_['kdMember']=$this->kdMember;

        $this->_['dinfo']=$this->Queries->_func($this->qdata->_getNotification($this->kdMember," and b.status=0"));
        $this->Queries->_proc($this->qdata->_updDateInformasiDiakses($this->kdMember,""));
        // return $this->qdata->_log($this->_['dusulan']);
        return print_r(json_encode($this->_));
    }
    

    function _getAllDataSelectedSub($no,$perkada,$tahun){
        // return $this->qdata->_cbSub1($no,$tahun," and selected1=1 and perkada1=".$perkada);
        $sup1=$this->Queries->_func($this->qdata->_cbSub1($no,$tahun," and selected1=1 and perkada1=".$perkada));
        $sup2=$this->Queries->_func($this->qdata->_cbSub2($no,$tahun," and selected2=1 and perkada2=".$perkada));
        $sup3=$this->Queries->_func($this->qdata->_cbSub3($no,$tahun," and c.selected3=1 and perkada3=".$perkada));
        $sup4=$this->Queries->_func($this->qdata->_cbSub4($no,$tahun," and d.selected4=1 and perkada4=".$perkada));
        $sup5=$this->Queries->_func($this->qdata->_cbSub5($no,$tahun," and e.selected5=1 and perkada5=".$perkada));
        $sup6=$this->Queries->_func($this->qdata->_cbSub6($no,$tahun," and f.selected6=1 and perkada6=".$perkada));
        $sup7=$this->Queries->_func($this->qdata->_cbSub7($no,$tahun," and g.selected7=1 and perkada7=".$perkada));
        $all=array_merge(
            $sup1,$sup2,
            $sup3,$sup4,
            $sup5,
            $sup6,$sup7
        );
        return $all;
    }
    function notulen($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        };
        // $this->_['css']='';
        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        $this->_['dabsen']=$this->Queries->_func($this->qdata->_dMemberAbsen(
            $this->noPembahasan,
            $this->perkada,
            $this->tahun,
            " where c.kdJabatan BETWEEN 3 and 5 "
        ));
        $this->_['isi']     =$this->Queries->_func("
            SELECT notulen,
            fileNotulen as status
            FROM pembahasan 
            where noPembahasan='".$this->noPembahasan."' 
            and perkada='".$this->perkada."' 
            and tahun='".$this->tahun."' 
        ")[0];
        $this->_['btn']=strlen($this->_['isi']['status'])>1 ? 0:1;
        $this->_['isi']=$this->_['isi']['notulen'];
        return print_r(json_encode($this->_));
    }
    
    function inpDisposisi($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']            =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        // $this->noPembahasan=$this->Queries->_func($this->qdata->_noPembahasan())[0]['no'];
        
        $this->_['kodePage']=$this->qdata->_getNKA("p-disp");
        $this->_['qcode']=$this->Queries->_func(
            $this->qdata->_getKeyFitur(
                explode("/",$this->_['kodePage'])[0],
                " and kdFitur!=".$this->qdata->_checkStringQuery($this->_['kodePage'])." and kdMember=".$this->qdata->_checkStringQuery($this->kdMember)
            )
        );

        $where=" and a.perkada='".$this->perkada."' ";
        // $where=" and a.perkada='".$this->perkada."' and d.status='terarsipkan'";
        // return print_r($this->kdJabatan);
        if($this->kdJabatan==2 || $this->kdJabatan==6){
            $where=" and a.perkada='".$this->perkada."' ";
        }

        $this->_['ddisposisi']=$this->Queries->_func($this->qdata->_getAllUsulanDisposisi($this->noPembahasan,$this->tahun,$where));
        // return $this->qdata->_log($this->_['ddisposisi']);
        foreach ($this->_['ddisposisi'] as $i => $v) {
            $this->_['ddisposisi'][$i]['data']=$this->Queries->_func(
                                                    $this->qdata->_getDisposisi(
                                                        $v['kdUsulan'],
                                                        $v['noPembahasan'],
                                                        $v['tahun'],
                                                        " and kdMember=".$this->qdata->_checkStringQuery($v['kdMember']).""
                                                ));
        }
        // return $this->qdata->_log($this->_['ddisposisi']);
        $this->_['dtujuan1']=array_merge(
            [
                0=>["value"=>"4-10-00-001","valueName"=>"Asisten I"],
                1=>["value"=>"4-10-00-001","valueName"=>"Asisten II"],
                2=>["value"=>"4-10-00-001","valueName"=>"Asisten III"],
                3=>["value"=>"4-10-00-001","valueName"=>"SEKRETARIS TAPD"]
            ],
            $this->Queries->_func($this->qdata->_getDinasTapd(" and nmDinas!='SEKRETARIAT DAERAH'"))
        );
        $this->_['dtujuan2']=array_merge(
            array(["value"=>"4-10-00-001","valueName"=>"SEKRETARIS TAPD"])
            ,
            $this->Queries->_func($this->qdata->_getDinasTapd(" and nmDinas!='SEKRETARIAT DAERAH'"))
        );

        $this->_['dtujuan1'][0]['selected']=1;
        // $this->_['dtujuan']=$this->Queries->_func($this->qdata->_getDinasTapd(" and nmDinas='SEKRETARIAT DAERAH'"));
        $this->_['dtujuan']=array(["value"=>"4-10-00-001","valueName"=>"SEKRETARIS DAERAH"]);
        
        //1 paket
        $this->_['dinfo']=$this->Queries->_func($this->qdata->_getNotification($this->kdMember," and b.status=0"));
        $this->Queries->_proc($this->qdata->_updDateInformasiDiakses($this->kdMember,""));
        return print_r(json_encode($this->_));
    }
    function inpKajianTeknis($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']            =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        
        $this->_['kodePage']=$this->qdata->_getNKA("p-kaji");
        $this->_['qcode']=$this->Queries->_func(
            $this->qdata->_getKeyFitur(
                explode("/",$this->_['kodePage'])[0],
                " and kdFitur!=".$this->qdata->_checkStringQuery($this->_['kodePage'])." and kdMember=".$this->qdata->_checkStringQuery($this->kdMember)
            )
        );
        // $this->noPembahasan=$this->Queries->_func($this->qdata->_noPembahasan())[0]['no'];

        $whereTAPD="  and 
        (
            CASE 
                WHEN char_length(d.files1)>0 && char_length(d.files2)=0 THEN d.tujuanDisposisi1
                ELSE d.tujuanDisposisi2
            END
        )=".$this->qdata->_checkStringQuery($this->kdDinas);
        $where="and a.perkada='".$this->perkada."' and d.status='terarsipkan'";
        if($this->kdJabatan==4 || $this->kdJabatan==6){
            $whereTAPD="";
        }
        $where.=$whereTAPD;

        $this->_['ddisposisi']=$this->Queries->_func($this->qdata->_getAllUsulanDisposisi($this->noPembahasan,$this->tahun,$where));
        // return $this->qdata->_log($this->qdata->_getAllUsulanDisposisi($this->noPembahasan,$this->tahun,$where));
        //1 paket
        $this->_['dinfo']=$this->Queries->_func($this->qdata->_getNotification($this->kdMember," and b.status=0"));
        $this->Queries->_proc($this->qdata->_updDateInformasiDiakses($this->kdMember,""));
        return print_r(json_encode($this->_));
    }
    function forum($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']            =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        // proses add
        // return print_r($this->session->kdMember);
        
        $this->_['kdDinas']=$this->kdDinas;
        $this->_['dkelompok']=[];
        if($this->noPembahasan!=null || $this->tahun!=null){
            $this->_['dkelompok']   =$this->Queries->_func($this->qdata->_cbSub1($this->noPembahasan,$this->tahun,""));
            // return $this->qdata->_log($this->_['dkelompok']);
        }
        if($this->kdJabatan>2){
            $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas(""));
        }else{
            $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas("where kdDinas='".$this->kdDinas."'"));
        }
        $all=$this->_getAllDataSelectedSub($this->noPembahasan,$this->perkada,$this->tahun);
        // return print_r($all);
        foreach ($this->_['dkelompok'] as $i => $v) {
            $this->_['djenis'][$i]=array();
            foreach ($all as $i1 => $v1) {
                if($v1['kdSub1']==$v['value']){
                    array_push($this->_['djenis'][$i],$v1);
                }
            }
        }
        $this->_['dsub']=$this->Queries->_func($this->qdata->_cbSub(false," where b.kdDinas='".$this->kdDinas."'"));

        // proses forum
        $pembahasan=$this->Queries->_func("SELECT tahun,noPembahasan,progres,finals FROM pembahasan ORDER by ins desc limit 1");
        if(count($pembahasan)>0){
            $this->session->progres=$pembahasan[0]['progres'];
            $this->session->finals=$pembahasan[0]['finals'];
            $this->progres=$this->session->progres;
            $this->finals=$this->session->finals;
            $this->_['progres']=$this->progres;
            $this->_['noPembahasan']=$this->noPembahasan;
            $this->_['finals']=$this->finals;
        }
        $this->_['kodePage']=$this->qdata->_getNKA("p-foru");
        $this->_['qcode']=$this->Queries->_func(
            $this->qdata->_getKeyFitur(
                explode("/",$this->_['kodePage'])[0],
                " and kdFitur!=".$this->qdata->_checkStringQuery($this->_['kodePage'])." and kdMember=".$this->qdata->_checkStringQuery($this->kdMember)
            )
        );
        // $this->noPembahasan=$this->Queries->_func($this->qdata->_noPembahasan())[0]['no'];

        $whereTAPD=" and d.tujuanDisposisi=".$this->qdata->_checkStringQuery($this->kdDinas)." ";
        $where=" and d.status='terarsipkan'";
        if($this->kdJabatan==2 || $this->kdJabatan==6){
            $whereTAPD="";
        }
        $where.=$whereTAPD;

        // return $this->qdata->_log($this->noPembahasan." | ".$this->perkada." | ".$this->tahun);
        
        if($this->noPembahasan>0 && $this->finals==0){

            $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
            foreach ($this->_['ptahun'] as $i => $v) {
                // return print_r($v);
                $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
                foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                    $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."' and noPembahasan>0 "));
                }

                if($i==0){
                    $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
                        $this->_['ptahun'][0]['perkada'][0]['pembahasan'][0]['value'],
                        $this->_['ptahun'][0]['perkada'][0]['value'],
                        $this->_['ptahun'][0]['value']," and a.kdSub1=".$this->qdata->_checkStringQuery("4")." "
                    ));
                }
            }

            
            $this->_['dall']=$this->Queries->_func($this->qdata->_getAllDataApbdBandingan($this->noPembahasan-1,$this->perkada,$this->tahun,"",$this->noPembahasan));
           
            // return print_r( 
            //     $this->_['dall']
            // );
            $this->_['dpendapatan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
                $this->noPembahasan,
                $this->perkada,
                $this->tahun,
                " and a.kdSub1=".$this->qdata->_checkStringQuery("4")." "
            )); // 4 adalah kdSub1 apbd pendapatan
            
            $this->_['dbelanja']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
                $this->noPembahasan,
                $this->perkada,
                $this->tahun,
                " and a.kdSub1=".$this->qdata->_checkStringQuery("5")." "
            )); // 4 adalah kdSub1 apbd pendapatan
            $this->_['dpembiayaan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
                $this->noPembahasan,
                $this->perkada,
                $this->tahun,
                " and a.kdSub1=".$this->qdata->_checkStringQuery("6")." "
            )); // 4 adalah kdSub1 apbd pendapatan
            $this->_['dstatus']=$this->qdata->_cbStatus();
            $this->_['dPendanaan']=$this->qdata->_cbStatusPendanaan();
            
        }else{
            // return print_r("ok");
            $this->_['pembahasan']=$this->Queries->_func("SELECT 
                perkada,tahun,progres,noPembahasan
                FROM `pembahasan` 
                where tahun='".$this->tahun."'
                group by tahun,perkada
                order by noPembahasan desc
            ");
            foreach ($this->_['pembahasan'] as $i => $v) {
                // $this->_['pembahasan'][$i]['data']=$this->Queries->_func("SELECT * FROM `pembahasan` where tahun='".$v['tahun']."' ");
                $dataz=$this->Queries->_func("select perkada,noPembahasan,progres,finals,
                    finalPerkada
                    from pembahasan where 
                    tahun='".$v['tahun']."' 
                    and perkada='".$v['perkada']."' 
                    order by cast(noPembahasan as int) desc limit 1
                ")[0];
                $this->_['pembahasan'][$i]['noPembahasan']=$dataz['noPembahasan'];
                // if($dataz['noPembahasan']>0){
                //     $dataz['noPembahasan']+=1;
                // }
                $this->_['pembahasan'][$i]['finalPerkada']=strlen($dataz['finalPerkada'])>1 ? 1:0;
                $this->_['pembahasan'][$i]['jumlah']=$dataz['noPembahasan'] ;
                $this->_['pembahasan'][$i]['perkada']=$dataz['perkada'];
                $this->_['pembahasan'][$i]['progres']=$dataz['progres'];
                $this->_['pembahasan'][$i]['finalPembahasan']=$dataz['finals'];
                // $this->_['pembahasan'][$i]['noPembahasan']=$dataz['noPembahasan'];
                
            }
        }
        //1 paket
        $this->_['dinfo']=$this->Queries->_func($this->qdata->_getNotification($this->kdMember," and b.status=0"));
        $this->Queries->_proc($this->qdata->_updDateInformasiDiakses($this->kdMember,""));
        
        return print_r(json_encode($this->_));
    }
    

    function lnotulen($page,$p,$xxx){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->pembahasan==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
            $pembahasan =$this->noPembahasan;
        }else{
            $pembahasan =$p->noPembahasan;
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        
        $this->_['xxx']=$xxx;
        $this->_['qlab']=$this->qdata->_xxx(base64_encode($xxx));
        // return print_r($pembahasan."/".$perkada);
        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;
        $this->_['noPembahasan']=$pembahasan;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        $this->_['perkadaFinal']=$this->Queries->_func("
            SELECT finalPerkada FROM `pembahasan` 
            WHERE noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
            perkada=".$this->qdata->_checkStringQuery($perkada)." and
            tahun=".$this->qdata->_checkStringQuery($tahun)." 
        ")[0]['finalPerkada'];
        if($this->_['perkadaFinal']=="0"){
            $this->_['perkadaFinal']=false;
        }else{
            $this->_['perkadaFinal']=true;
        }
        
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."'  and noPembahasan>0 "));
            }
        }
        $this->_['dabsen']=$this->Queries->_func($this->qdata->_dMemberAbsen(
            $pembahasan,
            $perkada,
            $tahun,
            " where c.kdJabatan BETWEEN 3 and 5 "
        ));
        $this->_['isi']     =$this->Queries->_func("
            SELECT notulen,
            fileNotulen as status
            FROM pembahasan 
            where noPembahasan='".$pembahasan."' 
            and perkada='".$perkada."' 
            and tahun='".$tahun."' 
        ")[0];
        $this->_['btn']=strlen($this->_['isi']['status'])>1 ? 0:1;
        $this->_['isi']=$this->_['isi']['notulen'];
        return print_r(json_encode($this->_));
    }
    function lpaguDinas($page,$p,$xxx){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(" where finalPerkada!='0'"));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."' and finalPerkada!='0'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."'  and noPembahasan>0 and finalPerkada!='0'"));
            }
        }

        $this->_['xxx']=$xxx;
        $this->_['qlab']=$this->qdata->_xxx(base64_encode($xxx));
        // return print_r($this->_['ptahun']);
        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->tahun==0 ){
            if(count($this->_['ptahun'])>0){
                $perkada    =$this->_['ptahun'][0]['perkada'][0]['value'];
                $tahun      =$this->_['ptahun'][0]['value'];
                $pembahasan =$this->_['ptahun'][0]['perkada'][0]['pembahasan'][0]['value'];
            }else{
                $pembahasan =$this->noPembahasan;
                $perkada    =$this->perkada;
                $tahun      =$this->tahun;
            }
        }else{
            $pembahasan =$p->noPembahasan;
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;
        $this->_['noPembahasan']=$pembahasan;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        $this->_['ddinas']     =$this->Queries->_func("
            select 
                b.nmDinas,b.kadis,b.pagu,b.paguR, 
                b.pagu+(
                    SELECT 
                        SUM(a.volx*a.nilaix)
                    FROM usulan a
                    WHERE a.statusx='DISETUJUI'
                    AND a.kdDinas=b.kdDinas
                    AND a.noPembahasan='".$pembahasan."'
                    AND a.perkada=b.perkada
                    AND a.tahun=b.tahun
                ) as paguR
            from dinas b
            where b.perkada='".$perkada."' and b.tahun='".$tahun."'
        ");
        return print_r(json_encode($this->_));
    }
    function lperkada($page,$p,$xxx){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }

        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->tahun==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
            $pembahasan =$this->noPembahasan;
        }else{
            // return print_r($p);
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
            $pembahasan =$p->noPembahasan;
        }

        // return print_r($pembahasan."/".$perkada."/".$tahun);
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."' "));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."' and noPembahasan>0 "));
            }
        }

        $this->_['xxx']=$xxx;
        $this->_['qlab']=$this->qdata->_xxx(base64_encode($xxx));

        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;
        $this->_['noPembahasan']=$pembahasan;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();

        $this->_['dpendapatan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
            $pembahasan,
            $perkada,
            $tahun,
            " and a.kdSub1=".$this->qdata->_checkStringQuery("4")." "
        )); // 4 adalah kdSub1 apbd pendapatan
        
        $this->_['dbelanja']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
            $pembahasan,
            $perkada,
            $tahun,
            " and a.kdSub1=".$this->qdata->_checkStringQuery("5")." "
        )); // 4 adalah kdSub1 apbd pendapatan
        $this->_['dpembiayaan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
            $pembahasan,
            $perkada,
            $tahun,
            " and a.kdSub1=".$this->qdata->_checkStringQuery("6")." "
        )); // 4 adalah kdSub1 apbd pendapatan

        $this->_['dokumentasi']=$this->Queries->_func($this->qdata->_ddokumentasi($pembahasan,$perkada,$tahun,""));


        $this->_['dstatus']=$this->qdata->_cbStatus();
        // $this->_['dpembahasan']     =$this->Queries->_func($this->qdata->_dpembahasan(""));
        
        return print_r(json_encode($this->_));
    }
    function lstruktur($page,$p,$xxx){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->pembahasan==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
            $pembahasan =$this->noPembahasan;
            $pembahasanPrev=$this->noPembahasan-1;
        }else{
            $pembahasan =$p->noPembahasan;
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
            $pembahasanPrev=$p->pembahasanPrev;
        }
        // $this->_['xxx']=$pembahasanPrev." | ".$pembahasan." | ".$perkada." | ".$tahun;
        // // return print_r($this->_['xxx']);
        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;
        $this->_['pembahasanPrev']=$pembahasanPrev;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."'"));
            }
        }

        $this->_['xxx']=$xxx;
        $this->_['qlab']=$this->qdata->_xxx(base64_encode($xxx));

        $this->_['dall']=$this->Queries->_func($this->qdata->_getAllDataApbdBandingan($pembahasanPrev,$perkada,$tahun,"",$pembahasan));
        
        $this->_['perkadaFinal']=$this->Queries->_func("
            SELECT finalPerkada FROM `pembahasan` 
            WHERE noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
            perkada=".$this->qdata->_checkStringQuery($perkada)." and
            tahun=".$this->qdata->_checkStringQuery($tahun)." 
        ")[0]['finalPerkada'];
        if($this->_['perkadaFinal']=="0"){
            // array_splice($this->_['dlaporan'],6,1);
            $this->_['perkadaFinal']=false;
        }else{
            $this->_['perkadaFinal']=true;
        }
        return print_r(json_encode($this->_));
    }
    function lusulan($page,$p,$xxx){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        
        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->pembahasan==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
            $pembahasan =$this->noPembahasan;
        }else{
            $pembahasan =$p->noPembahasan;
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        // $this->_['xxx']=" | ".$pembahasan." | ".$perkada." | ".$tahun;
        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."' and noPembahasan>0 "));
            }
        }
        $this->_['dstatus']=$this->qdata->_cbStatus();
        $this->_['dlaporan']=$this->qdata->_cbLaporan();
        $this->_['perkadaFinal']=$this->Queries->_func("
            SELECT finalPerkada FROM `pembahasan` 
            WHERE noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
            perkada=".$this->qdata->_checkStringQuery($perkada)." and
            tahun=".$this->qdata->_checkStringQuery($tahun)." 
        ")[0]['finalPerkada'];
        if($this->_['perkadaFinal']=="0"){
            // array_splice($this->_['dlaporan'],6,1);
            $this->_['perkadaFinal']=false;
        }else{
            $this->_['perkadaFinal']=true;
        }
        
        $this->_['xxx']=$xxx;
        $this->_['qlab']=$this->qdata->_xxx(base64_encode($xxx));

        $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
            $pembahasan,
            $perkada,
            $tahun,
            ""
        ));

        // upd
        $this->_['kdDinas']=$this->kdDinas;
        $this->_['dkelompok']=[];
        if($this->noPembahasan!=null || $this->tahun!=null){
            $this->_['dkelompok']   =$this->Queries->_func($this->qdata->_cbSub1($this->noPembahasan,$this->tahun,""));
            // return $this->qdata->_log($this->_['dkelompok']);
        }
        if($this->kdJabatan>2){
            $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas(""));
        }else{
            $this->_['ddinas']      =$this->Queries->_func($this->qdata->_cbDinas("where kdDinas='".$this->kdDinas."'"));
        }
        $all=$this->_getAllDataSelectedSub($this->noPembahasan,$this->perkada,$this->tahun);
        foreach ($this->_['dkelompok'] as $i => $v) {
            $this->_['djenis'][$i]=array();
            foreach ($all as $i1 => $v1) {
                if($v1['kdSub1']==$v['value']){
                    array_push($this->_['djenis'][$i],$v1);
                }
            }
        }
        $this->_['dsub']=$this->Queries->_func($this->qdata->_cbSub(false," where b.kdDinas='".$this->kdDinas."'"));
        return print_r(json_encode($this->_));
    }
    function ldisposisi($page,$p,$xxx){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        
        $p=json_decode((base64_decode($p)));
        if($p->perkada==0 && $p->pembahasan==0){
            $perkada    =$this->perkada;
            $tahun      =$this->tahun;
            $pembahasan =$this->noPembahasan;
        }else{
            $pembahasan =$p->noPembahasan;
            $perkada    =$p->perkada;
            $tahun      =$p->tahun;
        }
        // $this->_['xxx']=" | ".$pembahasan." | ".$perkada." | ".$tahun;
        $this->_['tahun']      =$tahun;
        $this->_['perkada']    =$perkada;

        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        
        $this->_['ptahun']=$this->Queries->_func($this->qdata->_tahunPembahasan(""));
        foreach ($this->_['ptahun'] as $i => $v) {
            // return print_r($v);
            $this->_['ptahun'][$i]['perkada']=$this->Queries->_func($this->qdata->_perkadaPembahasan(" tahun='".$v['value']."'"));
            foreach ($this->_['ptahun'][$i]['perkada'] as $i1 => $v1) {
                $this->_['ptahun'][$i]['perkada'][$i1]['pembahasan']=$this->Queries->_func($this->qdata->_noPembahasan1(" tahun='".$v['value']."' and perkada='".$v1['value']."' and noPembahasan>0 "));
            }
        }

        $this->_['xxx']=$xxx;
        $this->_['qlab']=$this->qdata->_xxx(base64_encode($xxx));

        $where=" and a.perkada='".$perkada."' and d.status='terarsipkan'";
        // return print_r($this->kdJabatan);
        if($this->kdJabatan==2 || $this->kdJabatan==6){
            $where=" and a.perkada='".$this->perkada."' ";
        }

        $this->_['ddisposisi']=$this->Queries->_func($this->qdata->_getAllUsulanDisposisi($pembahasan,$tahun,$where));
        // return $this->qdata->_log($this->_['ddisposisi']);
        
        $this->_['perkadaFinal']=$this->Queries->_func("
            SELECT finalPerkada FROM `pembahasan` 
            WHERE noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
            perkada=".$this->qdata->_checkStringQuery($perkada)." and
            tahun=".$this->qdata->_checkStringQuery($tahun)." 
        ")[0]['finalPerkada'];
        if($this->_['perkadaFinal']=="0"){
            // array_splice($this->_['dlaporan'],6,1);
            $this->_['perkadaFinal']=false;
        }else{
            $this->_['perkadaFinal']=true;
        }


        foreach ($this->_['ddisposisi'] as $i => $v) {
            $this->_['ddisposisi'][$i]['data']=$this->Queries->_func(
                                                    $this->qdata->_getDisposisi(
                                                        $v['kdUsulan'],
                                                        $v['noPembahasan'],
                                                        $v['tahun'],
                                                        " and kdMember=".$this->qdata->_checkStringQuery($v['kdMember']).""
                                                ));
        }
        // return $this->qdata->_log($this->_['ddisposisi']);
        $this->_['dtujuan1']=array_merge(
            [
                0=>["value"=>"4-10-00-001","valueName"=>"Asisten I"],
                1=>["value"=>"4-10-00-001","valueName"=>"Asisten II"],
                2=>["value"=>"4-10-00-001","valueName"=>"Asisten III"]
            ],
            $this->Queries->_func($this->qdata->_getDinasTapd(" and nmDinas!='SEKRETARIAT DAERAH'"))
        );
        $this->_['dtujuan2']=$this->Queries->_func($this->qdata->_getDinasTapd(" and nmDinas!='SEKRETARIAT DAERAH'"));

        $this->_['dtujuan1'][0]['selected']=1;
        $this->_['dtujuan']=$this->Queries->_func($this->qdata->_getDinasTapd(" and nmDinas='SEKRETARIAT DAERAH'"));
        return print_r(json_encode($this->_));
    }
    

    function settingBarang($page){
        if(!$this->qdata->_backCodes(base64_decode($_POST['data']['code']))){
            return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
        }
        $this->_['head']        =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        $this->_['dgbarang']    =$this->Queries->_func($this->qdata->_vdBarangSetting("b.kdMember='".$this->session->kdMember."' and b.jumlahS>0"));
        // return $this->qdata->_log($this->_['dgbarang']);
        return print_r(json_encode($this->_));
    }
    function dokumentasi($page){
        $this->_['head']      =$this->qdata->_getCss().$this->qdata->_getJsMaster($page).$this->qdata->_getJsChart();
        // $this->_['dtTahun']   =$this->_getData("tahun")['tabel'];
        return print_r(json_encode($this->_));
    }
    function _getData($query){
        $member=$this->Queries->_func($query);
        return array(
            'tabel'=>$member,
            'count'=>count($member)
        );
    }
}
