function _onload(data){
    _.djabatan=data.djabatan;
    img.maxUpload=1;

    _installVarMj();
    navBar.menu[1].menu[0].active="active";
    viewWebsite=_judulContent({page:"Input Data Jabatan",prevPage:"Dashboard"});
    
    infoSupport=[];
    infoSupport1=[];

    infoSupport.push(_btnGroup(
        [
            { 
                clsBtn:`btn-outline-primary`
                ,func:"_add()"
                ,icon:`<i class="mdi mdi-note-plus"></i>`
                ,title:"Tambah Data"
            }
        ])
    )
        
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
    viewWebsite+=`<div class='row'>
        `+_informasi_icon_btn({
                icon:'<i class="mdi mdi-file-check"></i>'
                ,text:"Data Jabatan"
                ,btn:infoSupport
            },
            `<div id='tabelShow' style="margin: auto;">`
                +setTabel()
            +`</div>`
        )
    +`<div>`;
        
    _installMj(data);
    _startTabel("dataTabel");
}
function setTabel() {
    return _tabelResponsive(
    {
        id:"dataTabel"
        ,isi:_tabel(
            {
                data:_.djabatan
                ,no:1
                ,kolom:[
                    "nmJabatan"
                ]
                ,namaKolom:[
                    "Nama Jabatan"
                ]
                ,action:infoSupport1
            })
    });
}
function _add(){
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formTambahJabatan(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_added()">SIMPAN</button>`
    });
}
function _added(){
    param={
        nmJabatan:$('#nmJabatan').val()
    }
    if(_isNull(param.nmJabatan)){return _toast({isi:msg.nmJabatan})};

    _post("Proses/inpJabatan",param).then(res=>{
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
        _.djabatan=data.djabatan;
    }
    $('#tabelShow').html(setTabel());
    _startTabel("dataTabel");
}
function _upd(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_formTambahJabatan(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    $('#nmJabatan').val(_.djabatan[ind].nmJabatan);
}
function _upded(ind){
    param={
        nmJabatan:$('#nmJabatan').val(),
        kdJabatan:_.djabatan[ind].kdJabatan
    }
    if(_isNull(param.nmJabatan)){return _toast({isi:msg.nmJabatan})};

    _post("Proses/updJabatan",param).then(res=>{
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
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deled(`+ind+`)">Hapus</button>`
    })
}
function _deled(ind){
    param={
        kdJabatan:_.djabatan[ind].kdJabatan
    }
    _post("Proses/delJabatan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}