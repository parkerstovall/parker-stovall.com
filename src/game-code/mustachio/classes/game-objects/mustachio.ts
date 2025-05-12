import { collisionDetection, outOfBounds } from '../../app-code'
import type { GameContext } from '../../../shared/game-context'
import { Enemy } from './point-items/enemies/enemy'
import { StacheSeed } from './point-items/enemies/stache-seed'
import { Flag } from './set-pieces/flag'
import { FireStache } from './point-items/items/fire-stache'
import { Item } from './point-items/items/item'
import { Stacheroom } from './point-items/items/stacheroom'
import { FireBar } from './projectiles/fire-bar'
import { Laser } from './projectiles/laser'
import { FallingFloor } from './set-pieces/obstacles/falling-floor'
import { Wall } from './set-pieces/obstacles/wall'
import { WarpPipe } from './set-pieces/obstacles/warp-pipe'
import { Obstacle } from './set-pieces/obstacles/obstacle'
import { Block } from './set-pieces/blocks/block'
import { SetPiece } from './set-pieces/set-piece'
import { Player } from '@/game-code/shared/player'
import { direction } from '@/game-code/shared/types'
import type { GameObject } from '@/game-code/shared/game-object'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FireBall } from './projectiles/fire-ball'

export class Mustachio extends Player {
  private readonly imageStraight = new Image()
  private readonly imageLeft = new Image()
  private readonly imageRight = new Image()
  private readonly imageStraightFire = new Image()
  private readonly imageLeftFire = new Image()
  private readonly imageRightFire = new Image()
  private isFire = false
  private isBig = false
  private hitTimer: number | null = null
  private warpPipe: WarpPipe | null = null
  private canFire = true
  private deathAnimationTimeout: number | null = null

  constructor(gameContext: GameContext, objectId: number) {
    super(gameContext, objectId, {
      x: gameContext.gameArea.width / 4,
      y: (gameContext.gameArea.height / 4) * 3,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,
    })

    this.imageStraight.src = 'Images/Mustachio.png'
    this.imageLeft.src = 'Images/Mustachio_FacingLeft.png'
    this.imageRight.src = 'Images/Mustachio_FacingRight.png'
    this.imageStraightFire.src = 'Images/Mustachio_Fire.png'
    this.imageLeftFire.src = 'Images/Mustachio_FacingLeft_Fire.png'
    this.imageRightFire.src = 'Images/Mustachio_FacingRight_Fire.png'
  }

