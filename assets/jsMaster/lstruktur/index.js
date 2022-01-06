function _onload(data){
    _.dall=data.dall    ;

    _.noPembahasan=data.noPembahasan;
    _.perkada=data.perkada;
    
    // console.log(data.ddisposisi);
    
    _.dstatus=data.dstatus;
    _.dlaporan=data.dlaporan;    
    _.perkadaFinal=data.perkadaFinal;

    _.ptahun=data.ptahun;
    
    _.vtahun=data.tahun;
    _.vperkada=data.perkada;
    _.noPembahasan=data.noPembahasan;
    _.pembahasanPrev=data.pembahasanPrev;
    

    _.indT=_checkIndex(_.ptahun,_.vtahun);
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.vperkada);

    
    _installVarAble({
        page:`Laporan Struktur APBD`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Laporan Struktur APBD</a></li>`,
        form:_form()
    });
    
    navBar.menu[7].menu[0].active="active";
    navBar.menu[7].menu[0].subMenu[2].status="active";

    _installAble({form:true});
    myCode=data.code;
    
    _.cdata=0;  // count data tabel
    
    _fstatus();
    $('#ptahun').val(_.vtahun);
    $('#pperkada').val(_.vperkada);
    $('#ppembahasan').val(_.noPembahasan);
    $('#ppembahasan1').val(_.pembahasanPrev);
}
function _form(){
    return _formAlbe({
        btn:_btnGroupTd([{
            clsBtn:`btn-success`
            ,func:"_goLaporan()"
            ,icon:`<i class="mdi mdi-file-chart  text-light"></i>Rekap File Disposisi`
            ,title:"Donwload"
        }]),
        judul:"DAFTAR USULAN",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
        isi:_sejajar({
                data:[{
                    isi:`<div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                                    <i class="mdi mdi-calendar mr-2 text-dark"></i>TAHUN
                                </span>
                            </div>
                            <select id="ptahun" onchange="_ctahun(this)" class="btn text-light bg-dark  form-control">
                                `+_inpComboBox({
                                    data:_.ptahun,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>
                        <div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                                    <i class="mdi mdi-numeric mr-2 text-dark"></i>PEMBAHASAN
                                </span>
                            </div>
                            <select id="ppembahasan1" class="btn text-light bg-dark  form-control">
                                `+_inpComboBox({
                                    data:_.ptahun[_.indT].perkada[_.indP].pembahasan,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>`
                },{
                    isi:`<div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                                    <i class="mdi mdi-numeric mr-2 text-dark"></i>PERKADA
                                </span>
                            </div>
                            <select id="pperkada" onchange="_cperkada(this)" class="btn text-light bg-dark  form-control">
                                `+_inpComboBox({
                                    data:_.ptahun[_.indT].perkada,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>
                        <div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                                    <i class="mdi mdi-numeric mr-2 text-dark"></i>PEMBAHASAN
                                </span>
                            </div>
                            <select id="ppembahasan" class="btn text-light bg-dark  form-control">
                                `+_inpComboBox({
                                    data:_.ptahun[_.indT].perkada[_.indP].pembahasan,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>`
                }]
            })
            +`<div class="input-group mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text bg-dark text-dark" style="width: 150px;;">
                        <i class="mdi mdi-bookmark-check mr-2 text-light"></i>
                    </span>
                </div>
                <button class="form-control btn btn-sm btn-primary" onclick="refreshData()">TAMPILKAN DATA</button>
            </div>`
            +`<hr>
            <div class="row" id='tabelShow' style="margin: auto;width:100%">
            </div>`
    });
}

function _ctahun(v) {
    _.indT=_checkIndex(_.ptahun,v.value);
    $('#pperkada').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada,
            inSelect:"Bagus H"
        })
    );
    _cperkada({value:_.ptahun[_.indT].perkada[0].value})
}
function _cperkada(v) {
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,v.value);
    $('#ppembahasan').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada[_.indP].pembahasan,
            inSelect:"Bagus H"
        })
    );
    $('#ppembahasan1').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada[0].pembahasan,
            inSelect:"Bagus H"
        })
    );
}

function _hitungPersenStruktur(pagu,paguNext) {
    fmin=0;
    fnext=true; //pagu next lebih tinggi
    paguNext=parseFloat(paguNext);
    pagu=parseFloat(pagu);
    if(paguNext>=pagu){
        fmin=paguNext-pagu;
    }else{
        fnext=false;
        fmin=pagu-paguNext;
    }
    fpersenView=parseFloat((fmin*100)/pagu).toFixed(2)+" %";
    if(fmin==0){
        fhasilView="0";
        fpersenView=" 0 %";
    }else{
        if(fnext){
            fhasilView=" "+_$(fmin)+" ";
        }else{
            fhasilView="( - "+_$(fmin)+" )";
            fpersenView="( - "+fpersenView+")";
        }
    }
    return {
        nilai:fhasilView,
        persen:fpersenView,
        next:fnext
    }
}
function setTabel(){
    fdata=`
    <div class="table-responsive">
        <table id="tabelStruktur" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th >Uraian</th>
                    <th>Pagu Sebelum</th>
                    <th>Pagu Sesuda</th>
                    <th>+ | -</th>
                    <th>Persentase</th>
                </tr>
            </thead>
            <tbody>`;

    no=1;
    fkdSub1=undefined;
    fkdSub2=undefined;
    fkdSub3=undefined;
    fkdSub4=undefined;
    fkdSub5=undefined;
    fkdSub6=undefined;
    fkdSub7=undefined;
    fkdEnd=undefined;
    _.dall.forEach((v,i) => {

        if(fkdSub1!=v.kdSub1 && v.kdSub1!=null){
            fkdSub1=v.kdSub1;
            fkdEnd=v.kdSub1;
            console.log(v);
            
            _log(v.pagu1,v.pagu11);
            dpersen=_hitungPersenStruktur(v.pagu1,v.pagu11);
            _log(dpersen);
            // _.dusulan[i].subSelected=v.nmSub1;
            fstyle="";
            if(v.selected1==1 && v.pagu1!=v.pagu11){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub1+`</td>
                <td>`+v.nmSub1+`</td>
                <td>`+_$(v.pagu1)+`</td>
                <td>`+_$(v.pagu11)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        if(fkdSub2!=v.kdSub2 && v.kdSub2!=null){
            fkdSub2=v.kdSub2;
            fkdEnd=v.kdSub2;
            dpersen=_hitungPersenStruktur(v.pagu2,v.pagu21);
            // _.dusulan[i].subSelected=v.nmSub2;
            fstyle="";
            if(v.selected2==1 && v.pagu2!=v.pagu21){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub2+`</td>
                <td>`+v.nmSub2+`</td>
                <td>`+_$(v.pagu2)+`</td>
                <td>`+_$(v.pagu21)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        if(fkdSub3!=v.kdSub3 && v.kdSub3!=null){
            fkdSub3=v.kdSub3;
            fkdEnd=v.kdSub3;
            dpersen=_hitungPersenStruktur(v.pagu3,v.pagu31);
            // _.dusulan[i].subSelected=v.nmSub3;
            fstyle="";
            if(v.selected3==1 && v.pagu3!=v.pagu31){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub3+`</td>
                <td>`+v.nmSub3+`</td>
                <td>`+_$(v.pagu3)+`</td>
                <td>`+_$(v.pagu31)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        if(fkdSub4!=v.kdSub4 && v.kdSub4!=null){
            fkdSub4=v.kdSub4;
            fkdEnd=v.kdSub4;
            dpersen=_hitungPersenStruktur(v.pagu4,v.pagu41);
            // _.dusulan[i].subSelected=v.nmSub4;
            fstyle="";
            if(v.selected4==1 && v.pagu4!=v.pagu41){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub4+`</td>
                <td>`+v.nmSub4+`</td>
                <td>`+_$(v.pagu4)+`</td>
                <td>`+_$(v.pagu41)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        if(fkdSub5!=v.kdSub5 && v.kdSub5!=null){
            fkdSub5=v.kdSub5;
            fkdEnd=v.kdSub5;
            dpersen=_hitungPersenStruktur(v.pagu5,v.pagu51);
            // _.dusulan[i].subSelected=v.nmSub5;
            fstyle="";
            if(v.selected5==1 && v.pagu5!=v.pagu51){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub5+`</td>
                <td>`+v.nmSub5+`</td>
                <td>`+_$(v.pagu5)+`</td>
                <td>`+_$(v.pagu51)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        if(fkdSub6!=v.kdSub6 && v.kdSub6!=null){
            fkdSub6=v.kdSub6;
            fkdEnd=v.kdSub6;
            dpersen=_hitungPersenStruktur(v.pagu6,v.pagu61);
            // _.dusulan[i].subSelected=v.nmSub6;
            fstyle="";
            if(v.selected6==1 && v.pagu6!=v.pagu61){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub6+`</td>
                <td>`+v.nmSub6+`</td>
                <td>`+_$(v.pagu6)+`</td>
                <td>`+_$(v.pagu61)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        if(fkdSub7!=v.kdSub7 && v.kdSub7!=null){
            fkdSub7=v.kdSub7;
            fkdEnd=v.kdSub7;
            dpersen=_hitungPersenStruktur(v.pagu7,v.pagu71);
            // _.dusulan[i].subSelected=v.nmSub7;
            fstyle="";
            if(v.selected7==1 && v.pagu7!=v.pagu71){
                if(dpersen.next){
                    fstyle="background-color: #108000;color: #fff;";
                }else{
                    fstyle="background-color: #8d0909;color: #fff;";
                }
            }
            fdata+=`
            <tr style="padding:5px; `+fstyle+`">
                <td>`+v.kdSub7+`</td>
                <td>`+v.nmSub7+`</td>
                <td>`+_$(v.pagu7)+`</td>
                <td>`+_$(v.pagu71)+`</td>
                <td>`+dpersen.nilai+`</td>
                <td>`+dpersen.persen+`</td>
            </tr>`;
        }
        no++;
    }); 
                
    return fdata+=`</tbody>
        </table>
    </div>`;
}
function refreshData() {
    _redirect("control/lstruktur/"+btoa(JSON.stringify({
        perkada:$('#pperkada').val(),
        tahun:$('#ptahun').val(),
        noPembahasan:$('#ppembahasan').val(),
        pembahasanPrev:$('#ppembahasan1').val()
    })));
}
function _fstatus() {
    $('#tabelShow').html(setTabel(_.ddisposisi));
    _startTabel("tabelStruktur");
}
function _goLaporan() {
    return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
        noPembahasan:_.noPembahasan,
        pembahasanPrev:_.pembahasanPrev,
        perkada     :_.vperkada,
        tahun       :_.vtahun,
        perkadaFinal:_.perkadaFinal,
        status      :'-',
        laporan     :'4'
    }))));
}