<?php
    include 'Variable.php';
    class Method extends Variable{
        var $url="";
        public function responTrue($data){
            $_=array();
            $_['exec']=true;
            $_['data']=$data;
            print_r(json_encode($_));
        }
        public function responFalse($msg){
            $_=array();
            $_['exec']=false;
            $_['msg']=$msg;
            print_r(json_encode($_));
        }
        function resT($data){
            $_=array();
            $_['exec']=1;
            $_['data']=$data;
            return $_;
        }
        function resF($msg){
            $_=array();
            $_['exec']=0;
            $_['msg']=$msg;
            return $_;
        }
        function _exportTxt($ket,$data){
            // $this->qdata->_exportTxt($this->qdata->_getIpClient()."<>",json_encode($session));
            date_default_timezone_set("America/New_York");
            $nama=$ket."-".date("Y-m-d-h-i-sa");
            file_put_contents("./assets/session/".$nama.".txt",$data);
            return $nama;
        }
        function _checkStringQuery($val){
            $split=explode('"',$val);
            $res="";
            for($a=0;$a<count($split);$a++){
                if($a>0){
                    $res.="'";
                }
                $res.=$split[$a];
            }
            if($res!=""){
                return "'".$res."'";
            }
            $split=explode("'",$val);
            for($a=0;$a<count($split);$a++){
                if($a>0){
                    $res.='"';
                }
                $res.=$split[$a];
            }
            return '"'.$res.'"';
        }
        function _toNumber($val){
           
            $split=explode('.',$val);
            $res="";
            for($a=0;$a<count($split);$a++){
                $res.=$split[$a];
            }
            ;
            $split=explode(",",$res);
            $res="";
            for($a=0;$a<count($split);$a++){
                $res.=$split[$a];
            }
            return $res;
        }
        public function _getJsChart(){
            return '
                <script src="'.$this->_getAssetUrl().'charts/main-js.js"></script>
                <script src="'.$this->_getAssetUrl().'charts/charts-bundle/chartjs.js"></script>
                <script src="'.$this->_getAssetUrl().'charts/charts-bundle/Chart.bundle.js"></script>
            ';
        }
        function _dateTime($format){
            date_default_timezone_set("America/New_York");
            // Y-m-d-h-i-sa
            return date($format);
        }
        function _dateTimes(){
            return $this->_dateTime("Y-m-d-h-i-sa");
        }
        public function _uang($angka){
	    	$data=explode(",",$angka);
	    	if (count($data)==1) {
	    		$data=explode(".",$angka);
	    	}
			if (count($data)>1 and strlen($data[0])>3) {
				$countdata=strlen($data[0]);
				$sisa=$countdata%3;
				$result="";
				while ($countdata>0) {
					if ($countdata>=3) {						
						if ($countdata==0 or $countdata<=3) {
							$result=substr($data[0],($countdata-3),3).$result;
						}else{							
							$result=",".substr($data[0],($countdata-3),3).$result;
						}
					}else{						
						$result=substr($data[0],0,$sisa).$result;						
						break;
					}
					$countdata-=3;
				}
				return $result.",".$data[1];
			}else{		
				if (count($data)==1) {
					$countdata=strlen($angka);
					$sisa=$countdata/3;
					$susa=$countdata%3;
					$result="";
					if ($sisa>1) {
						while ($sisa>=1) {
							if ($sisa==1) {
								$result=substr($angka,($countdata-3),3).$result;
							}else{
								$result=",".substr($angka,($countdata-3),3).$result;
							}
							$sisa-=1;
							$countdata-=3;
							if ($sisa<1) {
								$result=substr($angka,(0),$countdata).$result;
							}
						}
						return $result;	
					}else{
						return $angka;	
					}
				}else{
					return $angka;
				}
			}
        }
        function readExcel($assets){
            ini_set('error_reporting', E_ALL);
            ini_set('display_errors', true);
            require './assets/excel/SimpleXLSX.php';
            // echo '<h1>dd</h1><pre>';
            if ( $xlsx = SimpleXLSX::parse('./assets/'.$assets) ) {
                return $xlsx->rows();
                // print_r( $xlsx->rows() );
            } else {
                return SimpleXLSX::parseError();
                // echo SimpleXLSX::parseError();
            }
        }
        function writeExcel($data){
            include_once APPPATH.'/third_party/xlsxwriter.class.php';
            ini_set('display_errors', 0);
            ini_set('log_errors', 1);
            error_reporting(E_ALL & ~E_NOTICE);
            $filename = $data[0]['nama']."-".date('d-m-Y-H-i-s').".xlsx";
            header('Content-disposition: attachment; filename="'.XLSXWriter::sanitize_filename($filename).'"');
            header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            header('Content-Transfer-Encoding: binary');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');

            $writer = new XLSXWriter();
            $writer->setAuthor('2G18');

            $onlyone=false;
            foreach ($data as $key => $v) {
                if(!empty($v['only-one'])){
                    $onlyone=$v['only-one'];
                }else{
                    $onlyone=false;
                }

                $styles = array(
                    'widths'=>$v['width'], 
                    'font'=>'Arial',
                    'font-size'=>$v['text-size'],
                    'font-style'=>'bold', 
                    'fill'=>'#eee', 
                    'halign'=>'center', 
                    'border'=>'left,right,top,bottom'
                );
               
                $header = $v['KolomName'];
                $writer->writeSheetHeader($v['sheet'], $header, $styles);
                foreach($v['data'] as $ind =>$v1){
                    $ftam=array();
                    
                    if(!$onlyone || $ind==0){
                        array_push($ftam,$ind+1);
                    }else{
                        array_push($ftam,'');
                    }
                    foreach($v['namaValue'] as $ind1 =>$v2){
                        if(!empty($v1[$v2])){
                            array_push($ftam,$v1[$v2]);
                        }else{
                            array_push($ftam,'');
                        }
                    }
                    $writer->writeSheetRow($v['sheet'],$ftam);
                    // $writer->writeSheetRow('Sheet1',$ftam,$styles2);
                }
            }
            $writer->writeToStdOut();
        }
        function _nameLaporan($ex){
            return "lp-2G18-".$this->_dateTime("Y-m-d-h-i-sa").".".$ex;
        }
        function _log($msg){
            echo "<pre>";
            print_r($msg);
        }
        function _iequery($v){
            return "INSERT INTO `equery`(`kdMember`, `query`, `action`, `msg`) VALUES 
                ('".$v['kdMember']."',".'"'.$v['query'].'"'.",'".$v['action']."','".$v['msg']."')";
        }
        function _Kalender($tahun){
            return [
                1=>[
                    "nama"=>"Januari",
                    "tglS"=>$tahun."-01-01",
                    "tglE"=>$tahun."-01-31",
                ],
                2=>[
                    "nama"=>"Februari",
                    "tglS"=>$tahun."-02-01",
                    "tglE"=>$tahun."-02-29",
                ],
                3=>[
                    "nama"=>"Maret",
                    "tglS"=>$tahun."-03-01",
                    "tglE"=>$tahun."-03-30",
                ],
    
                4=>[
                    "nama"=>"April",
                    "tglS"=>$tahun."-04-01",
                    "tglE"=>$tahun."-04-30",
                ],
                5=>[
                    "nama"=>"Mei",
                    "tglS"=>$tahun."-05-01",
                    "tglE"=>$tahun."-05-31",
                ],
                6=>[
                    "nama"=>"Juni",
                    "tglS"=>$tahun."-06-01",
                    "tglE"=>$tahun."-06-30",
                ],
    
                7=>[
                    "nama"=>"Juli",
                    "tglS"=>$tahun."-07-01",
                    "tglE"=>$tahun."-07-31",
                ],
                8=>[
                    "nama"=>"Agustus",
                    "tglS"=>$tahun."-08-01",
                    "tglE"=>$tahun."-08-31",
                ],
                9=>[
                    "nama"=>"September",
                    "tglS"=>$tahun."-09-01",
                    "tglE"=>$tahun."-09-30",
                ],
                10=>[
                    "nama"=>"Oktober",
                    "tglS"=>$tahun."-10-01",
                    "tglE"=>$tahun."-10-31",
                ],
                11=>[
                    "nama"=>"November",
                    "tglS"=>$tahun."-11-01",
                    "tglE"=>$tahun."-11-30",
                ],
                12=>[
                    "nama"=>"Desember",
                    "tglS"=>$tahun."-12-01",
                    "tglE"=>$tahun."-12-31",
                ]
            ];
        }
        function _getIpClient() {
            $ipaddress = '';
            if (getenv('HTTP_CLIENT_IP'))
                $ipaddress = getenv('HTTP_CLIENT_IP');
            else if(getenv('HTTP_X_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
            else if(getenv('HTTP_X_FORWARDED'))
                $ipaddress = getenv('HTTP_X_FORWARDED');
            else if(getenv('HTTP_FORWARDED_FOR'))
                $ipaddress = getenv('HTTP_FORWARDED_FOR');
            else if(getenv('HTTP_FORWARDED'))
               $ipaddress = getenv('HTTP_FORWARDED');
            else if(getenv('REMOTE_ADDR'))
                $ipaddress = getenv('REMOTE_ADDR');
            else
                $ipaddress = 'UNKNOWN';
            return $ipaddress;
        }

        function _getAllFile($lokasi){
            $files = scandir('./assets'.$lokasi);
            $arr=[];
            $nama="";
            $ukuran="";
            foreach ($files as $key => $value) {
                if($key>1){
                    $nama = pathinfo($value, PATHINFO_FILENAME);
                    $ukuran = filesize(FCPATH.'/assets'.$lokasi.'/'.$value);
                    $arr[] = array(
                        'nama' => $nama,
                        'ukuran' => $this->_getSizeFile($ukuran),
                        'file' => base_url('assets'.$lokasi.'/'.$value),
                        'fileLok'=>'./assets'.$lokasi."/".$nama
                    );
                }
            }
            return $arr;
        }
        function _getSizeFile($bytes, $decimals = 2) {
            $sz = 'BKMGTP';
            $factor = floor((strlen($bytes) - 1) / 3);
            return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)).' '. @$sz[$factor] .'b';
        }
        function _removeFile($data,$search){
            foreach ($data as $key => $v) {
                $exp=explode($search,$v['nama']);
                if(count($exp)>1){
                    array_map('unlink', glob(FCPATH.$v['fileLok'].'*'));
                }
            }
        }
        function _readFileTxt($namaFile){
            $myfile = fopen($namaFile, "r") or die("Unable to open file!");
            return fread($myfile,"50000");
            fclose($myfile);
        }
    }
?>