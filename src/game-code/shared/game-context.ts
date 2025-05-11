import { outOfBounds } from '../mustachio/app-code'
import type { GameObject } from './game-object'
import type { Player } from './player'
import { direction, type levelPiece } from './types'

export abstract class GameContext {
  gameArea: HTMLCanvasElement
  // ui: HTMLCanvasElement;
  // uiContext: CanvasRenderingContext2D;
  context: CanvasRenderingContext2D
  gameObjects: GameObject[] = []
  score: number = 0
  gravity: number = 0.12
  currentDir: direction = direction.NONE

  private xSpeed: number = 1.5

  // Temporary player object until initialized
  protected abstract player: Player

  constructor() {
    const gameArea =
      document.querySelector<HTMLCanvasElement>('canvas#game-area')
    //const ui = document.querySelector<HTMLCanvasElement>("canvas#ui-layer");
    if (!gameArea) {
      // || !ui) {
      throw new Error('Game area or UI layer not found')
    }

    gameArea.width = 1426
    gameArea.height = 810
    this.gameArea = gameArea
    this.context = gameArea.getContext('2d') as CanvasRenderingContext2D
    //this.ui = ui;
    //this.uiContext = ui.getContext("2d") as CanvasRenderingContext2D;

    window.addEventListener('keydown', (event) => this.onKeyDown(event))
    window.addEventListener('keyup', (event) => this.onKeyUp(event))
  }

  startMainLoop() {
    setInterval(() => {
      this.updateGameArea()
    }, 5)
  }

  // Assign a unique ID to the game object and add it to the gameObjects array
  addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject)
  }

  removeGameObject(gameObject: GameObject) {
    const index = this.gameObjects.findIndex(
      (go) => go.objectId === gameObject.objectId,
    )
    if (index > -1) {
      this.gameObjects.splice(index, 1)
    }
  }

  setLevel(level: levelPiece[]) {
    this.clear()
    this.gameObjects = []
    for (const piece of level) {
      const gameObject = new piece.gameObject(
        this,
        this.generateUniqueId(),
        piece.rect,
      )
      this.addGameObject(gameObject)
    }
  }

  private clear() {
    this.context.clearRect(0, 0, this.gameArea.width, this.gameArea.height)
    //this.uiContext.clearRect(0, 0, this.ui.width, this.ui.height);
  }

  private updateGameArea() {
    this.clear()

    this.player.draw(this.context)
    const canMove = this.player.canMove(this.currentDir)

    for (const gameObject of this.gameObjects) {
      if (outOfBounds(gameObject.rect, this)) {
        continue
      }

      if (!gameObject.isStatic && canMove) {
        // We move the game object opposite to the player
        if (this.currentDir === direction.LEFT) {
          gameObject.rect.x += this.xSpeed
        } else if (this.currentDir === direction.RIGHT) {
          gameObject.rect.x -= this.xSpeed
        }
      }

      gameObject.draw(this.context)
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLocaleLowerCase().trim()
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
    if (
      key === 'arrowleft' ||
      key === 'a' ||
      key === 'arrowright' ||
      key === 'd'
    ) {
      this.currentDir = direction.NONE
    } else if (key === 'shift') {
      this.xSpeed = 1.5
    }
  }

  protected generateUniqueId(): number {
    let id = Math.floor(Math.random() * 10000)
    while (this.gameObjects.some((go) => go.objectId === id)) {
      id = Math.floor(Math.random() * 10000)
    }
    return id
  }
}
