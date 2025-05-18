import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FallingFloor } from '../classes/game-objects/set-pieces/obstacles/blocks/falling-floor'
import { StacheCannon } from '../classes/game-objects/set-pieces/obstacles/blocks/stache-cannon'
import { direction } from '@/game-code/shared/types'
import { FireCrossBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/fire-cross-block'

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

  // gameContext.addGameObject(
  //   new StacheCannon(
  //     gameContext,
  //     BLOCK_SIZE * 16,
  //     BLOCK_SIZE * 16,
  //     direction.LEFT,
  //   ),
  // )

  gameContext.addGameObject(
    new StacheCannon(
      gameContext,
      BLOCK_SIZE * 16,
      BLOCK_SIZE * 15,
      direction.RIGHT,
    ),
  )

  gameContext.addGameObject(
    new StacheCannon(
      gameContext,
      BLOCK_SIZE * 16,
      BLOCK_SIZE * 14,
      direction.UP,
    ),
  )

  gameContext.addGameObject(
    new StacheCannon(gameContext, BLOCK_SIZE * 15, 0, direction.DOWN),
  )

  gameContext.addGameObject(
    new FireCrossBlock(gameContext, BLOCK_SIZE * 8, BLOCK_SIZE * 12, [
      direction.UP,
      direction.DOWN,
      direction.LEFT,
      direction.RIGHT,
    ]),
  )

  gameContext.startMainLoop()
}
