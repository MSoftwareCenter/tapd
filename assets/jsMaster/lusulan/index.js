function _onload(data){
    _.dkelompok =data.dkelompok;
    _.djenis    =data.djenis;
    _.dsub      =data.dsub;
    _.ddinas    =data.ddinas;
    _.kdDinas   =data.kdDinas;

    
    _.dusulan=data.dusulan;
    // console.log(data.xxx);
    
    _.dstatus=data.dstatus;
    _.dlaporan=data.dlaporan;    
    _.perkadaFinal=data.perkadaFinal;

    _.ptahun=data.ptahun;
    
    _.vtahun=data.tahun;
    _.vperkada=data.perkada;
    _.noPembahasan=data.noPembahasan;
    

    _.indT=_checkIndex(_.ptahun,_.vtahun);
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.vperkada);

    _.xxx=data.xxx;
    _.qlap=data.qlab;
    
    _installVarAble({
        page:`Laporan Usulan`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Laporan Usulan</a></li>`,
        form:_form()
    });
    
    navBar.menu[7].menu[0].active="active";
    navBar.menu[7].menu[0].subMenu[0].status="active";

    _installAble({form:true});
    myCode=data.code;
    
    _.cdata=0;  // count data tabel
    _fstatus({value:"-"});

    $('#ptahun').val(_.vtahun);
    $('#pperkada').val(_.vperkada);
    $('#ppembahasan').val(_.noPembahasan);
}
function _form(){
    return _formAlbe({
        // btn:_btnGroupTd(infoSupport),
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
                                    <i class="mdi mdi-numeric mr-2 text-dark"></i>PERKADA
                                </span>
                            </div>
                            <select id="pperkada" onchange="_cperkada(this)" class="btn text-light bg-dark  form-control">
                                `+_inpComboBox({
                                    data:_.ptahun[_.indT].perkada,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>`
                },{
                    isi:`<div class="input-group mb-1">
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
                        </div>
                        <div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-dark text-dark" style="width: 150px;;">
                                    <i class="mdi mdi-bookmark-check mr-2 text-light"></i>
                                </span>
                            </div>
                            <button class="form-control btn btn-sm btn-primary" onclick="refreshData()">TAMPILKAN DATA</button>
                        </div>`
                }]
            })
            +`<hr>`
            +_sejajar({
                data:[{
                    isi:`<div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                                    <i class="mdi mdi-calendar mr-2 text-dark"></i>Status
                                </span>
                            </div>
                            <select id="pstatus" class="btn text-light bg-dark  form-control" onchange="_fstatus(this)">
                                `+_inpComboBox({
                                    data:_.dstatus,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>`
                },{
                    isi:`
                        <div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-dark text-light" style="width: 140px;;">
                                    <i class="mdi mdi-calendar mr-2 text-dark"></i>Laporan
                                </span>
                            </div>
                            <select id="plaporan" class="btn text-light bg-primary  form-control" onchange="_goLaporan(this)">
                                `+_inpComboBox({
                                    data:_.dlaporan,
                                    inSelect:"Bagus H"
                                })+`
                            </select>
                        </div>`
                }]
            })
            +`
            <hr>
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
}

function setTabel(data){
    infoSupport=[];
    infoSupport.push({ 
        clsBtn:`btn-outline-secondary `
        ,func:"_infoUsulan()"
        ,icon:`<i class="mdi mdi-information-variant text-dark"></i> `
        ,title:"Informasi"
    });
    if(_.qlap){
        infoSupport.push({ 
            clsBtn:`btn-outline-warning`,
            icon:`<i class="mdi mdi-grease-pencil"></i>`,
            func:"_upd()",
            title:"Perbarui"
        });
    }
    fdata=`
    <div class="table-responsive">
        <table id="dataTabel" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th >Perangkat Daerah</th>
                    <th >Uraian</th>
                    
                    <th>volome</th>
                    <th>Satuan</th>
                    <th>Nilai Satuan</th>
                    <th>Jumlah</th>

                    <th>Status</th>
                    <th>Keterangan</th>
                    <th>Action</th>
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
    fminwidth="100px";
    data.forEach((v,i) => {
        if(v.satx==undefined || v.satx.length==0){
            v.satx=v.sat;
        }

        fdterima=`
            <td>`+_$(v.vol)+`</td>
            <td>`+v.sat+`</td>
            <td>`+_$(v.nilai)+`</td>
            <td>`+_$((parseFloat(v.nilai)*parseFloat(v.vol)).toFixed(2))+`</td>
        `;
        if(v.keterangan=="DISETUJUI"){
            fdterima=`
                <td>`+_$(v.volx)+`</td>
                <td>`+v.satx+`</td>
                <td>`+_$(v.nilaix)+`</td>
                <td>`+_$((parseFloat(v.nilaix)*parseFloat(v.volx)).toFixed(2))+`</td>
            `;
        }
        fdata+=`
            <tr style="padding:5px">
                <td>`+no+`</td>
                <td>`+v.nmDinas+`</td>
                <td>`+v.nmUsulan+`</td>
                `+fdterima+`
                <td style="min-width:`+fminwidth+`;">
                    `+v.keterangan+`
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+v.keteranganx+`
                </td>
                <td style="min-width:150px;text-center;">`+_btnGroup(infoSupport,i)+`</td>
            </tr>`;
        no++;
    });   
    return fdata+=`</tbody>
        </table>
    </div>`
}
function refreshData() {
    _redirect("control/lusulan/"+btoa(JSON.stringify({
        perkada:$('#pperkada').val(),
        tahun:$('#ptahun').val(),
        noPembahasan:$('#ppembahasan').val()
    }))+"/"+_.xxx
    );
}
function _fstatus(v1) {
    ftam=[];
    if(v1.value=="-"){
        ftam=_.dusulan;
    }else{
        _.dusulan.forEach(v => {
            if(v.keterangan==v1.value){
                ftam.push(v);
            }
        });
    }

    if(ftam.length>0){
        _.cdata=true;
    }else{
        _.cdata=false;
    }
    $('#tabelShow').html(setTabel(ftam));
    _startTabel("dataTabel");
}
function _infoUsulan(ind) {
    infoSupport=[];
    // console.log(_.dusulan[ind]);
    
    try {
        infoSupport.push({name:"Kajian Teknis",value:_.dusulan[ind].penimbang});
        infoSupport.push({name:"Hasil Kajian Teknis",value:_.dusulan[ind].pertimbangan});
        if(_.dusulan[ind].filePertimbangan.length>0){
            infoSupport.push({name:"File Kajian Teknis",value:`<button type="button" class="btn btn-sm btn-block btn-primary" onclick="_viewPertimbangan('`+_.dusulan[ind].filePertimbangan+`')">Tampilkan</button>`});
        }   
        if(_.dusulan[ind].files.length>0){
            infoSupport.push({name:"File Tela`ahan Staf",value:`<button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewPertimbangan('`+_.dusulan[ind].files+`')">Tampilkan</button>`});
        }
    } catch (error) {
        return _toast({isi:"Informasi usulan ini tidak tersedia !!!",cheader:"bg-warning",judul:"Informasi"});
    }
    _modalEx1({
        judul:"Informasi".toUpperCase(),
        icon:`<i class="mdi mdi-information-outline"></i>`,
        isi:_informasi2Kolom(infoSupport),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>`
    });
}
function _goLaporan(v) {
    if(v.value!="-"){
        return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
            noPembahasan:_.noPembahasan,
            perkada     :_.vperkada,
            tahun       :_.vtahun,
            perkadaFinal:_.perkadaFinal,
            status      :$('#pstatus').val(),
            laporan     :v.value
        }))));
        // if(_.cdata){
        //     return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
        //         noPembahasan:_.noPembahasan,
        //         perkada     :_.vperkada,
        //         tahun       :_.vtahun,
        //         perkadaFinal:_.perkadaFinal,
        //         status      :$('#pstatus').val(),
        //         laporan     :v.value
        //     }))));
        // }   
        // return _toast({isi:"Data tidak di temukan !!!"});
    }
}


