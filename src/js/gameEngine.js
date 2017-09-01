



let gameEngine = {
	
	ele:null,
	allBullets:[],   //页面上当前存在的所有子弹
	allEnemys:[],	//页面上当前存在的所有敌机
	totalScore:0,	//总分，默认为0
	
	init:function(){
		this.ele = document.getElementById("main");
		return this;		
	},
	
	start:function(){
		console.log("游戏开始");		
		
		this.loading(function(){
			
			//创建飞机并可以拖拽
			myPlane.init().move();
			
			//发射子弹
			myPlane.fire();
			
			//监听键盘
			gameEngine.listenKeyword();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//背景图移动
			gameEngine.backgroundMove();
			
			//碰撞检测
			gameEngine.crash();
			
		});	
	},
	
	//加载游戏
	loading:function(callback){
		
		let logo = document.createElement("div");
		gameEngine.ele.appendChild(logo);
		logo.className = "logo";
		
		let load = document.createElement("div");
		gameEngine.ele.appendChild(load);
		load.className = "load";
		
		let imgs = ["../images/loading1.png","../images/loading2.png","../images/loading3.png"];
		let i = 0;
		let timer = setInterval(function(){
			
			if(i>=5){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);				
				if(callback) callback();
			}
			else{
				load.style.backgroundImage = `url(${imgs[++i%3]})`;
			}
		},500);
		
	},
	
	//监听键盘
	listenKeyword:function(){
		let xspeed = 0;
		let yspeed = 0;
		
		window.onkeydown = function(e){
			e = e || event;
			
			if(e.keyCode == 37){	//左
				xspeed = -10;
			}
			if(e.keyCode == 38){	//上
				yspeed = -10;
			}
			if(e.keyCode == 39){	//右
				xspeed = 10;
			}
			if(e.keyCode == 40){	//下
				yspeed = 10;				
			}
		}
		window.onkeyup = function(e){
			e = e || event;
			if(e.keyCode == 37 || e.keyCode == 39){	//松开左右键
				xspeed = 0;
			}else if(e.keyCode == 38 || e.keyCode == 40){ //松开上下键
				yspeed = 0;
			}
		}
		
		setInterval(()=>{
			let x = myPlane.ele.offsetLeft + xspeed;
			if(x<0) x=0;
			if(x>gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
				x=gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
			}
			
			let y = myPlane.ele.offsetTop + yspeed;
			if(y<0) y=0;
			if(y>gameEngine.ele.clientHeight - myPlane.ele.offsetHeight ){
				y=gameEngine.ele.clientHeight - myPlane.ele.offsetHeight;
			}

			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = y + "px";
		},30)

	},
	
	//创建敌机
	createEnemy:function(){
		
		//创建大型飞机
		setInterval(()=>{
			let flag = Math.random()>0.6 ? true : false;
			if(flag){
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		},6000)
		
		//创建中型飞机
		setInterval(()=>{
			let flag = Math.random()>0.5 ? true : false;
			if(flag){
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}
		},2000)
		
		//创建小型飞机
		setInterval(()=>{
			let flag = Math.random()>0.4 ? true : false;
			if(flag){
				let enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		},1000)
	},

	//背景图移动
	backgroundMove:function(){
		let y = 0;
		setInterval(()=>{
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		},30)
	},


	//碰撞检测
	crash:function(){
		
		let timer = setInterval(()=>{
			
			for(let i=0; i<gameEngine.allEnemys.length; i++){	//遍历所有敌机    (如果先遍历子弹,会出现错误)
				for(let j=0; j<gameEngine.allBullets.length; j++){	//遍历所有子弹
														
					//判断子弹和敌机是否发生碰撞
					if(isCrash(gameEngine.allBullets[j].ele,gameEngine.allEnemys[i].ele)){
						
						//让子弹爆炸并消失
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice(j,1);
						
						//敌机血量检测
						gameEngine.allEnemys[i].hurt();												
					}					
				}
				
				//判断敌机和我是否发生爆炸
				if(isCrash(gameEngine.allEnemys[i].ele,myPlane.ele)){					
					clearInterval(timer);		//
					myPlane.boom(()=>{
						
						let myName = prompt("请输入您的名字,您的分数为:"+gameEngine.totalScore,"老王吧");
						
						ajax({
							type:"post",
							url:"http://60.205.181.47/myPHPCode4/uploadScore.php",
							data:{name:myName,score:gameEngine.totalScore},
							success:function(data){
								//console.log(data);
								location.href = "../html/02_rand.html";
							}
						})
						
					});
				
				}				
			}	
		},30)
		
	}


	
}









