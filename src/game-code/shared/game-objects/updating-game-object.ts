import type { collision } from '../types'
import { GameObject } from './game-object'

export abstract class UpdatingGameObject extends GameObject {
  abstract update(collisions: collision[]): void
}
