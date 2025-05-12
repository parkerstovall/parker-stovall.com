import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { Item } from './item'
import { BLOCK_SIZE } from '@/game-code/shared/constants'

export class FireStache extends Item {
  pointValue: number = 1000
  totalRaise: number = 20
  speedX = 1

  constructor(
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
    fromItemBlock: boolean = false,
  ) {
    rect.width = 20
    rect.height = 20
    rect.x -= rect.width / 2
    rect.y += BLOCK_SIZE
    super(gameContext, objectId, rect, fromItemBlock)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }

  update(): void {
    // The animation only happens if the coin
    // is triggered from an item block
    if (this.fromItemBlock) {
      if (this.totalRaise > 0) {
        this.rect.y += this.speedY
        this.totalRaise += this.speedY
        return
      }
    }

    this.leftRightMovement()
  }
}
