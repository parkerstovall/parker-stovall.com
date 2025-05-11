import type { rectangle } from '@/game-code/shared/types'
import { PointItem } from '../point-item'
import type { GameContext } from '@/game-code/shared/game-context'

export abstract class Enemy extends PointItem {
  isDead: boolean = false
  protected image: HTMLImageElement = new Image()
  protected imageSources: string[] = []
  protected imageSourceIndex: number = 0

  constructor(gameContext: GameContext, objectId: number, rect: rectangle) {
    super(gameContext, objectId, rect)

    setInterval(() => {
      this.setNextImage()
    }, 250)
  }

  setNextImage() {
    this.imageSourceIndex++
    if (this.imageSourceIndex >= this.imageSources.length) {
      this.imageSourceIndex = 0
    }
    this.image.src = this.imageSources[this.imageSourceIndex]
  }

  enemyHit() {
    this.isDead = true
    this.speedX = 0
    this.speedY = 0
    this.rect.height /= 2
    this.rect.y += this.rect.height / 2
    this.gameContext.score += this.pointValue

    setTimeout(() => {
      this.gameContext.removeGameObject(this)
    }, 500)
  }
}
