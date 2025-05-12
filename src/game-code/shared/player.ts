import type { GameContext } from './game-context'
import { GameObject } from './game-object'
import { MovingGameObject } from './moving-game-object'
import { direction, type rectangle } from './types'

export abstract class Player extends MovingGameObject {
  isDead: boolean = false
  blockedDirHor: direction = direction.NONE
  blockedDirVert: direction = direction.NONE
  speedX: number = 0
  speedY: number = 0
  numJumps = 0

  protected readonly gameContext: GameContext

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)

    this.gameContext = gameContext
  }

  canMove(dir: direction) {
    return (
      !this.isDead &&
      (this.blockedDirHor === direction.NONE ||
        this.blockedDirVert === direction.NONE ||
        (this.blockedDirHor !== dir && this.blockedDirVert !== dir))
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

  landOnGameObject(gameObject: GameObject) {
    this.blockedDirVert = direction.DOWN
    this.rect.y = gameObject.rect.y - this.rect.height + 1
    this.numJumps = 0
    this.speedY = 0
  }

  abstract playerHit(): void

  abstract playerKill(): void

  abstract customKeyPress(pressedKeys: string[]): void
}
