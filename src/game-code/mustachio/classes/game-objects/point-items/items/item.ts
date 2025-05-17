import type { GameContext } from '@/game-code/shared/game-context'
import type { rectangle } from '@/game-code/shared/types'
import { PointItem } from '../point-item'
import { BLOCK_SIZE } from '@/game-code/shared/constants'

export abstract class Item extends PointItem {
  protected readonly fromItemBlock: boolean

  constructor(
    gameContext: GameContext,

    rect: rectangle,
    fromItemBlock: boolean = false,
  ) {
    if (fromItemBlock) {
      rect.x -= rect.width / 2
      rect.y += BLOCK_SIZE
    }

    super(gameContext, rect)

    this.fromItemBlock = fromItemBlock
    if (fromItemBlock) {
      this.speedY = -0.25
    }
  }
}
