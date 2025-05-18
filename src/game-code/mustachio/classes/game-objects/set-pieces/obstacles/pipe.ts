import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import type { GameContext } from '@/game-code/shared/game-context'
import { StacheSeed } from '../../point-objects/enemies/stache-seed'

export class Pipe extends Obstacle {
  constructor(
    gameContext: GameContext,
    x: number,
    y: number,
    hasStacheSeed: boolean = false,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE * 2,
      height: BLOCK_SIZE * 2,
    }

    super(gameContext, rect)

    if (hasStacheSeed) {
      gameContext.addGameObject(new StacheSeed(gameContext, this))
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
  }
}
