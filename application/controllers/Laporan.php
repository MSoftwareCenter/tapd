<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Laporan extends CI_Controller {
    var $assert="";
    private $bgs;
    function __construct(){
        parent::__construct();
        // $this->load->library('method');		
        $this->load->model('Queries');
        $this->load->library('Session');
        $this->load->helper('url');
        $this->load->library('encryption');

        $this->load->library('qdata');
        $this->load->library('LibBGS');
        // $this->load->library('H2p');
        
        $this->heightRow=0;
        $this->qdata->_setBaseUrl(base_url());
        $this->assert=$this->qdata->_getAssetUrl();

        $this->bgs=new LibBGS();
    }
    function previewFile($val){
        $baseEND=json_decode((base64_decode($val)));
        $files   =$baseEND->{'files'};
        $this->bgs->previewPdf(base_url().$files);
    }
    function tapd($val){
        $baseEND=json_decode((base64_decode($val)));
        $dlaporan=$this->getDataLaporan($baseEND);
        return $this->bgs->cetakTC($dlaporan);
    }
    function goEmail(){
        $baseEND=json_decode((base64_decode($_POST['data'])));
        $dlaporan=$this->getDataLaporan($baseEND);
        $dlaporan[0]['demail']=$this->Queries->_func('select email,nmMember as nama from member where char_length(email)>0');
        $dlaporan[0]['jemail']="Rekap Hasil Forum TAPD (".$baseEND->{'noPembahasan'}."/ ".$baseEND->{'perkada'}." / ".$baseEND->{'tahun'}.")";
        $dlaporan[0]['semail']='Hasil Pembahasan';
        return $this->bgs->emailSendPDF($dlaporan);
    }
    function getDataLaporan($baseEND){
        // return print_r($baseEND);
        $pembahasan     =$baseEND->{'noPembahasan'};
        $perkada        =$baseEND->{'perkada'};
        $tahun          =$baseEND->{'tahun'};
        $perkadaFinal   =$baseEND->{'perkadaFinal'};
        $status         =$baseEND->{'status'};
        $laporan        =$baseEND->{'laporan'};
        $pembahasanPrev =0;
        if($laporan==4){
            $pembahasanPrev=$baseEND->{'pembahasanPrev'};
        }

        $tambahanText="";
        $data=$this->Queries->_func('select notulen,insFinalPerkada from pembahasan
        where noPembahasan='.$this->qdata->_checkStringQuery($pembahasan).'
        and perkada='.$this->qdata->_checkStringQuery($perkada).'
        and tahun='.$this->qdata->_checkStringQuery($tahun))[0];

        $tgl=$data['insFinalPerkada'];
        $data=$data['notulen'];
        // return $this->qdata->_log($dtfBarang);

        $dusulan=$this->Queries->_func($this->qdata->_getAllDataUsulanBandingan(
            $pembahasan,
            $perkada,
            $tahun,""
        ));
        // return print_r()
        $dinas=$this->Queries->_func("
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


        $dokumentasi=$this->Queries->_func("
            select files from dokumentasi
            where noPembahasan='".$pembahasan."' and perkada='".$perkada."' and tahun='".$tahun."'
        ");
        // return print_r($dokumentasi);

        $dall=$this->Queries->_func($this->qdata->_getAllDataApbdBandingan($pembahasanPrev,$perkada,$tahun,"",$pembahasan));

        $ddisposisi=$this->Queries->_func($this->qdata->_getdDisposisi($pembahasan,$perkada,$tahun,""));

        $dabsensi=$this->Queries->_func($this->qdata->_getdAbsensi($pembahasan,$perkada,$tahun,""));
        
        // return $this->qdata->_log($ddisposisi);
        // return print_r($ddisposisi);
        $kalender=$this->qdata->_Kalender("2021");
        $tgl=explode("-",$tgl);
        $tglR=$tgl[2]." ".$kalender[(int)$tgl[1]]['nama']." ".$tgl[0];

        $dlaporan=array();
        switch ($laporan) {
            case '2': // usulan
                array_push($dlaporan,[
                    "ORIENTATION"	=>"L",
                    "FORMAT"		=>"a4",
                    "name"			=>"rese",
                    // "preview"       =>true,
                    "preview"       =>false,
                    "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                    .$this->qdata->_headerLapiran(
                                        false,
                                        $tglR,
                                        "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                        "REKAPITULASI USULAN PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                    )
                                    .$this->qdata->_lforum($dusulan)
                ]);
            break;
            case '3': //DISPOSISI
                // return $this->qdata->_log($ddisposisi);
                array_push($dlaporan,[  
                    "ORIENTATION"	=>"P",
                    "FORMAT"		=>"a4",
                    "name"			=>"rese",
                    "preview"       =>true,
                    "preview"       =>false,
                    "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                    .$this->qdata->_headerLapiran(
                                        true,
                                        $tglR,
                                        "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                        "REKAPITULASI DISPOSISI USULAN PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                    )
                                    .$this->qdata->_ldisposisi($ddisposisi)
        
                ]);
            break;
            case '4': //STRUKTUR
                array_push($dlaporan,[
                    "ORIENTATION"	=>"P",
                    "FORMAT"		=>"a4",
                    "name"			=>"rese",
                    "preview"       =>true,
                    "preview"       =>false,
                    "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                    .$this->qdata->_headerLapiran(
                                        true,
                                        $tglR,
                                        "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                        "REKAPITULASI PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                    )
                                    .$this->qdata->_lstruktur($dall)
        
                ]);
            break;
            case '5': //NOTULEN
                array_push($dlaporan,[
                    "ORIENTATION"	=>"p",
                    "FORMAT"		=>"a4",
                    "name"			=>"rese",
                    // "preview"       =>true,
                    "preview"       =>false,
                    "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                    .$data
                ]);
                array_push($dlaporan,[
                    "ORIENTATION"	=>"p",
                    "FORMAT"		=>"a4",
                    "name"			=>"rese",
                    // "preview"       =>true,
                    "preview"       =>false,
                    "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                    .$this->qdata->_headerLapiran(
                                        true,
                                        $tglR,
                                        "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                        "REKAPITULASI DAFTAR HADIR FORUM PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                    )
                                    .$this->qdata->_ldaftarHadir($dabsensi)
                ]);
                if(count($dokumentasi)>0){
                    array_push($dlaporan,[  
                        "ORIENTATION"	=>"P",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            true,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI DOKUMENTASI PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_ldokumentasi($dokumentasi)
            
                    ]);
                }
            break;
            case '6': //PAGU DINAS
                // return $this->qdata->_log($dinas);
                array_push($dlaporan,[
                    "ORIENTATION"	=>"p",
                    "FORMAT"		=>"a4",
                    "name"			=>"rese",
                    // "preview"       =>true,
                    "preview"       =>false,
                    "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                    .$this->qdata->_headerLapiran(
                                        true,
                                        $tglR,
                                        "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                        "REKAPITULASI PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                    )
                                    .$this->qdata->_lpaguDinas($dinas)
                ]);
                
            break;
            default: // all
                // notulen
                if(strlen($data)>0){
                    array_push($dlaporan,[
                        "ORIENTATION"	=>"p",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$data
                    ]);
                }

                // notulen
                if(count($dabsensi)>0){
                    array_push($dlaporan,[
                        "ORIENTATION"	=>"p",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            true,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI DAFTAR HADIR FORUM PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_ldaftarHadir($dabsensi)
                    ]);
                }
                

                                        // usulan
                if(count($dusulan)>0){
                    array_push($dlaporan,[
                        "ORIENTATION"	=>"L",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            false,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI USULAN PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_lforum($dusulan)
                    ]);
                }
                
                if(count($ddisposisi)>0){
                    array_push($dlaporan,[  
                        "ORIENTATION"	=>"P",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            true,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI DISPOSISI USULAN PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_ldisposisi($ddisposisi)
            
                    ]);
                }
                
                if(count($dokumentasi)>0){
                    array_push($dlaporan,[  
                        "ORIENTATION"	=>"P",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            true,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI DOKUMENTASI PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_ldokumentasi($dokumentasi)
            
                    ]);
                }
                
                                        // struktur apbd
                if(count($dall)>0){
                    array_push($dlaporan,[
                        "ORIENTATION"	=>"P",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            true,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_lstruktur($dall)
                    ]);
                }
                                        // pagu dinas
                if(count($dinas)>0){
                    array_push($dlaporan,[
                        "ORIENTATION"	=>"p",
                        "FORMAT"		=>"a4",
                        "name"			=>"rese",
                        // "preview"       =>true,
                        "preview"       =>false,
                        "html"          =>$this->qdata->_headerLaporan($this->qdata->_getAssetUrl()."bgSupportCss/logoKSB1.png")
                                        .$this->qdata->_headerLapiran(
                                            true,
                                            $tglR,
                                            "Pergeseran/Penyesuaian APBD TA. ".$tahun."",
                                            "REKAPITULASI PERUBAHAN APBD TA. ".$tahun." BERDASARKAN ORGANISASI PERANGKAT DAERAH (OPD)"
                                        )
                                        .$this->qdata->_lpaguDinas($dinas)
                    ]);
                }
                
            break;
        }
        return $dlaporan;
    }
}