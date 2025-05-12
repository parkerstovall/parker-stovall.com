import type { rectangle } from '@/game-code/shared/types'
import { Block } from './block'
import type { GameContext } from '@/game-code/shared/game-context'
import type { Item } from '../../point-items/items/item'
import { Coin } from '../../point-items/items/coin'
import { Stacheroom } from '../../point-items/items/stacheroom'
import { FireStache } from '../../point-items/items/fire-stache'

export class ItemBlock extends Block {
  protected punched = false
  private hidden: boolean

  private readonly image: HTMLImageElement = new Image()
  private readonly imageSource: string = 'Images/itemBlock.png'
  private readonly imageSourcePunched: string = 'Images/punchedBlock.png'

  protected item: new (
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
    fromItemBlock?: boolean,
  ) => Item

  constructor(
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
    hidden: boolean,
    itemType: string,
  ) {
    super(gameContext, objectId, rect)
    this.image.src = this.imageSource
    this.hidden = hidden

    switch (itemType) {
      case 'coin':
        this.item = Coin
        break
      case 'stacheroom':
        this.item = Stacheroom
        break
      case 'fire-stache':
        this.item = FireStache
        break
      default:
        throw new Error(`Unknown item type: ${itemType}`)
    }
  }

  punch() {
    if (this.punched) {
      return
    }

    this.punched = true
    this.hidden = false
    this.image.src = this.imageSourcePunched
    const newItem = new this.item(
      this.gameContext,
      this.gameContext.generateUniqueId(),
      {
        x: this.rect.x + this.rect.width / 2,
        y: this.rect.y - this.rect.height,
        width: this.rect.width,
        height: this.rect.height,
      },
      true,
    )

    this.gameContext.addGameObject(newItem, true)
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.hidden) {
      return
    }

    ctx.drawImage(
      this.image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }
}
