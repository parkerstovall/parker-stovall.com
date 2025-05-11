import { SetPiece } from './set-piece'

export class Flag extends SetPiece {
  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
