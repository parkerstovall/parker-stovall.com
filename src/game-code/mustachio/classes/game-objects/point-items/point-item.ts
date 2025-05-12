import { MovingGameObject } from '@/game-code/shared/moving-game-object'

export abstract class PointItem extends MovingGameObject {
  abstract pointValue: number

  collect() {
    this.gameContext.score += this.pointValue
    this.gameContext.removeGameObject(this)
  }
}
