var ROWS = 20;
var COLS = 10;
var SIZE = 32;
var SPEEDS = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 25, 10, 5, 1];

var canvas;
var context;
var currentBlock;
var currentTime;
var isGameOver;
var lineScore;
var previousTime;
var currentLevel = 1;
var currentSpeed = SPEEDS[currentLevel-1];
var dicts;

$(window).load(function(){

	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');
	lineScore = $('#lines');
	previousTime = 0;
	currentTime = 0;
	startGame();
	$(document).keydown(function(event){
		k = event.keyCode
		if(k==32||k==37||k==38||k==39||k==40)
		getKeyCode(event);
		if(k==13)
			findWord();
	})
	// drawBoard();
	// block = getRandomBlock()
	// drawBlock(block);
	loadDictionary();
});


function startGame() {
	var row, col;
	currentLines = 0;
	isGameOver = false;
	currentLevel = 1;
	currentSpeed = SPEEDS[currentLevel - 1];
	$("#levels").text(1)

	gameData = new Array();

		for(row= 0; row < ROWS; row++) {
			gameData[row] = new Array();
			for(col = 0; col < COLS; col++) {
				// gameData[r].push(0);
				gameData[row][col] = 0;
			}
		}

	currentBlock = getRandomBlock();
	var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	window.requestAnimationFrame = requestAnimFrame;

	requestAnimationFrame(updateGame);
};

function drawTile(drawX, drawY) {
	context.strokeStyle = "#000";
  context.beginPath();
 	context.fillStyle = "#3c0";
 	context.rect(drawX * SIZE, drawY * SIZE , SIZE, SIZE);
 	context.fill();
 	context.stroke();
};

function drawLetter(drawX, drawY) {
	letterPosX = drawX * SIZE + 7;
	letterPosY = drawY * SIZE + 27;

	context.fillStyle = "#000";
 	context.font = '20pt Arial';
 	context.fillText("A", letterPosX, letterPosY, SIZE);
};

function drawNumber(drawX, drawY) {
	numberPosX = drawX * SIZE + 2;
	numberPosY = drawY * SIZE + 10;

	context.fillStyle = "#fff";
 	context.font = '6pt Arial';
 	context.fillText("1", numberPosX, numberPosY, SIZE);
};


function drawBoard() {
	// context.drawImage(bgImg, 0, 0, 320, 640, 0, 0, 320, 640);
	context.beginPath();
	context.rect(0, 0, 320, 640);
	context.fillStyle="black";
	context.fill();
	// context.beginPath();
	// context.lineWidth = "2";
	// context.strokeStyle = "yellow";
	// context.stroke();

	for(var row = 0; row < ROWS; row++) {
		for(var col = 0; col < COLS; col++) {
			if(gameData[row][col] != 0) {
				// context.drawImage(blockImg, (gameData[row][col] - 1) * SIZE, 0, SIZE, SIZE, col * SIZE, row * SIZE, SIZE, SIZE); -->
				context.beginPath();
				context.rect(col * SIZE, row * SIZE, SIZE, SIZE);
				context.fillStyle="green";
				context.fill();

			}
		}
	}
};

function drawBlock(block) {
	var drawX = block.gridX;
	var drawY = block.gridY;
	var rotation = block.currentRotation;

// drawY = 10;

	for(var row = 0, len = block.rotations[rotation].length; row < len; row++) {
		for(var col = 0, len2 = block.rotations[rotation][row].length; col < len2; col++) {
			if(block.rotations[rotation][row][col] == 1 && drawY >= 0) {
				// context.drawImage(blockImg, block.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
				// context.rect(drawX * SIZE, drawY * SIZE , SIZE, SIZE);
				// context.beginPath();
				// context.rect(drawX * SIZE, drawY * SIZE , SIZE, SIZE);
				// context.fillStyle="green";
				// context.fill();
				// context.stroke();
				// context.fillStyle ="black";
				// // context.font = 'bold 20pt Calibri';
				// context.fillText("A", 0, 0);
				// context.fillStyle="white"context.font = "18pt Arial";

				drawTile(drawX, drawY);
				drawLetter(drawX, drawY);
				drawNumber(drawX, drawY);

			}
			drawX += 1;
		}

		drawX = block.gridX;
		drawY += 1;
	}

};

function getKeyCode(e) {
	// if(!e) { var e = window.event; }
	e.preventDefault();

	if(isGameOver != true) {
		switch(e.keyCode) {
			case 32: {
				letBlockFall();
			}
			break;

			case 37: {
				if( validateMove(currentBlock.gridX - 1, currentBlock.gridY, currentBlock.currentRotation) )
					currentBlock.gridX--;
			}
			break;

			case 39: {
				if( validateMove(currentBlock.gridX + 1, currentBlock.gridY, currentBlock.currentRotation) )
					currentBlock.gridX++;
			}
			break;

			case 38: {
				var newRotation = currentBlock.currentRotation - 1;
				if(newRotation < 0)
					newRotation = currentBlock.rotations.length - 1;

				if( validateMove(currentBlock.gridX, currentBlock.gridY, newRotation) )
					currentBlock.currentRotation = newRotation;
			}
			break;

			case 40: {
				if( validateMove(currentBlock.gridX, currentBlock.gridY + 1, currentBlock.currentRotation) )
					currentBlock.gridY++;
			}
			break;
		}
	}
	else {
		startGame();
	}
};

