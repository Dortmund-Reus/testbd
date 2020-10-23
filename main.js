let box1 = document.getElementById('layer4');
let para = document.querySelector('.para');
let myPara1 = document.createElement('p');
let myPara2 = document.createElement('p');
let myPara3 = document.createElement('p');
let supervise_button = document.getElementById('supervise');
let upload_button = document.getElementById('upload');
let burning_button = document.getElementById('burning');
let log_menu = document.getElementById('logMenu');
if(log_menu == null) console.log("error");

let pi_cnt = 0;
let mega_cnt = 0;

$=function(element){
  return document.querySelectorAll(element);
}
var mymenu=document.getElementById("supermenu");

//上传文件
function easyUpload(){
  var input = document.createElement("input");
  input.type = "file";
  input.click();
  input.onchange = function(){
    var file = input.files[0];
    var form = new FormData();
    form.append("file", file); //第一个参数是后台读取的请求key值
    form.append("fileName", file.name);
    form.append("other", "666666"); //实际业务的其他请求参数
    var xhr = new XMLHttpRequest();
    var action = "http://localhost:8080/upload.do"; //上传服务的接口地址
    xhr.open("POST", action);
    xhr.send(form); //发送表单数据
    xhr.onreadystatechange = function(){
      if(xhr.readyState==4 && xhr.status==200){
        var resultObj = JSON.parse(xhr.responseText);
        //处理返回的数据......
      }
    }
  }
}

function myFunction() {
    alert ("Hello World!");
}

function supervise() {
  client_id = myPara1.textContent.substring(myPara1.textContent.indexOf(" ") + 1);
  device_id = myPara2.textContent.substring(myPara2.textContent.indexOf(" ") + 1);
  device_status = myPara3.textContent.substring(myPara3.textContent.indexOf(" ") + 1);
  msg = "supervise.html?client_id=" + client_id + "&device_id=" + device_id + "&status=" + device_status;
  //console.log(msg);
  window.open(msg, "_blank");
}

function check_log() {
  client_id = myPara1.textContent.substring(myPara1.textContent.indexOf(" ") + 1);
  device_id = myPara2.textContent.substring(myPara2.textContent.indexOf(" ") + 1);
  device_status = myPara3.textContent.substring(myPara3.textContent.indexOf(" ") + 1);
  msg = "log.html?client_id=" + client_id + "&device_id=" + device_id + "&status=" + device_status;
 // console.log(msg);
  window.open(msg, "_blank");
}

if(log_menu == null) console.log("error");

log_menu.addEventListener("click", check_log);
supervise_button.addEventListener("click", supervise);
upload_button.addEventListener("click", easyUpload);
burning_button.addEventListener("click", myFunction);

function Device(device_id, client_id, device_status) {
  this.device_id = device_id;
  this.client_id = client_id;
  this.device_status = device_status;
  if(device_id.indexOf('pi') !== -1){
      this.device_type = "pi";
  } else {
      this.device_type = "mega";
  }
  this.box = document.createElement('div');
  // this.box.setAttribute("class", this.device_type);
  // this.box.addAttribute("class", "menu")
  this.box.setAttribute("class", "menu " + this.device_type);
  this.box.setAttribute("client_id", client_id);
  this.box.setAttribute("device_id", device_id);
  this.box.setAttribute("device_status", device_status);
  this.box.addEventListener("click", this.update);
}

// Device.prototype.show = function(e) {
//     console.log(e.target);
//     alert("hello " + e.target.getAttribute("device_id"));
// }

Device.prototype.update = function(e){
    myPara1.textContent = '设备管理客户端ID: ' + e.target.getAttribute("client_id");
    myPara2.textContent = '设备ID: ' + e.target.getAttribute("device_id");
    myPara3.textContent = '设备状态: ' + e.target.getAttribute("device_status");  
    para.appendChild(myPara1);
    para.appendChild(myPara2);
    para.appendChild(myPara3);
}

Device.prototype.draw = function() {
    box1.appendChild(this.box);
}

let pi_1 = new Device("pi-1", "client-1", "free");
let pi_2 = new Device("pi-2", "client-1", "free");
let pi_3 = new Device("pi-3", "client-1", "free");
let mega_1 = new Device("mega-1", "client-1", "free");
let mega_2 = new Device("mega-2", "client-1", "free");
let mega_3 = new Device("mega-3", "client-1", "free");
pi_1.draw();
pi_2.draw();
pi_3.draw();
mega_1.draw();
mega_2.draw();
mega_3.draw();


//监听mousedown事件

for(var i=0;i<$(".menu").length;i++){
  $(".menu")[i].addEventListener("mousedown",function(e){
      if(window.event) e=window.event; //兼容性
      if(e.button==2){//判断按下右键
          document.oncontextmenu=function(e){
              e.preventDefault();//阻止原有的菜单
              // e.returnValue=false;
          }
          mymenu.style.cssText='display: block;'; //先显示后才能获取menu的高宽
          var menuwidth=mymenu.offsetWidth;//获取自定义菜单的高宽
          var menuheight=mymenu.offsetHeight;
      //    console.log(menuheight,menuwidth);
          var clientwidth=document.documentElement.clientWidth;//获取当前可视窗口的高宽
          var clientheight=document.documentElement.clientHeight;
          if(clientheight-e.pageY>=menuheight){ //底下有足够空间时
              mymenu.style.top=e.pageY+"px";//菜单在下方
          }else{
              mymenu.style.top=(e.pageY-menuheight)+"px";
          }
          if(clientwidth-e.pageX>=menuwidth){ //右边有足够空间
              mymenu.style.left=e.pageX+"px";//菜单在右边
          }else{
              mymenu.style.left=(e.pageX-menuwidth)+"px";
          }
        //      console.log(clientheight-e.pageY,clientwidth-e.pageX);

      }
  })
  document.body.addEventListener("click",function(e){ //点击其他地方菜单消失，可恢复默认的菜单事件
      mymenu.style.cssText='display: none;';
      document.oncontextmenu=function(e){}
  })
}