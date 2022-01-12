function _onload(data){
    _.ddisposisi=data.ddisposisi;
    // _.ddinas=data.ddinas;
    // _.djabatan=data.djabatan;
    

    _installVarAble({
        page:`Kajian Teknis`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Dashboard</a></li>`,
        form:_form()
    });
    
    navBar.menu[4].menu[0].active="active";
    // navBar.menu[1].menu[0].subMenu[1].status="active";

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

    // _installMj(data);
    _startTabel("dataTabel");
    if(_notif){
        $('.header-notification').addClass("active");
        $('#shownotification').toggle();
    }
}
function _form(){
    
    // infoSupport1.push({ 
    //     clsBtn:`btn-outline-warning`
    //     ,func:"_upd()"
    //     ,icon:`<i class="mdi mdi-grease-pencil"></i>`
    //     ,title:"Perbarui Data"
    // });
    // infoSupport1.push({ 
    //     clsBtn:`btn-outline-danger`
    //     ,func:"_del()"
    //     ,icon:`<i class="mdi mdi-delete-forever"></i>`
    //     ,title:"Hapus"
    // });
    
    return `<div class="row">
                <div class="col-sm-12">
                    <!-- Bootstrap tab card start -->
                    <div class="card">
                        <div class="card-header">
                            <h5 class="col-sm-3 text-info">Daftar Usulan</h5>
                            <div class="card-header-right">

                            </div>
                        </div>
                        <div class="card-block">
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
        ,isi:_vtabel()
    });
}
function _vtabel() {
    fdata=`
        <thead>
            <tr>
                <th>No</th>
                <th>Perangkat Daerah / Usulan</th>
                <th>Disposisi</th>
                <th>Tanggal</th>
                <th>Tela'ahan Staf</th>
                <th>Pertimbangan Teknis</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>`
            
        _.ddisposisi.forEach((v,i) => {
            setButton(v,i);
            fdata+=`
                <tr>
                    <td>`+(i+1)+`</td>
                    <td>
                       <small> `+v.nmDinas+`<br></small>
                        - `+v.nmUsulan+`
                    </td>
                    <td>`+_btnGroup([{ 
                        clsBtn:`btn-outline-secondary`
                        ,func:"_viewDisposisi()"
                        ,icon:`<i class="mdi mdi-folder-image"></i>File Disposisi`
                        ,title:"Preview File Disposisi"
                    }],i)+`</td>
                    <td>`+v.dateShow+`</td>
                    <td>`+_btnGroup([{ 
                            clsBtn:`btn-outline-secondary`
                            ,func:"_viewTelaahan()"
                            ,icon:`<i class="mdi mdi-folder-image"></i>File Tela'ahan`
                            ,title:"Preview File Tela'ahan Staf"
                        }],i)+`</td>
                    <td id="tpertimbangan`+i+`">`+v.pertimbangan+`</td>
                    <td style="min-width:15%;" id="tbtn`+i+`">
                        `+_btnGroup(infoSupport1,i)+`
                    </td>

                </tr>
            `;
        });
    return fdata+=`</tbody>
    `;
}
function setButton(v,i) {
    infoSupport1=[];
    if(v.pertimbangan.length>1){
        infoSupport1.push({ 
            clsBtn:`btn-outline-secondary`
            ,func:"_viewPertimbangan()"
            ,icon:`<i class="mdi mdi-folder-image"></i>`
            ,title:"Preview File Pertimbangan"
        })
        infoSupport1.push({ 
            clsBtn:`btn-outline-warning`
            ,func:"_add()"
            ,icon:`<i class="mdi mdi-grease-pencil"></i>`
            ,title:"Perbarui Pertimbangan"
        })
    }else{
        infoSupport1.push({ 
            clsBtn:`btn-outline-primary`
            ,func:"_add()"
            ,icon:`<i class="mdi mdi-note-plus"></i>Tambah Pertimbangan`
            ,title:"Tambah Data"
        })
    }
}
function _add(ind){
    _file.data=[];
    _modalEx1({
        judul:"Tambah Pertimbangan".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formKajianTeknis(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_added(`+ind+`)">SIMPAN</button>`
    });

    if(_.ddisposisi[ind].pertimbangan.length!=0){
        $('#pertimbangan').val(_.ddisposisi[ind].pertimbangan)
    }
}
function _added(ind){
    param={
        kdUsulan:_.ddisposisi[ind].kdUsulan,
        noPembahasan:_.ddisposisi[ind].noPembahasan,
        tahun:_.ddisposisi[ind].tahun,
        kdMember:_.ddisposisi[ind].kdMember,
        pertimbangan   :$('#pertimbangan').val(),
    }
    if(_isNull(param.pertimbangan)){return _toast({isi:msg.addNama+" Pertimbangan"})};
    
    fkondisi=true;
    try {// untuk data yang belum ada
        if(_.ddisposisi[ind].filePertimbangan.length!=0){
            fkondisi=false;
        }
    } catch (error) {
        
    }
    if(_file.data.length<1 && fkondisi){return _toast({isi:msg.add+" File Pertimbangan Teknis"})};

    _postFile("Proses/setPertimbangan",param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _file.data=[];
            _respon(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _respon(data,ind){
    if(data!=null){
        _.ddisposisi[ind]=data.data[0];
    }
    $('#tpertimbangan'+ind).html(_.ddisposisi[ind].pertimbangan);
    setButton(_.ddisposisi[ind],ind);
    $('#tbtn'+ind).html(_btnGroup(infoSupport1,ind));
    // $('#tabelShow').html(setTabel());
    // _startTabel("dataTabel");
}
function _viewPertimbangan(ind){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify(({files:_.ddisposisi[ind].filePertimbangan}))));
}
function _viewDisposisi(ind){
    // console.log(_.ddisposisi);
    return _modalShowImage({
        judul:undefined,
        style:undefined,
        file:"upload/fileDisposisi/"+_.ddisposisi[ind].files1
    })
    return _redirectOpen("control/viewImageSet/"+btoa(JSON.stringify(({nama:"fileDisposisi/"+_.ddisposisi[ind].files1}))));
}
function _viewTelaahan(ind){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify(({files:_.ddisposisi[ind].files}))));
}