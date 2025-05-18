import { MovingGameObject } from '@/game-code/shared/game-objects/moving-game-object'

export abstract class PointObject extends MovingGameObject {
  abstract pointValue: number

  collect() {
    this.gameContext.score += this.pointValue
    this.gameContext.removeGameObject(this)
  }
}
