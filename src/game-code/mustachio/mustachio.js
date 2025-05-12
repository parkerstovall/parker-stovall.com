/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols
// 

var speed = 1.5
var sprint = false
var gravity = 0.12
var speedY = 0
var isJumping = true
var isOnObstacle = false
var numJumps = 0

var left = false
var right = false
var blockedDirHor = 'none'
var blockedDirVert = 'none'

// var playWid = 40;
// var playHei = 40;
var maxHeight = 120
var minHeight = 40
var obstacleSize = playHei * 2
var bulletSize = 60
var stagePieces = []
var myObstacles = []
var myItemBlocks = []
var myEnemies = []
var myItems = []
var floor

var mouseX = 0
var mouseY = 0
var fireFrame = 0

var timerID = 0
var growID = 0
var shrinkID = 0
var changeID = 0
var cannonID = 0
var killPlayerID = 0
var changeTrack = 0
var stacheSeedID = 0
var fallID = 0
var goHomeID = 0
var enemyID = 0
var slingID = 0
var flushID = 0
var startDeathRayID = 0
var highSubText = []
var values = []
var uiPieces = []
var hasVisitedCaveOne = false
var hasVisitedCaveTwo = false

var mustachio
var numCoins = 0
var score = 0
var levelTimerCount = 0
var levelTimerID = 0
var currentLevel = 'none'
var hardMode = false
var doorX = 0
var gameStarted = false

window.onload = setFunction

function setFunction() {
  document.getElementById('playButton').addEventListener('click', function (e) {
    hardMode = document.getElementById('hard').checked

    if (!gameStarted) {
      myGameArea.start()
      gameStarted = true
    }
    mustachio = new makePlayer(playHei, playWid, 'Images/Mustachio.png')
    myGameArea.stop()
    startGame('levelOne')
    levelTimerCount = 200
    score = 0
  })
}

function startGame(dest) {
  currentLevel = dest
  mustachio.x = myGameArea.canvas.width / 4
  if (!mustachio.big) {
    playHei = minHeight
    playWid = minHeight
  }

  clearLevel()
  switch (dest) {
    case 'testLevel':
      testLevel(0, minHeight * 15)
      break
    case 'testLevel2':
      testLevel(0, minHeight * 5)
      break
    case 'levelOne':
      makeLevelOne(0, 641)
      break
    case 'levelOne2':
      makeLevelOne(5090, 641)
      break
    case 'levelOne3':
      makeLevelOne(12780, 425)
      break
    case 'levelOneCave':
      makeLevelOneCave(0, minHeight * 5)
      break
    case 'levelOneCave2':
      makeLevelOneCave2(0, minHeight * 5)
      break
    case 'testCave':
      testCave(0, minHeight * 5)
      break
  }
  clearInterval(levelTimerID)
  levelTimerID = setInterval(countdown, 1000)
  myGameArea.restartGame()
  destroyLaser()
}

function clearLevel() {
  clearInterval(timerID)
  clearInterval(enemyID)
  clearInterval(changeID)
  clearInterval(slingID)
  clearInterval(cannonID)
  clearInterval(killPlayerID)
  clearInterval(levelTimerID)
  killPlayerID = 0
  deathDown = false
  frameHoldCount = 0
  started = false
  deathSpeedY = -5
  left = false
  right = false
  myObstacles = []
  myItemBlocks = []
  myEnemies = []
  myItems = []
  stagePieces = []
}

