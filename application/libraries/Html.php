<?php
    include 'Method.php';
    class Html extends Method{
        var $sty    ='style="background-color:#CCC;color:#000; font-weight: bold;text-align: center;"',
            $sty1   ='style="background-color:#275F5F;color:#fff; font-weight: bold;text-align: center;"',
            $sty2    ='style="text-align: center;"',
            $sty3    ='style=" margin-left:10px;"',
            $sty4    ='style="text-align: center; background-color:#275F5F;color:#fff;"';

        function judulLap($text){
            return '
                <div  style="text-align: center; font-size: 15px;width:100%; margin-bottom: 10px;">
                    '.$text.'
                    <br>
                </div>
            ';
        }
        function tcTransaksi($data){
            $c1=20;
            $c2=40;
            $c3=40;
            $c4=160;
            $c5=70;
            $q='
            <table cellspacing="0" cellpadding="1" border="1">
                <thead>
                    <tr '.$this->sty.'>
                        <th width="'.$c1.'">No</th>
                        <th width="'.$c2.'">No Nota</th>
                        <th width="'.$c3.'">Produk</th>
                        
                        <th width="'.$c4.'">Item</th>
                        <th width="'.$c5.'">Total</th>
                        <th width="'.$c5.'">Bayar</th>

                        <th width="'.$c5.'">Kembalian</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
            ';
            $num=1;
            foreach($data as $key =>$val){
                $countD=count($val['ddetail'])+2;
                $q.='
                    <tr '.$this->sty2.'>
                        <td width="'.$c1.'" rowspan="'.$countD.'">'.$num.'</td>
                        <td width="'.$c2.'" rowspan="'.$countD.'">'.$val["kdKT1"].'</td>
                        <td width="'.$c3.'">'.$val["jmlPaket"].'</td>

                        <td width="'.$c4.'">'.$val["jmlItem"].'</td>
                        <td width="'.$c5.'">'.$val["jmlBelanja"].'</td>
                        <td width="'.$c5.'">'.$val["jmlBayar"].'</td>

                        <td width="'.$c5.'">'.$val["sisaBayar"].'</td>
                        <td rowspan="'.$countD.'">'.$val["ins"].'</td>
                    </tr>
                ';
                foreach ($val['ddetail'] as $key1 => $val1) {
                    if($key1==0){
                        $q.='
                            <tr '.$this->sty1.'>
                                <td>No</td>
                                <td>Barang</td>

                                <td>Harga</td>
                                <td>Qty</td>
                                <td>Total</td>
                            </tr>
                        ';
                    }
                    $q.='
                        <tr>
                            <td '.$this->sty2.'>'.($key1+1).'.</td>

                            <td>'.$val1["nmGB"].'</td>
                            <td>'.$val1["harga"].'</td>
                            <td>'.$val1["totalIGroup"].'</td>

                            <td>'.$val1["subTotal"].'</td>
                        </tr>
                    ';
                }
                $num+=1;
            }
            return $q."</table>";
        }
        function tcTransfer($data){
            $c1=20;
            $c2=40;
            $c3=100;
            $c4=160;
            $c5=70;
            $q='
            <table cellspacing="0" cellpadding="1" border="1">
                <thead>
                    <tr '.$this->sty.'>
                        <th width="'.$c1.'">No</th>
                        <th width="'.$c2.'">No Nota</th>
                        <th width="'.$c3.'">Nama Penerima</th>
                        
                        <th width="'.$c4.'">Item</th>
                        <th width="'.$c5.'">Total</th>
                        <th width="'.$c5.'">Status</th>

                        <th >Tanggal</th>
                    </tr>
                </thead>
            ';
            $num=1;
            // print_r("<pre>");
            // print_r($data);
            foreach($data as $key =>$val){
                $countD=count($val['ddetail'])+2;
                if($countD==2){
                    $countD=0;
                }
                $q.='
                    <tr '.$this->sty2.'>
                        <td width="'.$c1.'" rowspan="'.$countD.'">'.$num.'</td>
                        <td width="'.$c2.'" rowspan="'.$countD.'">'.$this->_getNKT("ktfb",false).$val["kdTf"].'</td>
                        <td width="'.$c3.'" >'.$val["nmCabang"].'</td>

                        <td width="'.$c4.'">'.$this->_uang($val["totalBarang"]).'</td>
                        <td width="'.$c5.'">'.$this->_uang($val["jmlBelanja"]).'</td>
                        <td width="'.$c5.'">'.$val["statusBayar"].'</td>

                        <td>'.$val["ins"].'</td>
                    </tr>
                ';
                foreach ($val['ddetail'] as $key1 => $val1) {
                    if($key1==0){
                        $q.='
                            <tr '.$this->sty1.'>
                                <td>No</td>
                                <td>Barang</td>

                                <td>Harga</td>
                                <td>Qty</td>
                                <td>Total</td>
                            </tr>
                        ';
                    }
                    $q.='
                        <tr>
                            <td '.$this->sty2.'>'.($key1+1).'.</td>

                            <td '.$this->sty3.'>'.$val1["nmGB"].'</td>
                            <td '.$this->sty2.'>'.$this->_uang($val1["harga"]).'</td>
                            <td '.$this->sty2.'>'.$this->_uang($val1["jumlahT"]).'</td>

                            <td '.$this->sty2.'>'.$this->_uang($val1["totalBelanja"]).'</td>
                        </tr>
                    ';
                }
                $num+=1;
            }
            return $q."</table>";
        }
        function tcPenyetoran($data){
            $c1=20;
            $c2=40;
            $c3=100;
            $c4=160;
            $c5=70;
            $q='
            <table cellspacing="0" cellpadding="1" border="1">
                <thead>
                    <tr '.$this->sty.'>
                        <th width="'.$c1.'">No</th>
                        <th width="'.$c2.'">No Nota</th>
                        <th width="'.$c3.'">Nama Penerima</th>
                        
                        <th width="'.$c5.'">Item</th>
                        <th width="'.$c5.'">Total Belanja</th>
                        <th width="'.$c5.'">Total Bayar</th>

                        <th width="'.$c5.'">Sisa Bayar</th>
                        <th >Tanggal</th>
                    </tr>
                </thead>
            ';
            $num=1;
            // print_r("<pre>");
            // print_r($data);
            foreach($data as $key =>$val){
                $countD=count($val['ddetail'])+2;
                if($countD==2){
                    $countD=0;
                }
                $q.='
                    <tr '.$this->sty2.'>
                        <td width="'.$c1.'" rowspan="'.$countD.'">'.$num.'</td>
                        <td width="'.$c2.'" rowspan="'.$countD.'">'.$val["kdTf1"].'</td>
                        <td width="'.$c3.'" >'.$val["nmCabang"].'</td>

                        <td width="'.$c5.'">'.$this->_uang($val["totalBarang"]).'</td>
                        <td width="'.$c5.'">'.$this->_uang($val["jmlBelanja"]).'</td>
                        <td width="'.$c5.'">'.$this->_uang($val["totalPembayaran"]).'</td>';
                    if($val['sisaPembayaran']=="0"){
                        $q.='<td width="'.$c5.'">'.($val["statusBayar"]).'</td>';
                    }else{
                        $q.='<td width="'.$c5.'">'.$this->_uang($val["sisaPembayaran"]).'</td>';
                    }
                    $q.='<td>'.$val["ins"].'</td>
                    </tr>
                ';
                foreach ($val['ddetail'] as $key1 => $val1) {
                    if($key1==0){
                        $q.='
                            <tr '.$this->sty1.'>
                                <td>No</td>
                                <td>Jumlah Belanja</td>
                                <td>Jumlah Cicilan</td>

                                <td>Sisa Bayar</td>
                                <td>Tanggal</td>
                            </tr>
                        ';
                    }
                    $q.='
                        <tr>
                            <td '.$this->sty2.'>'.($key1+1).'.</td>
                            <td '.$this->sty3.'>'.$this->_uang($val1["jmlBelanja"]).'</td>
                            <td '.$this->sty2.'>'.$this->_uang($val1["jmlBayar"]).'</td>

                            <td '.$this->sty2.'>'.$this->_uang($val1["sisaBayar"]).'</td>
                            <td '.$this->sty2.'>'.$val1["ins"].'</td>
                        </tr>
                    ';
                }
                $num+=1;
            }
            return $q."</table>";
        }
        function tcStokBarang($data){
            $c1=20;
            $c2=40;
            $c3=100;
            $c4=140;
            $c5=70;
            $q='
            <table cellspacing="0" cellpadding="1" border="1">
                <thead>
                    <tr '.$this->sty.'>
                        <th width="'.$c1.'">No</th>
                        <th width="'.$c2.'">No Nota</th>
                        <th width="'.$c3.'">Kategori</th>
                        <th width="'.$c3.'">Total Awal</th>
                        <th width="'.$c5.'">Terjual</th>
                        <th width="'.$c5.'">Sisa</th>
                        <th width="'.$c4.'">Tanggal</th>
                    </tr>
                </thead>
            ';
            $num=1;
            // print_r("<pre>");
            // print_r($data);
            $start="";
            $countStart=0;
            $totalAwal=0;

            $viewStart=false;
            $kondisi=true;
            foreach($data as $key =>$val){
                $viewStart=false;
                if($start!=$val['noUpdBarang']){
                    $countStart=0;
                    $start=$val['noUpdBarang'];
                    $kondisi=true;
                    foreach($data as $ke =>$e){
                        if($e['noUpdBarang']==$start){
                            if($kondisi){
                                $totalAwal=$e['jumlahS']+$e['jumlahT'];
                                $kondisi=false;
                                $viewStart=true;
                            }
                            $countStart+=1;
                        }
                    }
                }
                if($kondisi && $key==0){ //terjadi kerena noUpdBarang null
                    $totalAwal=$val['jumlahS']+$val['jumlahT'];
                    $viewStart=true;
                    $countStart=count($data);
                }
                if($val['kategori']=="transfer"){
                    $q.='
                    <tr '.$this->sty4.'>';
                }else{
                    $q.='
                    <tr '.$this->sty2.'>';
                }
                $q.='
                        <td width="'.$c1.'">'.$num.'</td>
                        <td width="'.$c2.'">'.$val["kdNota"].'</td>
                        <td width="'.$c3.'" >'.$val["kategori"].'</td>';

                    if($viewStart){
                        $q.='<td width="'.$c3.'" rowspan="'.$countStart.'">'.$this->_uang($totalAwal).'</td>';
                    }
                    
                    $q.='<td width="'.$c5.'">'.$this->_uang($val["jumlahT"]).'</td>
                        <td width="'.$c5.'">'.$this->_uang($val["jumlahS"]).'</td>
                        <td width="'.$c4.'">'.$val["ins"].'</td>
                    </tr>
                ';
                $num+=1;
            }
            return $q."</table>";
        }
        function tcMinimalStok($data){
            $c1=20;
            $c2=250;
            $c3=135;
            $c4=135;
            $c5=70;
            $q='
            <table cellspacing="0" cellpadding="1" border="1">
                <thead>
                    <tr '.$this->sty1.'>
                        <th width="'.$c1.'">No</th>
                        <th width="'.$c2.'">Nama</th>
                        <th width="'.$c3.'">Minimal</th>
                        <th width="'.$c3.'">Stok</th>
                    </tr>
                </thead>
            ';
            $num=1;
            // print_r("<pre>");
            // print_r($data);
            $start="";
            $countStart=0;
            $totalAwal=0;

            $viewStart=false;
            $kondisi=true;
            foreach($data as $key =>$val){
                $q.='
                    <tr '.$this->sty.'>
                        <td width="'.$c1.'">'.($key+1).'</td>
                        <td width="'.$c2.'">'.$val['nmGB'].'</td>
                        <td width="'.$c3.'">'.$val['minView'].'</td>
                        <td width="'.$c3.'">'.$val['jumlahS'].'</td>
                    </tr>
                ';
            }
            return $q."</table>";
        }
        function _headerLaporan($logo){
            return '
                <table cellspacing="0" cellpadding="1" border="0" style="text-align: center; width:100%;">
                    <tr>
                        <td style="width:10%;text-align:center" >
                            <img src="'.$logo.'" width="60px;"> 
                        </td>
                        <td style="width:80%;">
                            <b style="font-size:14px;">PEMERINTAH KABUPATEN SUMBAWA BARAT</b><br>
                            <b style="font-size:16px;">SEKRETARIAT DAERAH</b><br>
                            <em>Jln. Bung Karno No. 3 Tlp. ( 0372) 8281766, 8281767 Fax (0372)  8281424 Komplek Kemutat Telu Center</em>
                            <br>
                            <b style="font-size:12px;">TALIWANG</b>
                        </td>
                        <td style="width:10%;text-align:center" >
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:center;width:100%;background-color:black;font-size:2px; " colspan="3">
                        </td>
                    </tr>
                </table>
            ';
        }
        function _headerLapiran($potret,$tanggal,$agenda,$isi){
            $w1="70%;";
            $w2="7%;";
            $w3="23%;";
            if($potret){
                $w1="60%;";
                $w2="7%;";
                $w3="30%;";
            }
            return '
                <table cellspacing="0" cellpadding="0" border="0" style="text-align: center; width:100%;">
                    <tr>
                        <td style="width:'.$w1.'">
                        </td>
                        <td style="width:25%;text-align:left" colspan="2">
                            <span>Lampiran Berita Acara Rapat TAPD</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:'.$w1.'">
                        </td>
                        <td style="width:'.$w2.' text-align:left" >
                            <span>Tanggal</span>
                        </td>
                        <td style="width:'.$w3.' text-align:left" >
                            <span>: '.$tanggal.'</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:'.$w1.'">
                        </td>
                        <td style="width:'.$w2.' text-align:left" >
                            <span>Agenda</span>
                        </td>
                        <td style="width:'.$w3.' text-align:left" >
                            : '.$agenda.'<br>
                        </td>
                    </tr>
                    <tr>
                        <td style="width:100%; margin-top:20%;" rowspan="3">
                            <b>'.$isi.'</b><br>
                        </td>
                    </tr>
                </table>
            ';
        }
        function _lforum($data){
            $w1="75%;";
            $w2="10%;";
            $w3="15%;";

            $fno="20px; text-align:center;";
            $fwidth="80px; ";
            $fwusulan="120px; ";
            $fnilai="55px; ";
            $fend="70px; ";
            $no=1;

            $fdata='
                <table cellspacing="0" cellpadding="1" border="1" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:'.$fno.';" rowspan="2">no</th>
                        <th style="width:'.$fwidth.' text-align:center;" rowspan="2">SKPD</th>
                        <th style="width:'.$fwusulan.' text-align:center;" rowspan="2">Uraian</th>
                        
                        <th colspan="4" style="width:220px; text-align:center;">Usulan</th>
                        
                        <th colspan="4" style="width:220px; text-align:center;">Forum</th>
                        <th style="width:'.$fnilai.' text-align:center;" rowspan="2">Status</th>
                        <th style="width:'.$fend.' text-align:center;" rowspan="2">Keterangan</th>
                    </tr>
                    <tr>
                        <td style="width:'.$fnilai.' text-align:center;">volome</td>
                        <td style="width:'.$fnilai.' text-align:center;">Satuan</td>
                        <td style="width:'.$fnilai.' text-align:center;">Nilai Satuan</td>
                        <td style="width:'.$fnilai.' text-align:center;">Jumlah</td>
                        
                        <td style="width:'.$fnilai.' text-align:center;">volome</td>
                        <td style="width:'.$fnilai.' text-align:center;">Satuan</td>
                        <td style="width:'.$fnilai.' text-align:center;">Nilai Satuan</td>
                        <td style="width:'.$fnilai.' text-align:center;">Jumlah</td>
                    </tr>
                </thead>
                <tbody>
                    
            ';
            
            // <th>Keterangan</th>
            
            foreach ($data as $key => $v) {
                $fdata.='<tr style="padding:5px">
                            <td style="width:'.$fno.'">'.$no.'</td>
                            <td style="width:'.$fwidth.'">'.$v['nmDinas'].'</td>
                            <td style="width:'.$fwusulan.'">'.$v['nmUsulan'].'</td>

                            <td style="width:'.$fnilai.' text-align:center;">'.$this->_uang($v['vol']).'</td>
                            <td style="width:'.$fnilai.' text-align:center;">'.$v['sat'].'</td>
                            <td style="width:'.$fnilai.' text-align:center;">'.$this->_uang($v['nilai']).'</td>
                            <td style="width:'.$fnilai.' text-align:center;">'.$this->_uang($v['nilai']*$v['vol']).'</td>

                            <td style="width:'.$fnilai.' text-align:center;">
                                '.$this->_uang($v['volx']).'
                            </td>
                            <td style="width:'.$fnilai.' text-align:center;">
                                '.$v['satx'].'
                            </td>
                            <td style="width:'.$fnilai.' text-align:center;">
                                '.$this->_uang($v['nilaix']).'
                            </td>
                            <td style="width:'.$fnilai.' text-align:center;">
                                '.$this->_uang($v['nilaix']*$v['volx']).'
                            </td>

                            <td style="width:'.$fnilai.' text-align:center;">
                                '.$v['keterangan'].'
                            </td>
                            <td style="width:'.$fend.' text-align:center;">
                                '.$v['keteranganx'].'
                            </td>
                        </tr>';
                        $no++;
            }
            return $fdata.='</tbody>
            </table>';
        }
        function _lstruktur($data){
            $w1="75%;";
            $w2="10%;";
            $w3="15%;";

            $fno="60px";
            $fwusulan="160px; ";
            $fnilai="79px; text-align:center;";
            $no=1;

            $fdata='
                <table cellspacing="0" cellpadding="1" border="1" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:'.$fno.'; text-align:center;">no</th>
                        <th style="width:'.$fwusulan.' text-align:center;">Uraian</th>
                        <th style="width:'.$fnilai.' ">Pagu Sebelum</th>
                        <th style="width:'.$fnilai.' ">Pagu Sesudah</th>
                        <th style="width:'.$fnilai.' ">+ | -</th>
                        <th style="width:'.$fnilai.' ">Persentase</th>
                    </tr>
                </thead>
                <tbody>
            ';
            $fkdSub1=null;
            $fkdSub2=null;
            $fkdSub3=null;
            $fkdSub4=null;
            $fkdSub5=null;
            $fkdSub6=null;
            $fkdSub7=null;
            $fkdEnd=null;
            foreach ($data as $key => $v) {
                if($fkdSub1!=$v['kdSub1'] && $v['kdSub1']!=null){
                    $fkdSub1=$v['kdSub1'];
                    $fkdEnd=$v['kdSub1'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu1'],$v['pagu11']);
                    // _.dusulan[i].subSelected=$v['nmSub1'];
                    $fstyle="";
                    if($v['selected1']==1 && $v['pagu1']!=$v['pagu11']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub1'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub1'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu1']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu11']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
                if($fkdSub2!=$v['kdSub2'] && $v['kdSub2']!=null){
                    $fkdSub2=$v['kdSub2'];
                    $fkdEnd=$v['kdSub2'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu2'],$v['pagu21']);
                    // _.dusulan[i].subSelected=$v['nmSub2'];
                    $fstyle="";
                    if($v['selected2']==1 && $v['pagu2']!=$v['pagu21']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub2'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub2'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu2']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu21']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
                if($fkdSub3!=$v['kdSub3'] && $v['kdSub3']!=null){
                    $fkdSub3=$v['kdSub3'];
                    $fkdEnd=$v['kdSub3'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu3'],$v['pagu31']);
                    // _.dusulan[i].subSelected=$v['nmSub3'];
                    $fstyle="";
                    if($v['selected3']==1 && $v['pagu3']!=$v['pagu31']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub3'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub3'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu3']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu31']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
                if($fkdSub4!=$v['kdSub4'] && $v['kdSub4']!=null){
                    $fkdSub4=$v['kdSub4'];
                    $fkdEnd=$v['kdSub4'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu4'],$v['pagu41']);
                    // _.dusulan[i].subSelected=$v['nmSub4'];
                    $fstyle="";
                    if($v['selected4']==1 && $v['pagu4']!=$v['pagu41']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub4'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub4'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu4']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu41']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
                if($fkdSub5!=$v['kdSub5'] && $v['kdSub5']!=null){
                    $fkdSub5=$v['kdSub5'];
                    $fkdEnd=$v['kdSub5'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu5'],$v['pagu51']);
                    // _.dusulan[i].subSelected=$v['nmSub5'];
                    $fstyle="";
                    if($v['selected5']==1 && $v['pagu5']!=$v['pagu51']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub5'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub5'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu5']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu51']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
                if($fkdSub6!=$v['kdSub6'] && $v['kdSub6']!=null){
                    $fkdSub6=$v['kdSub6'];
                    $fkdEnd=$v['kdSub6'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu6'],$v['pagu61']);
                    // _.dusulan[i].subSelected=$v['nmSub6'];
                    $fstyle="";
                    if($v['selected6']==1 && $v['pagu6']!=$v['pagu61']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub6'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub6'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu6']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu61']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
                if($fkdSub7!=$v['kdSub7'] && $v['kdSub7']!=null){
                    $fkdSub7=$v['kdSub7'];
                    $fkdEnd=$v['kdSub7'];
                    $dpersen=$this->_hitungPersenStruktur($v['pagu7'],$v['pagu71']);
                    // _.dusulan[i].subSelected=$v['nmSub7'];
                    $fstyle="";
                    if($v['selected7']==1 && $v['pagu7']!=$v['pagu71']){
                        if($dpersen['next']){
                            $fstyle="background-color: #108000;color: #fff;";
                        }else{
                            $fstyle="background-color: #8d0909;color: #fff;";
                        }
                    }
                    $fdata.='
                    <tr style="padding:5px; '.$fstyle.'">
                        <td style="width:'.$fno.';">'.$v['kdSub7'].'</td>
                        <td style="width:'.$fwusulan.'">'.$v['nmSub7'].'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu7']).'</td>
                        <td style="width:'.$fnilai.'">'.$this->_uang($v['pagu71']).'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['nilai'].'</td>
                        <td style="width:'.$fnilai.'">'.$dpersen['persen'].'</td>
                    </tr>';
                }
            }
            return $fdata.='</tbody>
            </table>';
        }
        function _hitungPersenStruktur($pagu,$paguNext){
            $fmin=0;
            $fnext=true; //$pagu next lebih tinggi
            if($paguNext>=$pagu){
                $fmin=$paguNext-$pagu;
            }else{
                $fnext=false;
                $fmin=$pagu-$paguNext;
            }

            $fpersenView="0 %";
            if($fmin>0){
                if($pagu!=0){
                    $fpersenView=number_format((float)(($fmin*100)/$pagu),2, '.', '')." %";
                }
            }
            if($fmin==0){
                // $fhasilView="0";
                // $fpersenView=" 0 %";
                $fhasilView="";
                $fpersenView="";
            }else{
                if($fnext){
                    $fhasilView=" ".$this->_uang($fmin)." ";
                }else{
                    $fhasilView="( - ".$this->_uang($fmin)." )";
                    $tams=explode("-",$fpersenView);
                    $fpersenView="(".$fpersenView.")";
                    if(count($tams)==1){
                        $fpersenView="( - ".$tams[0].")";
                    }
                    
                }
            }
            return [
                "nilai"=>$fhasilView,
                "persen"=>$fpersenView,
                "next"=>$fnext
            ];
        }
        function _lpaguDinas($data){
            $w1="75%;";
            $w2="12.3%; text-align:center;";
            $w3="24%;";
            $fno="3%";
            
            $fwusulan="160px; ";
            $fnilai="79px;";
            $no=1;

            $fdata='
                <table cellspacing="0" cellpadding="1" border="1" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:'.$fno.'; text-align:center;">no</th>
                        <th style="width:'.$w3.' text-align:center;">Nama</th>
                        <th style="width:'.$w3.' text-align:center;">Kepala Dinas</th>
                        <th style="width:'.$w2.' text-align:center;">Pagu Sebelum</th>
                        <th style="width:'.$w2.' ">Pagu Sesudah</th>
                        <th style="width:'.$w2.' ">+ | -</th>
                        <th style="width:'.$w2.' ">Persentase</th>
                    </tr>
                </thead>
                <tbody>
            ';
            foreach ($data as $key => $v) {
                $dpersen=$this->_hitungPersenStruktur($v['pagu'],$v['paguR']);
                $fstyle="background-color: #8d0909;color: #fff;";
                if($dpersen['next']){
                    $fstyle="background-color: #108000;color: #fff;";
                }
                if(empty($v['paguR']) || $v['paguR']==0 || strlen($v['paguR'])==0){
                    $fstyle="";
                    $dpersen['nilai']="";
                    $dpersen['persen']="";
                }

                $fdata.='
                <tr style="padding:5px; '.$fstyle.'">
                    <td style="width:'.$fno.';">'.$no.'</td>
                    <td style="width:'.$w3.'">'.$v['nmDinas'].'</td>
                    <td style="width:'.$w3.'">'.$v['kadis'].'</td>
                    <td style="width:'.$w2.'">'.$this->_uang($v['pagu']).'</td>
                    <td style="width:'.$w2.'">'.$this->_uang($v['paguR']).'</td>
                    <td style="width:'.$w2.'">'.$dpersen['nilai'].'</td>
                    <td style="width:'.$w2.'">'.$dpersen['persen'].'</td>
                </tr>';
                $no++;
            }
            return $fdata.='</tbody>
            </table>';
        }
        function _ldisposisi($data){
            $fno="3%";
            $full="97%; ";
            $w1="32%;";
            $w11="16%;";
            $w2="34%;";
            
            $sc2="text-align:left;"; //style col 2
            $fnilai="79px; text-align:center;";
            $no=1;
            $fdata='
                <table cellspacing="0" cellpadding="1" border="1" style="width:100%;">
                <tbody>
            ';
            $iconSub="*";
            foreach ($data as $key => $v) {
                $row=2;
                if(strlen($v['files2'])>0){
                    $row=3;
                }
                if(strlen($v['files'])>0){
                    $fdata.='
                    <tr style="padding:5px;">
                        <td style="width:'.$fno.'; text-align:center;" rowspan="2">'.$no.'</td>
                        <td style="width:'.$w1.'   text-align:center;" colspan="2"><b>Nama Dinas</b></td>
                        <td style="width:'.$w1.'   text-align:center;" colspan="2"><b>Usulan</b></td>
                        <td style="width:'.$w2.' text-align:center;">File Disposisi</td>
                    </tr>
                    <tr style="padding:5px;">
                        <td style="width:'.$w1.$sc2.'" colspan="2">  '.$v['nmDinas'].'</td>
                        <td style="width:'.$w1.$sc2.'" colspan="2"> '.$v['nmUsulan'].'</td>
                        <td style="width:'.$w2.' text-align:center;" rowspan="3">
                            <img src="'.$this->_getAssetUrl()."upload/fileDisposisi/".$v['files'].'" alt="2G18" width="60px;"> 
                        </td>
                    </tr>
                    <tr style="padding:5px;">
                        <td style="width:'.$fno.'; text-align:center;" rowspan="2">'.$iconSub.'</td>
                        <td style="width:'.$w11.' text-align:center;">Tanggal Terima</td>
                        <td style="width:'.$w11.' text-align:center;">Tgl Penyelsaian</td>
                        <td style="width:'.$w11.' text-align:center;">Ditujukan Kepada</td>
                        <td style="width:'.$w11.' text-align:center;">Isi Disposisi</td>
                    </tr>
                    <tr style="padding:5px;">
                        <td style="width:'.$w11.' text-align:left;">  '.$v['tglTerima'].'</td>
                        <td style="width:'.$w11.' text-align:left;">  '.$v['tglPenyelsaian'].'</td>
                        <td style="width:'.$w11.' text-align:left;">  '.$v['nmTujuanBupati'].'</td>
                        <td style="width:'.$w11.' text-align:left;">  '.$v['isi'].'</td>
                    </tr>';

                    if(strlen($v['files1'])>0){
                        $fdata.='
                            <tr style="padding:5px;">
                                <td style="width:'.$fno.'; text-align:center;" rowspan="2">'.$iconSub.'</td>
                                <td style="width:'.$w11.' text-align:center;">Tanggal Terima</td>
                                <td style="width:'.$w11.' text-align:center;">Tgl Penyelsaian</td>
                                <td style="width:'.$w11.' text-align:center;">Ditujukan Kepada</td>
                                <td style="width:'.$w11.' text-align:center;">Isi Disposisi</td>
                                <td style="width:'.$w2.' text-align:center;" rowspan="2">
                                    <img src="'.$this->_getAssetUrl()."upload/fileDisposisi/".$v['files1'].'" alt="2G18" width="60px;"> 
                                </td>
                            </tr>
                            <tr style="padding:5px;">
                                <td style="width:'.$w11.' text-align:left;">  '.$v['tglTerima1'].'</td>
                                <td style="width:'.$w11.' text-align:left;">  '.$v['tglPenyelsaian1'].'</td>
                                <td style="width:'.$w11.' text-align:left;">  '.$v['nmTujuanDisposisi1'].'</td>
                                <td style="width:'.$w11.' text-align:left;">  '.$v['isi1'].'</td>
                            </tr>';
    
    
                        if(strlen($v['files2'])>0){ // karena harus ada file1
                            $fdata.='
                            <tr style="padding:5px;">
                                <td style="width:'.$fno.'; text-align:center;" rowspan="2">'.$iconSub.'</td>
                                <td style="width:'.$w11.' text-align:center;">Tanggal Terima</td>
                                <td style="width:'.$w11.' text-align:center;">Tgl Penyelsaian</td>
                                <td style="width:'.$w11.' text-align:center;">Ditujukan Kepada</td>
                                <td style="width:'.$w11.' text-align:center;">Isi Disposisi</td>
                                <td style="width:'.$w2.' text-align:center;" rowspan="2">
                                    <img src="'.$this->_getAssetUrl()."upload/fileDisposisi/".$v['files2'].'"  alt="2G18" width="60px;"> 
                                </td>
                            </tr>
                            <tr style="padding:5px;">
                                <td style="width:'.$w11.' text-align:left;">  '.$v['tglTerima2'].'</td>
                                <td style="width:'.$w11.' text-align:left;">  '.$v['tglPenyelsaian2'].'</td>
                                <td style="width:'.$w11.' text-align:left;">  '.$v['nmTujuanDisposisi2'].'</td>
                                <td style="width:'.$w11.' text-align:left;">  '.$v['isi2'].'</td>
                            </tr>';
                        }
                    }
                }
                

                
                $no+=1;
            }
            return $fdata.='</tbody>
            </table>';
        }
        function _ldaftarHadir($data){
            $fno="3%";
            $full="97%; ";
            $w1="28%;";
            $w11="16%;";
            $w2="34%;";
            
            $sc2="text-align:left;"; //style col 2
            $fnilai="79px; text-align:center;";
            $no=1;
            $fdata='
                <table cellspacing="0" cellpadding="1" border="1" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:'.$fno.'; text-align:center;"><b>no</b></th>
                        <th style="width:'.$w2.' text-align:center;"><b>Perangkat Daerah</b></th>
                        <th style="width:'.$w1.' text-align:center;"><b>Jabatan</b></th>
                        <th style="width:'.$w2.' text-align:center;"><b>Nama</b></th>
                    </tr>
                </thead>
                <tbody>
            ';
            $iconSub="*";
            foreach ($data as $key => $v) {
                $fdata.='
                    <tr style="padding:5px;">
                        <td style="width:'.$fno.'; text-align:center;">'.$no.'</td>
                        <td style="width:'.$w2.'   text-align:left;">  '.$v['nmDinas'].'</td>
                        <td style="width:'.$w1.'   text-align:left;">  '.$v['nmJabatan'].'</td>
                        <td style="width:'.$w2.' text-align:left;">  '.$v['nmMember'].'</td>
                    </tr>';
                $no+=1;
            }
            return $fdata.='</tbody>
            </table>';
        }
        function _ldokumentasi($data){
            $fno="3%";
            $full="97%; ";
            $w1="28%;";
            $w11="16%;";
            $w2="34%;";
            $wx2="47%;";
            
            $sc2="text-align:left;"; //style col 2
            $fnilai="79px; text-align:center;";
            $no=1;
            $fdata='
                <table cellspacing="0" cellpadding="1" border="1" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:100%; text-align:center;" colspan="4"><b>FILE DOKUMENTASI</b></th>
                    </tr>
                </thead>
                <tbody>
            ';
            $iconSub="*";
            $no=1;
            $nox=1;
            for ($i=0;$i<count($data);$i++) {
                $td1=' <img src="'.$this->_getAssetUrl()."upload/dokumentasi/".$data[$i]['files'].'" width="60px;"> ';
                $td2='';
                $nox='';
                if(count($data)!=($i+1) && strlen($data[$i+1]['files'])>0){
                    $td2=' <img src="'.$this->_getAssetUrl()."upload/dokumentasi/".$data[$i+1]['files'].'" width="60px;"> ';
                    $nox=$no+1;
                    $i++;
                }
                $fdata.='
                    <tr style="padding:5px;">
                        <td style="width:'.$fno.'; text-align:center;">'.$no.'</td>
                        <td style="width:'.$wx2.'   text-align:left;">'.$td1.'</td>
                        <td style="width:'.$fno.'; text-align:center;">'.$nox.'</td>
                        <td style="width:'.$wx2.'   text-align:left;">'.$td2.'</td>
                    </tr>';
                $no+=1;
            }
            return $fdata.='</tbody>
            </table>';
        }
        function _formatNotulen($noPembahasan){
            return '
            <div style="text-align: center; margin-top:0px; padding:0px;">
                <p style="text-align: center;">
                    <strong>
                        BERITA ACARA RAPAT <br>
                        TIM ANGGARAN PEMERINTAH DAERAH (TAPD) KE-'.$noPembahasan.' <br>
                        KABUPATEN SUMBAWA BARAT
                    </strong>
                </p>
                <p><strong>&nbsp;</strong></p>
                <p style="text-align: left;">&nbsp;&nbsp;&nbsp;
                Pada hari ini Kamis Tanggal Tujug Bulan Agustus Tahun Dua Ribu Dua Puluh Satu (07-08-2021) Pukul 13.30 Wita bertempat di Ruang Sidang I Sekretariat Daerah Kabupaten Sumbawa Barat telah dilaksanakan Rapat Koordinasi TAPD untuk Pembahasan Program/Kegiatan Tahun Anggaran 2021 yang dipimpin oleh <strong>Ketua TAPD Kabupaten Sumbawa Barat</strong> dan dihadari oleh:</p>
                <table style="border-collapse: collapse; width: 70%;" border="0">
                        <tbody>
                            <tr style="height: 15px;">
                                <td style="width: 4%; ">1.</td>
                                <td style="width: 35%;  text-align: left;">Tim Anggaran Pemerintah Daerah</td>
                                <td style="width: 17%;  text-align: left;">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>
                            </tr>
                                <tr style="height: 15px;">
                                <td style="width: 4%; ">2.</td>
                                <td style="width: 35%;  text-align: left;">Tim Teknis TAPD</td>
                                <td style="width: 17%;  text-align: left;">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>
                            </tr>
                                <tr style="height: 15px;">
                                <td style="width: 4%; ">3.</td>
                                <td style="width: 35%;  text-align: left;">Tim Sekretariat TAPD</td>
                                <td style="width: 17%;  text-align: left;">:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Orang</td>
                            </tr>
                        </tbody>
                    </table>
                <p style="text-align:left;">sesuai daftar hadir terlampir dengan keputusan sebagai berikut:</p>
                <ol style="text-align:left;">
                    <li>&nbsp;</li>
                </ol>
                <p>&nbsp;</p>
                <p style="text-align:left;">Demikian berita acara rapat ini dibuat pada hari, tanggal, jam dan tempat tersebut di atas dengan sebenar-benarnya.</p>
                <table style="border-collapse: collapse; width: 100%; height: 196px;" border="0">
                    <tbody>
                        <tr style="height: 96px;">
                            <td style="width: 71.9771%; height: 96px;">&nbsp;</td>
                            <td style="width: 28.023%; height: 96px;">
                            <p style="text-align: center;">Taliwang, 15 April 2021<br />Penjabat Sekretaris Daerah<br />Kabupaten Sumbawa Barat<br />selaku KetuaTAPD,</p>
                            </td>
                        </tr>
                        <tr style="height: 12px;">
                            <td style="width: 71.9771%; height: 12px;">&nbsp;</td>
                            <td style="width: 28.023%; height: 12px;">&nbsp;</td>
                        </tr>
                        <tr style="height: 88px;">
                            <td style="width: 71.9771%; height: 88px;">&nbsp;</td>
                            <td style="width: 28.023%; height: 88px;">
                                <p style="text-align: center;">
                                    <strong>AMAR NURMANSYAH, ST., M.Si<br /></strong>
                                    Pembina Tingkat I, IV/b
                                    <br>NIP. 19751228 200501 1 006
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ';
        }
}
?>