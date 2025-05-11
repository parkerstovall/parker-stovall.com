import type { GameContext } from './game-context'
import { GameObject } from './game-object'
import { direction, type rectangle } from './types'

export abstract class Player extends GameObject {
  blockedDirHor: direction = direction.NONE
  blockedDirVert: direction = direction.NONE
  speedY = 0
  numJumps = 0

  protected readonly gameContext: GameContext

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)

    this.gameContext = gameContext
  }

  canMove(dir: direction) {
    return (
      this.blockedDirHor === direction.NONE ||
      this.blockedDirVert === direction.NONE ||
      (this.blockedDirHor !== dir && this.blockedDirVert !== dir)
    )
  }

  jump() {
    if (this.numJumps >= 2) {
      return
    }

    this.speedY = -5.5
    this.numJumps++
    this.blockedDirVert = direction.NONE
    this.rect.y -= 5
  }
}
