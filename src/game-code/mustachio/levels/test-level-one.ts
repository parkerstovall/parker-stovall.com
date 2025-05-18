import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'

import { Wall } from '../classes/game-objects/set-pieces/obstacles/blocks/wall'
import { StacheStalker } from '../classes/game-objects/point-items/enemies/stache-stalker'
import { Coin } from '../classes/game-objects/point-items/items/coin'
import { ItemBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/punchable-block/item-block'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FireBarBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/fire-bar-block'

export function testLevelOne(gameContext: GameContext) {
  gameContext.clearLevel()

  gameContext.addGameObject(
    new Floor(gameContext, {
      x: 0,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 32,
      height: BLOCK_SIZE,
    }),
  )

  // The game canvas is 32 blocks wide
  // and 18 blocks tall

  const touchingFloor = BLOCK_SIZE * 16

  gameContext.addGameObject(
    new Wall(gameContext, BLOCK_SIZE * 14, touchingFloor),
  )

  gameContext.addGameObject(
    new Wall(gameContext, BLOCK_SIZE * 22, touchingFloor),
  )

  gameContext.addGameObject(
    new StacheStalker(gameContext, BLOCK_SIZE * 16, BLOCK_SIZE * 15),
  )

  gameContext.addGameObject(
    new Coin(gameContext, BLOCK_SIZE * 18, BLOCK_SIZE * 14),
  )

  gameContext.addGameObject(
    new ItemBlock(gameContext, BLOCK_SIZE * 12, BLOCK_SIZE * 14, false, 'coin'),
  )

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      BLOCK_SIZE * 10,
      BLOCK_SIZE * 14,
      false,
      'stacheroom',
    ),
  )

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      BLOCK_SIZE * 10,
      BLOCK_SIZE * 11,
      true,
      'fire-stache',
    ),
  )

  gameContext.addGameObject(
    new FireBarBlock(gameContext, BLOCK_SIZE * 18, BLOCK_SIZE * 12),
  )

  gameContext.startMainLoop()
}
