import {
  getCollisionDirection,
  getReverseDirection,
  outOfBounds,
} from './app-code'
import type { GameObject } from './game-objects/game-object'
import { Player } from './player'
import { RotatingGameObject } from './game-objects/rotating-game-object'
import { direction, type collision } from './types'
import { UpdatingGameObject } from './game-objects/updating-game-object'
import { Enemy } from '../mustachio/classes/game-objects/point-objects/enemies/enemy'

export class GameContext {
  score: number = 0
  currentDir: direction = direction.NONE
  time: number = 300 // 5 minutes

  readonly gravity: number = 0.1
  readonly gameArea: HTMLCanvasElement
  readonly ui: HTMLCanvasElement
  readonly uiContext: CanvasRenderingContext2D
  readonly gameContext: CanvasRenderingContext2D

  private xSpeed: number = 1.5
  private mainLoop: number | null = null
  private timerLoop: number | null = null
  private isStatic: boolean = false

  private readonly pressedKeys: string[] = []
  private readonly gameObjects: GameObject[] = []
  private readonly uiObjects: GameObject[] = []
  private readonly contextId: number = Math.floor(Math.random() * 1000000)

  // Temporary player object until initialized
  private player: Player | undefined

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

  protected setPlayer(player: Player) {
    if (this.player) {
      return
    }

    this.player = player
    this.addGameObject(player, true)
  }

  getPlayer() {
    return this.player
  }

  setPlayerLocation(x: number, y: number) {
    if (this.player) {
      this.player.rect.x = x
      this.player.rect.y = y
    }
  }

  startMainLoop() {
    console.log('Main loop started: ' + this.contextId)

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
    console.log('Main loop stopped: ' + this.contextId)
    if (this.mainLoop) {
      clearInterval(this.mainLoop)
      this.mainLoop = null
    }

    if (this.timerLoop) {
      clearInterval(this.timerLoop)
      this.timerLoop = null
    }
  }

  clearLevel() {
    this.isStatic = false
    this.stopMainLoop()

    for (const gameObject of this.gameObjects) {
      if (gameObject instanceof Enemy) {
        gameObject.dispose()
      }
    }

    this.gameObjects.splice(0, this.gameObjects.length)

    if (this.player) {
      this.addGameObject(this.player)
    }
  }

  setStatic(isStatic: boolean) {
    this.isStatic = isStatic
  }

