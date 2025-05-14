import type { rectangle } from '@/game-code/shared/types'
import type { GameContext } from '../game-context'

export abstract class GameObject {
  readonly rect: rectangle
  readonly objectId: number

  protected readonly gameContext: GameContext

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    this.gameContext = gameContext
    this.objectId = objectId
    this.rect = rect
  }

  abstract draw(ctx: CanvasRenderingContext2D): void
}
