import { direction, type collision } from '@/game-code/custom/shared/types'
import type { GameContext } from '@/game-code/custom/shared/game-context'
import type { StacheCannon } from '../../set-pieces/obstacles/blocks/stache-cannon'
import { BLOCK_SIZE } from '@/game-code/custom/shared/constants'
import { Enemy } from './enemy'
import { outOfBounds } from '@/game-code/custom/shared/app-code'

export class StacheShot extends Enemy {
  readonly pointValue: number = 250
  private readonly shotSpeed = 3

  constructor(gameContext: GameContext, parent: StacheCannon, dir: direction) {
    const width = BLOCK_SIZE * 0.75
    const height = BLOCK_SIZE * 0.75
    const x = parent.rect.x + parent.rect.width / 2 - width / 2
    const y = parent.rect.y + parent.rect.height / 2 - height / 2
    super(
      gameContext,
      {
        x,
        y,
        width,
        height,
      },
      false,
    )

    if (dir === direction.LEFT) {
      this.image.src = '/Images/stacheShotLeft.webp'
      this.speedX = -this.shotSpeed
    } else if (dir === direction.RIGHT) {
      this.image.src = '/Images/stacheShotRight.webp'
      this.speedX = this.shotSpeed
    } else if (dir === direction.UP) {
      this.image.src = '/Images/stacheShotUp.webp'
      this.speedY = -this.shotSpeed
    } else if (dir === direction.DOWN) {
      this.image.src = '/Images/stacheShotDown.webp'
      this.speedY = this.shotSpeed
    } else {
      throw new Error('Invalid direction for StacheShot')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_: collision[]) {
    this.rect.x += this.speedX
    this.rect.y += this.speedY

    if (outOfBounds(this, this.gameContext)) {
      this.gameContext.removeGameObject(this)
    }
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
