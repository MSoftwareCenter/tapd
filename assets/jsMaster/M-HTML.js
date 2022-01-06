function _headerDashboard(){
    return `
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" style="background: none;box-shadow: none;" href="`+router+`control">
                <img src="`+assets+`/master_2.png"  height="45"> 
            </a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="navbar p-3">
                <li class="nav-item">
                    <a class="nav-link" 
                        id="navbarDropdownMenuLink-4" href="#" data-toggle="dropdown">
                        <span class=" btn-outline-info my-2 my-sm-0">
                            <i class="bi bi-inbox-fill"></i>10
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                        <ul class="list-unstyled">
                            <li class="media dropdown-item">
                                <span class="success"><i class="ti-image"></i></span>
                                <div class="media-body">
                                    <a href="#">
                                        <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
                                        </p>
                                    </a>
                                </div>
                                <span class="notify-time">3:20 am</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" 
                        id="navbarDropdownMenuLink-4" href="#" data-toggle="dropdown">
                        <span class=" btn-outline-warning my-2 my-sm-0">
                            <i class="bi bi-bell"></i>10
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                        <ul class="list-unstyled">
                            <li class="media dropdown-item">
                                <span class="success"><i class="ti-image"></i></span>
                                <div class="media-body">
                                    <a href="#">
                                        <p><strong> James.</strong> has added a<strong>customer</strong> Successfully
                                        </p>
                                    </a>
                                </div>
                                <span class="notify-time">3:20 am</span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="far fa-envelope"></i>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle " id="navbarDropdownMenuLink-4" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class=" btn-outline-success my-2 my-sm-0">
                            <i class="bi bi-person-square"></i>
                            `+_nama+` 
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-cyan" aria-labelledby="navbarDropdownMenuLink-4">
                        <a class="dropdown-item" href="#">My account</a>
                        <a class="dropdown-item" href="`+router+`control/logout">Log out</a>
                    </div>
                </li>
            </ul>
        </nav>
    `;
}
function _sideBar(num){
    return `
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style="margin-top: 50px;">
        <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,1)+`" href="`+router+`/control/dashboard/null">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                Dashboard <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,2)+`" href="`+router+`/control/member">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Pengguna
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,3)+`" href="`+router+`/control/kunci">
                <i class="bi bi-key" style="margin-right: 5px;"></i>
                Kunci
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,4)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Customers
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,5)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                Reports
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,6)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                Integrations
                </a>
            </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Saved reports</span>
            <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </a>
            </h6>
            <ul class="nav flex-column mb-2">
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,7)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Current month
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,8)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Last quarter
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,9)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Social engagement
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link `+_currentPage(num,10)+`" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Year-end sale
                </a>
            </li>
            </ul>
        </div>
    </nav>
    `;
}
function _currentPage(num,position){
    if(num==position){
        return "active";
    }
    return "";
}
function _headerLogin(){
    return `    
        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand" href="#" style="background: none;box-shadow: none;">
                <img src="`+assets+`/master_2.png"  height="45"> 
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                         
                    </li>
                </ul>
                <form class="form-inline mt-2 mt-md-0">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="btn" title="Telegram">
                                <i class="bi bi-telephone btn-outline-success my-2 my-sm-0"></i>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="btn" title="Twitter">
                                <i class="bi bi-twitter btn-outline-success my-2 my-sm-0"></i>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="btn" title="Instagram">
                                <i class="bi bi-instagram btn-outline-success my-2 my-sm-0"></i>
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="btn" title="Facebook">
                                <i class="bi bi-facebook btn-outline-success my-2 my-sm-0"></i>
                            </a>
                        </li>
                    </ul>
                </form>
            </div>
            </nav>
        </header>
    `;
}
function _viewLogin(form){
    return `
    <div class="container-fluid" style="padding: 0px;padding-right: 10px;">
        <div class="row">
            `+_headerLogin()+`
        </div>
        <div class="row" style="margin-top: 75px;">
            `+form+`
        </div>
    </div>
    `;
}
function _navbarStatic(){
    var menu="",fdata="";
    judul.menu.forEach(v => {
        fdata="";
        if(v.act!=undefined){
            fdata=" onclick='"+v.act+"'";
        }
        menu+=`<li class="nav-item active mr-1">
                    <a href="#`+v.nama+`">
                        <button class="btn" `+judul.menuStyle+fdata+` >`+v.nama+` <span class="sr-only">(current)</span></button>
                    </a>
                </li>`;
    });
    return `
        <nav class="navbar navbar-expand-md navbar-dark fixed-top `+judul.navBG+`">
            <a class="navbar-brand" href="#" style="background: none;box-shadow: none;">
                <img class="img-fluid" src="`+judul.Logo+`" style="width: 30px;height: 35px;" alt="Theme-Logo">
                <b class="m-b-10">`+judul.nama+`</b>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                `+menu+`
            </ul>
            <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div>
        </nav>
    `;
}
function _navbarStaticIcon(){
    var menu="";
    judul.menu.forEach(v => {
        menu+=`<li class="nav-item active mr-1">
                    <a class="nav-link js-scroll-trigger" href="`+v.act+`">
                        `+v.icon+`
                    </a>
                </li>`;
    });
    return `
        <nav class="navbar navbar-expand-md navbar-dark fixed-top `+judul.navBG+`">
            <a class="navbar-brand" href="#" style="background: none;box-shadow: none;">
                <img class="img-fluid" src="`+judul.Logo+`" style="width: 30px;height: 35px;" alt="Theme-Logo">
                <b class="m-b-10">`+judul.nama+`</b>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="container" style="width: 100%;">
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    `+menu+`
                </ul>
            </div>
            
 
        </nav>
    `;
}
function _navbarStaticWithIcon(){
    var menu="",color="";
    judul.menu.forEach(v => {
        color="";
        if(v.color!=undefined){
            color=v.color;
        }
        menu+=`<li class="nav-item active mr-1 pl-4 pr-4">
                    <a class="nav-link js-scroll-trigger" href="`+v.act+`">
                        <div class="row `+color+`" style="justify-content: center;">
                            `+v.icon+`
                        </div>
                        <div class="row `+color+`">
                            `+v.nama+`
                        </div>
                    </a>
                </li>`;
    });
    return `
        <nav class="navbar navbar-expand-md navbar-dark fixed-top `+judul.navBG+`" style='`+judul.bgNav+`'>
            <a class="navbar-brand" href="#" style="background: none;box-shadow: none;">
                <img class="img-fluid" src="`+judul.Logo+`" style="width:`+judul.LogoSize+`px;" alt="Theme-Logo">
                <b class="m-b-10">`+judul.nama+`</b>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    `+menu+`
                </ul>
            </div>
            
 
        </nav>
    `;
}
function _dashboardRA(v){
    fdata2=_modalRA();
    if(v!=undefined){
        fdata2=_modalRA(v.modalATTR);
    }
    $('#body').html(`<div class='row'>
        `+_navbarRA()+`
        `+_headerRA()+`
    </div>`+_footerRA({tahun:2021,dev:"BAPPEDA & LITBANG",bg:"bg-white"})+fdata2);
    $('#footer').html(`
        <script src="`+assert+furl+`vendor/jquery/jquery.min.js"></script>
        <script src="`+assert+furl+`vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="`+assert+furl+`vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="`+assert+furl+`js/ruang-admin.min.js"></script>
    `+_jsTabel());
    // $('#start').html('<script src="'+assert+'bootstrap/dist/js/jquery.js"></script>');
    // <script src="`+assert+furl+`vendor/chart.js/Chart.min.js"></script>
    // <script src="`+assert+furl+`js/demo/chart-area-demo.js"></script>
}
function _slider(){
    // margin-top: 5%;
    fdata="";
    fdata1="";
    fdata2="height: 100%;width: 100%;";
    fdata3="";
    if(slider[0].color!=undefined){
        fdata3=slider[0].color;
    }
    slider.forEach((v,i) => {
        if(v.size!=undefined){
            fdata2="height: "+v.size+"px;";
        }
        cls="";
        if(i==0){
            cls="active";
        }
        fdata+=`<li data-target="#`+slider[0].id+`" data-slide-to="0" class="`+cls+`"></li>`;
        fdata1+=`
                <div class="carousel-item `+cls+` ">
                    <div class="container">
                        <div class="carousel-caption text-right">
                            <img style="`+fdata2+`" src="`+v.url+`">
                        </div>
                    </div>
                </div>`;
    });
    return `
    <div id="`+slider[0].id+`" class="carousel slide" style=" `+fdata3+`" data-ride="carousel">
        <ol class="carousel-indicators">
        `+fdata+`
        </ol>
        <div class="carousel-inner">
            `+fdata1+`
        </div>
        <a class="carousel-control-prev" href="#`+slider[0].id+`" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#`+slider[0].id+`" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    `;
}
function _informasi(judul,isi){
    
    // if(judul!=null){
    //     judul=`
    //         <div class="card table-card p-0">
    //             <div class="card-header">
    //             <h5>`+judul+`</h5>
    //         </div>
    //     `;
    // }else{
    //     judul="";
    // }
    // return `
    //     <section id="Informasi" class="content-section" style="width: 100%;">
    //         <div class="col-12 p-0">
    //             `+judul+`
    //             <div class="card-block" style="padding:10px; background:#f9f6f0;">
    //                 `+isi+`
    //             </div>
    //         </div>
    //     </section>
    // `;
    if(judul!=null){
        judul=`
            <div class="card table-card p-0">
                <div class="card-header">
                <h5>`+judul.text+`</h5>
            </div>
        `;
    }else{
        judul="";
    }
    return `
        <section id="Informasi" class="content-section" style="width: 100%;">
            <div class="col-12 p-0">
                `+judul+`
                <div class="card-block" style="padding:10px; background:#f9f6f0;">
                    `+isi+`
                </div>
            </div>
        </section>
    `;
}
function _informasiToast(v){
    return `
        <section id="Informasi" class="content-section" style="width: 100%;">
            <div class="col-12 p-0">
                <div class="card table-card p-0">
                    <div class="card-header bg-primary">
                        <div class="row">
                            <div class="col-auto">
                                `+v.icon+`
                            </div>
                            <div class="col-auto">
                                `+v.judul+`
                            </div>
                        </div>
                    </div>
                    <div class="card-block" style="padding:10px; color:`+v.color+`;">
                        `+v.isi+`
                    </div>
                </div>
            </div>
        </section>
    `;
}
function _informasi_icon_btn(judul,isi){
    // _informasi_icon_btn({
    //         icon:'<i class="mdi mdi-file-check"></i>'
    //         ,text:"Data Produk"
    //         ,btn:infoSupport
    //     },
    //     `<div id='tabelShow' style="margin: auto;">`
    //         +setTabel()
    //     +`</div>`
    // )
    if(judul!=null){
        fdata=`
            <div class="col-9  mt-auto mb-auto">
                <h5>`+judul.text+`</h5>
            </div>
            <div class="col-2  mt-auto mb-auto" style="text-align: right;">
                `+judul.btn+`
            </div>
        `;
        if(judul.btn==undefined){
            fdata=`
                <div class="col-11  mt-auto mb-auto">
                    <h5>`+judul.text+`</h5>
                </div>
            `;
        }
        if(judul.icon==undefined){
            judul.icon="";
        }
        judul1=`
            <div class="card table-card p-0 mb-0">
                <div class="card-header">
                    <div class="row">
                        <div class="col-auto  mt-auto mb-auto">
                            `+judul.icon+`
                        </div>
                        `+fdata+`
                        </div>
                    </div>
                </div>
            </div>
        `;
    }else{
        judul1="";
    }
    fsize=12;
    if(judul.sizeCol!=undefined){
        fsize=judul.sizeCol;
    }
    fid="Informasi";
    if(judul.id!=undefined){
        fid=judul.id;
    }
    return `
        <section id="`+fid+`" class="content-section" style="width: 100%;">
            <div class="col-`+fsize+` p-0">
                `+judul1+`
                <div class="card-block" style="padding:10px; background:#f9f6f0;">
                    `+isi+`
                </div>
            </div>
        </section>
    `;
}
function _informasiCol(size,judul,isi){
    return`
    <div class="col-`+size+`">
        <div class="card p-0">
            <h5 class="card-header">`+judul+`</h5>
            <div class="card-body"><div style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                `+isi+`
            </div>
        </div>
    </div>
    `;
}
function _informasiIcon(informasi){
    var fdata=`<div class="row">`;
    var fjumlah=4;
    fdata1="";
    informasi.forEach((v,i) => {
        fdata+=`
            <div class="col-md-3 col-sm-6 col-xs-6 col-xxs-12">
                <a href="#" class="fh5co-feature">
                    <span class="fh5co-feature-icon">
                        `+v.icon+`
                    </span>
                    <h3 class="fh5co-feature-lead" style="margin-top:20px">`+v.nama+`</h3>
                    <p class="fh5co-feature-text">`+v.keterangan+`</p>
                </a>
            </div>
        `;
        if( (i+1)==fjumlah || (i+1)==informasi.length){
            fdata+=`</div>`;
            if((i+1)==informasi.length){
                fdata+=`<hr style="width:100%"></hr>`;
            }else{
                fdata+=`<div class="row">`;
            }
        }
    });
    return fdata;
}
function _informasiImage(informasi){
    var fdata=`<ul class="nospace group services">`;
    informasi.forEach(v => {
        fdata+=`
            <li class="one_third">
                <article><a href="#"><img src="`+v.image+`" style="width:99.8%;" alt=""></a>
                    <div>
                        <h6 class="heading" style="margin-top:15px">`+v.judul+`</h6>
                        <p>`+v.keterangan+`</p>
                        <footer>
                            <button class="btn btn-outline-primary" href="#">`+v.btn+`</button>
                        </footer>
                    </div>
                </article>
            </li>
        `;
    });
    return fdata+`</ul>`;
}
function _informasi2Kolom(informasi,tambahan){
    var fdata=`
        <div class="col">
            <table style="margin: auto;" class="table">`;
    
    informasi.forEach(v => {
        fdata+=`
            <tr>
                <td style="text-align:`+informasi[0].align+`;">
                    `+v.name+`
                </td>
                <td style="text-align:left;">
                    :
                </td>
                <td style="text-align:left;">
                    `+v.value+`
                </td>
            </tr>
        `;
    });
    if(tambahan==undefined){
        return fdata+=`</table></div>`;
    }
    return fdata+=`</table>`+tambahan+`</div>`;
}
function _progressBar(v){
    fdata="primary";
    if(v.color!=undefined){
        fdata=v.color;
    }
    return `
        <div class="progress">
            <div class="progress-bar bg-`+fdata+`" style="width:`+v.value+`%"></div>
        </div>
    `;
}
function _chart(id,Judul,padding,size){
    var fdata=`
       <div style="padding:`+padding+`">
            <div class="card-body"><div style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <canvas id="`+id+`" style="display: block; width: 458px; height: 229px;" width="458" height="229" class="chartjs-render-monitor"></canvas>
            </div>
       </div>
    `;
    if(size==0){
        return _informasi(Judul,fdata);
    }else{
        return _informasiCol(size,Judul,fdata);
    }
    // switch(size){
    //     case 0:
    //          break;
    //     case 1:
    //         return _informasiCol(size,Judul,fdata); break;
    // }
}
function _chartx1(id,Judul,padding,size,tambahan){
    var fdata=`
       <div class="row" style="padding:`+padding+`">
            <div class="col">
                <div class="card-body"><div style="position: absolute; inset: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;" class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                    <canvas id="`+id+`" style="display: block; width: 458px; height: 229px;" width="458" height="229" class="chartjs-render-monitor"></canvas>
                </div>
            </div>
    `;
    if(tambahan!=undefined){
        fdata+=`
                <div class="col">
                    `+tambahan+`
                </div>
        </div>
        `;
    }
    if(size==0){
        return _informasi(Judul,fdata);
    }else{
        return _informasiCol(size,Judul,fdata);
    }
    // switch(size){
    //     case 0:
    //          break;
    //     case 1:
    //         return _informasiCol(size,Judul,fdata); break;
    // }
}
function _informasi2Kolom1Image(informasi){
    return `
    <div data-section="about" class="animated fh5co-about">
        <div class="fh5co-2col fh5co-bg to-animate-2 fadeIn animated" style="background-image: url('`+assert+`res_img_1.jpg')">
            <img src="`+informasi.bg+`" style="margin: auto;width: 100%;">
        </div>
        <div class="fh5co-2col fh5co-text">
            <h2 class="heading to-animate fadeInUp animated">`+informasi.judul+`</h2>
            <p class="to-animate fadeInUp animated">
                <span class="firstcharacter">`+informasi.keterangan.substring(0,1)+`</span>
                `+informasi.keterangan.substring(1)+`
            </p>
            <p class="text-center to-animate fadeInUp animated"><a href="#" class="btn btn-primary btn-outline">Get in touch</a></p>
        </div>
    </div>
    `;
}
function _formBgCenter(form){
    return `
        <div id="`+form.id+`" class="formCenter" style="background-image:url('`+form.bg+`'); background-size:cover;">
            <div class="isiForm" style="padding-top: 30px;min-width:500px; background-image:url('`+form.bgForm+`'); background-size:cover;">
                <span class="judulCenter p-b-48" style="color:`+form.judulColor+`; margin-bottom:30px;">
                    <i class="zmdi" style="font-size:50px">`+form.judul+`</i>
                </span>
                `+form.form+`
            </div>
        </div>
    `;
}
function _footer(data){
    return `
        <div id="`+data.id+`" style="background-color:`+data.color+`">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12"  style="text-align: center;">
                        <div class="icon">
                            <i class="bi bi-facebook"></i>
                            <i class="bi bi-instagram"></i>
                            <i class="bi bi-mailbox"></i>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div style="text-align: center;">
                            <p>
                                <span>©Bappeda & Litbang Sumbawa Barat</span>
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `;
}
function _loader(){
    return "<div class='loader'></div>";
}
function _formToast(v){
    fcheader="bg-primary";
    if(v.cheader!=undefined){
        fcheader=v.cheader;
    }
    // console.log(v.cheader);
    return `
        <section id="Informasi" class="content-section" style="width: 100%;">
            <div class="col-12 p-0">
                <div class="card table-card p-0">
                    <div class="card-header `+fcheader+`">
                        <div class="row">
                            <div class="col-auto">
                                `+v.icon+`
                            </div>
                            <div class="col-auto">
                                `+v.judul+`
                            </div>
                        </div>
                    </div>
                    <div class="card-block" style="padding:10px; color:`+v.color+`;">
                        `+v.isi+`
                    </div>
                </div>
            </div>
        </section>
    `;
}
function _jsTabel(){
    furl="bootstrap/jsTabel/";
    return `
        <script src="`+assert+furl+`datatables.net/jquery.dataTables.js"></script>
        <script src="`+assert+furl+`datatables.net-bs4/dataTables.bootstrap4.js"></script>
        <script src="`+assert+furl+`data-table.js"></script>
        <script src="`+assert+furl+`jquery.dataTables.js"></script>
        <script src="`+assert+furl+`dataTables.bootstrap4.js"></script>
    `;
    // return `
    // <script src="`+assert+`bootstrap/dist/js/data-table/datatables.min.js"></script>
    // <script src="`+assert+`bootstrap/dist/js/data-table/dataTables.buttons.min.js"></script>

    // <script src="`+assert+`bootstrap/dist/js/data-table/buttons.print.min.js"></script>
    // <script src="`+assert+`bootstrap/dist/js/data-table/datatables-init.js"></script>
    // `;
}
function _libTextEditor(head){
    
    if(head){
        return `
        <script src="`+assert+`Library/textEditor/plugins/global/plugins.bundle.js" type="text/javascript"></script>
        <script src="`+assert+`Library/textEditor/js/scripts.bundle.js" type="text/javascript"></script>
        `;
    }
    fdata=[
        "textEditor/plugins/custom/tinymce/plugins/advlist/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/autolink/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/lists/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/link/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/image/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/charmap/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/print/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/preview/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/hr/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/anchor/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/pagebreak/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/searchreplace/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/wordcount/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/visualblocks/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/visualchars/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/code/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/fullscreen/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/insertdatetime/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/nonbreaking/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/save/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/table/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/directionality/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/emoticons/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/template/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/paste/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/textpattern/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/responsivefilemanager/plugin.js",
        "textEditor/plugins/custom/tinymce/plugins/emoticons/js/emojis.js"
    ];
    fhasil="";
    fdata.forEach(v => {
        fhasil+=`<script src="`+assert+`Library/`+v+`" type="text/javascript"></script>`;
    });
    // return "";
    //      <link rel="stylesheet" href="`+assert+`Library/textEditor/plugins/custom/tinymce/skins/ui/oxide/content.min.css" type="text/css" media="all">
    //      <link rel="stylesheet" href="`+assert+`Library/textEditor/plugins/custom/tinymce/skins/content/default/content.css" type="text/css" media="all"></link>
    return `
        <script src="`+assert+`Library/textEditor/plugins/custom/tinymce/tinymce.bundle.js" type="text/javascript"></script>
        <link rel="stylesheet" href="`+assert+`Library/textEditor/plugins/custom/tinymce/skins/ui/oxide/skin.min.css" type="text/css" media="all">
        
        
    `+fhasil;
}
function _tabelResponsive(v){
    fdata="table-striped table-bordered";
    if(v.class!=undefined){
        fdata=v.class;
    }
    fattr="";
    if(v.attr!=undefined){
        fattr=v.attr;
    }
    return `
    <div class="bootstrap-data-table-panel">
        <div class="table-responsive" `+fattr+`>
            <table id="`+v.id+`" class="table `+fdata+`" style="width:100%">
                `+v.isi+`
            </table>
        </div>
    </div>
    `;
}
function _tabelInput(v){
    var fdata=`
    <thead>
        <tr>`,fno=false,faction=false;
    
    if(v.no>0){
        fdata+=`<th>no</th>`;
        fno=true;
    }
    v.namaKolom.forEach(v1 => {
        fdata+=`<th>`+v1+`</th>`;
    });
    if(v.action!=null || v.action!=undefined){
        fdata+=`<th>Action</th>`;
        faction=true;
        if(v.action.length==0){
            v.action.push({ 
                clsBtn:`btn-outline-danger`
                ,icon:`<i class="mdi mdi-lock"></i>`
                ,title:"TERKUNCI"
            });
        }
    }
    fdata+=`</tr>
        </thead>
        <tbody>`;
    v.data.forEach((v1,i1) => {
        fdata+=`
            <tr>`;
            if(fno){
                fdata+=`<td>`+v.no+`</td>`;
                v.no+=1;
            }
        v.kolom.forEach((v2,i2) => {
            f1data=v2.split("$");
            if(f1data.length==2){
                fdata+=`<td>`+_$(v1[f1data[0]])+`</td>`;
            }else{
                if(v2=="checkbox"){
                    if(v.func!=undefined){
                        fdata+=`<td>`+_inp({type:"checkbox", attr:" onchange='"+v.func.substring(0,v.func.length-1)+i1+",this)' "+_trueChecked(1,Number(v1['value']))})+`</td>`;
                    }else{
                        fdata+=`<td>`+_inp({type:"checkbox"})+`</td>`;
                    }
                }else{
                    fdata+=`<td>`+v1[v2]+`</td>`;
                }
            }
        });
        if(faction){
            fdata+=`<td>`+_inpFunc(v.action.isi,v.no-2)+`</td>`;
        }
        fdata+=`</tr>`;
    });

   return fdata+=`</tbody>`;
}
function _tabel(v){
    // _tabel(
    // {
    //     data:_.dusulan
    //     ,no:1
    //     ,kolom:[
    //         "nmDinas","nmUsulan","checkbox"
    //     ]
    //     ,namaKolom:[
    //         "Nama Dinas","Usulan","Action"
    //     ]
    // })
    var fdata=`
    <thead>
        <tr>`,fno=false,faction=false;
    
    if(v.no>0){
        fdata+=`<th>no</th>`;
        fno=true;
    }
    v.namaKolom.forEach(v1 => {
        fdata+=`<th>`+v1+`</th>`;
    });
    if(v.action!=null || v.action!=undefined){
        fdata+=`<th>Action</th>`;
        faction=true;
        if(v.action.length==0){
            v.action.push({ 
                clsBtn:`btn-outline-danger`
                ,icon:`<i class="mdi mdi-lock"></i>`
                ,title:"TERKUNCI"
            });
        }
    }
    fdata+=`</tr>
        </thead>
        <tbody>`;
    v.data.forEach((v1,i1) => {
        fdata+=`
            <tr>`;
            if(fno){
                fdata+=`<td>`+v.no+`</td>`;
                v.no+=1;
            }
        v.kolom.forEach((v2,i2) => {
            // f1data=v2.split("$");
            // if(f1data.length==2){
            //     fdata+=`<td>`+_$(v1[f1data[0]])+`</td>`;
            // }else{
            //     if(v2=="checkbox"){
            //         if(v.func!=undefined){
            //             fdata+=`<td>`+_inp({type:"checkbox", attr:" onchange='"+v.func.substring(0,v.func.length-1)+i1+",this)' "+_trueChecked(1,Number(v1['value']))})+`</td>`;
            //         }else{
            //             fdata+=`<td>`+_inp({type:"checkbox"})+`</td>`;
            //         }
            //     }else{
            //         fdata+=`<td>`+v1[v2]+`</td>`;
            //     }
            // }
            kond=true;
            f1data=v2.split("$");
            if(f1data.length==2){
                fdata+=`<td>`+_$(v1[f1data[0]])+`</td>`;
                kond=false;
            }
            if(v2=="checkbox" && kond){
                // console.log(v1['checked']);
                if(v.func!=undefined){
                    kond=false;
                    fdata+=`<td>`+_inp({type:"checkbox", attr:" onchange='"+v.func.substring(0,v.func.length-1)+i1+",this)'",checked:_trueChecked(1,Number(v1['checked']))  })+`</td>`;
                }else{
                    
                    kond=false;
                    fdata+=`<td>`+_inp({type:"checkbox" ,attr:"", checked:_trueChecked(1,Number(v1['checked']))})+`</td>`;
                }
            }
            f1data=v2.split("+");
            if(f1data.length==2){
                fdata+=`<td>`+_$(
                    Number(v1[f1data[0]])+Number(v1[f1data[1]])
                    )+`</td>`;
                kond=false;
            }
            f1data=v2.split("-");
            if(f1data.length==2){
                fdata+=`<td>`+_$(
                    Number(v1[f1data[0]])-Number(v1[f1data[1]])
                )+`</td>`;
                kond=false;
            }
            f1data=v2.split("*");
            if(f1data.length==2){
                fdata+=`<td>`+_$(
                    Number(v1[f1data[0]])*Number(v1[f1data[1]])
                )+`</td>`;
                kond=false;
            }
            f1data=v2.split("/");
            if(f1data.length==2){
                fdata+=`<td>`+_$(
                    Number(v1[f1data[0]])/Number(v1[f1data[1]])
                )+`</td>`;
                kond=false;
            }
            if(kond){
                fdata+=`<td>`+v1[v2]+`</td>`;
            }
        });
        if(faction){
            fdata+=`<td style="min-width: 15%;">`+_btnGroup(v.action,v.no-2)+`</td>`;
        }
        fdata+=`</tr>`;
        if(v.subKolom!=undefined && v.subKolom.length>0){
            fdata+=`
            <tr id="`+v.subKolom[0]+(v.no-2)+`" style="display: none;">`;
                if(fno){
                    fdata+=`<td>`+(v.no-1)+`</td>`;
                }
            v.kolom.forEach((v3,i3) => {
                fdata+=`<td>`+v1[v3]+`</td>`;
            })
            if(faction){
                fdata+=`<td style="min-width: 15%;">`+_btnGroup(v.action,v.no-2)+`</td>`;
            }
            fdata+=`</tr>`;
        }
        
    });

   return fdata+=`</tbody>`;
}
function _tabelForExcel(v){
    var fdata=`
    <thead>
        <tr>`,fno=false,faction=false;
    
    if(v.no>0){
        fdata+=`<th>no</th>`;
        fno=true;
    }
    v.namaKolom.forEach(v1 => {
        fdata+=`<th>`+v1+`</th>`;
    });
    if(v.action!=null || v.action!=undefined){
        fdata+=`<th>Action</th>`;
        faction=true;
        if(v.action.length==0){
            v.action.push({ 
                clsBtn:`btn-outline-danger`
                ,icon:`<i class="mdi mdi-lock"></i>`
                ,title:"TERKUNCI"
            });
        }
    }
    fdata+=`</tr>
        </thead>
        <tbody>`;
    v.data.splice(0,1);
    v.data.forEach((v1,i1) => {
        fdata+=`
            <tr>`;
            if(fno){
                fdata+=`<td>`+v.no+`</td>`;
                v.no+=1;
            }
        v.kolom.forEach((v2,i2) => {
            try {
                f1data=v2.split("$");
                if(f1data.length==2){
                    fdata+=`<td>`+_$(v1[Number(f1data[0])])+`</td>`;
                }else{
                    if(v2=="checkbox"){
                        if(v.func!=undefined){
                            fdata+=`<td>`+_inp({type:"checkbox", attr:" onchange='"+v.func.substring(0,v.func.length-1)+i1+",this)' "})+`</td>`;
                        }else{
                            fdata+=`<td>`+_inp({type:"checkbox"})+`</td>`;
                        }
                    }else{
                        fdata+=`<td>`+v1[v2]+`</td>`;
                    }
                }
            } catch (error) {
                if(v1[v2]!=null){
                    fdata+=`<td>`+v1[v2]+`</td>`;
                }else{
                    fdata+=`<td></td>`;
                }
            }
        });
        if(faction){
            fdata+=`<td>`+_btnGroup(v.action,v.no-2)+`</td>`;
        }
        fdata+=`</tr>`;
    });

   return fdata+=`</tbody>`;
}
function _tabelDetailBelanja(id){
    fdata2=`
        <table id="`+id+`" class="table table-bordered table-sm text12">
            `+_isiTabelDetailBelanja()+`
        </table>
    `;
    return fdata2;
}
function _isiTabelDetailBelanja(){
    fdata=`
        <tbody>
            <tr class="text-center bg-gray-400">
                <th rowspan="2">No</th>
                <th rowspan="2" style="min-width:100px">Uraian</th>
                <th rowspan="2" style="width: 55px;">SSH/ HSPK/ ASB</th>
                <th colspan="6">Detail Volume</th>
                <th colspan="3">Rincian Perhitungan</th>
                <th rowspan="2" class="w-tot">Jumlah (Rp)</th>
                <th rowspan="2" width="100">Aksi</th>
            </tr>
            <tr class="text-center bg-gray-300">
                <th class="w-jml">Jml</th>
                <th class="w-sat">Sat</th>
                <th class="w-jml">Jml</th>
                <th class="w-sat">Sat</th>
                <th class="w-jml">Jml</th>
                <th class="w-sat">Sat</th>
                <th class="w-vol">Volume</th>
                <th class="w-vol">Satuan</th>
                <th class="w-hrg">Harga</th>
            </tr>
    `;
    if(pjudulRincian.length==0){
        return '';
    }
    pjudulRincian.forEach((v,i) => {
        fdata+=`
            <tr class="text-center bg-gray-200" id="addStart">
                <td class="text-center bg-gray-200">
                    `+(i+1)+`
                </td>
                <td>
                    <input type="text" class="form-control input-sm text12" onchange="_dbJudul(this,`+i+`)" value="`+v.nama+`" style="height: 28px;">
                </td>
                <td>
                    `+_btnGroup([
                        { 
                            clsBtn:`btn-outline-danger`
                            ,icon:`<i class="mdi mdi-delete-forever"></i>`
                            ,title:"Hapus Judul"
                            ,func:"_dbDelForm("+i+")"
                        }
                    ])+`
                </td>
                <td colspan="9">
                    <div class="input-group input-group-sm">
                        <div class="input-group-prepend"><span class="input-group-text">
                            Sumber Dana</span>
                        </div>
                        <select id="kodeSumber" onchange="_dbSumberDana(this,`+i+`)" class="form-control form-control-sm text12">
                            `+_inpComboBox({
                                data:_.sumberdana,
                                inSelect:"BAGUS H"
                            })+`
                        </select>
                    </div>
                </td>
                <td>
                    <input type="text" class="v-money form-control text-right input-sm text12" disabled="disabled" style="height: 28px;" value="`+_$(v.pagu)+`">
                </td>
                <td class="text-center align-middle">
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            URAIAN
                        </button>
                        <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 31px, 0px); top: 0px; left: 0px; will-change: transform;">
                            <button class="dropdown-item" onclick="_opsDetail(1,`+i+`)">SSH</button>
                            <button class="dropdown-item" onclick="_opsDetail(0,`+i+`)">URAIAN</button>
                        </div>
                    </div>
                    
                </td>
            </tr>
        `;

        v.detail.forEach((v1,i1) => {
            fdata+=`
                <tr class="text-center bg-gray-200">
                    <td class="text-center bg-gray-200" style="font-size: small;color: black;">
                        `+(i1+1)+`
                    </td>
                    <td>
                        <input type="text" class="form-control input-sm text12" onchange="_dbUraian(this,`+i+`,`+i1+`)" value="`+v1.nama+`">
                    </td>
                    <td class="text-center">
                        `+_btnGroup([
                            { 
                                clsBtn:`btn-outline-primary`
                                ,icon:`<i class="fa fa-edit"></i>`
                                ,title:"edit"
                            },
                            { 
                                clsBtn:`btn-outline-primary`
                                ,icon:`<i class="fa fa-list"></i>`
                                ,title:"detail"
                            }
                        ])+`
                    </td>
                    <td>
                        <input type="number" step="1" class="form-control input-sm text-right text12" onchange="_dbJum(this,1,`+i+`,`+i1+`)" value="`+v1.jml1+`">
                    </td>
                    <td>
                        <input type="text" class="form-control input-sm text-center text12" onchange="_dbSat(this,1,`+i+`,`+i1+`)" value="`+v1.sat1+`">
                    </td>
                    <td>
                        <input type="number" step="1" class="form-control input-sm text-right text12" onchange="_dbJum(this,2,`+i+`,`+i1+`)"  value="`+v1.jml2+`">
                    </td>
                    <td>
                        <input type="text" class="form-control input-sm text-center text12" onchange="_dbSat(this,2,`+i+`,`+i1+`)" value="`+v1.sat2+`">
                    </td>
                    <td>
                        <input type="number" step="1" class="form-control input-sm text-right text12" onchange="_dbJum(this,3,`+i+`,`+i1+`)" value="`+v1.jml3+`">
                    </td>
                    <td>
                        <input type="text" class="form-control input-sm text-center text12" onchange="_dbSat(this,3,`+i+`,`+i1+`)" value="`+v1.sat3+`">
                    </td>
                    <td>
                        <input type="number" step="1" class="form-control text-right input-sm text12" disabled="" value="`+String(v1.vol)+`">
                    </td>
                    <td>
                        <input type="text" class="form-control input-sm text-center text12" disabled="" value="`+v1.sat+`">
                    </td>
                    <td>
                        <input type="number" class="v-money form-control text-right input-sm text12" onchange="_dbHarga(this,`+i+`,`+i1+`)"  value="`+v1.harga+`">
                    </td>
                    <td>
                        <input type="text" class="v-money form-control text-right input-sm text12" disabled=""  value="`+_$(String(v1.total))+`">
                    </td>
                    <td class="text-center">
                        <div style="margin:auto"><button type="button" disabled="" title="Pindah Ke Atas" onclick="_dbPosisiUp(`+i+`,`+i1+`)" class="btn btn-sm btn-outline-warning">
                                <i class="fa fa-arrow-up text-dark"></i>
                            </button><button type="button" disabled="" title="Pindah Ke Bawah" onclick="_dbPosisiDonw(`+i+`,`+i1+`)" class="btn btn-sm btn-outline-warning">
                                <i class="fa fa-arrow-down text-dark"></i>
                            </button>
                        </div>
                        <div style="margin:auto">
                            <button type="button" title="Copy As New" onclick="_dbCopyAsNew(`+i+`,`+i1+`)" class="btn btn-sm btn-primary">
                                <i class="fa fa-copy"></i>
                            </button> 
                            <button type="button" title="Hapus" onclick="_dbDelForm(`+i+`,`+i1+`)" class="btn btn-sm btn-danger ">
                                <small>x</small>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
    });
    
   return fdata+=`
        <tr class="bg-gray-200">
            <td colspan="14" class="text-right">
                <button class="btn btn-success btn-sm btn-icon-split" onclick="_saved('modalSave')">
                    <span class="icon text-white-50">
                    <i class="fas fa-check"></i>
                    </span>
                    <span class="text">SAVE</span>
                </button>
            </td>
        </tr>
    </tbody>`;
}

function _tabelViewDetailBelanja() {
    var html=`
        <tbody>
            <tr class="text-center align-middle " style="background-color: ghostwhite;">
                <th rowspan="2" width="8%">Kode Rekening</th>
                <th rowspan="2">Uraian</th>
                <th rowspan="2" width="12%">Detail Volume</th>
                <th colspan="3" width="22%">Rincian Perhitungan</th>
                <th rowspan="2" width="12%">Jumlah</th>
                <th rowspan="2" width="82">Aksi</th>
            </tr>
            <tr class="text-center align-middle" style="background-color: ghostwhite;">
                <th width="5%">Vol</th>
                <th width="5%">Sat</th>
                <th width="8%">Harga Satuan</th>
            </tr>`;
    var kdRek="",judul="",kdDana="",kdInduk="",kdA1="",kdA2="",kdA3="",kdA4;
    // for(let a=0;a<dataDetailRincian.length;a++){
    _.ddb.forEach((v,a) => {
        if(a==0){ //for sub kegiatan saja
            html+=`
                <tr class="font-weight-bold">
                    <td></td>
                    <td colspan="5">`+v.kdSub+` - `+v.nmSub+`</td>
                    <td class="text-right"></td>
                    <td class="text-center"></td>
                </tr>
            `;
        }
        if(kdInduk!=v.kdInduk){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1">`+v.kdInduk+`</td>
                    <td colspan="5" class="flag1">
                    `+v.nmInduk+`
                    </td>               
                    <td class="text-right">`+_paguAnggaran(v.kdInduk)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdInduk=v.kdInduk;
           
        }
        if(kdA1!=v.kdA1){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1">`+v.kdA1+`</td>
                    <td colspan="5" class="flag1">
                    `+v.nmA1+`
                    </td>               
                    <td class="text-right">`+_paguAnggaran(v.kdA1,1)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdA1=v.kdA1;
        }
        if(kdA2!=v.kdA2){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1">`+v.kdA2+`</td>
                    <td colspan="5" class="flag1">
                    `+v.nmA2+`
                    </td>               
                    <td class="text-right">`+_paguAnggaran(v.kdA2,2)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdA2=v.kdA2;
        }
        if(kdA3!=v.kdA3){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1">`+v.kdA3+`</td>
                    <td colspan="5" class="flag1">
                    `+v.nmA3+`
                    </td>               
                    <td class="text-right">`+_paguAnggaran(v.kdA3,3)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdA3=v.kdA3;
        }
        if(kdA4!=v.kdA4){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1">`+v.kdA4+`</td>
                    <td colspan="5" class="flag1">
                    `+v.nmA4+`
                    </td>               
                    <td class="text-right">`+_paguAnggaran(v.kdA4,4)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdA4=v.kdA4;
        }
        
        if(kdRek!=v.kdRek){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1">`+v.kdRek+`</td>
                    <td colspan="5" class="flag1">
                    `+v.nmRek+`
                    </td>               
                    <td class="text-right">`+_paguAnggaran(v.kdRek,5)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdRek=v.kdRek;
        } 
        if(kdDana!=v.kdDana){
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1"></td>
                    <td colspan="5" class="flag1">
                    `+v.nmDana+`
                    </td>               
                    <td class="text-right"></td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
            kdDana=v.kdDana;
        } 

        html+=`
            <tr class="font-weight-bold">
                <td class="pl-1"></td>
                <td colspan="5" class="flag4">
                - `+v.nama+`
                </td>
                <td class="text-right pr-1">`+_$(v.pagu)+`</td>
                <td class="text-right">`;
                if("0"=="0"){
                    html+=_btnGroup([
                        {
                            clsBtn:`btn-outline-warning`
                            ,func:"_vdbEdit("+a+")"
                            ,icon:`<i class="fa fa-edit"></i>`
                            ,title:"Perbaiki Uraian"
                        },
                        {
                            clsBtn:`btn-outline-danger`
                            ,func:"_vdbDelete("+a+")"
                            ,icon:`<i class="fas fa-trash"></i>`
                            ,title:"Hapus Uraian"
                        }
                    ]);
                }else{
                    html+=`<span class="badge badge-danger">TERKUNCI</span>`
                }
                
                html+=`</td>
            </tr>
        `;
        fdetail="";
        v.detail.forEach((v1,a1) => {
            fdetail=`(`;
            fdetail+=v1.sat1;
            if(v1.sat2!=''){
                fdetail+=` * `+v1.sat2;
            }
            if(v1.sat3!=''){
                fdetail+=` * `+v1.sat3;
            }
            fdetail+=`)`;
            html+=`
                <tr class="font-weight-bold">
                    <td class="pl-1"></td>
                    <td class="flag4">
                    `+(a1+1)+`. `+v1.nama+`
                    </td>
                    <td>
                        `+fdetail+`
                    </td>
                    <td>
                        `+v1.vol+`
                    </td>
                    <td>
                        `+v1.sat+`
                    </td>
                    <td>
                        `+_$(v1.harga)+`
                    </td>
                    <td class="text-right pr-1">`+_$(v1.total)+`</td>
                    <td class="text-right">
                    </td>
                </tr>
            `;
        });
        
    });
    return html+"</tbody>";
}
function _btnGroup(v,id){
    fdata=``;
    v.forEach((v1,i) => {
        fdata1=v1.func;
        if(id!=undefined){
            try {
                fdata1=v1.func.substring(0,v1.func.length-1)+id+`)`;
            } catch (error) {
                fdata1='';
            }
        }
        ftam="";
        if(v1.title!=null){
            ftam="title='"+v1.title+"'";
        }
        fdata+=`<button type="button" id="bt`+i+``+id+`" class="btn btn-sm `+v1.clsBtn+`" onclick="`+fdata1+`" `+ftam+`>`+v1.icon+`</button>`;
    });
    return `
        <div class="btn-group mr-2">
            `+fdata+`
        </div>
    `;
}
function _btnGroupTd(v,id){
    // _btnGroupTd([{ 
    //     clsBtn:`btn-success`,
    //     icon:`<i class="mdi mdi-cloud-check text-light"></i>Donwload`,
    //     func:"_add()",
    //     title:"Donwload"
    // }])
    
    // infoSupport=[];
    // infoSupport.push({ 
    //     clsBtn:`btn-outline-primary`
    //     ,func:"_add()"
    //     ,icon:`<i class="mdi mdi-note-plus text-dark"></i> Tambah Data`
    //     ,title:"Tambah Data"
    // })
        
    // infoSupport1.push({ 
    //     clsBtn:`btn-outline-warning`
    //     ,func:"_upd()"
    //     ,icon:`<i class="mdi mdi-grease-pencil"></i>`
    //     ,title:"Perbarui"
    // });
    // _btnGroupTd(infoSupport)
    fdata=``;
    frowspan="colspan='"+v.length+"'";
    fstyle=" style='padding-left:0px; padding-right:0px'";
    fstyle1=" style='padding-left:0px;'";
    v.forEach((v1,i) => {
        fdata1=v1.func;
        if(id!=undefined){
            try {
                fdata1=v1.func.substring(0,v1.func.length-1)+id+`)`;
            } catch (error) {
                fdata1='';
            }
        }
        ftam="";
        if(v1.title!=null){
            ftam="title='"+v1.title+"'";
        }
        
        if(i>0){
            frowspan="";
        }
        if(i==v.length-1){
            fdata+=`<td `+frowspan+fstyle1+`><button type="button" class="btn btn-sm `+v1.clsBtn+`" onclick="`+fdata1+`" `+ftam+`>`+v1.icon+`</button></td>`;
        }else{
            fdata+=`<td `+frowspan+fstyle+`><button type="button" class="btn btn-sm `+v1.clsBtn+`" onclick="`+fdata1+`" `+ftam+`>`+v1.icon+`</button></td>`;
        }
    });
    return fdata;
}
function _modalCenterContent(judul,form){
    _setModalContent(`
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">`+judul+`</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               `+form+`
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    `);
}
function _modalShowImage(v){
    // _modalShowImage({
    //     judul:"",
    //     style:undefined,
    //     file:upload/fileDisposisi/`+_.ddisposisi[ind].data[0].files+`
    // })
    fstyle=`style="width: 400px; "`;//height: 264px;
    if(v.style!=undefined){
        fstyle=v.style;
    }

    fjudul=`Tampilan Gambar`;
    if(v.judul!=undefined){
        fjudul=v.judul;
    }

    return _modalCenterContent(fjudul,`<img src="`+assert+v.file+`" `+fstyle+`>`);
}
function _modalEx1(v){
    // data-dismiss="modal"
    fmin="500px";
    if(v.minWidth!=undefined){
        fmin=v.minWidth;
    }
    fdata=`style="min-width:`+fmin+`"`;
    fdata1=`bg-primary`;
    fdata2=`style="background-color:#adadad !important;"`
    if(v.bg!=undefined){
        fdata1=v.bg;
    }
    _setModalContent(`
        <div class="modal-content" `+fdata+`>
            <div class="modal-header `+fdata1+`" >
                <h5 class="modal-title" style="width: 100%;">
                    <div class="row">
                        <div class="col-auto">
                            `+v.icon+`
                        </div>
                        <div class="col-10">
                            `+v.judul+`
                        </div>
                    </div>
                </h5>
                <button type="button" class="close" onclick="_modalHide('modal')">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               `+v.isi+`
            </div>
            <div class="modal-footer" `+fdata2+`>
                `+v.footer+`
            </div>
            <div id='modalToast' style='background: none;'></div>
        </div>
    `);
    idToast="modalToast";
}
function _headLine(v){
    fdata="";
    v.data.forEach((v1,i) => {
        if(i==0){
            fdata+=`<span class="title__effect is-visible text-primary">`+v1+`</span> `;
        }else{
            fdata+=`<span class="title__effect text-primary">`+v1+`</span> `;
        }
    });
    return `
        <div class="site" id="`+v.id+`">
            <a class="skip-link sr-only" href="#main">Skip to content</a>

            <!-- Options headline effects: .rotate | .slide | .zoom | .push | .clip -->
            <section class="hero-section hero-section--image clearfix clip">
                <div class="hero-section__wrap">
                    <div class="hero-section__option">
                        <img src="`+assert+`/`+v.img+`" alt="2G18">
                    </div>
                    <!-- .hero-section__option -->

                    <div class="container">
                        <div class="row">
                            <div class="offset-lg-2 col-lg-8">
                                <div class="title-01 title-01--11 text-center">
                                    <h2 class="title__heading">
                                        <span>`+v.judul+`</span>
                                        <strong class="hero-section__words">
                                            `+fdata+`
                                        </strong>
                                    </h2>
                                    <div class="title__description">
                                        `+v.deskripsi+`
                                    </div>

                                    <!-- Options btn color: .btn-success | .btn-info | .btn-warning | .btn-danger | .btn-primary -->
                                    <div class="title__action">
                                        <a href="https://themewagon.com/themes/free-html5-splash-screen-template/" style="max-width: 70%;margin: auto;" class="btn btn-block btn-primary">
                                            Daftar
                                        </a>
                                    </div>
                                </div> <!-- .title-01 -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}
function _judulContent(v){
    return `
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">`+v.page+`</h1>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">`+v.prevPage+`</a></li>
            <li class="breadcrumb-item active" aria-current="page">`+v.page+`</li>
        </ol>
    </div>
    `;
}