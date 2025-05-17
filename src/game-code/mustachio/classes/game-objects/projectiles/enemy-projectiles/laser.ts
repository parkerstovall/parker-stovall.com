import type { GameContext } from '@/game-code/shared/game-context'
import type { collision, rectangle } from '@/game-code/shared/types'
import { EnemyProjectile } from './enemy-projectile'

export class Laser extends EnemyProjectile {
  constructor(
    gameContext: GameContext,

    x: number,
    y: number,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: 8,
      height: 8,
    }

    super(gameContext, rect)
  }

  update(collisions: collision[]): void {
    console.log(collisions)
    throw new Error('Method not implemented.')
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