  // Assign a unique ID to the game object and add it to the gameObjects array
  addGameObject(gameObject: GameObject, beginning: boolean = false) {
    const gameObjectInList = this.gameObjects.find(
      (go) => go.objectId === gameObject.objectId,
    )

    if (gameObject instanceof Player) {
      console.log(gameObjectInList)
    }

    if (gameObjectInList) {
      // If the game object is already in the list, we don't need to add it again
      return
    }

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

  restart(levelFunc: (gc: GameContext) => void) {
    this.stopMainLoop()
    this.gameObjects.splice(0, this.gameObjects.length)
    levelFunc(this)
  }

  validateNewObjectId(objectId: number) {
    const gameObject = this.gameObjects.find((go) => go.objectId === objectId)
    return gameObject === undefined
  }

  stopTimer() {
    if (this.timerLoop) {
      clearInterval(this.timerLoop)
      this.timerLoop = null
    }
  }

  private clear() {
    this.gameContext.clearRect(0, 0, this.gameArea.width, this.gameArea.height)
    this.uiContext.clearRect(0, 0, this.ui.width, this.ui.height)
  }

  private updateGameArea() {
    this.clear()
    const gameObjectsInUpdateArea = this.getGameObjectsToUpdate()
    const gameObjectCollisions = this.getGameObjectsWithCollisions(
      gameObjectsInUpdateArea,
    )

    // Update the game objects in the game area
    for (const gameObject of gameObjectsInUpdateArea) {
      if (gameObject instanceof UpdatingGameObject) {
        const collisions = gameObjectCollisions.get(gameObject.objectId)
        gameObject.update(collisions ?? [])
      }

      gameObject.draw(this.gameContext)
    }

    // The ui layer is never out of bounds
    for (const uiObject of this.uiObjects) {
      uiObject.draw(this.uiContext)
    }

    const canMove = this.player?.canMove(this.currentDir)
    if (!canMove) {
      return
    }

    if (!this.isStatic) {
      // Always move every game object according to player speed
      for (const gameObject of this.gameObjects) {
        if (!(gameObject instanceof Player)) {
          // We move the game object opposite to the player
          // to simulate the player moving
          if (this.currentDir === direction.RIGHT) {
            gameObject.rect.x += this.xSpeed
          } else if (this.currentDir === direction.LEFT) {
            gameObject.rect.x -= this.xSpeed
          }
        }
      }
    } else if (this.player) {
      if (this.currentDir === direction.RIGHT) {
        this.player.rect.x -= this.xSpeed
      } else if (this.currentDir === direction.LEFT) {
        this.player.rect.x += this.xSpeed
      }
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
    this.player?.customKeyDown(key)

    if (key === 'arrowleft' || key === 'a') {
      this.currentDir = direction.RIGHT
    } else if (key === 'arrowright' || key === 'd') {
      this.currentDir = direction.LEFT
    } else if (key === 'arrowup' || key === 'w') {
      this.player?.jump()
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

    this.player?.customKeyUp(key)

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
        this.currentDir = direction.RIGHT
      } else if (
        this.pressedKeys.includes('arrowright') ||
        this.pressedKeys.includes('d')
      ) {
        this.currentDir = direction.LEFT
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

    canvas.width = 1920
    canvas.height = 1080
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

      this.isStatic = true
      this.player?.playerKill()
    }
  }

  // This function returns an array of game objects that are
  // within the bounds of the game area
  private getGameObjectsToUpdate() {
    return this.gameObjects.filter((gameObject) => {
      return !outOfBounds(gameObject.rect, this)
    })
  }

  // This function checks for collisions between game objects
  // and returns an array of collision objects
  // Each collision object contains the two game objects involved in the collision
  // and the direction of the collision
  // This allows us to handle collisions between game objects without
  // having to check for collisions more than once
  private getGameObjectsWithCollisions(gameObjects: GameObject[]) {
    const collisons: Map<number, collision[]> = new Map()
    for (const gameObject of gameObjects) {
      this.getCollisionForGameObject(gameObject, gameObjects, collisons)
    }

    return collisons
  }

  private getCollisionForGameObject(
    gameObject: GameObject,
    gameObjects: GameObject[],
    collisons: Map<number, collision[]>,
  ) {
    for (const otherGameObject of gameObjects) {
      this.getCollisionForGameObjects(gameObject, otherGameObject, collisons)
    }
  }

  private getCollisionForGameObjects(
    gameObject: GameObject,
    otherGameObject: GameObject,
    collisions: Map<number, collision[]>,
  ) {
    if (gameObject.objectId === otherGameObject.objectId) {
      return
    }

    if (!collisions.has(gameObject.objectId)) {
      collisions.set(gameObject.objectId, [])
    } else {
      // If the game object has already been added to the collisions map
      // we don't need to check for collisions again
      const goCollisions = collisions.get(gameObject.objectId)
      if (goCollisions) {
        for (const collision of goCollisions) {
          if (collision.gameObject.objectId === otherGameObject.objectId) {
            return
          }
        }
      }
    }

    const collisionDirection = this.getCollisionDirectionForGameObjects(
      gameObject,
      otherGameObject,
    )

    if (collisionDirection !== null) {
      // Add 2 collision objects to the array
      // one for each game object
      const collision = {
        gameObject: otherGameObject,
        collisionDirection,
      }

      const reversedCollision = {
        gameObject: gameObject,
        collisionDirection: getReverseDirection(collisionDirection),
      }

      const goCollisions = collisions.get(gameObject.objectId)
      if (goCollisions) {
        goCollisions.push(collision)
        collisions.set(gameObject.objectId, goCollisions)
      }

      const otherGoCollisions = collisions.get(otherGameObject.objectId)
      if (otherGoCollisions) {
        otherGoCollisions.push(reversedCollision)
        collisions.set(otherGameObject.objectId, otherGoCollisions)
      }
    }
  }

  private getCollisionDirectionForGameObjects(
    gameObject: GameObject,
    otherGameObject: GameObject,
  ) {
    let collisionDirection: direction | null = null
    if (gameObject instanceof RotatingGameObject) {
      if (
        otherGameObject instanceof Player &&
        gameObject.hitDetection(otherGameObject.rect.x, otherGameObject.rect.y)
      ) {
        collisionDirection = direction.NONE
      }
    } else if (otherGameObject instanceof RotatingGameObject) {
      if (
        gameObject instanceof Player &&
        otherGameObject.hitDetection(gameObject.rect.x, gameObject.rect.y)
      ) {
        collisionDirection = direction.NONE
      }
    } else {
      collisionDirection = getCollisionDirection(gameObject, otherGameObject)
    }

    return collisionDirection
  }
}