function _setVolume(v) {
    fnum=Number($('#nilai').val());
    hitung(Number(v.value),fnum);
}
function _setTotal(v) {
    fnum=Number($('#volume').val());
    hitung(Number(v.value),fnum);
}
function hitung(vol,tot) {
    if(tot>0){
        vol*=tot;
    }
    $('#total').val(_$(vol));
}

function _upd(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_formTambahUsulan()
            +_inpImageView({
                id:"file",
                idView:"files",
                judul:"Dokumen Tela'ahan Staf (PDF)",
                color:"black",
                func:"readFile(this)"
            }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    index=-1;
    _.dkelompok.forEach((v,i) => {
        if(v.kdSub1==_.dusulan[ind].kdSub1){
            index=i;
        }
    });
    
    // console.log(_.dusulan[ind]);
    _selectKelompok({value:index});
    $('#kdKelompok').val(index);
    $('#idInpDropDinas').html(_.ddinas[_checkIndex(_.ddinas,_.dusulan[ind].kdDinas)].valueName)
    $('#idInpDropjenis').html(_getDropJenis(ind));
    $('#idInpDropSub').html(_.dusulan[ind].nmSub);
    $('#nomor').val(_.dusulan[ind].no);
    $('#tanggal').val(_.dusulan[ind].date);
    $('#volume').val(_.dusulan[ind].vol);
    $('#satuan').val(_.dusulan[ind].sat);
    $('#nilai').val(_.dusulan[ind].nilai);
    $('#usulan').val(_.dusulan[ind].nmUsulan);

    hitung(_.dusulan[ind].vol,_.dusulan[ind].nilai);
    _.noPembahasan=_.dusulan[ind].noPembahasan;
    _.svKdKelompok=_.dusulan[ind].kdSub1;
    _.svKdJenis=_.dusulan[ind].kdSubJenis;
    _.svKdSub=_.dusulan[ind].kdSub;
    
}
function _upded(ind){
    param={
        noPembahasan:_.dusulan[ind].noPembahasan,
        perkada     :_.dusulan[ind].perkada,
        tahun       :_.dusulan[ind].tahun,

        kdKelompok  :_.svKdKelompok,
        kdJenis     :_.svKdJenis,
        kdSub       :_.svKdSub,
        kdDinas     :_.kdDinas,
        usulan      :$('#usulan').val(),
        nomor       :$('#nomor').val(),
        tanggal     :$('#tanggal').val(),
        volume      :$('#volume').val(),
        satuan      :$('#satuan').val(),
        nilai       :$('#nilai').val(),
        kdUsulan    :_.dusulan[ind].kdUsulan
    }
    // return console.log(param);
    if(_isNull(param.kdKelompok)){return _toast({isi:msg.addKode+" Kelompok"})};
    if(_isNull(param.kdJenis)){return _toast({isi:msg.addKode+" Jenis Kelompok"})};
    
    if(Number($('#kdKelompok').val())==1){
        if(_isNull(param.kdSub)){return _toast({isi:msg.addKode+" Sub Kegiatan"})};
    }

    if(_isNull(param.usulan)){return _toast({isi:msg.add+" Usulan"})};
    if(_isNull(param.nomor)){return _toast({isi:msg.add+" Nomor"})};

    if(_isNull(param.tanggal)){return _toast({isi:msg.add+" Tanggal"})};
    if(_isNull(param.volume)){return _toast({isi:msg.add+" Volume"})};
    if(_isNull(param.satuan)){return _toast({isi:msg.add+" Satuan"})};
    if(_isNull(param.nilai)){return _toast({isi:msg.add+" Nilai Satuan"})};

    _postFile("Proses/updUsulanx",param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _selectKelompok(v){
    $('#idInpDropjenis').html("Jenis Anggaran");
    _.svKdJenis=undefined;
    _.index=Number(v.value);
    _.svKdKelompok=_.dkelompok[_.index].value;
    _multiDropdonwSearch({
        data:_.djenis[Number(v.value)],
        idData:"djenis",
        id:"jenis",
        value:"",
        func:"_selectJenis",
        idDropdonw:"idInpDropjenis",
    });

    $('#jikaBelanja').css({'display':"none"});
    if(Number(v.value)==1){
        $('#jikaBelanja').css({'display':""});
    }
}
function _getDropJenis(ind) {
    switch (_.dusulan[ind].noTabelSub) {
        case "1":
            return _.dusulan[ind].nmSub1;
        break;
        case "2":
            return _.dusulan[ind].nmSub2;
        break;
        case "3":
            return _.dusulan[ind].nmSub3;
        break;
        case "4":
            return _.dusulan[ind].nmSub4;
        break;
        case "5":
            return _.dusulan[ind].nmSub5;
        break;
        case "6":
            return _.dusulan[ind].nmSub6;
        break;
        case "7":
            return _.dusulan[ind].nmSub7;
        break;
    }
}

function _selectKelompok(v){
    $('#idInpDropjenis').html("Jenis Anggaran");
    _.svKdJenis=undefined;
    _.index=Number(v.value);
    _.svKdKelompok=_.dkelompok[_.index].value;
    _multiDropdonwSearch({
        data:_.djenis[Number(v.value)],
        idData:"djenis",
        id:"jenis",
        value:"",
        func:"_selectJenis",
        idDropdonw:"idInpDropjenis",
    });

    $('#jikaBelanja').css({'display':"none"});
    if(Number(v.value)==1){
        $('#jikaBelanja').css({'display':""});
    }
}

function _selectJenis(idForDrop,id,value,valueName){
    _.svKdJenis=value;
    $("#"+id).html(valueName.substring(0,50));
    return _showForDropSelect(idForDrop);
}
function _selectSub(idForDrop,id,value,valueName){
    _.svKdSub=value;
    $("#"+id).html(valueName.substring(0,50));
    return _showForDropSelect(idForDrop);
}
function _selectDinas(idForDrop,id,value,valueName){
    if(_.kdDinas!=value){ // hawatir jika dinasnya sama, maka tidak usa lakukan perubahan data
        _.kdDinas=value;
        _.svKdSub="";
        _postNoLoad("proses/changeSubKeg",{kdDinas:_.kdDinas}).then(res=>{
            res=JSON.parse(res);
            if(res.exec){
                _responDinas(res.data);
            }else{
                return _toast({isi:res.msg});
            }
        })
    }
    $("#"+id).html(valueName.substring(0,50));
    return _showForDropSelect(idForDrop);
}
function _responDinas(data) {
    if(data!=null){
        _.dsub=data.dsub;
    }
    _formSearchSub({value:""})
}

function _formSearchJenis(v){
    // return _log(_.djenis[_.index]);
    _multiDropdonwSearch({
        data:_.djenis[_.index],
        idData:"djenis",
        id:"jenis",
        value:v.value,
        func:"_selectJenis",
        idDropdonw:"idInpDropjenis",
    })
}
function _formSearchSub(v){
    _multiDropdonwSearch({
        data:_.dsub,
        idData:"dsub",
        id:"sub",
        value:v.value,
        func:"_selectSub",
        idDropdonw:"idInpDropSub",
    })
}
function _formSearchDinas(v){
    _multiDropdonwSearch({
        data:_.ddinas,
        idData:"ddinas",
        id:"dinas",
        value:v.value,
        func:"_selectDinas",
        idDropdonw:"idInpDropDinas",
    })
}
function _viewPertimbangan(files){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify(({files:files}))));
}
