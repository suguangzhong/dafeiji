"use strict";var myPlane={ele:null,fireInterval:300,init:function(){this.ele=document.createElement("div"),gameEngine.ele.appendChild(this.ele),this.ele.className="myplane",this.ele.style.left=(gameEngine.ele.clientWidth-this.ele.clientWidth)/2+"px",this.ele.style.top=gameEngine.ele.clientHeight-this.ele.clientHeight+"px";var e=document.createElement("div");return gameEngine.ele.appendChild(e),e.className="score",e.innerHTML=0,this},move:function(){this.ele.onmousedown=function(e){var n=(e=e||event).offsetX,t=e.offsetY;document.onmousemove=function(e){var i=(e=e||event).pageX-n-gameEngine.ele.offsetLeft;i<0&&(i=0),i>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth&&(i=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth);var l=e.pageY-t;l<0&&(l=0),l>gameEngine.ele.clientHeight-myPlane.ele.offsetHeight&&(l=gameEngine.ele.clientHeight-myPlane.ele.offsetHeight),myPlane.ele.style.left=i+"px",myPlane.ele.style.top=l+"px"},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}}},fire:function(){this.timer=setInterval(function(){(new Bullet).init().move()},this.fireInterval)},boom:function(e){clearInterval(this.timer);var n=["../images/me_die1.png","../images/me_die2.png","../images/me_die3.png","../images/me_die4.png"],t=0,i=setInterval(function(){t>=n.length?(clearInterval(i),gameEngine.ele.removeChild(myPlane.ele),e()):myPlane.ele.style.backgroundImage="url("+n[t++]+")"},100)}};