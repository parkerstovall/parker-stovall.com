import type { GameContext } from '@/game-code/shared/game-context'
import { SetPiece } from './set-piece'
import type { rectangle } from '@/game-code/shared/types'
import { BLOCK_SIZE } from '@/game-code/shared/constants'

export class Flag extends SetPiece {
  constructor(
    gameContext: GameContext,

    x: number,
    y: number,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE * 8,
    }

    super(gameContext, rect)
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
