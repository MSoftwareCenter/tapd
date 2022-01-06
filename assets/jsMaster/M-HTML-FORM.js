function _inpGroupPrepend(inp){
    fdata="";
    if(inp.placeholder!=undefined){
        fdata=`placeholder="`+inp.placeholder+`"`;
    }
    fbg="";
    if(inp.bg!=undefined){  
        fbg=inp.bg;
    }
    return `
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text `+fbg+`">`+inp.icon+`</span>
        </div>
        <input type="`+inp.type+`" class="form-control" id="`+inp.id+`" `+fdata+`>
    </div>
    `;
}
// function _inpGroupPrepend(inp){
//     //Ex 1 _inpGroupPrepend({id:"nmKantor",placeholder:"Nama Kantor",type:"text",icon:'<i class="mdi mdi-office '+fcolor+'"></i>',bg:"bg-dark",attrSpan:`style="width: `+fsize+`;"`})
//     //Ex 2 _inpGroupPrepend({id:"nmMember",placeholder:"Nama Member",type:"text",icon:'<i class="mdi mdi-rename-box '+fcolor+'"></i>',bg:fbg,attrSpan:undefined})
//     //Ex 3
    //  _inpGroupPrepend({
    //     placeholder:"Kategori",
    //     icon:'<i class="mdi mdi-rename-box '+fcolor+'"></i>',
    //     bg:fbg,
    //     attrSpan:`style="width: `+fsize+`;"`,
    //     isi:_inpComboBox({
    //         id:"kdKategori", 
    //         bg:fbg,
    //         data:_.dsatkategoriGroup,
    //         getCombo:true
    //     })
//     // ex 4
//     // _inpGroupPrepend({
//     //     id:"kdScaneProduk",
//     //     placeholder:"Kode Scane",
//     //     type:"text",
//     //     icon:'<i class="mdi mdi-barcode-scan" '+fbgicon+'></i>',
//     //     bg:fbg,
//     // })

