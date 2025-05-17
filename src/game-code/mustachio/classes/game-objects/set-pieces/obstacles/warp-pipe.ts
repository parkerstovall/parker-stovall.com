import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameContext } from '@/game-code/shared/game-context'

export class WarpPipe extends Obstacle {
  readonly objectId = 0
  readonly setNewLevel: (gameContext: GameContext) => void

  constructor(
    gameContext: GameContext,
    x: number,
    y: number,
    setNewLevel: (gameContext: GameContext) => void,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE * 2,
      height: BLOCK_SIZE * 2,
    }

    super(gameContext, rect)

    this.setNewLevel = setNewLevel
  }

  enter() {
    this.setNewLevel(this.gameContext)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }
}
