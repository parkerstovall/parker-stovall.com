import type { GameContext } from '@/game-code/shared/game-context'
import { Block } from './block'
import { FireCross } from '../../../projectiles/enemy-projectiles/fire-cross'
import type { direction } from '@/game-code/shared/types'

export class FireCrossBlock extends Block {
  private readonly image: HTMLImageElement = new Image()

  constructor(
    gameContext: GameContext,
    x: number,
    y: number,
    dirs: direction[],
  ) {
    super(gameContext, x, y)

    this.image.src = 'Images/obstacleBrick.png'

    for (const dir of dirs) {
      this.gameContext.addGameObject(new FireCross(gameContext, this, dir))
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
