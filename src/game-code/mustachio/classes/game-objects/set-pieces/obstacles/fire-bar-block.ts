import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { Obstacle } from './obstacle'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FireBar } from '../../projectiles/fire-bar'

export class FireBarBlock extends Obstacle {
  private readonly image: HTMLImageElement = new Image()
  constructor(
    gameContext: GameContext,
    objectId: number,
    x: number,
    y: number,
  ) {
    const rect: rectangle = {
      x,
      y,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,
    }

    super(gameContext, objectId, rect)

    this.image.src = 'Images/obstacleBrick.png'
    const fireBar = new FireBar(
      gameContext,
      gameContext.generateUniqueId(),
      this.rect.x + this.rect.width / 2 - 5,
      this.rect.y + this.rect.height / 2 - 50,
      this,
    )

    this.gameContext.addGameObject(fireBar)
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
