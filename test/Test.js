var w = 5, h = 5;//单个细胞大小
var row = 80, column = 80;//一开始生成的细胞规模
var arr = new Array();
var ctx;


$(document).ready(function(){
	var canvas = $('#myCanvas')[0];
	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	}

	for (var i = 0; i < row; i++){
		arr[i] = new Array();
		for (var j = 0; j < column; j++){
			arr[i][j] = new Object();
			arr[i][j].now = 0;//细胞此时状态
			arr[i][j].future = 0;//细胞下一刻状态
		}
	}

	//测试细胞样例
	//普通样例
	arr[30][30].now = 0; 
	arr[30][31].now = 1; 
	arr[30][32].now = 0; 
	arr[30][33].now = 0; 
	arr[30][34].now = 0; 
	arr[30][35].now = 0; 
	arr[30][36].now = 0; 
	arr[30][37].now = 0; 
	arr[30][38].now = 1; 
	arr[30][39].now = 1; 
	arr[30][40].now = 1; 
	arr[31][30].now = 0; 
	arr[31][31].now = 1; 
	arr[31][32].now = 0; 
	arr[31][33].now = 0; 
	arr[31][34].now = 0; 
	arr[31][35].now = 0; 
	arr[31][36].now = 0; 
	arr[31][37].now = 0; 
	arr[31][38].now = 0; 
	arr[31][39].now = 1; 
	arr[31][40].now = 0; 
	arr[32][30].now = 1; 
	arr[32][31].now = 0; 
	arr[32][32].now = 0; 
	arr[32][33].now = 1; 
	arr[32][34].now = 1; 
	arr[32][35].now = 0; 
	arr[32][36].now = 1; 
	arr[32][37].now = 1; 
	arr[32][38].now = 0; 
	arr[32][39].now = 1; 
	arr[32][40].now = 0; 
	arr[33][30].now = 0; 
	arr[33][31].now = 0; 
	arr[33][32].now = 0; 
	arr[33][33].now = 0; 
	arr[33][34].now = 0; 
	arr[33][35].now = 1; 
	arr[33][36].now = 0; 
	arr[33][37].now = 0; 
	arr[33][38].now = 1; 
	arr[33][39].now = 0; 
	arr[33][40].now = 0; 
	arr[34][30].now = 1; 
	arr[34][31].now = 0; 
	arr[34][32].now = 1; 
	arr[34][33].now = 1; 
	arr[34][34].now = 1; 
	arr[34][35].now = 0; 
	arr[34][36].now = 1; 
	arr[34][37].now = 1; 
	arr[34][38].now = 0; 
	arr[34][39].now = 1; 
	arr[34][40].now = 0; 
	arr[35][30].now = 0; 
	arr[35][31].now = 0; 
	arr[35][32].now = 1; 
	arr[35][33].now = 0; 
	arr[35][34].now = 0; 
	arr[35][35].now = 0; 
	arr[35][36].now = 0; 
	arr[35][37].now = 0; 
	arr[35][38].now = 0; 
	arr[35][39].now = 1; 
	arr[35][40].now = 0; 
	arr[36][30].now = 1; 
	arr[36][31].now = 0; 
	arr[36][32].now = 0; 
	arr[36][33].now = 0; 
	arr[36][34].now = 1; 
	arr[36][35].now = 0; 
	arr[36][36].now = 0; 
	arr[36][37].now = 1; 
	arr[36][38].now = 1; 
	arr[36][39].now = 0; 
	arr[36][40].now = 0; 
	arr[37][30].now = 0; 
	arr[37][31].now = 1; 
	arr[37][32].now = 0; 
	arr[37][33].now = 0; 
	arr[37][34].now = 1; 
	arr[37][35].now = 0; 
	arr[37][36].now = 0; 
	arr[37][37].now = 0; 
	arr[37][38].now = 1; 
	arr[37][39].now = 0; 
	arr[37][40].now = 0; 
	arr[38][30].now = 1; 
	arr[38][31].now = 0; 
	arr[38][32].now = 0; 
	arr[38][33].now = 0; 
	arr[38][34].now = 0; 
	arr[38][35].now = 0; 
	arr[38][36].now = 0; 
	arr[38][37].now = 1; 
	arr[38][38].now = 0; 
	arr[38][39].now = 0; 
	arr[38][40].now = 0; 
	arr[39][30].now = 0; 
	arr[39][31].now = 0; 
	arr[39][32].now = 1; 
	arr[39][33].now = 0; 
	arr[39][34].now = 1; 
	arr[39][35].now = 0; 
	arr[39][36].now = 1; 
	arr[39][37].now = 1; 
	arr[39][38].now = 1; 
	arr[39][39].now = 0; 
	arr[39][40].now = 1; 
	//特殊样例
	arr[5][1].now = 1;
	arr[4][2].now = 1;
	arr[6][2].now = 1;
	arr[4][3].now = 1;
	arr[6][3].now = 1;
	arr[5][4].now = 1;


	arr[9][1].now = 1;
	arr[9][2].now = 1;
	arr[10][1].now = 1;
	arr[10][2].now = 1;

	arr[15][5].now = 1;
	arr[16][4].now = 1;
	arr[16][6].now = 1;
	arr[17][3].now = 1;
	arr[17][6].now = 1;
	arr[18][4].now = 1;
	arr[18][5].now = 1;

	arr[25][1].now = 1;
	arr[25][2].now = 1;
	arr[25][3].now = 1;

	arr[1][9].now = 1;
	arr[1][10].now = 1;
	arr[2][8].now = 1;
	arr[2][10].now = 1;
	arr[3][9].now = 1;

	arr[7][10].now = 1;
	arr[7][11].now = 1;
	arr[8][9].now = 1;
	arr[8][11].now = 1;
	arr[9][10].now = 1;
	arr[9][8].now = 1;
	arr[10][9].now = 1;

	arr[15][15].now = 1;
	arr[16][14].now = 1;
	arr[16][16].now = 1;
	arr[17][13].now = 1;
	arr[17][15].now = 1;
	arr[18][12].now = 1;
	arr[18][14].now = 1;
	arr[19][13].now = 1;

	arr[0][0].now = 1;
	arr[79][0].now = 1;
	arr[0][79].now = 1;
	arr[79][79].now = 1;

	arr[0][50].now = 1;
	arr[79][50].now = 1;
	arr[78][50].now = 1;

	arr[30][0].now = 1;
	arr[31][0].now = 1;
	arr[30][79].now = 1;
	arr[32][79].now = 1;
	arr[31][78].now = 1;


	for(var i = 0; i < row; ++i){
		for(var j = 0; j < column; ++j){
			DrawCell(i, j);
		}
	}
});

