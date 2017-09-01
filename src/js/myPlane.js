


let myPlane = {
	
	ele: null,
	fireInterval:300,
	
	//初始化
	init:function(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "myplane";
		this.ele.style.left = (gameEngine.ele.clientWidth - this.ele.clientWidth)/2 + "px";
		this.ele.style.top = gameEngine.ele.clientHeight - this.ele.clientHeight + "px"	;
		
		//创建分数显示节点
		let myScore = document.createElement("div");
		gameEngine.ele.appendChild(myScore);
		myScore.className = "score";
		myScore.innerHTML = 0;
		
		return this;
	},
	
	//鼠标拖动飞机
	move:function(){
		
		this.ele.onmousedown = function(e){
			e = e || event;
			let disx = e.offsetX;
			let disy = e.offsetY;
			
			document.onmousemove = function(e){
				e = e || event;
				let x = e.pageX - disx - gameEngine.ele.offsetLeft;
				if(x<0) x=0;
				if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
					x=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
				}
				
				let y = e.pageY - disy;
				if(y<0) y=0;
				if(y>gameEngine.ele.clientHeight - myPlane.ele.offsetHeight){
					y=gameEngine.ele.clientHeight - myPlane.ele.offsetHeight;
				}
								
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = y + "px";
			}
			
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	
	//发射子弹
	fire:function(){
		
		this.timer = setInterval(()=>{
			let bullet = new Bullet();
			bullet.init().move();
			
		},this.fireInterval)
		
	},
	
	//爆炸
	boom:function(callback){		
		//停止发生子弹
		clearInterval(this.timer);
				
		//动画
		let dieImgs = ["../images/me_die1.png","../images/me_die2.png","../images/me_die3.png","../images/me_die4.png"];
		let i = 0;
		let dietimer = setInterval(()=>{
			
			if(i>=dieImgs.length){		 		
				clearInterval(dietimer);
				gameEngine.ele.removeChild(myPlane.ele);
				callback();
			}
			else{
				myPlane.ele.style.backgroundImage = `url(${dieImgs[i++]})`;
			}
	
		},100);
	}
}









