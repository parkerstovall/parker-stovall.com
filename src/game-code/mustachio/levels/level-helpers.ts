import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Wall } from '../classes/game-objects/set-pieces/obstacles/blocks/wall'
import type { GameContext } from '@/game-code/shared/game-context'
import { Coin } from '../classes/game-objects/point-objects/items/coin'

export function createWall(
  gameContext: GameContext,
  startingX: number,
  startingY: number,
  numBlocksWide: number,
  numBlocksHigh: number,
) {
  for (let i = 0; i < numBlocksWide; i++) {
    for (let j = 0; j < numBlocksHigh; j++) {
      const x = (startingX + i) * BLOCK_SIZE
      const y = (startingY + j) * BLOCK_SIZE
      gameContext.addGameObject(new Wall(gameContext, x, y))
    }
  }
}

export function createCoinWall(
  gameContext: GameContext,
  startingX: number,
  startingY: number,
  numBlocksWide: number,
  numBlocksHigh: number,
) {
  for (let i = 0; i < numBlocksWide; i += 2) {
    for (let j = 0; j < numBlocksHigh; j += 2) {
      const x = (startingX + i) * BLOCK_SIZE
      const y = (startingY + j) * BLOCK_SIZE
      gameContext.addGameObject(new Coin(gameContext, x, y))
    }
  }
}

export function createPyramid(
  gameContext: GameContext,
  startingX: number,
  startingY: number,
  numBlocksWide: number,
) {
  while (numBlocksWide > 0) {
    createWall(gameContext, startingX, startingY, numBlocksWide, 1)
    startingX += 1
    startingY -= 1
    numBlocksWide -= 2
  }
}
