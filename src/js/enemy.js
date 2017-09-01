
//敌机
class Enemy extends Base{
	
	//属性
	constructor(type){
		super();	//相当于调用父类的contructor
		
		this.type = type;
		this.hp = 1;
		this.speed = 10;
		this.dieImgs = [];
		this.score = 10;
	}
	

	//方法
	init(){
		
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//将当前敌机对象加入到数组gameEngine.allEnemys中
		gameEngine.allEnemys.push(this);
				
		switch(this.type){
			//大型飞机
			case this.Enemy_Type_Large:
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_Hp_Large;
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["../images/plane3_die1.png", "../images/plane3_die2.png", "../images/plane3_die3.png", "../images/plane3_die4.png", "../images/plane3_die5.png", "../images/plane3_die6.png"];
				this.score = 30;
				break;
			
			//中型飞机
			case this.Enemy_Type_Middle:
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_Hp_Middle;
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["../images/plane2_die1.png", "../images/plane2_die2.png", "../images/plane2_die3.png", "../images/plane2_die4.png"];
				this.score = 20;
				break;
			
			//小型飞机
			case this.Enemy_Type_Small:
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["../images/plane1_die1.png", "../images/plane1_die2.png", "../images/plane1_die3.png"];
				this.score = 10;
				break;
				
			default:
				alert("没有这种敌机");
		}
		
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		return this;
	};
	
	//移动
	move(){
		
		//let that = this;
		this.timer = setInterval(()=>{
			if(this.ele.offsetTop>gameEngine.ele.offsetHeight){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(this.ele);
				
				//将当前敌机从数组gameEngine.allEnemys中提出
				let index = gameEngine.allEnemys.indexOf(this);
				gameEngine.allEnemys.splice(index,1);
				return;
				
			}
			this.ele.style.top = this.ele.offsetTop + this.speed + "px";
		},50)

	};
	
	//掉血
	hurt(){
		this.hp--;
		
		if(this.hp==0){
			this.boom();
			gameEngine.totalScore += this.score;
			
			//创建右上角显示分数节点
			let myScore = document.createElement("div");
			gameEngine.ele.appendChild(myScore);
			myScore.className = "score";
			myScore.innerHTML = gameEngine.totalScore;
			//console.log(gameEngine.totalScore);
		}
		
	};
	
	//爆炸
	boom(){
		
		clearInterval(this.timer);
		
		//爆炸动画
		//let that = this;
		let i = 0;
		let dietimer = setInterval(()=>{
			
			if(i>=this.dieImgs.length){
				
				clearInterval(dietimer);
				gameEngine.ele.removeChild(this.ele);
				let index = gameEngine.allEnemys.indexOf(this);
				gameEngine.allEnemys.splice(index,1);
				
			}
			else{
				this.ele.style.backgroundImage = `url(${this.dieImgs[i++]})`;
			}
			
		},100)
	}
	
}


Enemy.prototype.Enemy_Type_Large = 3;//类型
Enemy.prototype.Enemy_Type_Middle = 2;
Enemy.prototype.Enemy_Type_Small = 1;
	
Enemy.prototype.Enemy_Hp_Large = 8; //血量
Enemy.prototype.Enemy_Hp_Middle = 3;
Enemy.prototype.Enemy_Hp_Small = 1;
	
Enemy.prototype.Enemy_Speed_Large = 2; //速度
Enemy.prototype.Enemy_Speed_Middle = 4;
Enemy.prototype.Enemy_Speed_Small = 6;



















