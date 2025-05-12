import { outOfBounds } from '../mustachio/app-code'
import type { GameObject } from './game-object'
import { MovingGameObject } from './moving-game-object'
import type { Player } from './player'
import { direction } from './types'

export abstract class GameContext {
  gameArea: HTMLCanvasElement
  ui: HTMLCanvasElement
  uiContext: CanvasRenderingContext2D
  gameContext: CanvasRenderingContext2D

  gameObjects: GameObject[] = []
  uiObjects: GameObject[] = []
  score: number = 0
  gravity: number = 0.12
  currentDir: direction = direction.NONE
  time: number = 300 // 5 minutes

  private xSpeed: number = 1.5
  private mainLoop: number | null = null
  private timerLoop: number | null = null
  private readonly pressedKeys: string[] = []

  // Temporary player object until initialized
  protected abstract player: Player

  constructor() {
    let result = this.setupCanvas('canvas#game-layer')
    this.gameArea = result.canvas
    this.gameContext = result.context

    result = this.setupCanvas('canvas#ui-layer')
    this.ui = result.canvas
    this.uiContext = result.context

    window.addEventListener('keydown', (event) => this.onKeyDown(event))
    window.addEventListener('keyup', (event) => this.onKeyUp(event))
  }

  startMainLoop() {
    if (this.mainLoop) {
      clearInterval(this.mainLoop)
    }

    this.mainLoop = setInterval(() => {
      this.updateGameArea()
    }, 5)

    if (this.timerLoop) {
      clearInterval(this.timerLoop)
    }
    this.timerLoop = setInterval(() => {
      this.timerTick()
    }, 1000)
  }

  stopMainLoop() {
    if (this.mainLoop) {
      clearInterval(this.mainLoop)
      this.mainLoop = null
    }

    if (this.timerLoop) {
      clearInterval(this.timerLoop)
      this.timerLoop = null
    }
  }

  generateUniqueId(): number {
    let id = Math.floor(Math.random() * 10000)
    while (this.gameObjects.some((go) => go.objectId === id)) {
      id = Math.floor(Math.random() * 10000)
    }
    return id
  }

  // Assign a unique ID to the game object and add it to the gameObjects array
  addGameObject(gameObject: GameObject, beginning: boolean = false) {
    if (beginning) {
      this.gameObjects.unshift(gameObject)
    } else {
      this.gameObjects.push(gameObject)
    }
  }

  addUIObject(gameObject: GameObject) {
    this.uiObjects.push(gameObject)
  }

  removeGameObject(gameObject: GameObject) {
    const index = this.gameObjects.findIndex(
      (go) => go.objectId === gameObject.objectId,
    )
    if (index > -1) {
      this.gameObjects.splice(index, 1)
    }
  }

  removeUIObject(gameObject: GameObject) {
    const index = this.uiObjects.findIndex(
      (go) => go.objectId === gameObject.objectId,
    )
    if (index > -1) {
      this.uiObjects.splice(index, 1)
    }
  }

  private clear() {
    this.gameContext.clearRect(0, 0, this.gameArea.width, this.gameArea.height)
    this.uiContext.clearRect(0, 0, this.ui.width, this.ui.height)
  }

  private updateGameArea() {
    this.clear()

    const canMove = this.player.canMove(this.currentDir)
    for (const gameObject of this.gameObjects) {
      if (!gameObject.isStatic && canMove) {
        // We move the game object opposite to the player
        // to simulate the player moving
        if (this.currentDir === direction.LEFT) {
          gameObject.rect.x += this.xSpeed
        } else if (this.currentDir === direction.RIGHT) {
          gameObject.rect.x -= this.xSpeed
        }
      }

      if (!gameObject.isStatic && gameObject instanceof MovingGameObject) {
        gameObject.update()
      }

      if (outOfBounds(gameObject.rect, this)) {
        continue
      }

      gameObject.draw(this.gameContext)
    }

    // The ui layer is never out of bounds
    for (const uiObject of this.uiObjects) {
      uiObject.draw(this.uiContext)
    }

    if (!outOfBounds(this.player.rect, this)) {
      this.player.update()
      this.player.draw(this.gameContext)
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.repeat) {
      return
    }

    const key = event.key.toLocaleLowerCase().trim()

    if (key === 'p') {
      if (this.mainLoop) {
        this.stopMainLoop()
      } else {
        this.startMainLoop()
      }
    }

    if (this.mainLoop === null) {
      return
    }

    if (this.pressedKeys.includes(key)) {
      return
    }

    this.pressedKeys.push(key)
    this.player.customKeyPress(this.pressedKeys)
    if (key === 'arrowleft' || key === 'a') {
      this.currentDir = direction.LEFT
    } else if (key === 'arrowright' || key === 'd') {
      this.currentDir = direction.RIGHT
    } else if (key === 'arrowup' || key === 'w') {
      this.player.jump()
    } else if (key === 'shift') {
      this.xSpeed = 3
    }
  }

  private onKeyUp(event: KeyboardEvent) {
    const key = event.key.toLocaleLowerCase()

    this.pressedKeys.splice(
      this.pressedKeys.findIndex((pressedKey) => pressedKey === key),
      1,
    )

    if (
      key === 'arrowleft' ||
      key === 'a' ||
      key === 'arrowright' ||
      key === 'd'
    ) {
      if (
        this.pressedKeys.includes('arrowleft') ||
        this.pressedKeys.includes('a')
      ) {
        this.currentDir = direction.LEFT
      } else if (
        this.pressedKeys.includes('arrowright') ||
        this.pressedKeys.includes('d')
      ) {
        this.currentDir = direction.RIGHT
      } else {
        this.currentDir = direction.NONE
      }
    } else if (key === 'shift') {
      this.xSpeed = 1.5
    }
  }

  private setupCanvas(selector: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)
    if (!canvas) {
      throw new Error(`Canvas with selector ${selector} not found`)
    }

    canvas.width = 1426
    canvas.height = 810
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    return { canvas, context }
  }

  private timerTick() {
    this.time--
    if (this.time <= 0) {
      if (this.timerLoop) {
        clearInterval(this.timerLoop)
        this.timerLoop = null
      }

      for (const gameObject of this.gameObjects) {
        gameObject.isStatic = true
      }

      this.player.playerKill()
    }
  }
}
