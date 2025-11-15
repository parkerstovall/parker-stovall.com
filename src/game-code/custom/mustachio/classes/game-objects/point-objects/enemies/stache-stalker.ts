import type { collision, rectangle } from '@/game-code/custom/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/custom/shared/game-context'
import { BLOCK_SIZE } from '@/game-code/custom/shared/constants'

export class StacheStalker extends Enemy {
  readonly pointValue: number = 100

  constructor(gameContext: GameContext, x: number, y: number) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE * 0.75,
      height: BLOCK_SIZE * 0.75,
    }
    super(gameContext, rect)

    this.imageSources.push(
      'Images/stacheStalker.png',
      'Images/stacheStalkerReversed.png',
    )

    this.image.src = this.imageSources[0]
    this.speedX = 1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.rect.x + this.gameContext.xOffset,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }

  update(collisions: collision[]): void {
    if (!this.isDead) {
      this.leftRightMovement(collisions)
    }
  }
}
