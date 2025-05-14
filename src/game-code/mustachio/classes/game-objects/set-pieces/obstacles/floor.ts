import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import type { GameContext } from '@/game-code/shared/game-context'
import { BLOCK_SIZE } from '@/game-code/shared/constants'

export class Floor extends Obstacle {
  constructor(gameContext: GameContext, objectId: number) {
    const rect: rectangle = {
      x: 0,
      y: gameContext.gameArea.height - BLOCK_SIZE,
      width: gameContext.gameArea.width,
      height: gameContext.gameArea.height,
    }

    super(gameContext, objectId, rect)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }
}
