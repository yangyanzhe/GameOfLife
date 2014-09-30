/*****************全局变量*********************/
var w = 20, h = 20;//单个细胞大小
var row = 25, column = 25; //一开始生成的细胞规模
var arr = new Array();
var ctx;//绘制细胞
var IntervalID;//设置循环的时钟
var speed = 300;//每秒钟更新次数
var liveRate = 100;//生存率
var pausable = false;	//如果为True,则表示暂停态
var mousedownFlag = false;

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
		case 82: ResetCells();
				break;
	}
});

document.addEventListener("keyup", function(event){
	switch(event.keyCode){
		case 39: ShowData();
				break;
		case 37: ShowData();
				break;
	}
});

document.addEventListener("mousedown", function(){
	mousedownFlag = true;
	if(!pausable){
		clearInterval(IntervalID);
		pausable = true;
	}
});

document.addEventListener("mouseup", function(){
	mousedownFlag = false;
	if(pausable){
		IntervalID = setInterval(Loop, speed);
		pausable = false;
	}
});


document.addEventListener("mousemove", function(event){
	if(mousedownFlag){
		var x = event.pageX;
		var y = event.pageY;
		ChangeStageAlive(x, y);
	}
});

document.addEventListener("click", function(event){
	var x = event.pageX;
	var y = event.pageY;
	ChangeStage(x, y);
});

/*****************操作函数*********************/
function SpeedUp(){
	speed-=10;
	if(speed < 10){
		speed = 10;
		return;	
	}

	clearInterval(IntervalID);
	IntervalID = setInterval(Loop, speed);
}

function SpeedDown(){
	speed+=10;
	if(speed > 1000){
		speed = 1000;
		return;
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
	if(!pausable){
		clearInterval(IntervalID);
	}
	IntervalID = setInterval(Loop, speed);
	pausable = false;
}

function ChangeStage(x, y){
	var canvas = $('#myCanvas')[0];
	var box = canvas.getBoundingClientRect();
	x = x - box.left * (canvas.width / box.width);
	y = y - box.top * (canvas.height / box.height); 

	var i = parseInt(x / w);
	var j = parseInt(y / h);
	if(arr[i][j].now){
		arr[i][j].now = 0;
		ctx.fillStyle = 'rgb(150, 150, 150)';
		ctx.fillRect(i*w, j*h, w-2, h-2);
	}
	else{
		arr[i][j].now = 1;
		ctx.fillStyle = 'yellow';
		ctx.fillRect(i*w, j*h, w-2, h-2);
	}
}

function ChangeStageAlive(x, y){
	var canvas = $('#myCanvas')[0];
	var box = canvas.getBoundingClientRect();
	x = x - box.left * (canvas.width / box.width);
	y = y - box.top * (canvas.height / box.height); 

	var i = parseInt(x / w);
	var j = parseInt(y / h);
	if(arr[i][j].now == 0){
		arr[i][j].now = 1;
		ctx.fillStyle = 'yellow';
		ctx.fillRect(i*w, j*h, w-2, h-2);
	}
}

function ResetCells(){
	ctx.fillStyle = 'rgb(150, 150, 150)';
	for(var i = 0; i<row; i++){
		for(var j = 0; j<column; j++){
			arr[i][j].now = 0;
			ctx.fillRect(i*w, j*h, w-2, h-2);
		}
	}
	if(!pausable){
		clearInterval(IntervalID);
		pausable = true;
	}
}

/*****************绘制说明*********************/
function DrawInstruction(){
	//draw title
	ctx.font = "35px 微软雅黑";
	
	var c = $("#myCanvas")[0].width;
	var gradient=ctx.createLinearGradient(600,30, 650, 80);
	gradient.addColorStop("1","rgb(50,50, 150)");
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
	ctx.fillText("4. 单击鼠标可以改变细胞的状态；", 600, 200);
	ctx.fillText("5. 按下鼠标左键，拖动鼠标，可以拯救细胞；", 600, 230);
	ctx.fillText("6. R：Reset,将细胞之余死亡状态，重置", 600, 260);
	ShowData();
}

function ShowData(){
	ctx.clearRect(600, 290, 700, 370);
	ctx.font = "17px 微软雅黑";
	ctx.fillStyle = "rgb(100, 100, 100)";
	ctx.fillText("周期(可调节范围10~1000)："  + speed + " ms", 600, 330);
	ctx.fillText("生存率："  + liveRate + " %", 600, 370);
}