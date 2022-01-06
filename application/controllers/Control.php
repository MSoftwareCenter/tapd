<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Control extends CI_Controller {
    function __construct(){
        parent::__construct();
        
        $this->load->library('qdata');		
        $this->load->model('Queries');
        $this->load->library('Session');
        $this->load->helper('url');
        // $this->load->library('SimpleXLSX');
        
        // $excel=new SimpleXLSX();
        // $this->load->library('encryption');
        // $this->load->library('pdf');
        $this->qdata->_setBaseUrl(base_url());
        $_=array();
        $this->_['router']=$this->qdata->_getRouter();
        $this->_['assert']=$this->qdata->_getAssetUrl();
        $this->_['code']=$this->qdata->_backCode($this->encryption->encrypt($this->qdata->_isCode()));
        $this->_['param']=null;
        $this->_['app']="TAPD";
    }
	public function index(){
        // print_r($this->qdata->_getNKT("memb"));
        // return print_r($this->session->kdMember);
        if($this->session->kdMember!=null) {
            return redirect("control/dashboard/null");
        }
        $this->_['page']="beranda";
        $this->_['html']=$this->qdata->_html("SIA DATANG","Sistem Busnis Modern",2);
		$this->load->view('index',$this->_);
    }
    public function dashboard($val){
        // return print_r($this->_['code']);
        if($val!=null && $val!="null"){
            $baseEND=json_decode((base64_decode($val)));
            // if(!$this->qdata->_backCodes($baseEND->{'myCode'})){
            //     return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
            // }
            $username   =$baseEND->{'username'};
            $password   =$baseEND->{'password'};

            $q="
                select 
                    a.*,b.nmDinas
                from member a 
                JOIN dinas b ON
                    a.kdDinas=b.kdDinas
                where 
                    UPPER(a.username)=UPPER('".$username."') and 
                    UPPER(a.password)=UPPER('".$password."')";
            $member=$this->Queries->_func($q);
            $pembahasan=$this->Queries->_func("SELECT tahun,noPembahasan,progres,finals,files,perkada FROM pembahasan ORDER by ins desc limit 1");
            // return print_r(count($pembahasan));
            $session=array(
                'kdMember'=>$member[0]['kdMember1'],
                'nmMember'=>$member[0]['nmMember'],
                'kdJabatan'=>substr($member[0]['kdJabatan'],5),
                'kdDinas'=>$member[0]['kdDinas'],
                'nmDinas'=>$member[0]['nmDinas'],
                'username'=>$member[0]['username'],
                'password'=>$member[0]['password'],

                'tahun'=>null,
                'noPembahasan'=>null,
                'progres'=>null,
                'finals'=>null,
                'files'=>null,
                'perkada'=>null
            );
            
            if(count($pembahasan)>0){
                $session['tahun']=$pembahasan[0]['tahun'];
                $session['noPembahasan']=$pembahasan[0]['noPembahasan'];
                $session['progres']=$pembahasan[0]['progres'];
                $session['finals']=$pembahasan[0]['finals'];
                $session['files']=$pembahasan[0]['files'];
                $session['perkada']=$pembahasan[0]['perkada'];
            }else{
                if(substr($member[0]['kdJabatan'],5)<3){
                    return $this->logout();
                }
            }
            // return print_r(($session));
            $res=$this->qdata->_getAllFile("/session");
            $this->qdata->_removeFile($res,$this->qdata->_getIpClient()."=");
            
            // return print_r($_SERVER);
            $this->qdata->_exportTxt($this->qdata->_getIpClient()."=",json_encode($session));
            // session
            $this->session->set_userdata($session);
            $nama=$member[0]['nmMember'];
        }else{
            $this->_keamanan("Bagus H");
            if($this->session->kdMember==null) {
                return $this->logout();
            }
            $nama=$this->session->nmMember;
        }
        $this->_['page']="dashboard";
        $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
		$this->load->view('index',$this->_);
    }
    function jabatan(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-jaba"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="jabatan";
            $this->_['html']=$this->qdata->_html("SIA DATANG","Sistem Busnis Modern",1);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function dinas($p){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="dinas";
            $this->_['param']=$p;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    
    function akun(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-memb"));
        if($portal['exec']){
            $this->_['nama']=$this->session->nmMember;
            $this->_['page']="member";
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function renstra($p){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-rens"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="renstra";
            $this->_['param']=$p;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function apbd($p){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-rens"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="apbd";
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->_['param']=$p;
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function usulan(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-usul"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="inpUsulan";
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function disposisi(){
        // return print_r($this->qdata->_getUrl("DISPOSISI"));
        $portal=$this->_keamanan($this->qdata->_getNKA("p-disp"));
        // return print_r($this->qdata->_getNKA("p-usul"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="inpDisposisi";
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function kajianTeknis(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-kaji"));
        // return print_r($this->qdata->_getNKA("p-usul"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="inpKajianTeknis";
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function forum(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-foru"));
        // return print_r($this->qdata->_getNKA("p-usul"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="forum";
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function notulen(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-foru"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $dt=array();
            $this->_['page']="notulen";
            // $this->_['css']='
            //     <style type="text/css" media="all">@import "'.$this->qdata->_getAssetUrl().'Library/textEditor/css/widgEditor.css";</style>
            //     <script type="text/javascript" src="'.$this->qdata->_getAssetUrl().'Library/textEditor/scripts/widgEditor.js";></script>';
            $this->_['html']        =$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
            // $this->load->view('textEditor',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function referensi(){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-foru"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="referensi";
            $this->_['html']        =$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }

    function lnotulen($p,$xxx){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="lnotulen";
            $this->_['param']=$p."/".$xxx;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function lpaguDinas($p,$xxx){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="lpaguDinas";
            $this->_['param']=$p."/".$xxx;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function lperkada($p,$xxx){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="lperkada";
            $this->_['param']=$p."/".$xxx;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function lstruktur($p,$xxx){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="lstruktur";
            $this->_['param']=$p."/".$xxx;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function lusulan($p,$xxx){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="lusulan";
            $this->_['param']=$p."/".$xxx;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }
    function ldisposisi($p,$xxx){
        $portal=$this->_keamanan($this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $nama=$this->session->nmMember;
            $this->_['page']="ldisposisi";
            $this->_['param']=$p."/".$xxx;
            $this->_['html']=$this->qdata->_html($this->_['app'],$this->qdata->nmApp,2);
            $this->load->view('index',$this->_);
        }else{
            if($portal['msg']=="session"){
                return $this->logout();
            }else{
                return $this->dashboard("null");
            }
        }
    }

    function viewImage($val){
        if($this->session->kdMember==null) {
            return $this->logout();
        }
        $baseEND=json_decode((base64_decode($val)));
        return print_r("<div style='width:100%;margin:auto;margin-left:30%;'><img src='". $this->_['assert']."upload/".$baseEND->{'nama'}."'></div>");
        // $this->_['page']="imageView/";
        // $this->_['html']=$this->qdata->_html("E-RENJA","");
        // $this->_['param']=$id;
		// $this->load->view('index',$this->_);
    }
    function viewImageAssets($val){
        if($this->session->kdMember==null) {
            return $this->logout();
        }
        $baseEND=json_decode((base64_decode($val)));
        return print_r("<div style='width:100%;margin:auto;margin-left:30%;'><img src='".base_url().$baseEND->{'nama'}."'></div>");
        // $this->_['page']="imageView/";
        // $this->_['html']=$this->qdata->_html("E-RENJA","");
        // $this->_['param']=$id;
		// $this->load->view('index',$this->_);
    }
    function viewImageSet($val){
        if($this->session->kdMember==null) {
            return $this->logout();
        }
        $baseEND=json_decode((base64_decode($val)));
        // return print_r($baseEND->nama);
        return print_r("<div style='width:100%;margin:auto;margin-left:30%;'><img src='". $this->_['assert']."upload/".$baseEND->{'nama'}."'></div>");
        // $this->_['page']="imageView/";
        // $this->_['html']=$this->qdata->_html("E-RENJA","");
        // $this->_['param']=$id;
		// $this->load->view('index',$this->_);
    }
    public function dokumentasi(){
        $this->_['page']="dokumentasi";
        $this->_['html']=$this->qdata->_html("E-MASTER","pengaturan sistem di BAPPEDA ");
		$this->load->view('index',$this->_);
    }
    
    public function logout(){
        $res=$this->qdata->_getAllFile("/session");
        $this->qdata->_removeFile($res,$this->qdata->_getIpClient()."=");
        $this->session->sess_destroy();
        return redirect("control");
    }

    function _checkKeyApp($keyForm,$kdMember){
        $kodeForm=false;
        $kodeForm=$keyForm;
        // return print_r($this->qdata->_qCekKey($kodeForm,$kdMember));
        $q=$this->qdata->_qCekKey($kodeForm,$kdMember);
        $member=$this->Queries->_func($q);
        // return count($member);
        if(count($member)==1){
            return true;
        }
        return false;
    }
    function _keamanan($codeForm){
        // del jika dia dionline kan
        // $this->session->set_userdata($session);
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
        $this->session->set_userdata($session);

        $kdMember=$this->session->kdMember;
        if($kdMember==null) {
            return $this->qdata->resF("session");
        }
        if($this->_checkKeyApp($codeForm,$kdMember)==0){
            return $this->qdata->resF("keyForm");
        }
        return $this->qdata->resT("");
    }
    function addKeySistem($val){
        // $a=array();
        // $a['kdMember']="2G18-memb-1";
        // $a['kdJabatan']="6";
        // return print_r(base64_encode(json_encode($a)));
        // eyJrZE1lbWJlciI6IjJHMTgtbWVtYi0xIiwia2RKYWJhdGFuIjoiNiJ9

        $baseEND=json_decode((base64_decode($val)));
        $kdMember=$baseEND->{'kdMember'};
        $kdJabatan=$baseEND->{'kdJabatan'};

        $nmApp=$this->Queries->_func("select * from app where kdApp='".$this->qdata->kdApp."'");
        $q="";
        if(count($nmApp)==0){
            $q.=" INSERT INTO app(kdApp,nmApp) VALUES ('".$this->qdata->kdApp."','".$this->qdata->nmApp."');";
        }


        $fitur=$this->Queries->_func("select * from appFitur where kdApp='".$this->qdata->kdApp."'");
        $fiturSystem=$this->qdata->_getAllNKA();
        if(count($fitur)!=count($fiturSystem)){
            $q.=" delete from appFitur where kdApp='".$this->qdata->kdApp."';";
            $q.=" INSERT INTO appFitur(kdApp, kdFitur, nmFitur) VALUES ";
            foreach ($fiturSystem as $key => $v) {
                $q.="(
                        ".$this->qdata->_checkStringQuery($this->qdata->kdApp).",
                        ".$this->qdata->_checkStringQuery($v['kd']).",
                        ".$this->qdata->_checkStringQuery($v['page'])."
                    ),";
            }
        }
        if(strlen($q)>0){
            $q=substr($q,0,strlen($q)-1).";";
        }
        $kunci=$this->Queries->_func("select * from appKey where kdMember=".$this->qdata->_checkStringQuery($kdMember)."");
        if(count($kunci)!=count($fiturSystem)){
            $q.=" delete from appKey where kdMember=".$this->qdata->_checkStringQuery($kdMember).";";
            $q.=" INSERT INTO appKey(kdApp,kdMember, kdFitur, Kunci) VALUES ";
            foreach ($fiturSystem as $key => $v) {
                foreach($v['kdJabatan'] as $key1 => $v1){
                    if($v1==$kdJabatan){
                        $q.="('".$this->qdata->kdApp."',".$this->qdata->_checkStringQuery($kdMember).",".$this->qdata->_checkStringQuery($v['kd']).",'0'),";
                    }
                }
            }
            $q=substr($q,0,strlen($q)-1);
        }
        if(strlen($q)==0){
            return print_r("Data Key Sudah Sesuai");
        }
        // return print_r($q);
        $this->Queries->_multiProc($q);
        print_r("sukses");
    }
    function read(){
        print_r($this->qdata->readExcel("excel/a.xlsx"));
        
        // require_once './../libraries/SimpleXLSX.php';
       
        // if ( $xlsx = SimpleXLSX::parse() ) {
        //     print_r( $xlsx->rows() );
        // } else {
        //     echo SimpleXLSX::parseError();
        // }
        // $excel = new Spreadsheet_Excel_Reader();
        // $excel->read($this->_['assert'].'excel/a.xlsx');
		// // $excel->read('public/sample.xls'); // set the excel file name here   
        // // $data['data_excell']=
        // print_r($excel->sheets[0]['cells']);
    }
    function formatIB(){
        $fdata=array();
        array_push($fdata,[
            'sheet'=>'Format',
            'nama'=>"Format File Barang",
            'KolomName'=>[
                'No'                =>'integer',
                'Nama Barang'       =>'string',
                'kode Scan'         =>'string',
                'Kode Jenis Satuan' =>'string',
                'Jumlah'            =>'string',
                'Harga Pengambilan' =>'string',
                'Harga Grosir'      =>'string',
                'Harga Eceran'      =>'string'
            ],
            'namaValue'=>[
                'nmGB','kdScan','kdJS',
                'jumlahS','hargaT','hargaG','hargaE'
            ],
            'width'=>[
                3,40,20,20,
                30,20,20,20
            ],
            'data'=>$this->Queries->_func("select * from gbarang where kdMember='2G18-memb-7' and status=1 limit 1"),
            'text-size'=>10
        ]);
        array_push($fdata,[
            'sheet'=>'Data Jenis Satuan',
            'KolomName'=>[
                'No'    =>'integer',
                'Kode'  =>'string',
                'Nama'  =>'string'
            ],
            'namaValue'=>[
                'value','valueName'
            ],
            'width'=>[
                3,20,40
            ],
            'data'=>$this->Queries->_func($this->qdata->_cbJSatuan()),
            'text-size'=>10
        ]);
        $this->qdata->writeExcel($fdata);
    }
    function formatDB(){
        $fdata=array();
        array_push($fdata,[
            'sheet'=>'Format',
            'nama'=>"Format File Detail Barang",
            'KolomName'=>[
                'No'                =>'integer',
                'kode Scan'         =>'string'
            ],
            'namaValue'=>[
                'kdScan'
            ],
            'width'=>[
                3,40
            ],
            'data'=>$this->Queries->_func("select * from barang where kdMember='2G18-memb-7' and status=1 limit 1"),
            'text-size'=>10
        ]);
        $this->qdata->writeExcel($fdata);
    }
    function formatBD(){
        $data   =$this->Queries->_func("select `nmGB`, `kdScan`,`kdJS`,`jumlahS`,`jumlahI`,`hargaT`, `hargaG`, `hargaE`,`kdGB` from gbarang where kdMember='2G18-memb-7' and status=1 limit 1");
        $data1  =$this->Queries->_func("select kdScan from barang where kdMember='2G18-memb-7' and status=1 and kdGB='".$this->qdata->_getNKT("gbar",false).$data[0]['kdGB']."'");

        $data=array_merge($data,$data1);
        // return print_r($data);
        $fdata=array();
        array_push($fdata,[
            'sheet'=>'Format',
            'nama'=>"Format File Barang & Detail Barang",
            'KolomName'=>[
                'No'                =>'integer',
                'Nama Barang'       =>'string',
                'kode Scan'         =>'string',
                'Kode Jenis Satuan' =>'string',
                'Jumlah'            =>'string',
                'Jumlah Item'       =>'string',
                'Harga Pengambilan' =>'string',
                'Harga Grosir'      =>'string',
                'Harga Eceran'      =>'string'
            ],
            'namaValue'=>[
                'nmGB', 'kdScan','kdJS','jumlahS','jumlahI','hargaT', 'hargaG', 'hargaE'
            ],
            'width'=>[
                3,40,20,20,
                30,20,20,20,20
            ],
            'data'=>$data,
            'text-size'=>10,
            'only-one'=>true
        ]);

        array_push($fdata,[
            'sheet'=>'Data Jenis Satuan',
            'KolomName'=>[
                'No'    =>'integer',
                'Kode'  =>'string',
                'Nama'  =>'string'
            ],
            'namaValue'=>[
                'value','valueName'
            ],
            'width'=>[
                3,20,40
            ],
            'data'=>$this->Queries->_func($this->qdata->_cbJSatuan()),
            'text-size'=>10
        ]);
        $this->qdata->writeExcel($fdata);
        // redirect('../assets/Library/excel/Format-File-barang-&-detail.xlsx');
    }
    function formatBDLokasi(){
        $data   =$this->Queries->_func($this->qdata->_barangLokSave());
        $data1  =$this->Queries->_func("select kdScan from barang where kdMember='2G18-memb-7' and status=1 limit 3");

        $data=array_merge($data,$data1);
        // return print_r($data);
        $fdata=array();
        array_push($fdata,[
            'sheet'=>'Format',
            'nama'=>"Format File Barang,Detail dan Lokasi",
            'KolomName'=>[
                'No'                =>'integer',
                'Nama Barang'       =>'string',
                'kode Scan'         =>'string',
                'Kode Jenis Satuan' =>'string',
                'Jumlah'            =>'string',
                'Jumlah Item'       =>'string',
                'Harga Pengambilan' =>'string',
                'Harga Grosir'      =>'string',
                'Harga Eceran'      =>'string',
                'Minimal Stok'      =>'string',
                'kode Save'         =>'string'
            ],
            'namaValue'=>[
                'nmGB', 'kdScan','kdJS','jumlahS','jumlahI','hargaT', 'hargaG', 'hargaE','jumlahM','kdSave'
            ],
            'width'=>[
                3,40,20,20,
                30,20,20,20,20
            ],
            'data'=>$data,
            'text-size'=>10,
            'only-one'=>true
        ]);

        array_push($fdata,[
            'sheet'=>'Data Jenis Satuan',
            'KolomName'=>[
                'No'    =>'integer',
                'Kode'  =>'string',
                'Nama'  =>'string'
            ],
            'namaValue'=>[
                'value','valueName'
            ],
            'width'=>[
                3,20,40
            ],
            'data'=>$this->Queries->_func($this->qdata->_cbJSatuan()),
            'text-size'=>10
        ]);
        array_push($fdata,[
            'sheet'=>'Data Penyimpanan (SAVE)',
            'KolomName'=>[
                'No'    =>'integer',
                'Kode'  =>'string',
                'Nama'  =>'string',
                'Keterangan'  =>'string'
            ],
            'namaValue'=>[
                'kdSave','nmLokasi','keterangan'
            ],
            'width'=>[
                3,20,40,40
            ],
            'data'=>$this->Queries->_func("select concat('".$this->qdata->_getNKT("save",false)."',kdSave) as kdSave,nmLokasi,keterangan from penyimpanan where kdMember='".$this->session->kdMember."'"),
            'text-size'=>10
        ]);
        $this->qdata->writeExcel($fdata);
    }
}
