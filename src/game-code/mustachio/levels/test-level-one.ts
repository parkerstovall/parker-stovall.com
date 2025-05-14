import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'

import { Wall } from '../classes/game-objects/set-pieces/obstacles/blocks/wall'
import { StacheStalker } from '../classes/game-objects/point-items/enemies/stache-stalker'
import { ScoreDisplay } from '../classes/game-objects/ui-objects/score-display'
import { TimerDisplay } from '../classes/game-objects/ui-objects/timer-display'
import { Coin } from '../classes/game-objects/point-items/items/coin'
import { ItemBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/punchable-block/item-block'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FireBarBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/fire-bar-block'

export function testLevelOne(gameContext: GameContext) {
  gameContext.addGameObject(
    new Floor(gameContext, gameContext.generateUniqueId()),
  )

  // The game canvas is 32 blocks wide
  // and 18 blocks tall

  const touchingFloor = BLOCK_SIZE * 16

  gameContext.addGameObject(
    new Wall(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 14,
      touchingFloor,
    ),
  )

  gameContext.addGameObject(
    new Wall(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 22,
      touchingFloor,
    ),
  )

  gameContext.addGameObject(
    new StacheStalker(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 16,
      BLOCK_SIZE * 15,
    ),
  )

  gameContext.addGameObject(
    new Coin(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 18,
      BLOCK_SIZE * 14,
    ),
  )

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 12,
      BLOCK_SIZE * 14,
      false,
      'coin',
    ),
  )

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 10,
      BLOCK_SIZE * 14,
      false,
      'stacheroom',
    ),
  )

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 10,
      BLOCK_SIZE * 11,
      true,
      'fire-stache',
    ),
  )

  gameContext.addGameObject(
    new FireBarBlock(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 18,
      BLOCK_SIZE * 12,
    ),
  )

  gameContext.addUIObject(
    new ScoreDisplay(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE,
      BLOCK_SIZE,
    ),
  )

  gameContext.addUIObject(
    new TimerDisplay(
      gameContext,
      gameContext.generateUniqueId(),
      BLOCK_SIZE * 28,
      BLOCK_SIZE,
    ),
  )

  gameContext.startMainLoop()
}
