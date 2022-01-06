function _onload(data){
    _.dperda=data.dperda;
    _.qcode=data.qcode;
    _.tblStart=0;
    _installVarAble({
        page:`Dashboard`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Login</a></li>`,
        form:_form()
    });
    
    navBar.menu[0].menu[0].active="active";
    // navBar.menu[1].menu[0].subMenu[0].status="active";
    data.dinfo.forEach((v,i) => {
        if(i==0){
            list=[];
            _notif=true;
        }
        list.push({url:router+v.url,textSmall:v.fitur,text:v.date+"<br>"+v.isiNotif});
    });

    _installAble({form:true});
    myCode=data.code;

    if(_notif){
        $('.header-notification').addClass("active");
        $('#shownotification').toggle();
    }
    _startTabel("dataTabel");
}
function _form(){
    fpagination=_btnGroupTd([{ 
            clsBtn:`btn-outline-info`,
            icon:`«`,
            func:"_selebumnya()",
            title:"Selebumnya"
        },{ 
            clsBtn:`btn-outline-info`,
            icon:`»`,
            func:"_selanjutnya()",
            title:"Selanjutnya"
        }]);
    if(_.dperda.length==0){
        fpagination="";
    }

    fbtnAdd=_btnGroupTd([{ 
        clsBtn:`btn-outline-primary`,
        icon:`<i class="mdi mdi-note-plus text-primary"></i>Tambah Peraturan`,
        func:"_add()",
        title:"Tambah Data"
    }]);
    if(_.qcode.length==0){
        fbtnAdd="";
    }
    return `
        `+_formAlbe({
            btn:fbtnAdd,
            judul:"PERATURAN DAERAH",
            judulFooter:"Sekretariat TAPD",
            deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
            isi:`
                <div id='tabelShow' style="margin: auto;width:100%">
                    `+setTabel()+`
                </div>`
                // <div class="pagination">
                //     `+fpagination+`
                // </div>
        });
}
function setTabel() {
    return _tabelResponsive(
    {
        id:"dataTabel",
        isi:_vtabel()
    });
}
function _vtabel() {
    faction=false;
    baction=[];
    if(_kdJabatan==vjabatan || _kdJabatan=="6"){
        faction=true;
        baction.push({ 
            clsBtn:`btn-outline-warning`,
            icon:`<i class="mdi mdi-grease-pencil"></i>Perbarui`,
            func:"_upd()",
            title:"Perbarui"
        });
        baction.push({ 
            clsBtn:`btn-outline-danger`,
            icon:`<i class="mdi mdi-delete-forever"></i>Hapus`,
            func:"_del()",
            title:"Hapus"
        });
    }
    fdata=`
        <thead>
            <tr>
                <th>no</th>
                <th >Peraturan</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>`;
        no=1;
        _.dperda.forEach((v,i) => {
            fdata+=`
                <tr style="padding:5px">
                    <td>`+(i+1)+`</td>
                    <td>
                        <span class="text-success">`+v.judul+`</span>
                        <br>
                        `+v.deskripsi+`
                        <br>
                        `+_btn({
                            class:"btn btn-dark",
                            attr:`onclick="_preview(`+i+`)" style="padding: 3px;"`,
                            judul:"read more..."
                        })+`
                    </td>
                    <td>`+_btnGroup(baction,i)+`</td>
                </tr>`;
            ;
        })
        // _.dperda.forEach((v,i) => {
        //     if(i>=_.tblStart && i<=_.tblStart+(_vmaxTabel-1)){
        //         fdata+=`
                // <tr style="padding:5px">
                //     <td>`+_btn({
                //         class:"btn btn-success",
                //         attr:`style="padding: 3px;"`,
                //         judul:no+_.tblStart
                //     })+`</td>
                //     <td>
                        // <span class="text-success">`+v.judul+`</span>
                        // <br>
                        // `+v.deskripsi+`
                //         <br>
                //         `+_btn({
                //             class:"btn btn-dark",
                //             attr:`onclick="_preview(`+i+`)" style="padding: 3px;"`,
                //             judul:"read more..."
                //         })+`
                //     </td>`;
                // if(faction){
                //     fdata+=_btnGroupTd(baction,i);
                // }
                // fdata+=`</tr>`;
        //             no++;
        //     }
        // });
    return fdata+=`</tbody>`;
}

function _add(){
    _file.data=[];
    _modalEx1({
        judul:"Tambah Peraturan".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formTambahPerda()+
            _inpImageView({
                id:"file",
                idView:"files",
                judul:"Dokumen Perda (PDF)",
                color:"black",
                func:"readFile(this)"
            }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_added()">SIMPAN</button>`
    });
}
function _added(){
    param={
        judul       :$('#judul').val(),
        deskripsi   :$('#deskripsi').val(),
    }
    if(_isNull(param.judul)){return _toast({isi:msg.addJudul})};
    if(_isNull(param.deskripsi)){return _toast({isi:msg.addDeskripsi})};
    _postFile("Proses/inpPeraturan",param,_file.data).then(res=>{
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
        _.dperda=data.dperda;
    }
    $('#tabelShow').html(setTabel());
    // _startTabel("dataTabel");
}
function _upd(ind){
    _modalEx1({
        judul:"Perbaikan Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_formTambahPerda(),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    $('#judul').val(_.dperda[ind].judul);
    $('#deskripsi').val(_.dperda[ind].deskripsi);
}
function _upded(ind){
    param={
        judul       :$('#judul').val(),
        deskripsi   :$('#deskripsi').val(),
        noPerda     :_.dperda[ind].noPerda,
    }
    if(_isNull(param.judul)){return _toast({isi:msg.addJudul})};
    if(_isNull(param.deskripsi)){return _toast({isi:msg.addDeskripsi})};
    _post("Proses/updPeraturan",param).then(res=>{
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
        noPerda     :_.dperda[ind].noPerda,
    }
    _post("Proses/delPeraturan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _preview(ind){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify({files:_.dperda[ind].files})));
}

function _selebumnya() {
    if(_.tblStart<=0){
        _.tblStart-=_vmaxTabel;
        pkali=_.dperda.length/_vmaxTabel;
        _.tblStart=Number(pkali)*_vmaxTabel;
        _.tblStart-=1;
    }else{
        return _selanjutnya();
    }
    
    $('#tabelShow').html(setTabel());
}
function _selanjutnya(){
    _.tblStart+=_vmaxTabel;

    if(_.tblStart>_.dperda.length){
        pkali=_.dperda.length/_vmaxTabel;
        _.tblStart=0;
    }
    $('#tabelShow').html(setTabel());
}