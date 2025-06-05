import { UIObject } from './ui-object'

export class ScoreDisplay extends UIObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'white'
    ctx.font = '40px Arial'
    ctx.fillText(`Score: ${this.gameContext.score}`, this.rect.x, this.rect.y)
  }
}
