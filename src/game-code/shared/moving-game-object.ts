import { GameObject } from './game-object'

export abstract class MovingGameObject extends GameObject {
  speedX: number = 0
  speedY: number = 0

  abstract update(): void
}
