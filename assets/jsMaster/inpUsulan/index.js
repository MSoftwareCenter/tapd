function _onload(data){
    _.dkelompok=data.dkelompok;
    _.djenis=data.djenis;
    _.dsub=data.dsub;
    
    _.noPembahasan  =data.noPembahasan;
    _.perkada       =data.perkada;
    _.tahun         =data.tahun;
    
    _.dusulan=data.dusulan;
    _.kdMember=data.kdMember;
    _.ddinas    =data.ddinas;
    _.kdDinas   =data.kdDinas;

    _.filesUndangan=data.files;

    _.index=0;
    try {
        _.svKdKelompok=_.dkelompok[0].kdSub1;
    } catch (error) {
        
    }
    _.svKdJenis="";
    _.svKdSub="";

    _.qcode=data.qcode;
    _.kodePage=data.kodePage;

    _installVarAble({
        page:`Daftar Usulan`,
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
    
    navBar.menu[2].menu[0].active="active";
    // navBar.menu[1].menu[0].subMenu[1].status="active";

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
    
    if(_.filesUndangan.length>0){
        infoSupport.push({ 
            clsBtn:`btn-outline-success`
            ,func:"_viewUndangan()"
            ,icon:`<i class="mdi mdi-checkbox-multiple-marked-outline text-dark"></i>File Undangan`
            ,title:"Preview File Undangan"
        });
    }

    if(!Number(_.qcode[0].kunci) && _.noPembahasan>0){
        infoSupport.push({ 
            clsBtn:`btn-outline-primary`
            ,func:"_add()"
            ,icon:`<i class="mdi mdi-note-plus text-dark"></i> Tambah Usulan`
            ,title:"Tambah Usulan"
        });
        infoSupport.push({ 
            clsBtn:`btn-outline-success`
            ,func:"_sendUsulan()"
            ,icon:`<i class="mdi mdi-checkbox-multiple-marked-outline text-dark"></i> Kirim Usulan`
            ,title:"Kirim Usulan"
        });
    }
    return `<div class="row">
                <div class="col-sm-12">
                    <!-- Bootstrap tab card start -->
                    <div class="card">
                        <div class="card-header" style="padding: 30px;">
                            <h5 class="col-sm-3 text-info">Daftar Usulan</h5>
                            <span>
                                Penambahan Usulan Tahapan ke-`+(Number(_.noPembahasan))+`
                            </span>
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
        ,isi:_vtabel()
    });
}
function _vtabel() {
    baction=[];
    fbtn=false;
    baction.push({ 
        clsBtn:`btn-outline-secondary`,
        icon:`<i class="mdi mdi-eye"></i>`,
        func:"_preview()",
        title:"Preview Document"
    });
    if(!Number(_.qcode[1].kunci)){
        fbtn=true;
        baction.push({ 
            clsBtn:`btn-outline-warning`,
            icon:`<i class="mdi mdi-grease-pencil"></i>`,
            func:"_upd()",
            title:"Perbarui"
        });
        baction.push({ 
            clsBtn:`btn-outline-danger`,
            icon:`<i class="mdi mdi-delete-forever"></i>`,
            func:"_del()",
            title:"Hapus"
        });
    }
    fdata=`
        <thead>
            <th>No</th>
            <th >Struktur APBD - SUB Kegiatan - Usulan</th>
            <th>Volume</th>
            <th>Nilai</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
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
        
        _.dusulan.forEach((v,i) => {

            if(fkdSub1!=v.kdSub1 && v.kdSub1!=null){
                fkdSub1=v.kdSub1;
                fkdEnd=v.kdSub1;
                _.dusulan[i].subSelected=v.nmSub1;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub1+`</td>
                    <td>`+v.nmSub1+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(fkdSub2!=v.kdSub2 && v.kdSub2!=null){
                fkdSub2=v.kdSub2;
                fkdEnd=v.kdSub2;
                _.dusulan[i].subSelected=v.nmSub2;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub2+`</td>
                    <td>`+v.nmSub2+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(fkdSub3!=v.kdSub3 && v.kdSub3!=null){
                fkdSub3=v.kdSub3;
                fkdEnd=v.kdSub3;
                _.dusulan[i].subSelected=v.nmSub3;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub3+`</td>
                    <td>`+v.nmSub3+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(fkdSub4!=v.kdSub4 && v.kdSub4!=null){
                fkdSub4=v.kdSub4;
                fkdEnd=v.kdSub4;
                _.dusulan[i].subSelected=v.nmSub4;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub4+`</td>
                    <td>`+v.nmSub4+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(fkdSub5!=v.kdSub5 && v.kdSub5!=null){
                fkdSub5=v.kdSub5;
                fkdEnd=v.kdSub5;
                _.dusulan[i].subSelected=v.nmSub5;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub5+`</td>
                    <td>`+v.nmSub5+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(fkdSub6!=v.kdSub6 && v.kdSub6!=null){
                fkdSub6=v.kdSub6;
                fkdEnd=v.kdSub6;
                _.dusulan[i].subSelected=v.nmSub6;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub6+`</td>
                    <td>`+v.nmSub6+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(fkdSub7!=v.kdSub7 && v.kdSub7!=null){
                fkdSub7=v.kdSub7;
                fkdEnd=v.kdSub7;
                _.dusulan[i].subSelected=v.nmSub7;
                fdata+=`
                <tr style="padding:5px">
                    <td>`+v.kdSub7+`</td>
                    <td>`+v.nmSub7+`</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
            }
            if(v.nmUsulan!=undefined){
                ftam1=``;
                if(!_isNull(v.nmSub)){
                    ftam1=`<small>`+v.nmSub+`<br></small>`;
                }
                fdata+=`
                <tr style="padding:5px">
                    <td style="visibility: hidden;">`+fkdEnd+`</td>
                    <td>
                        - `+v.nmUsulan+`
                    </td>
                    <td>`+v.vol+` (`+v.sat+`)</td>
                    <td>`+_$(v.nilai)+`</td>
                    <td>`+_$(v.total)+`</td>
                    <td>`+v.status+`</td>
                    <td >`;
                        if(v.kdMember==_.kdMember && fbtn){
                            fdata+=_btnGroup(baction,i);
                        }else{
                            fdata+=_btnGroup([{ 
                                clsBtn:`btn-outline-secondary`,
                                icon:`<i class="mdi mdi-eye"></i>Document Tela'ahan`,
                                func:"_preview()",
                                title:"Preview Document"
                            }],i);
                        }
                    fdata+=`</td>
                </tr>`;
            }
            no++;
        });
    return fdata+=`</tbody>`;
}

function _viewUndangan(){
    if(_.filesUndangan.length>0){
        return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify(({files:_.filesUndangan}))));
    }else{
        _toast({isi:"Dokumen tidak tersedia !!!"});
    }
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
    _.svKdJenis=undefined;
    // $('#jikaBelanja').css({'display':""});
    // if(Number(v.value)==1){
    //     $('#jikaBelanja').css({'display':"none"});
    //     _.svKdJenis=_.djenis[Number(v.value)][0].value;
    // }
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
    _multiDropdonwSearch({
        data:_.dsub,
        idData:"dsub",
        id:"sub",
        value:"",
        func:"_selectSub",
        idDropdonw:"idInpDropSub",
    })
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

function _add(){
    _file.data=[];
    _modalEx1({
        judul:"Tambah Usulan".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        minWidth:"700px",
        isi:_formTambahUsulan()+
            _inpImageView({
                id:"file",
                idView:"files",
                judul:"Dokumen Tela'ahan Staf (PDF)",
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
        // if(_isNull(param.kdSub)){return _toast({isi:msg.addKode+" Sub Kegiatan"})};
    }
    
    if(_isNull(param.usulan)){return _toast({isi:msg.add+" Usulan"})};
    if(_isNull(param.nomor)){return _toast({isi:msg.add+" Nomor"})};

    if(_isNull(param.tanggal)){return _toast({isi:msg.add+" Tanggal"})};
    if(_isNull(param.volume)){return _toast({isi:msg.add+" Volume"})};
    if(_isNull(param.satuan)){return _toast({isi:msg.add+" Satuan"})};
    if(_isNull(param.nilai)){return _toast({isi:msg.add+" Nilai Satuan"})};

    if(_file.data.length<1){return _toast({isi:msg.add+" Dokument"})}
    _postFile("Proses/inpUsulan",param,_file.data).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _file.data=[];
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _respon(data){
    if(data!=null){
        _.dusulan=data.dusulan;
    }
    $('#tabelShow').html(setTabel());
    _startTabel("dataTabel");
    $(".bootstrap-data-table-panel").css({"width":"100%;"})
}
function _upd(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_formTambahUsulan(),
        minWidth:"700px",
        bg:"bg-warning",
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-warning" onclick="_upded(`+ind+`)">SIMPAN</button>`
    });
    index=-1;
    _.dkelompok.forEach((v,i) => {
        if(v.kdSub1==_.dusulan[ind].kdSub1){
            index=i;
        }
    });
    
    
    
    _selectKelompok({value:index});
    $('#kdKelompok').val(index);
    $('#idInpDropDinas').html(_.ddinas[_checkIndex(_.ddinas,_.dusulan[ind].kdDinas)].valueName)
    $('#idInpDropjenis').html(_.dusulan[ind].subSelected);
    $('#idInpDropSub').html(_.dusulan[ind].nmSub);
    $('#nomor').val(_.dusulan[ind].no);
    $('#tanggal').val(_.dusulan[ind].date);
    $('#volume').val(_.dusulan[ind].vol);
    $('#satuan').val(_.dusulan[ind].sat);
    $('#nilai').val(_.dusulan[ind].nilai);
    $('#usulan').val(_.dusulan[ind].nmUsulan);

    hitung(_.dusulan[ind].vol,_.dusulan[ind].nilai);
    _.noPembahasan=_.dusulan[ind].noPembahasan;
    _.svKdKelompok=_.dusulan[ind].kdSub1;
    _.svKdJenis=_.dusulan[ind].kdSubJenis;
    _.svKdSub=_.dusulan[ind].kdSub;
    
}
function _upded(ind){
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
        nilai       :$('#nilai').val(),
        kdUsulan    :_.dusulan[ind].kdUsulan
    }
    // return console.log(param);
    if(_isNull(param.kdKelompok)){return _toast({isi:msg.addKode+" Kelompok"})};
    if(_isNull(param.kdJenis)){return _toast({isi:msg.addKode+" Jenis Kelompok"})};
    
    if(Number($('#kdKelompok').val())==1){
        // if(_isNull(param.kdSub)){return _toast({isi:msg.addKode+" Sub Kegiatan"})};
    }

    if(_isNull(param.usulan)){return _toast({isi:msg.add+" Usulan"})};
    if(_isNull(param.nomor)){return _toast({isi:msg.add+" Nomor"})};

    if(_isNull(param.tanggal)){return _toast({isi:msg.add+" Tanggal"})};
    if(_isNull(param.volume)){return _toast({isi:msg.add+" Volume"})};
    if(_isNull(param.satuan)){return _toast({isi:msg.add+" Satuan"})};
    if(_isNull(param.nilai)){return _toast({isi:msg.add+" Nilai Satuan"})};

    _post("Proses/updUsulan",param).then(res=>{
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
        kdUsulan    :_.dusulan[ind].kdUsulan,
        noPembahasan:_.noPembahasan,
        perkada     :_.perkada,
        tahun       :_.tahun,
    }
    _post("Proses/delUsulan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _preview(ind){
    return _redirectOpen("laporan/previewFile/"+btoa(JSON.stringify({files:_.dusulan[ind].files})));
}
function _sendUsulan(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-checkbox-multiple-marked-outline"></i>`
        ,isi:"Kunci & Kirim Usulan Kepada Tim TAPD ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_sendUsulaned(`+ind+`)">Kirim</button>`
    })
}
function _sendUsulaned(ind) {
    param={
        noPembahasan:_.noPembahasan,
        kodePage:_.kodePage
    }
    _post("Proses/kirimUsulan",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _reload();
        }else{
            return _toast({isi:res.msg});
        }
    })
}