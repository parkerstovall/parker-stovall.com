import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { Item } from './item'

export class StandingCoin extends Item {
  pointValue: number = 100

  constructor(
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
    fromItemBlock: boolean = false,
  ) {
    super(gameContext, objectId, rect, fromItemBlock)

    if (fromItemBlock) {
      this.speedY = -2
    }
  }

  update(): void {
    // The animation only happens if the coin
    // is triggered from an item block
    if (!this.fromItemBlock) {
      return
    }

    if (this.speedY < 0) {
      this.rect.y += this.speedY
      this.speedY += 0.05
      return
    }

    // Once the animation is done, we remove the coin
    this.collect()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'gold'

    ctx.beginPath()
    ctx.arc(
      this.rect.x + this.rect.width / 2,
      this.rect.y + this.rect.height / 2,
      15,
      0,
      Math.PI * 2,
    )

    ctx.fill()
    ctx.closePath()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.stroke()
  }
}