function letBlockFall() {
	for (var i=0; i<20; i++) {
		if (validateMove(currentBlock.gridX, currentBlock.gridY + 1, currentBlock.currentRotation))
			currentBlock.gridY++;
	}
};

function validateMove(xpos, ypos, newRotation) {
	var result = true;
	var newx = xpos;
	var newy = ypos;

	for(var row = 0, length1 = currentBlock.rotations[newRotation].length; row < length1; row++) {
		for(var col = 0, length2 = currentBlock.rotations[newRotation][row].length; col < length2; col++) {
			if(newx < 0 || newx >= COLS) {
				result = false;
				col = length2;
				row = length1;
			}

			if(gameData[newy] != undefined && gameData[newy][newx] != 0
				&& currentBlock.rotations[newRotation][row] != undefined && currentBlock.rotations[newRotation][row][col] != 0) {
				result = false;
				col = length2;
				row = length1;
			}

			newx += 1;
		}

		newx = xpos;
		newy += 1;

		if(newy > ROWS) {
			row = length1;
			result = false;
		}
	}

	return result;
};

function updateGame() {
  currentTime = new Date().getTime();

  if (currentTime - previousTime > currentSpeed) {
    // drop currentBlock every half-second
    if (validateMove(currentBlock.gridX, currentBlock.gridY + 1, currentBlock.currentRotation)) {
      currentBlock.gridY += 1;
    }
    else {
      landBlock(currentBlock);
      currentBlock = getRandomBlock();
    }

    // update time
    previousTime = currentTime;
  }

  context.clearRect(0, 0, 320, 640);
  drawBoard();
  drawBlock(currentBlock);

  if (isGameOver == false) {
    requestAnimationFrame(updateGame);
  }
  else {
    context.fillText("GAME OVER", 10 , 10);
    context.fillStyle = "white";
	}
};

function checkForCompleteLines() {
	var lineFound = false;
	var fullRow = true;
	var row = ROWS - 1;
	var col = COLS - 1;

	while(row >= 0) {
		while(col >= 0) {
			if(gameData[row][col] == 0) {
				fullRow = false;
				col = -1;
			}
			col--;
		}

		if(fullRow == true) {
			console.log("fullRow == true, line 225");
			clearCompletedRow(row);

			row++;
			lineFound = true;
			currentLines++;
			advanceLevelIfNeeded();
		}
		fullRow = true;
		col = COLS - 1;
		row--;
	}
	if(lineFound) {
		$("#lines").text(currentLines.toString());
	}
};

function landBlock(block) {
	var xpos = block.gridX;
	var ypos = block.gridY;
	var rotation = block.currentRotation;

	for(var row = 0, len = block.rotations[rotation].length; row < len; row++) {
		for(var col = 0, len2 = block.rotations[rotation][row].length; col < len2; col++) {
			if(block.rotations[rotation][row][col] == 1 && ypos >= 0) {
				gameData[ypos][xpos] = (block.color + 1);
			}
			xpos += 1;
		}
		xpos = block.gridX;
		ypos += 1;
	}
	checkForCompleteLines();

	if(block.gridY < 0) {
		isGameOver = true;
	}
};

function clearCompletedRow(row) {
	var row = row;
	var col = 0;

	while(row >= 0) {
		while(col < COLS) {
			if(row > 0)
				gameData[row][col] = gameData[row-1][col];
			else
				gameData[row][col] = 0;


			col++;
		}
		col = 0;
		row --;
	}
};

function advanceLevelIfNeeded() {
	if (currentLines % 10 === 0 && currentLevel < SPEEDS.length){
		currentLevel += 1;
		currentSpeed = SPEEDS[currentLevel - 1];
		$("#levels").text(currentLevel.toString());
	};
};

function loadDictionary() {

  $.get( "/assets/dictionary.txt", function( text ) {
    dicts = text.split( "\n" );
    // for( var i = 0; i < dicts.length; i++) {
    // 	dict[dicts] = true;
    // }
  } );
};

function findWord() {
	letters = $("#boggle_letters").val();
	var currentLetters = letters.split( "" );
	if( currentLetters.length >= 2 ) {
		word = currentLetters.join("");
		if( dicts.indexOf(word)  != -1 ) {
			console.log("MATCHED!")
			return word
		}
	}
}

