import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameContext } from '@/game-code/shared/game-context'

export class Pipe extends Obstacle {
  constructor(gameContext: GameContext, x: number, y: number) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE * 2,
      height: BLOCK_SIZE * 2,
    }

    super(gameContext, rect)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }
}
