function _onload(data){
    _.noPembahasan=data.noPembahasan;
    _.perkada=data.perkada;
    _.tahun=data.tahun;
    // console.log(data.btn)
    _.isi=data.isi;
    _.btn=data.btn;
    // console.log(_.btn)
    _.dabsen=data.dabsen;
    img.maxUpload=1;
    
    _installVarAble({
        page:`NOTULEN`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Dashboard</a></li>`,
        form:_form()
    });
    
    navBar.menu[6].menu[0].active="active";
    // navBar.menu[1].menu[0].subMenu[0].status="active";

    _installAble({form:true});
    myCode=data.code;
    viewWebsite+=_form();
    $('#loading').html(data.css);
    _startTextEditor();
    _startTabel("dataTabel");
}
function _form(){
    infoSupport=[];
    infoSupport1=[];
    fbtnSaveAbsensi="";
    fbtnSaveNotulen="";
    // console.log(_.btn)
    if(_.btn){
        infoSupport.push({ 
            clsBtn:`btn-success`
            ,func:"_arsipkan()"
            ,icon:`<i class="mdi mdi-note-plus text-white"></i> Kunci & Arsipkan`
            ,title:" Kunci & Arsipkan"
        })

        fbtnSaveAbsensi=_inpSejajar({
            color:"black",
            judul:"",
            isi:`
                <div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-dark text-dark" style="width: 150px;;">
                            <i class="mdi mdi-bookmark-check mr-2 text-light"></i>
                        </span>
                    </div>
                    <button class="form-control btn btn-sm btn-warning text-dark" onclick="_saveAbsensi()">Simpan Daftar Hadir</button>
                </div>
            `
        });

        fbtnSaveNotulen=_inpSejajar({
            color:"black",
            judul:"",
            isi:`
                <div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-dark text-dark" style="width: 150px;;">
                            <i class="mdi mdi-bookmark-check mr-2 text-light"></i>
                        </span>
                    </div>
                    <button class="form-control btn btn-sm btn-warning text-dark" onclick="_saveNotulen()">Simpan Notulen</button>
                </div>
            `
        });
    }
    
    fwidth="50%;";
    return _formAlbe({
        judul:"Notulen "+" <small>("+_.perkada+"-"+_.tahun+")</small>",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
        btn:_btnGroup(infoSupport),
        subJudul:`Forum TAPD Tahapan ke-`+(Number(_.noPembahasan)),
        isi:`
            <div class="col-lg-12">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs  tabs" role="tablist">
                    <li class="nav-item" style="width: `+fwidth+`;text-align: center;">
                        <a class="nav-link active" data-toggle="tab" href="#tab1" role="tab">ABSENSI</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`;text-align: center;">
                        <a class="nav-link " data-toggle="tab" href="#tab4" role="tab">FORMAT NOTULEN</a>
                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content tabs card-block">
                    <div class="tab-pane active" id="tab1" role="tabpanel">
                        `+fbtnSaveAbsensi+`
                        `+setTabel()+`
                    </div>
                    <div class="tab-pane " id="tab4" role="tabpanel">
                        `+fbtnSaveNotulen+`
                        <textarea class="form-control" id="isi" name="isi" rows="8"><div style="text-align: center;">
                            `+_.isi+`
                        </textarea>
                    </div>
                </div>
            </div>
        `
    });
}
function setTabel() {
    return _tabelResponsive(
    {
        id:"dataTabel"
        ,isi:_tabel(
            {
                data:_.dabsen
                ,no:1
                ,kolom:[
                    "nmMember","nmDinas","nmJabatan","checkbox"
                ]
                ,namaKolom:[
                    "Nama","Dinas","Jabatan","Action"
                ],
                func:"_setDaftarHadir()"
            })
    });
}
function _setDaftarHadir(ind,v) {
    _.dabsen[ind].checked=v.checked;
}

function _saveAbsensi(){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"Simpan Perubahan Daftar Hadir ?",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_saveAbsensied()">SIMPAN</button>`
    });
}
function _saveAbsensied(){
    param={
        data  :_getDataChecked(_.dabsen),
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun
    }
    if(_isNull(param.data)){return _toast({isi:"Mohon untuk mendaftarkan Anggota Forum !!!"})};

    _post("Proses/setAbsensi",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _toast({isi:"Sukses !!!",judul:"Informasi"});
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _saveNotulen(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:"Simpan perubahan pada format notulen ??",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_saveNotulened(`+ind+`)">SIMPAN</button>`
    });
}
function _saveNotulened(ind){
    param={
        notulen     :tinymce.get('isi').getContent(),
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun,
    }
    _post("Proses/saveNotulen",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _toast({isi:"Sukses !!!",judul:"Informasi"});
            return _laporan();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _laporan() {
    // return _reload();
    return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun,
        perkadaFinal:false,
        status      :"-",
        laporan     :"5"
    }))));
}
function _arsipkan(){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"<span class='text-warning row p-2 bg-dark'>proses ini akan mengunci dan mengarsipkan dokumen notulen</span><br>"
            +_inpImageView({
                id:"image",
                idView:"images",
                func:"readURL(this)",
                judul:"File Absensi",
                color:"black",
                method:"Bagus H"
            }),
        bg:"bg-success",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-success" onclick="_arsipkaned()">SIMPAN</button>`
    });
}
function _arsipkaned(){
    param={
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun,
    }
    if(img.data.length<1){return _toast({isi:msg.add+" File Absensi"})};
    _postFile("Proses/arsipkanNotulen",param,img.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}