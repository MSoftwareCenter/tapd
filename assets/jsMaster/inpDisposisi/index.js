function _onload(data){
    _.ddisposisi=data.ddisposisi;
    _.dtujuan=data.dtujuan;
    _.dtujuan1=data.dtujuan1;
    _.dtujuan2=data.dtujuan2;
    
    _.noPembahasan=data.noPembahasan;
    _.perkada=data.perkada;
    
    _.qcode=data.qcode;
    _.kodePage=data.kodePage;

    img.maxUpload=1;
    
    _installVarAble({
        page:`Disposisi`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Dashboard</a></li>`,
        form:_form()
    });
    
    data.dinfo.forEach((v,i) => {
        if(i==0){
            list=[];
            _notif=true;
        }
        list.push({url:router+v.url,textSmall:v.fitur,text:v.date+"<br>"+v.isiNotif});
    });
    navBar.menu[3].menu[0].active="active";
    
    // navBar.menu[1].menu[0].subMenu[1].status="active";
    // navBar.menu[2].menu[0].active="active";

    _installAble({form:true});
    myCode=data.code;
    // viewWebsite+=_form();

    // _installMj(data);
    _startTabel("dataTabel");

    if(_notif){
        $('.header-notification').addClass("active");
        $('#shownotification').toggle();
    }
}
function _form(){
    infoSupport=[];
    infoSupport1=[];

    infoSupport1.push({ 
        clsBtn:`btn-outline-primary`
        ,func:"_open()",
        id:"tester"
        ,icon:`<i class="mdi mdi-book-open-variant"></i>Buka Disposisi`
        ,title:"Buka Disposisi"
    });
    
    return `<div class="row">
                <div class="col-sm-12">
                    <!-- Bootstrap tab card start -->
                    <div class="card">
                        <div class="card-header" style="padding: 30px;">
                            <h5 class="col-sm-3 text-info">Daftar Usulan</h5>
                            <span>Disposisi Usulan Tahapan ke-`+(Number(_.noPembahasan))+`</span>
                            <div class="card-header-right">
                                `+_btnGroupTd(infoSupport)+`
                            </div>
                        </div>
                        <div class="card-block"  id='tabelShow' style="margin: auto;width:100%">
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
    fdata=`
        <thead>
            <th>No</th>
            <th >Perangkat Daerah</th>
            <th>Usulan</th>
            <th>Status</th>
            <th>Action</th>
        </thead>
        <tbody>
    `;
    _.ddisposisi.forEach((v,i) => {
        fnmDinas=v.nmDinas;
        if(v.nmDinasReal!=null){
            fnmDinas=v.nmDinasReal;
        }
        fdata+=`
            <tr>
                <td>`+(i+1)+`</td>
                <td>`+fnmDinas+`</td>
                <td>`+v.nmUsulan+`</td>
                <td>`+v.status+`</td>
                <td style="min-width: 15%;">
                    <div class="btn-group mr-2">
                        <button type="button" id="bt0`+i+`" class="btn btn-sm btn-outline-primary" onclick="_open(`+i+`)" title="Buka Disposisi"><i class="mdi mdi-book-open-variant"></i>Buka Disposisi</button>
                    </div>
                </td>
            </tr>
            <tr style="display:none;" id="sub`+i+`">
                <td>`+(i+1)+`</td>
                <td>`+fnmDinas+`</td>
                <td>`+v.nmUsulan+`</td>
                <td>`+v.status+`</td>
                <td style="min-width: 15%;">
                </td>
            </tr>
        `;
    });
    return _tabelResponsive(
    {
        id:"dataTabel"
        ,isi:fdata
    });
}
function _open(ind,respon) {
    // console.log($("#bt0"+ind).html());
    if($("#bt0"+ind).html().trim()==`<i class="mdi mdi-close-box"></i>Tutup Disposisi` && respon==undefined){
        $("#bt0"+ind).html(`<i class="mdi mdi-book-open-variant"></i>Buka Disposisi`);
        $("#sub"+ind).css({'display':"none"});
    }else{
        $("#bt0"+ind).html(`<i class="mdi mdi-close-box"></i>Tutup Disposisi`);
        $('#sub'+ind).html(`
            <td colspan=5>
                `+_tabelSetDisposisi(ind)+`
            </td>
        `);
        $('#sub'+ind).css({"display":""})

        infoSupport1=[];
        infoSupport1.push({ 
            clsBtn:`btn-outline-secondary`
            ,func:"_viewDisposisi("+ind+")",
            id:"tester"
            ,icon:`<i class="mdi mdi-eye"></i>`
            ,title:"Buka File Disposisi"
        });
        
        try {
            if(_.ddisposisi[ind].data[0].status=="-" ){
                infoSupport1.push({ 
                    clsBtn:`btn-outline-success`
                    ,func:"_saveDisposisiBupati("+ind+")",
                    id:"tester"
                    ,icon:`<i class="mdi mdi-check-all"></i>`
                    ,title:"Simpan Disposisi"
                });
            }else{
                infoSupport1[0].icon+="terarsipkan";
            }

            
            $('#tglTerima'+ind).val(_.ddisposisi[ind].data[0].tglTerima);
            $('#tglPenyelsaian'+ind).val(_.ddisposisi[ind].data[0].tglPenyelsaian);
            $('#tujuanBupati').val(0);
            $('#isi'+ind).val(_.ddisposisi[ind].data[0].isi)
            $('#btnBupati'+ind).html(_btnGroupTd(infoSupport1));
            if(_.ddisposisi[ind].data[0].files.length==0){
                $('#btnDisposisi'+ind).html("");
            }



            infoSupport1=[];
            infoSupport1.push({ 
                clsBtn:`btn-outline-secondary`
                ,func:"_viewDisposisi1("+ind+")",
                id:"tester"
                ,icon:`<i class="mdi mdi-eye"></i>`
                ,title:"Buka File Disposisi"
            });
            if(_.ddisposisi[ind].data[0].files1.length!=0){
                $('#tglTerima1'+ind).val(_.ddisposisi[ind].data[0].tglTerima1);
                $('#tglPenyelsaian1'+ind).val(_.ddisposisi[ind].data[0].tglPenyelsaian1);

                findex=_checkIndex(_.dtujuan1,_.ddisposisi[ind].data[0].nmTujuanDisposisi1);
                
                $('#tujuanDisposisi1'+ind).val(findex);
                $('#isi1'+ind).val(_.ddisposisi[ind].data[0].isi1);

                

                if(_.ddisposisi[ind].data[0].files1.length==0){
                    infoSupport1=[{ 
                        clsBtn:`btn-outline-success`
                        ,func:"_saveDisposisi("+ind+")",
                        id:"tester"
                        ,icon:`<i class="mdi mdi-check-all"></i>`
                        ,title:"Simpan Disposisi"
                    }];
                }else{
                    if(_.ddisposisi[ind].data[0].status=="-"){
                        infoSupport1.push({ 
                            clsBtn:`btn-outline-success`
                            ,func:"_saveDisposisi("+ind+")",
                            id:"tester"
                            ,icon:`<i class="mdi mdi-check-all"></i>`
                            ,title:"Simpan Disposisi"
                        });
                        
                        if(findex>2){
                            $('#btnDisposisi2'+ind).html("");
                        }
                    }else{
                        infoSupport1[0].icon+="terarsipkan";
                    }
                    
                }
                $('#tujuanBupatiSelected2'+ind).html(_.ddisposisi[ind].data[0].nmTujuanDisposisi1);
                $('#btnDisposisi'+ind).html(_btnGroupTd(infoSupport1));
                
                if(_.ddisposisi[ind].data[0].status=="-" && findex>2){
                    $('#btnArsipkan'+ind).html(_btnGroup([{ 
                        clsBtn:`btn-outline-success`
                        ,func:"_arsipkanDisposisi("+ind+")",
                        id:"tester"
                        ,icon:`<i class="mdi mdi-file-document"></i>Arsipkan`
                        ,title:"Arsipkan Disposisi"
                    }]))
                }
            }else{
                $('#btnDisposisi2'+ind).html("");
            }



            infoSupport2=[];
            infoSupport2.push({ 
                clsBtn:`btn-outline-secondary`
                ,func:"_viewDisposisi2("+ind+")",
                id:"tester"
                ,icon:`<i class="mdi mdi-eye"></i>`
                ,title:"Buka File Disposisi"
            });
            if(_.ddisposisi[ind].data[0].status=="-"){
                infoSupport2.push({ 
                    clsBtn:`btn-outline-success`
                    ,func:"_saveDisposisi2("+ind+")",
                    id:"tester"
                    ,icon:`<i class="mdi mdi-check-all"></i>`
                    ,title:"Simpan Disposisi"
                });
            }else{
                infoSupport2[0].icon+="terarsipkan";
            }

            if(_.ddisposisi[ind].data[0].files2.length!=0){
                $('#tglTerima2'+ind).val(_.ddisposisi[ind].data[0].tglTerima2);
                $('#tglPenyelsaian2'+ind).val(_.ddisposisi[ind].data[0].tglPenyelsaian2);

                findex=_checkIndex(_.dtujuan2,_.ddisposisi[ind].data[0].nmTujuanDisposisi2);

                $('#tujuanDisposisi2'+ind).val(findex);
                $('#isi2'+ind).val(_.ddisposisi[ind].data[0].isi2);

                $('#btnDisposisi2'+ind).html(_btnGroupTd(infoSupport2));
                if(_.ddisposisi[ind].data[0].status=="-"){
                    $('#btnArsipkan2'+ind).html(_btnGroup([{ 
                        clsBtn:`btn-outline-success`
                        ,func:"_arsipkanDisposisi("+ind+")",
                        id:"tester"
                        ,icon:`<i class="mdi mdi-file-document"></i>Arsipkan`
                        ,title:"Arsipkan Disposisi"
                    }]))
                }
            }else if(_.ddisposisi[ind].data[0].status!="-"){
                $('#btnDisposisi2'+ind).html("");
            }
        } catch (error) {
            $('#btnDisposisi'+ind).html("");
            $('#btnDisposisi2'+ind).html("");
        }
    }
}
function _tabelSetDisposisi(ind){
    return `
    <div class="table-responsive">
        <table class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th colspan=6 class="text-center">BUPATI/WAKIL BUPATI</th>
                </tr>
                <tr>
                    <th>Tanggal Terima</th>
                    <th>Tanggal Penyelsaian</th>
                    <th>Ditujukan Kepada</th>
                    <th>Isi Disposisi</th>
                    <th>File Disposisi</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>`+_inp({
                        type:"date",
                        hint:"Tanggal Terima ",
                        id:"tglTerima"+ind,
                    })+`</td>
                    <td>`+_inp({
                        type:"date",
                        hint:"Tanggal Penyelsaian",
                        id:"tglPenyelsaian"+ind,
                    })+`</td>
                    <td>
                        <select class="btn btn-secondary text-dark" id="tujuanBupati`+ind+`" onchange="_selectTujuanBupati(this,`+ind+`)" style="width: -moz-available; text-align: left;width: 100%;">
                            `+_inpComboBox({
                                judul:"",
                                color:"black",  
                                data:_.dtujuan,
                                method:"sejajar",
                                selected:1,
                                index:"Bagus H",
                                inSelect:"Bagus H"})
                        +`</select>
                    </td>
                    <td>`+_textArea({
                        hint:"Isi Disposisi",
                        id:"isi"+ind,
                        row:"3",
                    })+`</td>
                    <td>
                        `+
                        _inpImageView({
                            id:"image",
                            idView:"images"+ind,
                            func:"readImage(this,"+ind+")",
                            judul:"File Disposisi",
                            color:"black",
                            method:"Bagus H"
                        })
                        +`
                    </td>
                    <td id='btnBupati`+ind+`' style="padding-top: 3.5%;">
                        <button type="button"  class="btn btn-sm btn-success" 
                            onclick="_saveDisposisiBupati(`+ind+`)" title="Simpan Disposisi">
                            <i class="mdi mdi-check-all"></i>
                            Simpan
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan=5 class="text-center" id="tujuanBupatiSelected1`+ind+`">`+_.dtujuan[0].valueName+`</td>
                    <td id="btnArsipkan`+ind+`"><td>
                </tr>
                <tr>
                    <td>`+_inp({
                        type:"date",
                        hint:"Tanggal Terima ",
                        id:"tglTerima1"+ind,
                    })+`</td>
                    <td>`+_inp({
                        type:"date",
                        hint:"Tanggal Penyelsaian",
                        id:"tglPenyelsaian1"+ind,
                    })+`</td>
                    <td>
                        <select class="btn btn-secondary text-dark"  id="tujuanDisposisi1`+ind+`" onchange="_selectTujuanBupati1(this,`+ind+`)"  style="width: -moz-available; text-align: left;width: 100%;">
                            `+_inpComboBox({
                                judul:"",
                                color:"black",  
                                data:_.dtujuan1,
                                method:"sejajar",
                                index:"Bagus H",
                                inSelect:"Bagus H",
                                change:"_selectTujuan(this)"})
                        +`</select>
                    </td>
                    <td>`+_textArea({
                        hint:"Isi Disposisi",
                        id:"isi1"+ind,
                        row:"3",
                    })+`</td>
                    <td>
                        `+
                        _inpImageView({
                            id:"image1",
                            idView:"images1"+ind,
                            func:"readImage1(this,"+ind+")",
                            judul:"File Disposisi",
                            color:"black",
                            method:"Bagus H"
                        })
                        +`
                    </td>
                    <td id='btnDisposisi`+ind+`' style="padding-top: 3.5%;">
                        <button type="button"  class="btn btn-sm btn-success" 
                            onclick="_saveDisposisi(`+ind+`)" title="Simpan Disposisi">
                            <i class="mdi mdi-check-all"></i>
                            Simpan
                        </button>
                    </td>
                </tr>

                <tr>
                    <td colspan=5 class="text-center" id="tujuanBupatiSelected2`+ind+`">`+_.dtujuan1[0].valueName+`</td>
                    <td id="btnArsipkan2`+ind+`"><td>
                </tr>

                <tr>
                    <td>`+_inp({
                        type:"date",
                        hint:"Tanggal Terima ",
                        id:"tglTerima2"+ind,
                    })+`</td>
                    <td>`+_inp({
                        type:"date",
                        hint:"Tanggal Penyelsaian",
                        id:"tglPenyelsaian2"+ind,
                    })+`</td>
                    <td>
                        <select class="btn btn-secondary text-dark"  id="tujuanDisposisi2`+ind+`"  style="width: -moz-available; text-align: left;width: 100%;">
                            `+_inpComboBox({
                                judul:"",
                                color:"black",  
                                data:_.dtujuan2,
                                method:"sejajar",
                                index:"Bagus H",
                                inSelect:"Bagus H",
                                change:"_selectTujuan(this)"})
                        +`</select>
                    </td>
                    <td>`+_textArea({
                        hint:"Isi Disposisi",
                        id:"isi2"+ind,
                        row:"3",
                    })+`</td>
                    <td>
                        `+
                        _inpImageView({
                            id:"image2",
                            idView:"images2"+ind,
                            func:"readImage2(this,"+ind+")",
                            judul:"File Disposisi",
                            color:"black",
                            method:"Bagus H"
                        })
                        +`
                    </td>
                    <td id='btnDisposisi2`+ind+`' style="padding-top: 3.5%;">
                        <button type="button"  class="btn btn-sm btn-success" 
                            onclick="_saveDisposisi2(`+ind+`)" title="Simpan Disposisi">
                            <i class="mdi mdi-check-all"></i>
                            Simpan
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>`;
}

function readImage(v,ind) {
    img.idView="images"+ind;
    readURL(v);
}
function readImage1(v,ind) {
    img.idView="images1"+ind;
    readURL(v);
}
function readImage2(v,ind) {
    img.idView="images2"+ind;
    readURL(v);
}

function _selectTujuanBupati(v,ind){
    $('#tujuanBupatiSelected1'+ind).html(_.dtujuan[Number(v.value)].valueName);
}
function _selectTujuanBupati1(v,ind){
    $('#tujuanBupatiSelected2'+ind).html(_.dtujuan1[Number(v.value)].valueName);
}


function _saveDisposisiBupati(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-check-all"></i>`
        ,isi:"Simpan Disposisi  ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_saveDisposisiBupatied(`+ind+`)">Simpan</button>`
    })
}
function _saveDisposisiBupatied(ind){
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        perkada     :_.perkada,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,
        tglTerima:$('#tglTerima'+ind).val(),
        tglPenyelsaian:$('#tglPenyelsaian'+ind).val(),
        tujuanBupati:_.dtujuan[Number($('#tujuanBupati'+ind).val())].value,
        nmTujuanBupati:_.dtujuan[Number($('#tujuanBupati'+ind).val())].valueName,
        isi:$('#isi'+ind).val()
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

    _postFile("Proses/saveDisposisi",param,img.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            img.data=[];
            _respon(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}

function _saveDisposisi(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-check-all"></i>`
        ,isi:"Simpan Disposisi  ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_saveDisposisied(`+ind+`)">Simpan</button>`
    })
}
function _saveDisposisied(ind){
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        perkada     :_.perkada,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,
        tglTerima:$('#tglTerima1'+ind).val(),
        tglPenyelsaian:$('#tglPenyelsaian1'+ind).val(),
        tujuanBupati:_.dtujuan1[Number($('#tujuanDisposisi1'+ind).val())].value,
        nmTujuanBupati:_.dtujuan1[Number($('#tujuanDisposisi1'+ind).val())].valueName,
        isi:$('#isi1'+ind).val()
    }
    if(_isNull(param.tglTerima)){return _toast({isi:msg.add+" Tanggal Terima Disposisi"})};
    if(_isNull(param.tglPenyelsaian)){return _toast({isi:msg.add+" Tanggal Penyelsaian Disposisi"})};
    if(_isNull(param.tujuanBupati)){return _toast({isi:msg.add+" Tujuan Disposisi"})};
    if(_isNull(param.isi)){return _toast({isi:msg.add+" Isi Disposisi"})};

    fkondisi=true;
    try {// untuk data yang belum ada
        if(_.ddisposisi[ind].data[0].files1.length!=0){
            fkondisi=false;
        }
    } catch (error) {
        
    }
    // _log(fkondisi,_.ddisposisi[ind].data[0].files);
    if(img.data.length<1 && fkondisi){return _toast({isi:msg.add+" File Disposisi"})};

    _postFile("Proses/saveDisposisiTujuan",param,img.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            img.data=[];
            _respon(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}


function _saveDisposisi2(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-check-all"></i>`
        ,isi:"Simpan Disposisi  ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_saveDisposisi2ed(`+ind+`)">Simpan</button>`
    })
}
function _saveDisposisi2ed(ind){
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        perkada     :_.perkada,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,

        tglTerima:$('#tglTerima2'+ind).val(),
        tglPenyelsaian:$('#tglPenyelsaian2'+ind).val(),
        tujuanBupati:_.dtujuan2[Number($('#tujuanDisposisi2'+ind).val())].value,
        nmTujuanBupati:_.dtujuan2[Number($('#tujuanDisposisi2'+ind).val())].valueName,
        isi:$('#isi2'+ind).val()
    }
    if(_isNull(param.tglTerima)){return _toast({isi:msg.add+" Tanggal Terima Disposisi"})};
    if(_isNull(param.tglPenyelsaian)){return _toast({isi:msg.add+" Tanggal Penyelsaian Disposisi"})};
    if(_isNull(param.tujuanBupati)){return _toast({isi:msg.add+" Tujuan Disposisi"})};
    if(_isNull(param.isi)){return _toast({isi:msg.add+" Isi Disposisi"})};

    fkondisi=true;
    try {// untuk data yang belum ada
        if(_.ddisposisi[ind].data[0].files1.length!=0){
            fkondisi=false;
        }
    } catch (error) {
        
    }
    
    if(img.data.length<1 && fkondisi){return _toast({isi:msg.add+" File Disposisi"})};
    // return _log(param);

    _postFile("Proses/saveDisposisiTujuan2",param,img.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            img.data=[];
            _respon(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}


function _respon(data,ind){
    if(data!=null){
        _.ddisposisi[ind].data=data.data;
    }
    _open(ind,"respon");
}

function _viewDisposisi(ind){
    // console.log(_.ddisposisi[ind].data[0].files-);
    return _modalShowImage({
        judul:undefined,
        style:undefined,
        file:"upload/fileDisposisi/"+_.ddisposisi[ind].data[0].files
    })
    return _redirectOpen("control/viewImageSet/"+btoa(JSON.stringify(({nama:"fileDisposisi/"+_.ddisposisi[ind].data[0].files}))));
}
function _viewDisposisi1(ind){
    return _modalShowImage({
        judul:undefined,
        style:undefined,
        file:"upload/fileDisposisi/"+_.ddisposisi[ind].data[0].files1
    })
    return _redirectOpen("control/viewImageSet/"+btoa(JSON.stringify(({nama:"fileDisposisi/"+_.ddisposisi[ind].data[0].files1}))));
}
function _viewDisposisi2(ind){
    // console.log(_.ddisposisi[ind].data[0].files);
    // 
    
    return _modalShowImage({
        judul:undefined,
        style:undefined,
        file:"upload/fileDisposisi/"+_.ddisposisi[ind].data[0].files2
    })
    // return _modalCenterContent("",`<img src="`+assert+`upload/fileDisposisi/`+_.ddisposisi[ind].data[0].files+`" style="width: 400px; height: 264px;">`);
    return _redirectOpen("control/viewImageSet/"+btoa(JSON.stringify(({nama:"fileDisposisi/"+_.ddisposisi[ind].data[0].files2}))));
}

function _arsipkanDisposisi(ind) {
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-check-all"></i>`
        ,isi:"Arsipkan Data Disposisi  ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_arsipkanDisposisied(`+ind+`)">Simpan</button>`
    })
}
function _arsipkanDisposisied(ind) {
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,
        tujuanDisposisi:_.ddisposisi[ind].data[0].tujuanDisposisi1,
        nmDinas:_.ddisposisi[ind].nmDinas,
    }
    _post("Proses/arsipkanDisposisi",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            img.data=[];
            _respon(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}