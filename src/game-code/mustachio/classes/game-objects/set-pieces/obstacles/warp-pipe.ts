import type { GameContext } from '@/game-code/shared/game-context'
import { Pipe } from './pipe'

export class WarpPipe extends Pipe {
  readonly objectId = 0
  readonly setNewLevel: (gameContext: GameContext) => void

  constructor(
    gameContext: GameContext,
    x: number,
    y: number,
    setNewLevel: (gameContext: GameContext) => void,
    hasStacheSeed: boolean = false,
  ) {
    super(gameContext, x, y, hasStacheSeed)
    this.setNewLevel = setNewLevel
  }

  enter() {
    this.setNewLevel(this.gameContext)
  }
}
