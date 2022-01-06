function _onload(data){
    _.dkelompok =data.dkelompok;
    _.djenis    =data.djenis;
    _.dsub      =data.dsub;
    _.ddinas    =data.ddinas;
    _.kdDinas   =data.kdDinas;
    _.dusulan   =data.dusulan;

    _.dstatus   =data.dstatus;
    _.dstatusx   =data.dstatus;

    _.setInput=0;

    _.ptahun=data.ptahun;

    _.noPembahasan=data.noPembahasan;
    _.perkada       =data.perkada;
    _.tahun=data.tahun;

    // _.indT=_checkIndex(_.ptahun,_.tahun);
    // _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.perkada);
    _.indT=0;
    _.indP=0;

   

    _.progres=Number(data.progres);
    _.finals=Number(data.finals);

    if(Number(_.noPembahasan)>0 && !_.finals){
        _.dpendapatan=data.dpendapatan;
        _.dbelanja=data.dbelanja;
        _.dpembiayaan=data.dpembiayaan;
        _.dall=data.dall;
    }else{
        _.pembahasan=data.pembahasan;
    }

    _.totalPagux=0;
    _.totalPagux=0;

    
    _.totalPendapatan=0;
    _.totalPendapatanx=0;
    _.totalBelanja=0;
    _.totalBelanjax=0;
    _.totalPembiayaan=0;
    _.totalPembiayaanx=0;
    
    _.btnTahun=true;
    _.qbtnAddPerkada=data.qbtnAddPerkada;

    // for ins usulan
    _.index=0;
    try {
        _.svKdKelompok=_.dkelompok[0].kdSub1;
    } catch (error) {
        
    }
    _.svKdJenis="";
    _.svKdSub="";

    
    //update tabel Setelah ada penambahan dan perubahan
    _.updStruktur=false;
    
    
    _installVarAble({
        page:`Forum TAPD`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Dashboard</a></li>`,
        form:_form()
    });
    
    navBar.menu[5].menu[0].active="active";
    // navBar.menu[1].menu[0].subMenu[2].status="active";

    data.dinfo.forEach((v,i) => {
        if(i==0){
            list=[];
            _notif=true;
        }
        list.push({url:router+v.url,textSmall:v.fitur,text:v.date+"<br>"+v.isiNotif});
    });


    _installAble({form:true});
    myCode=data.code;
    // viewWebsite+=_form();

    if(!_.btnTahun){
        // $('#btnTahun').prop("disabled",true);
        $('#btnTahun').html("");
    }

    // _installMj(data);
    _startTabel("tpendapatan");
    _startTabel("tbelanja");
    _startTabel("tpembiayaan");
    _startTabel("tabelStruktur");
    

    // _startTabel("tabelBidang");
    // $('.dataTables_filter').css({'float':'right'});
    // $('.pcoded-navbar').toggle();
    if(_notif){
        $('.header-notification').addClass("active");
        $('#shownotification').toggle();
    }
}    
function _form(){
    fwidth="50%;";
    infoSupport=[];
    if(!_.finals){
        if(_.progres){
            infoSupport.push({ 
                clsBtn:`btn-outline-primary`
                ,func:"_addUsulan()"
                ,icon:`<i class="mdi mdi-note-plus text-dark"></i>Tambah Usulan`
                ,title:"Tambah Usulan"
            })
            infoSupport.push({ 
                clsBtn:`btn-outline-success`
                ,func:"_tutupForum()"
                ,icon:`<i class="mdi mdi-bookmark-check text-dark"></i>Simpan Hasil Pembahasan`
                ,title:"Simpan"
            })
        }else{
            infoSupport.push({ 
                clsBtn:`btn-outline-primary`
                ,func:"_bukaForum()"
                ,icon:`<i class="mdi mdi-note-plus text-dark"></i>Mulai Pembahasan Forum`
                ,title:"Mulai"
            })
        }
    }
    
    if(Number(_.noPembahasan)>0 && !_.finals){
        return _formAlbe({
            judul:"Data APBD",
            judulFooter:"Sekretariat TAPD",
            deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
            btn:_btnGroup(infoSupport),
            subJudul:`Forum TAPD Tahapan ke-`+(Number(_.noPembahasan)),
            isi:`
                <div class="col-lg-12">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs  tabs" role="tablist">
                        <li class="nav-item" style="width: `+fwidth+`;text-align: center;">
                            <a class="nav-link active" data-toggle="tab" href="#tab1" role="tab">PEMBAHASAN</a>
                        </li>
                        <li class="nav-item" style="width: `+fwidth+`;text-align: center;   " onclick="_checkUpdTabel(4)">
                            <a class="nav-link " data-toggle="tab" href="#tab4" role="tab">STRUKTUR APBD</a>
                        </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content tabs card-block">
                        <div class="tab-pane active" id="tab1" role="tabpanel">
                            `+formPembahasan()+`
                        </div>
                        <div class="tab-pane " id="tab4" role="tabpanel">
                            `+_formStruktur()+`
                        </div>
                    </div>
                </div>
            `
        });
    }else{
        infoSupport=[];
        infoSupport.push({ 
            clsBtn:`btn-outline-primary`
            ,func:"_nextPembahasan()"
            ,icon:`<i class="mdi mdi-note-plus text-dark"></i>Mulai TAPD`
            ,title:"Tambah Data"
        });
        return _formAlbe({
            judul:"Pengaturan Forum",
            judulFooter:"Sekretariat TAPD",
            deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
            isi:`<div class="row">
                    <div class="col-xl-8 col-md-12">
                        `+_formAlbe({
                            judul:"Daftar Tahun Pembahasan",
                            isi:`
                            <div  id='tabelShowTahun' style="margin: auto;width:100%">
                                `+setTabelPembahasanTahun()+`
                            </div>
                            `
                        })+`
                    </div>
                    </div>
                    <div class="col-xl-4 col-md-12">`+
                            _formAlbe({
                                judul:"Form Tambah Tahun",
                                isi:`
                                <label class="label label-inverse-info-border bg-warning">
                                    setelah penambahan tahun, maka pembahasan ditahun sebelumnya akan di non aktifkan.
                                    <br>
                                </label>
                                `+_formAddPembahasan()+`
                                <div class="row" style="margin-left:5px;margin-bottom:10px;" id="btnTahun">
                                    <button type="button" class="btn btn-block btn-outline-primary" onclick="_addTahunPembahasan()">
                                        <i class="mdi mdi-note-plus text-primary"></i>
                                        Tambah
                                    </button>
                                </div>
                                `
                            })
                        +`
                    </div>
                </div>
                
            `
        });;
    }
}

// form sebelum ada pembahasan
function setTabelPembahasanTahun(){
    ftam=`<thead>
            <tr>
                <th>no</th>
                <th>Tahun</th>
                <th>PERKADA</th>
                <th>Pembahasan</th>
                <th>Action</th>
            </tr>
        </thead>`;
    _.pembahasan.forEach((v,i) => {
        fbtn="";
        // console.log(v);
        if(v.finalPembahasan==1 && _.noPembahasan==v.noPembahasan && v.finalPerkada==0 && v.jumlah>0){
            fbtn=`
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="true" title="Donwload" onclick="_toggle('.dropdown-menu')">
                            <i class="mdi mdi-cloud-download mr-2"></i>
                            Pengaturan
                        </button>
                        <div class="dropdown-menu " x-placement="top-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, -76px, 0px);">
                            <button class="dropdown-item" onclick="_nextPembahasan(`+i+`)">Buat Pembahasan Selanjutnya</button>
                            <button class="dropdown-item" onclick="_kunciPerkada(`+i+`)">Kunci Hasil Perkada</button>
                        </div>
                    </div>
                `;
                _.btnTahun=false; 
        }else if(v.finalPerkada==1 && v.jumlah>0 && _.noPembahasan==v.noPembahasan  && _.perkada==v.perkada){
            fbtn=`
            <button type="button" class="btn btn-outline-primary" onclick="_nextPerkada(`+i+`)">
                <i class="mdi mdi-cloud-download mr-2"></i>
                Perkada Selanjutnya
            </button>`;
        }else if(v.jumlah==0){
            fbtn=`
            <button type="button" class="btn btn-outline-primary" onclick="_nextPembahasan(`+i+`)">
                <i class="mdi mdi-cloud-download mr-2"></i>
                Mulai FORUM TAPD PERKADA ke-`+v.perkada+`
            </button>`;
            _.btnTahun=false; 
        }
        ftam+=`
        <tbody>
            <tr>
                <td>`+(i+1)+`</td>
                <td>`+v.tahun+`</td>
                <td>`+v.perkada+`</td>
                <td>`+v.jumlah+`</td>
                <td style="min-width: 15%;">
                    `+fbtn+`
                </td>
            </tr>
        </tbody>
        `;
    });
    return _tabelResponsive({
        id:"tabelTahun"
        ,isi:ftam
    })
}
function _addTahunPembahasan(){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"Tambahkan Tahun Pembahasan ???",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addTahunPembahasaned()">Tambah</button>`
    });
}
function _addTahunPembahasaned(){
    param={
        tahun   :$('#tahunPembahasan').val(),
    }
    _post("Proses/setTahunPembahasan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            // _responTahun(res.data);
            _redirect("control/logout");
            // _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responTahun(data){
    if(data!=null){
        _.pembahasan=data.pembahasan;
    }
    $('#tabelShowTahun').html(setTabelPembahasanTahun());
    // _startTabel("tabelUrusan");
}
function _nextPembahasan(ind){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_span({text:"Tambahkan Tahapan Selanjunya ???<br>"})+
        _inpImageView({
            id:"file",
            idView:"files",
            judul:"File Undangan TAPD    (PDF)",
            color:"black",
            func:"readFile(this)"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_nextPembahasaned(`+ind+`)">SIMPAN</button>`
    });
}
function _nextPembahasaned(ind){
    param={
        tahun   :_.pembahasan[ind].tahun,
        perkada :_.pembahasan[ind].perkada,
        no      :_.pembahasan[ind].noPembahasan
    }
    if(_file.data.length==0){return _toast({isi:msg.add+" File Undangan TAPD"})};
    _postFile("Proses/setNextPembahasan",param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _redirect("control/logout")
        }else{
            return _toast({isi:res.msg});
        }
    })
}

