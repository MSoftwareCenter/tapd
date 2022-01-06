var param={},judul={},slider=Array(),informasi=Array(),infoSupport=Array(),infoSupport1=Array(),infoSupport2=Array(),viewWebsite=""
  ,chart=Array(),form={},dropdonw={},navBar={},menuSupport=[],header={},list=[],navList=[],_={},
  color=Array(),icon=Array(),pjudulRincian=Array(),duplikat=Array();

var img={
  size :15000000 //2 MB
  ,data:Array()
  ,fileName:["jpg","jpeg","png","bmp"]
  ,maxUpload:2
  ,idView:"images"
},
_file={
  size :2000000 //2 MB
  ,data:Array()
  ,fileName:["application/pdf","pdf"]
  ,maxUpload:2
  ,idView:"files"
},toast={judul:"ERROR !!!",isi:"tester",cheader:"bg-primary",color:"black",icon:`<i class="mdi mdi-email-outline"></i>`,timeOut:3000}
_jbt={
  allDis    :[1,2,3,4,5,6],
  all       :[1,3,4,5,6],
  usulan    :[1,3,4,6],
  disposisi :[2,4,6],
  kajian    :[4,5,6],
  tapd      :[4,6],
  kajiTapd  :[4,5,6]
},
vjabatan='4',
_notif=false;
_vmaxTabel=3;
var uang = new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD',
      minimumFractionDigits: 3 });
var date            = new Date();
var _tamp1="",_tamp2="",idToast="toast";
var _text={};

// judul.nama="<img width='120px' src='"+assert+"/bgSupportCss/tapd1.png'>"; //judul atau navBar
judul.nama="<img width='120px' src='"+assert+"/bgSupportCss/ltapd.png'>"; //judul atau navBar
judul.namaColor="text-white";
judul.navBG="bg-light";
judul.Logo=assert+"/bgSupportCss/logo1.png";
judul.LogoSize=40;
judul.menuStyle='style="color:#f08e0c;"';
judul.bgNav="background-color: #0b6c71  !important;";
// bav bar 1
// judul.menu=Array();
// judul.menu.push({nama:"Iklan",act:"",icon:`<i class="mdi mdi-facebook-box"></i>`});
// judul.menu.push({nama:"Informasi",act:"",icon:`<i class="mdi mdi-telegram"></i>`});
// judul.menu.push({nama:"Tahapan",act:"",icon:`<i class="mdi mdi-gmail"></i>`});
// judul.menu.push({nama:"Login",act:"",icon:`<i class="mdi mdi-instagram"></i>`});

// bav bar 2
judul.menu=Array();
judul.menu.push({act:"https://bappedalitbangksb.com/",icon:`<i class="mdi mdi-facebook-box"></i>`,nama:"Facebook",color:"text-light"});
judul.menu.push({act:"https://bappedalitbangksb.com/",icon:`<i class="mdi mdi-telegram"></i>`,nama:"Telegram",color:"text-light"});
judul.menu.push({act:"https://bappedalitbangksb.com/",icon:`<i class="mdi mdi-gmail"></i>`,nama:"Gmail",color:"text-light"});
judul.menu.push({act:"https://bappedalitbangksb.com/",icon:`<i class="mdi mdi-instagram"></i>`,nama:"Instagram",color:"text-light"});

var msg={
  addJudul      :"Tambahkan Informasi Judul",
  username      :"Username Belum Di Isi",
  addDeskripsi  :"Tambahkan Informasi Deskripsi",
  password      :"Password Belum Di Isi",

  add           :"Tambahkan ",
  addKode       :"Tambahkan Kode ",
  addNama       :"Tambahkan Nama ",
  addPagu       :"Tambahkan Pagu ",
  addNamaKepala :"Tambahkan Nama ",
  addNipKepala  :"Tambahkan Nama ",
}
