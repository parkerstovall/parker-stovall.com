import type { GameContext } from '@/game-code/shared/game-context'
import { Block } from './block'
import { direction } from '@/game-code/shared/types'
import { StacheShot } from '../../../point-objects/enemies/stache-shot'
import { outOfBounds } from '@/game-code/shared/app-code'

export class StacheCannon extends Block {
  private readonly image: HTMLImageElement = new Image()
  private readonly shotTimer: number

  constructor(gameContext: GameContext, x: number, y: number, dir: direction) {
    super(gameContext, x, y)
    if (dir === direction.UP) {
      this.image.src = 'Images/cannonUp.png'
    } else if (dir === direction.DOWN) {
      this.image.src = 'Images/cannonDown.png'
    } else if (dir === direction.LEFT) {
      this.image.src = 'Images/cannonLeft.png'
    } else if (dir === direction.RIGHT) {
      this.image.src = 'Images/cannonRight.png'
    } else {
      throw new Error('Invalid direction for StacheCannon')
    }

    this.shotTimer = setInterval(() => {
      if (outOfBounds(this, this.gameContext)) {
        return
      }

      this.gameContext.addGameObject(
        new StacheShot(this.gameContext, this, dir),
        true,
      )
    }, 6000)
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

  dispose() {
    clearInterval(this.shotTimer)
  }
}
