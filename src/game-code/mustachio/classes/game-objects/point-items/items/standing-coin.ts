import { Item } from './item'

export class StandingCoin extends Item {
  update(): void {
    throw new Error('Method not implemented.')
  }
  pointValue: number = 100

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
