import { outOfBounds, collisionDetection } from '../mustachio/app-code'
import { GameObject } from './game-object'

export abstract class MovingGameObject extends GameObject {
  speedX: number = 0
  speedY: number = 0
  onGround: boolean = false

  abstract update(): void

  leftRightMovement() {
    // The floor is never outside of the canvas
    // so if the object is outside of the canvas
    // we dont use gravity
    this.onGround = outOfBounds(this.rect, this.gameContext)
    for (const gameObject of this.gameContext.gameObjects) {
      if (gameObject.objectId === this.objectId) {
        continue
      }

      if (!collisionDetection(this, gameObject)) {
        continue
      }

      if (
        !this.onGround &&
        gameObject.rect.y > this.rect.y + this.rect.height - 10
      ) {
        this.onGround = true
        this.rect.y = gameObject.rect.y - this.rect.height
        this.speedY = 0
        continue
      }

      this.speedX *= -1
    }

    this.rect.x += this.speedX

    if (!this.onGround) {
      this.rect.y += this.speedY
      this.speedY += this.gameContext.gravity
    }
  }
}
