$(document).ready(function(){
	setInterval(Loop, 300);
});

var row, column; //一开始生成的细胞规模
var arr = new Array();

var CellInit = function(){
	for (var i = 0; i < row; i++){
		arr[i] = new Array();
		for (var j = 0; j < column; j++){
			arr[i][j] = new Object();
			if (Math.random() > 0.5)
				arr[i][j].now = 1;//细胞当前状态, 0为死亡，1为存活
			else arr[i][j].now = 0;
			arr[i][j].future = 0;//细胞新的状态
		}
	}
};

var CountAliveNum = function(i, j){
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
			if (r >= row){
				r = r - row;
			}

			//判断列是否为边界
			if (c < 0){
				c = c + column;
			}
			if (c >= column){
				c = c - column;
			}
			if (arr[r][c].now == 1){
				alliveNum += 1;
			}
		}
	}
	if (arr[i][j].now == 1){
		aliveNum -= 1;
	}

	return aliveNum;
};

var ChangeState = function(i, j){
	var aliveNum = CountAliveNum(i, j);
	switch(aliveNum){
		case 3: arr[i][j].future = 1;
				break;
		case 2: arr[i][j].future = arr[i][j].now;
				break;
		default: arr[i][j].future = 0;
	}
};

var Loop = function(){
	//$.each(arr, ChangeState);
	$.each(arr, function(){
		$.each(this, ChangeState);
	});
	/*
	$.each(arr, function(){
		$.each(this, function(){
			this.now = this.future;
		});
	});*/
	for(var i = 0; i < row; ++i){
		for(var j = 0; j < line; ++j){
			arr[i][j].now = arr[i][j].future;
		}
	}
};