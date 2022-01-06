function _onload(data){
    _.noPembahasan  =data.noPembahasan;
    _.perkada       =data.perkada;
    _.tahun         =data.tahun;

    _.dstatus   =data.dstatus;
    _.dstatusx   =data.dstatus;

    _.xxx=data.xxx;
    _.kondisi=data.qlab;

    _.ptahun=data.ptahun;

    _.dpendapatan=data.dpendapatan;
    _.dbelanja=data.dbelanja;
    _.dpembiayaan=data.dpembiayaan;

    img.maxUpload=10;

    _.indT=_checkIndex(_.ptahun,_.tahun);
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.perkada);

    _.dpembahasan=data.dpembahasan;

    _.dokumentasi=data.dokumentasi;
    // _.qlap=false;

    _installVarAble({
        page:`Laporan Hasil Pembahasan`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Dashboard</a></li>`,
        form:_form()
    });
    
    navBar.menu[7].menu[0].active="active";
    navBar.menu[7].menu[0].subMenu[4].status="active";

    _installAble({form:true});
    myCode=data.code;
    
    $('#ptahun').val(_.tahun);
    $('#pperkada').val(_.perkada);
    $('#ppembahasan').val(_.noPembahasan);

    _startTabel("tpendapatan");
    _startTabel("tbelanja");
    _startTabel("tpembiayaan");
    _startTabel("tabelDokumentasi");
}
function _form(){
    infoSupport1=[];
    infoSupport1.push({ 
        clsBtn:`btn-outline-primary`
        ,func:"_infoUsulan()"
        ,icon:`<i class="mdi mdi-information-variant"></i>`
        ,title:"Perbarui"
    });
    infoSupport1.push({ 
        clsBtn:`btn-outline-success`
        ,func:"_goLaporan()"
        ,icon:`<i class="mdi mdi-file-export "></i>`
        ,title:"Hapus"
    });
    return _formAlbe({
        judul:"Daftar Pembahasan",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
        btn:_btnGroupTd([{
            clsBtn:`btn-success`
            ,func:"_goEmail()"
            ,icon:`<i class="mdi mdi-email  text-light"></i>Kirim Via Email`
            ,title:"Donwload"
        },{
            clsBtn:`btn-primary`
            ,func:"_goLaporan()"
            ,icon:`<i class="mdi mdi-file-chart  text-light"></i>Rekap Hasil Pembahasan`
            ,title:"Donwload"
        }]),
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
        +'<hr>'
        +formPembahasan()
    });
}

function formPembahasan(){
    margin="10px;";
    fwidth="50%;";
    // style="background-color: #9ec5b5;"
    return `<div class="col-lg-12">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs  tabs" role="tablist">
                <li class="nav-item" style="width: `+fwidth+`;text-align: center;">
                    <a class="nav-link active" data-toggle="tab" href="#tab1" role="tab">PEMBAHASAN</a>
                </li>
                <li class="nav-item" style="width: `+fwidth+`;text-align: center;">
                    <a class="nav-link " data-toggle="tab" href="#tab4" role="tab">DOKUMENTASI</a>
                </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content tabs card-block">
                <div class="tab-pane active" id="tab1" role="tabpanel">
                    `+_forum()+`
                </div>
                <div class="tab-pane " id="tab4" role="tabpanel">
                    `+dokumentasi()+`
                </div>
            </div>
        </div>
    `;
}

function _forum() {
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
function dokumentasi() {
        return _inpSejajar({
            judul:"",
            mb:"margin-bottom:3%;",
            isi:_inpImageView({
                id:"image",
                idView:"images",
                func:"readURL(this)",
                judul:"Pilih File dengan jenis file JPG, PNG",
                color:"black",
                mb:"margin:3%;"
            })
        })
        +_inpSejajar({
            judul:"",
            mb:"margin-bottom:3%;",
            isi:`<button class="btn btn-primary btn-block" onclick="_added()">Tambahkan Gambar</button>`
        })+"<hr>"
        +`
        <div id="tabelShow1">
            `+tabelFiles()+`
        </div>
        `;
}
function tabelFiles() {
    ftampung=`
        <thead>
        <tr>
            <th>No</th>
            <th>Nama File</th>
            <th>Tampilan</th>
            <th>Action</th>
        </tr>
        <thead>
        <tbody>`;
    _.dokumentasi.forEach((v,i)=>{
        ftampung+=`<tr>
                    <td>`+(i+1)+`</td>
                    <td>`+v.files+`</td>
                    <td>
                        <img onclick="_liatImage(this)" width="50px" src='`+assert+`upload/dokumentasi/`+v.files+`'>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_del(`+i+`)" title="Hapus Gambar">
                            <i class="mdi mdi-delete-forever">
                        </i></button>
                    </td>
                </tr>`;
    })
    ftampung+=`</tbody>`;
    return _tabelResponsive(
    {
        id:"tabelDokumentasi"
        ,isi:ftampung
    });
}
function _added(){
    if(img.data.length==0){
        return _toast({isi:"Gambar Belum di Tambahkan !!!"})
    }
    param={
        noPembahasan:_.noPembahasan,
        perkada:_.perkada,
        tahun:_.tahun
    }
    _postFile("Proses/inpDokumentasi",param,img.data).then(res=>{
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
        _.dokumentasi=data.dokumentasi;
    }
    $('#tabelShow1').html(tabelFiles());
    img.data=Array();
    _startTabel("tabelDokumentasi");
}
function _del(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus file ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deled(`+ind+`)">Hapus</button>`
    })
}
function _deled(ind){
    param={
        kdDokumentasi:_.dokumentasi[ind].kdDokumentasi,
        noPembahasan:_.noPembahasan,
        perkada:_.perkada,
        tahun:_.tahun
    }
    _post("Proses/delDokumentasi",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}

function _formPendapatan(){
    _.totalPagu=0;
    _.totalPagux=0;
    infoSupport=[];
    
    if(_.kondisi){
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
    if(_.kondisi){
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
    if(_.kondisi){
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
function setTabelAll(data,keyCode) {
    fid='';
    switch(keyCode){
        case 1:fid='tpendapatan';break;
        case 2:fid='tbelanja';break;
        case 3:fid='tpembiayaan';break;
        case 4:fid='tabelPendapatan';break;
    }
    // <thead>
    //             <tr>
    //                 <th></th>
    //                 <th></th>
    //                 <th></th>
                    
    //                 <th></th>
    //                 <th>USULAN</th>
    //                 <th>OPD</th>
    //                 <th></th>
                    
    //                 <th></th>
    //                 <th>Forum</th>
    //                 <th>TAPD</th>
    //                 <th></th>

    //                 <th></th>
    //                 <th></th>
    //                 <th></th>
    //             </tr>
    //             <tr>
    //                 <th>no</th>
    //                 <th >Perangkat Daerah</th>
    //                 <th >Uraian</th>
                    
    //                 <th>volome</th>
    //                 <th>Satuan</th>
    //                 <th>Nilai Satuan</th>
    //                 <th>Jumlah</th>
                    
    //                 <th>volome</th>
    //                 <th>Satuan</th>
    //                 <th>Nilai Satuan</th>
    //                 <th>Jumlah</th>

    //                 <th>Status</th>
    //                 <th>Keterangan</th>
    //                 <th>Action</th>
    //             </tr>
    //         </thead>
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
        find=0;
        ftampStatus=_.dstatus;
        _.dstatus.forEach((v1,i) => {
            ftampStatus[i].selected=0;
            if(v.keterangan.length!=0 && v1.value==v.keterangan){
                ftampStatus[i].selected=1;
                find=i;
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
                <td>`+_$((parseFloat(v.nilai)*parseFloat(v.vol)).toFixed(2))+`</td>`;
        if(_.kondisi){
            fdata+=`
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
                    `+ftampStatus[find].valueName+`
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+_textArea({
                        hint:"Keterangan",
                        id:"keterangan"+keyCode+""+i,
                        row:"3",
                        text:v.keteranganx
                    })+`
                </td>
            `;
        }else{
            fdata+=`
                <td style="min-width:`+fminwidth+`;">
                    `+v.volx+`
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+v.satx+`
                </td>
                <td style="min-width:`+fminwidth+`;">
                    `+v.nilaix+`
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
                    v.keteranganx
                </td>
            `;
        }
                
        fdata+=`<td style="min-width:150px;">`+_btnGroup(infoSupport,i)+`</td>
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
 
function setTabel() {
    return `<div class="table-responsive">
                <table id="dataTabel" class="table table-striped table-bordered" style="width:100%">
                `+_tabel(
                {
                    data:_.dpembahasan
                    ,no:1
                    ,kolom:[
                        "tahun","perkada","noPembahasan"
                    ]
                    ,namaKolom:[
                        "Tahun","Perkada","Pembahasan"
                    ]
                    ,action:infoSupport1
                })
                +`
                </table>
            </div>
            `;
}
function _infoUsulan(ind) {
    infoSupport=[];
    infoSupport.push({name:"File Undangan Forum",value:`<button type="button" class="btn btn-sm btn-block btn-primary" onclick="_viewPertimbangan('`+_.dpembahasan[ind].files+`')">Tampilkan</button>`});
    infoSupport.push({name:"File Hasil Perkada",value:`<button type="button" class="btn btn-sm btn-block btn-secondary" onclick="_viewPertimbangan('`+_.dpembahasan[ind].finalPerkada+`')">Tampilkan</button>`});
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
        perkada     :_.perkada,
        tahun       :_.tahun,
        perkadaFinal:true,
        status      :'-',
        laporan     :'1'
    }))));
}
function _goEmail() {
    _modalEx1({
        judul:"Konfirmasi".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:"bagikan via email hasil forum TAPD ???",
        bg:"bg-success",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-success" onclick="_goEmailed()">Bagikan</button>`
    });
}
function _goEmailed() {
    param               ={
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun,
        perkadaFinal:true,
        status      :'-',
        laporan     :'1'
    }
    _post("laporan/goEmail",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            $('#keterangan1'+ind).val("");
            $('#jumlah1'+ind).html("");
            $('#volume1'+ind).val("");
            $('#nilai1'+ind).val("");
            return _toast({isi:res.msg});
        }
    })
}
function _viewPertimbangan(files){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify(({files:files}))));
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
function refreshData() {
    _redirect("control/lperkada/"+btoa(JSON.stringify({
        perkada:$('#pperkada').val(),
        tahun:$('#ptahun').val(),
        noPembahasan:$('#ppembahasan').val()
    }))+"/"+_.xxx
    );
}
function _goLaporan(v) {
    return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun,
        perkadaFinal:true,
        status      :'-',
        laporan     :'1'
    }))));
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
            _reload();
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
            _reload();
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
            _reload();
        }else{
            $('#keterangan3'+ind).val("");
            $('#jumlah3'+ind).html("");
            $('#volume3'+ind).val("");
            $('#nilai3'+ind).val("");
            return _toast({isi:res.msg});
        }
    })
}
