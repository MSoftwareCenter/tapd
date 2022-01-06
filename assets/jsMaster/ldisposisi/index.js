function _onload(data){
    _.ddisposisi=data.ddisposisi;
    _.dtujuan=data.dtujuan;
    _.dtujuan1=data.dtujuan1;
    _.dtujuan2=data.dtujuan2;
    
    _.perkada=data.perkada;

    
    // console.log(data.ddisposisi);
    
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
        page:`Laporan Disposisi`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Laporan Disposisi</a></li>`,
        form:_form()
    });
    
    navBar.menu[7].menu[0].active="active";
    navBar.menu[7].menu[0].subMenu[1].status="active";

    _installAble({form:true});
    myCode=data.code;
    
    _.cdata=0;  // count data tabel
    
    _fstatus();

    $('#ptahun').val(_.vtahun);
    $('#pperkada').val(_.vperkada);
    $('#ppembahasan').val(_.noPembahasan);
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
}

function setTabel(data){
    fdata=`
    <div class="table-responsive">
        <table id="dataTabel" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th >Perangkat Daerah</th>
                    <th >Uraian</th>
                    <th>Disposisi 1</th>
                    <th>Disposisi 2</th>
                    <th>Disposisi 3</th>
                </tr>
            </thead>
            <tbody>`;

    no=1;
    fminwidth="100px";
    data.forEach((v,i) => {
        ftd1='';
        ftd2='';
        ftd3='';
        if(_.qlap){
            ftd1=`<div class="btn-group mr-2">
                    <button type="button" id="bt00" class="btn btn-sm btn-dark" onclick="_updNull(`+i+`,1)" title='Perbarui'>
                        <i class="mdi mdi-grease-pencil"></i>add</button>
                </div>`;
            ftd2=`<div class="btn-group mr-2">
                    <button type="button" id="bt00" class="btn btn-sm btn-dark" onclick="_updNull(`+i+`,2)" title='Perbarui'>
                        <i class="mdi mdi-grease-pencil"></i>add</button>
                </div>`;
            ftd3=`<div class="btn-group mr-2">
                    <button type="button" id="bt00" class="btn btn-sm btn-dark" onclick="_updNull(`+i+`,3)" title='Perbarui'>
                        <i class="mdi mdi-grease-pencil"></i>add</button>
                </div>`;
        }
        v1=v.data[0];
        try {
            if(v1.files.length>0){
                ftd1=` <div class="btn-group mr-2">
                            <button type="button" id="bt00" class="btn btn-sm btn-outline-warning" onclick="_upd(`+i+`,1)" title='Perbarui'>
                                <i class="mdi mdi-grease-pencil"></i>`+v1.nmTujuanBupati+`
                            </button>
                        </div>`;
                if(v1.files1.length>0){
                    ftd2=`<div class="btn-group mr-2">
                            <button type="button" id="bt00" class="btn btn-sm btn-outline-primary" onclick="_upd(`+i+`,2)" title='`+v1.nmTujuanDisposisi1+`'>
                                <i class="mdi mdi-grease-pencil"></i>
                                `+v1.nmTujuanDisposisi1.substring(0,20)+`
                            </button>
                        </div>`;
                }
                if(v1.files2.length>0){
                    ftd3=` <div class="btn-group mr-2">
                                <button type="button" id="bt00" class="btn btn-sm btn-outline-success" onclick="_upd(`+i+`,3)" title='`+v1.nmTujuanDisposisi2+`'>
                                    <i class="mdi mdi-grease-pencil"></i>`+v1.nmTujuanDisposisi2.substring(0,20)+`
                                </button>
                            </div>`;
                }
            }
        } catch (error) {
            
        }

        fwidth="130px;"
        fdata+=`
            <tr style="padding:5px">
                <td>`+no+`</td>
                <td>`+v.nmDinasReal+`</td>
                <td>`+v.nmUsulan+`</td>
                <td>`+ftd1+`</td>
                <td>`+ftd2+`</td>
                <td>`+ftd3+`</td>
            </tr>`;
        no++;
    });   
    return fdata+=`</tbody>
        </table>
    </div>`
}
function refreshData() {
    _redirect("control/ldisposisi/"+btoa(JSON.stringify({
        perkada:$('#pperkada').val(),
        tahun:$('#ptahun').val(),
        noPembahasan:$('#ppembahasan').val()
    }))+"/"+_.xxx
    );
}
function _fstatus() {
    $('#tabelShow').html(setTabel(_.ddisposisi));
    _startTabel("dataTabel");
}
function _infoUsulan(ind) {
    infoSupport=[];
    // console.log(_.dusulan[ind]);
    
    try {
        infoSupport.push({name:"Kajian Teknis",value:_.ddisposisi[ind].penimbang});
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
function _goLaporan() {
    return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
        noPembahasan:_.noPembahasan,
        perkada     :_.vperkada,
        tahun       :_.vtahun,
        perkadaFinal:_.perkadaFinal,
        status      :'-',
        laporan     :'3'
    }))));
}


function _updNull(ind,key){
    fadd='';
    if(_.qlap){
        fadd+=`<button type="button" class="btn btn-primary" onclick="_updNulled(`+ind+`,`+key+`)">Simpan</button>`;
    }
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-check-all"></i>`
        ,isi:_formDisposisi()+
            _inpImageView({
                id:"image",
                idView:"images",
                func:"readURL(this)",
                judul:"File Disposisi",
                color:"black",
                method:"Bagus H"
            }),
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`+fadd
    });
}
function _updNulled(ind,key){
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        perkada     :_.perkada,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,
        tglTerima:$('#tglTerima').val(),
        tglPenyelsaian:$('#tglPenyelsaian').val(),
        isi:$('#isi').val(),
        key:key
    }

    switch (key) {
        case 1:
            param.tujuanBupati=_.dtujuan[Number($('#tujuan').val())].value;
            param.nmTujuanBupati=_.dtujuan[Number($('#tujuan').val())].valueName;
        break;
        case 2:
            param.tujuanBupati=_.dtujuan1[Number($('#tujuan').val())].value;
            param.nmTujuanBupati=_.dtujuan1[Number($('#tujuan').val())].valueName;
        break;
        case 3:
            param.tujuanBupati=_.dtujuan2[Number($('#tujuan').val())].value;
            param.nmTujuanBupati=_.dtujuan2[Number($('#tujuan').val())].valueName;
        break;
    }
    
    if(_isNull(param.tglTerima)){return _toast({isi:msg.add+" Tanggal Terima Disposisi"})};
    if(_isNull(param.tglPenyelsaian)){return _toast({isi:msg.add+" Tanggal Penyelsaian Disposisi"})};
    if(_isNull(param.tujuanBupati)){return _toast({isi:msg.add+" Tujuan Disposisi"})};
    if(_isNull(param.isi)){return _toast({isi:msg.add+" Isi Disposisi"})};

    fkondisi=true;
    try {// untuk data yang belum ada
        if(_.ddisposisi[ind].data[0].files.length!=0){
            fkondisi=false;
        }
    } catch (error) {
        
    }
    // _log(fkondisi,_.ddisposisi[ind].data[0].files);
    if(img.data.length<1 && fkondisi){return _toast({isi:msg.add+" File Disposisi"})};

    _postFile("Proses/saveDisposisiAll",param,img.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _upd(ind,key){
    ftam=_.ddisposisi[ind].data[0];
    fbtnView="";
    switch (key) {
        case 1:
            if(ftam.files.length>0){
                fbtnView=_inpSejajar({
                    color:"black",
                    judul:"View File",
                    isi:`
                        <button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewDisposisi('`+ftam.files+`')">Tampilkan</button>
                    `
                });
            }
        break;
        case 2:
            if(ftam.files1.length>0){
                fbtnView=_inpSejajar({
                    color:"black",
                    judul:"View File",
                    isi:`
                        <button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewDisposisi('`+ftam.files1+`')">Tampilkan</button>
                    `
                });
            }
        break;
        case 3:
            if(ftam.files2.length>0){
                fbtnView=_inpSejajar({
                    color:"black",
                    judul:"View File",
                    isi:`
                        <button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewDisposisi('`+ftam.files2+`')">Tampilkan</button>
                    `
                });
            }
        break;
    }
    fadd='';
    if(_.qlap){
        fadd+=`<button type="button" class="btn btn-primary" onclick="_upded(`+ind+`,`+key+`)">Simpan</button>`;
    }
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-check-all"></i>`
        ,isi:_formDisposisi()
        +fbtnView
        +_inpImageView({
            id:"image",
            idView:"images",
            func:"readURL(this)",
            judul:"File Disposisi",
            color:"black",
            method:"Bagus H"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`+fadd
    });
    ftam=_.ddisposisi[ind].data[0];
    switch (key) {
        case 1:
            $('#tujuanBupati').html(
                _inpComboBox({
                    color:"black",
                    data:_.dtujuan,
                    selected:1,
                    index:"Bagus H",
                    inSelect:"Bagus H"
                })
            );

            $('#tglTerima').val(ftam.tglTerima);
            $('#tglPenyelsaian').val(ftam.tglPenyelsaian);
            $('#tujuanBupati').val(_checkIndex(_.dtujuan,ftam.nmTujuanBupati));
            $('#isi').val(ftam.isi);
        break;
        case 2:
            $('#tujuanBupati').html(
                _inpComboBox({
                    color:"black",
                    data:_.dtujuan1,
                    selected:1,
                    index:"Bagus H",
                    inSelect:"Bagus H"
                })
            );

            $('#tglTerima').val(ftam.tglTerima1);
            $('#tglPenyelsaian').val(ftam.tglPenyelsaian1);
            $('#tujuanBupati').val(_checkIndex(_.dtujuan1,ftam.nmTujuanDisposisi1));
            $('#isi').val(ftam.isi1);
        break;
        case 3:
            $('#tujuanBupati').html(
                _inpComboBox({
                    color:"black",
                    data:_.dtujuan2,
                    selected:1,
                    index:"Bagus H",
                    inSelect:"Bagus H"
                })
            );

            $('#tglTerima').val(ftam.tglTerima2);
            $('#tglPenyelsaian').val(ftam.tglPenyelsaian2);
            $('#tujuanBupati').val(_checkIndex(_.dtujuan2,ftam.nmTujuanDisposisi2));
            $('#isi').val(ftam.isi2);
        break;
    }
}
function _upded(ind,key){
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        perkada     :_.perkada,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,
        tglTerima:$('#tglTerima').val(),
        tglPenyelsaian:$('#tglPenyelsaian').val(),
        isi:$('#isi').val(),
        key:key
    }

    switch (key) {
        case 1:
            param.tujuanBupati=_.dtujuan[Number($('#tujuan').val())].value;
            param.nmTujuanBupati=_.dtujuan[Number($('#tujuan').val())].valueName;
        break;
        case 2:
            param.tujuanBupati=_.dtujuan1[Number($('#tujuan').val())].value;
            param.nmTujuanBupati=_.dtujuan1[Number($('#tujuan').val())].valueName;
        break;
        case 3:
            param.tujuanBupati=_.dtujuan2[Number($('#tujuan').val())].value;
            param.nmTujuanBupati=_.dtujuan2[Number($('#tujuan').val())].valueName;
        break;
    }
    
    if(_isNull(param.tglTerima)){return _toast({isi:msg.add+" Tanggal Terima Disposisi"})};
    if(_isNull(param.tglPenyelsaian)){return _toast({isi:msg.add+" Tanggal Penyelsaian Disposisi"})};
    if(_isNull(param.tujuanBupati)){return _toast({isi:msg.add+" Tujuan Disposisi"})};
    if(_isNull(param.isi)){return _toast({isi:msg.add+" Isi Disposisi"})};
    
    _postFile("Proses/saveDisposisiAll",param,img.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}

function _viewDisposisi(files){
    return _redirectOpen("control/viewImageSet/"+btoa(JSON.stringify(({nama:"fileDisposisi/"+files}))));
}