function _kunciPerkada(ind) {
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_span({
            text:"kunci dan arsipkan pembahasan pada perkada "+_.perkada+" ???",
            class:" bg-dark text-warning p-2"
        })+"<br>"+
        _inpImageView({
            id:"file",
            idView:"files",
            judul:"Upload Perkada (PDF)",
            color:"black",
            func:"readFile(this)"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_kunciPerkadaed(`+ind+`)">SIMPAN</button>`
    });
}
function _kunciPerkadaed(ind){
    param={
        tahun   :_.pembahasan[ind].tahun,
        perkada :_.pembahasan[ind].perkada,
        no      :_.pembahasan[ind].noPembahasan
    }
    if(_file.data.length==0){return _toast({isi:msg.add+" File Perkada (PDF)"})};
    _postFile("Proses/kunciPerkada",param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _nextPerkada(ind){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_span({text:"Tambahkan Perkada Selanjunya ???<br>"})+
        _inpImageView({
            id:"file",
            idView:"files",
            judul:"File Perkada TAPD    (PDF)",
            color:"black",
            func:"readFile(this)"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_nextPerkadaed(`+ind+`)">SIMPAN</button>`
    });
}
function _nextPerkadaed(ind){
    param={
        tahun   :_.pembahasan[ind].tahun,
        perkada :_.pembahasan[ind].perkada,
        no      :_.pembahasan[ind].noPembahasan
    }
    if(_file.data.length==0){return param.namaFile="Bagus Hartiansyah"};
    _postFile("Proses/setNextPerkada",param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _redirect("control/logout")
        }else{
            return _toast({isi:res.msg});
        }
    })
}


function _bukaForum(){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:`<b>Mulai Pembahasan Pada Forum TAPD</b> ?<br>
            <small>dengan mulainya pembahasan ini maka proses penginputan usulah oleh OPD-TAPD akan ditutup.</small>
        `,
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_bukaForumed()">Mulai Pembahasan</button>`
    });
}
function _bukaForumed(){    
    _post("Proses/bukaForum",{}).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _tutupForum(){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:" Simpan hasil pembahasan serta mangakhiri forum TAPD ???",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_tutupForumed()">SIMPAN</button>`
    });
}
function _tutupForumed(){
    _post("Proses/akhiriForum",{}).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}


