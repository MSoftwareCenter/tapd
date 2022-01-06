function _onload(data){
    _.drenstra=data.drenstra;
    _.ddinas=data.ddinas;
    //update tabel Setelah ada penambahan dan perubahan
    _.drenstra.updtBidang=false;
    _.drenstra.updtProgram=false;
    _.drenstra.updtKegiatan=false;
    _.drenstra.updtSub=false;
    
    _.ptahun=data.ptahun; // pembahasan tahun
    

    _.tahun=data.dtahun;
    _.perkada=data.dperkada;
    
    _.indT=_checkIndex(_.ptahun,_.tahun);
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.perkada);

    _installVarAble({
        page:`Data RENSTRA`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Data RENSTRA</a></li>`,
        form:_form()
    });
    
    navBar.menu[1].menu[0].active="active";
    navBar.menu[1].menu[0].subMenu[2].status="active";

    _installAble({form:true});
    myCode=data.code;
    // viewWebsite+=_form();

    $('#ptahun').val(_.tahun);
    $('#pperkada').val(_.perkada);

    // _installMj(data);
    _startTabel("tabelUrusan");
    _startTabel("tabelBidang");
    _startTabel("tabelProgram");
    _startTabel("tabelKegiatan");
    _startTabel("tabelSub");
    // _startTabel("tabelBidang");
    // $('.dataTables_filter').css({'float':'right'});
}
function _form(){
    fwidth="20%;";
    return _formAlbe({
        judul:"Data Renstra",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
        isi:_sejajar({
                data:[{
                    isi:""
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
                        </div>`+
                        `<div class="input-group mb-1">
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
                        </div>`+
                        `<div class="input-group mb-1">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-dark text-dark" style="width: 150px;;">
                                        <i class="mdi mdi-bookmark-check mr-2 text-light"></i>
                                    </span>
                                </div>
                                <button class="form-control btn btn-sm btn-primary" onclick="refreshData()">TAMPILKAN DATA</button>
                            </div>
                        `
                }]
            })
            +`<hr><div class="col-lg-12">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs  tabs" role="tablist">
                    <li class="nav-item" style="width: `+fwidth+`">
                        <a class="nav-link active" data-toggle="tab" href="#urusant" role="tab">URUSAN</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(1)">
                        <a class="nav-link " data-toggle="tab" href="#bidangt" role="tab">BIDANG</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(2)">
                        <a class="nav-link " data-toggle="tab" href="#programt" role="tab">PROGRAM</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(3)">
                        <a class="nav-link " data-toggle="tab" href="#kegiatant" role="tab">KEGIATAN</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(4)">
                        <a class="nav-link" data-toggle="tab" href="#subt" role="tab">SUB KEGIATAN</a>
                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content tabs card-block">
                    <div class="tab-pane active" id="urusant" role="tabpanel">
                        `+_formUrusan()+`
                    </div>
                    <div class="tab-pane " id="bidangt" role="tabpanel">
                        `+_formBidang()+`
                    </div>
                    <div class="tab-pane " id="programt" role="tabpanel">
                        `+_formProgram()+`
                    </div>
                    <div class="tab-pane " id="kegiatant" role="tabpanel">
                        `+_formKegiatan()+`
                    </div>
                    <div class="tab-pane" id="subt" role="tabpanel">
                        `+_formSub()+`
                    </div>
                </div>
            </div>
        `
    });
    
}
function refreshData() {
    _redirect("control/renstra/"+btoa(JSON.stringify({perkada:$('#pperkada').val(),tahun:$('#ptahun').val()})));
}

function _formUrusan(){
    return _inpSejajar({
        color:"black",
        judul:"",
        isi:_btn({
            color:"primary",
            judul:`<i class="mdi mdi-book-plus"></i>Tambah Data`,
            attr:"style='float:right;' onclick='_addUrusan()'",
            class:"btn btn-primary"
        })
    })+`
        <div id='tabelUrusanShow' style="margin: auto;">`
            +setTabelUrusan()
        +`</div>`;
}
function _formBidang(){
    return  `
        <div id='tabelBidangShow' style="margin: auto;">`
            +setTabelBidang()
        +`</div>`;
}
function _formProgram(){
    return  `
        <div id='tabelProgramShow' style="margin: auto;">`
            +setTabelProgram()
        +`</div>`;
}
function _formKegiatan(){
    return  `
        <div id='tabelKegiatanShow' style="margin: auto;">`
            +setTabelKegiatan()
        +`</div>`;
}
function _formSub(){
    return  `
        <div id='tabelSubShow' style="margin: auto;">`
            +setTabelSub()
        +`</div>`;
}


