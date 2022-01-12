function _onload(data){
    _.dapbd=data.dapbd;
    
    _.ptahun=data.ptahun;
    
    _.tahun=data.dtahun;
    _.perkada=data.dperkada;
    _.pembahasan=data.dpembahasan;

    _.indT=_checkIndex(_.ptahun,_.tahun);
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.perkada);

    _.btn=false;
    if(_.pembahasan==0){
        _.btn=true;
    }
    //update tabel Setelah ada penambahan dan perubahan
    _.dapbd.updtSub1=false;
    _.dapbd.updtSub2=false;
    _.dapbd.updtSub3=false;
    _.dapbd.updtSub4=false;
    _.dapbd.updtSub5=false;
    _.dapbd.updtSub6=false;
    _.dapbd.updtSub7=false;

    _.Tampungtotal=0;
    _text={
        sub1:"Uraian",
        sub2:"SUb 1",
        sub3:"SUb 2",
        sub4:"SUb 3",
        sub5:"SUb 4",
        sub6:"SUb 5",
        sub7:"SUb 6",
        sub8:"SUb 7"
    };
    _installVarAble({
        page:`Data APBD`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Dashboard</a></li>`,
        form:_form()
    });
    
    navBar.menu[1].menu[0].active="active";
    navBar.menu[1].menu[0].subMenu[3].status="active";

    _installAble({form:true});
    myCode=data.code;
    // viewWebsite+=_form();


    $('#ptahun').val(_.tahun);
    $('#pperkada').val(_.perkada);
    $('#ppembahasan').val(_.pembahasan);

    // // _installMj(data);
    _startTabel("tabelSub1");
    _startTabel("tabelSub2");
    _startTabel("tabelSub3");
    _startTabel("tabelSub4");
    _startTabel("tabelSub5");
    _startTabel("tabelSub6");
    _startTabel("tabelSub7");
    // $('.dataTables_filter').css({'float':'right'});
}
function _form(){
    fwidth="14%;";
    fjudul="Sub Uraian";
    return _formAlbe({
        // btn:_btnGroupTd([{ 
        //     clsBtn:`btn-success`,
        //     icon:`<i class="mdi mdi-cloud-check text-light"></i>Donwload`,
        //     func:"_add()",
        //     title:"Donwload"
        // }]),
        judul:"Struktur APBD",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
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
                        </div>`
                        +`<div class="input-group mb-1">
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
                                <span class="input-group-text bg-warning text-dark" style="width: 150px;;">
                                    <i class="mdi mdi-numeric mr-2 text-dark"></i>PEMBAHASAN
                                </span>
                            </div>
                            <select id="ppembahasan" class="btn text-light bg-dark  form-control">
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
                            <button class="form-control btn btn-sm btn-primary" onclick="refreshData()">TAMPILKAN DATA</button>
                        </div>`
                }]
            })
            +`
            <hr>
            <div class="col-lg-12">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs  tabs" role="tablist">
                    <li class="nav-item" style="width: `+fwidth+`">
                        <a class="nav-link active" data-toggle="tab" href="#sub1t" role="tab">URAIAN</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(1)">
                        <a class="nav-link " data-toggle="tab" href="#sub2t" role="tab">`+fjudul+` 1</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(2)">
                        <a class="nav-link " data-toggle="tab" href="#sub3t" role="tab">`+fjudul+` 2</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(3)">
                        <a class="nav-link " data-toggle="tab" href="#sub4t" role="tab">`+fjudul+` 3</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(4)">
                        <a class="nav-link" data-toggle="tab" href="#sub5t" role="tab">`+fjudul+` 4</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(5)">
                        <a class="nav-link " data-toggle="tab" href="#sub6t" role="tab">`+fjudul+` 5</a>
                    </li>
                    <li class="nav-item" style="width: `+fwidth+`" onclick="_checkUpdTabel(6)">
                        <a class="nav-link" data-toggle="tab" href="#sub7t" role="tab">`+fjudul+` 6</a>
                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content tabs card-block">
                    <div class="tab-pane active" id="sub1t" role="tabpanel">
                        `+_formSub1()+`
                    </div>
                    <div class="tab-pane " id="sub2t" role="tabpanel">
                        `+_formSub2()+`
                    </div>
                    <div class="tab-pane " id="sub3t" role="tabpanel">
                        `+_formSub3()+`
                    </div>
                    <div class="tab-pane " id="sub4t" role="tabpanel">
                        `+_formSub4()+`
                    </div>
                    <div class="tab-pane" id="sub5t" role="tabpanel">
                        `+_formSub5()+`
                    </div>
                    <div class="tab-pane " id="sub6t" role="tabpanel">
                        `+_formSub6()+`
                    </div>
                    <div class="tab-pane" id="sub7t" role="tabpanel">
                        `+_formSub7()+`
                    </div>
                </div>
            </div>
        `
    });
    
}
function refreshData() {
    _redirect("control/apbd/"+btoa(JSON.stringify({perkada:$('#pperkada').val(),pembahasan:$('#ppembahasan').val(),tahun:$('#ptahun').val()})));
}
function _formSub1(){
    return _inpSejajar({
        color:"black",
        judul:"",
        isi:_btn({
            color:"primary",
            judul:`<i class="mdi mdi-book-plus"></i>Tambah Data`,
            attr:"style='float:right;' onclick='_addSub1()'",
            class:"btn btn-primary btn-sm"
        })
    })+`
        <div id='tabelSub1Show' style="margin: auto;">`
            +setTabelSub1()
        +`</div>`;
}
function _formSub2(){
    return `
        <div id='tabelSub2Show' style="margin: auto;">`
            +setTabelSub2()
        +`</div>`;
}
function _formSub3(){
    return `
        <div id='tabelSub3Show' style="margin: auto;">`
            +setTabelSub3()
        +`</div>`;
}
function _formSub4(){
    return `
        <div id='tabelSub4Show' style="margin: auto;">`
            +setTabelSub4()
        +`</div>`;
}
function _formSub5(){
    return `
        <div id='tabelSub5Show' style="margin: auto;">`
            +setTabelSub5()
        +`</div>`;
}
function _formSub6(){
    return `
        <div id='tabelSub6Show' style="margin: auto;">`
            +setTabelSub6()
        +`</div>`;
}
function _formSub7(){
    return `
        <div id='tabelSub7Show' style="margin: auto;">`
            +setTabelSub7()
        +`</div>`;
}

