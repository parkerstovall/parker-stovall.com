import type { rectangle } from '@/game-code/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/shared/game-context'
import { collisionDetection, outOfBounds } from '@/game-code/mustachio/app-code'

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
    // The floor is never outside of the canvas
    // so if the object is outside of the canvas
    // we dont use gravity
    let onFloor = outOfBounds(this.rect, this.gameContext)
    for (const gameObject of this.gameContext.gameObjects) {
      if (gameObject.objectId === this.objectId) {
        continue
      }

      if (!collisionDetection(this, gameObject)) {
        continue
      }

      if (!onFloor && gameObject.rect.y > this.rect.y + this.rect.height - 10) {
        onFloor = true
        this.rect.y = gameObject.rect.y - this.rect.height
        this.speedY = 0
        continue
      }

      this.speedX *= -1
    }

    this.rect.x += this.speedX

    if (!onFloor) {
      this.rect.y += this.speedY
      this.speedY += this.gameContext.gravity
    }
  }
}