function formPembahasan(){
    margin="10px;";
    // style="background-color: #9ec5b5;"
    return `
        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#fpendapatan" class="d-block card-header py-3 collapsed" onclick="_toggle('#fpendapatan')" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardExample" style="background-color: #9ec5b5;">
                <div class="row">
                    <div class="col-auto  mt-auto mb-auto">
                        <i class="mdi mdi-arrow-right-bold-circle  text-dark"></i>
                    </div>
                    
                    <div class="col-10  mt-auto mb-auto">
                        <h6 class="m-0 font-weight-bold text-dark">PENDAPATAN</h6>
                    </div>
                    <div class="col-auto  mt-auto mb-auto dropdown-toggle" style="text-align: end;">
                    </div>
                </div>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse" id="fpendapatan" style="margin: `+margin+`;">
                `+_formPendapatan()+`
            </div>
        </div>

        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#fbelanja" class="d-block card-header py-3 collapsed" data-toggle="collapse" onclick="_toggle('#fbelanja')" role="button" aria-expanded="false" aria-controls="collapseCardExample" style="background-color: #9ec5b5;">
                <div class="row">
                    <div class="col-auto  mt-auto mb-auto">
                        <i class="mdi mdi-cart text-dark"></i>
                    </div>
                    
                    <div class="col-10  mt-auto mb-auto">
                        <h6 class="m-0 font-weight-bold text-dark">BELANJA</h6>
                    </div>
                    <div class="col-auto  mt-auto mb-auto dropdown-toggle" style="text-align: end;">
                    </div>
                </div>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse" id="fbelanja" style="margin: `+margin+`;">
                `+_formBelanja()+`
            </div>
        </div>

        <div class="card shadow mb-4">
            <!-- Card Header - Accordion -->
            <a href="#fpembiayaan" class="d-block card-header py-3 collapsed" onclick="_toggle('#fpembiayaan')" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseCardExample" style="background-color: #9ec5b5;">
                <div class="row">
                    <div class="col-auto  mt-auto mb-auto">
                        <i class="mdi mdi-arrow-left-bold-circle  text-dark"></i>
                    </div>
                    
                    <div class="col-10  mt-auto mb-auto">
                        <h6 class="m-0 font-weight-bold text-dark">PEMBIAYAAN</h6>
                    </div>
                    <div class="col-auto  mt-auto mb-auto dropdown-toggle" style="text-align: end;">
                    </div>
                </div>
            </a>
            <!-- Card Content - Collapse -->
            <div class="collapse" id="fpembiayaan" style="margin: `+margin+`;">
                `+_formPembiayaan()+`
            </div>
        </div>
    `;
}

function _formPendapatan(){
    _.totalPagu=0;
    _.totalPagux=0;
    infoSupport=[];
    
    if(_.progres && !_.finals){
        infoSupport.push({ 
            clsBtn:`btn-outline-warning `
            ,func:"_infoPendapatan()"
            ,icon:`<i class="mdi mdi-information-variant text-dark"></i> `
            ,title:"Informasi"
        });
        infoSupport.push({ 
            clsBtn:`btn-outline-primary `
            ,func:"_savePendapatan()"
            ,icon:`<i class="mdi mdi-note-plus text-dark"></i> Simpan`
            ,title:"Simpan"
        });
    }else{
        infoSupport.push({ 
            clsBtn:`btn-outline-danger`
            ,icon:`<i class="mdi mdi-lock"></i>Terkunci`
            ,title:"TERKUNCI"
        });
    }
    
    fdata=`
        <div id='tabelPendapatanShow' style="margin: auto;">`
            +setTabelAll(_.dpendapatan,1)
        +`</div>
        <hr>
        <b>
        `+_sejajar({
            data:[{
                isi:_inpSejajar({
                    color:"black",
                    judul:"TOTAL PAGU USULAN",
                    isi:_span({text:"<b>Rp. "+_$(_.totalPagu)+"</b>",id:"tpaguPendapatan"})
                })
            },{
                isi:_inpSejajar({
                    color:"black",
                    judul:"TOTAL PAGU USULAN DI TERIMA",
                    isi:_span({text:"<b>Rp. "+_$(_.totalPagux)+"</b>",id:"tpaguxPendapatan"})
                })
            }]
        })+
        `</b>
        <hr>
    `;
    _.totalPendapatan   =_.totalPagu;
    _.totalPendapatanx  =_.totalPagux;
    return fdata;
}
function _formBelanja(){
    _.totalPagu=0;
    _.totalPagux=0;
    infoSupport=[];
    if(_.progres && !_.finals){
        infoSupport.push({ 
            clsBtn:`btn-outline-warning `
            ,func:"_infoBelanja()"
            ,icon:`<i class="mdi mdi-information-variant text-dark"></i> `
            ,title:"Informasi"
        });
        infoSupport.push({ 
            clsBtn:`btn-outline-primary`
            ,func:"_saveBelanja()"
            ,icon:`<i class="mdi mdi-note-plus text-dark"></i> Simpan`
            ,title:"Simpan"
        });
    }else{
        infoSupport.push({ 
            clsBtn:`btn-outline-danger`
            ,icon:`<i class="mdi mdi-lock"></i>Terkunci`
            ,title:"TERKUNCI"
        });
    }
    
    
    fdata=`
        <div id='tabelBelanjaShow' style="margin: auto;">`
            +setTabelAll(_.dbelanja,2)
        +`</div>
        <hr>
        <b>
        `+_sejajar({
            data:[{
                isi:_inpSejajar({
                    color:"black",
                    judul:"TOTAL PAGU USULAN",
                    isi:_span({text:"<b>Rp. "+_$(_.totalPagu)+"</b>",id:"tpaguBelanja"})
                })
            },{
                isi:_inpSejajar({
                    color:"black",
                    judul:"TOTAL PAGU USULAN DI TERIMA",
                    isi:_span({text:"<b>Rp. "+_$(_.totalPagux)+"</b>",id:"tpaguxBelanja"})
                })
            }]
        })+
        `</b>
        <hr>`;

    _.totalBelanja=_.totalPagu;
    _.totalBelanjax=_.totalPagux;
    return fdata;
}
function _formPembiayaan(){
    _.totalPagu=0;
    _.totalPagux=0;
    infoSupport=[];
    if(_.progres && !_.finals){
        infoSupport.push({ 
            clsBtn:`btn-outline-warning `
            ,func:"_infoPembiayaan()"
            ,icon:`<i class="mdi mdi-information-variant text-dark"></i> `
            ,title:"Informasi"
        });
        infoSupport.push({ 
            clsBtn:`btn-outline-primary`
            ,func:"_savePembiayaan()"
            ,icon:`<i class="mdi mdi-note-plus text-dark"></i> Simpan`
            ,title:"Simpan"
        });
    }else{
        infoSupport.push({ 
            clsBtn:`btn-outline-danger`
            ,icon:`<i class="mdi mdi-lock"></i>Terkunci`
            ,title:"TERKUNCI"
        });
    }
    
    
    fdata= `
        <div id='tabelPembiayaanShow' style="margin: auto;">`
            +setTabelAll(_.dpembiayaan,3)
        +`</div>
        <hr>
        <b>
        `+_sejajar({
            data:[{
                isi:_inpSejajar({
                    color:"black",
                    judul:"TOTAL PAGU USULAN",
                    isi:_span({text:"<b>Rp. "+_$(_.totalPagu)+"</b>",id:"tpaguPembiayaan"})
                })
            },{
                isi:_inpSejajar({
                    color:"black",
                    judul:"TOTAL PAGU USULAN DI TERIMA",
                    isi:_span({text:"<b>Rp. "+_$(_.totalPagux)+"</b>",id:"tpaguxPembiayaan"})
                })
            }]
        })+
        `</b>
        <hr>`;
    _.totalPembiayaan=_.totalPagu;
    _.totalPembiayaanx=_.totalPagux;
    return fdata;
}
function _formStruktur(){
    return `
        <div id='tabelStrukturShow' style="margin: auto;">`
            +setTabelStruktur()
        +`</div>`;
}


