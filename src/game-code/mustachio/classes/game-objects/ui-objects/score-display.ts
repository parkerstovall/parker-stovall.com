import { GameObject } from '@/game-code/shared/game-object'

export class ScoreDisplay extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'white'
    ctx.font = '40px Arial'
    ctx.fillText(`Score: ${this.gameContext.score}`, this.rect.x, this.rect.y)
  }
}
