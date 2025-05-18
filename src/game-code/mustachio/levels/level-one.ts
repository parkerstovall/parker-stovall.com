import { GameContext } from '@/game-code/shared/game-context'
import { createWall } from './level-helpers'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'

export function levelOne(gameContext: GameContext) {
  gameContext.clearLevel()

  // First barrier
  createWall(gameContext, 0, 0, 1, 18)

  // Floor
  gameContext.addGameObject(
    new Floor(gameContext, {
      x: 0,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 32,
      height: BLOCK_SIZE,
    }),
  )

  gameContext.startMainLoop()
}
