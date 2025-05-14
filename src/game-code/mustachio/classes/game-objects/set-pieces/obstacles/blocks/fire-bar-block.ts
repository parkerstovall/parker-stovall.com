import type { GameContext } from '@/game-code/shared/game-context'
import { FireBar } from '../../../projectiles/fire-bar'
import { Block } from './block'

export class FireBarBlock extends Block {
  private readonly image: HTMLImageElement = new Image()
  constructor(
    gameContext: GameContext,
    objectId: number,
    x: number,
    y: number,
  ) {
    super(gameContext, objectId, x, y)

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
