import type { GameContext } from '@/game-code/shared/game-context'
import { CaveWall } from '../classes/game-objects/set-pieces/obstacles/blocks/cave-wall'
import { BLOCK_SIZE } from '@/game-code/shared/constants'

export function caveOne(gameContext: GameContext) {
  gameContext.clearLevel()

  // Cave walls
  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: 0,
      y: 0,
      width: BLOCK_SIZE * 4,
      height: gameContext.gameArea.height,
    }),
  )

  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: BLOCK_SIZE * 28,
      y: 0,
      width: BLOCK_SIZE * 4,
      height: gameContext.gameArea.height,
    }),
  )

  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: BLOCK_SIZE * 4,
      y: BLOCK_SIZE * 16,
      width: BLOCK_SIZE * 24,
      height: BLOCK_SIZE * 2,
    }),
  )

  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: BLOCK_SIZE * 4,
      y: 0,
      width: BLOCK_SIZE * 24,
      height: BLOCK_SIZE * 2,
    }),
  )

  gameContext.setPlayerLocation(BLOCK_SIZE * 5, BLOCK_SIZE * 5)

  gameContext.startMainLoop()
}
