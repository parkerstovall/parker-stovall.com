import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { FireStache } from '../../../point-items/items/fire-stache'
import { ItemBlock } from './item-block'

export class FireStacheBlock extends ItemBlock {
  protected item

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)
    this.item = FireStache
  }
}
