import type { GameContext } from '@/game-code/shared/game-context'
import type { Item } from '../../../../point-items/items/item'
import { Coin } from '../../../../point-items/items/coin'
import { Stacheroom } from '../../../../point-items/items/stacheroom'
import { FireStache } from '../../../../point-items/items/fire-stache'
import { PunchableBlock } from './punchable-block'

export class ItemBlock extends PunchableBlock {
  protected punched = false
  hidden: boolean

  private readonly image: HTMLImageElement = new Image()
  private readonly imageSource: string = 'Images/itemBlock.png'
  private readonly imageSourcePunched: string = 'Images/punchedBlock.png'

  protected item: new (
    gameContext: GameContext,
    objectId: number,
    x: number,
    y: number,
    fromItemBlock?: boolean,
  ) => Item

  constructor(
    gameContext: GameContext,
    objectId: number,
    x: number,
    y: number,
    hidden: boolean,
    itemType: string,
  ) {
    super(gameContext, objectId, x, y)
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
      this.rect.x + this.rect.width / 2,
      this.rect.y - this.rect.height,
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