function setTabelAll(data,keyCode) {
    fid='';
    switch(keyCode){
        case 1:fid='tpendapatan';break;
        case 2:fid='tbelanja';break;
        case 3:fid='tpembiayaan';break;
        case 4:fid='tabelPendapatan';break;
    }
    fdata=`
    <div class="table-responsive">
        <table id="`+fid+`" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th rowspan=2>no</th>
                    <th rowspan=2>Perangkat Daerah</th>
                    <th rowspan=2>Uraian</th>
                    
                    <th colspan=4 style="text-align:center;">USULAN OPD</th>
                    <th colspan=4 style="text-align:center;">Forum TAPD</th>

                    <th rowspan=2>Status</th>
                    <th rowspan=2>Keterangan</th>
                    <th rowspan=2>Action</th>
                </tr>
                <tr>
                    <th>volome</th>
                    <th>Satuan</th>
                    <th>Nilai Satuan</th>
                    <th>Jumlah</th>
                    
                    <th>volome</th>
                    <th>Satuan</th>
                    <th>Nilai Satuan</th>
                    <th>Jumlah</th>
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
        ftampStatus=_.dstatus;
        _.dstatus.forEach((v1,i) => {
            ftampStatus[i].selected=0;
            if(v.keterangan.length!=0 && v1.value==v.keterangan){
                ftampStatus[i].selected=1;
            }
        });
        
        data[i].totalPrev=(parseFloat(v.nilaix)*parseFloat(v.volx));
        fdata+=`
            <tr style="padding:5px">
                <td>`+no+`</td>
                <td>`+v.nmDinas+`</td>
                <td>`+v.nmUsulan+`</td>
                <td>`+_$(v.vol)+`</td>

                <td>`+v.sat+`</td>
                <td>`+_$(v.nilai)+`</td>
                <td>`+_$((parseFloat(v.nilai)*parseFloat(v.vol)).toFixed(2))+`</td>
                <td style="min-width:`+fminwidth+`;">
                    `+_inp({
                        type:"number",
                        hint:"1000000",
                        id:"volume"+keyCode+""+i,
                        attr:" onchange='_setVolumeTAPD("+keyCode+","+i+",this)'  value='"+v.volx+"'"
                    })+`
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+_inp({
                        type:"text",
                        hint:v.sat,
                        id:"satuan"+keyCode+""+i,
                        attr:" value='"+v.satx+"'"
                    })+`
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+_inp({
                        type:"number",
                        hint:"1000000",
                        id:"nilai"+keyCode+""+i,
                        attr:" onchange='_setTotalTAPD("+keyCode+","+i+",this)'  value='"+v.nilaix+"'"
                    })+`
                </td>
                <td id="jumlah`+keyCode+``+i+`" style="min-width:`+fminwidth+`;">
                    `+_$((parseFloat(v.nilaix)*parseFloat(v.volx)).toFixed(2))+`
                </td>
                <td style="min-width:`+fminwidth+`;" id="status`+keyCode+``+i+`">
                    <select id="pstatus`+keyCode+``+i+`" class="btn text-light bg-dark  form-control">
                        `+_inpComboBox({
                            data:ftampStatus,
                            inSelect:"Bagus H"
                        })+`
                    </select>
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+_textArea({
                        hint:"Keterangan",
                        id:"keterangan"+keyCode+""+i,
                        row:"3",
                        text:v.keteranganx
                    })+`
                </td>
                <td style="min-width:150px;">`+_btnGroup(infoSupport,i)+`</td>
            </tr>`;

            ftam=(parseFloat(v.nilai)*parseFloat(v.vol)).toFixed(2);
            ftam1=(parseFloat(v.nilaix)*parseFloat(v.volx)).toFixed(2);
            v.totalx=ftam1;
            v.totalTam=ftam1;
            _.totalPagu +=parseFloat(ftam);
            if(ftam1!=0){
                _.totalPagux+=parseFloat(ftam1);
            }
        no++;
    }); 
                
    return fdata+=`</tbody>
        </table>
    </div>`
}

