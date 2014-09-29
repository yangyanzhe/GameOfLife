/*****************全局变量*********************/
var w = 20, h = 20;//单个细胞大小
var row = 25, column = 25; //一开始生成的细胞规模
var arr = new Array();
var ctx;//绘制细胞
var IntervalID;//设置循环的时钟
var speed = 300;//每秒钟更新次数
var liveRate = 100;//生存率
var pausable = false;	//如果为True,则表示暂停态


/*****************创建事件监听*********************/
document.addEventListener("keydown", function(event){
	switch(event.keyCode){
		case 37: SpeedDown();
				break;
		case 39: SpeedUp();
				break;
		case 32: Pause();   //blank
				break;
		case 13: Restart();	//enter
				break;
	}
});

/*****************操作函数*********************/
function SpeedUp(){
	speed-=10;
	if(speed < 10){
		speed = 10;
	}

	clearInterval(IntervalID);
	IntervalID = setInterval(Loop, speed);
}

function SpeedDown(){
	speed+=10;
	if(speed > 1000){
		speed = 1000;
	}
	clearInterval(IntervalID);
	IntervalID = setInterval(Loop, speed);
}

function Pause(){
	if(!pausable){
		clearInterval(IntervalID);
		pausable = true;
	}
	else{
		IntervalID = setInterval(Loop, speed);
		pausable = false;
	}	
}

function Restart(){
	ctx.clearRect(600, 20, 700, 350);
	CellInit();
	DrawInstruction();
	clearInterval(IntervalID);
	IntervalID = setInterval(Loop, speed);
	pausable = false;
}

/*****************绘制说明*********************/
function DrawInstruction(){
	//draw title
	ctx.font = "35px Georgid";
	
	var c = $("#myCanvas")[0].width;
	var gradient=ctx.createLinearGradient(600,30, 650, 80);
	gradient.addColorStop("1","rgb(150,150, 150)");
	gradient.addColorStop("0.5","yellow");
	gradient.addColorStop("0","rgb(150,150, 150)");
	ctx.fillStyle=gradient;
	ctx.fillText("Game of Life", 600, 30);

	//draw instruction
	ctx.font = "17px 微软雅黑";
	ctx.fillStyle = "rgb(100, 100, 100)";
	ctx.fillText("操作说明", 600, 80);
	ctx.fillText("1. 按→加速，按←减速；", 600, 110);
	ctx.fillText("2. 单击空格键暂停，再次单击开始；", 600, 140);
	ctx.fillText("3. 单击回车键重新随机生成点；", 600, 170);
	ShowData();
}

function ShowData(){
	ctx.clearRect(600, 250, 700, 350);
	ctx.font = "17px 微软雅黑";
	ctx.fillStyle = "rgb(100, 100, 100)";
	ctx.fillText("周期(可调节范围10~1000)："  + speed + " ms", 600, 280);
	ctx.fillText("生存率："  + liveRate + " %", 600, 310);
}