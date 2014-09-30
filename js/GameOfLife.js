/*****************初始化*********************/
$(document).ready(function(){
	var canvas = $('#myCanvas')[0];
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	}
	CellInit();
	DrawInstruction();
	IntervalID = setInterval(Loop, speed);
});

function CellInit(){
	for (var i = 0; i < row; i++){
		arr[i] = new Array();
		for (var j = 0; j < column; j++){
			arr[i][j] = new Object();
			if (Math.random() > 0.5)
				arr[i][j].now = 1;//细胞当前状态, 0为死亡，1为存活
			else{
				arr[i][j].now = 0;
			} 
			arr[i][j].future = 0;//细胞新的状态
		}
	}
}

/*****************逻辑函数*********************/
function CountAliveNum(i, j){
	var r, c;
	var aliveNum = 0;
	for (var m = 0; m < 3; m++){
		for (var n = 0; n < 3; n++){
			r = i - 1 + m;
			c = j - 1 + n;
			//判断是否在边界
			//判断行是否为边界
			if (r < 0){
				r = r + row;
			}
			else if (r >= row){
				r = r - row;
			}

			//判断列是否为边界
			if (c < 0){
				c = c + column;
			}
			else if (c >= column){
				c = c - column;
			}
			if (arr[r][c].now == 1){
				aliveNum += 1;
			}
		}
	}
	if (arr[i][j].now == 1){
		aliveNum -= 1;
	}

	return aliveNum;
}

//判断下一时刻状态
function JudgeState(i, j){
	var aliveNum = CountAliveNum(i, j);
	switch(aliveNum){
		case 3: arr[i][j].future = 1;
				break;
		case 2: arr[i][j].future = arr[i][j].now;
				break;
		default: arr[i][j].future = 0;
	}
}

function Loop(){
	//遍历更改判断下一时刻状态
	for(var i = 0; i < row; ++i){
		for(var j = 0; j < column; ++j){
			JudgeState(i, j);
		}
	}

	//更改状态
	for(var i = 0; i < row; ++i){
		for(var j = 0; j < column; ++j){
			arr[i][j].now = arr[i][j].future;
			DrawCell(i, j);
		}
	}

	//计算存活率并显示在窗口中
	var liveNumberTotal = 0;
	$.each(arr, function(){
		$.each(this, function(){
			if(this.now){
				liveNumberTotal++;
			}
		});
	});
	liveRate = liveNumberTotal * 100 / (row * column);
	ShowData();
}

/*****************绘制函数*********************/
function DrawCell(i, j){
	if (arr[i][j].now == 1){
		ctx.fillStyle = "yellow";
	}
	else{
		ctx.fillStyle = 'rgb(150, 150, 150)';
	} 
	//ctx.shadowColor = 'rgb(200, 200, 200)';
	ctx.fillRect(i*w, j*h, w-2, h-2);
}


