function _onload(data){
    _.djsatuan=data.djsatuan;
    _.dgbarang=data.dgbarang;

    _installVarMj();
    navBar.menu[3].menu[0].active="active";
    viewWebsite=_judulContent({page:"Input Barang",prevPage:"Dashboard"});
    
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
                ,text:"Data Barang"
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
                data:_.dgbarang
                ,no:1
                ,kolom:[
                    "nmGB","jumlahS$","hargaT$","hargaG$","hargaE$"
                ]
                ,namaKolom:[
                    "Nama","Jumlah","Harga Terima","Harga Grosir","Harga Eceran"
                ]
                ,action:infoSupport1
            })
    });
}
function _add(){
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formTambahBarang(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_added()">SIMPAN</button>`
    });
}
function _added(){
    param={
        kdJS    :$('#kdJS').val(),
        nmGB    :$('#nmGB').val(),
        jumlahS :$('#jumlahS').val(),
        hargaT  :$('#hargaT').val(),
        hargaG  :$('#hargaG').val(),
        hargaE  :$('#hargaE').val(),
        kdScan  :$('#kdScan').val()
    }
    if(_isNull(param.kdJS)){return _toast({isi:msg.nmSatuan})};
    if(_isNull(param.nmGB)){return _toast({isi:msg.nama})};
    if(_isNull(param.jumlahS)){return _toast({isi:msg.jumlahS})};
    if(_isNull(param.hargaT)){return _toast({isi:msg.hargaT})};
    if(_isNull(param.hargaG)){return _toast({isi:msg.hargaG})};
    if(_isNull(param.hargaE)){return _toast({isi:msg.hargaE})};

    _post("Proses/inpGBarang",param).then(res=>{
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
        _.dgbarang=data.dgbarang;
    }
    $('#tabelShow').html(setTabel());
    _startTabel("dataTabel");
}
function _upd(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_formTambahBarang(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    $('#kdJS').val(_.dgbarang[ind].kdJS);
    $('#nmGB').val(_.dgbarang[ind].nmGB);
    $('#jumlahS').val(_.dgbarang[ind].jumlahS);
    $('#hargaT').val(_.dgbarang[ind].hargaT);
    $('#hargaG').val(_.dgbarang[ind].hargaG);
    $('#hargaE').val(_.dgbarang[ind].hargaE);
    $('#kdScan').val(_.dgbarang[ind].kdScan);
}
function _upded(ind){
    param={
        kdJS    :$('#kdJS').val(),
        nmGB    :$('#nmGB').val(),
        jumlahS :$('#jumlahS').val(),
        hargaT  :$('#hargaT').val(),
        hargaG  :$('#hargaG').val(),
        hargaE  :$('#hargaE').val(),
        kdGB    :_.dgbarang[ind].kdGB,
        noUpd   :_.dgbarang[ind].noUpd,
        kdScan  :$('#kdScan').val()
    }
    if(_isNull(param.kdJS)){return _toast({isi:msg.nmSatuan})};
    if(_isNull(param.nmGB)){return _toast({isi:msg.nama})};
    if(_isNull(param.jumlahS)){return _toast({isi:msg.jumlahS})};
    if(_isNull(param.hargaT)){return _toast({isi:msg.hargaT})};
    if(_isNull(param.hargaG)){return _toast({isi:msg.hargaG})};
    if(_isNull(param.hargaE)){return _toast({isi:msg.hargaE})};

    _post("Proses/updGBarang",param).then(res=>{
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
        kdGB    :_.dgbarang[ind].kdGB
    }
    _post("Proses/delGBarang",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}