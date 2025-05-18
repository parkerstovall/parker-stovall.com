import type { collision } from '@/game-code/shared/types'
import { Enemy } from './enemy'
import type { GameContext } from '@/game-code/shared/game-context'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Laser } from '../../projectiles/enemy-projectiles/laser'

export class StacheStreaker extends Enemy {
  readonly pointValue: number = 1250
  private readonly maxX: number
  private readonly minX: number
  private canMove: boolean = true
  private totalDistance: number = 0
  private readonly timeBetweenShots: number = 3500
  private readonly shotTime: number = 5000

  constructor(gameContext: GameContext, x: number, y: number) {
    super(
      gameContext,
      {
        x,
        y,
        width: BLOCK_SIZE * 2,
        height: BLOCK_SIZE * 1.5,
      },
      false,
    )

    this.maxX = x + BLOCK_SIZE * 4
    this.minX = x - BLOCK_SIZE * 4

    this.imageSources.push(
      'Images/stacheStreaker1.png',
      'Images/stacheStreaker2.png',
    )

    this.image.src = this.imageSources[0]
    this.speedX = 0.75
    this.shotTimer = setTimeout(() => {
      this.fireLaser()
    }, this.timeBetweenShots)
  }

  // This enemy doesn't collide with anything
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_: collision[]): void {
    if (!this.isDead && this.canMove) {
      this.rect.x += this.speedX
      this.totalDistance += this.speedX

      if (this.totalDistance >= this.maxX) {
        this.speedX = -Math.abs(this.speedX)
        this.image.src = this.imageSources[1]
      } else if (this.totalDistance <= this.minX) {
        this.speedX = Math.abs(this.speedX)
        this.image.src = this.imageSources[0]
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }

  private fireLaser(): void {
    this.gameContext.addGameObject(
      new Laser(this.gameContext, this, this.shotTime),
    )
    this.canMove = false
    this.setNextImage()

    this.shotTimer = setTimeout(() => {
      this.canMove = true
      this.setNextImage()

      this.shotTimer = setTimeout(() => {
        this.fireLaser()
      }, this.timeBetweenShots)
    }, this.shotTime)
  }
}