// for tabel pembahasan jika dibutuhkan  
function hitungMinMaxPersen(pagu,paguNext,keyCode,ind) {
    fpagu=parseFloat(pagu);
    fpaguNext=parseFloat(paguNext);
    if(fpagu<=0){
        return {
            hitung:_$(fpaguNext),
            persen:"100 %"
        }
    }
   
    fhasilView="";
    fpersenView="";
    fmin=0;
    if(fpaguNext>fpagu){
        fmin=fpaguNext-fpagu;
        fhasilView=_$(fmin);
    }else{
        fmin=fpagu-fpaguNext;
        fhasilView="( "+_$(fmin)+" )";
    }
    fpersen=(fmin*100)/fpagu;
    fpersenView=fpersen.toFixed(2)+" %";

    switch(keyCode){
        case 1: //pendapatan
            _.dpendapatan[ind].keyCode=keyCode;
            _.dpendapatan[ind].pagu1=fpaguNext;
            _.dpendapatan[ind].sum=fmin;
            _.dpendapatan[ind].persentase=fpersen.toFixed(2);
        break;
        case 2: //belanja
            _.dbelanja[ind].keyCode=keyCode;
            _.dbelanja[ind].pagu1=fpaguNext;
            _.dbelanja[ind].sum=fmin;
            _.dbelanja[ind].persentase=fpersen.toFixed(2);
        break;
        case 3: //pendapatan
            _.dpembiayaan[ind].keyCode=keyCode;
            _.dpembiayaan[ind].pagu1=fpaguNext;
            _.dpembiayaan[ind].sum=fmin;
            _.dpembiayaan[ind].persentase=fpersen.toFixed(2);
        break;
    }

    return {
        hitung:fhasilView,
        persen:fpersenView
    }
}
function _setPaguPenyesuaian(v,ind,keyCode,pagu){
    hasil=hitungMinMaxPersen(pagu,v.value,keyCode,ind);
    $('#status'+keyCode+''+ind).html(hasil.hitung);
    $('#persentase'+keyCode+''+ind).html(hasil.persen);
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
function setTabelStruktur() {
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
    </div>`
}


function _setVolumeTAPD(key,ind,v) {
    switch(key){
        case 1:
            _.dpendapatan[ind].totalTam=0;
            _.dpendapatan[ind].volx=v.value; 
            if(_.dpendapatan[ind].volx!=undefined && _.dpendapatan[ind].volx!=0){
                _.dpendapatan[ind].totalTam=_.dpendapatan[ind].volx;
            }
        
            if(_.dpendapatan[ind].nilaix!=undefined && _.dpendapatan[ind].nilaix!=0){
                _.dpendapatan[ind].totalTam=(parseFloat(_.dpendapatan[ind].totalTam)*parseFloat(_.dpendapatan[ind].nilaix)).toFixed(2);
            }else{
                _.dpendapatan[ind].totalTam=0;
            }
            // $('#jumlah'+key+""+ind).html((_.dpendapatan[ind].totalx));
            $('#jumlah'+key+""+ind).html(_$(_.dpendapatan[ind].totalTam));
        break;
        case 2:
            _.dbelanja[ind].totalTam=0;
            _.dbelanja[ind].volx=v.value; 
            if(_.dbelanja[ind].volx!=undefined && _.dbelanja[ind].volx!=0){
                _.dbelanja[ind].totalTam=_.dbelanja[ind].volx;
            }else{
                _.dpendapatan[ind].totalTam=0;
            }
        
            if(_.dbelanja[ind].nilaix!=undefined && _.dbelanja[ind].nilaix!=0){
                _.dbelanja[ind].totalTam=(parseFloat(_.dbelanja[ind].totalTam)*parseFloat(_.dbelanja[ind].nilaix)).toFixed(2);
            }
            $('#jumlah'+key+""+ind).html(_$(_.dbelanja[ind].totalTam));
        break;
        case 3:
            _.dpembiayaan[ind].totalTam=0;
            _.dpembiayaan[ind].volx=v.value; 
            if(_.dpembiayaan[ind].volx!=undefined && _.dpembiayaan[ind].volx!=0){
                _.dpembiayaan[ind].totalTam=_.dpembiayaan[ind].volx;
            }else{
                _.dpendapatan[ind].totalTam=0;
            }
        
            if(_.dpembiayaan[ind].nilaix!=undefined && _.dpembiayaan[ind].nilaix!=0){
                _.dpembiayaan[ind].totalTam=(parseFloat(_.dpembiayaan[ind].totalTam)*parseFloat(_.dpembiayaan[ind].nilaix)).toFixed(2);
            }
            $('#jumlah'+key+""+ind).html(_$(_.dpembiayaan[ind].totalTam));
        break;
        case 4:_.dpendapatan[ind].volx=v.value; 
        break;
    }
}
function _setTotalTAPD(key,ind,v) {
    switch(key){
        case 1:_.dpendapatan[ind].nilaix=v.value; break;
        case 2:_.dbelanja[ind].nilaix=v.value; break;
        case 3:_.dpembiayaan[ind].nilaix=v.value; break;
        case 4:_.dpendapatan[ind].nilaix=v.value; break;
    }
    switch(key){
        case 1:
            _.dpendapatan[ind].totalTam=0;
            _.dpendapatan[ind].nilaix=v.value; 
            if(_.dpendapatan[ind].volx!=undefined && _.dpendapatan[ind].volx!=0){
                _.dpendapatan[ind].totalTam=_.dpendapatan[ind].volx;
            }
        
            if(_.dpendapatan[ind].nilaix!=undefined && _.dpendapatan[ind].nilaix!=0){
                _.dpendapatan[ind].totalTam=(parseFloat(_.dpendapatan[ind].totalTam)*parseFloat(_.dpendapatan[ind].nilaix)).toFixed(2);
            }else{
                _.dpendapatan[ind].totalTam=0;
            }

            $('#jumlah'+key+""+ind).html(_$(_.dpendapatan[ind].totalTam));
        break;
        case 2:
            _.dbelanja[ind].totalTam=0;
            _.dbelanja[ind].nilaix=v.value; 
            if(_.dbelanja[ind].volx!=undefined && _.dbelanja[ind].volx!=0){
                _.dbelanja[ind].totalTam=_.dbelanja[ind].volx;
            }
        
            if(_.dbelanja[ind].nilaix!=undefined && _.dbelanja[ind].nilaix!=0){
                _.dbelanja[ind].totalTam=(parseFloat(_.dbelanja[ind].totalTam)*parseFloat(_.dbelanja[ind].nilaix)).toFixed(2);
            }else{
                _.dbelanja[ind].totalTam=0;
            }

            $('#jumlah'+key+""+ind).html(_$(_.dbelanja[ind].totalTam));
        break;
        case 3:
            _.dpembiayaan[ind].totalTam=0;
            _.dpembiayaan[ind].nilaix=v.value; 
            if(_.dpembiayaan[ind].volx!=undefined && _.dpembiayaan[ind].volx!=0){
                _.dpembiayaan[ind].totalTam=_.dpembiayaan[ind].volx;
            }
        
            if(_.dpembiayaan[ind].nilaix!=undefined && _.dpembiayaan[ind].nilaix!=0){
                _.dpembiayaan[ind].totalTam=(parseFloat(_.dpembiayaan[ind].totalTam)*parseFloat(_.dpembiayaan[ind].nilaix)).toFixed(2);
            }else{
                _.dpembiayaan[ind].totalTam=0;
            }
            
            $('#jumlah'+key+""+ind).html(_$(_.dpembiayaan[ind].totalTam));
        break;
        case 4:_.dpendapatan[ind].nilaix=v.value; 
        break;
    }
}


function _savePendapatan(ind){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"Simpan Perubahan ???",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_savePendapataned(`+ind+`)">SIMPAN</button>`
    });
}
function _savePendapataned(ind){
    // param={};
    param               =addDataKeyTabel(_.dpendapatan[ind].noTabelSub,ind);
    
    param.kdUsulan      =_.dpendapatan[ind].kdUsulan;
    param.kdDinas       =_.dpendapatan[ind].kdDinas;
    param.kdMember      =_.dpendapatan[ind].kdMember;
    param.noTabelSub    =_.dpendapatan[ind].noTabelSub;
    param.noPembahasan  =_.dpendapatan[ind].nomors;
    param.perkada       =_.dpendapatan[ind].perkada;
    param.tahun         =_.dpendapatan[ind].tahuns;
    param.volx          =_.dpendapatan[ind].volx;
    param.satx          =_.dpendapatan[ind].satx;
    param.nilaix        =_.dpendapatan[ind].nilaix;
    param.total         =_.dpendapatan[ind].totalTam;
    param.status        =$('#pstatus1'+ind).val();
    param.totalPrev     =_.dpendapatan[ind].totalPrev;
    
    param.keterangan=$('#keterangan1'+''+ind).val();
    if(_isNull(param.volx)){return _toast({isi:msg.add+" volume"})};
    if(_isNull(param.satx)){return _toast({isi:msg.add+" satuan"})};
    if(_isNull(param.nilaix)){return _toast({isi:msg.add+" nilai"})};
    if(param.status=="-"){return _toast({isi:"Tentukan Status Usulan !!!"})};

    
    // return console.log(param);
    _post("Proses/savePerubahanForum",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _.updStruktur=true;
            // $('#status1'+ind).html(param.status);

            _.totalPendapatanx-=parseFloat(_.dpendapatan[ind].totalx);
            _.dpendapatan[ind].totalx=param.total;
            _.totalPendapatanx+=parseFloat(param.total);
            $('#tpaguxPendapatan').html("Rp. "+_$(_.totalPendapatanx));

            return _toast({isi:"SUKSES",judul:"Informasi"});
        }else{
            $('#keterangan1'+ind).val("");
            $('#jumlah1'+ind).html("");
            $('#volume1'+ind).val("");
            $('#nilai1'+ind).val("");
            return _toast({isi:res.msg});
        }
    })
}

