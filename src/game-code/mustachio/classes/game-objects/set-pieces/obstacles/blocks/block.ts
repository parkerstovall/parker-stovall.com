import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from '../obstacle'

export abstract class Block extends Obstacle {
  constructor(
    gameContext: GameContext,
    objectId: number,
    x: number,
    y: number,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,
    }

    super(gameContext, objectId, rect)
  }
}
