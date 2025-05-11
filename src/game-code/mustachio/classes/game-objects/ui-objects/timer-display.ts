import { GameObject } from '@/game-code/shared/game-object'

export class TimerDisplay extends GameObject {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'white'
    ctx.font = '40px Arial'
    ctx.fillText(`Time: ${this.gameContext.time}`, this.rect.x, this.rect.y)
  }
}
