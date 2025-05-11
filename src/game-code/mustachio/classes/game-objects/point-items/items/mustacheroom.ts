import { Item } from './item'

export class Mustacheroom extends Item {
  pointValue: number = 1000

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
