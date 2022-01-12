<?php
    include 'Html.php';
    class QData extends Html{
        function _dMember(){
            // c.kdJabatan!=6 and 
            return "SELECT 
                        a.kdMember1 as kdMember,a.nmMember, a.kdJabatan, a.kdDinas, 
                        a.username, a.password, a.ins,
                        b.nmDinas,
                        c.nmJabatan
                    FROM member a
                    JOIN dinas b ON
                        a.kdDinas=b.kdDinas
                    JOIN jabatan c ON
                        a.kdJabatan=c.kdJabatan1
                    where a.aktif=1

                    group by a.kdDinas,a.kdMember1
                ";
        }
        function _dMemberAbsen($pembahasan,$perkada,$tahun,$where){
            // c.kdJabatan!=6 and 
            return "SELECT 
                        a.kdMember1 as kdMember,a.nmMember, a.kdJabatan, a.kdDinas, 
                        a.username, a.password, a.ins,
                        b.nmDinas,
                        c.nmJabatan,
                        (
                            select  case 
                                    when char_length(d.kdMember)>0 then true
                                    else null
                                end as cheked
                            from absensi d where 
                            d.kdMember=a.kdMember1 and
                            d.noPembahasan=".$this->_checkStringQuery($pembahasan)."
                            and d.perkada=".$this->_checkStringQuery($perkada)."
                            and d.tahun=".$this->_checkStringQuery($tahun)."
                        ) as checked
                    FROM member a
                    JOIN dinas b ON
                        a.kdDinas=b.kdDinas
                    JOIN jabatan c ON
                        a.kdJabatan=c.kdJabatan1
                    LEFT join absensi d ON
                        a.kdMember1=d.kdMember
                    ".$where."
                    group by a.kdMember
                    order by c.kdJabatan,b.nmDinas,a.nmMember";
        }
        function _cbStatus(){
            return array([
                "value"=>"-",
                "valueName"=>"PILIHAN",
            ],[
                "value"=>"DISETUJUI",
                "valueName"=>"DISETUJUI",
            ],[
                "value"=>"DIKAJI LEBIH LANJUT",
                "valueName"=>"DIKAJI LEBIH LANJUT",
            ],[
                "value"=>"DITOLAK",
                "valueName"=>"DITOLAK",
            ]);
        }
        function _cbStatusPendanaan(){
            return array([
                "value"=>"-",
                "valueName"=>"PILIHAN",
            ],[
                "value"=>"PERGESERAN ANGGARAN",
                "valueName"=>"PERGESERAN ANGGARAN",
            ],[
                "value"=>"ANGGARAN BARU",
                "valueName"=>"ANGGARAN BARU",
            ]);
        }
        function _cbLaporan(){
            return array([
                "value"=>"-",
                "valueName"=>"PILIHAN",
            ],[
                "value"=>"1",
                "valueName"=>"ALL LAPORAN",
            ],[
                "value"=>"2",
                "valueName"=>"USULAN",
            ],[
                "value"=>"3",
                "valueName"=>"DISPOSISI",
            ],[
                "value"=>"4",
                "valueName"=>"STRUKTUR",
            ],[
                "value"=>"5",
                "valueName"=>"NOTULEN",
            ],[
                "value"=>"6",
                "valueName"=>"PAGU DINAS",
            ]);
        }
        function _ddinas($perkada,$tahun,$where){
            return "SELECT kdDinas, nmDinas, kadis, nip, pagu,perkada,tahun FROM dinas where perkada='".$perkada."' and tahun='".$tahun."' ".$where;
        }
        function _cbDinas($where){
            return "SELECT kdDinas as value, nmDinas as valueName FROM dinas ".$where." GROUP by kdDinas";
        }
        function _cbJabatan(){
            return "SELECT kdJabatan1 as value, nmJabatan as valueName FROM jabatan where kdJabatan!=6";
        }
        function _dmemberSetingkat($tingkat,$kdNotif){
            return "select kdMember1,".$this->_checkStringQuery($kdNotif)." as kdNotif
            FROM member a 
            JOIN jabatan b ON
                a.kdJabatan=b.kdJabatan1
            WHERE b.setingkat>=".$this->_checkStringQuery($tingkat)."";
        }
        

        function _durusan($where){
            return "select kdUrusan,nmUrusan from durusan ".$where." order by kdUrusan asc";
        }
        function _dbidang($where){
            return "select 
                        a.kdUrusan,a.nmUrusan,
                        b.kdBidang,b.nmBidang
                    from durusan a 
                    join dbidang b on
                        a.kdUrusan=b.kdUrusan and
                        a.taUrusan=b.taBidang and
                        a.perkadaU=b.perkadaB
                    ".$where."
                    order by a.kdUrusan,b.kdBidang asc
            ";
        }
        function _dprogram($all,$where){
            $ftam="";
            if($all){
                $ftam=",
                        c.kdUrusan,c.nmUrusan";
            }
            return "select 
                        a.kdProgram,a.nmProgram,
                        b.kdBidang,b.nmBidang
                        ".$ftam."
                    from dprogram a 
                    join dbidang b on
                        a.kdBidang=b.kdBidang and
                        a.taProgram=b.taBidang and
                        a.perkadaP=b.perkadaB
                    join durusan c on
                        c.kdUrusan=b.kdUrusan and
                        c.taUrusan=b.taBidang and
                        c.perkadaU=b.perkadaB
                    ".$where."
                    order by b.kdBidang,a.kdProgram asc
            ";
        }
        function _dkegiatan($all,$where){
            $ftam="";
            if($all){
                $ftam="c.kdBidang,c.nmBidang,
                        d.kdUrusan,d.nmUrusan,";
            }
            return "select 
                        a.kdProgram,a.nmProgram,
                        ".$ftam."
                        b.kdKegiatan,b.nmKegiatan
                    from dprogram a 
                    join dkegiatan b on
                        a.kdProgram=b.kdProgram and
                        a.taProgram=b.taKegiatan and
                        a.perkadaP=b.perkadaK
                    join dbidang c on
                        c.kdBidang=a.kdBidang and
                        a.taProgram=c.taBidang and
                        a.perkadaP=c.perkadaB
                    join durusan d on
                        c.kdUrusan=d.kdUrusan and
                        d.taUrusan=c.taBidang and
                        d.perkadaU=c.perkadaB
                    ".$where."
                    order by c.kdUrusan,c.kdBidang,a.kdProgram,b.kdKegiatan asc
            ";
        }
        function _dsub($all,$where){
            $ftam="";
            if($all){
                $ftam=",
                        c.kdProgram,c.nmProgram,
                        d.kdBidang,d.nmBidang,
                        e.kdUrusan,e.nmUrusan";
            }
            return "select 
                        a.kdKegiatan,a.nmKegiatan,
                        b.kdSub,b.nmSub,b.kdDinas
                        ".$ftam."
                    from dkegiatan a 
                    join dsub b on
                        a.kdKegiatan=b.kdKegiatan and
                        b.taSub=a.taKegiatan and
                        b.perkadaS=a.perkadaK
                    join dprogram c on
                        c.kdProgram=a.kdProgram and
                        c.taProgram=a.taKegiatan and
                        c.perkadaP=a.perkadaK
                    join dbidang d on
                        c.kdBidang=d.kdBidang and
                        c.taProgram=d.taBidang and
                        c.perkadaP=d.perkadaB
                    join durusan e on
                        e.kdUrusan=d.kdUrusan and
                        e.taUrusan=d.taBidang and
                        e.perkadaU=d.perkadaB
                    ".$where."
                    GROUP BY b.kdSub
                    order by a.kdProgram,b.kdKegiatan asc
            ";
        }
        function _cbSub($all,$where){
            $ftam="";
            if($all){
                $ftam=",
                        c.kdProgram,c.nmProgram,
                        d.kdBidang,d.nmBidang,
                        e.kdUrusan,e.nmUrusan";
            }
            return "select 
                        a.kdKegiatan,a.nmKegiatan,
                        b.kdSub as value,b.nmSub as valueName
                        ".$ftam."
                    from dkegiatan a 
                    join dsub b on
                        a.kdKegiatan=b.kdKegiatan and
                        b.taSub=a.taKegiatan and
                        b.perkadaS=a.perkadaK
                    join dprogram c on
                        a.kdProgram=a.kdProgram and
                        c.taProgram=a.taKegiatan and
                        c.perkadaP=a.perkadaK
                    join dbidang d on
                        c.kdBidang=d.kdBidang and
                        c.taProgram=d.taBidang and
                        c.perkadaP=d.perkadaB
                    join durusan e on
                        e.kdUrusan=d.kdUrusan and
                        e.taUrusan=d.taBidang and
                        e.perkadaU=d.perkadaB
                    ".$where."
                    GROUP BY b.kdSub
                    order by a.kdProgram,b.kdKegiatan asc
            ";
        }


        function _dsub1($noPembahasan,$tahun,$where1){
            $where=" where noPembahasan1=".$noPembahasan." and date1='".$tahun."' ".$where1;
            return "SELECT 
                        kdSub1, nmSub1,pagu1,noPembahasan1,date1,perkada1
                    FROM apbdsub1 
                    ".$where." 
                    order by kdSub1 asc";
        }
        function _cbSub1($noPembahasan,$tahun,$where1){
            $where=" where noPembahasan1=".$noPembahasan." and date1='".$tahun."' ".$where1;
            return "SELECT kdSub1,kdSub1 as value, nmSub1 as valueName FROM apbdsub1 ".$where." group by kdSub1 order by kdSub1 asc";
        }
        function _dsub2($noPembahasan,$tahun,$where1){
            $where=" where b.noPembahasan2=".$noPembahasan." and b.date2='".$tahun."' ";
            return "select 
                        a.kdSub1,a.nmSub1,pagu1,noPembahasan1,date1,perkada1,
                        b.kdSub2,b.nmSub2,pagu2,noPembahasan2,date2,perkada2
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                        and b.perkada2=a.perkada1
                    ".$where."
                    order by a.kdSub1,b.kdSub2 asc
            ";
        }
        function _cbSub2($noPembahasan,$tahun,$where1){
            $where=" where b.noPembahasan2=".$noPembahasan." and b.date2=".$tahun." ".$where1;
            return "select 
                        a.kdSub1,
                        b.kdSub2 as value,b.nmSub2 as valueName
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                    ".$where."
                    order by a.kdSub1,b.kdSub2 asc
            ";
        }
        function _dsub3($all,$noPembahasan,$tahun,$where1){
            $where=" where c.noPembahasan3=".$noPembahasan." and c.date3=".$tahun." ".$where1;
            $ftam="";
            if($all){
                $ftam="a.kdSub1,a.nmSub1,pagu1,perkada1,";
            }
            return "select ".$ftam."
                        b.kdSub2,b.nmSub2,pagu2,noPembahasan2,date2,perkada2,
                        c.kdSub3,c.nmSub3,pagu3,noPembahasan3,date3,perkada3
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                        and b.perkada2=a.perkada1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                        and b.perkada2=c.perkada3
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3 asc
            ";
        }
        function _cbSub3($noPembahasan,$tahun,$where1){
            $where=" where c.noPembahasan3=".$noPembahasan." and c.date3=".$tahun." ".$where1;
            return "select 
                        a.kdSub1,
                        c.kdSub3 as value,c.nmSub3 as valueName
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3 asc
            ";
        }
        function _dsub4($all,$noPembahasan,$tahun,$where1){
            $where=" where d.noPembahasan4=".$noPembahasan." and d.date4=".$tahun." ".$where1;
            $ftam="";
            if($all){
                $ftam="a.kdSub1,a.nmSub1,pagu1,perkada1,
                        b.kdSub2,b.nmSub2,pagu2,perkada2,";
            }
            return "select ".$ftam."
                        c.kdSub3,c.nmSub3,pagu3,noPembahasan3,date3,perkada3,
                        d.kdSub4,d.nmSub4,pagu4,noPembahasan4,date4,perkada4
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                        and b.perkada2=a.perkada1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                        and b.perkada2=c.perkada3
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                        and d.perkada4=c.perkada3
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4 asc
            ";
        }
        function _cbSub4($noPembahasan,$tahun,$where1){
            $where=" where d.noPembahasan4=".$noPembahasan." and d.date4=".$tahun." ".$where1;
            return "select 
                        a.kdSub1,
                        d.kdSub4 as value,d.nmSub4 as valueName
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4 asc
            ";
        }
        function _dsub5($all,$noPembahasan,$tahun,$where1){
            $where=" where e.noPembahasan5=".$noPembahasan." and e.date5=".$tahun." ".$where1;
            $ftam="";
            if($all){
                $ftam="a.kdSub1,a.nmSub1,pagu1,perkada1,
                        b.kdSub2,b.nmSub2,pagu2,perkada2,
                        c.kdSub3,c.nmSub3,pagu3,perkada3,";
            }
            return "select 
                        ".$ftam."
                        d.kdSub4,d.nmSub4,pagu4,noPembahasan4,date4,perkada4,
                        e.kdSub5,e.nmSub5,pagu5,noPembahasan5,date5,perkada5
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                        and b.perkada2=a.perkada1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                        and b.perkada2=c.perkada3
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                        and d.perkada4=c.perkada3
                    join apbdsub5 e on
                        d.kdSub4=e.kdSub4
                        and e.noPembahasan5=d.noPembahasan4
                        and e.date5=d.date4
                        and d.perkada4=e.perkada5
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5 asc
            ";
        }
        function _cbSub5($noPembahasan,$tahun,$where1){
            $where=" where e.noPembahasan5=".$noPembahasan." and e.date5=".$tahun." ".$where1;
            return "select 
                        a.kdSub1,
                        e.kdSub5 as value,e.nmSub5 as valueName
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                    join apbdsub5 e on
                        d.kdSub4=e.kdSub4
                        and e.noPembahasan5=d.noPembahasan4
                        and e.date5=d.date4
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5 asc
            ";
        }
        function _dsub6($all,$noPembahasan,$tahun,$where1){
            $where=" where f.noPembahasan6=".$noPembahasan." and f.date6=".$tahun." ".$where1;
            $ftam="";
            if($all){
                $ftam="a.kdSub1,a.nmSub1,pagu1,perkada1,
                        b.kdSub2,b.nmSub2,pagu2,perkada2,
                        c.kdSub3,c.nmSub3,pagu3,perkada3,
                        d.kdSub4,d.nmSub4,pagu4,perkada4,";
            }
            return "select 
                        ".$ftam."
                        e.kdSub5,e.nmSub5,pagu5,noPembahasan5,date5,perkada5,
                        f.kdSub6,f.nmSub6,pagu6,noPembahasan6,date6,perkada6
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                        and b.perkada2=a.perkada1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                        and c.perkada3=b.perkada2
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                        and d.perkada4=c.perkada3
                    join apbdsub5 e on
                        d.kdSub4=e.kdSub4
                        and e.noPembahasan5=d.noPembahasan4
                        and e.date5=d.date4
                        and d.perkada4=e.perkada5
                    join apbdsub6 f on
                        f.kdSub5=e.kdSub5
                        and f.noPembahasan6=e.noPembahasan5
                        and f.date6=e.date5
                        and f.perkada6=e.perkada5
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5,f.kdSub6 asc
            ";
        }
        function _cbSub6($noPembahasan,$tahun,$where1){
            $where=" where f.noPembahasan6=".$noPembahasan." and f.date6=".$tahun." ".$where1;
            return "select 
                        a.kdSub1,
                        f.kdSub6 as value,f.nmSub6 as valueName
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                    join apbdsub5 e on
                        d.kdSub4=e.kdSub4
                        and e.noPembahasan5=d.noPembahasan4
                        and e.date5=d.date4
                    join apbdsub6 f on
                        f.kdSub5=e.kdSub5
                        and f.noPembahasan6=e.noPembahasan5
                        and f.date6=e.date5
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5,f.kdSub6 asc
            ";
        }
        function _dsub7($all,$noPembahasan,$tahun,$where1){
            $where=" where g.noPembahasan7=".$noPembahasan." and g.date7=".$tahun." ".$where1;
            $ftam="";
            if($all){
                $ftam="a.kdSub1,a.nmSub1,pagu1,perkada1,
                        b.kdSub2,b.nmSub2,pagu2,perkada2,
                        c.kdSub3,c.nmSub3,pagu3,perkada3,
                        d.kdSub4,d.nmSub4,pagu4,perkada4,
                        e.kdSub5,e.nmSub5,pagu5,perkada5,";
            }
            return "select 
                        ".$ftam."
                        f.kdSub6,f.nmSub6,pagu6,noPembahasan6,date6,perkada6,
                        g.kdSub7,g.nmSub7,pagu7,noPembahasan7,date7,perkada7
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                        and b.perkada2=a.perkada1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                        and c.perkada3=b.perkada2
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                        and d.perkada4=c.perkada3
                    join apbdsub5 e on
                        d.kdSub4=e.kdSub4
                        and e.noPembahasan5=d.noPembahasan4
                        and e.date5=d.date4
                        and d.perkada4=e.perkada5
                    join apbdsub6 f on
                        f.kdSub5=e.kdSub5
                        and f.noPembahasan6=e.noPembahasan5
                        and f.date6=e.date5
                        and f.perkada6=e.perkada5
                    join apbdsub7 g on
                        f.kdSub6=g.kdSub6
                        and g.noPembahasan7=f.noPembahasan6
                        and g.date7=f.date6
                        and f.perkada6=g.perkada7
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5,f.kdSub6,g.kdSub7 asc
            ";
        }
        function _cbSub7($noPembahasan,$tahun,$where1){
            $where=" where g.noPembahasan7=".$noPembahasan." and g.date7=".$tahun." ".$where1;
            return "select 
                        a.kdSub1,
                        g.kdSub7 as value,g.nmSub7 as valueName
                    from apbdsub1 a 
                    join apbdsub2 b on
                        a.kdSub1=b.kdSub1
                        and b.noPembahasan2=a.noPembahasan1
                        and b.date2=a.date1
                    join apbdsub3 c on
                        c.kdSub2=b.kdSub2
                        and c.noPembahasan3=b.noPembahasan2
                        and c.date3=b.date2
                    join apbdsub4 d on
                        d.kdSub3=c.kdSub3
                        and d.noPembahasan4=c.noPembahasan3
                        and d.date4=c.date3
                    join apbdsub5 e on
                        d.kdSub4=e.kdSub4
                        and e.noPembahasan5=d.noPembahasan4
                        and e.date5=d.date4
                    join apbdsub6 f on
                        f.kdSub5=e.kdSub5
                        and f.noPembahasan6=e.noPembahasan5
                        and f.date6=e.date5
                    join apbdsub7 g on
                        f.kdSub6=g.kdSub6
                        and g.noPembahasan7=f.noPembahasan6
                        and g.date7=f.date6
                    ".$where."
                    order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5,f.kdSub6,g.kdSub7 asc
            ";
        }

        function _noPembahasan(){
            return "select noPembahasan1 as no from apbdsub1 order by noPembahasan1 desc limit 1";
        }
        function _tahunPembahasan($where){
            return "select tahun as value, tahun as valueName from pembahasan ".$where." GROUP BY  tahun";
        }
        function _perkadaPembahasan($where){
            return "select perkada as value, perkada as valueName from pembahasan where ".$where." group by perkada,noPembahasan order by perkada asc";
        }
        function _noPembahasan1($where){ // ini tabel pembahasan
            return "select noPembahasan as value, noPembahasan as valueName from pembahasan where ".$where." order by noPembahasan asc";
        }
        function _dpembahasan($where){
            return "
            SELECT tahun,perkada,noPembahasan,files,finalPerkada FROM pembahasan 
            WHERE finalPerkada!='0' ".$where."
            ORDER BY tahun,perkada,noPembahasan 
            ";
        }

        function _dataUsulan($tambahan){
            return "
                select 
                    a.kdSub1,a.nmSub1,a.selected1,a.pagu1,
                    b.kdSub2,b.nmSub2,b.selected2,b.pagu2,
                    c.kdSub3,c.nmSub3,c.selected3,c.pagu3,
                    d.kdSub4,d.nmSub4,d.selected4,d.pagu4,
                    e.kdSub5,e.nmSub5,e.selected5,e.pagu5,
                    f.kdSub6,f.nmSub6,f.selected6,f.pagu6,
                    g.kdSub7,g.nmSub7,g.selected7,g.pagu7,
                    h.kdUsulan,h.kdSubJenis,h.nmUsulan,h.no,h.date,h.vol,h.sat,h.nilai,h.files,h.status,h.noPembahasan,
                        h.tahun,(h.vol*h.nilai) as total,h.kdMember,h.kdDinas,
                    i.kdSub,i.nmSub
                from apbdsub1 a 
                LEFT join apbdsub2 b on
                    a.kdSub1=b.kdSub1
                    and b.noPembahasan2=a.noPembahasan1
                    and b.perkada2=a.perkada1
                    and b.date2=a.date1
                LEFT join apbdsub3 c on
                    c.kdSub2=b.kdSub2
                    and c.noPembahasan3=b.noPembahasan2
                    and b.perkada2=c.perkada3
                    and c.date3=b.date2
                LEFT join apbdsub4 d on
                    d.kdSub3=c.kdSub3
                    and d.noPembahasan4=c.noPembahasan3
                    and d.perkada4=c.perkada3
                    and d.date4=c.date3
                LEFT join apbdsub5 e on
                    d.kdSub4=e.kdSub4
                    and e.noPembahasan5=d.noPembahasan4
                    and d.perkada4=e.perkada5
                    and e.date5=d.date4
                LEFT join apbdsub6 f on
                    f.kdSub5=e.kdSub5
                    and f.noPembahasan6=e.noPembahasan5
                    and f.perkada6=e.perkada5
                    and f.date6=e.date5
                LEFT join apbdsub7 g on
                    f.kdSub6=g.kdSub6
                    and g.noPembahasan7=f.noPembahasan6
                    and f.perkada6=g.perkada7
                    and g.date7=f.date6
                ".$tambahan."
               
            ";
            // order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5,f.kdSub6,g.kdSub7 asc
        }
        function _getAllDataUsulan($no,$perkada,$tahun,$where){
            $posisi="1";
            $alias="a";
            $q="  SELECT * from ( ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "));
            $posisi="2";
            $alias="b";
            $q.=" UNION ALL ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "));
    
            // return print_r($this->qdata->_log($d1.$d2));
            $posisi="3";
            $alias="c";
            $q.=" UNION ALL ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "));
            $posisi="4";
            $alias="d";
            $q.=" UNION ALL ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "));
            $posisi="5";
            $alias="e";
            $q.=" UNION ALL ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "));
            $posisi="6";
            $alias="f";
            $q.=" UNION ALL ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "));
            // return print_r($q);
            $posisi="7";
            $alias="g";
            $q.=" UNION ALL ".($this->_dataUsulan("JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                    where h.noPembahasan=".$this->_checkStringQuery($no)." 
                    and h.perkada=".$this->_checkStringQuery($perkada)."
                    and h.tahun=".$this->_checkStringQuery($tahun).$where."
                "))."
                    ) a
                    order by a.kdSub1,a.kdSub2,a.kdSub3,a.kdSub4,a.kdSub5,a.kdSub6,a.kdSub7 asc
                ";
            return $q;
        }
        
        function _dataUsulanBandingan($tambahanSelect,$tambahan,$noBandingan,$tahun){
            $no=1;
            return "
                select 
                    ".$tambahanSelect."
                    a.kdSub1,a.nmSub1,a.selected1,a.pagu1,a.keterangan1,
                        (select 
                            pagu".$no."
                            from apbdsub".$no."
                            where noPembahasan".$no."=".$this->_checkStringQuery($noBandingan)." and perkada".($no)."=a.perkada".($no)." and date".$no."=".$this->_checkStringQuery($tahun)." and kdSub".$no."=a.kdSub".$no."
                        )as pagu".$no."1,
                    b.kdSub2,b.nmSub2,b.selected2,b.pagu2,b.keterangan2,
                        (select 
                            pagu".($no+1)."
                            from apbdsub".($no+1)."
                            where noPembahasan".($no+1)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+1)."=b.perkada".($no+1)." and date".($no+1)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+1)."=b.kdSub".($no+1)."
                        )as pagu".($no+1)."1,
                    c.kdSub3,c.nmSub3,c.selected3,c.pagu3,c.keterangan3,
                        (select 
                            pagu".($no+2)."
                            from apbdsub".($no+2)."
                            where noPembahasan".($no+2)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+2)."=c.perkada".($no+2)." and date".($no+2)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+2)."=c.kdSub".($no+2)."
                        )as pagu".($no+2)."1,
                    d.kdSub4,d.nmSub4,d.selected4,d.pagu4,d.keterangan4,
                        (select 
                            pagu".($no+3)."
                            from apbdsub".($no+3)."
                            where noPembahasan".($no+3)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+3)."=d.perkada".($no+3)." and date".($no+3)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+3)."=d.kdSub".($no+3)."
                        )as pagu".($no+3)."1,
                    e.kdSub5,e.nmSub5,e.selected5,e.pagu5,e.keterangan5,
                        (select 
                            pagu".($no+4)."
                            from apbdsub".($no+4)."
                            where noPembahasan".($no+4)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+4)."=e.perkada".($no+4)." and date".($no+4)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+4)."=e.kdSub".($no+4)."
                        )as pagu".($no+4)."1,
                    f.kdSub6,f.nmSub6,f.selected6,f.pagu6,f.keterangan6,
                        (select 
                            pagu".($no+5)."
                            from apbdsub".($no+5)."
                            where noPembahasan".($no+5)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+5)."=f.perkada".($no+5)." and date".($no+5)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+5)."=f.kdSub".($no+5)."
                        )as pagu".($no+5)."1,
                    g.kdSub7,g.nmSub7,g.selected7,g.pagu7,g.keterangan7,
                        (select 
                            pagu".($no+6)."
                            from apbdsub".($no+6)."
                            where noPembahasan".($no+6)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+6)."=g.perkada".($no+6)." and date".($no+6)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+6)."=g.kdSub".($no+6)."
                        )as pagu".($no+6)."1,
                    h.kdUsulan,h.kdDinas,h.kdSubJenis,h.nmUsulan,h.no,h.date,h.vol,h.sat,h.nilai,h.files,h.status,h.noPembahasan,h.volx,h.satx,h.nilaix,
                        h.tahun,(h.vol*h.nilai) as total,h.kdMember,h.perkada,h.keteranganx,h.statusx as keterangan,h.statusPendanaan,
                    i.kdSub,i.nmSub
                from apbdsub1 a 
                LEFT join apbdsub2 b on
                    a.kdSub1=b.kdSub1
                    and b.noPembahasan2=a.noPembahasan1
                    and b.date2=a.date1
                LEFT join apbdsub3 c on
                    c.kdSub2=b.kdSub2
                    and c.noPembahasan3=b.noPembahasan2
                    and c.date3=b.date2
                LEFT join apbdsub4 d on
                    d.kdSub3=c.kdSub3
                    and d.noPembahasan4=c.noPembahasan3
                    and d.date4=c.date3
                LEFT join apbdsub5 e on
                    d.kdSub4=e.kdSub4
                    and e.noPembahasan5=d.noPembahasan4
                    and e.date5=d.date4
                LEFT join apbdsub6 f on
                    f.kdSub5=e.kdSub5
                    and f.noPembahasan6=e.noPembahasan5
                    and f.date6=e.date5
                LEFT join apbdsub7 g on
                    f.kdSub6=g.kdSub6
                    and g.noPembahasan7=f.noPembahasan6
                    and g.date7=f.date6
                ".$tambahan."
            
            ";
            // order by a.kdSub1,b.kdSub2,c.kdSub3,d.kdSub4,e.kdSub5,f.kdSub6,g.kdSub7 asc
        }
        function _getAllDataUsulanBandingan($no,$perkada,$tahun,$where){
            $posisi="1";
            $alias="a";

            $selectTambahan=" 
                ".$no." as nomors,".$tahun." as tahuns,j.nmDinas,k.pertimbangan,k.filePertimbangan, 
                CASE 
                    WHEN char_length(k.files1)>0 && char_length(k.files2)=0 THEN k.nmTujuanDisposisi1
                    ELSE k.nmTujuanDisposisi2
                END as penimbang,
            ";

            $q="  SELECT * from ( ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub 
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas 
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where 
                        h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
            ));
            $posisi="2";
            $alias="b";
            $q.=" UNION ALL ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
                ));
    
            // return print_r($this->qdata->_log($d1.$d2));
            $posisi="3";
            $alias="c";
            $q.=" UNION ALL ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
                ));
            $posisi="4";
            $alias="d";
            $q.=" UNION ALL ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
                ));
            $posisi="5";
            $alias="e";
            $q.=" UNION ALL ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
                ));
            $posisi="6";
            $alias="f";
            $q.=" UNION ALL ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
                ));
            // return print_r($q);
            $posisi="7";
            $alias="g";
            $q.=" UNION ALL ".($this->_dataUsulanBandingan("".$posisi." as noTabelSub,".$selectTambahan,
                    "JOIN usulan h ON
                        ".$alias.".kdSub".$posisi."=h.kdSubJenis 
                        and ".$alias.".noPembahasan".$posisi."=h.noPembahasan
                        and ".$alias.".perkada".$posisi."=h.perkada
                        and ".$alias.".date".$posisi."=h.tahun
                    LEFT JOIN dsub i on 
                        h.kdSub=i.kdSub
                        and i.perkadaS=h.perkada
                        and i.taSub=h.tahun
                    left join dinas j on
                        h.kdDinas=j.kdDinas
                        and j.perkada=h.perkada
                        and j.tahun=h.tahun
                    left join disposisi k on
                        h.kdUsulan=k.kdUsulan and
                        h.kdMember=k.kdMember and
                        h.noPembahasan=k.noPembahasan and
                        h.perkada=k.perkada and
                        h.tahun=k.tahun
                    where h.noPembahasan=".$this->_checkStringQuery($no)." and h.perkada=".$this->_checkStringQuery($perkada)." and h.tahun=".$this->_checkStringQuery($tahun).$where,
                    ($no-1),
                    $tahun
                ))."
                ) a
                GROUP by noPembahasan,perkada,tahun,kdUsulan,kdMember,kdDinas
                order by a.kdSub1,a.kdSub2,a.kdSub3,a.kdSub4,a.kdSub5,a.kdSub6,a.kdSub7 asc
            ";
            return $q;
        }
        function _getAllUsulanDisposisi($no,$tahun,$where){
            return "select 
                a.nmUsulan,a.kdUsulan,a.noPembahasan,a.tahun,a.kdMember,a.files,
                c.kdDInas,c.nmDinas,
                d.pertimbangan,d.filePertimbangan,
                CASE 
                	WHEN char_length(d.files1)>0 && char_length(d.files2)=0 THEN d.tglTerima1
                    ELSE d.tglTerima2
                END as dateShow,
                CASE 
                	WHEN char_length(d.files1)>0 && char_length(d.files2)=0 THEN d.files1
                    ELSE d.files2
                END as files1,
                case 
                    when trim(d.status)='terarsipkan' then 'TUNTAS'
                    else '-'
                end as status,
                f.nmDinas as nmDinasReal
            from usulan a 
            join member b on
                a.kdMember=b.kdMember1
            join dinas c on
                b.kdDinas=c.kdDinas
            left join disposisi d on
                a.kdUsulan=d.kdUsulan and
                a.kdMember=d.kdMember and
                a.noPembahasan=d.noPembahasan and
                a.perkada=d.perkada and
                a.tahun=d.tahun
            left join dsub e on
                a.kdSub=e.kdSub and
                a.perkada=e.perkadaS and
                a.tahun=e.taSub
            left join dinas f on
                f.kdDinas=a.kdDinas
            where a.noPembahasan=".$this->_checkStringQuery($no)." and a.tahun=".$this->_checkStringQuery($tahun)." and a.status='terkirim' ".$where."
            group by a.kdMember,a.kdUsulan
            order by a.ins desc
            ";
        }

        function _getKeyFitur($kd,$where){
            return "select kunci from appkey where kdFitur like '%".$kd."%' ".$where." order by kdFitur asc";
        }
        function _getNotification($kdMember,$where){
            return "
                select 
                    a.* 
                from notif a 
                join notifuser b
                    on  a.kdNotif=b.kdNotif
                where b.kdMember=".$this->_checkStringQuery($kdMember).$where."
            ";
        }

        function _updDateInformasiDiakses($kdMember,$where){
            return "
                update notifuser set date=now(), date1='-'
                where kdMember=".$this->_checkStringQuery($kdMember)." and date1='' ".$where."
            ";
        }
        function _updDateInformasiDimengerti($kdMember,$where){
            return "
                update notifuser set date1=now(),status=1
                where kdMember=".$this->_checkStringQuery($kdMember)." and date1='-' ".$where."
            ";
        }
        function _getDisposisi($kdUsulan,$no,$tahun,$where){
            return "select 
                kdDisposisi,tglTerima,tglPenyelsaian,tujuanBupati,nmTujuanBupati,isi,files,
                tglTerima1,tglPenyelsaian1,tujuanDisposisi1,nmTujuanDisposisi1,isi1,files1,
                tglTerima2,tglPenyelsaian2,tujuanDisposisi2,nmTujuanDisposisi2,isi2,files2,
                status
            from disposisi
            where noPembahasan=".$this->_checkStringQuery($no)." and tahun=".$this->_checkStringQuery($tahun)." and 
                kdUsulan=".$this->_checkStringQuery($kdUsulan)." and kdDisposisi=".$this->_checkStringQuery($kdUsulan)."  ".$where."
            group by kdMember,kdUsulan
            order by ins
            ";
        }

        function _getDinasTapd($where){
            return "
                select nmDinas as valueName,kdDinas as value from dinas where kategori='TAPD' ".$where."
                GROUP by kdDinas
            ";
        }

        function _getAllDataApbd($no,$tahun,$where){
            $q="
                select 
                    a.kdSub1,a.nmSub1,a.selected1,a.pagu1,
                    b.kdSub2,b.nmSub2,b.selected2,b.pagu2,
                    c.kdSub3,c.nmSub3,c.selected3,c.pagu3,
                    d.kdSub4,d.nmSub4,d.selected4,d.pagu4,
                    e.kdSub5,e.nmSub5,e.selected5,e.pagu5,
                    f.kdSub6,f.nmSub6,f.selected6,f.pagu6,
                    g.kdSub7,g.nmSub7,g.selected7,g.pagu7
                from apbdsub1 a 
                join apbdsub2 b on  
                    a.kdSub1=b.kdSub1 
                    and b.noPembahasan2=a.noPembahasan1
                    and b.date2=a.date1
                left join apbdsub3 c on  
                    b.kdSub2=c.kdSub2 
                    and c.noPembahasan3=b.noPembahasan2
                    and c.date3=b.date2
                left join apbdsub4 d on  
                    c.kdSub3=d.kdSub3
                    and d.noPembahasan4=c.noPembahasan3
                    and d.date4=c.date3
                left join apbdsub5 e on  
                    d.kdSub4=e.kdSub4
                    and e.noPembahasan5=d.noPembahasan4
                    and e.date5=d.date4
                left join apbdsub6 f on  
                    e.kdSub5=f.kdSub5 
                    and f.noPembahasan6=e.noPembahasan5
                    and f.date6=e.date5
                left join apbdsub7 g on  
                    f.kdSub6=g.kdSub6
                    and g.noPembahasan7=f.noPembahasan6
                    and g.date7=f.date6
                where a.noPembahasan1=".$this->_checkStringQuery($no)." and a.date1=".$this->_checkStringQuery($tahun)." ".$where."
                order by a.kdSUb1,b.kdSUb2,c.kdSUb3,
                    d.kdSUb4,e.kdSUb5,f.kdSUb6,
                    g.kdSUb7
            ";
            return $q;
        }

        function _getAllDataApbdBandingan($nomor,$perkada,$tahun,$where,$noBandingan){
            $no=1;
            $q="
                select 
                    a.kdSub1,a.nmSub1,a.selected1,a.pagu1,
                        (select 
                            pagu".$no."
                            from apbdsub".$no."
                            where noPembahasan".$no."=".$this->_checkStringQuery($noBandingan)." and 
                                perkada".($no)."=".$this->_checkStringQuery($perkada)." and 
                                date".$no."=".$this->_checkStringQuery($tahun)." and 
                                kdSub".$no."=a.kdSub".$no."
                        )as pagu".$no."1,
                    b.kdSub2,b.nmSub2,b.selected2,b.pagu2,
                        (select 
                            pagu".($no+1)."
                            from apbdsub".($no+1)."
                            where noPembahasan".($no+1)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+1)."=".$this->_checkStringQuery($perkada)." and date".($no+1)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+1)."=b.kdSub".($no+1)."
                        )as pagu".($no+1)."1,
                    c.kdSub3,c.nmSub3,c.selected3,c.pagu3,
                        (select 
                            pagu".($no+2)."
                            from apbdsub".($no+2)."
                            where noPembahasan".($no+2)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+2)."=".$this->_checkStringQuery($perkada)." and date".($no+2)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+2)."=c.kdSub".($no+2)."
                        )as pagu".($no+2)."1,
                    d.kdSub4,d.nmSub4,d.selected4,d.pagu4,
                        (select 
                            pagu".($no+3)."
                            from apbdsub".($no+3)."
                            where noPembahasan".($no+3)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+3)."=".$this->_checkStringQuery($perkada)." and date".($no+3)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+3)."=d.kdSub".($no+3)."
                        )as pagu".($no+3)."1,
                    e.kdSub5,e.nmSub5,e.selected5,e.pagu5,
                        (select 
                            pagu".($no+4)."
                            from apbdsub".($no+4)."
                            where noPembahasan".($no+4)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+4)."=".$this->_checkStringQuery($perkada)." and date".($no+4)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+4)."=e.kdSub".($no+4)."
                        )as pagu".($no+4)."1,
                    f.kdSub6,f.nmSub6,f.selected6,f.pagu6,
                        (select 
                            pagu".($no+5)."
                            from apbdsub".($no+5)."
                            where noPembahasan".($no+5)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+5)."=".$this->_checkStringQuery($perkada)." and date".($no+5)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+5)."=f.kdSub".($no+5)."
                        )as pagu".($no+5)."1,
                    g.kdSub7,g.nmSub7,g.selected7,g.pagu7,
                        (select 
                            pagu".($no+6)."
                            from apbdsub".($no+6)."
                            where noPembahasan".($no+6)."=".$this->_checkStringQuery($noBandingan)." and perkada".($no+6)."=".$this->_checkStringQuery($perkada)." and date".($no+6)."=".$this->_checkStringQuery($tahun)." and kdSub".($no+6)."=g.kdSub".($no+6)."
                        )as pagu".($no+6)."1
                from apbdsub1 a 
                left join apbdsub2 b on  
                    a.kdSub1=b.kdSub1 and
                    a.noPembahasan1=b.noPembahasan2 and
                    a.perkada1=b.perkada2 and
                    a.date1=b.date2
                left join apbdsub3 c on  
                    b.kdSub2=c.kdSub2 and
                    b.noPembahasan2=c.noPembahasan3 and
                    b.perkada2=c.perkada3 and
                    b.date2=c.date3
                left join apbdsub4 d on  
                    c.kdSub3=d.kdSub3 and 
                    d.noPembahasan4=c.noPembahasan3 and
                    d.perkada4=c.perkada3 and
                    d.date4=c.date3
                left join apbdsub5 e on  
                    d.kdSub4=e.kdSub4 and 
                    d.noPembahasan4=e.noPembahasan5 and
                    d.perkada4=e.perkada5 and
                    d.date4=e.date5
                left join apbdsub6 f on  
                    e.kdSub5=f.kdSub5 and
                    f.noPembahasan6=e.noPembahasan5 and
                    f.perkada6=e.perkada5 and
                    f.date6=e.date5
                left join apbdsub7 g on  
                    f.kdSub6=g.kdSub6 and
                    f.noPembahasan6=g.noPembahasan7 and
                    f.perkada6=g.perkada7 and
                    f.date6=g.date7
                where a.noPembahasan1=".$this->_checkStringQuery($nomor)." and a.date1=".$this->_checkStringQuery($tahun)." and a.perkada1=".$this->_checkStringQuery($perkada)." ".$where."

                GROUP BY a.kdSUb1,b.kdSUb2,c.kdSUb3,
                    d.kdSUb4,e.kdSUb5,f.kdSUb6,
                    g.kdSUb7
                order by a.kdSUb1,b.kdSUb2,c.kdSUb3,
                    d.kdSUb4,e.kdSUb5,f.kdSUb6,
                    g.kdSUb7
            ";
            return $q;
        }

        function _duplikatDataApbd($no,$perkada,$tahun,$konPerkada){
            $tnomor=$no;
            $tperkada=$perkada;

            // $no=1;
            // $tperkada=1;
            // $tnomor=0;

            $restra="";
            if($konPerkada){
                $tperkada++;
                $tnomor=0; //kerena termasuk ke dalam perkada maka no pembahasan harus dimulai dari 0
                $restra="
                DELETE FROM durusan where taUrusan=".$this->_checkStringQuery($tahun)." and perkadaU=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dbidang where taBidang=".$this->_checkStringQuery($tahun)." and perkadaB=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dprogram where taProgram=".$this->_checkStringQuery($tahun)." and perkadaP=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dkegiatan where taKegiatan=".$this->_checkStringQuery($tahun)." and perkadaK=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dsub where taSub=".$this->_checkStringQuery($tahun)." and perkadaS=".$this->_checkStringQuery($tperkada).";

                INSERT INTO durusan(kdUrusan, nmUrusan, paguUrusan,taUrusan, perkadaU)
                (   select
                        kdUrusan, nmUrusan, paguUrusan,taUrusan,".$this->_checkStringQuery($tperkada)."
                    FROM durusan
                    where perkadaU=".$this->_checkStringQuery($perkada)."
                    and taUrusan=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dbidang(kdUrusan, kdBidang, nmBidang, paguBidang, taBidang, perkadaB)
                (   select
                        kdUrusan, kdBidang, nmBidang, paguBidang, taBidang,".$this->_checkStringQuery($tperkada)."
                    FROM dbidang
                    where perkadaB=".$this->_checkStringQuery($perkada)."
                    and taBidang=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dprogram(kdBidang, kdProgram, nmProgram, paguProgram, taProgram, perkadaP) 
                (   select
                        kdBidang, kdProgram, nmProgram, paguProgram, taProgram,".$this->_checkStringQuery($tperkada)."
                    FROM dprogram
                    where perkadaP=".$this->_checkStringQuery($perkada)."
                    and taProgram=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dkegiatan(kdProgram, kdKegiatan, nmKegiatan, paguKegiatan, taKegiatan, perkadaK)
                (   select
                        kdProgram, kdKegiatan, nmKegiatan, paguKegiatan, taKegiatan,".$this->_checkStringQuery($tperkada)."
                    FROM dkegiatan
                    where perkadaK=".$this->_checkStringQuery($perkada)."
                    and taKegiatan=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dsub(kdKegiatan, kdDinas, kdSub, nmSub, paguSub, taSub, perkadaS)
                (   select
                        kdKegiatan, kdDinas, kdSub, nmSub, paguSub, taSub,".$this->_checkStringQuery($tperkada)."
                    FROM dsub
                    where perkadaS=".$this->_checkStringQuery($perkada)."
                    and taSub=".$this->_checkStringQuery($tahun)."
                );
                
                INSERT INTO dinas(kdDinas, nmDinas, kadis, nip, pagu, kategori, perkada, tahun)
                (
                    SELECT kdDinas, nmDinas, kadis, nip, pagu, kategori,".$this->_checkStringQuery($tperkada).",tahun
                    FROM dinas where 
                    perkada=".$this->_checkStringQuery($perkada)."
                    and tahun=".$this->_checkStringQuery($tahun)."
                    group by kdDinas
                );
                ";

            }else{
                $tnomor++;
            }
            return "
                DELETE FROM apbdsub1 WHERE noPembahasan1=".$this->_checkStringQuery($tnomor)." 
                    and perkada1=".$this->_checkStringQuery($tperkada)." and date1=".$this->_checkStringQuery($tahun).";
                DELETE FROM apbdsub2 WHERE noPembahasan2=".$this->_checkStringQuery($tnomor)." 
                    and perkada2=".$this->_checkStringQuery($tperkada)." and date2=".$this->_checkStringQuery($tahun).";
                DELETE FROM apbdsub3 WHERE noPembahasan3=".$this->_checkStringQuery($tnomor)." 
                    and perkada3=".$this->_checkStringQuery($tperkada)." and date3=".$this->_checkStringQuery($tahun).";
                DELETE FROM apbdsub4 WHERE noPembahasan4=".$this->_checkStringQuery($tnomor)." 
                    and perkada4=".$this->_checkStringQuery($tperkada)." and date4=".$this->_checkStringQuery($tahun).";
                DELETE FROM apbdsub5 WHERE noPembahasan5=".$this->_checkStringQuery($tnomor)." 
                    and perkada5=".$this->_checkStringQuery($tperkada)." and date5=".$this->_checkStringQuery($tahun).";
                DELETE FROM apbdsub6 WHERE noPembahasan6=".$this->_checkStringQuery($tnomor)." 
                    and perkada6=".$this->_checkStringQuery($tperkada)." and date6=".$this->_checkStringQuery($tahun).";
                DELETE FROM apbdsub7 WHERE noPembahasan7=".$this->_checkStringQuery($tnomor)." 
                    and perkada7=".$this->_checkStringQuery($tperkada)." and date7=".$this->_checkStringQuery($tahun).";
            
                INSERT INTO apbdsub1(kdSub1, nmSub1, pagu1, selected1, date1,noPembahasan1,perkada1)
                (   select 
                        kdSub1, nmSub1, pagu1, selected1,date1,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub1 
                    where noPembahasan1=".$this->_checkStringQuery($no)." 
                        and perkada1=".$this->_checkStringQuery($perkada)."
                        and date1=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub2 (kdSub1, kdSub2, nmSub2, pagu2, selected2, date2, noPembahasan2,perkada2)
                (   select 
                        kdSub1, kdSub2, nmSub2, pagu2, selected2, date2,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub2 
                    where noPembahasan2=".$this->_checkStringQuery($no)." 
                        and perkada2=".$this->_checkStringQuery($perkada)."
                        and date2=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub3(kdSub2, kdSub3, nmSub3, pagu3, selected3, date3,noPembahasan3,perkada3)
                (   select 
                        kdSub2, kdSub3, nmSub3, pagu3, selected3, date3,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub3 
                    where noPembahasan3=".$this->_checkStringQuery($no)." 
                        and perkada3=".$this->_checkStringQuery($perkada)."
                        and date3=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub4(kdSub3, kdSub4, nmSub4, pagu4, selected4, date4,noPembahasan4,perkada4)
                (   select 
                        kdSub3, kdSub4, nmSub4, pagu4, selected4, date4,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub4
                    where noPembahasan4=".$this->_checkStringQuery($no)." 
                    and perkada4=".$this->_checkStringQuery($perkada)."
                    and date4=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub5(kdSub4, kdSub5, nmSub5, pagu5, selected5, date5,noPembahasan5,perkada5)
                (   select 
                        kdSub4, kdSub5, nmSub5, pagu5, selected5, date5,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub5
                    where noPembahasan5=".$this->_checkStringQuery($no)." 
                        and perkada5=".$this->_checkStringQuery($perkada)."
                        and date5=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub6(kdSub5, kdSub6, nmSub6, pagu6, selected6, date6,noPembahasan6,perkada6)
                (   select 
                        kdSub5, kdSub6, nmSub6, pagu6, selected6, date6,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub6
                    where noPembahasan6=".$this->_checkStringQuery($no)." 
                        and perkada6=".$this->_checkStringQuery($perkada)."
                        and date6=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub7(kdSub6, kdSub7, nmSub7, pagu7, selected7, date7,noPembahasan7,perkada7)
                (   select 
                        kdSub6, kdSub7, nmSub7, pagu7, selected7, date7,".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub7
                    where noPembahasan7=".$this->_checkStringQuery($no)." 
                        and perkada7=".$this->_checkStringQuery($perkada)."
                        and date7=".$this->_checkStringQuery($tahun)."
                );

                ".$restra."
            ";
        }
        function _duplikatDataApbdTahun($no,$perkada,$tahun,$tahunReal){
            $tnomor=0;
            $tperkada=1;
            return "
                DELETE FROM durusan where taUrusan=".$this->_checkStringQuery($tahunReal)." and perkadaU=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dbidang where taBidang=".$this->_checkStringQuery($tahunReal)." and perkadaB=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dprogram where taProgram=".$this->_checkStringQuery($tahunReal)." and perkadaP=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dkegiatan where taKegiatan=".$this->_checkStringQuery($tahunReal)." and perkadaK=".$this->_checkStringQuery($tperkada).";
                DELETE FROM dsub where taSub=".$this->_checkStringQuery($tahunReal)." and perkadaS=".$this->_checkStringQuery($tperkada).";

                DELETE FROM apbdsub1 WHERE noPembahasan1=".$this->_checkStringQuery($tnomor)." 
                    and perkada1=".$this->_checkStringQuery($tperkada)." and date1=".$this->_checkStringQuery($tahunReal).";
                DELETE FROM apbdsub2 WHERE noPembahasan2=".$this->_checkStringQuery($tnomor)." 
                    and perkada2=".$this->_checkStringQuery($tperkada)." and date2=".$this->_checkStringQuery($tahunReal).";
                DELETE FROM apbdsub3 WHERE noPembahasan3=".$this->_checkStringQuery($tnomor)." 
                    and perkada3=".$this->_checkStringQuery($tperkada)." and date3=".$this->_checkStringQuery($tahunReal).";
                DELETE FROM apbdsub4 WHERE noPembahasan4=".$this->_checkStringQuery($tnomor)." 
                    and perkada4=".$this->_checkStringQuery($tperkada)." and date4=".$this->_checkStringQuery($tahunReal).";
                DELETE FROM apbdsub5 WHERE noPembahasan5=".$this->_checkStringQuery($tnomor)." 
                    and perkada5=".$this->_checkStringQuery($tperkada)." and date5=".$this->_checkStringQuery($tahunReal).";
                DELETE FROM apbdsub6 WHERE noPembahasan6=".$this->_checkStringQuery($tnomor)." 
                    and perkada6=".$this->_checkStringQuery($tperkada)." and date6=".$this->_checkStringQuery($tahunReal).";
                DELETE FROM apbdsub7 WHERE noPembahasan7=".$this->_checkStringQuery($tnomor)." 
                    and perkada7=".$this->_checkStringQuery($tperkada)." and date7=".$this->_checkStringQuery($tahunReal).";
                
                DELETE FROM  dinas where perkada=".$this->_checkStringQuery($tperkada)."
                    and tahun=".$this->_checkStringQuery($tahunReal).";

                INSERT INTO apbdsub1(kdSub1, nmSub1, pagu1, selected1, date1,noPembahasan1,perkada1)
                (   select 
                        kdSub1, nmSub1, pagu1, selected1,".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub1 
                    where noPembahasan1=".$this->_checkStringQuery($no)." 
                        and perkada1=".$this->_checkStringQuery($perkada)."
                        and date1=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub2 (kdSub1, kdSub2, nmSub2, pagu2, selected2, date2, noPembahasan2,perkada2)
                (   select 
                        kdSub1, kdSub2, nmSub2, pagu2, selected2, ".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub2 
                    where noPembahasan2=".$this->_checkStringQuery($no)." 
                        and perkada2=".$this->_checkStringQuery($perkada)."
                        and date2=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub3(kdSub2, kdSub3, nmSub3, pagu3, selected3, date3,noPembahasan3,perkada3)
                (   select 
                        kdSub2, kdSub3, nmSub3, pagu3, selected3, ".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub3 
                    where noPembahasan3=".$this->_checkStringQuery($no)." 
                        and perkada3=".$this->_checkStringQuery($perkada)."
                        and date3=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub4(kdSub3, kdSub4, nmSub4, pagu4, selected4, date4,noPembahasan4,perkada4)
                (   select 
                        kdSub3, kdSub4, nmSub4, pagu4, selected4, ".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub4
                    where noPembahasan4=".$this->_checkStringQuery($no)." 
                    and perkada4=".$this->_checkStringQuery($perkada)."
                    and date4=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub5(kdSub4, kdSub5, nmSub5, pagu5, selected5, date5,noPembahasan5,perkada5)
                (   select 
                        kdSub4, kdSub5, nmSub5, pagu5, selected5, ".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub5
                    where noPembahasan5=".$this->_checkStringQuery($no)." 
                        and perkada5=".$this->_checkStringQuery($perkada)."
                        and date5=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub6(kdSub5, kdSub6, nmSub6, pagu6, selected6, date6,noPembahasan6,perkada6)
                (   select 
                        kdSub5, kdSub6, nmSub6, pagu6, selected6, ".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub6
                    where noPembahasan6=".$this->_checkStringQuery($no)." 
                        and perkada6=".$this->_checkStringQuery($perkada)."
                        and date6=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO apbdsub7(kdSub6, kdSub7, nmSub7, pagu7, selected7, date7,noPembahasan7,perkada7)
                (   select 
                        kdSub6, kdSub7, nmSub7, pagu7, selected7, ".$this->_checkStringQuery($tahunReal).",".$this->_checkStringQuery($tnomor).",".$this->_checkStringQuery($tperkada)."
                    from apbdsub7
                    where noPembahasan7=".$this->_checkStringQuery($no)." 
                        and perkada7=".$this->_checkStringQuery($perkada)."
                        and date7=".$this->_checkStringQuery($tahun)."
                );



                INSERT INTO durusan(kdUrusan, nmUrusan, paguUrusan,taUrusan, perkadaU)
                (   select
                        kdUrusan, nmUrusan, paguUrusan,".$this->_checkStringQuery($tahunReal).",1
                    FROM durusan
                    where perkadaU=".$this->_checkStringQuery($perkada)."
                    and taUrusan=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dbidang(kdUrusan, kdBidang, nmBidang, paguBidang, taBidang, perkadaB)
                (   select
                        kdUrusan, kdBidang, nmBidang, paguBidang, ".$this->_checkStringQuery($tahunReal).",1
                    FROM dbidang
                    where perkadaB=".$this->_checkStringQuery($perkada)."
                    and taBidang=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dprogram(kdBidang, kdProgram, nmProgram, paguProgram, taProgram, perkadaP) 
                (   select
                        kdBidang, kdProgram, nmProgram, paguProgram, ".$this->_checkStringQuery($tahunReal).",1
                    FROM dprogram
                    where perkadaP=".$this->_checkStringQuery($perkada)."
                    and taProgram=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dkegiatan(kdProgram, kdKegiatan, nmKegiatan, paguKegiatan, taKegiatan, perkadaK)
                (   select
                        kdProgram, kdKegiatan, nmKegiatan, paguKegiatan, ".$this->_checkStringQuery($tahunReal).",1
                    FROM dkegiatan
                    where perkadaK=".$this->_checkStringQuery($perkada)."
                    and taKegiatan=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dsub(kdKegiatan, kdDinas, kdSub, nmSub, paguSub, taSub, perkadaS)
                (   select
                        kdKegiatan, kdDinas, kdSub, nmSub, paguSub, ".$this->_checkStringQuery($tahunReal).",1
                    FROM dsub
                    where perkadaS=".$this->_checkStringQuery($perkada)."
                    and taSub=".$this->_checkStringQuery($tahun)."
                );

                INSERT INTO dinas(kdDinas, nmDinas, kadis, nip, pagu, kategori, perkada, tahun)
                (
                    SELECT kdDinas, nmDinas, kadis, nip, pagu, kategori,1,".$this->_checkStringQuery($tahunReal)."
                    FROM dinas where perkada=".$this->_checkStringQuery($perkada)."
                    and tahun=".$this->_checkStringQuery($tahun)."
                    group by kdDinas
                );
            ";
        }

        function _getdDisposisi($no,$perkada,$tahun,$where){
            return "
            SELECT a.nmUsulan
                ,b.*
                ,c.nmDinas
            FROM usulan a 
            LEFT JOIN disposisi b 
                ON a.kdUsulan=b.kdUsulan
                AND a.perkada=b.perkada
                AND a.noPembahasan=b.noPembahasan
                AND a.tahun=b.tahun
            left join dinas c on
                a.kdDinas=c.kdDinas 
                and c.perkada=a.perkada
                and c.tahun=a.tahun
            where a.noPembahasan=".$this->_checkStringQuery($no)."
                and a.perkada=".$this->_checkStringQuery($perkada)."
                AND a.tahun=".$this->_checkStringQuery($tahun)."
                ".$where."
            ";
        }
        function _getdAbsensi($no,$perkada,$tahun,$where){
            return "
                SELECT 
                    a.kdMember1 as kdMember,a.nmMember, a.kdJabatan, a.kdDinas,
                    b.nmDinas,
                    c.nmJabatan
                FROM member a
                JOIN jabatan c ON
                    a.kdJabatan=c.kdJabatan1
                join absensi d ON
                    a.kdMember1=d.kdMember
                JOIN dinas b ON
                    a.kdDinas=b.kdDinas
                    and b.tahun=d.tahun
                    and b.perkada=d.perkada
                where d.noPembahasan=".$this->_checkStringQuery($no)."
                and d.perkada=".$this->_checkStringQuery($perkada)."
                and d.tahun=".$this->_checkStringQuery($tahun)."
                ".$where."
                order by c.kdJabatan,b.nmDinas,a.nmMember
            ";
        }
        function _ddokumentasi($pembahasan,$perkada,$tahun,$where){
            return "select * from dokumentasi where 
            noPembahasan=".$this->_checkStringQuery($pembahasan)." 
            and perkada=".$this->_checkStringQuery($perkada)."
            and tahun=".$this->_checkStringQuery($tahun)."
            ".$where."
            ";
        }
    }
?>