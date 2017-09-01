

class Bullet extends Base{
	//属性
	constructor(){
		super(); //写了contructor就必须用super()调用父类的contructor
	}
		
	//方法
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//把创建的子弹对象放进数组gameEngine.allBullets中
		gameEngine.allBullets.push(this);
		
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + 2 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	};
	
	//移动
	move(){
		
		//let that = this;
		this.timer = setInterval(()=>{
			
			if(this.ele.offsetTop<-this.ele.offsetHeight){
				clearInterval(this.timer);
				gameEngine.ele.removeChild(this.ele);
				
				//将当前子弹从数组中移除
				let index = gameEngine.allBullets.indexOf(this);
				gameEngine.allBullets.splice(index,1);
				
				return;
			}
			
			this.ele.style.top = this.ele.offsetTop - 10 + "px";
			
		},30)
	
	};
	
	
	//爆炸
	boom(){
		
		clearInterval(this.timer);
		this.ele.className = "bullet-die";
		
		//动画
		//let that = this;
		const dieImgs = ["../images/die1.png","../images/die2.png"];
		let i = 0;
		let dietimer = setInterval(()=>{
			
			if(i>=1){
				clearInterval(dietimer);
				gameEngine.ele.removeChild(this.ele);
			}
			else{
				this.ele.style.backgroundImage = `url(${dieImgs[++i]})`;
			}
		},100)
		
	}
}









