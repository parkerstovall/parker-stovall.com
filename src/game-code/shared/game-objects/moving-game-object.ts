import { outOfBounds } from '../app-code'
import { direction, type collision } from '../types'
import { UpdatingGameObject } from './updating-game-object'

export abstract class MovingGameObject extends UpdatingGameObject {
  speedX: number = 0
  speedY: number = 0
  onGround: boolean = false

  leftRightMovement(collisions: collision[]) {
    // The floor is never outside of the canvas
    // so if the object is outside of the canvas
    // we dont use gravity

    this.onGround = outOfBounds(this.rect, this.gameContext)
    for (const collision of collisions) {
      if (collision.collisionDirection === direction.LEFT) {
        this.speedX = Math.abs(this.speedX)
        this.rect.x =
          collision.gameObjectTwo.rect.x + collision.gameObjectTwo.rect.width
      } else if (collision.collisionDirection === direction.RIGHT) {
        this.speedX = -Math.abs(this.speedX)
        this.rect.x = collision.gameObjectTwo.rect.x - this.rect.width
      } else if (collision.collisionDirection === direction.DOWN) {
        this.onGround = true
        this.speedY = 0
        this.rect.y = collision.gameObjectTwo.rect.y - this.rect.height
      } else if (collision.collisionDirection === direction.UP) {
        this.speedY = 0
        this.rect.y =
          collision.gameObjectTwo.rect.y + collision.gameObjectTwo.rect.height
      }
    }

    this.rect.x += this.speedX

    if (!this.onGround) {
      this.rect.y += this.speedY
      this.speedY += this.gameContext.gravity
    }
  }
}