function _saveBelanja(ind){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"Simpan Perubahan ???",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_saveBelanjaed(`+ind+`)">SIMPAN</button>`
    });
}
function _saveBelanjaed(ind){
    // param={};
    param               =addDataKeyTabelBelanja(_.dbelanja[ind].noTabelSub,ind);
    param.kdUsulan      =_.dbelanja[ind].kdUsulan;
    param.kdDinas       =_.dbelanja[ind].kdDinas;
    param.kdMember       =_.dbelanja[ind].kdMember;
    param.noTabelSub    =_.dbelanja[ind].noTabelSub;
    param.noPembahasan  =_.dbelanja[ind].nomors;
    param.perkada       =_.dbelanja[ind].perkada;
    param.tahun         =_.dbelanja[ind].tahuns;
    param.volx          =_.dbelanja[ind].volx;
    param.satx          =_.dbelanja[ind].satx;
    param.nilaix        =_.dbelanja[ind].nilaix;
    param.total        =_.dbelanja[ind].totalTam;
    param.status        =$('#pstatus1'+ind).val();
    param.totalPrev     =_.dbelanja[ind].totalPrev;

    param.keterangan=$('#keterangan2'+''+ind).val();
    if(_isNull(param.volx)){return _toast({isi:msg.add+" volume"})};
    if(_isNull(param.satx)){return _toast({isi:msg.add+" satuan"})};
    if(_isNull(param.nilaix)){return _toast({isi:msg.add+" nilai"})};
    if(param.status=="-"){return _toast({isi:"Tentukan Status Usulan !!!"})};

    // return console.log(param);
    _post("Proses/savePerubahanForum",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            // $('#status2'+ind).html(param.status);
            _.updStruktur=true;

            _.totalBelanjax-=parseFloat(_.dbelanja[ind].totalx);
            _.dbelanja[ind].totalx=param.total;
            _.totalBelanjax+=parseFloat(param.total);
            $('#tpaguxBelanja').html("Rp. "+_$(_.totalBelanjax));

            return _toast({isi:"SUKSES",judul:"Informasi"});
        }else{
            $('#keterangan2'+ind).val("");
            $('#jumlah2'+ind).html("");
            $('#volume2'+ind).val("");
            $('#nilai2'+ind).val("");
            return _toast({isi:res.msg});
        }
    })
}

function _savePembiayaan(ind){
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"Simpan Perubahan ???",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_savePembiayaaned(`+ind+`)">SIMPAN</button>`
    });
}
function _savePembiayaaned(ind){
    param               =addDataKeyTabelPembiayaan(_.dpembiayaan[ind].noTabelSub,ind);
    param.kdUsulan      =_.dpembiayaan[ind].kdUsulan;
    param.kdDinas       =_.dpembiayaan[ind].kdDinas;
    param.kdMember       =_.dpembiayaan[ind].kdMember;
    param.noTabelSub    =_.dpembiayaan[ind].noTabelSub;
    param.noPembahasan  =_.dpembiayaan[ind].nomors;
    param.perkada       =_.dpembiayaan[ind].perkada;
    param.tahun         =_.dpembiayaan[ind].tahuns;
    param.volx          =_.dpembiayaan[ind].volx;
    param.satx          =_.dpembiayaan[ind].satx;
    param.nilaix        =_.dpembiayaan[ind].nilaix;
    param.total        =_.dpembiayaan[ind].totalTam;
    param.status        =$('#pstatus1'+ind).val();
    param.totalPrev     =_.dpembiayaan[ind].totalPrev;
    
    param.keterangan=$('#keterangan3'+''+ind).val();
    if(_isNull(param.volx)){return _toast({isi:msg.add+" volume"})};
    if(_isNull(param.satx)){return _toast({isi:msg.add+" satuan"})};
    if(_isNull(param.nilaix)){return _toast({isi:msg.add+" nilai"})};
    
    // return console.log(param);
    _post("Proses/savePerubahanForum",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _.updStruktur=true;
            // $('#status3'+ind).html(param.status);
            
            _.totalPembiayaanx-=parseFloat(_.dpembiayaan[ind].totalx);
            _.dpembiayaan[ind].totalx=param.total;
            _.totalPembiayaanx+=parseFloat(param.total);
            $('#tpaguxPembiayaan').html("Rp. "+_$(_.totalPembiayaanx));

            return _toast({isi:"SUKSES",judul:"Informasi"});
        }else{
            $('#keterangan3'+ind).val("");
            $('#jumlah3'+ind).html("");
            $('#volume3'+ind).val("");
            $('#nilai3'+ind).val("");
            return _toast({isi:res.msg});
        }
    })
}



