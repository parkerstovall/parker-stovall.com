import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import type { GameContext } from '@/game-code/shared/game-context'

export class Floor extends Obstacle {
  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)
    this.isStatic = true
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }
}
