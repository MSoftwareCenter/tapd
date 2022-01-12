<?php
   
    class Variable{
        var $nmKeyTabel=array();
        var $kdApp="MFC2G18-01";//06 tgl/10/bulan/21/tahun
        var $nmApp="Tim Anggaran Pendapatan Daerah";//06 tgl/10/bulan/21/tahun
        var $logoApp="logo1_min.png";//06 tgl/10/bulan/21/tahun
        var $rxxx=['Mk','x','OA'];
        function _getNKA($obj){ //nama key Action crud-???
            $no=1;

            $forTapd=[3,4,5,6];
            $forDisposisi=[2,3,4,5,6];
            $devAdminDisposisi=[2,4,6];
            $devAdminKajian=[4,5,6];
            $devAdminSekretarian=[4,6];
            $allAkses=[1,2,3,4,5,6]; //no tingkat jabatan
            $unik="MFC2G18-";
            $nm="sist";     //login sistem
            $this->nmKeyTabel['l-'.$nm]=array(  
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$allAkses,
                'page'=>'Login Sistem'
            );
            
            $no+=1;
            $nm="dash";     //dashboard sistem
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$allAkses, //no tingkat jabatan
                'page'=>'Dashboard'
            );
            $nm="perd";//inp 
            $nmPage="Perda"; 
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            //update
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            //Delete
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            ); 

            //3
            $no+=1;
            $nm="dina"; 
            $nmPage="Dinas"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$allAkses, //no tingkat jabatan
                'page'=>$nmPage
            );
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            ); 
            
            $no+=1;
            $nm="memb"; 
            $nmPage="Member"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$allAkses, //no tingkat jabatan
                'page'=>$nmPage
            );
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            ); 

            $no+=1;
            $nm="rens"; 
            $nmPage="renstra"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$allAkses, //no tingkat jabatan
                'page'=>$nmPage
            );

            $nm="duru"; 
            $nmPage="Urusan"; 
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            ); 

            $nm="dbid"; 
            $nmPage="Bidang"; 
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/5",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/6",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/7",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            ); 

            $nm="dpro"; 
            $nmPage="Program"; 
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/8",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/9",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/10",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            ); 

            $nm="dkeg"; 
            $nmPage="Kegiatan"; 
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/11",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/12",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/13",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            );
            
            $nm="dsub"; 
            $nmPage="Sub Kegiatan"; 
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/14",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/15",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/16",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>'Hapus Data '.$nmPage
            );


            //6
            $no+=1;
            $nm="usul"; 
            $nmPage="Usulan"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$allAkses, //no tingkat jabatan
                'page'=>$nmPage
            );
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$allAkses,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$allAkses,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$allAkses,
                'page'=>'Hapus Data '.$nmPage
            ); 
            $this->nmKeyTabel['s-'.$nm]=array( // send usulan
                'kd'=>$unik.$no."/5",
                'kdJabatan'=>$allAkses,
                'page'=>'Kirim Data '.$nmPage
            ); 

            $no+=1;
            $nm="disp"; 
            $nmPage="Disposisi"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$devAdminDisposisi, //no tingkat jabatan
                'page'=>$nmPage
            );
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminDisposisi,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminDisposisi,
                'page'=>'Perbarui Data '.$nmPage
            ); 
            $this->nmKeyTabel['d-'.$nm]=array(
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$devAdminDisposisi,
                'page'=>'Arsipkan '.$nmPage
            );

            $no+=1;
            $nm="kaji"; 
            $nmPage="Kajian Teknis"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$devAdminKajian, //no tingkat jabatan
                'page'=>$nmPage
            );
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminKajian,
                'page'=>'Tambah Data '.$nmPage
            );
            $this->nmKeyTabel['u-'.$nm]=array( 
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminKajian,
                'page'=>'Perbarui Data '.$nmPage
            );

            $no+=1;
            $nm="foru"; 
            $nmPage="Forum TAPD"; 
            $this->nmKeyTabel['p-'.$nm]=array( 
                'kd'=>$unik.$no."/1",
                'kdJabatan'=>$forTapd, //no tingkat jabatan
                'page'=>$nmPage
            );
            $this->nmKeyTabel['c-'.$nm]=array( 
                'kd'=>$unik.$no."/2",
                'kdJabatan'=>$devAdminSekretarian, //no tingkat jabatan
                'page'=>" changed ".$nmPage
            );
            $this->nmKeyTabel['s-'.$nm]=array( // set nomor pembahasan forum
                'kd'=>$unik.$no."/3",
                'kdJabatan'=>$devAdminSekretarian, //no tingkat jabatan
                'page'=>" set nomor pembahasan ".$nmPage
            );
            $this->nmKeyTabel['f-'.$nm]=array( // Finalisasi forum
                'kd'=>$unik.$no."/4",
                'kdJabatan'=>$devAdminSekretarian,
                'page'=>" aksi finalisasi ".$nmPage
            );
            return $this->nmKeyTabel[$obj]['kd'];
            
        }
        function _getAllNKA(){
            $this->nmKeyTabel=array();
            $this->_getNKA("p-memb");
            return $this->nmKeyTabel;
        }
        function _getUrl($nama){
            switch(strtolower($nama)){
                case "usulan":return "control/usulan"; break;
                case "disposisi":   return "control/disposisi"; break;
                case "1":      return "control/usulan"; break;
                case "2":      return "control/usulan"; break;
                case "3":      return "control/usulan"; break;

                
            }
        }
        public function _setBaseUrl($url){
            $this->url=$url;
        }
        public function _getAssetUrl(){
            return $this->url."assets/";
        }
        public function _getRouter(){
            return $this->url.'index.php/';
        }
        public function _getCss(){
            return '
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-grid.css">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-grid.css.map">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-grid.min.css">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-grid.min.css.map">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-reboot.css">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-reboot.css.map">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-reboot.min.css">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-reboot.min.css.map">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap.css">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap.css.map">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap.min.css">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap.min.css.map">
                <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/carousel.css">
                <link rel="stylesheet" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstrap-icons.css">
                <link rel="stylesheet" href="'.$this->_getAssetUrl().'bootstrap/dist/css/bootstap-table-button.css">
                <link rel="stylesheet" href="'.$this->_getAssetUrl().'bootstrap/dist/css/style.css">
                <link rel="stylesheet" href="'.$this->_getAssetUrl().'web2G18.css">
                <link rel="stylesheet" href="'.$this->_getAssetUrl().'bootstrap/icon/css/materialdesignicons.min.css">
            ';
            // <link rel="stylesheet" type="text/css" href="'.$this->_getAssetUrl().'bootstrap/dist/css/dashboard.css">
            return ;
        }
        public function _getJs(){
            return '<script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.bundle.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.bundle.js.map"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.bundle.min.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.bundle.min.js.map"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.js.map"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.min.js.map"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap.min.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/bootstrap-tabel.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/jquery-tabel.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/fontAwesome-all.js"></script>
            ';
            // <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/dashboard.js"></script>
        }
        public function _getJsTabel(){

            // <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/buttons.flash.min.js"></script>
            // <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/jszip.min.js"></script>
            // <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/pdfmake.min.js"></script>
            // <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/vfs_fonts.js"></script>
            // <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/buttons.html5.min.js"></script>
            return '
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/datatables.min.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/dataTables.buttons.min.js"></script>

                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/buttons.print.min.js"></script>
                <script src="'.$this->_getAssetUrl().'bootstrap/dist/js/data-table/datatables-init.js"></script>
            ';
        }
        public function _getJsmin(){
            return '<script src="'.$this->_getAssetUrl().'bootstrap/dist/js/jquery.js"></script>';
        }
        
        public function _getHeadTextEditor(){
            return '
            <script src="'.$this->_getAssetUrl().'Library/textEditor/plugins/global/plugins.bundle.js" type="text/javascript"></script>
            <script src="'.$this->_getAssetUrl().'Library/textEditor/js/scripts.bundle.js" type="text/javascript"></script>
            ';
        }
        public function _getFooterTextEditor(){
            return '
            <script src="'.$this->_getAssetUrl().'Library/textEditor/plugins/custom/tinymce/tinymce.bundle.js" type="text/javascript"></script>
            ';
        }

        function _getThema($no){
            switch($no){
                case 0:return '<script src="'.$this->_getAssetUrl().'thema/ruangAdmin/act.js"></script>'; break;
                case 1:return '<script src="'.$this->_getAssetUrl().'thema/majest/act.js"></script>'; break;
                case 2:return '<script src="'.$this->_getAssetUrl().'thema/able-lite/act.js"></script>'; break;
            }
        }
        function _html($judul,$meta,$thema){
            // System local BAPPEDA LITBANG Kabupaten Sumbawa Barat
            return "
            <!DOCTYPE html>
            <html>
                <head>
                    <title>".$judul."</title>
                    <meta name='description' content='".$meta."'>
                    <link href='".$this->_getAssetUrl()."bgSupportCss/".$this->logoApp."' rel='icon'>
                    <div id='start'>
                        ".$this->_getJsmin()."
                    </div>
                    ".$this->_getThema($thema)."
                    <div id='head'>
                    </div>
                </head>
                <body style='background-color: #eee;padding:0px;min-height: 0px;'>
                    <div id='body'>
                        
                    </div>
                    <div id='loading'>
                        <div style='background-color:#eee;'>
                            <div style='margin:auto; display: block;width:max-content; height:800px'>
                                <img src='".$this->_getAssetUrl()."bgSupportCss/loader1.gif' style='margin-top:50%;'>
                            </div>
                        </div>
                    </div>
                    <div id='footer'>
                    </div>
                    <div id='toast' style='background: none;'></div>
                    
                    <div class='modal' id='modal'  data-keyboard='false' tabindex='-1'data-backdrop='static' aria-modal='true'>
                        <div class='modal-dialog modal-dialog-centered d-flex justify-content-center' id='modalContent' role='document'>
                        
                        </div>
                        
                    </div>

                </body>
            </html>
            ";
        }
        public function _getJsMaster($namaFolder){
            return'
                <script src="'.$this->_getAssetUrl()."jsMaster/"."$namaFolder".'/index.js"></script>
                <script src="'.$this->_getAssetUrl()."jsMaster/".'M-HTML.js"></script>
                <script src="'.$this->_getAssetUrl()."jsMaster/".'M-DATA.js"></script>
                <script src="'.$this->_getAssetUrl()."jsMaster/".'M-HTML-FORM.js"></script>
                <script src="'.$this->_getAssetUrl()."jsMaster/".'M.js"></script>
                <script src="'.$this->_getAssetUrl()."jsMaster/".'V.js"></script>
                <script src="'.$this->_getAssetUrl()."Library/excel/lib/".'xlsx.js"></script>
                <script src="'.$this->_getAssetUrl()."Library/pdf/".'pdf.js"></script>
            ';
            // <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
            // <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>
            // 
            //     <script src="'.$this->_getAssetUrl()."excel/lib/".'zip.js"></script>

        }
        function _qCekKey($kodeForm,$kodeMember){
            return "SELECT 
                * 
            FROM member a 
            JOIN appKey b on
                a.kdMember1 =b.kdMember
            WHERE b.kdFitur='".$kodeForm."' AND b.kdMember='".$kodeMember."' AND b.kunci=0";
        }
        function _isCode(){
            return "1933f89iG";
        }
        function _backCode($add){
            return substr($add,4,8).$this->_isCode().substr($add,8,12);
        }
        function _backCodes($add){
            if($this->_isCode()==substr($add,8,9)){
                return true;
            }
            return false;
        }
        function _xxx($data){
            $data=[substr($data,0,2),substr($data,3,1),substr($data,4,2)];
            $isback=true;
            foreach ($data as $key => $value) {
                if($value!=$this->rxxx[$key]){
                    $isback=0;
                }
            }
            return $isback;
        }
    }
?>