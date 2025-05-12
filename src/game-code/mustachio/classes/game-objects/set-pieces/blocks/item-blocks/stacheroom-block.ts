import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { Stacheroom } from '../../../point-items/items/stacheroom'
import { ItemBlock } from './item-block'

export class StacheroomBlock extends ItemBlock {
  protected item

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)
    this.item = Stacheroom
  }
}
