import type { GameContext } from '@/game-code/shared/game-context'
import type { collision, rectangle } from '@/game-code/shared/types'
import { Projectile } from './projectile'

export class Laser extends Projectile {
  constructor(
    gameContext: GameContext,
    objectId: number,
    x: number,
    y: number,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: 8,
      height: 8,
    }

    super(gameContext, objectId, rect)
  }

  update(collisions: collision[]): void {
    throw new Error('Method not implemented.')
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
