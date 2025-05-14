import { collisionDetection, outOfBounds } from '@/game-code/shared/app-code'
import { Enemy } from '../point-items/enemies/enemy'
import { Projectile } from './projectile'
import type { GameContext } from '@/game-code/shared/game-context'
import type { collision, rectangle } from '@/game-code/shared/types'

export class FireBall extends Projectile {
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
    this.leftRightMovement(collisions)

    if (this.onGround) {
      this.speedY = -4
    }

    if (outOfBounds(this.rect, this.gameContext)) {
      this.gameContext.removeGameObject(this)
      return
    }

    for (const gameObject of this.gameContext.gameObjects) {
      if (gameObject.objectId === this.objectId) {
        continue
      }

      if (!collisionDetection(gameObject, this)) {
        continue
      }

      if (gameObject instanceof Enemy) {
        gameObject.enemyHit()
        this.gameContext.removeGameObject(this)
        return
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.fillStyle = 'red'
    ctx.arc(this.rect.x, this.rect.y, this.rect.height, 0, 2 * Math.PI)
    ctx.fill()
  }
}
