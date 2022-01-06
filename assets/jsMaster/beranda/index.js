function _onload(data){
    _installVarAble({
        page:`Dashboard`,
        pageRight:`<li class="breadcrumb-item"><a href="#!">Login</a></li>`,
        form:""
    });
    navBar.menu[1].menu[0].active="active";
    // navBar.menu[1].menu[0].subMenu[0].status="active";
    _installAble({form:false,css:data.head});
    $('#body').html(_form());
    // skyblue    background-img':'url("+assert+'bgSupportCss/bg5.jpg")
    $('body').css({'background-image':'url("'+assert+'bgSupportCss/bg5.jpg")'});
    // $('body').css({'background-color':'#525252'});
    myCode=data.code;

}
function _form(){
    // <h5 class="text-center text-dark">T     A       P       D <br>SUMBAWA BARAT </h5>
    return _loaderAlbe()+`        
        <section class="login-block">
            <!-- Container-fluid starts -->
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">

                        <div class="auth-box card">
                            <div class="card-block">
                                <div class="text-center">
                                    <img src="`+assert+`bgSupportCss/logo1.png" width="150px" alt="logo.png">
                                </div>

                            </div>
                            <h5 class="text-center " style="color:#149bb1;">
                                SISTEM INFORMASI
                                <br>
                                ADMINISTRASI TIM ANGGARAN
                                <hr>
                            </h5>
                            <div style="padding: 10px; margin-top:2%;margin-bottom:2%;">
                                `+ _inpGroupPrepend({id:"username",placeholder:"User Name",type:"text",icon:'<i class="mdi mdi-account"></i>',bg:"bg-primary"})+`
                                `+ _inpGroupPrepend({id:"password",placeholder:"Password",type:"password",icon:'<i class="mdi mdi-account-key"></i>',bg:"bg-primary"})+`
                                `+_inpSejajar({
                                    isi:"Lupa Password ???",
                                    judul:""
                                })+`
                                <button class="btn btn-primary btn-block" onclick="_login()">LOGIN</button>
                            </div>

                            <div class="card-block">
                                <div class="text-center">
                                    <hr>
                                    Visi Pembangunan Daerah Tahun 2021-2026
                                    <br>
                                    "Terwujudnya KSB Baik Berlandaskan Gotong-Royong"
                                </div>
                            </div>
                        </div>

                            <!-- end of form -->
                    </div>
                    <!-- end of col-sm-12 -->
                </div>
                <!-- end of row -->
            </div>
            <!-- end of container-fluid -->
        </section>
    `;
}
function _login(){
    username    =$('#username').val();
    password    =$('#password').val();
    
    if(_isNull(username)){return _toast({isi:msg.username,cheader:"bg-danger"})}; 
    if(_isNull(password)){return _toast({isi:msg.password,cheader:"bg-danger"})}; 

    params={
        password   :password
        ,username  :username
        ,myCode   :myCode
    };
    _post("Proses/checkUser",params).then(response=>{
        response=JSON.parse(response);
        if(response.exec){
            _redirect("control/dashboard/"+btoa(JSON.stringify(params)));
        }else{
            return _toast({isi:response.msg,cheader:"bg-danger"});
        }
    })
}
