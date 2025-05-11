import type { rectangle } from '@/game-code/shared/types'
import { Enemy } from './enemy'

export class StacheSeed extends Enemy {
  pointValue: number = 100
  inPipe: boolean = false
  goingUp: boolean = false

  constructor(objectId: number, rect: rectangle) {
    super(objectId, rect)
    this.imageSources.push('Images/stacheSeed1.png', 'Images/stacheSeed2.png')
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
