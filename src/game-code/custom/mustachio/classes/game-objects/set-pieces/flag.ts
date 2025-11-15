import type { GameContext } from '@/game-code/custom/shared/game-context'
import { SetPiece } from './set-piece'
import { BLOCK_SIZE } from '@/game-code/custom/shared/constants'

export class Flag extends SetPiece {
  private readonly image = new Image()

  constructor(gameContext: GameContext, x: number, y: number) {
    super(gameContext, {
      x,
      y,
      width: BLOCK_SIZE * 8,
      height: BLOCK_SIZE * 8,
    })

    this.image.src = 'Images/homestead.png'
  }

  closeDoor() {
    this.image.src = 'Images/homesteadClosed.png'
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
}
