import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'

import { Wall } from '../classes/game-objects/set-pieces/obstacles/wall'
import { StacheStalker } from '../classes/game-objects/point-items/enemies/stache-stalker'
import { ScoreDisplay } from '../classes/game-objects/ui-objects/score-display'
import { TimerDisplay } from '../classes/game-objects/ui-objects/timer-display'
import { Coin } from '../classes/game-objects/point-items/items/coin'
import { ItemBlock } from '../classes/game-objects/set-pieces/blocks/item-block'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FireBarBlock } from '../classes/game-objects/set-pieces/obstacles/fire-bar-block'

export function testLevelOne(gameContext: GameContext) {
  const floorRect = {
    x: 0,
    y: gameContext.gameArea.height - BLOCK_SIZE,
    width: gameContext.gameArea.width,
    height: BLOCK_SIZE,
  }

  gameContext.addGameObject(
    new Floor(gameContext, gameContext.generateUniqueId(), floorRect),
  )

  const wallRect = {
    x: gameContext.gameArea.width - 200,
    y: gameContext.gameArea.height - BLOCK_SIZE * 2,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }

  gameContext.addGameObject(
    new Wall(gameContext, gameContext.generateUniqueId(), wallRect),
  )

  const wall2Rect = {
    x: gameContext.gameArea.width - 800,
    y: gameContext.gameArea.height - BLOCK_SIZE * 2,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }

  gameContext.addGameObject(
    new Wall(gameContext, gameContext.generateUniqueId(), wall2Rect),
  )

  gameContext.addGameObject(
    new StacheStalker(
      gameContext,
      gameContext.generateUniqueId(),
      gameContext.gameArea.width - 600,
      gameContext.gameArea.height - 150,
    ),
  )

  const coin1Rect = {
    x: gameContext.gameArea.width - 600,
    y: gameContext.gameArea.height - 200,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }

  gameContext.addGameObject(
    new Coin(gameContext, gameContext.generateUniqueId(), coin1Rect),
  )

  const itemBlockCoinRect = {
    x: gameContext.gameArea.width - 900,
    y: gameContext.gameArea.height - 250,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }
  const itemBlockCoin = new ItemBlock(
    gameContext,
    gameContext.generateUniqueId(),
    itemBlockCoinRect,
    false,
    'coin',
  )

  gameContext.addGameObject(itemBlockCoin)
  const itemBlockStacheroomRect = {
    x: gameContext.gameArea.width - 1020,
    y: gameContext.gameArea.height - 250,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }
  const itemBlockStacheroom = new ItemBlock(
    gameContext,
    gameContext.generateUniqueId(),
    itemBlockStacheroomRect,
    false,
    'stacheroom',
  )
  gameContext.addGameObject(itemBlockStacheroom)
  const itemBlockFireStacheRect = {
    x: gameContext.gameArea.width - 1020,
    y: gameContext.gameArea.height - 450,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }
  const itemBlockFireStache = new ItemBlock(
    gameContext,
    gameContext.generateUniqueId(),
    itemBlockFireStacheRect,
    true,
    'fire-stache',
  )
  gameContext.addGameObject(itemBlockFireStache)

  const fireBarBlock = new FireBarBlock(
    gameContext,
    gameContext.generateUniqueId(),
    gameContext.gameArea.width - 500,
    gameContext.gameArea.height - 350,
  )
  gameContext.addGameObject(fireBarBlock)

  const scoreRect = {
    x: BLOCK_SIZE,
    y: BLOCK_SIZE,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }
  const scoreDisplay = new ScoreDisplay(
    gameContext,
    gameContext.generateUniqueId(),
    scoreRect,
  )
  gameContext.addUIObject(scoreDisplay)

  const timerRect = {
    x: gameContext.gameArea.width - 200,
    y: BLOCK_SIZE,
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
  }
  const timerDisplay = new TimerDisplay(
    gameContext,
    gameContext.generateUniqueId(),
    timerRect,
  )
  gameContext.addUIObject(timerDisplay)

  gameContext.startMainLoop()
}
