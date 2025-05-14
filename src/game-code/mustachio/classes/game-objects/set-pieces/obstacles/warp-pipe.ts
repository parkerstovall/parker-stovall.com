import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameContext } from '@/game-code/shared/game-context'

export class WarpPipe extends Obstacle {
  readonly objectId = 0
  readonly destination: string

  constructor(gameContext: GameContext, objectId: number, destination: string) {
    const rect: rectangle = {
      x: 0,
      y: 0,
      width: BLOCK_SIZE * 2,
      height: BLOCK_SIZE * 2,
    }

    super(gameContext, objectId, rect)

    this.destination = destination
  }

  enter() {
    // TODO: Implement the logic for entering the warp pipe
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