function CellInit(){
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

function DrawCell(i, j){
	if (arr[i][j].now == 1){
		ctx.fillStyle = "yellow";
		ctx.fillRect(i*w, j*h, w, h);
	}
	else{
		ctx.fillStyle = 'black';
		ctx.fillRect(i*w, j*h, w - 1, h- 1);
	} 
	
};


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
				aliveNum += 1;
			}
		}
	}
	if (arr[i][j].now == 1){
		aliveNum -= 1;
	}

	return aliveNum;
};

function ChangeState(i, j){
	var aliveNum = CountAliveNum(i, j);
	switch(aliveNum){
		case 3: arr[i][j].future = 1;
				break;
		case 2: arr[i][j].future = arr[i][j].now;
				break;
		default: arr[i][j].future = 0;
	}
	return arr[i][j].future;
};

function Loop(){
	for(var i = 0; i < row; ++i){
		for(var j = 0; j < column; ++j){
			ChangeState(i, j);
		}
	}
	/*
	$.each(arr, function(){
		$.each(this, function(){
			this.now = this.future;
		});
	});*/
	for(var i = 0; i < row; ++i){
		for(var j = 0; j < column; ++j){
			arr[i][j].now = arr[i][j].future;
			DrawCell(i, j);
		}
	}
};



		/*	ctx.beginPath();
			for (var i = 0; i <= row; i++) {
				ctx.moveTo(i*w, 0);
				ctx.lineTo(i*w, column*h);
			};
			
			for (var i = 0; i <= column; i++) {
				ctx.moveTo(0, i*h);
				ctx.lineTo(row*w, i*h);
			};
			ctx.lineWidth = 1.0;
			ctx.strokeStyle = '#000000';
			ctx.stroke();*/




module('模块A(CountAliveNum):检测单个细胞附近八格的存活数目');
test( "测试图例1", function() {
	equal(CountAliveNum(0,0), 3, "(0, 0) = 3; Passed!");
	equal(CountAliveNum(0,1), 2, "(0, 1) = 2; Passed!");
	equal(CountAliveNum(78,0), 2, "(78, 0) = 2; Passed!");
	equal(CountAliveNum(79,79), 3, "(79, 79) = 3; Passed!");
});

