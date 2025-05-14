import type { GameContext } from './game-context'
import type { GameObject } from './game-objects/game-object'
import { direction, type rectangle } from '@/game-code/shared/types'

export function collisionDetection(go1: GameObject, go2: GameObject) {
  const rect1 = go1.rect
  const rect2 = go2.rect

  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export function getCollisionDirection(
  go1: GameObject,
  go2: GameObject,
): number {
  const rect1 = go1.rect
  const rect2 = go2.rect

  const dx = rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2)
  const dy = rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2)

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? direction.LEFT : direction.RIGHT
  } else {
    return dy > 0 ? direction.UP : direction.DOWN
  }
}

export function getReverseDirection(dir: direction) {
  switch (dir) {
    case direction.UP:
      return direction.DOWN
    case direction.DOWN:
      return direction.UP
    case direction.LEFT:
      return direction.RIGHT
    case direction.RIGHT:
      return direction.LEFT
    default:
      return direction.NONE
  }
}

export function outOfBounds(rect: rectangle, gameContext: GameContext) {
  const maxX = gameContext.gameArea.width * 2
  const minX = -gameContext.gameArea.width
  const maxY = gameContext.gameArea.height
  const minY = 0

  return rect.x < minX || rect.x > maxX || rect.y < minY || rect.y > maxY
}
