function _onload(data){
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
    
    // $('#main-pcoded').css({'margin-top':'4px'});
    if(_notif){
        $('.header-notification').addClass("active");
        $('#shownotification').toggle();
    }

    // $('#main-pcoded').removeProperty('margin-top');
}
function _form(){
    return `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.js"> </script>
        `+_formAlbe({
            // btn:fbtnAdd,
            judul:"PROFIL DAERAH",
            judulFooter:"Sekretariat TAPD",
            deskripsiFooter:"Bagian Administrasi Pembangunan Sekretariat Daerah Kabupaten Sumbawa Barat",
            isi:`<div class="d-flex justify-content-center">
                    <video autoplay muted loop style="max-height:550px; max-width:1550px;">
                    <source src="`+assert+`vidio/ktc_x264.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                    </video> 
                </div>`
        });
}