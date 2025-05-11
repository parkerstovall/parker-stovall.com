import { Block } from './block'

export class Brick extends Block {
  protected punched = false

  punch() {
    if (this.punched) return
    this.punched = true
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log(ctx)
    throw new Error('Method not implemented.')
  }
}
