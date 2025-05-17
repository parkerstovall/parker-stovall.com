import type { GameContext } from '@/game-code/shared/game-context'
import { Block } from './block'

export class Wall extends Block {
  private readonly image: HTMLImageElement = new Image()

  constructor(gameContext: GameContext, x: number, y: number) {
    super(gameContext, x, y)

    this.image.src = 'Images/obstacleBrick.png'
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
