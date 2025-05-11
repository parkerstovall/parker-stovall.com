import type { GameContext } from '../shared/game-context'
import type { GameObject } from '../shared/game-object'
import type { rectangle } from '@/game-code/shared/types'

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

export function outOfBounds(rect: rectangle, gameContext: GameContext) {
  const canvasWidth = gameContext.gameArea.width
  const canvasHeight = gameContext.gameArea.height

  return (
    rect.x + rect.width < 0 ||
    rect.x > canvasWidth ||
    rect.y + rect.height < 0 ||
    rect.y > canvasHeight
  )
}
