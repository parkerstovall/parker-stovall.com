import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Wall } from '../classes/game-objects/set-pieces/obstacles/blocks/wall'
import type { GameContext } from '@/game-code/shared/game-context'

export function createWall(
  gameContext: GameContext,
  startingX: number,
  startingY: number,
  numBlocksWide: number,
  numBlocksHigh: number,
) {
  for (let i = 0; i < numBlocksWide; i++) {
    for (let j = 0; j < numBlocksHigh; j++) {
      const x = startingX + i * BLOCK_SIZE
      const y = startingY + j * BLOCK_SIZE
      gameContext.addGameObject(new Wall(gameContext, x, y))
    }
  }
}
