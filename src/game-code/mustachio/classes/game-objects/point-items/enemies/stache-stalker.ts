import type { rectangle } from '@/game-code/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/shared/game-context'

export class StacheStalker extends Enemy {
  pointValue: number = 100

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)

    this.imageSources.push(
      'Images/stacheStalker.png',
      'Images/stacheStalkerReversed.png',
    )

    this.image.src = this.imageSources[0]
    this.speedX = 0.5
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

  update() {
    this.leftRightMovement()
  }
}
