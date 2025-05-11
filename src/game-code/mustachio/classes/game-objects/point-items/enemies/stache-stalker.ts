import type { rectangle } from '@/game-code/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/shared/game-context'
import { collisionDetection } from '@/game-code/mustachio/app-code'

export class StacheStalker extends Enemy {
  pointValue: number = 100
  protected speed: number = 0.5
  protected speedY: number = 0

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)

    this.imageSources.push(
      'Images/stacheStalker.png',
      'Images/stacheStalkerReversed.png',
    )

    this.image.src = this.imageSources[0]
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.setPosition()

    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }

  setPosition() {
    let onFloor = false
    for (const gameObject of this.gameContext.gameObjects) {
      if (gameObject.objectId === this.objectId) {
        continue
      }

      if (!collisionDetection(this, gameObject)) {
        continue
      }

      console.log('Collision detected with', gameObject.constructor.name)
      if (gameObject.rect.y > this.rect.y + this.rect.height - 10) {
        onFloor = true
        this.rect.y = gameObject.rect.y - this.rect.height
        this.speedY = 0
        continue
      }

      this.speed *= -1
    }

    this.rect.x += this.speed

    if (!onFloor) {
      this.rect.y += this.speedY
      this.speedY += this.gameContext.gravity
    }
  }
}
