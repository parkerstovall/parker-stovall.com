import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'

export class WarpPipe extends Obstacle {
  readonly objectId = 0
  readonly destination: string

  constructor(objectId: number, rect: rectangle, destination: string) {
    super(objectId, rect)

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
