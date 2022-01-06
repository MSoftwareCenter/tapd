function _formTambahPerda(){
    return _inpSejajar({
        color:"black",
        judul:"Judul",
        isi:_inp({
            type:"text",
            hint:"Permasalahan",
            id:"judul",
        })
    })+
    _inpSejajar({
        color:"black",
        judul:"Deskripsi",
        isi:_textArea({
            hint:"Uraian Pekerjaan",
            id:"deskripsi",
            row:"5",
        })
    });
}
function _formTambahDinas(){
    return _inpGroupPrepend({id:"kdDinas",placeholder:"Kode Dinas",type:"text",icon:'<i class="mdi mdi-office"></i>',bg:"bg-success"})
    +_inpGroupPrepend({id:"nmDinas",placeholder:"Nama Dinas",type:"text",icon:'<i class="mdi mdi-office"></i>',bg:"bg-success"})
    +_inpGroupPrepend({id:"kadis",placeholder:"Nama Kadis",type:"text",icon:'<i class="mdi mdi-account-box-outline""></i>',bg:"bg-success"})
    +_inpGroupPrepend({id:"nip",placeholder:"Nip",type:"text",icon:'<i class="mdi mdi-numeric"></i>',bg:"bg-success"})
    +_inpGroupPrepend({id:"pagu",placeholder:"Pagu Anggaran",type:"number",icon:'<i class="mdi mdi-numeric"></i>',bg:"bg-success"});
}
function _formTambahJabatan(){
    return _inpGroupPrepend({id:"nmJabatan",placeholder:"Nama Jabatan",type:"text",icon:'<i class="mdi mdi-office"></i>',bg:"bg-success"});
}
function _formTambahMember(){

    return _inpDropdonwSelected({
        judul:"Dinas",
        id:"content",
        idJudul:"judul",
        idData:"dsData",
        data:_.ddinas,
        bgSearch:"#2e2727;"
    })+
    _inpComboBox({
        judul:"Jabatan",
        id:"kdJabatan",
        color:"black",  
        data:_.djabatan,
        method:"sejajar"
    })+_inpSejajar({
        color:"black",
        judul:"Nama Pengguna",
        isi:_inp({
            type:"text",
            hint:"Nama Pengguna",
            id:"nmMember",
        })
    })+_inpSejajar({
        color:"black",
        judul:"Username",
        isi:_inp({
            type:"text",
            hint:"Username",
            id:"username",
        })
    })+
    _inpSejajar({
        color:"black",
        judul:"Password",
        isi:_inp({
            type:"password",
            hint:"Password",
            id:"password",
        })
    });
}
function _formTambahUsulan(){
    ftam="";
    if(_.ddinas.length>1){
        ftam=_inpDropdonwSelected({
            judul:_.ddinas[_checkIndex(_.ddinas,_.kdDinas)].valueName,
            id:"dinas",
            idJudul:"jdinas",
            idData:"ddinas",
            data:_.ddinas,
            bgSearch:"#283941",
            bg:" background:#297182;",
            idDropdonw:"idInpDropDinas",
            func:"_selectDinas",
            funcSearch:"_formSearchDinas(this)"
        })
    }
    return _inpComboBox({
        judul:"Kelompok Anggaran",
        id:"kdKelompok",
        color:"black",  
        data:_.dkelompok,
        method:"sejajar",
        index:"Bagus H",
        change:"_selectKelompok(this)"
    })
    +ftam
    +_inpDropdonwSelected({
        judul:"Jenis Anggaran",
        id:"jenis",
        idJudul:"jjenis",
        idData:"djenis",
        data:_.djenis[0],
        bgSearch:"#283941",
        bg:" background:#297182;",
        idDropdonw:"idInpDropjenis",
        func:"_selectJenis",
        funcSearch:"_formSearchJenis(this)"
    })
    +`
        <div id="jikaBelanja" style="display:none;">`
        +_inpDropdonwSelected({
            judul:"Sub kegiatan",
            id:"sub",
            idJudul:"jsub",
            idData:"dsub",
            data:_.dsub,
            bgSearch:"#283941",
            bg:" background:#297182;",
            idDropdonw:"idInpDropSub",
            func:"_selectSub",
            funcSearch:"_formSearchSub(this)"
        })
        +`</div>
    `
    +_inpSejajar({
        color:"black",
        judul:"Usulan",
        isi:_textArea({
            hint:"Uraian Pekerjaan",
            id:"usulan",
            row:"3",
        })
    })+_inpSejajar({
        color:"black",
        judul:"Nomor Tela'ahan Staf",
        isi:_inp({
            type:"text",
            hint:"Nomor / Dasar ",
            id:"nomor",
        })
    })+_inpSejajar({
        color:"black",
        judul:"Tanggal Tela'ahan Staf",
        isi:_inp({
            type:"date",
            hint:"Tanggal Tela'ahan Staf",
            id:"tanggal",
        })
    })+
    _inpSejajar({
        color:"black; margin-top:10px;",
        style:"margin:0px;",
        judul:_inp({
            type:"number",
            hint:"Volume",
            id:"volume",
            attr:" onchange='_setVolume(this)'"
        }),
        isi:_inp({
            type:"text",
            hint:"Satuan",
            id:"satuan"
        })
    })+
    _inpSejajar({
        color:"black",
        judul:"Nilai Satuan",
        isi:_inp({
            type:"number",
            hint:"100000",
            id:"nilai",
            attr:" onchange='_setTotal(this)'"
        })
    })+
    _inpSejajar({
        color:"black",
        judul:"Total",
        isi:_inp({
            type:"text",
            hint:"100000",
            id:"total",
            attr:"disabled"
        })
    });
}
function _mengertiNotif(){
    _postNoLoad("Proses/mengertiInfo",{}).then(res=>{
        res=JSON.parse(res);
        if(res.exec){
            // _respon(res.data);
        }else{
            return _toast({isi:res.msg});
        }
    })
}
function _formKajianTeknis() {
    return _inpSorting({
        color:"black",
        judul:"Pertimbangan Teknis",
        isi:_textArea({
            hint:"Pertimbangan Teknis",
            id:"pertimbangan",
            row:"3",
        })
    })+_inpImageView({
        id:"file",
        idView:"files",
        judul:"File Pertimbangan Teknis (PDF)",
        color:"black",
        func:"readFile(this)"
    });
}
function _formAddPembahasan(){
    return _inpSorting({
        color:"black",
        judul:"Tahun Pembahasan",
        isi:_inp({
            type:"number",
            hint:"1997",
            id:"tahunPembahasan",
        })
    });
}
function _formDisposisi(){
    fcolor="text-light";
    fsize="140px";
    return _inpSejajar({
        color:"black",
        judul:"Tanggal Terima",
        isi:_inp({
            type:"date",
            hint:"",
            id:"tglTerima",
        })
    })
    +_inpSejajar({
        color:"black",
        judul:"Tanggal Penyelsaian",
        isi:_inp({
            type:"date",
            hint:"",
            id:"tglPenyelsaian",
        })
    })
    +_inpSejajar({
        color:"black",
        judul:"Tujuan Disposisi",
        isi:`
            <select class="btn btn-secondary text-dark" id="tujuan"  style="width: -moz-available; text-align: left;width: 100%;">
                `+_inpComboBox({
                    color:"black",
                    data:_.dtujuan2,
                    selected:1,
                    index:"Bagus H",
                    inSelect:"Bagus H"
                })
            +`</select>`
    })
    +_inpSejajar({
        color:"black",
        judul:"Isi Disposisi",
        isi:_textArea({
            hint:"Isi Disposisi",
            id:"isi",
            row:"3",
        })
    })
}
