<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Proses extends CI_Controller {
    private $bgs;
    function __construct(){
        parent::__construct();
        // $this->load->library('method');		
        $this->load->library('qdata');
        $this->load->model('Queries');
        $this->load->library('Session');
        $this->load->helper('url');
        $this->load->helper('file');
        $this->load->library('LibBGS');
        $this->_=array();
        // $this->load->library('pdf');
        $this->bgs=new LibBGS();
        $this->startLokal();
        
        $this->kdMember=$this->session->kdMember;
        $this->nmDinas=$this->session->nmDinas;
        $this->kdJabatan=$this->session->kdJabatan;
        $this->progres=$this->session->progres;
        $this->finals=$this->session->finals;
        $this->tahun=$this->session->tahun;
        $this->perkada=$this->session->perkada;
        $this->noPembahasan=$this->session->noPembahasan;
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
	public function checkUser(){
        $kondisi=false;
        if($this->session->kode==null){
            $data=$_POST['data'];
            if(empty($_POST['data'])){
                return redirect("control");
            }
            
            $baseEND=json_decode((base64_decode($data)));
            // if(!$this->qdata->_backCodes(base64_decode($_POST['code']))){
            //     return $this->qdata->responFalse("Tidak Sesuai Keamanan Sistem !!!");
            // }

            $password   =$baseEND->{'password'};
            $username   =$baseEND->{'username'};
            $kondisi=true;
        }else{
            $password   =$this->session->password;
            $username   =$this->session->nama;
        }
        $q="select * from member where UPPER(username)=UPPER('".$username."') and UPPER(password)=UPPER('".$password."') ";
        $member=$this->Queries->_func($q);
        if(count($member)==1){
            if($kondisi){//for login awal no session
                if(substr($member[0]['kdJabatan'],5)<3){
                    $pembahasan=$this->Queries->_func("SELECT tahun,noPembahasan,progres,finals,files FROM pembahasan ORDER by ins desc limit 1");
                    if(count($pembahasan)==0){
                        return $this->qdata->responFalse("Sistem Tidak Dapat Digunakan ");
                    }
                }
                return $this->qdata->responTrue("Sukses");
            }
            return $this->qdata->responFalse("Sukses");
        }else{
            if($kondisi){//for login awal no session
                return $this->qdata->responFalse("user tidak dapat ditemukan !!!");
            }
        }
        print_r(json_encode($this->_));
    }
    function inpPeraturan(){
        // return print_r($_POST['code']);
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-perd"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
    
            $judul      =$baseEND->{'judul'};
            $deskripsi  =$baseEND->{'deskripsi'};

            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }

            $keyTabel="noPerda";
            $kdTabel=$this->Queries->_func("select ".$keyTabel." from perda ORDER BY cast(".$keyTabel." as int) DESC limit 1");
            // return print_r($kdTabel);
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }
            $q="
                INSERT INTO perda (noPerda, judul, deskripsi, files) VALUES 
                (
                    ".$this->qdata->_checkStringQuery($kdTabel).",".$this->qdata->_checkStringQuery($judul).",
                    ".$this->qdata->_checkStringQuery($deskripsi).",'".$namaFile."'
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            
            if($check){
                $this->_['dperda']    =$this->Queries->_func("SELECT * FROM perda");
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }
        return $this->qdata->responFalse($portal['msg']);
    }
    function updPeraturan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-perd"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $judul      =$baseEND->{'judul'};
            $deskripsi  =$baseEND->{'deskripsi'};
            $noPerda    =$baseEND->{'noPerda'};

            $check=$this->Queries->_proc("
                UPDATE perda SET 
                    judul=".$this->qdata->_checkStringQuery($judul).",
                    deskripsi=".$this->qdata->_checkStringQuery($deskripsi)."
                    WHERE noPerda='".$noPerda."'
            ");
            if($check){
                $this->_['dperda']    =$this->Queries->_func("SELECT * FROM perda");
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
        
    }
    function delPeraturan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-perd"));
        $portal['exec']=true;
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $noPerda    =$baseEND->{'noPerda'};
            $check=$this->Queries->_proc("
                delete from perda WHERE noPerda='".$noPerda."'
            ");
            if($check){
                $this->_['dperda']    =$this->Queries->_func("SELECT * FROM perda");
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }

    function inpJabatan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-jaba"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $nmJabatan   =$baseEND->{'nmJabatan'};
            $check=$this->Queries->_proc("
                INSERT INTO jabatan (nmJabatan) VALUES 
                (
                    ".$this->qdata->_checkStringQuery($nmJabatan)."
                )
            ");
            if($check){
                $this->_['djabatan']     =$this->Queries->_func("SELECT * FROM jabatan");
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updJabatan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-jaba"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $kdJabatan   =$baseEND->{'kdJabatan'};
            $nmJabatan   =$baseEND->{'nmJabatan'};
            $check=$this->Queries->_proc("
                update jabatan set nmJabatan= ".$this->qdata->_checkStringQuery($nmJabatan)." where kdJabatan='".$kdJabatan."'
            ");
            if($check){
                $this->_['djabatan']     =$this->Queries->_func("SELECT * FROM jabatan");
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delJabatan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-jaba"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdJabatan   =$baseEND->{'kdJabatan'};
            $check=$this->Queries->_proc("
                delete from jabatan where kdJabatan='".$kdJabatan."'
            ");
            if($check){
                $this->_['djabatan']     =$this->Queries->_func("SELECT * FROM jabatan");
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }

    function inpDinas(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-dina"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            
            $nmDinas    =$baseEND->{'nmDinas'};
            $kadis      =$baseEND->{'kadis'};
            $nip        =$baseEND->{'nip'};
            $pagu       =$baseEND->{'pagu'};

            $kdDinas    =$baseEND->{'kdDinas'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $check=$this->Queries->_proc("
                INSERT INTO `dinas`(`kdDinas`, `nmDinas`, `kadis`, `nip`,`pagu`,`perkada`,`tahun`) VALUES
                (
                    ".$this->qdata->_checkStringQuery($kdDinas).",
                    ".$this->qdata->_checkStringQuery($nmDinas).",
                    ".$this->qdata->_checkStringQuery($kadis).",
                    ".$this->qdata->_checkStringQuery($nip).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ");
            if($check){
                $this->_['ddinas']     =$this->Queries->_func($this->qdata->_ddinas($perkada,$tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updDinas(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-dina"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $kdDinas    =$baseEND->{'kdDinas'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $nmDinas    =$baseEND->{'nmDinas'};
            $kadis      =$baseEND->{'kadis'};
            $nip        =$baseEND->{'nip'};
            $pagu         =$baseEND->{'pagu'};

            $check=$this->Queries->_proc("
                update dinas set 
                    nmDinas=".$this->qdata->_checkStringQuery($nmDinas).",
                    kadis=".$this->qdata->_checkStringQuery($kadis).",
                    nip=".$this->qdata->_checkStringQuery($nip).",
                    pagu=".$this->qdata->_checkStringQuery($pagu)."
                    where kdDinas=".$this->qdata->_checkStringQuery($kdDinas)." and
                    perkada=".$this->qdata->_checkStringQuery($perkada)." and 
                    tahun=".$this->qdata->_checkStringQuery($tahun)."
            ");
            if($check){
                $this->_['ddinas']     =$this->Queries->_func($this->qdata->_ddinas($perkada,$tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delDinas(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-dina"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdDinas    =$baseEND->{'kdDinas'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $check=$this->Queries->_proc("
                delete from dinas
                where kdDinas=".$this->qdata->_checkStringQuery($kdDinas)." and
                perkada=".$this->qdata->_checkStringQuery($perkada)." and 
                tahun=".$this->qdata->_checkStringQuery($tahun)."
            ");
            if($check){
                $this->_['ddinas']     =$this->Queries->_func($this->qdata->_ddinas($perkada,$tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    
    function inpMember(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdDinas     =$baseEND->{'kdDinas'};
            $kdJabatan   =$baseEND->{'kdJabatan'};
            $username    =$baseEND->{'username'};
            $password    =$baseEND->{'password'};
            $nmMember    =$baseEND->{'nmMember'};

            $keyTabel="kdMember";
            $kdTabel=$this->Queries->_func("select ".$keyTabel." from member ORDER BY cast(".$keyTabel." as int) DESC limit 1");
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }
            $q="
                INSERT INTO member(
                    kdMember, kdMember1, 
                    nmMember, kdJabatan, kdDinas,
                    username,password
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdTabel).",".$this->qdata->_checkStringQuery("2G18-memb-".$kdTabel).",
                    ".$this->qdata->_checkStringQuery($nmMember).",
                    ".$this->qdata->_checkStringQuery($kdJabatan).",".$this->qdata->_checkStringQuery($kdDinas).",
                    ".$this->qdata->_checkStringQuery("M".($kdTabel-1)."-".$username).",".$this->qdata->_checkStringQuery($password)."
                )
            ";
            // return print_r(substr($kdJabatan,strlen($kdJabatan)-1));
            $check=$this->Queries->_proc($q);
            if($check){
                $a=array();
                $a['kdMember']="2G18-memb-".$kdTabel;
                $a['kdJabatan']=substr($kdJabatan,strlen($kdJabatan)-1);
                $check=$this->addKeySistem(base64_encode(json_encode($a)));
                // return print_r($check);
                $this->_['dmember']     =$this->Queries->_func($this->qdata->_dMember());
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updMember(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $nmMember    =$baseEND->{'nmMember'};
            $kdDinas     =$baseEND->{'kdDinas'};
            $kdJabatan   =$baseEND->{'kdJabatan'};
            $username    =$baseEND->{'username'};
            $password    =$baseEND->{'password'};
            $kdMember    =$baseEND->{'kdMember'};

            $q="
                update member set 
                    nmMember=".$this->qdata->_checkStringQuery($nmMember).", kdJabatan=".$this->qdata->_checkStringQuery($kdJabatan).", 
                    kdDinas=".$this->qdata->_checkStringQuery($kdDinas).",username=".$this->qdata->_checkStringQuery($username).",
                    password=".$this->qdata->_checkStringQuery($password)."
                where kdMember=".$this->qdata->_checkStringQuery($kdMember)."
            ";
            // return  print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dmember']     =$this->Queries->_func($this->qdata->_dMember());
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delMember(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdMember   =$baseEND->{'kdMember'};
            $check=$this->Queries->_proc("
                update member set aktif=0 where kdMember1='".$kdMember."'
            ");
            // return print_r($check);
            if($check){
                $this->_['dmember']     =$this->Queries->_func($this->qdata->_dMember());
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }
    function refreshHakAkses(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdJabatan  =$baseEND->{'kdJabatan'};
            $kdMember   =$baseEND->{'kdMember'};
            $a=array();
            $a['kdMember']=$kdMember;
            $a['kdJabatan']=substr($kdJabatan,strlen($kdJabatan)-1);
            // return print_r($a);
            $check=$this->addKeySistem(base64_encode(json_encode($a)));
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }

//uraian kegiatan
    function inpUrusan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd     =$baseEND->{'kd'};
            $nm     =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            // $keyTabel="kdMember";
            // $kdTabel=$this->Queries->_func("select ".$keyTabel." from member ORDER BY cast(".$keyTabel." as int) DESC limit 1");
            // if(count($kdTabel)>0){
            //     $kdTabel=$kdTabel[0][$keyTabel]+1;
            // }else{
            //     $kdTabel=1;
            // }
            $q="
                INSERT INTO durusan(
                    kdUrusan,nmUrusan,taUrusan,perkadaU
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kd).",".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($tahun).",".$this->qdata->_checkStringQuery($perkada)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['durusan']     =$this->Queries->_func($this->qdata->_durusan(" where taUrusan='".$tahun."'  and perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updUrusan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd     =$baseEND->{'kd'};
            $nm     =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            $q="
                update durusan set
                    nmUrusan=".$this->qdata->_checkStringQuery($nm)."
                where kdUrusan=".$this->qdata->_checkStringQuery($kd)."
                and taUrusan=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaU=".$this->qdata->_checkStringQuery($perkada)."
            ";
            // return  print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['durusan']     =$this->Queries->_func($this->qdata->_durusan(" where taUrusan='".$tahun."'  and perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delUrusan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd   =$baseEND->{'kd'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            $check=$this->Queries->_proc("
                delete from durusan where kdUrusan='".$kd."'
                and taUrusan=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaU=".$this->qdata->_checkStringQuery($perkada)."
            ");
            if($check){
                $this->_['durusan']     =$this->Queries->_func($this->qdata->_durusan(" where taUrusan='".$tahun."'  and perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpBidang(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdUrusan   =$baseEND->{'kdUrusan'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="
                INSERT INTO dbidang(
                    kdUrusan,kdBidang,nmBidang,taBidang,perkadaB
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdUrusan).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($tahun).",".$this->qdata->_checkStringQuery($perkada)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dbidang']     =$this->Queries->_func($this->qdata->_dbidang(" where a.taUrusan='".$tahun."'  and a.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updBidang(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdUrusan   =$baseEND->{'kdUrusan'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="update dbidang set nmBidang=".$this->qdata->_checkStringQuery($nm)."
                where kdUrusan=".$this->qdata->_checkStringQuery($kdUrusan)." 
                and kdBidang=".$this->qdata->_checkStringQuery($kd)."
                and taBidang=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaB=".$this->qdata->_checkStringQuery($perkada)."
            ";
            // return  print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dbidang']     =$this->Queries->_func($this->qdata->_dbidang(" where a.taUrusan='".$tahun."'  and a.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delBidang(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdUrusan   =$baseEND->{'kdUrusan'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            $check=$this->Queries->_proc("
                delete from dbidang where kdUrusan=".$this->qdata->_checkStringQuery($kdUrusan)." 
                and kdBidang=".$this->qdata->_checkStringQuery($kd)."
                and taBidang=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaB=".$this->qdata->_checkStringQuery($perkada)."
            ");
            if($check){
                $this->_['dbidang']     =$this->Queries->_func($this->qdata->_dbidang(" where a.taUrusan='".$tahun."'  and a.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpProgram(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdBidang   =$baseEND->{'kdBidang'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            $q="
                INSERT INTO dProgram(
                    kdBidang,kdProgram,nmProgram,taProgram,perkadaP
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdBidang).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($tahun).",".$this->qdata->_checkStringQuery($perkada)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dprogram']     =$this->Queries->_func($this->qdata->_dprogram(false," where c.taUrusan='".$tahun."'  and c.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updProgram(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdBidang   =$baseEND->{'kdBidang'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="update dProgram set nmProgram=".$this->qdata->_checkStringQuery($nm)."
                where kdBidang=".$this->qdata->_checkStringQuery($kdBidang)." 
                and kdProgram=".$this->qdata->_checkStringQuery($kd)."
                and taProgram=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaP=".$this->qdata->_checkStringQuery($perkada)."
            ";
            // return  print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dprogram']     =$this->Queries->_func($this->qdata->_dprogram(false," where c.taUrusan='".$tahun."'  and c.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delProgram(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdBidang   =$baseEND->{'kdBidang'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            $check=$this->Queries->_proc("
                delete from dProgram where kdBidang=".$this->qdata->_checkStringQuery($kdBidang)." 
                and kdProgram=".$this->qdata->_checkStringQuery($kd)."
                and taProgram=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaP=".$this->qdata->_checkStringQuery($perkada)."
            ");
            if($check){
                $this->_['dprogram']     =$this->Queries->_func($this->qdata->_dprogram(false," where c.taUrusan='".$tahun."'  and c.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpKegiatan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdProgram  =$baseEND->{'kdProgram'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="
                INSERT INTO dKegiatan(
                    kdProgram,kdKegiatan,nmKegiatan,taKegiatan,perkadaK
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdProgram).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($tahun).",".$this->qdata->_checkStringQuery($perkada)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dkegiatan']     =$this->Queries->_func($this->qdata->_dkegiatan(false," where d.taUrusan='".$tahun."'  and d.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updKegiatan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdProgram  =$baseEND->{'kdProgram'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="update dkegiatan set nmKegiatan=".$this->qdata->_checkStringQuery($nm)."
                where kdProgram=".$this->qdata->_checkStringQuery($kdProgram)." 
                and kdKegiatan=".$this->qdata->_checkStringQuery($kd)."
                and taKegiatan=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaK=".$this->qdata->_checkStringQuery($perkada)."
            ";
            // return  print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dkegiatan']     =$this->Queries->_func($this->qdata->_dkegiatan(false," where d.taUrusan='".$tahun."'  and d.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delKegiatan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdProgram  =$baseEND->{'kdProgram'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};

            $check=$this->Queries->_proc("
                delete from dkegiatan where kdProgram=".$this->qdata->_checkStringQuery($kdProgram)." 
                and kdKegiatan=".$this->qdata->_checkStringQuery($kd)."
                and taKegiatan=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaK=".$this->qdata->_checkStringQuery($perkada)."
            ");
            if($check){
                $this->_['dkegiatan']     =$this->Queries->_func($this->qdata->_dkegiatan(false," where d.taUrusan='".$tahun."'  and d.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpSub(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdDinas    =$baseEND->{'kdDinas'};
            $kdKegiatan =$baseEND->{'kdKegiatan'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="
                INSERT INTO dsub(
                    kdKegiatan,kdSUb,nmSub,kdDinas,taSub,perkadaS
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdKegiatan).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($kdDinas).",
                    ".$this->qdata->_checkStringQuery($tahun).",".$this->qdata->_checkStringQuery($perkada)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dsub']     =$this->Queries->_func($this->qdata->_dsub(false," where e.taUrusan='".$tahun."'  and e.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdKegiatan =$baseEND->{'kdKegiatan'};
            $kdDinas    =$baseEND->{'kdDinas'};
            $nm         =$baseEND->{'nm'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $q="update dsub set nmSub=".$this->qdata->_checkStringQuery($nm)."
                where kdKegiatan=".$this->qdata->_checkStringQuery($kdKegiatan)." 
                and kdSub=".$this->qdata->_checkStringQuery($kd)." 
                and kdDinas=".$this->qdata->_checkStringQuery($kdDinas)."
                and taSub=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaS=".$this->qdata->_checkStringQuery($perkada)."
            ";
            // return  print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dsub']     =$this->Queries->_func($this->qdata->_dsub(false," where e.taUrusan='".$tahun."'  and e.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdKegiatan =$baseEND->{'kdKegiatan'};
            $kdDinas    =$baseEND->{'kdDinas'};
            $perkada=$baseEND->{'perkada'};
            $tahun  =$baseEND->{'tahun'};
            
            $check=$this->Queries->_proc("
                delete from dSub where kdKegiatan=".$this->qdata->_checkStringQuery($kdKegiatan)." 
                and kdSub=".$this->qdata->_checkStringQuery($kd)." 
                and kdDinas=".$this->qdata->_checkStringQuery($kdDinas)."
                and taSub=".$this->qdata->_checkStringQuery($tahun)."
                and perkadaS=".$this->qdata->_checkStringQuery($perkada)."
            ");
            if($check){
                $this->_['dsub']     =$this->Queries->_func($this->qdata->_dsub(false," where e.taUrusan='".$tahun."'  and e.perkadaU='".$perkada."'"));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

//apbd
    function inpSub1(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
             
            $q=" call paddSub1(
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub1']     =$this->Queries->_func($this->qdata->_dsub1($pembahasan,$tahun," and perkada1=".$perkada));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub1(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q="call pupdSub1(
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun).")
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub1']     =$this->Queries->_func($this->qdata->_dsub1($pembahasan,$tahun," and perkada1=".$perkada));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub1(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $check=$this->Queries->_proc("
                delete from apbdsub1 where kdSub1=".$this->qdata->_checkStringQuery($kd)."
                and noPembahasan1=".$this->qdata->_checkStringQuery($pembahasan)." 
                and perkada1=".$this->qdata->_checkStringQuery($perkada)." 
                and date1=".$this->qdata->_checkStringQuery($tahun)." 
            ");
            if($check){
                $this->_['dsub1']     =$this->Queries->_func($this->qdata->_dsub1($pembahasan,$tahun," and perkada1=".$perkada));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpSub2(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub1     =$baseEND->{'kdSub1'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call paddSub2(
                    ".$this->qdata->_checkStringQuery($kdSub1).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub2']     =$this->Queries->_func($this->qdata->_dsub2(0,$this->tahun," and b.perkada2=".$perkada));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub2(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $kdSub1     =$baseEND->{'kdSub1'};
            $nm         =$baseEND->{'nm'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pupdSub2(
                ".$this->qdata->_checkStringQuery($kdSub1).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub2']     =$this->Queries->_func($this->qdata->_dsub2(0,$this->tahun," and b.perkada2=".$perkada));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub2(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdSub1     =$baseEND->{'kdSub1'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
           $q=" call pdelSub2(
                ".$this->qdata->_checkStringQuery($kdSub1).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub2']     =$this->Queries->_func($this->qdata->_dsub2(0,$this->tahun," and b.perkada2=".$perkada));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpSub3(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub2     =$baseEND->{'kdSub2'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call paddSub3(
                    ".$this->qdata->_checkStringQuery($kdSub2).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub3']     =$this->Queries->_func($this->qdata->_dsub3(false,0,$this->tahun," and c.perkada3=".$perkada));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub3(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub2     =$baseEND->{'kdSub2'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pupdSub3(
                ".$this->qdata->_checkStringQuery($kdSub2).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub3']     =$this->Queries->_func($this->qdata->_dsub3(false,0,$this->tahun," and c.perkada3=".$perkada));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub3(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdSub2     =$baseEND->{'kdSub2'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q=" call pdelSub3(
                ".$this->qdata->_checkStringQuery($kdSub2).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub3']     =$this->Queries->_func($this->qdata->_dsub3(false,0,$this->tahun," and c.perkada3=".$perkada));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }


    function inpSub4(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub3     =$baseEND->{'kdSub3'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $q=" call paddSub4(
                    ".$this->qdata->_checkStringQuery($kdSub3).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub4']     =$this->Queries->_func($this->qdata->_dsub4(false,0,$this->tahun,""));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub4(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub3     =$baseEND->{'kdSub3'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pupdSub4(
                ".$this->qdata->_checkStringQuery($kdSub3).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub4']     =$this->Queries->_func($this->qdata->_dsub4(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub4(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdSub3     =$baseEND->{'kdSub3'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};


            $q=" call pdelSub4(
                ".$this->qdata->_checkStringQuery($kdSub3).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub4']     =$this->Queries->_func($this->qdata->_dsub4(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }


    function inpSub5(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub4     =$baseEND->{'kdSub4'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q=" call paddSub5(
                    ".$this->qdata->_checkStringQuery($kdSub4).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub5']     =$this->Queries->_func($this->qdata->_dsub5(false,0,$this->tahun,""));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub5(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub4     =$baseEND->{'kdSub4'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pupdSub5(
                ".$this->qdata->_checkStringQuery($kdSub4).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub5']     =$this->Queries->_func($this->qdata->_dsub5(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub5(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdSub4     =$baseEND->{'kdSub4'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q=" call pdelSub5(
                ".$this->qdata->_checkStringQuery($kdSub4).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub5']     =$this->Queries->_func($this->qdata->_dsub5(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }


    function inpSub6(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub5     =$baseEND->{'kdSub5'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q=" call paddSub6(
                    ".$this->qdata->_checkStringQuery($kdSub5).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub6']     =$this->Queries->_func($this->qdata->_dsub6(false,0,$this->tahun,""));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub6(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub5     =$baseEND->{'kdSub5'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pupdSub6(
                ".$this->qdata->_checkStringQuery($kdSub5).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub6']     =$this->Queries->_func($this->qdata->_dsub6(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub6(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdSub5     =$baseEND->{'kdSub5'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pdelSub6(
                ".$this->qdata->_checkStringQuery($kdSub5).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub6']     =$this->Queries->_func($this->qdata->_dsub6(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

    function inpSub7(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-duru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub6     =$baseEND->{'kdSub6'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q=" call paddSub7(
                    ".$this->qdata->_checkStringQuery($kdSub6).",
                    ".$this->qdata->_checkStringQuery($kd).",
                    ".$this->qdata->_checkStringQuery($nm).",
                    ".$this->qdata->_checkStringQuery($pagu).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_funcProcedure($q);
            if($check){
                if($check[0]['status']){
                    $this->_['dsub7']     =$this->Queries->_func($this->qdata->_dsub7(false,0,$this->tahun,""));
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("Data Dengan Kode Tersebut Telah Terdaftar Pada Sistem !!!");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updSub7(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kd         =$baseEND->{'kd'};
            $nm         =$baseEND->{'nm'};
            $kdSub6     =$baseEND->{'kdSub6'};
            $pagu       =$baseEND->{'pagu'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" call pupdSub7(
                ".$this->qdata->_checkStringQuery($kdSub6).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($nm).",
                ".$this->qdata->_checkStringQuery($pagu).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return  print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub7']     =$this->Queries->_func($this->qdata->_dsub7(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delSub7(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-memb"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kd         =$baseEND->{'kd'};
            $kdSub6     =$baseEND->{'kdSub6'};
            $pembahasan =$baseEND->{'pembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q=" call pdelSub7(
                ".$this->qdata->_checkStringQuery($kdSub6).",
                ".$this->qdata->_checkStringQuery($kd).",
                ".$this->qdata->_checkStringQuery($pembahasan).",
                ".$this->qdata->_checkStringQuery($perkada).",
                ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $this->_['dsub7']     =$this->Queries->_func($this->qdata->_dsub7(false,0,$this->tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    
    }

//usulan
    function changeSubKeg(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-usul"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $kdDinas =$baseEND->{'kdDinas'};

            $this->_['dsub']=$this->Queries->_func($this->qdata->_cbSub(false," where b.kdDinas='".$kdDinas."'"));
            return $this->qdata->responTrue($this->_);
        }return $this->qdata->responFalse($portal['msg']);
    }
    function inpUsulan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-usul"));
        if($portal['exec']){

            if($this->_checkPenutupanPenambahanUsulan()){
                return $this->qdata->responFalse("Maaf, permintaan anda kami tolak, pembahasan di forum telah dibuka !!!");
            }

            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdKelompok =$baseEND->{'kdKelompok'};
            $kdJenis    =$baseEND->{'kdJenis'};
            $kdSub      =$baseEND->{'kdSub'};
            $usulan     =$baseEND->{'usulan'};

            $kdDinas      =$baseEND->{'kdDinas'};

            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $nomor      =$baseEND->{'nomor'};
            $tanggal    =$baseEND->{'tanggal'};
            $volume     =$baseEND->{'volume'};
            $satuan     =$baseEND->{'satuan'};
            $nilai      =$baseEND->{'nilai'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }
            $keyTabel="kdUsulan";
            $kdTabel=$this->Queries->_func("
                select ".$keyTabel." 
                from usulan 
                where 
                    kdMember='".$this->kdMember."' 
                    and noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($this->perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($this->tahun)."
                ORDER BY ".$keyTabel." DESC limit 1"
            );
            // return print_r($kdTabel);
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }
            $q="
                INSERT INTO usulan(
                        kdUsulan,kdMember,kdDinas,kdSub1, kdSubJenis, kdSub, 
                        nmUsulan, no, date, vol, 
                        sat, nilai, files,
                        noPembahasan,perkada, tahun
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdTabel).",".$this->qdata->_checkStringQuery($this->kdMember).",
                        ".$this->qdata->_checkStringQuery($kdDinas).",".$this->qdata->_checkStringQuery($kdKelompok).",
                        ".$this->qdata->_checkStringQuery($kdJenis).",".$this->qdata->_checkStringQuery($kdSub).",
                    ".$this->qdata->_checkStringQuery($usulan).",".$this->qdata->_checkStringQuery($nomor).",
                        ".$this->qdata->_checkStringQuery($tanggal).",".$this->qdata->_checkStringQuery($volume).",
                    ".$this->qdata->_checkStringQuery($satuan).",".$this->qdata->_checkStringQuery($nilai).",
                        ".$this->qdata->_checkStringQuery($namaFile).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun)."
                )
            ";
            
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $where=" and h.kdMember=".$this->qdata->_checkStringQuery($this->kdMember);
                if($this->kdJabatan>2){
                    $where="";
                }
                $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulan($pembahasan,$this->perkada,$this->tahun,$where));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updUsulan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-usul"));
        if($portal['exec']){
            if($this->_checkPenutupanPenambahanUsulan()){
                return $this->qdata->responFalse("Maaf, permintaan anda kami tolak, pembahasan di forum telah dibuka !!!");
            }
            
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdKelompok =$baseEND->{'kdKelompok'};
            $kdJenis    =$baseEND->{'kdJenis'};
            $kdSub      =$baseEND->{'kdSub'};
            $usulan     =$baseEND->{'usulan'};
            
            $kdDinas      =$baseEND->{'kdDinas'};

            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $nomor      =$baseEND->{'nomor'};
            $tanggal    =$baseEND->{'tanggal'};
            $volume     =$baseEND->{'volume'};
            $satuan     =$baseEND->{'satuan'};
            $nilai      =$baseEND->{'nilai'};
            $kdUsulan   =$baseEND->{'kdUsulan'};

            
            $q="
                update usulan set
                        kdDinas=".$this->qdata->_checkStringQuery($kdDinas).",
                        kdSub1=".$this->qdata->_checkStringQuery($kdKelompok).", kdSubJenis=".$this->qdata->_checkStringQuery($kdJenis).", 
                        kdSub=".$this->qdata->_checkStringQuery($kdSub).", nmUsulan=".$this->qdata->_checkStringQuery($usulan).", 
                        no=".$this->qdata->_checkStringQuery($nomor).", date=".$this->qdata->_checkStringQuery($tanggal).", 
                        vol=".$this->qdata->_checkStringQuery($volume).", sat=".$this->qdata->_checkStringQuery($satuan).", 
                        nilai=".$this->qdata->_checkStringQuery($nilai)."
                where 
                    kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and 
                    kdMember=".$this->qdata->_checkStringQuery($this->kdMember)." and
                    noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
                    perkada=".$this->qdata->_checkStringQuery($perkada)." and
                    tahun=".$this->qdata->_checkStringQuery($tahun)."
            ";
            $check=$this->Queries->_proc($q);
            if($check){
                $where=" and h.kdMember=".$this->qdata->_checkStringQuery($this->kdMember);
                if($this->kdJabatan>2){
                    $where="";
                }
                $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulan($pembahasan,$this->perkada,$this->tahun,$where));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function updUsulanx(){ //for adm
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("p-usul"));
        if($portal['exec']){
            
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdKelompok =$baseEND->{'kdKelompok'};
            $kdJenis    =$baseEND->{'kdJenis'};
            $kdSub      =$baseEND->{'kdSub'};
            $usulan     =$baseEND->{'usulan'};
            
            $kdDinas      =$baseEND->{'kdDinas'};

            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $nomor      =$baseEND->{'nomor'};
            $tanggal    =$baseEND->{'tanggal'};
            $volume     =$baseEND->{'volume'};
            $satuan     =$baseEND->{'satuan'};
            $nilai      =$baseEND->{'nilai'};
            $kdUsulan   =$baseEND->{'kdUsulan'};
            
            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }

            if(strlen($namaFile)!=0){
                $namaFile=", files='".$namaFile."'";
            }
            $q="
                update usulan set
                        kdDinas=".$this->qdata->_checkStringQuery($kdDinas).",
                        kdSub1=".$this->qdata->_checkStringQuery($kdKelompok).", kdSubJenis=".$this->qdata->_checkStringQuery($kdJenis).", 
                        kdSub=".$this->qdata->_checkStringQuery($kdSub).", nmUsulan=".$this->qdata->_checkStringQuery($usulan).", 
                        no=".$this->qdata->_checkStringQuery($nomor).", date=".$this->qdata->_checkStringQuery($tanggal).", 
                        vol=".$this->qdata->_checkStringQuery($volume).", sat=".$this->qdata->_checkStringQuery($satuan).", 
                        nilai=".$this->qdata->_checkStringQuery($nilai)."
                        ".$namaFile."
                where 
                    kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and 
                    kdMember=".$this->qdata->_checkStringQuery($this->kdMember)." and
                    noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
                    perkada=".$this->qdata->_checkStringQuery($perkada)." and
                    tahun=".$this->qdata->_checkStringQuery($tahun)."
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $where=" and h.kdMember=".$this->qdata->_checkStringQuery($this->kdMember);
                if($this->kdJabatan>2){
                    $where="";
                }
                $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulan($pembahasan,$this->perkada,$this->tahun,$where));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delUsulan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-usul"));
        if($portal['exec']){
            if($this->_checkPenutupanPenambahanUsulan()){
                return $this->qdata->responFalse("Maaf, permintaan anda kami tolak, pembahasan di forum telah dibuka !!!");
            }

            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};

            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            
            $q=" delete from usulan where 
                    kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and 
                    kdMember=".$this->qdata->_checkStringQuery($this->kdMember)." and
                    noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
                    perkada=".$this->qdata->_checkStringQuery($perkada)." and
                    tahun=".$this->qdata->_checkStringQuery($this->tahun)." 
            ";
            // return print_r($q);
            $check=$this->Queries->_procProcedure($q);
            if($check){
                $where=" and h.kdMember=".$this->qdata->_checkStringQuery($this->kdMember);
                if($this->kdJabatan>2){
                    $where="";
                }
                $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulan($pembahasan,$this->perkada,$this->tahun,$where));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);

    }
    function kirimUsulan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-usul"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kodePage   =$baseEND->{'kodePage'};
            $pembahasan =$baseEND->{'noPembahasan'};
            
            $q=" update appkey set 
                    kunci=1 
                where kdMember=".$this->qdata->_checkStringQuery($this->kdMember)." and 
                    kdFitur!=".$this->qdata->_checkStringQuery($kodePage)." and
                    kdFitur like '%".explode("/",$kodePage)[0]."%';";
            $q.=" update usulan set 
                            status=".$this->qdata->_checkStringQuery("terkirim").",
                            finals=now()
                        where kdMember=".$this->qdata->_checkStringQuery($this->kdMember)." and
                        noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
                        tahun=".$this->qdata->_checkStringQuery($this->tahun).";";
            
            $this->_setNotification("USULAN",$this->nmDinas." telah mengirimkan usulan pada tahapan pembahasan ke-".($pembahasan),"Lihat Usulan",3);
            
        // $keyTabel="kdNotif";
            // $kdTabel=$this->Queries->_func("
            //     select ".$keyTabel." 
            //     from notif
            //     ORDER BY ".$keyTabel." DESC limit 1"
            // );
            // if(count($kdTabel)>0){
            //     $kdTabel=$kdTabel[0][$keyTabel]+1;
            // }else{
            //     $kdTabel=1;
            // }
            // $qNotif=" INSERT INTO notif
            //             (kdNotif,fitur, isiNotif, nmTombol, url)
            //         VALUES 
            //             (
            //                 ".$this->qdata->_checkStringQuery($kdTabel).",
            //                 ".$this->qdata->_checkStringQuery("USULAN").",
            //                 ".$this->qdata->_checkStringQuery($this->nmDinas." telah mengirimkan usulan pada tahapan pembahasan ke-".($pembahasan)).",
            //                 ".$this->qdata->_checkStringQuery("Lihat Usulan").",
            //                 ".$this->qdata->_checkStringQuery($this->qdata->_getUrl("usulan"))."
            //             );";
            // $qNotif.=" INSERT INTO notifuser(kdMember, kdNotif) (".$this->qdata->_dmemberSetingkat(3,$kdTabel).")"; // tingkat 3 bisa dicek di tabel jabatan kolom setingkat
            // $q.=$qUsulan;
        // return print_r($q);
            $check=$this->Queries->_multiProc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function mengertiInfo(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("p-usul"));
        if($portal['exec']){
            $check=$this->Queries->_proc($this->qdata->_updDateInformasiDimengerti($this->kdMember,""));
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);

    }

    function saveDisposisi(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-disp"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $kdMember   =$baseEND->{'kdMember'};

            $tglTerima  =$baseEND->{'tglTerima'};
            $tglPenyelsaian =$baseEND->{'tglPenyelsaian'};
            $tujuan     =$baseEND->{'tujuanBupati'};
            $nmTujuan   =$baseEND->{'nmTujuanBupati'};
            $isi        =$baseEND->{'isi'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                foreach ($file as $key => $v) {
                    $namaFile.=$this->_uploadImage($v['src'],"fileDisposisi/".$v['nama']);
                }
            }
            $kolomFiles=",files";
            
            
            $check=$this->Queries->_func("select kdDisposisi from disposisi 
                where kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and 
                noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and tahun=".$this->qdata->_checkStringQuery($tahun)."");
            if(count($check)==0){
                if(empty($namaFile)){
                    $kolomFiles="";
                }else{
                    $namaFile=" ,".$this->qdata->_checkStringQuery($namaFile);
                }
                $q="
                    INSERT INTO disposisi
                    (
                        kdDisposisi, kdUsulan, tglTerima, tglPenyelsaian, 
                        tujuanBupati,nmTujuanBupati, isi, kdMember, noPembahasan,perkada,tahun ".$kolomFiles."
                    ) VALUES (
                        ".$this->qdata->_checkStringQuery($kdUsulan).",".$this->qdata->_checkStringQuery($kdUsulan).",
                            ".$this->qdata->_checkStringQuery($tglTerima).",".$this->qdata->_checkStringQuery($tglPenyelsaian).",
                        ".$this->qdata->_checkStringQuery($tujuan).",".$this->qdata->_checkStringQuery($nmTujuan).",
                            ".$this->qdata->_checkStringQuery($isi).",
                            ".$this->qdata->_checkStringQuery($kdMember).",".$this->qdata->_checkStringQuery($pembahasan).",
                            ".$this->qdata->_checkStringQuery($perkada).",
                        ".$this->qdata->_checkStringQuery($tahun).$namaFile."
                    );
                ";
            }else{
                if(empty($namaFile)){
                    $kolomFiles="";
                }else{
                    $kolomFiles.="=".$this->qdata->_checkStringQuery($namaFile);
                }
                $q="
                    update disposisi set tglTerima=".$this->qdata->_checkStringQuery($tglTerima).", tglPenyelsaian=".$this->qdata->_checkStringQuery($tglPenyelsaian).", 
                        tujuanBupati=".$this->qdata->_checkStringQuery($tujuan).",nmTujuanBupati=".$this->qdata->_checkStringQuery($nmTujuan).",
                        isi=".$this->qdata->_checkStringQuery($isi).$kolomFiles."
                    where  kdMember=".$this->qdata->_checkStringQuery($kdMember)." 
                    and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($tahun)." 
                    and kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan).";
                ";
            }
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['data']=$this->Queries->_func($this->qdata->_getDisposisi($kdUsulan,$pembahasan,$tahun,
                                    " and kdMember=".$this->qdata->_checkStringQuery($kdMember)));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function saveDisposisiTujuan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-disp"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $kdMember   =$baseEND->{'kdMember'};

            $tglTerima   =$baseEND->{'tglTerima'};
            $tglPenyelsaian =$baseEND->{'tglPenyelsaian'};
            $tujuan   =$baseEND->{'tujuanBupati'};
            $nmTujuan   =$baseEND->{'nmTujuanBupati'};
            $isi =$baseEND->{'isi'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                foreach ($file as $key => $v) {
                    $namaFile.=$this->_uploadImage($v['src'],"fileDisposisi/".$v['nama']);
                }
            }
            $kolomFiles=",files1";
            
            
            $check=$this->Queries->_func("select kdDisposisi from disposisi 
                where kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and 
                noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and tahun=".$this->qdata->_checkStringQuery($tahun)."");
            if(count($check)!=0){
                if(empty($namaFile)){
                    $kolomFiles="";
                }else{
                    $kolomFiles.="=".$this->qdata->_checkStringQuery($namaFile);
                }
                $q="
                    update disposisi set tglTerima1=".$this->qdata->_checkStringQuery($tglTerima).", tglPenyelsaian1=".$this->qdata->_checkStringQuery($tglPenyelsaian).", 
                        tujuanDisposisi1=".$this->qdata->_checkStringQuery($tujuan).",nmTujuanDisposisi1=".$this->qdata->_checkStringQuery($nmTujuan).", 
                            isi1=".$this->qdata->_checkStringQuery($isi).$kolomFiles."
                    where  kdMember=".$this->qdata->_checkStringQuery($kdMember)." 
                    and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                    and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                    and tahun=".$this->qdata->_checkStringQuery($tahun)." 
                    and kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan).";
                ";
                $check=$this->Queries->_proc($q);
                if($check){
                    $this->_['data']=$this->Queries->_func($this->qdata->_getDisposisi($kdUsulan,$pembahasan,$tahun,
                                    " and kdMember=".$this->qdata->_checkStringQuery($kdMember)));
                    return $this->qdata->responTrue($this->_);
            }
            return $this->qdata->responFalse("Data Disposisi Bupati / Wakil Bupati Bulum Terselesaikan");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function saveDisposisiTujuan2(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("u-disp"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $kdMember   =$baseEND->{'kdMember'};

            $tglTerima   =$baseEND->{'tglTerima'};
            $tglPenyelsaian =$baseEND->{'tglPenyelsaian'};
            $tujuan   =$baseEND->{'tujuanBupati'};
            $nmTujuan   =$baseEND->{'nmTujuanBupati'};
            $isi =$baseEND->{'isi'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                foreach ($file as $key => $v) {
                    $namaFile.=$this->_uploadImage($v['src'],"fileDisposisi/".$v['nama']);
                }
            }
            $kolomFiles=",files2";
            
            
            $check=$this->Queries->_func("select kdDisposisi from disposisi 
                where kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and 
                noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and tahun=".$this->qdata->_checkStringQuery($tahun)."");
            if(count($check)!=0){
                if(empty($namaFile)){
                    $kolomFiles="";
                }else{
                    $kolomFiles.="=".$this->qdata->_checkStringQuery($namaFile);
                }
                $q="
                    update disposisi set tglTerima2=".$this->qdata->_checkStringQuery($tglTerima).", tglPenyelsaian2=".$this->qdata->_checkStringQuery($tglPenyelsaian).", 
                        tujuanDisposisi2=".$this->qdata->_checkStringQuery($tujuan).",nmTujuanDisposisi2=".$this->qdata->_checkStringQuery($nmTujuan).", 
                            isi2=".$this->qdata->_checkStringQuery($isi).$kolomFiles."
                    where  kdMember=".$this->qdata->_checkStringQuery($kdMember)." 
                    and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                    and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                    and tahun=".$this->qdata->_checkStringQuery($tahun)." 
                    and kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan).";
                ";
                $check=$this->Queries->_proc($q);
                if($check){
                    $this->_['data']=$this->Queries->_func($this->qdata->_getDisposisi($kdUsulan,$pembahasan,$tahun,
                                    " and kdMember=".$this->qdata->_checkStringQuery($kdMember)));
                    return $this->qdata->responTrue($this->_);
            }
            return $this->qdata->responFalse("Data Disposisi Bupati / Wakil Bupati Bulum Terselesaikan");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }

    function saveDisposisiAll(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $kdMember   =$baseEND->{'kdMember'};

            $tglTerima  =$baseEND->{'tglTerima'};
            $tglPenyelsaian =$baseEND->{'tglPenyelsaian'};
            $tujuan     =$baseEND->{'tujuanBupati'};
            $nmTujuan   =$baseEND->{'nmTujuanBupati'};
            $isi        =$baseEND->{'isi'};

            $keyx        =$baseEND->{'key'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                foreach ($file as $key => $v) {
                    $namaFile.=$this->_uploadImage($v['src'],"fileDisposisi/".$v['nama']);
                }
            }
            $kolomFiles="";
            $nmKolom="";
            $qkolomUpd="";

            // return print_r($key);
            switch ($keyx) {
                case 1:
                    $kolomFiles=",files";
                    $nmKolom="tglTerima, tglPenyelsaian,tujuanBupati,nmTujuanBupati, isi,";
                    $qkolomUpd="
                        tglTerima=".$this->qdata->_checkStringQuery($tglTerima).", 
                        tglPenyelsaian=".$this->qdata->_checkStringQuery($tglPenyelsaian).", 
                        tujuanBupati=".$this->qdata->_checkStringQuery($tujuan).",
                        nmTujuanBupati=".$this->qdata->_checkStringQuery($nmTujuan).",
                        isi=".$this->qdata->_checkStringQuery($isi)."
                    ";
                break;
                case 2:
                    $kolomFiles=",files1";
                    $nmKolom="tglTerima1, tglPenyelsaian1,tujuanDisposisi1,nmTujuanDisposisi1, isi1,";
                    $qkolomUpd="
                        tglTerima1=".$this->qdata->_checkStringQuery($tglTerima).", 
                        tglPenyelsaian1=".$this->qdata->_checkStringQuery($tglPenyelsaian).", 
                        tujuanDisposisi1=".$this->qdata->_checkStringQuery($tujuan).",
                        nmTujuanDisposisi1=".$this->qdata->_checkStringQuery($nmTujuan).",
                        isi1=".$this->qdata->_checkStringQuery($isi)."
                    ";
                break;
                case 3:
                    $kolomFiles=",files2";
                    $nmKolom="tglTerima2, tglPenyelsaian2,tujuanDisposisi2,nmTujuanDisposisi2, isi2,";
                    $qkolomUpd="
                        tglTerima2=".$this->qdata->_checkStringQuery($tglTerima).", 
                        tglPenyelsaian2=".$this->qdata->_checkStringQuery($tglPenyelsaian).", 
                        tujuanDisposisi2=".$this->qdata->_checkStringQuery($tujuan).",
                        nmTujuanDisposisi2=".$this->qdata->_checkStringQuery($nmTujuan).",
                        isi2=".$this->qdata->_checkStringQuery($isi)."
                    ";
                break;
            }
            
            
            $check=$this->Queries->_func("select kdDisposisi from disposisi 
                where kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." and kdMember=".$this->qdata->_checkStringQuery($kdMember)." and 
                noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and tahun=".$this->qdata->_checkStringQuery($tahun)."");
            if(count($check)==0){
                if(empty($namaFile)){
                    $kolomFiles="";
                }else{
                    $namaFile=" ,".$this->qdata->_checkStringQuery($namaFile);
                }
                $q="
                    INSERT INTO disposisi
                    (
                        kdDisposisi, kdUsulan, 
                        ".$nmKolom."
                        kdMember, noPembahasan,perkada,tahun ".$kolomFiles."
                    ) VALUES (
                        ".$this->qdata->_checkStringQuery($kdUsulan).",".$this->qdata->_checkStringQuery($kdUsulan).",
                            ".$this->qdata->_checkStringQuery($tglTerima).",".$this->qdata->_checkStringQuery($tglPenyelsaian).",
                        ".$this->qdata->_checkStringQuery($tujuan).",".$this->qdata->_checkStringQuery($nmTujuan).",
                            ".$this->qdata->_checkStringQuery($isi).",
                            ".$this->qdata->_checkStringQuery($kdMember).",".$this->qdata->_checkStringQuery($pembahasan).",
                            ".$this->qdata->_checkStringQuery($perkada).",
                        ".$this->qdata->_checkStringQuery($tahun).$namaFile."
                    );
                ";
            }else{
                if(empty($namaFile)){
                    $kolomFiles="";
                }else{
                    $kolomFiles.="=".$this->qdata->_checkStringQuery($namaFile);
                }
                $q="
                    update disposisi set 
                        ".$qkolomUpd.$kolomFiles."
                    where  kdMember=".$this->qdata->_checkStringQuery($kdMember)." 
                    and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($tahun)." 
                    and kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan).";
                ";
            }
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    
    function arsipkanDisposisi(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("d-disp"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $tahun      =$baseEND->{'tahun'};
            $kdMember   =$baseEND->{'kdMember'};
            $tujuanDisposisi=$baseEND->{'tujuanDisposisi'};
            $nmDinas=$baseEND->{'nmDinas'};

            $q="
                update disposisi set status=".$this->qdata->_checkStringQuery("terarsipkan")."
                where  kdMember=".$this->qdata->_checkStringQuery($kdMember)." and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and 
                tahun=".$this->qdata->_checkStringQuery($tahun)." and  kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan).";
            ";
            
           $data=$this->Queries->_func("select nmDinas from dinas where kdDinas=".$this->qdata->_checkStringQuery($tujuanDisposisi)." limit 1");
            $this->_setNotification("DISPOSISI","terdapat disposisi usulan dari ".$nmDinas." yang ditujukan kepada ".$data[0]['nmDinas']." dalam pembahasan ke-".($pembahasan),"Lihat Disposisi",3);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['data']=$this->Queries->_func($this->qdata->_getDisposisi($kdUsulan,$pembahasan,$tahun,
                                " and kdMember=".$this->qdata->_checkStringQuery($kdMember)));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }

    //kajian 
    function setPertimbangan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-kaji"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $kdUsulan   =$baseEND->{'kdUsulan'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $tahun      =$baseEND->{'tahun'};
            $kdMember   =$baseEND->{'kdMember'};

            $pertimbangan=$baseEND->{'pertimbangan'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }
            $kolomFiles=",filePertimbangan";
            if(empty($namaFile)){
                $kolomFiles="";
            }else{
                $kolomFiles.="=".$this->qdata->_checkStringQuery($namaFile);
            }
            $q="
                update disposisi set pertimbangan=".$this->qdata->_checkStringQuery($pertimbangan)." ".$kolomFiles."
                where  kdMember=".$this->qdata->_checkStringQuery($kdMember)." and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and 
                tahun=".$this->qdata->_checkStringQuery($tahun)." and  kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan).";
            ";
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['data']=$this->Queries->_func($this->qdata->_getAllUsulanDisposisi($pembahasan,$tahun,
                            " and d.kdMember=".$this->qdata->_checkStringQuery($kdMember)."
                            and d.status='terarsipkan' and d.kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)."
                        "));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    
    // forum 
    public function setTahunPembahasan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $tahun  =$baseEND->{'tahun'};

            $q="
                INSERT INTO `pembahasan`(`noPembahasan`,`perkada`,`Tahun`,`progres`) values('0','1','".$tahun."',1);
            ";
            $pembahasan=$this->Queries->_func("SELECT * FROM `pembahasan` where finals=1 ORDER BY ins desc limit 1");
            if(count($pembahasan)>0){
                $q.=$this->qdata->_duplikatDataApbdTahun(
                    $pembahasan[0]['noPembahasan'],
                    $pembahasan[0]['perkada'],
                    $pembahasan[0]['tahun'],
                    $tahun
                );
            }
            $member=$this->Queries->_func("SELECT kdMember1 as kdMember  FROM `member` WHERE substring(kdJabatan,6)!=2 AND substring(kdJabatan,6)!=6");
            $q.=$this->_settingKeyMember($member,$this->qdata->_getNKA("p-usul"),1);
            // return $this->qdata->_log($q);
            $check=$this->Queries->_multiProc($q);
            if($check){
                $this->session->tahun=$tahun;
                $this->session->perkada=1;
                $this->session->noPembahasan=0;
                $q='
                    update pembahasan set notulen=\''.$this->qdata->_formatNotulen(0).'\'
                    where noPembahasan='.$this->qdata->_checkStringQuery("0").'
                    and perkada='.$this->qdata->_checkStringQuery("1").'
                    and tahun='.$this->qdata->_checkStringQuery($tahun).'
                ';
                $check=$this->Queries->_proc($q);
                if($check){
                    $this->_setNotification("INFORMASI","Proses penginputan usulan TAPD akan segera dibuka !!!","Lihat Usulan",1);
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function setNextPembahasan(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $tahun  =$baseEND->{'tahun'};
            $perkada=$baseEND->{'perkada'};
            $no     =$baseEND->{'no'};
            
            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }

            $q="
                INSERT INTO `pembahasan`(`noPembahasan`,`perkada`, `Tahun`,`files`) values('".($no+1)."','".$perkada."','".$tahun."','".$namaFile."');
            ";
            $q.=$this->qdata->_duplikatDataApbd($no,$perkada,$tahun,false);
            
            $member=$this->Queries->_func("SELECT kdMember1 as kdMember  FROM `member` WHERE substring(kdJabatan,6)!=2 AND substring(kdJabatan,6)!=6");
            $q.=$this->_settingKeyMember($member,$this->qdata->_getNKA("p-usul"),0);

            // return $this->qdata->_log($q);
            $check=$this->Queries->_multiProc($q);
            if($check){
                $q='
                    update pembahasan set notulen=\''.$this->qdata->_formatNotulen($no+1).'\'
                    where noPembahasan='.$this->qdata->_checkStringQuery($no+1).'
                    and perkada='.$this->qdata->_checkStringQuery($perkada).'
                    and tahun='.$this->qdata->_checkStringQuery($tahun).'
                ';
                $check=$this->Queries->_proc($q);
                if($check){
                    $this->_setNotification("INFORMASI","Proses penginputan usulan telah dibuka","Lihat Usulan",1);
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function kunciPerkada(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $tahun  =$baseEND->{'tahun'};
            $perkada=$baseEND->{'perkada'};
            $no     =$baseEND->{'no'};
            
            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }
            $q='
                update pembahasan set finalPerkada="'.$namaFile.'",insFinalPerkada=now()
                where noPembahasan='.$this->qdata->_checkStringQuery($no).'
                and perkada='.$this->qdata->_checkStringQuery($perkada).'
                and tahun='.$this->qdata->_checkStringQuery($tahun).'
            ';
            // return $this->qdata->_log($q);
            $check=$this->Queries->_proc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function setNextPerkada(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $tahun  =$baseEND->{'tahun'};
            $no     =$baseEND->{'no'};
            $perkada=$baseEND->{'perkada'};
            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }

            if(strlen($namaFile)==0){
                $namaFile.=$baseEND->{'namaFile'};
            }
            
            $q="
                INSERT INTO `pembahasan`(`perkada`, `Tahun`,`files`,`progres`) values('".($perkada+1)."','".$tahun."','".$namaFile."',1);
            ";

            $q.=$this->qdata->_duplikatDataApbd($no,$perkada,$tahun,true);
            
            $member=$this->Queries->_func("SELECT kdMember1 as kdMember  FROM `member` WHERE substring(kdJabatan,6)!=2 AND substring(kdJabatan,6)!=6");
            $q.=$this->_settingKeyMember($member,$this->qdata->_getNKA("p-usul"),1);

            // return $this->qdata->_log($q);
            $check=$this->Queries->_multiProc($q);
            if($check){
                $q='
                    update pembahasan set notulen=\''.$this->qdata->_formatNotulen("0").'\'
                    where noPembahasan='.$this->qdata->_checkStringQuery("0").'
                    and perkada='.$this->qdata->_checkStringQuery($perkada+1).'
                    and tahun='.$this->qdata->_checkStringQuery($tahun).'
                ';
                $check=$this->Queries->_proc($q);
                if($check){
                    $this->_setNotification("INFORMASI","Proses penginputan usulan TAPD akan segera dibuka !!!","Lihat Usulan",1);
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function savePerubahanForum(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $noTabelSub =$baseEND->{'noTabelSub'};
            $kd         =$baseEND->{'kdSub'};
            if($noTabelSub>1){
                $kdPrev =$baseEND->{'kdSubPrev'};
            }
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $kdUsulan   =$baseEND->{'kdUsulan'};
            $kdDinas    =$baseEND->{'kdDinas'};
            $kdMember   =$baseEND->{'kdMember'};
            
            $volx       =$baseEND->{'volx'};
            $satx       =$baseEND->{'satx'};
            $nilaix     =$baseEND->{'nilaix'};

            $keterangan =$baseEND->{'keterangan'};
            $nm         =$baseEND->{'nmSub'};
            $status     =$baseEND->{'status'};
            
            $pagu       =$nilaix*$volx;

            $totalPrev  =$baseEND->{'totalPrev'};

            // set data perubahan
            $q="
                UPDATE usulan SET volx=".$this->qdata->_checkStringQuery($volx).",
                    satx=".$this->qdata->_checkStringQuery($satx).",
                    nilaix=".$this->qdata->_checkStringQuery($nilaix).",
                    keteranganx=".$this->qdata->_checkStringQuery($keterangan).",
                    statusx=".$this->qdata->_checkStringQuery($status)."
                WHERE kdUsulan=".$this->qdata->_checkStringQuery($kdUsulan)." AND 
                kdMember=".$this->qdata->_checkStringQuery($kdMember)." AND 
                kdDinas=".$this->qdata->_checkStringQuery($kdDinas)." AND 
                noPembahasan =".$this->qdata->_checkStringQuery($pembahasan)." and 
                perkada=".$this->qdata->_checkStringQuery($perkada)." and 
                tahun=".$this->qdata->_checkStringQuery($tahun).";
            ";

            // menghitung pagu untuk 1 sub jenis dari seluruh usulan yang telah diterima
            $pagux=$this->Queries->_func("
                SELECT sum((volx*nilaix)) as total FROM usulan where 
                (volx*nilaix)>0 and
                kdSubJenis=".$this->qdata->_checkStringQuery($kd)." and
                perkada=".$this->qdata->_checkStringQuery($perkada)." and
                noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
                tahun=".$this->qdata->_checkStringQuery($tahun)."
                group by kdSubJenis
            ");

            // $paguxDinas=$this->Queries->_func("
            //     SELECT sum((volx*nilaix)) as total FROM usulan where 
            //     kdUsulan!=".$this->qdata->_checkStringQuery($kdUsulan)." AND 
            //     (volx*nilaix)>0 and
            //     kdSubJenis=".$this->qdata->_checkStringQuery($kdDinas)." and
            //     perkada=".$this->qdata->_checkStringQuery($perkada)." and
            //     noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." and
            //     tahun=".$this->qdata->_checkStringQuery($tahun)."
            //     group by kdSubJenis
            // ");
            
            
            if(count($pagux)>0){
                $pagu+=($pagux[0]['total']-$totalPrev);
            }
            // return print_r($pagu);
            // if(count($paguxDinas)>0){
            //     $paguxDinas=$paguxDinas[0]['total']+$pagu;
            // }else{
            //     $paguxDinas=$pagu;
            // }
            
            
            // $q1=$this->Queries->_func("
            //     SELECT paguR as pagu FROM dinas where 
            //     kdDinas=".$this->qdata->_checkStringQuery($kdDinas)." and
            //     perkada=".$this->qdata->_checkStringQuery($perkada)." and
            //     tahun=".$this->qdata->_checkStringQuery($tahun)."
            // ");
            // if(empty($q1[0]['pagu']) || $q1[0]['pagu']=="0"){
            //     $q.="
            //         update dinas set paguR=pagu where 
            //         kdDinas=".$this->qdata->_checkStringQuery($kdDinas)." and
            //         perkada=".$this->qdata->_checkStringQuery($perkada)." and
            //         tahun=".$this->qdata->_checkStringQuery($tahun).";
            //     ";
            // }

            // $q.="
            //     update dinas set pagu=paguR+".$paguxDinas." where 
            //     kdDinas=".$this->qdata->_checkStringQuery($kdDinas)." and
            //     perkada=".$this->qdata->_checkStringQuery($perkada)." and
            //     tahun=".$this->qdata->_checkStringQuery($tahun).";
            // ";


            $q2="";
            switch ($noTabelSub) {
                case 1:
                    // duplikat pagu awal
                    $q1=$this->Queries->_func("
                        SELECT paguR1 as pagu FROM apbdsub1 where 
                        kdSub1=".$this->qdata->_checkStringQuery($kd)." and
                        perkada1=".$this->qdata->_checkStringQuery($perkada)." and
                        noPembahasan1=".$this->qdata->_checkStringQuery($pembahasan)." and
                        date1=".$this->qdata->_checkStringQuery($tahun)."
                    ");
                    if(empty($q1[0]['pagu'])){
                        $q.="
                            update apbdsub1 set paguR1=pagu1 where 
                            kdSub1=".$this->qdata->_checkStringQuery($kd)." and
                            perkada1=".$this->qdata->_checkStringQuery($perkada)." and
                            noPembahasan1=".$this->qdata->_checkStringQuery($pembahasan)." and
                            date1=".$this->qdata->_checkStringQuery($tahun)."
                        ";
                    }

                    $q2=" call pupdSub1(
                            ".$this->qdata->_checkStringQuery($kd).",
                            ".$this->qdata->_checkStringQuery($nm).",
                            ".$this->qdata->_checkStringQuery($pagu).",
                            ".$this->qdata->_checkStringQuery($pembahasan).",
                            ".$this->qdata->_checkStringQuery($perkada).",
                            ".$this->qdata->_checkStringQuery($tahun)."
                        );
                    ";
                break;
                default:
                    // duplikat pagu awal
                    $q1=$this->Queries->_func("
                        SELECT paguR".$noTabelSub." as pagu,pagu".$noTabelSub." FROM apbdsub".$noTabelSub." where 
                        kdSub".$noTabelSub."=".$this->qdata->_checkStringQuery($kd)." and
                        perkada".$noTabelSub."=".$this->qdata->_checkStringQuery($perkada)." and
                        noPembahasan".$noTabelSub."=".$this->qdata->_checkStringQuery($pembahasan)." and
                        date".$noTabelSub."=".$this->qdata->_checkStringQuery($tahun)."
                    ");
                    if(empty($q1[0]['pagu'])){
                        $q.="
                            update apbdsub".$noTabelSub." set paguR".$noTabelSub."=pagu".$noTabelSub." where 
                            kdSub".($noTabelSub-1)."=".$this->qdata->_checkStringQuery($kdPrev)." and
                            kdSub".$noTabelSub."=".$this->qdata->_checkStringQuery($kd)." and
                            perkada".$noTabelSub."=".$this->qdata->_checkStringQuery($perkada)." and
                            noPembahasan".$noTabelSub."=".$this->qdata->_checkStringQuery($pembahasan)." and
                            date".$noTabelSub."=".$this->qdata->_checkStringQuery($tahun)."
                        ";
                        $pagu+=$q1[0]['pagu'.$noTabelSub];
                    }else{
                        $pagu+=$q1[0]['pagu'];
                    }


                    $q2=" call pupdSub".$noTabelSub."(
                            ".$this->qdata->_checkStringQuery($kdPrev).",
                            ".$this->qdata->_checkStringQuery($kd).",
                            ".$this->qdata->_checkStringQuery($nm).",
                            ".$this->qdata->_checkStringQuery($pagu).",
                            ".$this->qdata->_checkStringQuery($pembahasan).",
                            ".$this->qdata->_checkStringQuery($perkada).",
                            ".$this->qdata->_checkStringQuery($tahun)."
                        );
                    ";
                break;
            
            }
            // return $this->qdata->_log($q2);
            $check=$this->Queries->_multiProc($q);
            if($check){
                $check=$this->Queries->_procProcedure($q2);
                if($check){
                    return $this->qdata->responTrue($this->_);
                }
                return $this->qdata->responFalse("error procedure sistem");
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function getDataStrukturForum(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){
            $this->_['dall']=$this->Queries->_func($this->qdata->_getAllDataApbdBandingan($this->noPembahasan-1,$this->perkada,$this->tahun,"",$this->noPembahasan));
            return $this->qdata->responTrue($this->_);
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function getUsulanForum(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            // return print_r($this->qdata->_getAllDataUsulanBandingan(
            //     $pembahasan,
            //     $perkada,
            //     $tahun,""
            // ));
            $this->_['dusulan']=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
                $pembahasan,
                $perkada,
                $tahun,""
            ));
            return $this->qdata->responTrue($this->_);
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function bukaForum(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){
            $q="update pembahasan set progres=1 
                where noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." and
                Tahun=".$this->qdata->_checkStringQuery($this->tahun).";
            ";
            $member=$this->Queries->_func("SELECT kdMember1 as kdMember  FROM `member` WHERE substring(kdJabatan,6)!=2 AND substring(kdJabatan,6)!=6");
            $q.=$this->_settingKeyMember($member,$this->qdata->_getNKA("p-usul"),1);
            $check=$this->Queries->_multiProc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function akhiriForum(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){

            $fkeyNotulen=$this->Queries->_func("select 
                fileNotulen as status 
                from  pembahasan where noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." 
                and perkada=".$this->qdata->_checkStringQuery($this->perkada)."
                and tahun=".$this->qdata->_checkStringQuery($this->tahun)."
            ")[0]['status'];
            if(strlen($fkeyNotulen)==0){
                return $this->qdata->responFalse(" mohon untuk mengarsipkan dokumen notulen !!!");
            }
            
            $check=$this->Queries->_proc("update pembahasan set finals=1,insFinal=now(),insFinalPerkada=now()
                where noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." 
                and perkada=".$this->qdata->_checkStringQuery($this->perkada)."
                and tahun=".$this->qdata->_checkStringQuery($this->tahun)."
            ");
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function inpUsulanForum(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){

            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $kdKelompok =$baseEND->{'kdKelompok'};
            $kdJenis    =$baseEND->{'kdJenis'};
            $kdSub      =$baseEND->{'kdSub'};
            $usulan     =$baseEND->{'usulan'};

            $kdDinas      =$baseEND->{'kdDinas'};

            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $nomor      =$baseEND->{'nomor'};
            $tanggal    =$baseEND->{'tanggal'};
            $volume     =$baseEND->{'volume'};
            $satuan     =$baseEND->{'satuan'};
            $nilai      =$baseEND->{'nilai'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                // return print_r($file['data']);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    $namaFile.=$this->_uploadFiles($v['data'],$v['nama']);
                }
            }
            $keyTabel="kdUsulan";
            $kdTabel=$this->Queries->_func("
                select ".$keyTabel." 
                from usulan 
                where 
                    kdMember='".$this->kdMember."' 
                    and noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($this->perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($this->tahun)."
                ORDER BY ".$keyTabel." DESC limit 1"
            );
            // return print_r($kdTabel);
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }
            $q="
                INSERT INTO usulan(
                        kdUsulan,kdMember,kdDinas,kdSub1, kdSubJenis, kdSub, 
                        nmUsulan, no, date, vol, 
                        sat, nilai, files,
                        noPembahasan,perkada, tahun,status
                ) VALUES (
                    ".$this->qdata->_checkStringQuery($kdTabel).",".$this->qdata->_checkStringQuery($this->kdMember).",
                        ".$this->qdata->_checkStringQuery($kdDinas).",".$this->qdata->_checkStringQuery($kdKelompok).",
                        ".$this->qdata->_checkStringQuery($kdJenis).",".$this->qdata->_checkStringQuery($kdSub).",
                    ".$this->qdata->_checkStringQuery($usulan).",".$this->qdata->_checkStringQuery($nomor).",
                        ".$this->qdata->_checkStringQuery($tanggal).",".$this->qdata->_checkStringQuery($volume).",
                    ".$this->qdata->_checkStringQuery($satuan).",".$this->qdata->_checkStringQuery($nilai).",
                        ".$this->qdata->_checkStringQuery($namaFile).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun).",'terkirim'
                )
            ";
            
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function inpSetterUsulanOld(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("c-foru"));
        if($portal['exec']){

            $baseEND=json_decode((base64_decode($_POST['data'])));

            $keyTabel="kdUsulan";
            $kdTabel=$this->Queries->_func("
                select ".$keyTabel." 
                from usulan 
                where 
                    kdMember='".$this->kdMember."' 
                    and noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($this->perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($this->tahun)."
                ORDER BY ".$keyTabel." DESC limit 1"
            );
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }
            $kdUsulan=$kdTabel;


            
            
            $data =$baseEND->{'data'};
            $q="";
            foreach ($data as $key => $v) {
                $q.="
                    INSERT INTO `usulan`(`kdUsulan`, `kdMember`, `kdDinas`, `kdSub1`, `kdSubJenis`, `kdSub`, `nmUsulan`, `no`, `date`, `vol`, `sat`, `nilai`, `volx`, `satx`, `nilaix`, `keteranganx`, `files`, `status`, `noPembahasan`, `tahun`, `perkada`, `ins`, `finals`)
                    (
                        select 
                            '".($kdUsulan+$key)."', `kdMember`, `kdDinas`, `kdSub1`, `kdSubJenis`, 
                            `kdSub`, `nmUsulan`, `no`, `date`, `vol`, `sat`, `nilai`, 
                            `volx`, `satx`, `nilaix`, `keteranganx`, `files`, `status`, 
                            ".$this->qdata->_checkStringQuery($this->noPembahasan).",".$this->qdata->_checkStringQuery($this->tahun).",
                                ".$this->qdata->_checkStringQuery($this->perkada).", 
                            now(), `finals` 
                        from `usulan` 
                        where kdUsulan=".$this->qdata->_checkStringQuery($v->kdUsulan)." and
                        kdDinas=".$this->qdata->_checkStringQuery($v->kdDinas)." and
                        kdMember=".$this->qdata->_checkStringQuery($v->kdMember)." and
                        noPembahasan =".$this->qdata->_checkStringQuery($v->noPembahasan)." and
                        perkada=".$this->qdata->_checkStringQuery($v->perkada)." and
                        tahun=".$this->qdata->_checkStringQuery($v->tahun)."
                    );
                    
                ";

                if($key==0){
                    $keyTabel="kdDisposisi";
                    $kdTabel=$this->Queries->_func("
                        select ".$keyTabel." 
                        from disposisi 
                        where
                            kdMember='".$v->kdMember."' 
                            and noPembahasan=".$this->qdata->_checkStringQuery($this->noPembahasan)." 
                            and perkada=".$this->qdata->_checkStringQuery($this->perkada)." 
                            and tahun=".$this->qdata->_checkStringQuery($this->tahun)."
                        ORDER BY ".$keyTabel." DESC limit 1"
                    );
                    if(count($kdTabel)>0){
                        $kdTabel=$kdTabel[0][$keyTabel]+1;
                    }else{
                        $kdTabel=1;
                    }
                }

                $q.="
                    INSERT INTO `disposisi`(`kdDisposisi`, `kdUsulan`, `tglTerima`, `tglPenyelsaian`, `tujuanBupati`, `nmTujuanBupati`, `isi`, `files`, `tglTerima1`, `tglPenyelsaian1`, `tujuanDisposisi1`, `nmTujuanDisposisi1`, `isi1`, `files1`, `tglTerima2`, `tglPenyelsaian2`, `tujuanDisposisi2`, `nmTujuanDisposisi2`, `isi2`, `files2`, `pertimbangan`, `filePertimbangan`, `kdMember`, `noPembahasan`, `perkada`, `tahun`, `ins`, `status`)
                    (
                        select 
                            '".($kdTabel+$key)."', `kdUsulan`, `tglTerima`, `tglPenyelsaian`, 
                            `tujuanBupati`, `nmTujuanBupati`, `isi`, `files`, `tglTerima1`, `tglPenyelsaian1`, 
                            `tujuanDisposisi1`, `nmTujuanDisposisi1`, `isi1`, `files1`, `tglTerima2`, `tglPenyelsaian2`, 
                            `tujuanDisposisi2`, `nmTujuanDisposisi2`, `isi2`, `files2`, `pertimbangan`, `filePertimbangan`, 
                            `kdMember`, ".$this->qdata->_checkStringQuery($this->noPembahasan).", ".$this->qdata->_checkStringQuery($this->perkada).", 
                            ".$this->qdata->_checkStringQuery($this->tahun).",now(), `status`
                        from `disposisi` 
                        where kdUsulan=".$this->qdata->_checkStringQuery($v->kdUsulan)." and
                        kdMember=".$this->qdata->_checkStringQuery($v->kdMember)." and
                        noPembahasan =".$this->qdata->_checkStringQuery($v->noPembahasan)." and
                        perkada=".$this->qdata->_checkStringQuery($v->perkada)." and
                        tahun=".$this->qdata->_checkStringQuery($v->tahun)."
                    );
                    
                ";
            }
            // return print_r($q);
            $check=$this->Queries->_multiProc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }


    // notulen
    public function setAbsensi(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $data  =$baseEND->{'data'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $keyTabel="noUpd";
            $kdTabel=$this->Queries->_func("
                select ".$keyTabel." 
                from absensi 
                where 
                    noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($tahun)."
                ORDER BY ".$keyTabel." DESC limit 1"
            );
            // return print_r($kdTabel);
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }

            $q="
                INSERT INTO `absensi`(`kdAbsensi`, `noPembahasan`, `perkada`, `tahun`, `kdMember`, `noUpd`) VALUES
            ";
            foreach ($data as $key => $v) {
                $q.="(
                    ".$this->qdata->_checkStringQuery($key+1).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun).",
                    ".$this->qdata->_checkStringQuery($v->kdMember).",
                    ".$this->qdata->_checkStringQuery($kdTabel)."
                ),";
            }
            // return print_r($q);
            $q=substr($q,0,strlen($q)-1);
            $q.="; delete from absensi where  
                noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                and tahun=".$this->qdata->_checkStringQuery($tahun)."
                and noUpd=".$this->qdata->_checkStringQuery($kdTabel-1)."
            ";
            // return print_r($q);
            $check=$this->Queries->_multiProc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    public function saveNotulen(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $notulen  =$baseEND->{'notulen'};
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $q='
                update pembahasan set notulen=\''.$notulen.'\'
                where noPembahasan='.$this->qdata->_checkStringQuery($pembahasan).'
                and perkada='.$this->qdata->_checkStringQuery($perkada).'
                and tahun='.$this->qdata->_checkStringQuery($tahun).'
            ';
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function arsipkanNotulen(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("s-foru"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};


            $file=$_POST['file'];
            $namaFile="";
            if(!empty($file)){
                foreach ($file as $key => $v) {
                    $namaFile.=$this->_uploadImage($v['src'],"absensi/".$v['nama']);
                }
            }
            $q='
                update pembahasan set fileNotulen="'.$namaFile.'"
                where noPembahasan='.$this->qdata->_checkStringQuery($pembahasan).'
                and perkada='.$this->qdata->_checkStringQuery($perkada).'
                and tahun='.$this->qdata->_checkStringQuery($tahun).'
            ';
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }


    //dokumentasi
    function inpDokumentasi(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};

            $file=$_POST['file'];
            $namaFile=[];
            if(!empty($file)){
                // return print_r($file);
                foreach ($file as $key => $v) {
                    // $namaFile.=$this->_uploadImage($v['src'],$v['nama'])."<2G18>";
                    array_push($namaFile,$this->_uploadImage($v['src'],"dokumentasi/".$v['nama']));
                }
            }
            $keyTabel="kdDokumentasi";
            $kdTabel=$this->Queries->_func("
                select ".$keyTabel." 
                from dokumentasi 
                where 
                    noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)." 
                    and perkada=".$this->qdata->_checkStringQuery($perkada)." 
                    and tahun=".$this->qdata->_checkStringQuery($tahun)."
                ORDER BY ".$keyTabel." DESC limit 1"
            );
            if(count($kdTabel)>0){
                $kdTabel=$kdTabel[0][$keyTabel]+1;
            }else{
                $kdTabel=1;
            }

            $q="
                INSERT INTO dokumentasi(
                    kdDokumentasi, noPembahasan, perkada, tahun, files
                ) VALUES ";
            foreach ($namaFile as $i => $v) {
                $q.="
                 (
                    ".$this->qdata->_checkStringQuery($kdTabel+$i).",
                    ".$this->qdata->_checkStringQuery($pembahasan).",
                    ".$this->qdata->_checkStringQuery($perkada).",
                    ".$this->qdata->_checkStringQuery($tahun).",
                    ".$this->qdata->_checkStringQuery($v)."
                 )
                ";
                if(count($namaFile)!=($i+1)){
                    $q.=",";
                }
            }
            // return print_r($q);
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dokumentasi']=$this->Queries->_func($this->qdata->_ddokumentasi($pembahasan,$perkada,$tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    function delDokumentasi(){
        $portal=$this->_keamanan($_POST['code'],$this->qdata->_getNKA("p-dina"));
        if($portal['exec']){
            $baseEND=json_decode((base64_decode($_POST['data'])));
        
            $pembahasan =$baseEND->{'noPembahasan'};
            $perkada    =$baseEND->{'perkada'};
            $tahun      =$baseEND->{'tahun'};
            $kdDokumentasi=$baseEND->{'kdDokumentasi'};

            $q="
                delete from dokumentasi where
                    kdDokumentasi=".$this->qdata->_checkStringQuery($kdDokumentasi)." 
                    and noPembahasan=".$this->qdata->_checkStringQuery($pembahasan)."
                    and perkada=".$this->qdata->_checkStringQuery($perkada)."
                    and tahun=".$this->qdata->_checkStringQuery($tahun)."
                ";
            $check=$this->Queries->_proc($q);
            if($check){
                $this->_['dokumentasi']=$this->Queries->_func($this->qdata->_ddokumentasi($pembahasan,$perkada,$tahun,""));
                return $this->qdata->responTrue($this->_);
            }else{
                return $this->qdata->responFalse("Terjadi Kesalahan di penyimpanan sistem");
            }
        }return $this->qdata->responFalse($portal['msg']);
    }
    

    function _settingKeyMember($member,$kodePage,$kunci){
        // $kodePage=;
        $q="";
        foreach ($member as $key => $v) {
            $q.=" update appkey set 
                    kunci=".$kunci."
                where kdMember=".$this->qdata->_checkStringQuery($v['kdMember'])." and 
                    kdFitur!=".$this->qdata->_checkStringQuery($kodePage)." and
                    kdFitur like '%".explode("/",$kodePage)[0]."%';";
        }
        return $q;
    }
    public function _uploadFiles($file,$nama){
        $pdf_decoded = base64_decode($file,true);
        $nama=explode(".",$nama);
        date_default_timezone_set("America/New_York");
        $namaFile=$nama[count($nama)-2]."-".date("Y-m-d-h-i-sa").".".$nama[count($nama)-1];
        $lokasiFile='./assets/upload/files/'.$namaFile;
        file_put_contents($lokasiFile, $pdf_decoded);
        return substr($lokasiFile,2);
    }

    function _checkPenutupanPenambahanUsulan(){
        $pembahasan=$this->Queries->_func("SELECT tahun,noPembahasan,progres FROM pembahasan ORDER by ins desc limit 1");
        if($pembahasan[0]['progres']==0){
            return false;
        }
        return true;
    }
    public function _setNotification($fitur,$info,$nmBtn,$tingkatJabatan){
        $keyTabel="kdNotif";
        $kdTabel=$this->Queries->_func("
            select ".$keyTabel." 
            from notif
            ORDER BY ".$keyTabel." DESC limit 1"
        );
        if(count($kdTabel)>0){
            $kdTabel=$kdTabel[0][$keyTabel]+1;
        }else{
            $kdTabel=1;
        }

        $qNotif=" INSERT INTO notif
                    (kdNotif,fitur, isiNotif, nmTombol, url)
                VALUES 
                    (
                        ".$this->qdata->_checkStringQuery($kdTabel).",
                        ".$this->qdata->_checkStringQuery($fitur).",
                        ".$this->qdata->_checkStringQuery($info).",
                        ".$this->qdata->_checkStringQuery($nmBtn).",
                        ".$this->qdata->_checkStringQuery($this->qdata->_getUrl($fitur))."
                    );";
        $qNotif.=" INSERT INTO notifuser(kdMember, kdNotif) (".$this->qdata->_dmemberSetingkat($tingkatJabatan,$kdTabel).")"; // tingkat 3 bisa dicek di tabel jabatan kolom setingkat

        return $this->Queries->_multiProc($qNotif);
    }
    public function _uploadImage($file,$nama){
        $split=explode("/",$nama); 
        $flokasi="upload/";// default foldar jika ber ubah maka tambahakan dinamanya
        if(count($split)>1){
            $flokasi.=$split[0]."/";
            $nama=$split[1];
        }
        $nama=explode(".",$nama);
        switch($nama[count($nama)-1]){
            case "png":$image=substr($file,22);break;
            case "PNG":$image=substr($file,22);break;
            case "pdf":$image=substr($file,22);break;
            default:$image=substr($file,23);break;
        }
        // $image=substr($file,23);
        // return print_r($nama[1]);
        date_default_timezone_set("America/New_York");
        $namaFile=$nama[count($nama)-2]."-".date("Y-m-d-h-i-sa").".".$nama[count($nama)-1];

        
        $delspace=explode(" ",$namaFile);
        $namaFile="";
        foreach ($delspace as $key => $value) {
            $namaFile.=$value;
        }
        $lokasiFile='./assets/'.$flokasi.$namaFile;
        write_file($lokasiFile,base64_decode($image));
        return $namaFile;
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
    function _keamanan($code,$codeForm){
        // $res=$this->qdata->_getAllFile("/session");
        // $data="";
        // foreach ($res as $key => $value) {
        //     $exp=explode($this->qdata->_getIpClient()."=",$value['nama']);
        //     if(count($exp)>1){
        //         $data=$this->qdata->_readFileTxt($value['file']);
        //     }
        // }
        // if(strlen($data)==0){
        //     return $this->qdata->resF("session");
        // }
        // $data=json_decode($data);
        // $data->{'kdMember'};
        // $session=array(
        //     'kdMember'=>$data->{'kdMember'},
        //     'nmMember'=>$data->{'nmMember'},
        //     'kdJabatan'=>$data->{'kdJabatan'},
        //     'kdDinas'=>$data->{'kdDinas'},
        //     'nmDinas'=>$data->{'nmDinas'},
        //     'username'=>$data->{'username'},
        //     'password'=>$data->{'password'},

        //     'tahun'=>$data->{'tahun'},
        //     'noPembahasan'=>$data->{'noPembahasan'},
        //     'progres'=>$data->{'progres'},
        //     'finals'=>$data->{'finals'},
        //     'files'=>$data->{'files'},
        //     'perkada'=>$data->{'perkada'},
        // );
        // $this->session->set_userdata($session);

        $kdMember=$this->session->kdMember;
        if($kdMember==null) {
            return $this->qdata->resF("can't access !!!");
        }
        
        if(!$this->qdata->_backCodes(base64_decode($code))){
            return $this->qdata->resF("Tidak Sesuai Keamanan Sistem !!!");
        }
        if($this->_checkKeyApp($codeForm,$kdMember)==0){
            return $this->qdata->resF("Anda tidak memiliki ijin !!!");
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
        // return $this->qdata->_log($q);
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
                    // print_r($v1."|".$kdJabatan."<br>");
                    if($v1==$kdJabatan){
                        $q.="('".$this->qdata->kdApp."',".$this->qdata->_checkStringQuery($kdMember).",".$this->qdata->_checkStringQuery($v['kd']).",'0'),";
                    }
                }
            }
            $q=substr($q,0,strlen($q)-1);
        }
        if(strlen($q)==0){
            return true;
        }
        // return $this->qdata->_log($q);
        $check=$this->Queries->_multiProc($q);
        if($check){
            return true;
        }
        return false;
        // print_r("sukses");
    }
    function cetakNotaTransaksi($kdKT){
        if($this->session->printer==null){
            return '';
        }
        // $this->Queries->_func
        $data=$this->Queries->_func($this->qdata->_vdTransaksi(" where c.kdKT='".$kdKT."' and c.kdMember='".$this->session->kdMember."'"));
        // return print_r($data);
        $html=$this->bgs->t58text($this->bgs->tlines("=",32));
        $html.=$this->bgs->t58text("Admin   :".$this->session->nmMember);
        $html.=$this->bgs->t58text("Tanggal :".$data[0]['ins']);
        $html.=$this->bgs->t58text("No Nota :".$data[0]['kdKelTrans']);
        $html.=$this->bgs->t58text($this->bgs->tlines("-",32));
        $html.=$this->bgs->ttabel([
            "namaTabel" =>["No","Barang","Qty","Total"],
            "valueName" =>["No","nmGB","totalIGroup","subTotal$"],
            "data"      =>$data,
            "size"      =>[3,17,3,9],
            "total"     =>["jmlBelanja","jmlBayar","sisaBayar"],
            "totalText" =>["Total","Bayar","Kembalian"],
            'penutup'   =>"\n".$this->bgs->t58text($this->bgs->tsetSpace("TERIMA KASIH",32,3))."\n"
                            .$this->bgs->t58text($this->bgs->tlines("=",32))
            // 'penutup'   =>"\n".$this->bgs->t58text($this->bgs->tsetSpace("TERIMA KASIH",32,3))."\n"
            //             .$this->bgs->t58text("Email       :".$data[0]['ins'])
            //             .$this->bgs->t58text("Website     :".$data[0]['kdKelTrans'])
            //             .$this->bgs->t58text("Call center :".$data[0]['ins'])
        ]);
        $_=array();
        $_['html']      =$html;
        $_['printer']   =$this->session->printer;

        $judulTransaksi ="Tanda Bukti Transaksi";
        $_['judul']     =$this->bgs->t58text($this->bgs->talign58($judulTransaksi,"center"));
        $_['judulCopy'] =$this->bgs->t58text($this->bgs->talign58($judulTransaksi." (copy)","center"));
        
        $_['kantor']    =$this->bgs->t58text($this->bgs->talignJudul58($this->session->nmKantor));
        $_['assert']    =$this->qdata->_getAssetUrl();
        $_['copy']      =false;

        // echo "<pre>";
        // print_r($_);
        $this->bgs->tC58mm($_,false);
    }
    function cetakNotaTfBarang($kdTf,$kdMember,$kdCabang){
        if($this->session->printer==null){
            return '';
        }
        $data=$this->Queries->_func($this->qdata->_vdTfBarang(" where c.kdTf='".$kdTf."' and c.kdMember='".$kdMember."' and c.kdCabang='".$kdCabang."'"));
        // return print_r($data);
        $html=$this->bgs->t58text($this->bgs->tlines("=",32));
        $html.=$this->bgs->t58text("Admin   :".$this->session->nmMember);
        $html.=$this->bgs->t58text("Tanggal :".$data[0]['ins']);
        $html.=$this->bgs->t58text("No Nota :".$data[0]['kdTf']);
        $html.=$this->bgs->t58text($this->bgs->tlines("-",32));
        $html.=$this->bgs->ttabel([
            "namaTabel" =>["No","Barang","Qty","Total"],
            "valueName" =>["No","nmGB","totalIGroup","subTotal$"],
            "data"      =>$data,
            "size"      =>[3,17,3,9],
            "total"     =>["jmlBelanja"],
            "totalText" =>["Total"],
            'penutup'   =>"\n".$this->bgs->t58text($this->bgs->tsetSpace("TERIMA KASIH",32,3))."\n"
                            .$this->bgs->t58text($this->bgs->tlines("=",32))
            // 'penutup'   =>"\n".$this->bgs->t58text($this->bgs->tsetSpace("TERIMA KASIH",32,3))."\n"
            //             .$this->bgs->t58text("Email       :".$data[0]['ins'])
            //             .$this->bgs->t58text("Website     :".$data[0]['kdKelTrans'])
            //             .$this->bgs->t58text("Call center :".$data[0]['ins'])
        ]);
        $_=array();
        $_['html']      =$html;
        $_['printer']   =$this->session->printer;

        $judul          ="Tanda Bukti";
        $tambahanJudul  ="Transfer Barang";
        $_['judul']     =$this->bgs->t58text($this->bgs->talign58($judul,"center"))
                        ."\n"
                        .$this->bgs->talign58($tambahanJudul,"center");
        $_['judulCopy'] =$this->bgs->t58text($this->bgs->talign58($judul,"center"))
                        ."\n"
                        .$this->bgs->talign58($tambahanJudul." (copy)","center");
        
        $_['kantor']    =$this->bgs->t58text($this->bgs->talignJudul58($this->session->nmKantor));
        $_['assert']    =$this->qdata->_getAssetUrl();
        $_['copy']      =false;

        // echo "<pre>";
        // print_r($_);
        $this->bgs->tC58mm($_,false);
    }
    function cetakNotaPenyetoran($kdTf,$kdMember,$kdCabang){
        if($this->session->printer==null){
            return '';
        }
        $data=$this->Queries->_func($this->qdata->_vdPenyetoran(" kdTf='".$this->qdata->_getNKT('ktfb',false).$kdTf."' and kdMember='".$kdMember."' and kdCabang='".$kdCabang."'"));
        // return print_r($data);
        $data1=$this->Queries->_func($this->qdata->_vdTotalPenyetoran(" a.kdTf='".$this->qdata->_getNKT('ktfb',false).$kdTf."' and a.kdMember='".$kdMember."' and a.kdCabang='".$kdCabang."'"));

        $html=$this->bgs->t58text($this->bgs->tlines("=",32));
        $html.=$this->bgs->t58text("Admin   :".$this->session->nmMember);
        $html.=$this->bgs->t58text("Cabang  :".$data1[0]['nmCabang']);
        $html.=$this->bgs->t58text("Tanggal :".$data[0]['ins']);
        $html.=$this->bgs->t58text("No Nota : peny-".count($data[0]));
        $html.=$this->bgs->t58text($this->bgs->tlines("-",32));
        $html.=$this->bgs->t58text("Total   :".$this->qdata->_uang($data1[0]['jmlBelanja']));
        $html.=$this->bgs->t58text("Cicilan :".$this->qdata->_uang($data1[0]['cicilan']));
        $html.=$this->bgs->t58text("Sisa    :".$this->qdata->_uang($data1[0]['sisa']));
        $html.=$this->bgs->t58text($this->bgs->tlines("-",32));
        $html.=$this->bgs->ttabel([
            "namaTabel" =>["No","Tanggal","Penyetoran"],
            "valueName" =>["No","ins","jmlBayar$"],
            "data"      =>$data,
            "size"      =>[3,10,19],
            "total"     =>null,
            'penutup'   =>"\n".$this->bgs->t58text($this->bgs->tsetSpace("TERIMA KASIH",32,3))."\n"
                            .$this->bgs->t58text($this->bgs->tlines("=",32))
            // 'penutup'   =>"\n".$this->bgs->t58text($this->bgs->tsetSpace("TERIMA KASIH",32,3))."\n"
            //             .$this->bgs->t58text("Email       :".$data[0]['ins'])
            //             .$this->bgs->t58text("Website     :".$data[0]['kdKelTrans'])
            //             .$this->bgs->t58text("Call center :".$data[0]['ins'])
        ]);
        $_=array();
        $_['html']      =$html;
        $_['printer']   =$this->session->printer;

        $judul          ="Tanda Bukti";
        $tambahanJudul  ="Penyetoran Barang";
        $_['judul']     =$this->bgs->t58text($this->bgs->talign58($judul,"center"))
                        ."\n"
                        .$this->bgs->talign58($tambahanJudul,"center");
        $_['judulCopy'] =$this->bgs->t58text($this->bgs->talign58($judul,"center"))
                        ."\n"
                        .$this->bgs->talign58($tambahanJudul." (copy)","center");
        
        $_['kantor']    =$this->bgs->t58text($this->bgs->talignJudul58($this->session->nmKantor));
        $_['assert']    =$this->qdata->_getAssetUrl();
        $_['copy']      =false;

        // echo "<pre>";
        // print_r($_);
        $this->bgs->tC58mm($_,false);
    }
}


