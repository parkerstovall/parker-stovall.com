import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'

export class Floor extends Obstacle {
  private readonly grassRect: rectangle
  private readonly dirtRect: rectangle
  constructor(gameContext: GameContext, rect: rectangle) {
    super(gameContext, rect)

    this.grassRect = {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: BLOCK_SIZE / 3,
    }

    this.dirtRect = {
      x: rect.x,
      y: rect.y + BLOCK_SIZE / 3,
      width: rect.width,
      height: BLOCK_SIZE - BLOCK_SIZE / 3,
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'YellowGreen'
    ctx.fillRect(
      this.grassRect.x,
      this.grassRect.y,
      this.grassRect.width,
      this.grassRect.height,
    )

    ctx.fillStyle = 'SaddleBrown'
    ctx.fillRect(
      this.dirtRect.x,
      this.dirtRect.y,
      this.dirtRect.width,
      this.dirtRect.height,
    )
  }
}
