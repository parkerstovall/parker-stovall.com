import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { PointItem } from '../point-item'

export abstract class Item extends PointItem {
  protected readonly fromItemBlock: boolean

  constructor(
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
    fromItemBlock: boolean = false,
  ) {
    super(gameContext, objectId, rect)

    this.fromItemBlock = fromItemBlock
    if (fromItemBlock) {
      this.speedY = -0.25
    }
  }
}
