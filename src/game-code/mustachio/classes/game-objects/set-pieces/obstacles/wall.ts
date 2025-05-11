import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import type { GameContext } from '@/game-code/shared/game-context'

export class Wall extends Obstacle {
  private readonly image: HTMLImageElement = new Image()

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)

    this.image.src = 'Images/obstacleBrick.png'
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }
}
