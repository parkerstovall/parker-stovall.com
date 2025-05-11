import { Obstacle } from './obstacle'

export class FallingFloor extends Obstacle {
  startFall() {
    // TODO: Implement the logic for falling
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