function setTabelSub1() {
    ftabel=`
    <div class="table-responsive">
        <table id="tabelSub1" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama Uraian</th>
                    <th>Pagu</th>
                    <th>Aksi Uraian</th>
                    <th>Aksi Sub 1</th>
                </tr>
            </thead>
            <tbody>`;
    _.dapbd.dsub1.forEach((v,i) => {
        
        ftam=`
            <button type="button" class="btn btn-sm btn-outline-danger">
                <i class="mdi mdi-lock"></i>
            </button>
        `;
        ftam1="";
        if(_.btn){
            ftam=`
                <div class="btn-group mr-2">
                    <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub1(`+i+`)" title="Perbarui Uraian">
                        <i class="mdi mdi-grease-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub1(`+i+`)" title="Hapus Uraian">
                        <i class="mdi mdi-delete-forever"></i>
                    </button>
                </div>
            `;
            ftam1=`
                <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub2(`+i+`)" title="Tambah Uraian `+_text.sub1+`">
                    <i class="mdi mdi-book-plus"></i>
                </button>
            `;
        }

        ftotalxx=v.pagu1;
        if(v.nmSub1=="PEMBIAYAAN DAERAH"){
            ftotalxx=0;
            _.dapbd.dsub2.forEach((vxx,ixx) => {
                if(vxx.nmSub2=="PENERIMAAN PEMBIAYAAN"){
                    ftotalxx+=vxx.pagu2;
                }
                if(vxx.nmSub2=="PENGELUARAN PEMBIAYAAN"){
                    ftotalxx-=vxx.pagu2;
                }
            });
        }
        ftabel+=`
            <tr>
                <td>`+(i+1)+`</td>
                <td>`+v.nmSub1+`</td>
                <td id='pagu1`+i+`'>`+_$(ftotalxx)+`</td>
                <td style="width: 15%;">
                    `+ftam+`
                </td>
                <td style="width: 15%;">
                    <div class="btn-group mr-2">
                        `+ftam1+`
                        <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub2(`+i+`,this)" title="Buka Data `+_text.sub1+`">
                            <i class="mdi mdi-book-open-variant"></i>
                        </button>
                    </div>
                </td>
            </tr>
            <tr id="sub2`+i+`" style="display: none;">
                <td>`+(i+1)+`</td>
                <td></td>
                <td></td>
                <td style="width: 15%;">
                </td>
                <td style="width: 12%;">
                </td>
            </tr>
        `;
    }); 
                
    return ftabel+=`</tbody>
        </table>
    </div>`
}
function _addSub1(){
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub1",
            placeholder:"Kode "+_text.sub1,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub1",
            placeholder:"Nama "+_text.sub1,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu1",
            placeholder:"Pagu "+_text.sub1,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub1()">SIMPAN</button>`
    });
}
function _addedSub1(){
    param={
        kd      :$('#kdSub1').val(),
        nm      :$('#nmSub1').val(),
        pagu    :$('#pagu1').val(),
        pembahasan:_.pembahasan,
        perkada:_.perkada,
        tahun:_.tahun,

    }
    if(_isNull(param.kd)){return _toast({text:msg.addKode+_text.sub1})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+_text.sub1})};
    if(_isNull(param.pagu)){return _toast({isi:msg.addPagu+_text.sub1})};

    _post("Proses/inpSub1",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub1(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub1(data){
    if(data!=null){
        _.dapbd.dsub1=data.dsub1;
    }
    $('#tabelSub1Show').html(setTabelSub1());
    _startTabel("tabelSub1");
}
function _updSub1(ind){
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub1",
            placeholder:"Nama "+_text.sub1,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu1",
            placeholder:"Pagu "+_text.sub1,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub1(`+ind+`)">SIMPAN</button>`
    });
    $('#nmSub1').val(_.dapbd.dsub1[ind].nmSub1);
    $('#pagu1').val(_.dapbd.dsub1[ind].pagu1);
}
function _updedSub1(ind){
    param={
        kd  :_.dapbd.dsub1[ind].kdSub1,
        nm  :$('#nmSub1').val(),
        pagu:$('#pagu1').val(),
        pembahasan:_.dapbd.dsub1[ind].noPembahasan1,
        perkada:_.dapbd.dsub1[ind].perkada1,
        tahun:_.dapbd.dsub1[ind].date1
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+inpSub1})};

    _post("Proses/updSub1",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub1(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub1(ind){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub1(`+ind+`)">Hapus</button>`
    })
}
function _deledSub1(ind){
    param={
        kd          :_.dapbd.dsub1[ind].kdSub1,
        pembahasan  :_.dapbd.dsub1[ind].noPembahasan1,
        tahun       :_.dapbd.dsub1[ind].date1,
        perkada     :_.dapbd.dsub1[ind].perkada1,
    }
    _post("Proses/delSub1",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub1(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}

function _addSub2(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub2",
            placeholder:"Kode "+_text.sub2,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub2",
            placeholder:"Nama "+_text.sub2,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu2",
            placeholder:"Pagu "+_text.sub2,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub2(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub2(ind){
    param={
        kd      :$('#kdSub2').val(),
        kdSub1  :_.dapbd.dsub1[ind].kdSub1,
        nm      :$('#nmSub2').val(),
        pagu    :$('#pagu2').val(),
        pembahasan  :_.dapbd.dsub1[ind].noPembahasan1,
        tahun       :_.dapbd.dsub1[ind].date1,
        perkada     :_.dapbd.dsub1[ind].perkada1,
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" "+_text.sub2})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub2})};

    _post("Proses/inpSub2",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub2(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub2(data,ind,fall) {
    fcolspan="5";
    if(data!=null){
        _.dapbd.dsub2=data.dsub2;
    }
    if(fall==undefined){
        _.dapbd.updtSub2=true;
        _tamp1=ind;
        $('#sub2'+ind).css({'display':""});
        $('#sub2'+ind).html(`
            <td colspan=`+fcolspan+`>
                `+setTabelSub2(_.dapbd.dsub1[ind].kdSub1)+`
            </td>
        `);
        _.dapbd.dsub1[ind].pagu1=_.Tampungtotal;
        $('#pagu1'+ind).html(_$(_.Tampungtotal));
    }else{
        if(fall){
            $('#tabelSub2Show').html(setTabelSub2());
            _startTabel("tabelSub2");
        }else{
            _.dapbd.updtSub2=true;
            $('#sub2'+_tamp1).css({'display':""});
            $('#sub2'+_tamp1).html(`
                <td colspan=`+fcolspan+`>
                    `+setTabelSub2(_.dapbd.dsub1[_tamp1].kdSub1)+`
                </td>
            `);
            _.dapbd.dsub1[_tamp1].pagu1=_.Tampungtotal;
            $('#pagu1'+_tamp1).html(_$(_.Tampungtotal));
        }
    }
}
function setTabelSub2(kdSub1) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi `+_text.sub3+`</th>`;
    fidTabel="tabelSub2";
    if(kdSub1!=undefined){
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
                    <th>Nama `+_text.sub2+`</th>
                    <th>Pagu</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    _.Tampungtotal=0;
    _.dapbd.dsub2.forEach((v,i) => {
        if(fall){

            ftam=`
                <button type="button" class="btn btn-sm btn-outline-danger">
                    <i class="mdi mdi-lock"></i>
                </button>
            `;
            ftam1="";
            if(_.btn){
                ftam=`
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub2(`+i+`,`+fall+`)" title="Perbarui Data `+_text.sub2+`">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub2(`+i+`,`+fall+`)" title="Hapus Data `+_text.sub2+`">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                `;
                ftam1=`
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub3(`+i+`,`+fall+`)" title="Tambah Data `+_text.sub3+`">
                        <i class="mdi mdi-book-plus"></i>
                    </button>
                `;
            }
            
            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub2+`</td>
                    <td id='pagu2`+i+`'>`+_$(v.pagu2)+`</td>
                    <td style="width: 15%;">
                        `+ftam+`
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            `+ftam1+`
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub3(`+i+`,this)" title="Buka Data `+_text.sub3+`">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="sub3`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdSub1==v.kdSub1){
                if(Number(v.pagu2)>0){
                    _.Tampungtotal+=parseFloat(v.pagu2);
                }
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub2+`</td>
                        <td>`+_$(v.pagu2)+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub2(`+i+`,`+fall+`)" title="Perbarui Uraian">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub2(`+i+`,`+fall+`)" title="Hapus Uraian">
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
function _updSub2(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub2
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub2",
            placeholder:"Nama "+_text.sub2,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu2",
            placeholder:"Pagu "+_text.sub2,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub2(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub2').val(_.dapbd.dsub2[ind].nmSub2);
    $('#pagu2').val(_.dapbd.dsub2[ind].pagu2);
}
function _updedSub2(ind,fall){
    param={
        kdSub1    :_.dapbd.dsub2[ind].kdSub1,
        kd        :_.dapbd.dsub2[ind].kdSub2,
        nm        :$('#nmSub2').val(),
        pagu      :$('#pagu2').val(),
        pembahasan  :_.dapbd.dsub2[ind].noPembahasan2,
        tahun       :_.dapbd.dsub2[ind].date2,
        perkada     :_.dapbd.dsub2[ind].perkada2,
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub2})};

    _post("Proses/updSub2",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub2(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub2(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub2(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub2(ind,fall){
    param={
        kdSub1   :_.dapbd.dsub2[ind].kdSub1,
        kd       :_.dapbd.dsub2[ind].kdSub2,
        pembahasan  :_.dapbd.dsub2[ind].noPembahasan2,
        tahun       :_.dapbd.dsub2[ind].date2,
        perkada     :_.dapbd.dsub2[ind].perkada2
    }
    _post("Proses/delSub2",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub2(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub2(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub2'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub2(null,ind)
    }
}


function _addSub3(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub3",
            placeholder:"Kode "+_text.sub3,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub3",
            placeholder:"Nama "+_text.sub3,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu3",
            placeholder:"Pagu "+_text.sub3,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub3(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub3(ind){
    param={
        kd      :$('#kdSub3').val(),
        kdSub2  :_.dapbd.dsub2[ind].kdSub2,
        nm      :$('#nmSub3').val(),
        pagu    :$('#pagu3').val(),
        pembahasan  :_.dapbd.dsub2[ind].noPembahasan2,
        tahun       :_.dapbd.dsub2[ind].date2,
        perkada     :_.dapbd.dsub2[ind].perkada2
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" "+_text.sub3})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub3})};

    _post("Proses/inpSub3",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub3(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub3(data,ind,fall) {
    fcolspan="5";
    if(data!=null){
        _.dapbd.dsub3=data.dsub3;
    }
    if(fall==undefined){
        _tamp1=ind;
        _.dapbd.updtSub3=true;
        $('#sub3'+ind).css({'display':""});
        $('#sub3'+ind).html(`
            <td colspan=`+fcolspan+`>
                `+setTabelSub3(_.dapbd.dsub2[ind].kdSub2)+`
            </td>
        `);
        _.dapbd.dsub2[ind].pagu2=_.Tampungtotal;
        $('#pagu2'+ind).html(_$(_.Tampungtotal));
    }else{
        if(fall){
            $('#tabelSub3Show').html(setTabelSub3());
            _startTabel("tabelSub3");
        }else{
            _.dapbd.updtSub3=true;
            $('#sub3'+_tamp1).css({'display':""});
            $('#sub3'+_tamp1).html(`
                <td colspan=`+fcolspan+`>
                    `+setTabelSub3(_.dapbd.dsub2[_tamp1].kdSub2)+`
                </td>
            `);
            _.dapbd.dsub2[_tamp1].pagu2=_.Tampungtotal;
            $('#pagu2'+_tamp1).html(_$(_.Tampungtotal));
        }
    }
}
function setTabelSub3(kdSub2) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi `+_text.sub4+`</th>`;
    fidTabel="tabelSub3";
    if(kdSub2!=undefined){
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
                    <th>Nama `+_text.sub3+`</th>
                    <th>Pagu</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    _.Tampungtotal=0;
    _.dapbd.dsub3.forEach((v,i) => {
        if(fall){

            ftam=`
                <button type="button" class="btn btn-sm btn-outline-danger">
                    <i class="mdi mdi-lock"></i>
                </button>
            `;
            ftam1="";
            if(_.btn){
                ftam=`
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub3(`+i+`,`+fall+`)" title="Perbarui `+_text.sub3+`">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub3(`+i+`,`+fall+`)" title="Hapus `+_text.sub3+`">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                `;
                ftam1=`
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub4(`+i+`,`+fall+`)" title="Tambah Data `+_text.sub4+`">
                        <i class="mdi mdi-book-plus"></i>
                    </button>
                `;
            }

            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub3+`</td>
                    <td id='pagu3`+i+`'>`+_$(v.pagu3)+`</td>
                    <td style="width: 15%;">
                        `+ftam+`
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            `+ftam1+`
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub4(`+i+`,this)" title="Buka Data `+_text.sub4+`">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="sub4`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdSub2==v.kdSub2){
                if(Number(v.pagu3)>0){
                    _.Tampungtotal+=parseFloat(v.pagu3);
                }
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub3+`</td>
                        <td>`+_$(v.pagu3)+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub3(`+i+`,`+fall+`)" title="Perbarui Uraian">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub3(`+i+`,`+fall+`)" title="Hapus Uraian">
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
function _updSub3(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub3
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub3",
            placeholder:"Nama "+_text.sub4,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu3",
            placeholder:"Pagu "+_text.sub3,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub3(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub3').val(_.dapbd.dsub3[ind].nmSub3);
    $('#pagu3').val(_.dapbd.dsub3[ind].pagu3);
}
function _updedSub3(ind,fall){
    param={
        kdSub2    :_.dapbd.dsub3[ind].kdSub2,
        kd        :_.dapbd.dsub3[ind].kdSub3,
        nm        :$('#nmSub3').val(),
        pagu      :$('#pagu3').val(),
        pembahasan  :_.dapbd.dsub3[ind].noPembahasan3,
        tahun       :_.dapbd.dsub3[ind].date3,
        perkada     :_.dapbd.dsub3[ind].perkada3
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub4})};

    _post("Proses/updSub3",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub3(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub3(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub3(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub3(ind,fall){
    param={
        kdSub2    :_.dapbd.dsub3[ind].kdSub2,
        kd        :_.dapbd.dsub3[ind].kdSub3,
        pembahasan  :_.dapbd.dsub3[ind].noPembahasan3,
        tahun       :_.dapbd.dsub3[ind].date3,
        perkada     :_.dapbd.dsub3[ind].perkada3
    }
    _post("Proses/delSub3",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub3(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub3(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub3'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub3(null,ind)
    }
}


function _addSub4(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub4",
            placeholder:"Kode "+_text.sub4,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub4",
            placeholder:"Nama "+_text.sub4,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu4",
            placeholder:"Pagu "+_text.sub4,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub4(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub4(ind){
    param={
        kd      :$('#kdSub4').val(),
        kdSub3  :_.dapbd.dsub3[ind].kdSub3,
        nm      :$('#nmSub4').val(),
        pagu    :$('#pagu4').val(),
        pembahasan  :_.dapbd.dsub3[ind].noPembahasan3,
        tahun       :_.dapbd.dsub3[ind].date3,
        perkada     :_.dapbd.dsub3[ind].perkada3
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" "+_text.sub5})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub5})};

    _post("Proses/inpSub4",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub4(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub4(data,ind,fall) {
    fcolspan="5";
    if(data!=null){
        _.dapbd.dsub4=data.dsub4;
    }
    if(fall==undefined){
        _.dapbd.updtSub4=true;
        _tamp1=ind;
        $('#sub4'+ind).css({'display':""});
        $('#sub4'+ind).html(`
            <td colspan=`+fcolspan+`>
                `+setTabelSub4(_.dapbd.dsub3[ind].kdSub3)+`
            </td>
        `)
        _.dapbd.dsub3[ind].pagu3=_.Tampungtotal;
        $('#pagu3'+ind).html(_$(_.Tampungtotal));
    }else{
        if(fall){
            $('#tabelSub4Show').html(setTabelSub4());
            _startTabel("tabelSub4");
        }else{
            _.dapbd.updtSub4=true;
            $('#sub4'+_tamp1).css({'display':""});
            $('#sub4'+_tamp1).html(`
                <td colspan=`+fcolspan+`>
                    `+setTabelSub4(_.dapbd.dsub3[_tamp1].kdSub3)+`
                </td>
            `);
            _.dapbd.dsub3[_tamp1].pagu3=_.Tampungtotal;
            $('#pagu3'+_tamp1).html(_$(_.Tampungtotal));
        }
    }
}
function setTabelSub4(kdSub3) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi `+_text.sub5+`</th>`;
    fidTabel="tabelSub4";
    if(kdSub3!=undefined){
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
                    <th>Nama `+_text.sub4+`</th>
                    <th>Pagu</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    _.Tampungtotal=0;
    _.dapbd.dsub4.forEach((v,i) => {
        if(fall){

            ftam=`
                <button type="button" class="btn btn-sm btn-outline-danger">
                    <i class="mdi mdi-lock"></i>
                </button>
            `;
            ftam1="";
            if(_.btn){
                ftam=`
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub4(`+i+`,`+fall+`)" title="Perbarui `+_text.sub4+`">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub4(`+i+`,`+fall+`)" title="Hapus `+_text.sub4+`">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                `;
                ftam1=`
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub5(`+i+`,`+fall+`)" title="Tambah Data `+_text.sub5+`">
                        <i class="mdi mdi-book-plus"></i>
                    </button>
                `;
            }

            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub4+`</td>
                    <td id='pagu4`+i+`'>`+_$(v.pagu4)+`</td>
                    <td style="width: 15%;">
                        `+ftam+`
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            `+ftam1+`
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub5(`+i+`,this)" title="Buka Data `+_text.sub5+`">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="sub5`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdSub3==v.kdSub3){
                if(Number(v.pagu4)>0){
                    _.Tampungtotal+=parseFloat(v.pagu4);
                }
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub4+`</td>
                        <td>`+_$(v.pagu4)+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub4(`+i+`,`+fall+`)" title="Perbarui Uraian">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub4(`+i+`,`+fall+`)" title="Hapus Uraian">
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
function _updSub4(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub4
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub4",
            placeholder:"Nama "+_text.sub4,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu4",
            placeholder:"Pagu "+_text.sub4,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub4(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub4').val(_.dapbd.dsub4[ind].nmSub4);
    $('#pagu4').val(_.dapbd.dsub4[ind].pagu4);
}
function _updedSub4(ind,fall){
    param={
        kdSub3   :_.dapbd.dsub4[ind].kdSub3,
        kd       :_.dapbd.dsub4[ind].kdSub4,
        nm       :$('#nmSub4').val(),
        pagu     :$('#pagu4').val(),
        pembahasan  :_.dapbd.dsub4[ind].noPembahasan4,
        tahun       :_.dapbd.dsub4[ind].date4,
        perkada     :_.dapbd.dsub4[ind].perkada4
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub5})};

    _post("Proses/updSub4",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub4(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub4(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub4(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub4(ind,fall){
    param={
        kdSub3    :_.dapbd.dsub4[ind].kdSub3,
        kd        :_.dapbd.dsub4[ind].kdSub4,
        pembahasan  :_.dapbd.dsub4[ind].noPembahasan4,
        tahun       :_.dapbd.dsub4[ind].date4,
        perkada     :_.dapbd.dsub4[ind].perkada4
    }
    _post("Proses/delSub4",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub4(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub4(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub4'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub4(null,ind)
    }
}


function _addSub5(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub5",
            placeholder:"Kode "+_text.sub5,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub5",
            placeholder:"Nama "+_text.sub5,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu5",
            placeholder:"Pagu "+_text.sub5,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub5(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub5(ind){
    param={
        kd      :$('#kdSub5').val(),
        kdSub4  :_.dapbd.dsub4[ind].kdSub4,
        nm      :$('#nmSub5').val(),
        pagu    :$('#pagu5').val(),
        pembahasan  :_.dapbd.dsub4[ind].noPembahasan4,
        tahun       :_.dapbd.dsub4[ind].date4,
        perkada     :_.dapbd.dsub4[ind].perkada4
    }
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" Sub5"})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" Sub5"})};

    _post("Proses/inpSub5",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub5(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub5(data,ind,fall) {
    fcolspan="5";
    if(data!=null){
        _.dapbd.dsub5=data.dsub5;
    }
    if(fall==undefined){
        _.dapbd.updtSub5=true;
        _tamp1=ind;
        $('#sub5'+ind).css({'display':""});
        $('#sub5'+ind).html(`
            <td colspan=`+fcolspan+`>
                `+setTabelSub5(_.dapbd.dsub4[ind].kdSub4)+`
            </td>
        `)
        _.dapbd.dsub4[_tamp1].pagu4=_.Tampungtotal;
        $('#pagu4'+ind).html(_$(_.Tampungtotal));
    }else{
        if(fall){
            $('#tabelSub5Show').html(setTabelSub5());
            _startTabel("tabelSub5");
        }else{
            _.dapbd.updtSub5=true;
            $('#sub5'+_tamp1).css({'display':""});
            $('#sub5'+_tamp1).html(`
                <td colspan=`+fcolspan+`>
                    `+setTabelSub5(_.dapbd.dsub4[_tamp1].kdSub4)+`
                </td>
            `)
            _.dapbd.dsub4[_tamp1].pagu4=_.Tampungtotal;
            $('#pagu4'+_tamp1).html(_$(_.Tampungtotal));
        }
    }
}
function setTabelSub5(kdSub4) {
    fall=true;
    fclose="";
    fidTabel="tabelSub5";
    ftambahanAksi=`<th>Aksi `+_text.sub6+`</th>`;
    if(kdSub4!=undefined){
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
                    <th>Nama `+_text.sub5+`</th>
                    <th>Pagu</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    _.Tampungtotal=0;
    _.dapbd.dsub5.forEach((v,i) => {
        if(fall){

            ftam=`
                <button type="button" class="btn btn-sm btn-outline-danger">
                    <i class="mdi mdi-lock"></i>
                </button>
            `;
            ftam1="";
            if(_.btn){
                ftam=`
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub5(`+i+`,`+fall+`)" title="Perbarui `+_text.sub5+`">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub5(`+i+`,`+fall+`)" title="Hapus `+_text.sub5+`">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                `;
                ftam1=`
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub6(`+i+`,`+fall+`)" title="Tambah Data `+_text.sub6+`">
                        <i class="mdi mdi-book-plus"></i>
                    </button>
                `;
            }

            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub5+`</td>
                    <td id='pagu5`+i+`'>`+_$(v.pagu5)+`</td>
                    <td style="width: 15%;">
                        `+ftam+`
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            `+ftam1+`
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub6(`+i+`,this)" title="Buka Data `+_text.sub6+`">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="sub6`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdSub4==v.kdSub4){
                if(Number(v.pagu5)>0){
                    _.Tampungtotal+=parseFloat(v.pagu5);
                }
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub5+`</td>
                        <td>`+_$(v.pagu5)+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub5(`+i+`,`+fall+`)" title="Perbarui Uraian">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub5(`+i+`,`+fall+`)" title="Hapus Uraian">
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
function _updSub5(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub5
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub5",
            placeholder:"Nama "+_text.sub5,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu5",
            placeholder:"Pagu "+_text.sub5,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub5(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub5').val(_.dapbd.dsub5[ind].nmSub5);
    $('#pagu5').val(_.dapbd.dsub5[ind].pagu5);

}
function _updedSub5(ind,fall){
    param={
        kdSub4      :_.dapbd.dsub5[ind].kdSub4,
        kd          :_.dapbd.dsub5[ind].kdSub5,
        nm          :$('#nmSub5').val(),
        pagu        :$('#pagu5').val(),
        pembahasan  :_.dapbd.dsub5[ind].noPembahasan5,
        tahun       :_.dapbd.dsub5[ind].date5,
        perkada     :_.dapbd.dsub5[ind].perkada5
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub5})};

    _post("Proses/updSub5",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub5(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub5(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub5(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub5(ind,fall){
    param={
        kdSub4  :_.dapbd.dsub5[ind].kdSub4,
        kd      :_.dapbd.dsub5[ind].kdSub5,
        pembahasan  :_.dapbd.dsub5[ind].noPembahasan5,
        tahun       :_.dapbd.dsub5[ind].date5,
        perkada     :_.dapbd.dsub5[ind].perkada5
    }
    _post("Proses/delSub5",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub5(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub5(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub5'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub5(null,ind)
    }
}


function _addSub6(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub6",
            placeholder:"Kode "+_text.sub6,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub6",
            placeholder:"Nama "+_text.sub6,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu6",
            placeholder:"Pagu "+_text.sub6,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub6(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub6(ind){
    param={
        kd      :$('#kdSub6').val(),
        kdSub5  :_.dapbd.dsub5[ind].kdSub5,
        nm      :$('#nmSub6').val(),
        pagu    :$('#pagu6').val(),
        pembahasan  :_.dapbd.dsub5[ind].noPembahasan5,
        tahun       :_.dapbd.dsub5[ind].date5,
        perkada     :_.dapbd.dsub5[ind].perkada5
    }
    // return console.log(param);
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" "+_text.sub7})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub7})};

    _post("Proses/inpSub6",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub6(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub6(data,ind,fall) {
    fcolspan="5";
    if(data!=null){
        _.dapbd.dsub6=data.dsub6;
    }
    if(fall==undefined){
        _.dapbd.updtSub6=true;
        _tamp1=ind;
        $('#sub6'+ind).css({'display':""});
        $('#sub6'+ind).html(`
            <td colspan=`+fcolspan+`>
                `+setTabelSub6(_.dapbd.dsub5[ind].kdSub5)+`
            </td>
        `)
        _.dapbd.dsub5[ind].pagu5=_.Tampungtotal;
        $('#pagu5'+ind).html(_$(_.Tampungtotal));
    }else{
        if(fall){
            $('#tabelSub6Show').html(setTabelSub6());
            _startTabel("tabelSub6");
        }else{
            _.dapbd.updtSub6=true;
            $('#sub6'+_tamp1).css({'display':""});
            $('#sub6'+_tamp1).html(`
                <td colspan=`+fcolspan+`>
                    `+setTabelSub6(_.dapbd.dsub5[_tamp1].kdSub5)+`
                </td>
            `)
            _.dapbd.dsub5[_tamp1].pagu5=_.Tampungtotal;
            $('#pagu5'+_tamp1).html(_$(_.Tampungtotal));
        }
    }
}
function setTabelSub6(kdSub5) {
    fall=true;
    fclose="";
    ftambahanAksi=`<th>Aksi `+_text.sub7+`</th>`;
    fidTabel="tabelSub6";
    if(kdSub5!=undefined){
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
                    <th>Nama `+_text.sub6+`</th>
                    <th>Pagu</th>
                    <th>Aksi</th>
                    `+ftambahanAksi+`
                </tr>
            </thead>
            <tbody>`;
    no=1;
    _.Tampungtotal=0;
    _.dapbd.dsub6.forEach((v,i) => {
        if(fall){

            ftam=`
                <button type="button" class="btn btn-sm btn-outline-danger">
                    <i class="mdi mdi-lock"></i>
                </button>
            `;
            ftam1="";
            if(_.btn){
                ftam=`
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub6(`+i+`,`+fall+`)" title="Perbarui `+_text.sub6+`">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub6(`+i+`,`+fall+`)" title="Hapus `+_text.sub6+`">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                `;
                ftam1=`
                    <button type="button" class="btn btn-sm btn-outline-primary" onclick="_addSub7(`+i+`,`+fall+`)" title="Tambah Data `+_text.sub7+`">
                        <i class="mdi mdi-book-plus"></i>
                    </button>
                `;
            }

            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub6+`</td>
                    <td id='pagu6`+i+`'>`+_$(v.pagu6)+`</td>
                    <td style="width: 15%;">
                        `+ftam+`
                    </td>
                    <td style="width: 15%;">
                        <div class="btn-group mr-2">
                            `+ftam1+`
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="_closeOpenSub7(`+i+`,this)" title="Buka Data `+_text.sub7+`">
                                <i class="mdi mdi-book-open-variant"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr id="sub7`+i+`" style="display: none;">
                    <td>`+no+`</td>
                    <td></td>
                    <td></td>
                    <td style="width: 15%;">
                    </td>
                    <td style="width: 12%;">
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdSub5==v.kdSub5){
                if(Number(v.pagu6)>0){
                    _.Tampungtotal+=parseFloat(v.pagu6);
                }
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub6+`</td>
                        <td>`+_$(v.pagu6)+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub6(`+i+`,`+fall+`)" title="Perbarui Uraian">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub6(`+i+`,`+fall+`)" title="Hapus Uraian">
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
function _updSub6(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub6
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub6",
            placeholder:"Nama "+_text.sub6,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu6",
            placeholder:"Pagu "+_text.sub6,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub6(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub6').val(_.dapbd.dsub6[ind].nmSub6);
    $('#pagu6').val(_.dapbd.dsub6[ind].pagu6);
}
function _updedSub6(ind,fall){
    param={
        kdSub5   :_.dapbd.dsub6[ind].kdSub5,
        kd       :_.dapbd.dsub6[ind].kdSub6,
        nm       :$('#nmSub6').val(),
        pagu     :$('#pagu6').val(),
        pembahasan  :_.dapbd.dsub6[ind].noPembahasan6,
        tahun       :_.dapbd.dsub6[ind].date6,
        perkada     :_.dapbd.dsub6[ind].perkada6
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub7})};

    _post("Proses/updSub6",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub6(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub6(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub6(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub6(ind,fall){
    param={
        kdSub5    :_.dapbd.dsub6[ind].kdSub5,
        kd        :_.dapbd.dsub6[ind].kdSub6,
        pembahasan  :_.dapbd.dsub6[ind].noPembahasan6,
        tahun       :_.dapbd.dsub6[ind].date6,
        perkada     :_.dapbd.dsub6[ind].perkada6
    }
    _post("Proses/delSub6",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub6(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub6(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub6'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub6(null,ind)
    }
}


function _addSub7(ind) {
    _modalEx1({
        judul:"Tambah Data".toUpperCase(),
        icon:`<i class="mdi mdi-note-plus"></i>`,
        isi:_inpGroupPrepend({
            id:"kdSub7",
            placeholder:"Kode "+_text.sub7,
            type:"text",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"nmSub7",
            placeholder:"Nama "+_text.sub7,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu7",
            placeholder:"Pagu "+_text.sub7,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_addedSub7(`+ind+`)">SIMPAN</button>`
    });
}
function _addedSub7(ind){
    param={
        kd      :$('#kdSub7').val(),
        kdSub6  :_.dapbd.dsub6[ind].kdSub6,
        nm      :$('#nmSub7').val(),
        pagu    :$('#pagu7').val(),
        pembahasan  :_.dapbd.dsub6[ind].noPembahasan6,
        tahun       :_.dapbd.dsub6[ind].date6,
        perkada     :_.dapbd.dsub6[ind].perkada6
    }
    if(_isNull(param.kd)){return _toast({text:msg.addKode+" "+_text.sub8})};
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub8})};

    _post("Proses/inpSub7",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub7(res.data,ind);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _responSub7(data,ind,fall) {
    fcolspan="5";
    if(data!=null){
        _.dapbd.dsub7=data.dsub7;
    }
    if(fall==undefined){
        _.dapbd.updtSub7=true;
        _tamp1=ind;
        $('#sub7'+ind).css({'display':""});
        $('#sub7'+ind).html(`
            <td colspan=`+fcolspan+`>
                `+setTabelSub7(_.dapbd.dsub6[ind].kdSub6)+`
            </td>
        `)
        _.dapbd.dsub6[ind].pagu6=_.Tampungtotal;
        $('#pagu6'+ind).html(_$(_.Tampungtotal));
    }else{
        if(fall){
            $('#tabelSub7Show').html(setTabelSub7());
            _startTabel("tabelSub7");
        }else{
            _.dapbd.updtSub7=true;
            $('#sub7'+_tamp1).css({'display':""});
            $('#sub7'+_tamp1).html(`
                <td colspan=`+fcolspan+`>
                    `+setTabelSub7(_.dapbd.dsub6[_tamp1].kdSub6)+`
                </td>
            `)
            _.dapbd.dsub6[_tamp1].pagu6=_.Tampungtotal;
            $('#pagu6'+_tamp1).html(_$(_.Tampungtotal));
        }
    }
}
function setTabelSub7(kdSub6) {
    fall=true;
    fclose="";
    fidTabel="tabelSub7";
    if(kdSub6!=undefined){
        fall=false;
        fidTabel="";
    }
    ftabel=`
    <div class="table-responsive">
        <table id="`+fidTabel+`" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>no</th>
                    <th>Nama `+_text.sub7+`</th>
                    <th>Pagu</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>`;
    no=1;
    _.Tampungtotal=0;
    _.dapbd.dsub7.forEach((v,i) => {
        if(fall){
            ftam=`
                <button type="button" class="btn btn-sm btn-outline-danger">
                    <i class="mdi mdi-lock"></i>
                </button>
            `;
            if(_.btn){
                ftam=`
                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub7(`+i+`,`+fall+`)" title="Perbarui `+_text.sub7+`">
                            <i class="mdi mdi-grease-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub7(`+i+`,`+fall+`)" title="Hapus `+_text.sub7+`">
                            <i class="mdi mdi-delete-forever"></i>
                        </button>
                    </div>
                `;
            }
            
            ftabel+=`
                <tr>
                    <td>`+(no)+`</td>
                    <td>`+v.nmSub7+`</td>
                    <td id='pagu7`+i+`'>`+_$(v.pagu7)+`</td>
                    <td style="width: 15%;">
                        `+ftam+`
                    </td>
                </tr>
            `;
            no++;
        }else{
            if(kdSub6==v.kdSub6){
                if(Number(v.pagu7)>0){
                    _.Tampungtotal+=parseFloat(v.pagu7);
                }
                ftabel+=`
                    <tr>
                        <td>`+(no)+`</td>
                        <td>`+v.nmSub7+`</td>
                        <td>`+_$(v.pagu7)+`</td>
                        <td style="width: 15%;">
                            <div class="btn-group mr-2">
                                <button type="button" class="btn btn-sm btn-outline-warning" onclick="_updSub7(`+i+`,`+fall+`)" title="Perbarui Uraian">
                                    <i class="mdi mdi-grease-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="_delSub7(`+i+`,`+fall+`)" title="Hapus Uraian">
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
function _updSub7(ind,fall){//fall jika false menandakan masih pada proses tambah usulan jika true maka pada proses tambah Sub7
    _modalEx1({
        judul:"Perbarui Data".toUpperCase(),
        icon:`<i class="mdi mdi-grease-pencil"></i>`,
        isi:_inpGroupPrepend({
            id:"nmSub7",
            placeholder:"Nama "+_text.sub8,
            type:"text",
            icon:'<i class="mdi mdi-database-plus"></i>',
            bg:"bg-success"
        })+_inpGroupPrepend({
            id:"pagu7",
            placeholder:"Pagu "+_text.sub7,
            type:"number",
            icon:'<i class="mdi mdi-numeric"></i>',
            bg:"bg-success"
        }),
        footer:`
            <button type="button" class="btn btn-secondary" onclick="_modalHide('modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="_updedSub7(`+ind+`,`+fall+`)">SIMPAN</button>`
    });
    $('#nmSub7').val(_.dapbd.dsub7[ind].nmSub7);
    $('#pagu7').val(_.dapbd.dsub7[ind].pagu7);
}
function _updedSub7(ind,fall){
    param={
        kdSub6      :_.dapbd.dsub7[ind].kdSub6,
        kd          :_.dapbd.dsub7[ind].kdSub7,
        nm          :$('#nmSub7').val(),
        pagu        :$('#pagu7').val(),
        pembahasan  :_.dapbd.dsub7[ind].noPembahasan7,
        tahun       :_.dapbd.dsub7[ind].date7,
        perkada     :_.dapbd.dsub7[ind].perkada7
    }
    if(_isNull(param.nm)){return _toast({isi:msg.addNama+" "+_text.sub8})};

    _post("Proses/updSub7",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub7(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _delSub7(ind,fall){
    _modalEx1({judul:"Konfirmasi".toUpperCase(),icon:`<i class="mdi mdi-delete-forever"></i>`
        ,isi:"anda yakin ingin menghapus data ini ???",
        footer:`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="_deledSub7(`+ind+`,`+fall+`)">Hapus</button>`
    })
}
function _deledSub7(ind,fall){
    param={
        kdSub6      :_.dapbd.dsub7[ind].kdSub6,
        kd          :_.dapbd.dsub7[ind].kdSub7,
        pembahasan  :_.dapbd.dsub7[ind].noPembahasan7,
        tahun       :_.dapbd.dsub7[ind].date7,
        perkada     :_.dapbd.dsub7[ind].perkada7
    }
    _post("Proses/delSub7",param).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            _responSub7(res.data,ind,fall);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _closeOpenSub7(ind,v) {
    if($(v).html().trim()==`<i class="mdi mdi-close-box"></i>`){
        $(v).html(`<i class="mdi mdi-book-open-variant"></i>`);
        $('#sub7'+ind).css({'display':"none"});
    }else{
        $(v).html(`<i class="mdi mdi-close-box"></i>`);
        _responSub7(null,ind)
    }
}

function _checkUpdTabel(posisi) {
    // console.log("es");
    switch(posisi){
        case 1: //sub2
            if(_.dapbd.updtSub2){
                _responSub2(null,0,true);
                _.dapbd.updtSub2=false;
            }
        break;
        case 2: //sub3
            if(_.dapbd.updtSub3){
                _responSub3(null,0,true);
                _.dapbd.updtSub3=false;
            }
        break;
        case 3: //sub4
            if(_.dapbd.updtSub4){
                _responSub4(null,0,true);
                _.dapbd.updtSub4=false;
            }
        break;
        case 4: //sub5
            if(_.dapbd.updtSub5){
                _responSub5(null,0,true);
                _.dapbd.updtSub5=false;
            }
        break;
        case 5: //sub6
            if(_.dapbd.updtSub6){
                _responSub6(null,0,true);
                _.dapbd.updtSub6=false;
            }
        break;
        case 6: //sub7
            if(_.dapbd.updtSub7){
                _responSub7(null,0,true);
                _.dapbd.updtSub7=false;
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
    _cperkada({value:_.ptahun[_.indT].perkada[0].value})
}
function _cperkada(v) {
    _.indP=_checkIndex(_.ptahun[_.indT].perkada,v.value);
    $('#ppembahasan').html(
        _inpComboBox({
            data:_.ptahun[_.indT].perkada[_.indP].pembahasan,
            inSelect:"Bagus H"
        })
    );
}