function makeLevelOne(mustachioX, mustachioY) {
  enemyID = setInterval(changeImage, 250)
  slingID = setInterval(sling, 1500)
  cannonID = setInterval(cannonFire, 3000)
  startDeathRayID = setInterval(startDeathRay, 5)
  uiPieces = []
  //timer
  uiPieces.push(new timerBox())

  //score
  uiPieces.push(new scoreBox())

  //obviously, the floor
  floor = new component(
    0,
    myGameArea.canvas.height - minHeight,
    myGameArea.canvas.width * 2,
    'ground',
    'black',
    'none',
  )
  floor.isTop = true

  var floor2 = new component(
    floor.x + floor.width + obstacleSize * 5,
    myGameArea.canvas.height - minHeight,
    myGameArea.canvas.width * 1.5,
    'ground',
    'black',
    'none',
  )
  floor2.isTop = true

  //barrier for beginning of level
  myObstacles.push(
    new component(0, -500, obstacleSize, 'wall', 'black', 'none'),
  )

  //barrier for end of level
  myObstacles.push(
    new component(
      myGameArea.canvas.width * 20,
      -500,
      obstacleSize,
      'wall',
      'black',
      'none',
    ),
  )

  //Level Design
  //Type of Obstacles: floor, brick, itemBlock, hiddenBlock, cannon, ground, wall
  //Component Parameters Order: (x, y, width, type, color, itemType, dir, isTop)
  //Enemy Parameters Order: (x, y, type, color)

  //lets see if this works.
  for (i = 0; i < 6; i++) {
    stagePieces.push(
      new standingCoin(100, myGameArea.canvas.height - (i + 2) * 100),
    )
  }

  if (hardMode) {
    myEnemies.push(
      new enemy(
        myGameArea.canvas.width / 2,
        obstacleSize * 2,
        'stacheSlinger',
        'black',
      ),
    )
  }

  var tempX = 300
  myItemBlocks.push(
    new component(
      tempX,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'itemBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 1,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'brick',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 2,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'hiddenBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 2,
      floor.y - obstacleSize * 6,
      obstacleSize,
      'hiddenBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 3,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'brick',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 4,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'itemBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )

  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < i + 1; j++) {
      myObstacles.push(
        new component(
          1000 + obstacleSize * i,
          floor.y - obstacleSize * (j + 1),
          obstacleSize,
          'floor',
          'black',
          'none',
          'none',
        ),
      )
      if (j == i) {
        myObstacles[myObstacles.length - 1].isTop = true
      }
    }
  }
  var obx = myObstacles[myObstacles.length - 1].x
  for (var i = 6; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      myObstacles.push(
        new component(
          obx + obstacleSize * Math.abs(i - 7),
          floor.y - obstacleSize * (j + 1),
          obstacleSize,
          'floor',
          'black',
          'none',
          'none',
        ),
      )
      if (j == i - 1) {
        myObstacles[myObstacles.length - 1].isTop = true
      }
    }
  }

  //markers for floor gap
  myObstacles.push(
    new component(
      floor.x + floor.width - obstacleSize,
      floor.y - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x,
      floor.y - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  //let the analraping begin
  myEnemies.push(
    new enemy(
      floor.x + floor.width - obstacleSize * 7,
      floor.y - obstacleSize - 5,
      'stacheStalker',
      'black',
    ),
  )
  myEnemies.push(
    new enemy(
      floor.x + floor.width - obstacleSize * 6,
      floor.y - obstacleSize - 5,
      'stacheStalker',
      'black',
    ),
  )
  myEnemies[myEnemies.length - 1].speed *= -1

  if (hardMode) {
    myEnemies.push(
      new enemy(
        floor.x + floor.width - obstacleSize * 6,
        0,
        'stacheStreaker',
        'black',
      ),
    )
  }

  /*
	
	END OF FLOOR SEGMENT ONE
	
	*/

  myItemBlocks.push(
    new component(
      floor2.x + obstacleSize * 5,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'hiddenBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      floor2.x + obstacleSize * 5,
      floor.y - obstacleSize * 6,
      obstacleSize,
      'itemBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )

  tempX = floor2.x + obstacleSize * 10
  for (i = 0; i < 7; i++) {
    if (i == 0 || i == 6) {
      myItemBlocks.push(
        new component(
          tempX + obstacleSize * i,
          floor.y - obstacleSize * 5,
          obstacleSize,
          'brick',
          'black',
          'coin',
          'none',
          false,
        ),
      )
    } else {
      myItemBlocks.push(
        new component(
          tempX + obstacleSize * i,
          floor.y - obstacleSize * 5,
          obstacleSize,
          'brick',
          'black',
          'coin',
          'none',
          true,
        ),
      )
    }
  }

  myItemBlocks.push(
    new component(
      tempX,
      floor.y - obstacleSize * 4,
      obstacleSize,
      'brick',
      'black',
      'coin',
      'none',
    ),
  )
  myItemBlocks.push(
    new component(
      tempX,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'brick',
      'black',
      'coin',
      'none',
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 6,
      floor.y - obstacleSize * 4,
      obstacleSize,
      'brick',
      'black',
      'coin',
      'none',
    ),
  )
  myItemBlocks.push(
    new component(
      tempX + obstacleSize * 6,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'brick',
      'black',
      'coin',
      'none',
    ),
  )

  for (i = 0; i < 7; i++) {
    if (i == 0 || i == 6) {
      myItemBlocks.push(
        new component(
          tempX + obstacleSize * i,
          floor.y - obstacleSize * 2,
          obstacleSize,
          'brick',
          'black',
          'coin',
          'none',
          false,
        ),
      )
    } else {
      myItemBlocks.push(
        new component(
          tempX + obstacleSize * i,
          floor.y - obstacleSize * 2,
          obstacleSize,
          'brick',
          'black',
          'coin',
          'none',
          true,
        ),
      )
    }
  }

  var coinWidth = obstacleSize / 2
  for (j = 3; j < 5; j++) {
    for (i = 1; i < 6; i++) {
      stagePieces.push(
        new standingCoin(
          tempX + (obstacleSize * i + coinWidth / 2),
          floor.y - obstacleSize * j + coinWidth / 2,
        ),
      )
    }
  }

  if (hardMode) {
    myEnemies.push(
      new enemy(
        tempX + obstacleSize * 2,
        floor.y - obstacleSize * 3,
        'stacheStalker',
        'black',
      ),
    )
    myEnemies.push(
      new enemy(
        tempX + obstacleSize * 4,
        floor.y - obstacleSize * 3,
        'stacheStalker',
        'black',
      ),
    )
  }

  myObstacles.push(
    new component(
      floor2.x + floor2.width,
      floor.y - obstacleSize,
      obstacleSize * 2,
      'pipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  if (!hasVisitedCaveOne) {
    myObstacles.push(
      new component(
        floor2.x + floor2.width + obstacleSize * 5,
        obstacleSize * 2.5,
        obstacleSize * 2,
        'warppipe',
        'green',
        'levelOneCave',
        obstacleSize * 1.5,
        true,
      ),
    )
  } else {
    myObstacles.push(
      new component(
        floor2.x + floor2.width + obstacleSize * 5,
        obstacleSize * 2.5,
        obstacleSize * 2,
        'pipe',
        'green',
        'levelOneCave',
        obstacleSize * 1.5,
        true,
      ),
    )
  }
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 5,
      obstacleSize * 4,
      obstacleSize,
      'floor',
      'green',
      'none',
      0,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 6,
      obstacleSize * 4,
      obstacleSize,
      'floor',
      'green',
      'none',
      0,
      true,
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize / 4,
      floor.y - obstacleSize,
      'stacheSeed',
      'up',
    ),
  )
  if (hardMode) {
    myEnemies.push(
      new enemy(
        floor2.x + floor2.width + obstacleSize * 5 + obstacleSize / 4,
        obstacleSize * 2.5,
        'stacheSeed',
        'up',
      ),
    )
  }

  for (i = 0; i < 20; i++) {
    myObstacles.push(
      new component(
        floor2.x + floor2.width + obstacleSize * (2 + i),
        myGameArea.canvas.height - obstacleSize,
        obstacleSize,
        'floor',
        'black',
        'none',
        'none',
        true,
      ),
    )
  }

  obx = floor2.x + floor2.width + obstacleSize * 12
  myObstacles.push(
    new component(
      obx,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 2,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 2,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 4,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 4,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 4,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 5,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )

  //ENTER THE CANNONS
  myObstacles.push(
    new component(
      obx,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 2,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 4,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )

  if (hardMode) {
    myEnemies.push(
      new enemy(
        obx + obstacleSize * 5,
        obstacleSize * 2,
        'stacheSlinger',
        'black',
      ),
    )
  }

  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 22,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 23,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 24,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 25,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 26,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 29,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 32,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 35,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 38,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 41,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 44,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 47,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 50,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 53,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 56,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      floor2.x + floor2.width + obstacleSize * 59,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )

  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 26 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 29 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 32 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 35 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 38 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 41 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 44 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 47 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 50 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 53 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 56 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )
  myEnemies.push(
    new enemy(
      floor2.x + floor2.width + obstacleSize * 59 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheSeed',
      'down',
    ),
  )

  var type = 'floor'
  if (hardMode) {
    type = 'fallingFloor'
  }

  for (i = 26; i < 61; i++) {
    myObstacles.push(
      new component(
        floor2.x + floor2.width + obstacleSize * i,
        myGameArea.canvas.height - obstacleSize,
        obstacleSize,
        type,
        'black',
        'none',
        'none',
        true,
      ),
    )
  }

  /*
	
	END OF FLOOR SEGMENT 2
	
	*/

  obx = myObstacles[myObstacles.length - 1].x + obstacleSize
  for (i = 0; i < 3; i++) {
    myObstacles.push(
      new component(
        obx + obstacleSize * i,
        myGameArea.canvas.height - obstacleSize,
        obstacleSize,
        'floor',
        'black',
        'none',
        'none',
        true,
      ),
    )
  }

  myItemBlocks.push(
    new component(
      obx,
      floor.y - obstacleSize * 9,
      obstacleSize,
      'itemBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'leftdownupright',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'leftdownright',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'rightleftawW',
      true,
    ),
  )

  if (hardMode) {
    myEnemies.push(
      new enemy(obx + obstacleSize * 5, 0, 'stacheStreaker', 'black'),
    )
    //myEnemies.push(new enemy(obx + obstacleSize * 5, obstacleSize * 2, "stacheSlinger", "black"));
  }

  stagePieces.push(
    new standingCoin(
      obx + obstacleSize * 5,
      myGameArea.canvas.height - obstacleSize * 3.75,
    ),
  )
  stagePieces.push(
    new standingCoin(
      obx + obstacleSize * 5,
      myGameArea.canvas.height - obstacleSize * 2.75,
    ),
  )
  stagePieces.push(
    new standingCoin(
      obx + obstacleSize * 5,
      myGameArea.canvas.height - obstacleSize * 1.75,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 5 - obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 8,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 10,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 9,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 10,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 11,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'up',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 12,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 11,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 13,
      myGameArea.canvas.height - obstacleSize * 9,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 12,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 10,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'right',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 12,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 10,
      myGameArea.canvas.height - obstacleSize * 9,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'right',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 16,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 15,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 14,
      myGameArea.canvas.height - obstacleSize,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 10,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 3,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      false,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 9,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 17,
      myGameArea.canvas.height - obstacleSize * 11,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  obx += obstacleSize * 14
  myObstacles.push(
    new component(
      obx,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 2,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myEnemies.push(
    new enemy(
      obx + obstacleSize,
      myGameArea.canvas.height - obstacleSize * 9,
      'stacheStalker',
      'black',
    ),
  )

  myObstacles.push(
    new component(
      obx,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 2,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myEnemies.push(
    new enemy(
      obx + obstacleSize,
      myGameArea.canvas.height - obstacleSize * 7,
      'stacheStalker',
      'black',
    ),
  )
  myEnemies[myEnemies.length - 1].speed *= -1

  myObstacles.push(
    new component(
      obx,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 2,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myEnemies.push(
    new enemy(
      obx + obstacleSize * 0.3,
      myGameArea.canvas.height - obstacleSize * 5,
      'stacheStalker',
      'black',
    ),
  )
  myEnemies[myEnemies.length - 1].speed *= 1.2

  for (var i = 0; i < 7; i++) {
    if (hardMode || i % 2 == 0) {
      myObstacles.push(
        new component(
          obx + obstacleSize * 4,
          myGameArea.canvas.height - obstacleSize * (10 - i),
          obstacleSize,
          'cannon',
          'white',
          'none',
          'right',
          true,
        ),
      )
    }
  }

  for (var i = 0; i < 4; i++) {
    myObstacles.push(
      new component(
        obx + obstacleSize * (4 + i),
        myGameArea.canvas.height - obstacleSize,
        obstacleSize,
        'floor',
        'black',
        'none',
        'none',
        true,
      ),
    )
  }

  obx = myObstacles[myObstacles.length - 1].x
  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 6,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      obx + obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 9,
      obstacleSize,
      'hiddenBlock',
      'black',
      'fireStache',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 9,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  if (!hasVisitedCaveTwo) {
    myObstacles.push(
      new component(
        obx + obstacleSize * 14,
        myGameArea.canvas.height - obstacleSize * 2,
        obstacleSize * 2,
        'warppipe',
        'green',
        'levelOneCave2',
        1,
        true,
      ),
    )
  } else {
    myObstacles.push(
      new component(
        obx + obstacleSize * 14,
        myGameArea.canvas.height - obstacleSize * 2,
        obstacleSize * 2,
        'pipe',
        'green',
        'levelOneCave2',
        1,
        true,
      ),
    )
  }
  myEnemies.push(
    new enemy(
      obx + obstacleSize * 14 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 2,
      'stacheSeed',
      'up',
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 14,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myEnemies.push(
    new enemy(
      obx + obstacleSize * 14 + obstacleSize / 4,
      myGameArea.canvas.height - obstacleSize * 7,
      'stacheSeed',
      'down',
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 19,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 20,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 23,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 24,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 27,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 28,
      myGameArea.canvas.height - obstacleSize * 2,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 31,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 32,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'fallingFloor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx + obstacleSize * 35,
      myGameArea.canvas.height - obstacleSize * 6,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obx + obstacleSize * 38,
      myGameArea.canvas.height - obstacleSize * 8,
      obstacleSize,
      'floor',
      'black',
      'none',
      'none',
      true,
    ),
  )

  obx += obstacleSize * 40
  for (var i = 0; i < 9; i++) {
    if (i != 8) {
      myObstacles.push(
        new component(
          obx,
          myGameArea.canvas.height - obstacleSize * (9 - i),
          obstacleSize,
          type,
          'black',
          'none',
          'none',
          true,
        ),
      )
    }
    obx += obstacleSize
  }

  if (hardMode) {
    myEnemies.push(new enemy(obx, 0, 'stacheStreaker', 'black'))
    myEnemies.push(new enemy(obx, obstacleSize * 2, 'stacheSlinger', 'black'))
    myEnemies.push(
      new enemy(
        obx + obstacleSize * 2,
        obstacleSize * 2,
        'stacheSlinger',
        'black',
      ),
    )
    myEnemies[myEnemies.length - 1].speed *= -1
  }
  for (var i = 0; i < 9; i++) {
    if (i != 1) {
      myObstacles.push(
        new component(
          obx,
          myGameArea.canvas.height - obstacleSize * i,
          obstacleSize,
          type,
          'black',
          'none',
          'none',
          true,
        ),
      )
    }
    obx += obstacleSize
  }

  /*
	
	END OF FLOOR SEGMENT THREE
	
	*/

  if (hardMode) {
    myObstacles.push(
      new component(
        obx + obstacleSize * 4,
        myGameArea.canvas.height - obstacleSize * 11,
        obstacleSize,
        type,
        'black',
        'none',
        'none',
        true,
      ),
    )
  } else {
    myObstacles.push(
      new component(
        obx + obstacleSize * 4,
        myGameArea.canvas.height - obstacleSize * 9,
        obstacleSize,
        type,
        'black',
        'none',
        'none',
        true,
      ),
    )
  }

  for (i = 0; i < 10; i++) {
    myObstacles.push(
      new component(
        obx,
        myGameArea.canvas.height - obstacleSize * 2,
        obstacleSize,
        type,
        'black',
        'none',
        'none',
        true,
      ),
    )
    obx += obstacleSize
  }

  /*
	
	Let them have a win
	
	*/

  myItemBlocks.push(
    new component(
      obx - obstacleSize * 3,
      myGameArea.canvas.height - obstacleSize * 5,
      obstacleSize,
      'hiddenBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )

  myObstacles.push(
    new component(
      obx,
      obstacleSize,
      obstacleSize / 5,
      'flag',
      'blue',
      'none',
      'none',
      true,
    ),
  )

  for (i = 0; i < 20; i++, obx += obstacleSize) {
    myObstacles.push(
      new component(
        obx,
        myGameArea.canvas.height - obstacleSize * 2,
        obstacleSize,
        'floor',
        'black',
        'none',
        'none',
        true,
      ),
    )
  }

  stagePieces.push(
    new component(
      obx - obstacleSize * 13.75,
      myGameArea.canvas.height - obstacleSize * 7,
      obstacleSize * 5,
      'home',
      'black',
      'none',
      'none',
      false,
    ),
  )
  doorX =
    stagePieces[stagePieces.length - 1].x +
    stagePieces[stagePieces.length - 1].width / 3
  doorX += 30

  //Adding level to visible stage
  for (i in myEnemies) {
    myEnemies[i].index = parseInt(i)
    stagePieces.push(myEnemies[i])
  }

  for (i in myItemBlocks) {
    stagePieces.push(myItemBlocks[i])
    myItemBlocks[i].index = parseInt(i)
  }

  for (i in myObstacles) {
    stagePieces.push(myObstacles[i])
  }

  for (i in myObstacles) {
    if (myObstacles[i].type == 'fireBarBlock') {
      myObstacles[i].createFireBar()
    }
  }

  stagePieces.push(floor)
  stagePieces.push(floor2)

  for (i in stagePieces) {
    stagePieces[i].x -= mustachioX
    if (
      stagePieces[i].type == 'stacheSlinger' ||
      stagePieces[i].type == 'stacheStreaker'
    ) {
      stagePieces[i].maxX -= mustachioX
      stagePieces[i].minX -= mustachioX
    }
  }

  doorX -= mustachioX
  mustachio.y = mustachioY
}

function makeLevelOneCave(mustachioX, mustachioY) {
  hasVisitedCaveOne = true
  enemyID = setInterval(changeImage, 250)
  slingID = setInterval(sling, 1500)
  clearInterval(startDeathRayID)
  //cannonID = setInterval(cannonFire, 5000);
  uiPieces = []
  //timer
  uiPieces.push(new timerBox())

  //score
  uiPieces.push(new scoreBox())

  floor = new component(
    0,
    myGameArea.canvas.height - minHeight,
    myGameArea.canvas.width * 20,
    'ground',
    'black',
    'none',
    'none',
    true,
  )

  //barrier for beginning of level
  myObstacles.push(
    new component(0, -1000, obstacleSize, 'wall', 'black', 'none'),
  )

  //barrier for end of level
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize,
      0,
      obstacleSize,
      'wall',
      'black',
      'none',
    ),
  )

  //2 mushroom blocks
  myItemBlocks.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'itemBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 6,
      obstacleSize,
      'hiddenBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 9,
      obstacleSize,
      'hiddenBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      myObstacles[1].x - obstacleSize,
      floor.y - obstacleSize * 5,
      obstacleSize,
      'hiddenBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )

  //fire blocks
  /*myObstacles.push(new component(obstacleSize * 9, floor.y - obstacleSize * 4, obstacleSize, "fireBarBlock", "red", "none", "right"));
	myObstacles.push(new component(obstacleSize * 12, floor.y - obstacleSize * 4, obstacleSize, "fireBarBlock", "red", "none", "down"));
	myObstacles.push(new component(obstacleSize * 12, floor.y - obstacleSize * 1, obstacleSize, "fireBarBlock", "red", "none", "left"));
	myObstacles.push(new component(obstacleSize * 9, floor.y - obstacleSize * 1, obstacleSize, "fireBarBlock", "red", "none", "up"));*/

  //fuck it lets do a pipe (heck you cole)
  myObstacles.push(
    new component(
      myGameArea.canvas.width / 4 - obstacleSize * 0.75,
      minHeight * 4,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      myObstacles[1].x - obstacleSize * 3,
      floor.y - obstacleSize,
      obstacleSize * 2,
      'warppipe',
      'green',
      'levelOne2',
      1,
      true,
    ),
  )

  //aaaaand a shit ton of coins
  for (i = 0; i < 5; i++) {
    for (j = 0; j < 11; j++) {
      stagePieces.push(
        new standingCoin(obstacleSize * (j + 2.5), floor.y - obstacleSize * i),
      )
    }
  }

  for (i in myEnemies) {
    stagePieces.push(myEnemies[i])
    myEnemies[i].index = i
  }

  for (i in myItemBlocks) {
    stagePieces.push(myItemBlocks[i])
    myItemBlocks[i].index = i
  }

  for (i in myObstacles) {
    stagePieces.push(myObstacles[i])
  }

  for (i in myObstacles) {
    if (myObstacles[i].type == 'fireBarBlock') {
      myObstacles[i].createFireBar()
    }
  }

  stagePieces.push(floor)

  for (i in stagePieces) {
    stagePieces[i].x += mustachioX
  }

  mustachio.y = mustachioY
}

function makeLevelOneCave2(mustachioX, mustachioY) {
  hasVisitedCaveTwo = true
  clearInterval(startDeathRayID)
  startDeathRayID = setInterval(startDeathRay, 5)
  enemyID = setInterval(changeImage, 250)
  slingID = setInterval(sling, 1500)
  cannonID = setInterval(cannonFire, 5000)
  startDeathRayID = setTimeout(startDeathRay, 5000)

  uiPieces = []
  //timer
  uiPieces.push(new timerBox())

  //score
  uiPieces.push(new scoreBox())

  floor = new component(
    0,
    myGameArea.canvas.height - minHeight,
    myGameArea.canvas.width * 20,
    'ground',
    'black',
    'none',
    'none',
    true,
  )

  //barrier for beginning of level
  myObstacles.push(
    new component(0, -1000, obstacleSize, 'wall', 'black', 'none'),
  )

  //barrier for end of level
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize,
      0,
      obstacleSize,
      'wall',
      'black',
      'none',
    ),
  )

  //blocks
  myItemBlocks.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'itemBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 6,
      obstacleSize,
      'hiddenBlock',
      'black',
      'coin',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 9,
      obstacleSize,
      'hiddenBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )
  myItemBlocks.push(
    new component(
      myObstacles[1].x - obstacleSize,
      floor.y - obstacleSize * 5,
      obstacleSize,
      'hiddenBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )

  //fire blocks
  myObstacles.push(
    new component(
      obstacleSize * 13,
      floor.y - obstacleSize * 2,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'right',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize * 16,
      floor.y - obstacleSize * 2,
      obstacleSize,
      'fireBarBlock',
      'red',
      'none',
      'left',
      true,
    ),
  )

  //fuck it lets do a pipe (heck you cole)
  myObstacles.push(
    new component(
      myGameArea.canvas.width / 4 - obstacleSize * 0.75,
      minHeight * 4,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize * 14,
      floor.y - obstacleSize,
      obstacleSize * 2,
      'warppipe',
      'green',
      'levelOne3',
      1,
      true,
    ),
  )

  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize * 1,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize * 1,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize * 1,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      0,
      myGameArea.canvas.height - obstacleSize * 4,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'right',
      true,
    ),
  )

  myEnemies.push(
    new enemy(myGameArea.canvas.width / 2, 0, 'stacheStreaker', 'black'),
  )
  //aaaaand a shit ton of coins
  for (i = 2; i < 5; i++) {
    for (j = 0; j < 11; j++) {
      stagePieces.push(
        new standingCoin(obstacleSize * (j + 2.5), floor.y - obstacleSize * i),
      )
    }
  }

  myEnemies.push(
    new enemy(
      myGameArea.canvas.width / 3,
      obstacleSize * 10,
      'stacheStalker',
      'black',
    ),
  )
  myEnemies.push(
    new enemy(
      (myGameArea.canvas.width / 3) * 2,
      obstacleSize * 10,
      'stacheStalker',
      'black',
    ),
  )
  myEnemies[myEnemies.length - 1].speed *= -1
  myEnemies.push(
    new enemy(
      (myGameArea.canvas.width / 2) * 1.25,
      obstacleSize * 10,
      'stacheStalker',
      'black',
    ),
  )
  for (i in myEnemies) {
    stagePieces.push(myEnemies[i])
    myEnemies[i].index = i
  }

  for (i in myItemBlocks) {
    stagePieces.push(myItemBlocks[i])
    myItemBlocks[i].index = i
  }

  for (i in myObstacles) {
    stagePieces.push(myObstacles[i])
  }

  for (i in myObstacles) {
    if (myObstacles[i].type == 'fireBarBlock') {
      myObstacles[i].createFireBar()
    }
  }

  stagePieces.push(floor)

  for (i in stagePieces) {
    stagePieces[i].x += mustachioX
  }

  mustachio.y = mustachioY
}

function testLevel(mustachioX, mustachioY) {
  enemyID = setInterval(changeImage, 250)
  slingID = setInterval(sling, 1500)
  cannonID = setInterval(cannonFire, 5000)
  floor = new component(
    0,
    myGameArea.canvas.height - minHeight,
    myGameArea.canvas.width * 20,
    'ground',
    'black',
    'none',
  )
  floor.isTop = true

  //barrier for beginning of level
  myObstacles.push(new component(0, 0, obstacleSize, 'wall', 'black', 'none'))

  //barrier for end of level
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize,
      0,
      obstacleSize,
      'wall',
      'black',
      'none',
    ),
  )

  //Testing items go here

  //cannons
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize * 2,
      floor.y - obstacleSize * 2,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'left',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize,
      floor.y - obstacleSize * 2,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'right',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize * 8,
      floor.y - obstacleSize,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'up',
      true,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize * 7,
      0,
      obstacleSize,
      'cannon',
      'white',
      'none',
      'down',
      true,
    ),
  )

  //2 mushroom blocks
  myItemBlocks.push(
    new component(
      obstacleSize * 3,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'itemBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )
  //myItemBlocks.push(new component((obstacleSize * 6), floor.y - obstacleSize * 3, obstacleSize, "itemBlock", "black", "mustacheroom"));

  //fire blocks
  /*myObstacles.push(new component(obstacleSize * 9, floor.y - obstacleSize * 4, obstacleSize, "fireBarBlock", "red", "none", "right"));
	myObstacles.push(new component(obstacleSize * 12, floor.y - obstacleSize * 4, obstacleSize, "fireBarBlock", "red", "none", "down"));
	myObstacles.push(new component(obstacleSize * 12, floor.y - obstacleSize * 1, obstacleSize, "fireBarBlock", "red", "none", "left"));
	myObstacles.push(new component(obstacleSize * 9, floor.y - obstacleSize * 1, obstacleSize, "fireBarBlock", "red", "none", "up"));*/

  //fuck it lets do a pipe (heck you cole)
  myObstacles.push(
    new component(
      myGameArea.canvas.width / 4 - obstacleSize * 0.75,
      minHeight * 4,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      false,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize * 9,
      floor.y - obstacleSize * 4,
      obstacleSize * 2,
      'warppipe',
      'green',
      'testCave',
      1,
      true,
    ),
  )
  //End stage test

  for (i in myEnemies) {
    stagePieces.push(myEnemies[i])
    myEnemies[i].index = i
  }

  for (i in myItemBlocks) {
    stagePieces.push(myItemBlocks[i])
    myItemBlocks[i].index = i
  }

  for (i in myObstacles) {
    stagePieces.push(myObstacles[i])
  }

  for (i in myObstacles) {
    if (myObstacles[i].type == 'fireBarBlock') {
      myObstacles[i].createFireBar()
    }
  }

  stagePieces.push(floor)

  for (i in stagePieces) {
    stagePieces[i].x += mustachioX
  }

  mustachio.y = mustachioY
}

function testCave(mustachioX, mustachioY) {
  enemyID = setInterval(changeImage, 250)
  slingID = setInterval(sling, 1500)
  //cannonID = setInterval(cannonFire, 5000);
  floor = new component(
    0,
    myGameArea.canvas.height - minHeight,
    myGameArea.canvas.width * 20,
    'ground',
    'black',
    'none',
    'none',
    true,
  )

  //barrier for beginning of level
  myObstacles.push(new component(0, 0, obstacleSize, 'wall', 'black', 'none'))

  //barrier for end of level
  myObstacles.push(
    new component(
      myGameArea.canvas.width - obstacleSize,
      0,
      obstacleSize,
      'wall',
      'black',
      'none',
    ),
  )

  //Testing items go here

  //cannon
  //myObstacles.push(new component(myGameArea.canvas.width - obstacleSize * 2, myGameArea.canvas.height - (obstacleSize + 2 + (minHeight * 2)), obstacleSize, "cannon", "white", "none"));

  //2 mushroom blocks
  myItemBlocks.push(
    new component(
      obstacleSize * 3,
      floor.y - obstacleSize * 3,
      obstacleSize,
      'itemBlock',
      'black',
      'mustacheroom',
      'none',
      true,
    ),
  )
  //myItemBlocks.push(new component((obstacleSize * 6), floor.y - obstacleSize * 3, obstacleSize, "itemBlock", "black", "mustacheroom"));

  //fire blocks
  /*myObstacles.push(new component(obstacleSize * 9, floor.y - obstacleSize * 4, obstacleSize, "fireBarBlock", "red", "none", "right"));
	myObstacles.push(new component(obstacleSize * 12, floor.y - obstacleSize * 4, obstacleSize, "fireBarBlock", "red", "none", "down"));
	myObstacles.push(new component(obstacleSize * 12, floor.y - obstacleSize * 1, obstacleSize, "fireBarBlock", "red", "none", "left"));
	myObstacles.push(new component(obstacleSize * 9, floor.y - obstacleSize * 1, obstacleSize, "fireBarBlock", "red", "none", "up"));*/

  //fuck it lets do a pipe (heck you cole)
  myObstacles.push(
    new component(
      myGameArea.canvas.width / 4 - obstacleSize * 0.75,
      minHeight * 4,
      obstacleSize * 2,
      'exitpipe',
      'green',
      'none',
      1,
      true,
    ),
  )
  myObstacles.push(
    new component(
      obstacleSize * 9,
      floor.y - obstacleSize * 4,
      obstacleSize * 2,
      'warppipe',
      'green',
      'testLevel2',
      1,
      true,
    ),
  )
  myEnemies.push(
    new enemy(
      obstacleSize * 9 + obstacleSize / 4,
      floor.y - obstacleSize * 4,
      'stacheSeed',
      'up',
    ),
  )
  myEnemies.push(
    new enemy(
      myGameArea.canvas.width / 4 - obstacleSize * 0.75 + obstacleSize / 4,
      minHeight * 4 - obstacleSize * 2,
      'stacheSeed',
      'down',
    ),
  )
  //myEnemies.push(new enemy(obstacleSize * 9 + ((obstacleSize) / 4), floor.y - obstacleSize * 4, "stacheSeed", "black"));
  //End stage test

  for (i in myEnemies) {
    stagePieces.push(myEnemies[i])
    myEnemies[i].index = i
  }

  for (i in myItemBlocks) {
    stagePieces.push(myItemBlocks[i])
    myItemBlocks[i].index = i
  }

  for (i in myObstacles) {
    stagePieces.push(myObstacles[i])
  }

  for (i in myObstacles) {
    if (myObstacles[i].type == 'fireBarBlock') {
      myObstacles[i].createFireBar()
    }
  }

  stagePieces.push(floor)

  for (i in stagePieces) {
    stagePieces[i].x += mustachioX
  }

  mustachio.y = mustachioY
}

var myGameArea = {
  canvas: document.getElementById('game-layer'),
  ui: document.getElementById('ui-layer'),

  restartGame: function () {
    this.frameNo = 0
    timerID = setInterval(updateGameArea, 5)
  },
  start: function () {
    this.canvas.width = 1426
    this.canvas.height = 810
    this.ui.width = 1426
    this.ui.height = 810

    this.context = this.canvas.getContext('2d')
    this.uiCon = this.ui.getContext('2d')

    window.addEventListener('keydown', function (e) {
      keyPress(e)
    })

    window.addEventListener('keyup', function (e) {
      keyUnpress(e)
    })
  },
  clear: function () {
    this.uiCon.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop: function () {
    clearInterval(timerID)
    clearInterval(enemyID)
    clearInterval(changeID)
    clearInterval(slingID)
    clearInterval(cannonID)
    clearInterval(killPlayerID)
    clearInterval(levelTimerID)
    clearInterval(startDeathRayID)
    killPlayerID = 0
    deathDown = false
    frameHoldCount = 0
    started = false
    deathSpeedY = -5
    left = false
    right = false
    mustachio.dir = 'none'
    myObstacles = []
    myItemBlocks = []
    myEnemies = []
    myItems = []
    values = []
    highSubText = []
  },
}

function updateGameArea() {
  myGameArea.clear()
  if (blockedDirHor != 'none') {
    speed = 0
  } else {
    if (sprint) {
      speed = 3
    } else {
      speed = 1.5
    }
  }

  for (i in myItems) {
    myItems[i].newPos()
  }
  for (i in myEnemies) {
    myEnemies[i].newPos()
  }

  if (left && blockedDirHor != 'right') {
    doorX += speed
  }

  if (right && blockedDirHor != 'left') {
    doorX -= speed
  }
  for (i in stagePieces) {
    if (left && blockedDirHor != 'right') {
      stagePieces[i].x += speed
      if (stagePieces[i].type == 'stacheSlinger') {
        stagePieces[i].maxX += speed
        stagePieces[i].minX += speed
      }
      if (stagePieces[i].type == 'stacheStreaker') {
        if (
          stagePieces[i].isGettingReady ||
          stagePieces[i].isGettingReady ||
          stagePieces[i].type == 'laser'
        ) {
          stagePieces[i].targetX += speed
        }
        stagePieces[i].maxX += speed
        stagePieces[i].minX += speed
      }
    }
    if (right && blockedDirHor != 'left') {
      stagePieces[i].x -= speed
      if (stagePieces[i].type == 'stacheSlinger') {
        stagePieces[i].maxX -= speed
        stagePieces[i].minX -= speed
      }
      if (stagePieces[i].type == 'stacheStreaker') {
        if (
          stagePieces[i].isGettingReady ||
          stagePieces[i].isGettingReady ||
          stagePieces[i].type == 'laser'
        ) {
          stagePieces[i].targetX -= speed
        }
        stagePieces[i].maxX -= speed
        stagePieces[i].minX -= speed
      }
    }
    if (
      stagePieces[i].x + stagePieces[i].width > 0 &&
      stagePieces[i].x <= myGameArea.canvas.width
    ) {
      stagePieces[i].update()
    }
    if (stagePieces[i].getPos || stagePieces[i].falling) {
      stagePieces[i].newPos()
    }
  }

  for (i in uiPieces) {
    uiPieces[i].update()
  }
  mustachio.newPos()
  mustachio.update()
  myGameArea.frameNo++
}

function component(x, y, width, type, color, itemType, dir, isTop) {
  this.getPos = false
  this.isTop = isTop
  this.punched = false
  this.closedDoor = false
  this.itemType = itemType
  this.index = -1000
  this.x = x
  this.y = y
  this.width = width
  this.color = color
  this.type = type
  this.imageBlock = new Image()
  this.closedDoorImage = new Image()
  this.closedDoorImage.src = 'Images/homesteadClosed.png'
  this.height = obstacleSize
  this.isImg = false
  this.dir = dir
  this.falling = false
  this.holdFrame = 0
  this.speedY = 1
  switch (this.type) {
    case 'floor':
      this.imageBlock.src = 'Images/obstacleBrick.png'
      this.isImg = true
      break
    case 'brick':
      this.imageBlock.src = 'Images/brick.png'
      this.isImg = true
      break
    case 'itemBlock':
      this.imageBlock.src = 'Images/itemBlock.png'
      this.isImg = true
      break
    case 'cannon':
      this.height = obstacleSize * 0.85
      switch (dir) {
        case 'left':
          this.imageBlock.src = 'Images/cannonLeft.png'
          break
        case 'right':
          this.imageBlock.src = 'Images/cannonRight.png'
          break
        case 'up':
          this.imageBlock.src = 'Images/cannonUp.png'
          break
        case 'down':
          this.imageBlock.src = 'Images/cannonDown.png'
          break
      }
      this.isImg = true
      break
    case 'ground':
      this.height = myGameArea.canvas.width - playHei * 2
      break
    case 'wall':
      this.height = floor.y - this.y
      break
    case 'pipe':
      if (dir == 1) {
        this.height = myGameArea.canvas.height - this.y
      } else {
        this.height = dir
      }
      break
    case 'warppipe':
      if (dir == 1) {
        this.height = myGameArea.canvas.height - this.y
      } else {
        this.height = dir
      }
      break
    case 'exitpipe':
      this.height = this.y
      this.y = 0
      break
    case 'fallingFloor':
      this.imageBlock.src = 'Images/fallingFloor.png'
      this.isImg = true
      break
    case 'flag':
      this.height = myGameArea.canvas.height - obstacleSize * 3
      break
    case 'home':
      this.height = obstacleSize * 5
      this.isImg = true
      this.imageBlock.src = 'Images/homestead.png'
  }

  this.update = function () {
    ctx = myGameArea.context
    if (this.isImg || this.type == 'itemBlock') {
      if (this.closedDoor) {
        ctx.drawImage(
          this.closedDoorImage,
          this.x,
          this.y,
          this.width,
          this.height,
        )
        return
      }
      ctx.drawImage(this.imageBlock, this.x, this.y, this.width, this.height)
      return
    } else {
      ctx.fillStyle = color
    }
    if (this.type == 'hiddenBlock') {
      ctx.globalAlpha = 0.0
    }
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.globalAlpha = 1.0
  }

  this.createFireBar = function () {
    if (this.dir.includes('left')) {
      stagePieces.push(new fireBar(this.x, this.y, 'left'))
    }
    if (this.dir.includes('right')) {
      stagePieces.push(new fireBar(this.x, this.y, 'right'))
    }
    if (this.dir.includes('up')) {
      stagePieces.push(new fireBar(this.x, this.y, 'up'))
    }
    if (this.dir.includes('down')) {
      stagePieces.push(new fireBar(this.x, this.y, 'down'))
    }
  }

  this.newPos = function () {
    if (this.type == 'fallingFloor') {
      if (this.holdFrame == 0) {
        this.holdFrame = myGameArea.frameNo + 40
      } else if (myGameArea.frameNo <= this.holdFrame) {
        return
      } else {
        this.y += this.speedY
        this.speedY += gravity
      }

      if (this.y >= myGameArea.canvas.height) {
        var i = myObstacles.indexOf(this)
        var x = stagePieces.indexOf(this)
        myObstacles.splice(i, 1)
        stagePieces.splice(x, 1)
      }
    }
  }
}

// function timerBox() {
//   this.update = function () {
//     ctx = myGameArea.uiCon
//     ctx.font = '40px Arial'
//     ctx.fillStyle = 'white'
//     var timerText = 'TIME: ' + levelTimerCount
//     ctx.fillText(timerText, 40, 40)
//   }
// }

// function scoreBox() {
//   this.update = function () {
//     ctx = myGameArea.uiCon
//     ctx.font = '40px Arial'
//     ctx.fillStyle = 'white'
//     var scoreText = 'SCORE: ' + score + '   '
//     ctx.fillText(
//       scoreText,
//       myGameArea.ui.width - ctx.measureText(scoreText).width,
//       40,
//     )
//   }
// }

// function countdown() {
//   levelTimerCount--
//   if (levelTimerCount <= 0) {
//     mustachio.fire = false
//     mustachio.big = false
//     killMethod()
//   }
// }

function fireBar(x, y, dir) {
  this.getPos = true
  this.height = obstacleSize / 3
  this.width = obstacleSize / 3
  this.y = y + obstacleSize / 3
  this.x = x + obstacleSize / 3
  this.type = 'fireBar'
  this.dir = dir
  this.speed = 1

  this.update = function () {
    ctx = myGameArea.context
    ctx.fillStyle = 'darkred'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  this.newPos = function () {
    if (this.dir == 'left') {
      this.width += this.speed
      this.x -= this.speed
      if (this.width >= obstacleSize * 3 && this.speed > -1) {
        this.speed *= -1
      }
      if (this.width <= obstacleSize / 3 && this.speed < 1) {
        this.speed *= -1
      }
    }
    if (this.dir == 'up') {
      this.height += this.speed
      this.y -= this.speed
      if (this.height >= obstacleSize * 3 && this.speed > -1) {
        this.speed *= -1
      }
      if (this.height <= obstacleSize / 3 && this.speed < 1) {
        this.speed *= -1
      }
    }
    if (this.dir == 'right') {
      this.width += this.speed
      if (this.width >= obstacleSize * 3 && this.speed > -1) {
        this.speed *= -1
      }
      if (this.width <= obstacleSize / 3 && this.speed < 1) {
        this.speed *= -1
      }
    }
    if (this.dir == 'down') {
      this.height += this.speed
      if (this.height >= obstacleSize * 3 && this.speed > -1) {
        this.speed *= -1
      }
      if (this.height <= obstacleSize / 3 && this.speed < 1) {
        this.speed *= -1
      }
    }
  }
}

// function makePlayer(height, width, src) {
//   this.x = myGameArea.canvas.width / 4;
//   this.y = myGameArea.canvas.height - playHei * 3;
//   this.height = height;
//   this.width = width;
//   this.fire = false;
//   this.dir = "down";
//   this.beingHit = false;
//   this.big = false;
//   this.onPipe = false;
//   this.warpDest = "none";
//   this.warpPipe = null;

//   this.imageStraight = new Image();
//   this.imageStraight.src = "Images/Mustachio.png";

//   this.imageLeft = new Image();
//   this.imageLeft.src = "Images/Mustachio_FacingLeft.png";

//   this.imageRight = new Image();
//   this.imageRight.src = "Images/Mustachio_FacingRight.png";

//   this.imageStraightFire = new Image();
//   this.imageStraightFire.src = "Images/Mustachio_Fire.png";

//   this.imageLeftFire = new Image();
//   this.imageLeftFire.src = "Images/Mustachio_FacingLeft_Fire.png";

//   this.imageRightFire = new Image();
//   this.imageRightFire.src = "Images/Mustachio_FacingRight_Fire.png";

//   this.update = function () {
//     ctx = myGameArea.context;
//     if (!this.fire) {
//       if (this.dir == "left") {
//         ctx.drawImage(this.imageLeft, this.x, this.y, playWid, playHei);
//       } else if (this.dir == "right") {
//         ctx.drawImage(this.imageRight, this.x, this.y, playWid, playHei);
//       } else {
//         ctx.drawImage(this.imageStraight, this.x, this.y, playWid, playHei);
//       }
//     } else {
//       if (this.dir == "left") {
//         ctx.drawImage(this.imageLeftFire, this.x, this.y, playWid, playHei);
//       } else if (this.dir == "right") {
//         ctx.drawImage(this.imageRightFire, this.x, this.y, playWid, playHei);
//       } else {
//         ctx.drawImage(this.imageStraightFire, this.x, this.y, playWid, playHei);
//       }
//     }
//   };
//   this.newPos = function () {
//     blockedDirHor = "none";
//     blockedDirVert = "none";
//     this.onPipe = false;
//     for (i in stagePieces) {
//       if (
//         stagePieces[i].x + stagePieces[i].width < 0 ||
//         stagePieces[i].x > myGameArea.canvas.width
//       ) {
//         continue;
//       }
//       if (collisionDetection(stagePieces[i], -1, "mustachio")) {
//         if (stagePieces[i].type == "flag") {
//           win();
//           return;
//         }
//         if (stagePieces[i].type == "standingCoin") {
//           stagePieces.splice(i, 1);
//           numCoins++;
//           score += 100;
//           return;
//         }
//         for (j in myEnemies) {
//           if (
//             stagePieces[i] == myEnemies[j] &&
//             stagePieces[i].index == myEnemies[j].index
//           ) {
//             if (
//               this.y + playHei - 10 <= stagePieces[i].y &&
//               !myEnemies[j].dead &&
//               myEnemies[j].type != "stacheSeed"
//             ) {
//               enemyHit(j);
//               if (myEnemies[j].type == "stacheStalker") {
//                 score += 1000;
//               } else if (myEnemies[j].type == "stacheSlinger") {
//                 score += 2000;
//               } else if (myEnemies[j].type == "stacheShot") {
//                 score += 500;
//               }
//               return;
//             } else if (!myEnemies[j].dead && !myEnemies[j].inPipe) {
//               if (myEnemies[j].type != "stacheSeed") {
//                 stagePieces.splice(i, 1);
//                 myEnemies.splice(j, 1);
//                 for (k = j; k < myEnemies.length; k++) {
//                   myEnemies[k].index--;
//                 }
//               } else {
//                 this.big = false;
//                 this.fire = false;
//               }
//               killMethod();
//               return;
//             }
//           }
//         }
//         if (
//           (stagePieces[i].type == "laser" ||
//             stagePieces[i].type == "fireBar") &&
//           !this.beingHit
//         ) {
//           killMethod();
//           this.beingHit = true;
//           this.blockedDirVert = "none";
//           return;
//         }
//         for (j in myItems) {
//           if (
//             stagePieces[i] == myItems[j] &&
//             stagePieces[i].index == myItems[j].index
//           ) {
//             stagePieces.splice(i, 1);
//             if (myItems[j].type == "mustacheroom") {
//               score += 1000;
//               if (!this.big) {
//                 clearInterval(growID);
//                 this.big = true;
//                 growID = setInterval(grow, 115);
//               }
//               for (k in myItems) {
//                 if (k > j) {
//                   myItems[k].index -= 1;
//                 }
//               }
//               myItems.splice(j, 1);
//               for (k in myItems) {
//                 if (k > j) {
//                   myItems[k].index -= 1;
//                 }
//               }
//             } else if (myItems[j].type == "fireStache") {
//               score += 2000;
//               if (!this.fire) {
//                 changeTrack = 0;
//                 changeID = setInterval(change, 115);
//                 clearInterval(shrinkID);
//                 clearInterval(growID);
//                 this.big = true;
//                 growID = setInterval(grow, 115);
//               }
//               myItems.splice(j, 1);
//               for (k in myItems) {
//                 if (k > j) {
//                   myItems[k].index -= 1;
//                 }
//               }
//             }
//             return;
//           }
//         }

//         var temp = false;
//         if (myEnemies.includes(stagePieces[i])) {
//           temp = true;
//         }

//         if (
//           stagePieces[i].y >= this.y &&
//           speedY >= 0 &&
//           (stagePieces[i].isTop || temp)
//         ) {
//           blockedDirVert = "obstacle";
//           if (stagePieces[i].type == "fallingFloor") {
//             stagePieces[i].falling = true;
//           }
//           if (stagePieces[i].type == "warppipe") {
//             this.warpDest = stagePieces[i].itemType;
//             this.onPipe = true;
//             this.warpPipe = stagePieces[i];
//           }
//           this.y = stagePieces[i].y - playHei + 1;
//           numJumps = 0;
//           speedY = 0;
//         } else if (
//           stagePieces[i].y + stagePieces[i].height - 10 <= this.y &&
//           stagePieces[i].type != "wall"
//         ) {
//           if (this.x + playWid < stagePieces[i].x + 2) {
//             continue;
//           }
//           if (this.x > stagePieces[i].x + stagePieces[i].width - 2) {
//             continue;
//           }
//           speedY = 1;
//           if (
//             (stagePieces[i].type == "itemBlock" ||
//               stagePieces[i].type == "hiddenBlock") &&
//             !stagePieces[i].punched
//           ) {
//             if (stagePieces[i].type == "hiddenBlock") {
//               stagePieces[i].type = "itemBlock";
//             }
//             stagePieces[i].imageBlock.src = "Images/punchedBlock.png";
//             stagePieces[i].punched = true;
//             myItems.push(new item(stagePieces[i].itemType, stagePieces[i]));
//             stagePieces.unshift(myItems[myItems.length - 1]);
//             myItems[myItems.length - 1].index = myItems.length - 1;
//             return;
//           } else if (stagePieces[i].type == "brick" && this.big) {
//             brickBreak(stagePieces[i].index);
//             return;
//           }
//         } else {
//           if (stagePieces[i].x > this.x) {
//             blockedDirHor = "right";
//           }
//           if (stagePieces[i].x < this.x) {
//             blockedDirHor = "left";
//           }
//         }
//       }
//     }
//     if (collisionDetection(floor, -1, "mustachio")) {
//       blockedDirVert = "floor";
//       this.y = floor.y - playHei + 1;
//       speedY = 0;
//       numJumps = 0;
//     }
//     if (blockedDirVert == "none") {
//       speedY += gravity;
//       this.y += speedY;

//       if (this.y + playHei >= myGameArea.canvas.height) {
//         this.big = false;
//         this.fire = false;
//         killMethod();
//       }
//     }
//   };
// }

function standingCoin(x, y) {
  this.x = x
  this.y = y
  this.type = 'standingCoin'
  this.color = 'yellow'
  this.width = obstacleSize / 2
  this.height = obstacleSize / 2

  this.update = function () {
    ctx = myGameArea.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

function item(type, block) {
  this.type = type
  this.index = 0
  this.speed = 1
  this.blockedDirVert = 'none'
  if (this.type == 'mustacheroom' && mustachio.big) {
    this.type = 'fireStache'
  }
  this.speedY = 0
  this.doneRising = false
  if (this.type == 'mustacheroom') {
    this.color = 'cyan'
  } else if (this.type == 'coin') {
    this.color = 'yellow'
    numCoins++
    score += 100
  } else if (this.type == 'fireStache') {
    this.color = 'red'
  }
  this.width = obstacleSize / 2
  this.height = obstacleSize / 2
  this.x = block.x + (block.width / 2 - this.width / 2)
  this.y = block.y

  this.update = function () {
    ctx = myGameArea.context
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  this.newPos = function () {
    if (!this.doneRising && this.y + this.height >= block.y) {
      this.y -= 0.5
      if (this.type == 'coin') {
        this.y -= 0.5
      }
    } else {
      if (this.type != 'coin') {
        this.doneRising = true
      } else if (this.y + this.height + obstacleSize >= block.y) {
        this.y -= 1.0
      } else {
        for (k in myItems) {
          if (myItems[k].index > this.index) {
            myItems[k].index -= 1
          }
        }
        var i = myItems.indexOf(this)
        myItems.splice(i, 1)

        i = stagePieces.indexOf(this)
        stagePieces.splice(i, 1)
      }
    }
    if (this.doneRising && this.type != 'coin' && this.type != 'fireStache') {
      this.x -= this.speed
      this.blockedDirVert = 'none'
      for (i in stagePieces) {
        if (stagePieces[i] == this && stagePieces[i].index == this.index) {
          continue
        }
        if (collisionDetection(stagePieces[i], this.index, 'item')) {
          if (stagePieces[i].y >= this.y) {
            this.blockedDirVert = 'block'
            this.y = stagePieces[i].y - this.height + 1
            this.speedY = 0
          } else {
            if (stagePieces[i].x > this.x) {
              this.speed *= -1
            }
            if (stagePieces[i].x < this.x) {
              this.speed *= -1
            }
          }
        }
      }
      if (collisionDetection(floor, this.index, 'item')) {
        this.blockedDirVert = 'floor'
        this.y = floor.y - this.height + 1
        this.speedY = 0
      }
      if (this.blockedDirVert == 'none') {
        this.speedY += gravity
        this.y += this.speedY
      }
    }
  }
}

function enemy(x, y, type, color) {
  this.x = x
  this.y = y
  this.yUp = y - 30
  this.yDown = y + 30
  this.maxX = this.x + 500
  this.minX = this.x - 500
  this.isUp = true
  this.width = 0
  this.height = 0
  this.type = type
  this.color = color
  this.index = 0
  this.speed = 0.5
  this.speedY = 0
  this.usedImage = new Image()
  this.enemyImage = new Image()
  this.enemyImageReversed = new Image()
  this.dead = false
  this.blockedDirHor = 'none'
  this.blockedDirVert = 'none'
  this.isFiring = false
  this.isGettingReady = false
  this.pauseFrame = 0
  this.rising = true
  this.startingY = this.y
  this.inPipe = false

  if (type == 'stacheStalker') {
    // this.usedImage.src = 'Images/stacheStalker.png'
    // this.enemyImage.src = 'Images/stacheStalker.png'
    // this.enemyImageReversed.src = 'Images/stacheStalkerReversed.png'
    // this.width = obstacleSize / 1.5
    // this.height = obstacleSize / 1.5
  } else if (type == 'stacheSlinger') {
    this.usedImage.src = 'Images/stacheSlinger1.png'
    this.enemyImage.src = 'Images/stacheSlinger2.png'
    this.enemyImageReversed.src = 'Images/stacheSlinger1.png'
    this.width = obstacleSize * 1.75
    this.height = obstacleSize * 2
  } else if (type == 'stacheStreaker') {
    this.usedImage.src = 'Images/stacheStreaker1.png'
    this.enemyImage.src = 'Images/stacheStreaker2.png'
    this.enemyImageReversed.src = 'Images/stacheStreaker1.png'
    this.width = obstacleSize * 2
    this.height = obstacleSize * 1
    this.y = obstacleSize
  } else if (type == 'stacheSeed') {
    this.width = obstacleSize * 1.5
    this.height = obstacleSize * 2
    if (this.color == 'up') {
      this.usedImage.src = 'Images/stacheSeed1.png'
      this.enemyImage.src = 'Images/stacheSeed2.png'
      this.enemyImageReversed.src = 'Images/stacheSeed1.png'
    } else if (this.color == 'down') {
      this.usedImage.src = 'Images/stacheSeedReversed1.png'
      this.enemyImage.src = 'Images/stacheSeedReversed2.png'
      this.enemyImageReversed.src = 'Images/stacheSeedReversed1.png'
      this.startingY += this.height
    }
  }

  this.update = function () {
    ctx = myGameArea.context
    ctx.drawImage(this.usedImage, this.x, this.y, this.width, this.height)

    if (this.isGettingReady) {
      ctx.beginPath()
      ctx.globalAlpha = 0.4
      ctx.lineWidth = 3
      ctx.strokeStyle = 'blue'
      ctx.moveTo(this.x + this.width / 2 - 3, this.y + (this.height / 3) * 2)
      ctx.lineTo(this.x + this.width / 2, floor.y)
      ctx.stroke()
      ctx.globalAlpha = 1.0
    }
  }

  this.newPos = function () {
    if (this.dead) {
      return
    }
    if (!this.isGettingReady) {
      this.blockedDirHor = 'none'
      this.blockedDirVert = 'none'
      if (this.type != 'stacheSeed') {
        this.x -= this.speed
      }
      if (this.type == 'stacheSeed') {
        if (this.pauseFrame == 0) {
          if (this.rising) {
            this.inPipe = true
            this.pauseFrame = myGameArea.frameNo + 1000
          } else {
            this.pauseFrame = myGameArea.frameNo + 500
          }
        } else if (myGameArea.frameNo <= this.pauseFrame) {
          return
        } else if (this.rising) {
          this.inPipe = false
          if (this.color == 'up') {
            this.y -= 1
          } else if (this.color == 'down') {
            this.y += 1
          }
          if (this.color == 'up' && this.y + this.height <= this.startingY) {
            this.rising = false
            this.startingY = this.y + this.height
            this.pauseFrame = 0
          }
          if (this.color == 'down' && this.y >= this.startingY) {
            this.rising = false
            this.startingY = this.y - this.height
            this.pauseFrame = 0
          }
        } else if (!this.rising) {
          if (this.color == 'up') {
            this.y += 1
          } else if (this.color == 'down') {
            this.y -= 1
          }
          if (this.color == 'up' && this.y >= this.startingY) {
            this.rising = true
            this.startingY = this.y
            this.pauseFrame = 0
          }
          if (this.color == 'down' && this.y <= this.startingY) {
            this.rising = true
            this.startingY = this.y + this.height
            this.pauseFrame = 0
          }
        }
        return
      }
      if (this.type == 'stacheStreaker' || this.type == 'stacheSlinger') {
        if (this.x >= this.maxX) {
          this.speed *= -1
          this.x -= 10
        }
        if (this.x <= this.minX) {
          this.speed *= -1
          this.x += 10
        }
        return
      }

      for (i in stagePieces) {
        if (stagePieces[i] == this && stagePieces[i].index == this.index) {
          continue
        }
        if (collisionDetection(stagePieces[i], this.index, 'enemy')) {
          if (myEnemies.includes(stagePieces[i])) {
            this.speed *= -1
          } else if (stagePieces[i].y + 5 >= this.y + this.height) {
            this.blockedDirVert = 'block'
            this.y = stagePieces[i].y - this.height + 1
            this.speedY = 0
          } else {
            if (stagePieces[i].x > this.x) {
              this.speed *= -1
            }
            if (stagePieces[i].x < this.x) {
              this.speed *= -1
            }
          }
        }
      }
      if (collisionDetection(floor, this.index, 'enemy')) {
        this.blockedDirVert = 'floor'
        this.y = floor.y - this.height + 2
        this.speedY = 0
      }
      if (this.blockedDirVert == 'none' && this.type == 'stacheStalker') {
        this.speedY += gravity
        this.y += this.speedY
      } else if (this.type == 'stacheSlinger') {
        if (this.isUp) {
          if (this.y >= this.yUp) {
            this.y -= 0.2
          } else {
            this.isUp = false
          }
        } else {
          if (this.y <= this.yDown) {
            this.y += 0.2
          } else {
            this.isUp = true
          }
        }
      }
    }
  }
}

// function enemyHit(j) {
//   myEnemies[j].dead = true
//   myEnemies[j].speed = 0
//   myEnemies[j].height /= 2
//   myEnemies[j].y += myEnemies[j].height
//   setTimeout(killEnemy, 500)
// }

function win() {
  myGameArea.stop()
  if (mustachio.y >= obstacleSize * 2) {
    var flagScore = Math.round(mustachio.y - myGameArea.canvas.height)
    score -= flagScore
  } else {
    score += 10000
  }

  fallID = setInterval(fallDownFlag, 5)
}

var slowTimerAdd = 0
function fallDownFlag() {
  if (mustachio.big) {
    score += 1000
  }
  if (mustachio.fire) {
    score += 2000
  }

  if (levelTimerCount > 0 && slowTimerAdd % 4 == 0) {
    score += 10
    levelTimerCount--
  }
  mustachio.y++
  myGameArea.clear()
  for (i in stagePieces) {
    stagePieces[i].update()
  }
  for (i in uiPieces) {
    uiPieces[i].update()
  }
  mustachio.update()

  if (
    mustachio.y >=
    5 + myGameArea.canvas.height - obstacleSize * 2 - playHei
  ) {
    clearInterval(fallID)
    mustachio.dir = 'right'
    goHomeID = setInterval(goHome, 5)
  }
  slowTimerAdd++
}

function goHome() {
  mustachio.x++
  myGameArea.clear()
  if (levelTimerCount > 0 && slowTimerAdd % 4 == 0) {
    score += 10
    levelTimerCount--
  }
  for (i in stagePieces) {
    stagePieces[i].update()
  }

  for (i in uiPieces) {
    uiPieces[i].update()
  }

  mustachio.update()

  if (mustachio.x >= doorX) {
    clearInterval(goHomeID)
    mustachio.dir = 'down'
    myGameArea.clear()
    for (i in stagePieces) {
      stagePieces[i].update()
    }

    for (i in uiPieces) {
      uiPieces[i].update()
    }

    mustachio.update()
    setTimeout(closeDoor, 1000)
  }
  slowTimerAdd++
}

function closeDoor() {
  for (i in stagePieces) {
    if (stagePieces[i].type == 'home') {
      stagePieces[i].closedDoor = true
    }
  }

  myGameArea.clear()
  for (i in stagePieces) {
    stagePieces[i].update()
  }

  for (i in uiPieces) {
    uiPieces[i].update()
  }
  updateScore()
}

var enemyImageNum = 0
function changeImage() {
  enemyImageNum++
  for (i in myEnemies) {
    if (
      enemyImageNum % 2 == 0 &&
      (myEnemies[i].type == 'stacheStalker' ||
        myEnemies[i].type == 'stacheSeed')
    ) {
      myEnemies[i].usedImage.src = myEnemies[i].enemyImage.src
    } else if (
      myEnemies[i].type == 'stacheStalker' ||
      myEnemies[i].type == 'stacheSeed'
    ) {
      myEnemies[i].usedImage.src = myEnemies[i].enemyImageReversed.src
    }

    if (enemyImageNum % 3 == 0 && myEnemies[i].type == 'stacheSlinger') {
      if (myEnemies[i].usedImage.src == myEnemies[i].enemyImage.src) {
        myEnemies[i].usedImage.src = myEnemies[i].enemyImageReversed.src
      } else if (myEnemies[i].type == 'stacheSlinger') {
        myEnemies[i].usedImage.src = myEnemies[i].enemyImage.src
      }
    }
  }
}

var deathDown = false
var deathSpeedY = 0

function killMethod() {
  score -= 1000
  if (killPlayerID == 0) {
    if (mustachio.fire) {
      clearInterval(changeID)
      changeTrack = 0
      changeID = setInterval(change, 115)
    } else if (mustachio.big) {
      clearInterval(growID)
      clearInterval(shrinkID)
      shrinkID = setInterval(shrink, 115)
    } else {
      myGameArea.stop()
      killPlayerID = setInterval(killMustachio, 5)
    }
  }
}

var frameHoldCount = 0
var started = false

// function killMustachio() {
//   if (frameHoldCount < 200 && !started) {
//     frameHoldCount++
//     if (frameHoldCount >= 200) {
//       frameHoldCount = 0
//       started = true
//     }
//     return
//   }
//   if (frameHoldCount < 70 && deathSpeedY > 0.1) {
//     frameHoldCount++
//     return
//   }
//   mustachio.y += deathSpeedY
//   deathSpeedY += 0.06

//   myGameArea.clear()
//   for (i in stagePieces) {
//     stagePieces[i].update()
//   }
//   for (i in uiPieces) {
//     uiPieces[i].update()
//   }
//   mustachio.update()

//   if (mustachio.y >= 5 + myGameArea.canvas.height) {
//     clearInterval(killPlayerID)
//   }
// }

// function killEnemy() {
//   var index = 0
//   for (i in myEnemies) {
//     if (myEnemies[i].dead) {
//       index = myEnemies[i].index
//       var k = stagePieces.indexOf(myEnemies[i])
//       stagePieces.splice(k, 1)
//       myEnemies.splice(i, 1)
//     }
//   }
//   for (i in myEnemies) {
//     if (myEnemies[i].index > index) {
//       myEnemies[i].index--
//     }
//   }
// }

// function collisionDetection(obstacle, index, type) {
//   if (type == "mustachio") {
//     var rect1 = {
//       x: mustachio.x,
//       y: mustachio.y,
//       width: playWid,
//       height: playHei,
//     };
//   } else if (type == "item") {
//     var rect1 = {
//       x: myItems[index].x,
//       y: myItems[index].y,
//       width: myItems[index].width,
//       height: myItems[index].height,
//     };
//   } else if (type == "enemy") {
//     var rect1 = {
//       x: myEnemies[index].x,
//       y: myEnemies[index].y,
//       width: myEnemies[index].width,
//       height: myEnemies[index].height,
//     };
//   }
//   var rect2 = {
//     x: obstacle.x,
//     y: obstacle.y,
//     width: obstacle.width,
//     height: obstacle.height,
//   };

//   return (
//     rect1.x < rect2.x + rect2.width &&
//     rect1.x + rect1.width > rect2.x &&
//     rect1.y < rect2.y + rect2.height &&
//     rect1.y + rect1.height > rect2.y
//   );
// }

function RectCircleColliding(rectX, rectY, rectW, rectH, x, y, radius) {
  var dx = Math.abs(x - (rectX + rectW / 2))
  var dy = Math.abs(y - (rectY + rectH / 2))

  if (dx > radius + rectW / 2) {
    return false
  }
  if (dy > radius + rectH / 2) {
    return false
  }

  if (dx <= rectW) {
    return true
  }
  if (dy <= rectH) {
    return true
  }

  var dx = dx - rectW
  var dy = dy - rectH
  return dx * dx + dy * dy <= radius * radius
}

var tempHeight = 0
function keyUnpress(e) {
  if (flushID != 0) {
    return
  }
  if (e.keyCode == 37 || e.keyCode == 65) {
    left = false
  }
  if (e.keyCode == 68 || e.keyCode == 39) {
    right = false
  }
  if (e.keyCode == 16) {
    sprint = false
  }
  if (e.keyCode == 83 && tempHeight != 0) {
    if (mustachio.big) {
      mustachio.y -= playHei
    }
    playHei = tempHeight
    tempHeight = 0
  }
}

var start = true
var target = 0
function goDownPipe() {
  x
  if (start) {
    target = mustachio.y + playHei + 10
    start = false
  }

  mustachio.y += 1

  myGameArea.clear()
  mustachio.update()
  for (i in stagePieces) {
    if (
      stagePieces[i].x + stagePieces[i].width > 0 &&
      stagePieces[i].x <= myGameArea.canvas.width
    ) {
      stagePieces[i].update()
    }
  }
  if (mustachio.y >= target) {
    start = true
    target = 0
    clearInterval(flushID)
    flushID = 0
    startGame(mustachio.warpDest)
  }
}

function keyPress(e) {
  if (flushID != 0) {
    return
  }
  if (e.keyCode == 37 || e.keyCode == 65) {
    mustachio.dir = 'left'
    left = true
    if (blockedDirHor == 'right') {
      blockedDirHor = 'none'
      for (i in stagePieces) {
        stagePieces[i].x += 5
      }
    }
  }
  if (e.keyCode == 68 || e.keyCode == 39) {
    mustachio.dir = 'right'
    right = true
    if (blockedDirHor == 'left') {
      blockedDirHor = 'none'
      for (i in stagePieces) {
        stagePieces[i].x -= 5
      }
    }
  }
  if (e.keyCode == 87 || e.keyCode == 38) {
    jump()
  }
  if (e.keyCode == 16) {
    sprint = true
  }
  if (e.keyCode == 27 || e.keyCode == 80) {
    pause()
  }
  if (e.keyCode == 32 && myGameArea.frameNo >= fireFrame && mustachio.fire) {
    fireFrame = myGameArea.frameNo + 150
    stagePieces.push(new fire())
  }
  if (e.keyCode == 83 && mustachio.onPipe) {
    mustachio.dir = 'down'
    myGameArea.stop()
    mustachio.x =
      mustachio.warpPipe.x - playWid / 2 + mustachio.warpPipe.width / 2
    if (mustachio.big) {
      flushID = setInterval(goDownPipe, 10)
    } else {
      flushID = setInterval(goDownPipe, 20)
    }
    return
  }
  if (e.keyCode == 83 && playHei == maxHeight) {
    mustachio.dir = 'down'
    tempHeight = playHei
    playHei = minHeight
    mustachio.y += tempHeight - playHei
  } else if (
    e.keyCode == 83 &&
    !mustachio.big &&
    shrinkID == 0 &&
    growID == 0
  ) {
    mustachio.dir = 'down'
    tempHeight = playHei
    playHei = minHeight - 10
    mustachio.y += tempHeight - playHei
  }
  if (e.keyCode == 82) {
    myGameArea.stop()
    score -= 10000
    shrinkID = 0
    growID = 0
    tempHeight = 0
    mustachio = new makePlayer(playHei, playWid, 'Images/Mustachio.png')
    mustachio.fire = false
    mustachio.big = false
    startGame(currentLevel)
  }
}

// function fire() {
//   this.getPos = true
//   this.y = mustachio.y + playHei / 2
//   this.type = 'fire'

//   this.width = 5
//   this.radius = 5
//   this.speedY = 3
//   if (mustachio.dir == 'left') {
//     this.speedX = -5
//     this.x = mustachio.x
//   } else {
//     this.speedX = 5
//     this.x = mustachio.x + playWid
//   }

//   this.update = function () {
//     ctx = myGameArea.context
//     ctx.beginPath()
//     ctx.lineWidth = 5
//     ctx.strokeStyle = 'red'
//     ctx.fillStyle = 'red'
//     ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
//     ctx.stroke()
//     ctx.fill()
//   }

//   this.newPos = function () {
//     this.x += this.speedX
//     this.y += this.speedY

//     this.speedY += gravity

//     for (i in myEnemies) {
//       if (
//         !myEnemies[i].dead &&
//         RectCircleColliding(
//           myEnemies[i].x,
//           myEnemies[i].y,
//           myEnemies[i].width,
//           myEnemies[i].height,
//           this.x,
//           this.y,
//           this.radius,
//         )
//       ) {
//         enemyHit(i)
//         var j = stagePieces.indexOf(this)
//         stagePieces.splice(j, 1)
//       }
//     }

//     for (i in stagePieces) {
//       if (
//         RectCircleColliding(
//           stagePieces[i].x,
//           stagePieces[i].y,
//           stagePieces[i].width,
//           stagePieces[i].height,
//           this.x,
//           this.y,
//           this.radius,
//         )
//       ) {
//         if (
//           this.y - this.radius <= stagePieces[i].y &&
//           stagePieces[i].type != this.type
//         ) {
//           this.speedY = -5.5
//         } else if (
//           stagePieces[i].type != this.type &&
//           stagePieces[i].type != 'ground'
//         ) {
//           var i = stagePieces.indexOf(this)
//           stagePieces.splice(i, 1)
//           return
//         }
//       }
//     }

//     if (this.y > floor.y) {
//       this.y = floor.y - 50
//       this.speedY = -5.5
//     }
//   }
// }

// function jump() {
//   if (numJumps < 2) {
//     speedY = -5.5
//     numJumps++
//     blockedDirVert = 'none'
//     mustachio.y -= 5
//   }
// }

// function grow() {
//   mustachio.dir = 'none'
//   if (tempHeight != 0) {
//     playHei = tempHeight
//     tempHeight = 0
//   }
//   if (playHei >= maxHeight) {
//     playHeight = maxHeight
//     mustachio.big = true
//     clearInterval(growID)
//     growID = 0
//     tempHeight = 0
//     return
//   }
//   playHei += 10
//   playWid += 3
// }

// function shrink() {
//   mustachio.dir = 'none'
//   if (tempHeight != 0) {
//     playHei = tempHeight
//     tempHeight = 0
//   }
//   if (playHei <= minHeight) {
//     playHei = minHeight
//     clearInterval(shrinkID)
//     mustachio.big = false
//     mustachio.beingHit = false
//     shrinkID = 0
//     tempHeight = 0
//     return
//   }
//   playHei -= 10
//   playWid -= 3
// }

function change() {
  if (changeTrack <= 6) {
    mustachio.fire = !mustachio.fire
    changeTrack++
  } else {
    clearInterval(changeID)
    mustachio.beingHit = false
  }
}

function brickBreak(index) {
  var x = myItemBlocks[index].x + obstacleSize / 2
  var y = myItemBlocks[index].y + obstacleSize / 2
  var radius = 10
  score += 150

  stagePieces.push(new brickPieces(x, y, radius, 'upLeft'))
  stagePieces.push(new brickPieces(x, y, radius, 'left'))
  stagePieces.push(new brickPieces(x, y, radius, 'upRight'))
  stagePieces.push(new brickPieces(x, y, radius, 'right'))

  for (i in myItemBlocks) {
    if (myItemBlocks[i].index > index) {
      myItemBlocks[i].index--
    }
  }

  var t = stagePieces.indexOf(myItemBlocks[index])
  stagePieces.splice(t, 1)
  myItemBlocks.splice(index, 1)
}

function brickPieces(x, y, radius, dir) {
  this.getPos = true
  this.type = 'piece'
  this.x = x
  this.y = y
  this.width = radius
  this.radius = radius
  this.speedY = 0
  this.speed = 0
  switch (dir) {
    case 'upLeft':
      this.speedY = -3
      this.speed = -1
      break
    case 'left':
      this.speedY = -1
      this.speed = -2
      break
    case 'upRight':
      this.speedY = -3
      this.speed = 1
      break
    case 'right':
      this.speedY = -1
      this.speed = 2
      break
  }

  this.update = function () {
    ctx = myGameArea.context
    ctx.beginPath()
    ctx.fillStyle = 'brown'
    ctx.strokeStyle = 'brown'
    ctx.strokeWidth = 1
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
  }

  this.newPos = function () {
    this.x += this.speed
    this.y += this.speedY
    this.speedY += gravity
  }

  this.update()
}

// function slinger(x, y) {
//   this.getPos = true;
//   this.type = "slinger";
//   this.x = x;
//   this.y = y;
//   this.width = 15;
//   this.radius = 15;
//   this.targetX = mustachio.x + playWid / 2;
//   this.targetY = mustachio.y + playHei / 2;
//   this.offsetX = (this.targetX - this.x) / 300;
//   this.offsetY = (this.targetY - this.y) / 300;

//   this.update = function () {
//     ctx = myGameArea.context;
//     ctx.beginPath();
//     ctx.lineWidth = 5;
//     ctx.strokeStyle = "yellow";
//     ctx.fillStyle = "brown";
//     ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//     ctx.stroke();
//     ctx.fill();
//   };

//   this.newPos = function () {
//     this.x += this.offsetX;
//     this.y += this.offsetY;
//     if (
//       this.x < 0 ||
//       this.x > myGameArea.canvas.width ||
//       this.y < 0 ||
//       this.y > myGameArea.canvas.height
//     ) {
//       var i = stagePieces.indexOf(this);
//       stagePieces.splice(i, 1);
//     }
//     if (
//       RectCircleColliding(
//         mustachio.x,
//         mustachio.y,
//         playWid,
//         playHei,
//         this.x,
//         this.y,
//         this.radius,
//       )
//     ) {
//       killMethod();
//     }
//   };
// }

function sling() {
  for (i in myEnemies) {
    if (myEnemies[i].type == 'stacheSlinger' && !myEnemies[i].dead) {
      if (myEnemies[i].y + myEnemies[i].height >= mustachio.y) {
        continue
      }
      if (
        myEnemies[i].x + myEnemies[i].width > 0 &&
        myEnemies[i].x <= myGameArea.canvas.width
      ) {
        stagePieces.push(
          new slinger(
            myEnemies[i].x + myEnemies[i].width / 2,
            myEnemies[i].y + (myEnemies[i].height / 3) * 2,
          ),
        )
        x = false
      }
    }
  }
}

var deathRayFrame = 0
var deathRayStarted = false
var deathRayFired = false

function startDeathRay() {
  if (deathRayFrame >= 1500 && !deathRayStarted) {
    for (i in myEnemies) {
      if (myEnemies[i].type == 'stacheStreaker') {
        myEnemies[i].isGettingReady = true
        myEnemies[i].usedImage.src = myEnemies[i].enemyImage.src
      }
      deathRayStarted = true
    }
  } else if (deathRayFrame >= 2000 && !deathRayFired) {
    deathRay()
    deathRayFired = true
  } else if (deathRayFrame >= 2500) {
    destroyLaser()
    deathRayFrame = 0
    deathRayFired = false
    deathRayStarted = false
  }
  deathRayFrame++
}

function deathRay() {
  for (i in myEnemies) {
    if (myEnemies[i].isGettingReady) {
      myEnemies[i].isFiring = false
      var x = myEnemies[i].x + myEnemies[i].width / 3
      var y = myEnemies[i].y + (myEnemies[i].height / 3) * 2
      stagePieces.push(new laser(x, y, 'laser'))
    }
  }
}

function laser(x, y, type) {
  this.x = x
  this.y = y
  this.width = (obstacleSize * 2) / 3
  this.height = floor.y
  this.type = type

  this.update = function () {
    ctx = myGameArea.context
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

function destroyLaser() {
  for (var i = 0; i < stagePieces.length; i++) {
    if (stagePieces[i].type == 'stacheStreaker') {
      stagePieces[i].isGettingReady = false
      stagePieces[i].usedImage.src = stagePieces[i].enemyImageReversed.src
    } else if (stagePieces[i].type == 'laser') {
      stagePieces.splice(i, 1)
      i = 0
    }
  }
  setTimeout(startDeathRay, 5000)
}

function cannonFire() {
  for (i in myObstacles) {
    if (myObstacles[i].type == 'cannon') {
      if (
        (myObstacles[i].x + 500 >= 0 &&
          myObstacles[i].x - 500 <= myGameArea.canvas.width) ||
        myObstacles[i].dir == 'right'
      ) {
        myEnemies.push(
          new stacheShot(
            myObstacles[i].x,
            myObstacles[i].y + 10,
            myObstacles[i].dir,
          ),
        )
        stagePieces.push(myEnemies[myEnemies.length - 1])
      }
    }
  }
}

function stacheShot(x, y, dir) {
  this.getPos = true
  this.type = 'stacheShot'
  this.x = x
  this.y = y
  this.width = bulletSize
  this.height = bulletSize
  this.imageBullet = new Image()
  switch (dir) {
    case 'left':
      this.imageBullet.src = 'Images/stacheShotLeft.png'
      break
    case 'right':
      this.imageBullet.src = 'Images/stacheShotRight.png'
      break
    case 'up':
      this.imageBullet.src = 'Images/stacheShotUp.png'
      break
    case 'down':
      this.imageBullet.src = 'Images/stacheShotDown.png'
      break
  }
  this.dir = dir
  this.dead = false
  this.speed = 1

  this.update = function () {
    var ctx = myGameArea.context
    ctx.drawImage(this.imageBullet, this.x, this.y, this.width, this.height)
  }

  this.newPos = function () {
    if (this.dir == 'left') {
      this.x -= this.speed
      if (this.x <= myObstacles[0].x) {
        var i = stagePieces.indexOf(this)
        stagePieces.splice(i, 1)
        i = myEnemies.indexOf(this)
        myEnemies.splice(i, 1)
      }
    }
    if (this.dir == 'right') {
      this.x += this.speed
      if (this.x >= myObstacles[1].x) {
        var i = stagePieces.indexOf(this)
        stagePieces.splice(i, 1)
        i = myEnemies.indexOf(this)
        myEnemies.splice(i, 1)
      }
    }
    if (this.dir == 'up') {
      this.y -= this.speed
      if (this.y <= obstacleSize * -1) {
        var i = stagePieces.indexOf(this)
        stagePieces.splice(i, 1)
        i = myEnemies.indexOf(this)
        myEnemies.splice(i, 1)
      }
    }
    if (this.dir == 'down') {
      this.y += this.speed
      if (this.y >= myGameArea.canvas.height) {
        var i = stagePieces.indexOf(this)
        stagePieces.splice(i, 1)
        i = myEnemies.indexOf(this)
        myEnemies.splice(i, 1)
      }
    }
  }
}

var paused = false
function pause() {
  if (!paused) {
    clearInterval(timerID)
    paused = !paused
  } else {
    timerID = setInterval(updateGameArea, 5)
    paused = !paused
  }
}

var highText = ''
function updateScore() {
  var gameType = 'highscore: MUST: ' + hardMode
  if (window.localStorage.getItem(gameType) == 'undefined') {
    window.localStorage.setItem(gameType, score)
  }
  var highScore = window.localStorage.getItem(gameType)
  if (score < 0) {
    highText = 'You couldnt event get above Zero! Try again loser.'
  } else if (highScore < score) {
    window.localStorage.setItem(gameType, score)
    if (hardMode) {
      highText = 'You got the High Score for Hard!!! Score: ' + score
    } else {
      highText = 'You got the High Score for Easy!!! Score: ' + score
    }
  } else {
    highText = 'Lol u suk. High Score: ' + highScore
  }

  highDisplay()
}

function highDisplay() {
  const ctx = myGameArea.uiCon
  ctx.font = '60px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(
    highText,
    myGameArea.canvas.width / 2 - ctx.measureText(highText).width / 2,
    myGameArea.canvas.height / 3 - 40,
  )
}
