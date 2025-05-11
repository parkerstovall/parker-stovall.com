import { Projectile } from './projectile'

export class FireBar extends Projectile {
  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
