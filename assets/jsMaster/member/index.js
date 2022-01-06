function _onload(data){
    _.dmember=data.dmember;
    _.ddinas=data.ddinas;
    _.djabatan=data.djabatan;
    

    _installVarAble({
        page:`Data Pengguna`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Data Pengguna</a></li>`,
        form:_form()
    });
    
    navBar.menu[1].menu[0].active="active";
    navBar.menu[1].menu[0].subMenu[1].status="active";

    _installAble({form:true});
    myCode=data.code;
    // viewWebsite+=_form();

    // _installMj(data);
    _startTabel("dataTabel");
}
function _form(){
    infoSupport=[];
    infoSupport1=[];

    infoSupport.push({ 
        clsBtn:`btn-outline-primary`
        ,func:"_add()"
        ,icon:`<i class="mdi mdi-note-plus"></i> Tambah Data`
        ,title:"Tambah Data"
    })
    infoSupport1.push({ 
        clsBtn:`btn-outline-secondary`
        ,func:"_refresh()"
        ,icon:`<i class="mdi mdi-refresh"></i>`
        ,title:"Refresh"
    });
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
    
    return `<div class="row">
                <div class="col-sm-12">
                    <!-- Bootstrap tab card start -->
                    <div class="card">
                        <div class="card-header" style="padding: 30px;">
                            <h5 class="col-sm-3 text-info">DATA PENGGUNA</h5>
                            <div class="card-header-right">
                                `+_btnGroupTd(infoSupport)+`
                            </div>
                        </div>
                        <div class="card-block" id='tabelShow' style="margin: auto;width:100%">
                            `+setTabel()+`
                        </div>

                        <div class="card-header">
                        <h5 class="col-sm-3 text-info">Sekretariat TAPD</h5>
                            <span>
                                Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat
                            </span>
                        </div>
                    </div>
                    <!-- Bootstrap tab card end -->
                </div>
            </div>`;
}
function setTabel() {
    return _tabelResponsive(
    {
        id:"dataTabel"
        ,isi:_tabel(
            {
                data:_.dmember
                ,no:1
                ,kolom:[
                    "nmDinas","nmJabatan","nmMember","username","password"
                ]
                ,namaKolom:[
                    "Dinas","Jabatan","Pengguna","Username","Password"
                ]
                ,action:infoSupport1
            })
    });
}
function _add(){
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formTambahMember(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_added()">SIMPAN</button>`
    });
}
function _added(){
    param={
        kdDinas     :_tamp1,
        kdJabatan   :$('#kdJabatan').val(),
        username    :$('#username').val(),
        password    :$('#password').val(),
        nmMember    :$('#nmMember').val()
    }
    if(_isNull(param.kdDinas)){return _toast({isi:msg.addNama+" Dinas"})};
    if(_isNull(param.kdJabatan)){return _toast({isi:msg.addNama+" Jabatan"})};
    if(_isNull(param.nmMember)){return _toast({isi:msg.addNama+" Pengguna"})};
    if(_isNull(param.username)){return _toast({isi:msg.username})};
    if(_isNull(param.password)){return _toast({isi:msg.password})};

    _post("Proses/inpMember",param).then(res=>{
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
        _.dmember=data.dmember;
    }
    $('#tabelShow').html(setTabel());
    _startTabel("dataTabel");
}
function _upd(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_formTambahMember(),
        bg:"bg-warning",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-warning" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    _tamp1=_.dmember[ind].kdDinas;

    _tamp2=_.dmember[ind].username.split("-");
    if(_tamp2.length==1){
        $('#username').val(_.dmember[ind].username);
    }else{
        $('#username').val(_tamp2[1]);
    }

    $('#nmMember').val(_.dmember[ind].nmMember);
    $('#idInpDropJudul').html(_.dmember[ind].nmDinas.substring(0,42));
    $('#kdJabatan').val(_.dmember[ind].kdJabatan);
    // $('#username').val(_.dmember[ind].username);
    $('#password').val(_.dmember[ind].password);
}
function _upded(ind){
    param={
        kdDinas     :_tamp1,
        kdJabatan   :$('#kdJabatan').val(),
        username    :_tamp2[0]+"-"+$('#username').val(),
        password    :$('#password').val(),
        nmMember    :$('#nmMember').val(),
        kdMember    :_.dmember[ind].kdMember
    }
    // return console.log(param);
    if(_isNull(param.kdDinas)){return _toast({isi:msg.addNama+" Dinas"})};
    if(_isNull(param.kdJabatan)){return _toast({isi:msg.addNama+" Jabatan"})};
    if(_isNull(param.nmMember)){return _toast({isi:msg.addNama+" Pengguna"})};
    if(_isNull(param.username)){return _toast({isi:msg.username})};
    if(_isNull(param.password)){return _toast({isi:msg.password})};

    _post("Proses/updMember",param).then(res=>{
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
        kdMember:_.dmember[ind].kdMember
    }
    _post("Proses/delMember",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _view(ind){
    infoSupport=[];
    infoSupport.push({name:"Kabupaten",value:_.dmember[ind].kabupaten});
    infoSupport.push({name:"Kecamatan",value:_.dmember[ind].kecamatan});
    infoSupport.push({name:"Desa",value:_.dmember[ind].desa});
    infoSupport.push({name:"no HP",value:_.dmember[ind].noHp});
    infoSupport.push({name:"Detail",value:_.dmember[ind].tambahan});
    _modalEx1({
        judul:"Informasi".toUpperCase(),
        icon:`<i class="mdi mdi-information-outline"></i>`,
        isi:_informasi2Kolom(infoSupport),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>`
    });
}
function _refresh(ind){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:"Refresh Hak Akses "+_.dmember[ind].username+" ??",
        bg:"bg-secondary",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-secondary" onclick="_refreshed(`+ind+`)">Refresh</button>`
    });
}
function _refreshed(ind){
    param={
        kdJabatan   :_.dmember[ind].kdJabatan,
        kdMember    :_.dmember[ind].kdMember
    }
    _post("Proses/refreshHakAkses",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            // _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