test( "测试图例2", function() {
	equal(CountAliveNum(5,0), 1, "(5, 0) = 1; Passed!");
	equal(CountAliveNum(5,3), 5, "(5, 3) = 5; Passed!");
	equal(CountAliveNum(4,4), 2, "(4, 4) = 2; Passed!");
});

test( "测试图例3", function() {
	equal(CountAliveNum(9,0), 2, "(9, 0) = 2; Passed!");
	equal(CountAliveNum(9,2), 3, "(9, 2) = 3; Passed!");
	equal(CountAliveNum(11,0), 1, "(11, 0) = 1; Passed!");
});

test( "测试图例4", function() {
	equal(CountAliveNum(17,3), 2, "(17, 3) = 2; Passed!");
	equal(CountAliveNum(17,4), 4, "(17, 4) = 4; Passed!");
	equal(CountAliveNum(17,5), 5, "(17, 5) = 5; Passed!");
});

test( "测试图例5", function() {
	equal(CountAliveNum(24,2), 3, "(24, 2) = 3; Passed!");
	equal(CountAliveNum(25,2), 2, "(25, 2) = 2; Passed!");
	equal(CountAliveNum(26,2), 3, "(26, 2) = 3; Passed!");
	equal(CountAliveNum(25,1), 1, "(25, 1) = 1; Passed!");
	equal(CountAliveNum(25,3), 1, "(25, 3) = 1; Passed!");
});

test( "测试图例6", function() {
	equal(CountAliveNum(30,0), 2, "(30, 0) = 2; Passed!");
	equal(CountAliveNum(30,79), 3, "(30, 79) = 3; Passed!");
	equal(CountAliveNum(31,79), 5, "(31, 79) = 5; Passed!");
});

test( "测试图例7", function() {
	equal(CountAliveNum(0,10), 2, "(0, 10) = 2; Passed!");
	equal(CountAliveNum(1,9), 3, "(1, 9) = 3; Passed!");
	equal(CountAliveNum(2,9), 5, "(2, 9) = 5; Passed!");
});

test( "测试图例8", function() {
	equal(CountAliveNum(7,11), 2, "(7, 11) = 2; Passed!");
	equal(CountAliveNum(7,10), 3, "(7, 10) = 3; Passed!");
	equal(CountAliveNum(8,10), 5, "(8, 10) = 5; Passed!");
	equal(CountAliveNum(9,10), 3, "(9, 10) = 3; Passed!");
});

test( "测试图例9", function() {
	equal(CountAliveNum(15,15), 2, "(15, 15) = 2; Passed!");
	equal(CountAliveNum(16,15), 4, "(16, 15) = 4; Passed!");
	equal(CountAliveNum(17,15), 3, "(17, 15) = 3; Passed!");
	equal(CountAliveNum(18,15), 2, "(18, 15) = 2; Passed!");
	equal(CountAliveNum(19,15), 1, "(19, 15) = 1; Passed!");
});

test( "测试图例10", function() {
	equal(CountAliveNum(0,50), 1, "(0, 50) = 1; Passed!");
	equal(CountAliveNum(0,51), 2, "(0, 51) = 2; Passed!");
	equal(CountAliveNum(79,50), 2, "(79, 50) = 2; Passed!");
	equal(CountAliveNum(79,51), 3, "(79, 51) = 3; Passed!");
	equal(CountAliveNum(78,50), 1, "(78, 50) = 1; Passed!");
	equal(CountAliveNum(78,51), 2, "(78, 51) = 2; Passed!");
});


test( "随机生成图例", function() {
  equal(CountAliveNum(30,30), 2, "(30, 30) = 2; Passed!");
  equal(CountAliveNum(30,31), 1, "(30, 31) = 1; Passed!");
  equal(CountAliveNum(35,33), 5, "(35, 33) = 5; Passed!");
  equal(CountAliveNum(36,34), 1, "(36, 34) = 1; Passed!");
  equal(CountAliveNum(36,38), 3, "(36, 34) = 3; Passed!");
  equal(CountAliveNum(39,40), 0, "(39, 40) = 0; Passed!");
  equal(CountAliveNum(40,40), 1, "(40, 40) = 1; Passed!");
});