//     fdata="";
//     if(inp.placeholder!=undefined){
//         fdata=`placeholder="`+inp.placeholder+`"`;
//     }
//     fbg="";
//     if(inp.bg!=undefined){  
//         fbg=inp.bg;
//     }
//     fisi=` <input type="`+inp.type+`" class="form-control" id="`+inp.id+`" `+fdata+` `+inp.attr+`>`;
//     if(inp.isi!=undefined){
//         fisi=inp.isi;
//     }
//     fjudul="";
//     if(inp.attrSpan!=undefined){
//         fjudul=inp.placeholder;
//     }
//     return `
//     <div class="input-group mb-3">
//         <div class="input-group-prepend">
//             <span class="input-group-text `+fbg+`" `+inp.attrSpan+`>
//                 `+inp.icon+fjudul+`
//             </span>
//         </div>
//         `+fisi+`
//     </div>
//     `;
// }
function _inpComboBox(inp){
    fdata="";
    if(inp.change!=undefined){
        fdata="onchange='"+inp.change+"'";
    }
    fdata1="";
    if(inp.addOption!=undefined){
        fdata1=inp.addOption;
    }
    fselected="";
    let ind=0;
    inp.data.forEach(v => {
        fselected="selected";
        if(v.selected!=1){
            fselected="";
        }
        if(inp.index!=undefined){
            fdata1+=`<option value="`+ind+`" `+fselected+`>`+v.valueName+`</option>`;
        }else{
            fdata1+=`<option value="`+v.value+`" `+fselected+`>`+v.valueName+`</option>`;
        }
        ind++;
    });
    inp.isi=`<select id="`+inp.id+`" class="btn btn-secondary text-dark" `+fdata+`  style="width: -moz-available; text-align: left;width: 100%;">
            `+fdata1+`
            </select>`;
    if(inp.inSelect!=undefined){
        return fdata1;
    }
    if(inp.method==undefined){
       return _inpSorting(inp);
    }
    return _inpSejajar(inp);
}
function _inpComboBoxSejajar(inp){
    fdata="";
    if(inp.change!=undefined){
        fdata="onchange='"+inp.change+"'";
    }
    fdata1="";
    if(inp.addOption!=undefined){
        fdata1=inp.addOption;
    }
    fselected="";
    inp.data.forEach(v => {
        fselected="selected";
        if(v.selected!=1){
            fselected="";
        }
        fdata1+=`<option value="`+v.value+`" `+fselected+`>`+v.valueName+`</option>`;
    });
    inp.isi=`<select id="`+inp.id+`" class="btn btn-secondary" `+fdata+`  style="width: -moz-available; text-align: left;width: 100%;">
        `+fdata1+`
        </select>`;
    return _inpSejajar(inp);
}
function _inpButton(inp){
    fdata="";
    if(inp.click!=undefined){
        fdata=" onclick='"+inp.click+"' ";
    }
    if(inp.id!=undefined){
        fdata+=" id='"+inp.id+"' ";
    }
    if(inp.title!=undefined){
        fdata+=" title='"+inp.title+"' ";
    }
    // -lg
    color="primary";
    if(inp.color!=undefined){
        color=inp.color;
    }
    return `
    <div class="row" style="margin-left:5px;margin-bottom:10px;">
        `+_btn({color:color,attr:fdata,judul:inp.judul})+`
    </div>
    `;
}
function _inpDropdonwSelected(inp){
    dropdonw=inp;
    fdata="";
    fid="idInpDropJudul";
    if(inp.idDropdonw!=undefined){
        fid=inp.idDropdonw;
    }
    ffuncSearch="_inpDropdonwSelectedSearch(this)";
    if(inp.funcSearch!=undefined){
        ffuncSearch=inp.funcSearch;
    }
    inp.data.forEach(v => {
        fdata1=`_selectedInpDropdonw('`+v.value+`','`+v.valueName+`')`;
        if(inp.func!=undefined){
            fdata1=inp.func+`('`+inp.id+`','`+fid+`','`+v.value+`','`+v.valueName+`')`;
        }
        fdata+=`
            <div class="row" style="margin:5px; text-align:left;">
                <button class="btn btn-primary btn-sm btn-block" style="text-align:left;" onclick="`+fdata1+`">`+v.valueName+`</button>
            </div>`;
    });
    return `
        <div class="dropdown">
            <p class="btn btn-secondary dropdown-toggle" role="button" id="`+fid+`" onclick="_showForDropSelect('`+inp.id+`')" style="width: -moz-available; text-align: left;width: 100%; `+inp.bg+`">
                `+inp.judul+`
            </p>
            <div class="dropdown-menu" id="`+inp.id+`" style="width: -moz-available; text-align: left;">
                <input type="text" class="form-control" onchange="`+ffuncSearch+`" placeholder="search.." style="background-color:`+inp.bgSearch+`; color:white;" value="" required="">
                <div style="overflow:auto; max-height:200px" id="`+inp.idData+`">
                    `+fdata+`
                </div>
            </div>
        </div>
    `;
}
function _inpSejajar(inp) {
    // _inpSejajar({
    //     color:"black",
    //     judul:"Judul",
    //     isi:_inp({
    //         type:"text",
    //         hint:"Permasalahan",
    //         id:"judul",
    //     })
    // })
    fmb="margin-bottom:10px;";
    if(inp.mb!=undefined){
        fmb=inp.mb;
    }
    fdata="";
    if(inp.style!=undefined){
        fdata="style='"+inp.style+"'";
    }
    return `
    <div class="row" style="margin-left:5px;`+fmb+`">
        <div class="col m-auto">
            <label style="color:`+inp.color+`;">`+inp.judul+`</label>
        </div>
        <div class="col m-auto" `+fdata+`>
            `+inp.isi+`
        </div>
    </div>`;
}
function _inpSejajarNoText(inp) {
    fmb="margin-bottom:10px;";
    if(inp.style!=undefined){
        fdata="style='"+inp.style+"'";
    }
    return `
    <div class="row" style="margin-left:5px;`+fmb+`">
        <div class="col m-auto">
            <div class="col m-auto text-left">
                `+inp.judul+`
            </div>
            <div class="col m-auto" `+fdata+`>
                `+inp.isi+`
            </div>
        </div>
        <div class="col m-auto" `+fdata+`>
            <div class="col m-auto text-right">
                `+inp.judul1+`
            </div>
            <div class="col m-auto" `+fdata+`>
                `+inp.isi1+`
            </div>
        </div>
    </div>`;
}
function _inpSorting(inp){
    return `
        <div class="row" style="margin-left:5px;margin-bottom:10px;">
            <label style="color:`+inp.color+`;">`+inp.judul+`</label>
            `+inp.isi+`
        </div>
    `;
}
function _inp(v){
    fdata=`placeholder="`+v.hint+`" `;
    if(v.checked!=undefined && v.checked){
        fdata='checked ';
    }
    if(v.attr!=undefined){
        fdata+=v.attr;
    }
    return `
        <input type="`+v.type+`" class="form-control" id="`+v.id+`" `+fdata+`>
    `;
}
function _inpFunc(v,id){
    fdata=`placeholder="`+v.hint+`" `;
    if(v.func!=undefined){
        fdata+=" onchange='"+v.func.substring(0,v.func.length-1)+"this,"+id+`)`+"'";
    }
    return `
        <input type="`+v.type+`" class="form-control" id="`+v.id+`" `+fdata+`>
    `;
}
function _textArea(v){
    // _textArea({
    //     hint:"Keterangan",
    //     id:"keterangan"+keyCode+""+i,
    //     row:"3",
    //     text:v.keteranganx
    // })
    frow="3";
    if(v.row!=undefined){
        frow=v.row;
    }
    ftext="";
    if(v.text!=undefined){
        ftext=v.text;
    }
    return `<textarea class="form-control" id="`+v.id+`" placeholder="`+v.hint+`" rows="`+frow+`">`+ftext+`</textarea>`;
}
function _inpImageView(v){
    v.isi=_img(v);
    var fdata=`<div id="images"></div>`;
    if(v.idView!=undefined){
        fdata=`<div id="`+v.idView+`"></div>`;
    }
    if(v.method==undefined){
        return _inpSejajar(v)+fdata;
    }
    return _inpSorting(v)+fdata;;
}
function _img(v){
    fclass="v-money form-control";
    if(v.class!=undefined){
        fclass=v.class;
    }
    return `<input type="file" id="`+v.id+`" class="`+fclass+`"  onchange="`+v.func+`"/>`;
}
function lines(){
    return `<hr class='mb-4'>`;
}
function _btn(v){
    // _btn({
    //      color:"primary",
    //     judul:"Tambah Data",
    //     attr:"style='float:right;'",
    //     class:"btn btn-`+v.color+` btn-block"
    // })
    fclass=`btn btn-`+v.color+` btn-block`;
    if(v.class!=undefined){
        fclass=v.class;
    }
    return ` <button class="`+fclass+`" `+v.attr+`>`+v.judul+`</button>`;
}
function _text(v){
    v.isi=_span(v);
    if(v.method==undefined){
        return _inpSejajar(v);
    }
    return _inpSorting(v);;
}
function _span(v){
    // _span({text:"",id:""});
    return `<span id='`+v.id+`' class="form-control `+v.class+`" style="border: none;">`+v.text+`</span>`;
}
function _btnIcon(v){
    fdata="";
    if(v.click!=undefined){
        fdata=" onclick='"+v.click+"' ";
    }
    if(v.id!=undefined){
        fdata+=" id='"+v.id+"' ";
    }
    if(v.title!=undefined){
        fdata+=" title='"+v.title+"' ";
    }
    return `    
        <div class="form-group m-auto">
            <div class="input-group">
                <div class="input-group-append">
                    `+v.icon+`
                </div>
                `+_btn({
                    class:"form-control btn btn-sm btn-"+v.color,
                    attr:fdata,
                    judul:v.judul
                })+`
            </div>
        </div>
    `;
}
function _fileIcon(v){
    return `    
        <div class="form-group m-auto">
            <div class="input-group">
                <div class="input-group-append">
                    `+v.icon+`
                </div>
                `+_img({
                    id:v.id,
                    class:"form-control btn btn-sm btn-"+v.color,
                    func:v.func
                })+`
            </div>
        </div>
    `;
}
function _sejajar(v) {
    // _sejajar({
    //     data:[{
    //         isi:_btn({
    //             color:"primary",
    //             judul:`<i class="mdi mdi-book-plus"></i>Tambah Faktur`,
    //             attr:"style='float:right;' onclick='_addFaktur()'",
    //             class:"btn btn-primary btn-block"
    //         })
    //     },{
    //         isi:_btn({
    //             color:"primary",
    //             judul:`<i class="mdi mdi-book-plus"></i>Tambah Faktur`,
    //             attr:"style='float:right;' onclick='_tambahFaktur()'",
    //             class:"btn btn-primary btn-block"
    //         })
    //     },{
    //         isi:_btn({
    //             color:"primary",
    //             judul:`<i class="mdi mdi-book-plus"></i>Tambah Faktur`,
    //             attr:"style='float:right;' onclick='_tambahFaktur()'",
    //             class:"btn btn-primary btn-block"
    //         })
    //     }]
    // });


    fclass="row ";
    fattr="";
    if(v.class!=undefined){
        fclass+=v.class;
        fattr=v.attr;
    }
    fdata="";
    v.data.forEach(v1=> {
        fdata+=`
        <div class="col m-auto" `+v.attrCol+`>
            `+v1.isi+`
        </div>
        `;
    });
    return `
    <div class="`+fclass+`" `+fattr+`>
        `+fdata+`
    </div>`;
}