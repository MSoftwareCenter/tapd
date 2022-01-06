function _onload(data){
    _.ddinas=data.ddinas;

    _.ptahun=data.ptahun;
    

    _.vtahun=data.tahun;
    _.vperkada=data.perkada;

    _.indT=_checkIndex(_.ptahun,_.vtahun);
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.vperkada);
    
    _installVarAble({
        page:`Data Dinas`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Data Dinas</a></li>`,
        form:_form()
    });
    
    navBar.menu[1].menu[0].active="active";
    navBar.menu[1].menu[0].subMenu[0].status="active";

    _installAble({form:true});
    myCode=data.code;
    _startTabel("dataTabel");
    $('#ptahun').val(_.vtahun);
    $('#pperkada').val(_.vperkada);
}
function _form(){
    infoSupport=[];
    infoSupport1=[];

    infoSupport.push({ 
        clsBtn:`btn-outline-primary`
        ,func:"_add()"
        ,icon:`<i class="mdi mdi-note-plus text-dark"></i> Tambah Data`
        ,title:"Tambah Data"
    })
        
    infoSupport1.push({ 
        clsBtn:`btn-outline-warning`
        ,func:"_upd()"
        ,icon:`<i class="mdi mdi-grease-pencil"></i>`
        ,title:"Perbarui"
    });
    infoSupport1.push({ 
        clsBtn:`btn-outline-danger`
        ,func:"_del()"
        ,icon:`<i class="mdi mdi-delete-forever"></i>`
        ,title:"Hapus"
    });
    return _formAlbe({
        btn:_btnGroupTd(infoSupport),
        judul:"Data Dinas",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
        isi:_sejajar({
                data:[{
                    isi:``
                },{
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
                        </div>`
                        +`<div class="input-group mb-1">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                                    <i class="mdi mdi-numeric mr-2 text-dark"></i>PERKADA
                                </span>
                            </div>
                            <select id="pperkada" class="btn text-light bg-dark  form-control">
                                `+_inpComboBox({
                                    data:_.ptahun[_.indT].perkada,
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
            +`
            <hr>
            <div class="row" id='tabelShow' style="margin: auto;width:100%">
                `+setTabel()+`
            </div>`
    });
}
function setTabel() {
    return _tabelResponsive(
    {
        id:"dataTabel"
        ,isi:_tabel(
            {
                data:_.ddinas
                ,no:1
                ,kolom:[
                    "kdDinas","nmDinas","kadis","nip","pagu$"
                ]
                ,namaKolom:[
                    "Kode","Dinas","Nama KADIS","NIP","Pagu Anggaran"
                ]
                ,action:infoSupport1
            })
    });
}
function refreshData() {
    _redirect("control/dinas/"+btoa(JSON.stringify({perkada:$('#pperkada').val(),tahun:$('#ptahun').val()})));
}
function _add(){
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formTambahDinas(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_added()">SIMPAN</button>`
    });
}
function _added(){
    param={
        kdDinas  :$('#kdDinas').val(),
        nmDinas  :$('#nmDinas').val(),
        kadis    :$('#kadis').val(),
        nip      :$('#nip').val(),
        pagu     :$('#pagu').val(),
        tahun    :_.vtahun,
        perkada  :_.vperkada
    }
    if(_isNull(param.kdDinas)){return _toast({text:msg.addKode+" Dinas"})};
    if(_isNull(param.nmDinas)){return _toast({isi:msg.addNama+" Dinas"})};
    if(_isNull(param.kadis)){return _toast({isi:msg.addNamaKepala+" Dinas"})};
    if(_isNull(param.nip)){return _toast({isi:msg.addNipKepala+" Dinas"})};

    _post("Proses/inpDinas",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _respon(data){
    if(data!=null){
        _.ddinas=data.ddinas;
    }
    $('#tabelShow').html(setTabel());
    _startTabel("dataTabel");
}
function _upd(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        bg:"bg-warning",
        isi:_formTambahDinas(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-warning" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    $('#kdDinas').val(_.ddinas[ind].kdDinas);
    $('#kdDinas').prop("disabled","true");

    $('#nmDinas').val(_.ddinas[ind].nmDinas);
    $('#kadis').val(_.ddinas[ind].kadis);
    $('#nip').val(_.ddinas[ind].nip);
    $('#pagu').val(_.ddinas[ind].pagu);


}
function _upded(ind){
    param={
        nmDinas  :$('#nmDinas').val(),
        kadis    :$('#kadis').val(),
        nip      :$('#nip').val(),
        pagu     :$('#pagu').val(),
        kdDinas  :_.ddinas[ind].kdDinas,
        perkada  :_.ddinas[ind].perkada,
        tahun  :_.ddinas[ind].tahun,
    }
    if(_isNull(param.kdDinas)){return _toast({text:msg.addKode+" Dinas"})};
    if(_isNull(param.nmDinas)){return _toast({isi:msg.addNama+" Dinas"})};
    if(_isNull(param.kadis)){return _toast({isi:msg.addNamaKepala+" Dinas"})};
    if(_isNull(param.nip)){return _toast({isi:msg.addNipKepala+" Dinas"})};

    _post("Proses/updDinas",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _del(ind){
    _modalEx1({judul:"Menghapus Usulan".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        bg:"bg-danger",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" onclick="_deled(`+ind+`)">Hapus</button>`
    })
}
function _deled(ind){
    param={
        kdDinas  :_.ddinas[ind].kdDinas,
        perkada  :_.ddinas[ind].perkada,
        tahun  :_.ddinas[ind].tahun,
    }
    _post("Proses/delDinas",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _ctahun(v) {
    _.indT=_checkIndex(_.ptahun,v.value);
    $('#pperkada').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada,
            inSelect:"Bagus H"
        })
    );
}