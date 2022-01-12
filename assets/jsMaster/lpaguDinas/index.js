function _onload(data){
    _.ddinas=data.ddinas;

    _.ptahun=data.ptahun;

    _.vtahun=data.tahun;
    _.vperkada=data.perkada;

    if(_.ptahun.length>0){
        _.indT=_checkIndex(_.ptahun,_.vtahun);
        _.indP=_checkIndex(_.ptahun[_.indT].perkada,_.vperkada);
    }
    _.noPembahasan=data.noPembahasan;
    
    _.totalAwal=0;
    _.totalAkhir=0;
    // _.totalSelilih=0;

    _installVarAble({
        page:`Data Dinas`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Data Dinas</a></li>`,
        form:_form()
    });
    
    navBar.menu[7].menu[0].active="active";
    navBar.menu[7].menu[0].subMenu[5].status="active";

    _installAble({form:true});
    myCode=data.code;
    _startTabel("dataTabel");
    $('#ptahun').val(_.vtahun);
    $('#pperkada').val(_.vperkada);
    $('#ppembahasan').val(_.noPembahasan);
}
function _form(){
    ftam="";
    if(_.ptahun.length>0){
        ftam=_sejajar({
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
        });
    }

    return _formAlbe({
        btn:_btnGroupTd([{
            clsBtn:`btn-success`
            ,func:"_goLaporan()"
            ,icon:`<i class="mdi mdi-file-chart  text-light"></i>Rekap Pagu Dinas`
            // ,title:"Donwload"
        }]),
        judul:"Data Dinas",
        judulFooter:"Sekretariat TAPD",
        deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
        isi:ftam
            +`
            <hr>
            <div class="row" id='tabelShow' style="margin: auto;width:100%">
                `+setTabel()+`
            </div>
            <hr>
            <b>
            `+_inpSejajar({
                color:"black",
                judul:"TOTAL PAGU SEBELUM",
                isi:_span({text:"<b>Rp. "+_$(_.totalAwal)+"</b>",id:"tpaguAwal"})
            })
            +_inpSejajar({
                color:"black",
                judul:"TOTAL PAGU SETELAH",
                isi:_span({text:"<b>Rp. "+_$(_.totalAkhir)+"</b>",id:"tpaguAkhir"})
            })
            +_inpSejajar({
                color:"black",
                judul:"TOTAL SELISIH",
                isi:_span({text:"<b>Rp. "+_$(_.totalAkhir-_.totalAwal)+"</b>",id:"tpaguSelisih"})
            })
            +`</b>
            <hr>`
    });
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
    fhasilView=" ";
    fpersenView=" ";

    fpersenView=parseFloat((fmin*100)/pagu).toFixed(2)+" %";
    
    // console.log(fmin+" | ");
    
    if(fmin>0){
        if(fnext){
            fhasilView=" "+_$(fmin)+" ";
        }else{
            fhasilView="( - "+_$(fmin)+" )";
            fpersenView="( - "+fpersenView+")";
        }
    }else{
        fpersenView=" ";
    }
    return {
        nilai:fhasilView,
        persen:fpersenView,
        next:fnext
    }
}
function setTabel() {
    fdata=` 
        <thead>
            <tr>
                <th >no</th>
                <th >Nama</th>
                <th >Kepala Dinas</th>
                <th >Pagu Sebelum</th>
                <th >Pagu Sesudah</th>
                <th >+ | -</th>
                <th >Persentase</th>
            </tr>
        </thead>
        <tbody>
    `;
    _.totalAwal=0;
    _.totalAkhir=0;
    _.totalSelilih=0;
    _.ddinas.forEach((v,i) => {
        // if(i==1){
            dpersen=_hitungPersenStruktur(v.pagu,v.paguR);
            // console.log(dpersen);
            _.totalAwal+=parseFloat(v.pagu);
            _.totalAkhir+=parseFloat(v.paguR);
            fdata+=`
                <tr>
                    <td >`+(i+1)+`</td>
                    <td >`+v.nmDinas+`</td>
                    <td >`+v.kadis+`</td>
                    <td >`+_$(v.pagu)+`</td>
                    <td >`+_$(v.paguR)+`</td>
                    <td >`+dpersen.nilai+`</td>
                    <td >`+dpersen.persen+`</td>
                </tr>
            `;
        // }
    });
    fdata+=`
        <tr>
            <td >`+(_.ddinas.length+1)+`</td>
            <td ></td>
            <td >Total</td>
            <td >`+_$(_.totalAwal)+`</td>
            <td >`+_$(_.totalAkhir)+`</td>
            <td >`+_$(_.totalAkhir-_.totalAwal)+`</td>
            <td ></td>
        </tr>
    `;
    return _tabelResponsive(
    {
        id:"dataTabel"
        ,isi:fdata
    });
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
function _goLaporan(v) {
    return _redirectOpen("laporan/tapd/"+btoa(JSON.stringify(({ 
        noPembahasan:_.noPembahasan,
        perkada     :_.vperkada,
        tahun       :_.vtahun,
        perkadaFinal:true,
        status      :'-',
        laporan     :'1'
    }))));
}
function refreshData() {
    _redirect("control/lpaguDinas/"+btoa(JSON.stringify({
        perkada:$('#pperkada').val(),
        tahun:$('#ptahun').val(),
        noPembahasan:$('#ppembahasan').val()
    })));
}