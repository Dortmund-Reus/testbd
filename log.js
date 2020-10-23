let msg = [];

let values;
let para = document.querySelector('.para');

let myPara1 = document.createElement('p');
let myPara2 = document.createElement('p');
let myPara3 = document.createElement('p');

$=function(element){
  return document.querySelectorAll(element);
}

function getParam(){
    var query = location.search.substring(1);               //获取参数键值对
    values = query.split("&");                              //以&将键值对分开
    // var value = new Arrary(values.length);                  //新建数组用于保存键值

   // console.log(values.length);
 //   console.log(values[0]);
  //  console.log(values[1]);
    for(var i = 0; i < values.length;  i++){
     //   console.log(values[i]);
        var pos = values[i].indexOf('=');                   //获取=所在位置
      //  console.log('666');
        if(pos == -1) continue;                              //不存在=则继续执行循环
    //    console.log('777');
       // console.log(values[i]);
        var paramName = values[i].substring(0,pos);         //获取参数名称
      //  para.push(values[i]);
        //console.log(para[i]);
        msg.push(values[i].substring(pos+1));              //获取参数 放入数组
    }
}

getParam();
console.log(msg[0]);
console.log(msg[1]);
console.log(msg[2]);

myPara1.textContent = '设备管理客户端ID: ' + msg[0];
myPara2.textContent = '设备ID: ' + msg[1];
myPara3.textContent = '设备状态: ' + msg[2];  
para.appendChild(myPara1);
para.appendChild(myPara2);
para.appendChild(myPara3);