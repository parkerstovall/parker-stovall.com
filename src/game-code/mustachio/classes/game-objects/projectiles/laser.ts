import { Projectile } from './projectile'

export class Laser extends Projectile {
  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