function setTabelUrusan() {
    ftabel=`
    <div class="table-responsive">
        <table id="tabelUrusan" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama Urusan</th>
                    <th>Aksi Urusan</th>
                    <th>Aksi Bidang</th>
                </tr>
            </thead>
            <tbody>`;
    _.drenstra.durusan.forEach((v,i) => {
        ftabel+=`
            <tr>
                <td>`+(i+1)+`</td>
                <td>`+v.nmUrusan+`</td>
                <td style="width: 15%;">
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updUrusan(`+i+`)" title="Perbarui Urusan">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delUrusan(`+i+`)" title="Hapus Urusan">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                </td>
                <td style="width: 15%;">
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addBidang(`+i+`)" title="Tambah Data Bidang">
                            <i class="mdi mdi-book-plus"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenBidang(`+i+`,this)" title="Buka Data Bidang">
                            <i class="mdi mdi-book-open-variant"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr id="bidang`+i+`" style="display: none;">
                <td>`+(i+1)+`</td>
                <td></td>
                <td style="width: 15%;">
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updUrusan(`+i+`)" title="Perbarui Urusan">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delUrusan(`+i+`)" title="Hapus Urusan">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                </td>
                <td style="width: 12%;">
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="_updUrusan(`+i+`)" title="Tambah Bidang Urusan">
                        <i class="mdi mdi-book-plus"></i> Tambah Bidang
                    </button>
                </td>
            </tr>
        `;
    }); 
                
    return ftabel+=`</tbody>
        </table>
    </div>`
}
function _addUrusan(){
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdUrusan",
            placeholder:"Kode Urusan",
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmUrusan",
            placeholder:"Nama Urusan",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedUrusan()">SIMPAN</button>`
    });
}
function _addedUrusan(){
    param={
        kd  :$('#kdUrusan').val(),
        nm  :$('#nmUrusan').val(),
        tahun:_.tahun,
        perkada:_.perkada

    }
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" Urusan"})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Urusan"})};

    _post("Proses/inpUrusan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responUrusan(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responUrusan(data){
    if(data!=null){
        _.drenstra.durusan=data.durusan;
    }
    $('#tabelUrusanShow').html(setTabelUrusan());
    _startTabel("tabelUrusan");
}
function _updUrusan(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmUrusan",
            placeholder:"Nama Urusan",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedUrusan(`+ind+`)">SIMPAN</button>`
    });
    $('#nmUrusan').val(_.drenstra.durusan[ind].nmUrusan);
}
function _updedUrusan(ind){
    param={
        kd  :_.drenstra.durusan[ind].kdUrusan,
        nm  :$('#nmUrusan').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Urusan"})};

    _post("Proses/updUrusan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responUrusan(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delUrusan(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledUrusan(`+ind+`)">Hapus</button>`
    })
}
function _deledUrusan(ind){
    param={
        kd       :_.drenstra.durusan[ind].kdUrusan,
        tahun:_.tahun,
        perkada:_.perkada
    }
    _post("Proses/delUrusan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responUrusan(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}

function _addBidang(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdBidang",
            placeholder:"Kode Bidang",
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmBidang",
            placeholder:"Nama Bidang",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedBidang(`+ind+`)">SIMPAN</button>`
    });
}
function _addedBidang(ind){
    param={
        kd      :$('#kdBidang').val(),
        kdUrusan:_.drenstra.durusan[ind].kdUrusan,
        nm      :$('#nmBidang').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" Bidang"})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Bidang"})};

    _post("Proses/inpBidang",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responBidang(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responBidang(data,ind,fall) {
    if(data!=null){
        _.drenstra.dbidang=data.dbidang;
    }
    if(fall==undefined){
        _.drenstra.updtBidang=true;
        _tamp1=ind;
        $('#bidang'+ind).css({'display':""});
        $('#bidang'+ind).html(`
            <td colspan=4>
                `+setTabelBidang(_.drenstra.durusan[ind].kdUrusan)+`
            </td>
        `)
    }else{
        if(fall){
            $('#tabelBidangShow').html(setTabelBidang());
            _startTabel("tabelBidang");
        }else{
            _.drenstra.updtBidang=true;
            $('#bidang'+_tamp1).css({'display':""});
            $('#bidang'+_tamp1).html(`
                <td colspan=4>
                    `+setTabelBidang(_.drenstra.dbidang[_tamp1].kdUrusan)+`
                </td>
            `)
        }
    }
}
function setTabelBidang(kdUrusan) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi Program</th>`;
    fidTabel="tabelBidang";
    if(kdUrusan!=undefined){
        fall=false;
        ftambahanAksi="";
        fidTabel="";
    }
    ftabel=`
    <div class="table-responsive">
        <table id="`+fidTabel+`" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama Bidang</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    
    _.drenstra.dbidang.forEach((v,i) => {
        if(fall){
            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmBidang+`</td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updBidang(`+i+`,`+fall+`)" title="Perbarui Data Bidang">
                                <i class="mdi mdi-grease-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delBidang(`+i+`,`+fall+`)" title="Hapus Data Bidang">
                                <i class="mdi mdi-delete-forever"></i>
                            </button>
                        </div>
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addProgram(`+i+`,`+fall+`)" title="Tambah Data Bidang">
                                <i class="mdi mdi-book-plus"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenProgram(`+i+`,this)" title="Buka Data Bidang">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="program`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdUrusan==v.kdUrusan){
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmBidang+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updBidang(`+i+`,`+fall+`)" title="Perbarui Urusan">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delBidang(`+i+`,`+fall+`)" title="Hapus Urusan">
                                    <i class="mdi mdi-delete-forever"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                no++;
            }
        }
        
    }); 
    return ftabel+=`</tbody>
        </table>
    </div>`
}
function _updBidang(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah bidang
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmBidang",
            placeholder:"Nama Bidang",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedBidang(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmBidang').val(_.drenstra.dbidang[ind].nmBidang);
}
function _updedBidang(ind,fall){
    param={
        kdUrusan    :_.drenstra.dbidang[ind].kdUrusan,
        kd          :_.drenstra.dbidang[ind].kdBidang,
        nm          :$('#nmBidang').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Bidang"})};

    _post("Proses/updBidang",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responBidang(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delBidang(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledBidang(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledBidang(ind,fall){
    param={
        kdUrusan    :_.drenstra.dbidang[ind].kdUrusan,
        kd          :_.drenstra.dbidang[ind].kdBidang,
        tahun:_.tahun,
        perkada:_.perkada
    }
    _post("Proses/delBidang",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responBidang(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenBidang(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#bidang'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responBidang(null,ind)
    }
}


function _addProgram(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdProgram",
            placeholder:"Kode Program",
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmProgram",
            placeholder:"Nama Program",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedProgram(`+ind+`)">SIMPAN</button>`
    });
}
function _addedProgram(ind){
    param={
        kd      :$('#kdProgram').val(),
        kdBidang:_.drenstra.dbidang[ind].kdBidang,
        nm      :$('#nmProgram').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" Program"})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Program"})};

    _post("Proses/inpProgram",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responProgram(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responProgram(data,ind,fall) {
    if(data!=null){
        _.drenstra.dprogram=data.dprogram;
    }
    if(fall==undefined){
        _tamp1=ind;
        _.drenstra.updtProgram=true;
        $('#program'+ind).css({'display':""});
        $('#program'+ind).html(`
            <td colspan=4>
                `+setTabelProgram(_.drenstra.dbidang[ind].kdBidang)+`
            </td>
        `)
    }else{
        if(fall){
            $('#tabelProgramShow').html(setTabelProgram());
            _startTabel("tabelProgram");
        }else{
            _.drenstra.updtProgram=true;
            $('#program'+_tamp1).css({'display':""});
            $('#program'+_tamp1).html(`
                <td colspan=4>
                    `+setTabelProgram(_.drenstra.dbidang[_tamp1].kdBidang)+`
                </td>
            `)
        }
    }
}
function setTabelProgram(kdBidang) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi Program</th>`;
    fidTabel="tabelProgram";
    if(kdBidang!=undefined){
        fall=false;
        fidTabel="";
        ftambahanAksi="";
    }
    ftabel=`
    <div class="table-responsive">
        <table id="`+fidTabel+`" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama Program</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    
    _.drenstra.dprogram.forEach((v,i) => {
        if(fall){
            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmProgram+`</td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updProgram(`+i+`,`+fall+`)" title="Perbarui Program">
                                <i class="mdi mdi-grease-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delProgram(`+i+`,`+fall+`)" title="Hapus Program">
                                <i class="mdi mdi-delete-forever"></i>
                            </button>
                        </div>
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addKegiatan(`+i+`,`+fall+`)" title="Tambah Data Kegiatan">
                                <i class="mdi mdi-book-plus"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenKegiatan(`+i+`,this)" title="Buka Data Kegiatan">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="kegiatan`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdBidang==v.kdBidang){
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmProgram+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updProgram(`+i+`,`+fall+`)" title="Perbarui Urusan">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delProgram(`+i+`,`+fall+`)" title="Hapus Urusan">
                                    <i class="mdi mdi-delete-forever"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                no++;
            }
        }
        
    }); 
    return ftabel+=`</tbody>
        </table>
    </div>`
}
function _updProgram(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Program
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmProgram",
            placeholder:"Nama Program",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedProgram(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmProgram').val(_.drenstra.dprogram[ind].nmProgram);
}
function _updedProgram(ind,fall){
    param={
        kdBidang    :_.drenstra.dprogram[ind].kdBidang,
        kd          :_.drenstra.dprogram[ind].kdProgram,
        nm          :$('#nmProgram').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Program"})};

    _post("Proses/updProgram",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responProgram(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delProgram(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledProgram(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledProgram(ind,fall){
    param={
        kdBidang    :_.drenstra.dprogram[ind].kdBidang,
        kd          :_.drenstra.dprogram[ind].kdProgram,
        tahun:_.tahun,
        perkada:_.perkada
    }
    _post("Proses/delProgram",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responProgram(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenProgram(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#program'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responProgram(null,ind)
    }
}


function _addKegiatan(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdKegiatan",
            placeholder:"Kode Kegiatan",
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmKegiatan",
            placeholder:"Nama Kegiatan",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedKegiatan(`+ind+`)">SIMPAN</button>`
    });
}
function _addedKegiatan(ind){
    param={
        kd      :$('#kdKegiatan').val(),
        kdProgram:_.drenstra.dprogram[ind].kdProgram,
        nm      :$('#nmKegiatan').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" Kegiatan"})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Kegiatan"})};

    _post("Proses/inpKegiatan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responKegiatan(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responKegiatan(data,ind,fall) {
    if(data!=null){
        _.drenstra.dkegiatan=data.dkegiatan;
    }
    if(fall==undefined){
        _.drenstra.updtKegiatan=true;
        _tamp1=ind;
        $('#kegiatan'+ind).css({'display':""});
        $('#kegiatan'+ind).html(`
            <td colspan=4>
                `+setTabelKegiatan(_.drenstra.dprogram[ind].kdProgram)+`
            </td>
        `)
    }else{
        if(fall){
            $('#tabelKegiatanShow').html(setTabelKegiatan());
            _startTabel("tabelKegiatan");
        }else{
            _.drenstra.updtKegiatan=true;
            $('#kegiatan'+_tamp1).css({'display':""});
            $('#kegiatan'+_tamp1).html(`
                <td colspan=4>
                    `+setTabelKegiatan(_.drenstra.dprogram[_tamp1].kdProgram)+`
                </td>
            `)
        }
    }
}
function setTabelKegiatan(kdProgram) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi Sub Kegiatan</th>`;
    fidTabel="tabelKegiatan";
    if(kdProgram!=undefined){
        fall=false;
        ftambahanAksi="";
        fidTabel="";
    }
    ftabel=`
    <div class="table-responsive">
        <table id="`+fidTabel+`" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama Kegiatan</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    
    _.drenstra.dkegiatan.forEach((v,i) => {
        if(fall){
            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmKegiatan+`</td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updKegiatan(`+i+`,`+fall+`)" title="Perbarui Kegiatan">
                                <i class="mdi mdi-grease-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delKegiatan(`+i+`,`+fall+`)" title="Hapus Kegiatan">
                                <i class="mdi mdi-delete-forever"></i>
                            </button>
                        </div>
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub(`+i+`,`+fall+`)" title="Tambah Data Kegiatan">
                                <i class="mdi mdi-book-plus"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub(`+i+`,this)" title="Buka Data Kegiatan">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="sub`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdProgram==v.kdProgram){
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmKegiatan+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updKegiatan(`+i+`,`+fall+`)" title="Perbarui Urusan">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delKegiatan(`+i+`,`+fall+`)" title="Hapus Urusan">
                                    <i class="mdi mdi-delete-forever"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                no++;
            }
        }
        
    }); 
    return ftabel+=`</tbody>
        </table>
    </div>`
}
function _updKegiatan(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Kegiatan
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmKegiatan",
            placeholder:"Nama Kegiatan",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedKegiatan(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmKegiatan').val(_.drenstra.dkegiatan[ind].nmKegiatan);
}
function _updedKegiatan(ind,fall){
    param={
        kdProgram   :_.drenstra.dkegiatan[ind].kdProgram,
        kd          :_.drenstra.dkegiatan[ind].kdKegiatan,
        nm          :$('#nmKegiatan').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Kegiatan"})};

    _post("Proses/updKegiatan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responKegiatan(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delKegiatan(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledKegiatan(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledKegiatan(ind,fall){
    param={
        kdProgram    :_.drenstra.dkegiatan[ind].kdProgram,
        kd          :_.drenstra.dkegiatan[ind].kdKegiatan,
        tahun:_.tahun,
        perkada:_.perkada
    }
    _post("Proses/delKegiatan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responKegiatan(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenKegiatan(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#kegiatan'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responKegiatan(null,ind)
    }
}


function _addSub(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpDropdonwSelected({
            judul:"Dinas",
            id:"content",
            idJudul:"judul",
            idData:"dsData",
            data:_.ddinas,
            bgSearch:"#2e2727;"
        })+_inpGroupPrepend({
            id:"kdSub",
            placeholder:"Kode Sub",
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub",
            placeholder:"Nama Sub",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub(ind){
    param={
        kdDinas     :_tamp1,
        kd          :$('#kdSub').val(),
        kdKegiatan  :_.drenstra.dkegiatan[ind].kdKegiatan,
        nm          :$('#nmSub').val(),
        tahun:_.tahun,
        perkada:_.perkada
    }
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" Sub"})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Sub"})};

    _post("Proses/inpSub",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub(data,ind,fall) {
    if(data!=null){
        _.drenstra.dsub=data.dsub;
    }
    if(fall==undefined){
        _.drenstra.updtSub=true;
        _tamp1=ind;
        $('#sub'+ind).css({'display':""});
        $('#sub'+ind).html(`
            <td colspan=4>
                `+setTabelSub(_.drenstra.dkegiatan[ind].kdKegiatan)+`
            </td>
        `)
    }else{
        if(fall){
            $('#tabelSubShow').html(setTabelSub());
            _startTabel("tabelSub");
        }else{
            _.drenstra.updtSub=true;
            $('#sub'+_tamp1).css({'display':""});
            $('#sub'+_tamp1).html(`
                <td colspan=4>
                    `+setTabelSub(_.drenstra.dkegiatan[_tamp1].kdKegiatan)+`
                </td>
            `)
        }
    }
}
function setTabelSub(kdKegiatan) {
    fall=true;
    fclose="";
    fidTabel="tabelSub";
    if(kdKegiatan!=undefined){
        fall=false;
        fidTabel="";
    }
    ftabel=`
    <div class="table-responsive">
        <table id="`+fidTabel+`" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama Sub</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>`;
    no=1;
    
    _.drenstra.dsub.forEach((v,i) => {
        if(fall){
            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub+`</td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub(`+i+`,`+fall+`)" title="Perbarui Sub">
                                <i class="mdi mdi-grease-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub(`+i+`,`+fall+`)" title="Hapus Sub">
                                <i class="mdi mdi-delete-forever"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdKegiatan==v.kdKegiatan){
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub(`+i+`,`+fall+`)" title="Perbarui Urusan">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub(`+i+`,`+fall+`)" title="Hapus Urusan">
                                    <i class="mdi mdi-delete-forever"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
                no++;
            }
        }
        
    }); 
    return ftabel+=`</tbody>
        </table>
    </div>`
}
function _updSub(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub",
            placeholder:"Nama Sub",
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub').val(_.drenstra.dsub[ind].nmSub);
}
function _updedSub(ind,fall){
    param={
        kdKegiatan  :_.drenstra.dsub[ind].kdKegiatan,
        kd          :_.drenstra.dsub[ind].kdSub,
        nm          :$('#nmSub').val(),
        kdDinas     :_.drenstra.dsub[ind].kdDinas,
        tahun:_.tahun,
        perkada:_.perkada
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Sub"})};

    _post("Proses/updSub",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub(ind,fall){
    param={
        kdKegiatan  :_.drenstra.dsub[ind].kdKegiatan,
        kd          :_.drenstra.dsub[ind].kdSub,
        kdDinas     :_.drenstra.dsub[ind].kdDinas,
        tahun:_.tahun,
        perkada:_.perkada
    }
    _post("Proses/delSub",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub(null,ind)
    }
}


function _checkUpdTabel(posisi) {
    switch(posisi){
        case 1: //bidang
            if(_.drenstra.updtBidang){
                _responBidang(null,0,true);
                _.drenstra.updtBidang=false;
            }
        break;
        case 2: //Program
            if(_.drenstra.updtProgram){
                _responProgram(null,0,true);
                _.drenstra.updtProgram=false;
            }
        break;
        case 3: //Kegiatan
            if(_.drenstra.updtKegiatan){
                _responKegiatan(null,0,true);
                _.drenstra.updtKegiatan=false;
            }
        break;
        case 4: //Sub
            if(_.drenstra.updtSub){
                _responSub(null,0,true);
                _.drenstra.updtSub=false;
                _startTabel("tabelSub");
            }
        break;
    }
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