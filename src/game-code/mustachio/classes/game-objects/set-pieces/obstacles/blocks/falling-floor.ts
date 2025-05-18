import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { rectangle } from '@/game-code/shared/types'
import { Block } from './block'

export class FallingFloor extends Block {
  private isFalling: boolean = false
  private fallStarted: boolean = false

  startFall() {
    if (this.fallStarted) {
      return
    }

    this.fallStarted = true
    setTimeout(() => {
      this.isFalling = true
    }, 1000)
  }

  draw(ctx: CanvasRenderingContext2D) {
    // This logic SHOULD be in the update method,
    // but I decided to extend block rather than UpdatingGameObject
    // since it is a block

    if (this.isFalling) {
      this.rect.y += 5

      if (this.rect.y > this.gameContext.gameArea.height) {
        this.gameContext.removeGameObject(this)
      }
    }

    ctx.fillStyle = 'Bisque'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)

    const seeThroughRect: rectangle = {
      x: this.rect.x + BLOCK_SIZE / 3,
      y: this.rect.y + BLOCK_SIZE / 3,
      width: this.rect.width - (BLOCK_SIZE / 3) * 2,
      height: this.rect.height - (BLOCK_SIZE / 3) * 2,
    }

    ctx.clearRect(
      seeThroughRect.x,
      seeThroughRect.y,
      seeThroughRect.width,
      seeThroughRect.height,
    )
  }
}
