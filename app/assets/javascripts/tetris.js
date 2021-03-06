function letBlockFall() {
  for (var i=0; i<ROWS; i++) {
    if (validateMove(currentBlock.gridX, currentBlock.gridY + 1, currentBlock.currentRotation))
      currentBlock.gridY++;
  }
}

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
}

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

  if(lineFound)
    $("#lines").text(currentLines.toString());
}

function landBlock(block) {
  var xpos = block.gridX;
  var ypos = block.gridY;
  var rotation = block.currentRotation;

  for(var row = 0, len = block.rotations[rotation].length; row < len; row++) {
    for(var col = 0, len2 = block.rotations[rotation][row].length; col < len2; col++) {
      if(block.rotations[rotation][row][col] != 0 && ypos >= 0) {
        tile = block.rotations[rotation][row][col]
        gameData[ypos][xpos] = tile;
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
}

function clearTile(coords) {
  var row = coords[0];
  var col = coords[1];

  for (var i = row; i > 0; i--) {
    gameData[i][col] = gameData[i-1][col];
  }
}

function clearTiles(array) {
  for(var i = 0; i < array.length; i++) {
    clearTile(array[i]);
  }
}

function cleanTilesArray(tilesArray) {
  //Remove duplicate coordinates
  for(var i = 0; i < tilesArray.length; i++) {
    for(var j = i + 1; j < tilesArray.length; ) {
      if(tilesArray[i][0] == tilesArray[j][0] && tilesArray[i][1] == tilesArray[j][1])
          tilesArray.splice(j, 1);
      else
        j++;
    }
  }

  //sort coordinates for removal of tiles
  CoordinateComparer = function(a, b) {
    return b[0] - a[0] ;
  }
  newTilesArray =  tilesArray.sort(CoordinateComparer).reverse();
  return newTilesArray;
}

function highlightTiles(tiles) {
  for(var i = 0; i < tiles.length; i++) {
    tile = gameData[tiles[i][0]][tiles[i][1]];
    tile.highlight = true;
  }
}

function Highlight(newTilesArray) {
  highlightTiles(newTilesArray);
  setTimeout(function(){clearTiles(newTilesArray)}, 500);
}

function makeTilesFall(tilesArray) {
  newTilesArray = cleanTilesArray(tilesArray)
  new Highlight(newTilesArray);
}

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
  updateScores('line', linePoints)
}

function advanceLevelIfNeeded() {
  if (currentLines % 10 === 0 && currentLevel < SPEEDS.length){
    currentLevel += 1;
    currentSpeed = SPEEDS[currentLevel - 1];
    $("#levels").text(currentLevel.toString());
  };
}
