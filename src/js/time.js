//入口文件切换代码 setInterval
function GetRTime(){
   var EndTime= new Date('2015/08/3 10:00:00'); 
   //var EndTime= new Date('2015/07/23 20:56:00');
   var NowTime = new Date();
   var t =EndTime.getTime() - NowTime.getTime();
   var d=Math.floor(t/1000/60/60/24);
   var h=Math.floor(t/1000/60/60%24);
   var m=Math.floor(t/1000/60%60);
   var s=Math.floor(t/1000%60);
   h1=t/1000/60/60+1;
   // if(h>=14&&h<=24||h>=38&&h<=48){
   //   $(".daytime").show();
   //   $(".nighttime").hide();
   // }
   // else{
   //   $(".daytime").hide();
   //   $(".nighttime").show();
   // }
   console.log(d+' '+h+' '+m+' '+s+' '+h1)
}
setInterval(GetRTime,1000); 


//入口文件切换代码 setTimeout
window.onload=function(){
   var EndTime= new Date('2015/08/8 09:59:00'); 
   //var EndTime= new Date('2015/08/5 12:24:00');//测试代码
   var NowTime = new Date();
   var t =EndTime.getTime() - NowTime.getTime();
   if(t>0){
     console.log(t);
     setTimeout(changeEtr,t);
   }
   else{
     console.log("time is over!");
     changeEtr();
   }

}
function changeEtr(){
  $('.port').hide();
}