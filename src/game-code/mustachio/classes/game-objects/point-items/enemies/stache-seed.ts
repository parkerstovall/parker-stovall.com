import type { collision, rectangle } from '@/game-code/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/shared/game-context'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameObject } from '@/game-code/shared/game-objects/game-object'

export class StacheSeed extends Enemy {
  pointValue: number = 100
  inPipe: boolean = false
  goingUp: boolean = false

  constructor(gameContext: GameContext, objectId: number, parent: GameObject) {
    const rect: rectangle = {
      x: parent.rect.x + BLOCK_SIZE / 2,
      y: parent.rect.y + BLOCK_SIZE / 2,
      width: parent.rect.width / 2,
      height: parent.rect.height * 2,
    }

    super(gameContext, objectId, rect)

    this.imageSources.push('Images/stacheSeed1.png', 'Images/stacheSeed2.png')
  }

  update(collisions: collision[]): void {
    throw new Error('Method not implemented.')
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )

    this.setNextImage()
  }
}
