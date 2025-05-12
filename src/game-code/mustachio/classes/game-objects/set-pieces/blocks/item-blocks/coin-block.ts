import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { StandingCoin } from '../../../point-items/items/standing-coin'
import { ItemBlock } from './item-block'

export class CoinBlock extends ItemBlock {
  protected item

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)
    this.item = StandingCoin
  }
}
