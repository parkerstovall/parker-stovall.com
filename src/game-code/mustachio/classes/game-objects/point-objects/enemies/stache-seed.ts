import {
  direction,
  type collision,
  type rectangle,
} from '@/game-code/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/shared/game-context'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameObject } from '@/game-code/shared/game-objects/game-object'

export class StacheSeed extends Enemy {
  readonly pointValue: number = 100
  inPipe: boolean = false

  private direction: direction
  private readonly parent: GameObject
  private readonly waitTime: number = 2500
  private readonly reversed: boolean

  constructor(gameContext: GameContext, parent: GameObject, reversed: boolean) {
    const rect: rectangle = {
      x: parent.rect.x + BLOCK_SIZE / 2,
      y: parent.rect.y + BLOCK_SIZE / 2,
      width: parent.rect.width / 2,
      height: parent.rect.height * 2,
    }

    super(gameContext, rect)

    this.reversed = reversed
    this.parent = parent
    this.speedY = 0.5
    if (reversed) {
      this.direction = direction.DOWN
      this.imageSources.push(
        'Images/stacheSeedReversed1.png',
        'Images/stacheSeedReversed.png',
      )
    } else {
      this.direction = direction.UP
      this.imageSources.push('Images/stacheSeed1.png', 'Images/stacheSeed2.png')
    }
  }

  // collisions with this enemy are handled by the player class
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_: collision[]): void {
    if (this.direction === direction.UP) {
      this.rect.y -= this.speedY

      if (this.rect.y + this.rect.height < this.parent.rect.y) {
        this.direction = direction.NONE
        if (this.reversed) {
          this.inPipe = true
        }

        setTimeout(() => {
          this.inPipe = false
          this.direction = direction.DOWN
        }, this.waitTime)
      }
    } else if (this.direction === direction.DOWN) {
      this.rect.y += this.speedY

      if (this.rect.y > this.parent.rect.y) {
        this.direction = direction.NONE
        if (!this.reversed) {
          this.inPipe = true
        }

        setTimeout(() => {
          this.inPipe = false
          this.direction = direction.UP
        }, this.waitTime)
      }
    }

    if (this.rect.y < 0) {
      this.isDead = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }
}
