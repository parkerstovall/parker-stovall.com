import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FallingFloor } from '../classes/game-objects/set-pieces/obstacles/blocks/falling-floor'

export function testLevelThree(gameContext: GameContext) {
  gameContext.clearLevel()

  gameContext.addGameObject(
    new Floor(gameContext, {
      x: 0,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 13,
      height: BLOCK_SIZE,
    }),
  )

  gameContext.addGameObject(
    new FallingFloor(gameContext, BLOCK_SIZE * 14, BLOCK_SIZE * 17),
  )

  gameContext.addGameObject(
    new Floor(gameContext, {
      x: BLOCK_SIZE * 15,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 17,
      height: BLOCK_SIZE,
    }),
  )

  gameContext.startMainLoop()
}
