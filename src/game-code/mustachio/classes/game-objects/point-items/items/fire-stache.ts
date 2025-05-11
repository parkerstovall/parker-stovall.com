import { Item } from './item'

export class FireStache extends Item {
  pointValue: number = 2000

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