function addDataKeyTabel(no,ind){
    switch(Number(no)){
        case 1:
            return {
                kdSub       :_.dpendapatan[ind].kdSub1,
                nmSub       :_.dpendapatan[ind].nmSub1,
            }
        case 2:
            return {
                kdSubPrev   :_.dpendapatan[ind].kdSub1,
                kdSub       :_.dpendapatan[ind].kdSub2,
                nmSub       :_.dpendapatan[ind].nmSub2,
            }
        case 3:
            return {
                kdSubPrev   :_.dpendapatan[ind].kdSub2,
                kdSub       :_.dpendapatan[ind].kdSub3,
                nmSub       :_.dpendapatan[ind].nmSub3,
            }
        case 4:
            return {
                kdSubPrev   :_.dpendapatan[ind].kdSub3,
                kdSub       :_.dpendapatan[ind].kdSub4,
                nmSub       :_.dpendapatan[ind].nmSub4,
            }
        case 5:
            return {
                kdSubPrev   :_.dpendapatan[ind].kdSub4,
                kdSub       :_.dpendapatan[ind].kdSub5,
                nmSub       :_.dpendapatan[ind].nmSub5,
            }
        case 6:
            return {
                kdSubPrev   :_.dpendapatan[ind].kdSub5,
                kdSub       :_.dpendapatan[ind].kdSub6,
                nmSub       :_.dpendapatan[ind].nmSub6,
            }
        case 7:
            return {
                kdSubPrev   :_.dpendapatan[ind].kdSub6,
                kdSub       :_.dpendapatan[ind].kdSub7,
                nmSub       :_.dpendapatan[ind].nmSub7,
            }
    }
}
function addDataKeyTabelBelanja(no,ind){
    switch(Number(no)){
        case 1:
            return {
                kdSub       :_.dbelanja[ind].kdSub1,
                nmSub       :_.dbelanja[ind].nmSub1,
            }
        case 2:
            return {
                kdSubPrev   :_.dbelanja[ind].kdSub1,
                kdSub       :_.dbelanja[ind].kdSub2,
                nmSub       :_.dbelanja[ind].nmSub2,
            }
        case 3:
            return {
                kdSubPrev   :_.dbelanja[ind].kdSub2,
                kdSub       :_.dbelanja[ind].kdSub3,
                nmSub       :_.dbelanja[ind].nmSub3,
            }
        case 4:
            return {
                kdSubPrev   :_.dbelanja[ind].kdSub3,
                kdSub       :_.dbelanja[ind].kdSub4,
                nmSub       :_.dbelanja[ind].nmSub4,
            }
        case 5:
            return {
                kdSubPrev   :_.dbelanja[ind].kdSub4,
                kdSub       :_.dbelanja[ind].kdSub5,
                nmSub       :_.dbelanja[ind].nmSub5,
            }
        case 6:
            return {
                kdSubPrev   :_.dbelanja[ind].kdSub5,
                kdSub       :_.dbelanja[ind].kdSub6,
                nmSub       :_.dbelanja[ind].nmSub6,
            }
        case 7:
            return {
                kdSubPrev   :_.dbelanja[ind].kdSub6,
                kdSub       :_.dbelanja[ind].kdSub7,
                nmSub       :_.dbelanja[ind].nmSub7,
            }
    }
}
function addDataKeyTabelPembiayaan(no,ind){
    switch(Number(no)){
        case 1:
            return {
                kdSub       :_.dpembiayaan[ind].kdSub1,
                nmSub       :_.dpembiayaan[ind].nmSub1,
            }
        case 2:
            return {
                kdSubPrev   :_.dpembiayaan[ind].kdSub1,
                kdSub       :_.dpembiayaan[ind].kdSub2,
                nmSub       :_.dpembiayaan[ind].nmSub2,
            }
        case 3:
            return {
                kdSubPrev   :_.dpembiayaan[ind].kdSub2,
                kdSub       :_.dpembiayaan[ind].kdSub3,
                nmSub       :_.dpembiayaan[ind].nmSub3,
            }
        case 4:
            return {
                kdSubPrev   :_.dpembiayaan[ind].kdSub3,
                kdSub       :_.dpembiayaan[ind].kdSub4,
                nmSub       :_.dpembiayaan[ind].nmSub4,
            }
        case 5:
            return {
                kdSubPrev   :_.dpembiayaan[ind].kdSub4,
                kdSub       :_.dpembiayaan[ind].kdSub5,
                nmSub       :_.dpembiayaan[ind].nmSub5,
            }
        case 6:
            return {
                kdSubPrev   :_.dpembiayaan[ind].kdSub5,
                kdSub       :_.dpembiayaan[ind].kdSub6,
                nmSub       :_.dpembiayaan[ind].nmSub6,
            }
        case 7:
            return {
                kdSubPrev   :_.dpembiayaan[ind].kdSub6,
                kdSub       :_.dpembiayaan[ind].kdSub7,
                nmSub       :_.dpembiayaan[ind].nmSub7,
            }
    }
}

