import type { GameContext } from './game-context'
import { GameObject } from './game-object'

export enum direction {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
  NONE = 0,
}

export type levelPiece = {
  rect: rectangle
  gameObject: new (
    gameContext: GameContext,
    objectId: number,
    rect: rectangle,
  ) => GameObject
}
export type rectangle = {
  x: number
  y: number
  width: number
  height: number
}
