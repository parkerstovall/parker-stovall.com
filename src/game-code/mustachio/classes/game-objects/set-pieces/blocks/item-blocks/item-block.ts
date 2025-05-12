import type { rectangle } from '@/game-code/shared/types'
import { Block } from '../block'
import type { GameContext } from '@/game-code/shared/game-context'
import type { Item } from '../../../point-items/items/item'

export abstract class ItemBlock extends Block {
  protected punched = false
  private readonly image: HTMLImageElement = new Image()
  private readonly imageSource: string = 'Images/itemBlock.png'
  private readonly imageSourcePunched: string = 'Images/punchedBlock.png'
  protected abstract item: new (
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
    fromItemBlock?: boolean,
  ) => Item

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)
    this.image.src = this.imageSource
  }

  punch() {
    if (this.punched) {
      return
    }

    this.punched = true
    this.image.src = this.imageSourcePunched
    const newItem = new this.item(
      this.gameContext,
      this.gameContext.generateUniqueId(),
      {
        x: this.rect.x,
        y: this.rect.y - this.rect.height,
        width: this.rect.width,
        height: this.rect.height,
      },
      true,
    )

    this.gameContext.addGameObject(newItem, true)
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