function _checkUpdTabel(posisi) {
    switch(posisi){
        case 4: //bidang
            if(_.updStruktur){
                _post("Proses/getDataStrukturForum",{}).then(res=>{
                    res=JSON.parse(res);
                    if(res.exec){
                        _responStruktur(res.data)
                    }else{
                        return _toast({isi:res.msg});
                    }
                })
            }
        break;
    }
}
function _getUsulanForum(){
    _postNoLoad("Proses/getUsulanForum",{
        noPembahasan:$('#ppembahasan1').val(),
        perkada:$('#pperkada1').val(),
        tahun:$('#ptahun1').val()
    }).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _.dusulan=res.data.dusulan;
            _responStruktur();
            _tabelDaftarUsulan();
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responStruktur(data){
    _.updStruktur=false;
    if(data!=null){
        _.dall=data.dall;
    }
    $('#tabelStrukturShow').html(setTabelStruktur());
    _startTabel("tabelStruktur");
}

function _addUsulan(){
    _.setInput=0;
    _modalEx1({
        judul:"Tambah Usulan".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        minWidth:"800px",
        isi:`
            <div class="col-lg-12">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs  tabs" role="tablist">
                    <li class="nav-item" style="width: `+fwidth+`;text-align: center;" onclick="_setInput(0)">
                        <a class="nav-link active" data-toggle="tab" href="#tab5" role="tab">Form Input</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`;text-align: center;" onclick="_setInput(1)">
                        <a class="nav-link " data-toggle="tab" href="#tab6" role="tab">Daftar Usulan</a>
                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content tabs card-block">
                    <div class="tab-pane active" id="tab5" role="tabpanel">
                        <hr>`+
                            _formTambahUsulan()+
                            _inpImageView({
                                id:"file",
                                idView:"files",
                                judul:"Dokumen Tela'ahan Staf (PDF)",
                                color:"black",
                                func:"readFile(this)"
                            })
                        +`
                    </div>
                    <div class="tab-pane " id="tab6" role="tabpanel">
                        <hr>
                        `+_formTabelUsulan()+`
                    </div>
                </div>
            </div>`
        ,
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addUsulaned()">SIMPAN</button>`
    });
    _tabelDaftarUsulan();
}
function _formTabelUsulan() {
    return _sejajar({
        data:[{
            isi:`<div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-warning text-dark" style="width: 140px;;">
                            <i class="mdi mdi-calendar mr-2 text-dark"></i>TAHUN
                        </span>
                    </div>
                    <select id="ptahun1" onchange="_ctahun(this)" class="btn text-light bg-dark  form-control">
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
                    <select id="pperkada1" onchange="_cperkada(this)" class="btn text-light bg-dark  form-control">
                        `+_inpComboBox({
                            data:_.ptahun[_.indT].perkada,
                            inSelect:"Bagus H"
                        })+`
                    </select>
                </div>`
        },{
            isi:`<div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-warning text-dark" style="width: 150px;;">
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
                +`<div class="input-group mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-dark text-dark" style="width: 150px;;">
                            <i class="mdi mdi-bookmark-check mr-2 text-light"></i>
                        </span>
                    </div>
                    <button class="form-control btn btn-sm btn-primary" onclick="_getUsulanForum()">TAMPILKAN DATA</button>
                </div>`
        }]
    })
    +`
    <hr>
    <div id='tdaftarUsulan' style="margin: auto;">`
    +`</div>`;
    
}
function _tabelDaftarUsulan() {
    $('#tdaftarUsulan').html(
        _tabelResponsive(
            {
                id:"tblUsulan"
                ,isi:_tabel(
                    {
                        data:_.dusulan
                        ,no:1
                        ,kolom:[
                            "nmDinas","nmUsulan","checkbox"
                        ]
                        ,namaKolom:[
                            "Nama Dinas","Usulan","Action"
                        ],
                        func:"_setcheckBox()"
                    })
            })
    );
    return _startTabel("tblUsulan");
}
function _addUsulaned(){
    if(_.setInput){// tabel input
        _post("Proses/inpSetterUsulanOld",{data:_getDataChecked(_.dusulan)}).then(res=>{
            res=JSON.parse(res);
            if(res.exec){
                _reload();
            }else{
                return _toast({isi:res.msg});
            }
        })
    }else{ // form input
        param={
            noPembahasan:_.noPembahasan,
            perkada     :_.perkada,
            tahun       :_.tahun,
            kdKelompok  :_.svKdKelompok,
            kdJenis     :_.svKdJenis,
            kdSub       :_.svKdSub,
            kdDinas     :_.kdDinas,
            usulan      :$('#usulan').val(),
            nomor       :$('#nomor').val(),
            tanggal     :$('#tanggal').val(),
            volume      :$('#volume').val(),
            satuan      :$('#satuan').val(),
            nilai       :$('#nilai').val()
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
    
        // if(_file.data.length<1){return _toast({isi:msg.add+" Dokument"})}
        // return console.log(param);
        _postFile("Proses/inpUsulanForum",param,_file.data).then(res=>{
            res=JSON.parse(res);
            if(res.exec){
                _reload();
            }else{
                return _toast({isi:res.msg});
            }
        })
    }
}
function _setInput(no) {
    _.setInput=no;
}
function _setcheckBox(ind,v) {
    _.dusulan[ind].checked=v.checked;
}


function _ctahun(v) {
    _.indT=_checkIndex(_.ptahun,v.value);
    $('#pperkada1').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada,
            inSelect:"Bagus H"
        })
    );
    _cperkada({value:_.ptahun[_.indT].perkada[0].value})
}
function _cperkada(v) {
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,v.value);
    $('#ppembahasan1').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada[_.indP].pembahasan,
            inSelect:"Bagus H"
        })
    );
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


function _infoPendapatan(ind) {
    infoSupport=[];
    
    try {
        infoSupport.push({name:"Kajian Teknis",value:_.dpendapatan[ind].penimbang});
        infoSupport.push({name:"Hasil Kajian Teknis",value:_.dpendapatan[ind].pertimbangan});
        if(_.dpendapatan[ind].filePertimbangan.length>0){
            infoSupport.push({name:"File Kajian Teknis",value:`<button type="button" class="btn btn-sm btn-block btn-primary" onclick="_viewPertimbangan('`+_.dpendapatan[ind].filePertimbangan+`')">Tampilkan</button>`});
        }   
        if(_.dpendapatan[ind].files.length>0){
            infoSupport.push({name:"File Tela`ahan Staf",value:`<button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewPertimbangan('`+_.dpendapatan[ind].files+`')">Tampilkan</button>`});
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
function _infoBelanja(ind) {
    infoSupport=[];
    
    try {
        infoSupport.push({name:"Kajian Teknis",value:_.dbelanja[ind].penimbang});
        infoSupport.push({name:"Hasil Kajian Teknis",value:_.dbelanja[ind].pertimbangan});
        if(_.dbelanja[ind].filePertimbangan.length>0){
            infoSupport.push({name:"File Kajian Teknis",value:`<button type="button" class="btn btn-sm btn-block  btn-block btn-primary" onclick="_viewPertimbangan('`+_.dbelanja[ind].filePertimbangan+`')">Tampilkan</button>`});
        }   
        if(_.dbelanja[ind].files.length>0){
            infoSupport.push({name:"File Tela`ahan Staf",value:`<button type="button" class="btn btn-sm btn-block btn-block btn-secondary" onclick="_viewPertimbangan('`+_.dbelanja[ind].files+`')">Tampilkan</button>`});
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
function _infoPembiayaan(ind) {
    infoSupport=[];
    
    try {
        infoSupport.push({name:"Kajian Teknis",value:_.dpembiayaan[ind].penimbang});
        infoSupport.push({name:"Hasil Kajian Teknis",value:_.dpembiayaan[ind].pertimbangan});
        if(_.dpembiayaan[ind].filePertimbangan.length>0){
            infoSupport.push({name:"File Kajian Teknis",value:`<button type="button" class="btn btn-sm btn-block btn-primary" onclick="_viewPertimbangan('`+_.dpembiayaan[ind].filePertimbangan+`')">Tampilkan</button>`});
        }
        if(_.dpembiayaan[ind].files.length>0){
            infoSupport.push({name:"File Tela`ahan Staf",value:`<button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewPertimbangan('`+_.dpembiayaan[ind].files+`')">Tampilkan</button>`});
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
function _viewPertimbangan(files){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify(({files:files}))));
}