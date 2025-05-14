import type { GameObject } from './game-objects/game-object'

export enum direction {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
  NONE = 0,
}

export type rectangle = {
  x: number
  y: number
  width: number
  height: number
}

export type collision = {
  gameObjectOne: GameObject
  gameObjectTwo: GameObject
  collisionDirection: direction
}
