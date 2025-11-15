import type { GameContext } from '@/game-code/custom/shared/game-context'
import { GameObject } from '@/game-code/custom/shared/game-objects/game-object'
import type { rectangle } from '@/game-code/custom/shared/types'

export abstract class UIObject extends GameObject {
  constructor(gameContext: GameContext, x: number, y: number) {
    const rect: rectangle = {
      x,
      y,
      width: 0,
      height: 0,
    }

    super(gameContext, rect)
  }
}