  draw(ctx: CanvasRenderingContext2D) {
    let image: HTMLImageElement

    if (!this.isDead) {
      if (!this.isFire) {
        if (this.gameContext.currentDir === direction.RIGHT) {
          image = this.imageRight
        } else if (this.gameContext.currentDir === direction.LEFT) {
          image = this.imageLeft
        } else {
          image = this.imageStraight
        }
      } else {
        if (this.gameContext.currentDir === direction.RIGHT) {
          image = this.imageRightFire
        } else if (this.gameContext.currentDir === direction.LEFT) {
          image = this.imageLeftFire
        } else {
          image = this.imageStraightFire
        }
      }
    } else {
      image = this.imageStraight
    }

    ctx.drawImage(
      image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }

  update(): void {
    if (this.isDead) {
      if (this.deathAnimationTimeout === null) {
        this.rect.y += this.speedY
        this.speedY += 0.06
      }

      return
    }
    this.blockedDirHor = direction.NONE
    this.blockedDirVert = direction.NONE

    this.warpPipe = null
    for (const gameObject of this.gameContext.gameObjects) {
      this.handleGameObject(gameObject)
    }

    this.handleGravity()
  }

  goDownPipe() {
    if (this.warpPipe === null) {
      return
    }

    console.log('warp') // TODO: Implement warp
  }

  private changeSize(isBig: boolean) {
    if (this.isBig === isBig) {
      return
    }

    this.isBig = isBig

    let runCount = 0
    let changeID: number | null = null
    const change = () => {
      runCount++
      if (runCount > 3 && changeID) {
        clearInterval(changeID)
      }
      if (this.isBig) {
        this.rect.height += 10
        this.rect.width += 3
      } else {
        this.rect.height -= 10
        this.rect.width -= 3
      }
    }

    changeID = setInterval(change, 115)
  }

  private changeFire(isFire: boolean) {
    if (this.isFire === isFire) {
      return
    }
    this.isFire = isFire

    if (this.isFire && !this.isBig) {
      this.changeSize(true)
    }

    let runCount = 0
    let changeID: number | null = null
    const change = () => {
      if (runCount < 6) {
        runCount++
        this.isFire = !this.isFire
        return
      }

      if (changeID) {
        clearInterval(changeID)
      }
    }

    changeID = setInterval(change, 115)
  }

  private handleGameObject(gameObject: GameObject) {
    // If the gameObject isn't in the canvas, skip it
    if (outOfBounds(gameObject.rect, this.gameContext)) {
      return
    }

    // If the gameObject isn't touching the player, skip it
    if (!collisionDetection(gameObject, this)) {
      return
    }

    if (gameObject instanceof SetPiece) {
      this.handleCollisionSetPiece(gameObject)
      return
    }

    // FireBar and Laser are projectiles that can hit the player
    // but only after a small amount of time
    // has passed since the player was hit
    if (gameObject instanceof FireBar || gameObject instanceof Laser) {
      this.playerHit()
      return
    }

    // If the gameObject is an enemy
    if (gameObject instanceof Enemy) {
      this.handleCollisionEnemy(gameObject)
      return
    }

    // If the gameobject is an item, collect it and act accordingly
    if (gameObject instanceof Item) {
      this.handleCollisionItem(gameObject)
      return
    }
  }

  private handleCollisionItem(item: Item) {
    this.gameContext.removeGameObject(item)
    this.gameContext.score += item.pointValue

    if (item instanceof Stacheroom) {
      this.changeSize(true)
    } else if (item instanceof FireStache) {
      this.changeFire(true)
    }
  }

  private handleCollisionEnemy(enemy: Enemy) {
    const bottomY = this.rect.y + this.rect.height - 10
    // Theres a small amount of time between the player hitting
    // the enemy and the enemy leaving the screen

    let stacheSeed: StacheSeed | null = null
    if (enemy instanceof StacheSeed) {
      stacheSeed = enemy
    }

    // You can jump on any enemy except for the StacheSeed
    if (bottomY <= enemy.rect.y && stacheSeed === null) {
      if (!enemy.isDead) {
        enemy.enemyHit()
      }

      this.landOnGameObject(enemy)

      // If the enemy is a StacheSeed OR if the player hits from
      // the side or below, then the player is hit
    } else if (stacheSeed === null || !stacheSeed.inPipe) {
      this.playerHit()
    }
  }

  private handleCollisionSetPiece(setPiece: SetPiece) {
    // The Flag is the goal
    if (setPiece instanceof Flag) {
      // win(); // TODO: Implement win
      console.log('You win!')
      return
    }

    // If you are on top of a setPiece, set speedY to 0
    // and set the rect.y to the top of the setPiece
    if (setPiece.rect.y >= this.rect.y && this.speedY >= 0) {
      this.landOnGameObject(setPiece)

      if (setPiece instanceof Obstacle) {
        this.handleCollisionObstacle(setPiece)
      }
    } else if (
      setPiece.rect.y + setPiece.rect.height - 10 <= this.rect.y &&
      !(setPiece instanceof Wall)
    ) {
      this.speedY = 1
      this.blockedDirVert = direction.UP
      if (setPiece instanceof Block) {
        setPiece.punch()
      }
    }

    // Left and Right
    else {
      if (setPiece.rect.x > this.rect.x) {
        this.blockedDirHor = direction.RIGHT
      }
      if (setPiece.rect.x < this.rect.x) {
        this.blockedDirHor = direction.LEFT
      }
    }
  }

  private handleGravity() {
    if (this.blockedDirVert !== direction.DOWN) {
      this.speedY += this.gameContext.gravity
      this.rect.y += this.speedY

      // Fall off the screen
      if (this.rect.y + this.rect.height >= this.gameContext.gameArea.height) {
        this.isBig = false
        this.isFire = false
        // killMethod(); // TODO: Implement killMethod
      }
    }
  }

  private handleCollisionObstacle(obstacle: Obstacle) {
    if (obstacle instanceof FallingFloor) {
      obstacle.startFall()
    }

    if (obstacle instanceof WarpPipe) {
      this.warpPipe = obstacle
    }
  }

  playerHit() {
    if (this.hitTimer !== null) {
      return
    }

    if (this.isFire) {
      this.changeFire(false)
    } else if (this.isBig) {
      this.changeSize(false)
    } else {
      this.playerKill()
    }

    this.hitTimer = setTimeout(() => {
      this.hitTimer = null
    }, 1000)
  }

  playerKill() {
    this.isDead = true
    this.deathAnimationTimeout = setTimeout(() => {
      this.deathAnimationTimeout = null
      this.speedY = -5
    }, 1000)
  }

  customKeyPress(pressedKeys: string[]): void {
    console.log(pressedKeys)
    if (pressedKeys.includes('')) {
      if (!this.isFire || !this.canFire) {
        return
      }

      this.canFire = false
      setTimeout(() => {
        this.canFire = true
      }, 250)

      const fire = new FireBall(
        this.gameContext,
        this.gameContext.generateUniqueId(),
        {
          x: this.rect.x + this.rect.width + 5,
          y: this.rect.y + this.rect.height / 2,
          width: 8,
          height: 8,
        },
      )

      fire.speedX = this.gameContext.currentDir === direction.LEFT ? -5 : 5
      fire.speedY = 0

      this.gameContext.addGameObject(fire)
    }
  }
}