module('模块B(ChangeState):检测单个细胞下一刻的生存状态');
test( "测试图例1", function() {
	equal(ChangeState(0,0), 1, "(0, 0) = 1; Passed!");
	equal(ChangeState(0,1), 0, "(0, 1) = 0; Passed!");
	equal(ChangeState(78,0), 0, "(78, 0) = 0; Passed!");
	equal(ChangeState(79,79), 1, "(79, 79) = 1; Passed!");
});

test( "测试图例2", function() {
	equal(ChangeState(5,0), 0, "(5, 0) = 0; Passed!");
	equal(ChangeState(5,3), 0, "(5, 3) = 0; Passed!");
	equal(ChangeState(4,4), 0, "(4, 4) = 0; Passed!");
});

test( "测试图例3", function() {
	equal(ChangeState(9,0), 0, "(9, 0) = 0; Passed!");
	equal(ChangeState(9,2), 1, "(9, 2) = 1; Passed!");
	equal(ChangeState(11,0), 0, "(11, 0) = 0; Passed!");
});

test( "测试图例4", function() {
	equal(ChangeState(17,3), 1, "(17, 3) = 1; Passed!");
	equal(ChangeState(17,4), 0, "(17, 4) = 0; Passed!");
	equal(ChangeState(17,5), 0, "(17, 5) = 0; Passed!");
});

test( "测试图例5", function() {
	equal(ChangeState(24,2), 1, "(24, 2) = 1; Passed!");
	equal(ChangeState(25,2), 1, "(25, 2) = 1; Passed!");
	equal(ChangeState(26,2), 1, "(26, 2) = 1; Passed!");
	equal(ChangeState(25,1), 0, "(25, 1) = 0; Passed!");
	equal(ChangeState(25,3), 0, "(25, 3) = 0; Passed!");
});

test( "测试图例6", function() {
	equal(ChangeState(30,0), 1, "(30, 0) = 1; Passed!");
	equal(ChangeState(30,79), 1, "(30, 79) = 1; Passed!");
	equal(ChangeState(31,79), 0, "(31, 79) = 0; Passed!");
});

test( "测试图例7", function() {
	equal(ChangeState(0,10), 0, "(0, 10) = 0; Passed!");
	equal(ChangeState(1,9), 1, "(1, 9) = 1; Passed!");
	equal(ChangeState(2,9), 0, "(2, 9) = 0; Passed!");
});

test( "测试图例8", function() {
	equal(ChangeState(7,11), 1, "(7, 11) = 1; Passed!");
	equal(ChangeState(7,10), 1, "(7, 10) = 1; Passed!");
	equal(ChangeState(8,10), 0, "(8, 10) = 0; Passed!");
	equal(ChangeState(9,10), 1, "(9, 10) = 1; Passed!");
});

test( "测试图例9", function() {
	equal(ChangeState(15,15), 1, "(15, 15) = 1; Passed!");
	equal(ChangeState(16,15), 0, "(16, 15) = 0; Passed!");
	equal(ChangeState(17,15), 1, "(17, 15) = 1; Passed!");
	equal(ChangeState(18,15), 0, "(18, 15) = 0; Passed!");
	equal(ChangeState(19,15), 0, "(19, 15) = 0; Passed!");
});

test( "测试图例10", function() {
	equal(ChangeState(0,50), 0, "(0, 50) = 0; Passed!");
	equal(ChangeState(0,51), 0, "(0, 51) = 0; Passed!");
	equal(ChangeState(79,50), 1, "(79, 50) = 1; Passed!");
	equal(ChangeState(79,51), 1, "(79, 51) = 1; Passed!");
	equal(ChangeState(78,50), 0, "(78, 50) = 0; Passed!");
	equal(ChangeState(78,51), 0, "(78, 51) = 0; Passed!");
});


test( "随机生成图例", function() {
	equal(ChangeState(30,30), 0, "(30, 30) = 0; Passed!");
	equal(ChangeState(30,31), 0, "(30, 31) = 0; Passed!");
	equal(ChangeState(35,33), 0, "(35, 33) = 0; Passed!");
	equal(ChangeState(36,34), 0, "(36, 34) = 0; Passed!");
	equal(ChangeState(36,38), 1, "(36, 34) = 1; Passed!");
	equal(ChangeState(39,40), 0, "(39, 40) = 0; Passed!");
	equal(ChangeState(40,40), 0, "(40, 40) = 0; Passed!");
});