import { collisionDetection, outOfBounds } from '../../app-code'
import type { GameContext } from '../../../shared/game-context'
import { Enemy } from './point-items/enemies/enemy'
import { StacheSeed } from './point-items/enemies/stache-seed'
import { Flag } from './set-pieces/flag'
import { FireStache } from './point-items/items/fire-stache'
import { Item } from './point-items/items/item'
import { Mustacheroom } from './point-items/items/mustacheroom'
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

export class Mustachio extends Player {
  readonly objectId = 0

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

  constructor(gameContext: GameContext, objectId: number) {
    super(gameContext, objectId, {
      x: gameContext.gameArea.width / 4,
      y: (gameContext.gameArea.height / 4) * 3,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,
    })

    // this.target = { x: this.rect.x + this.rect.width / 2, y: this.rect.y + this.rect.height / 2 }
    // this.offset= { x: (this.target.x - this.rect.x) / 300, y: (this.target.y - this.rect.y) / 300 }

    this.imageStraight.src = 'Images/Mustachio.png'
    this.imageLeft.src = 'Images/Mustachio_FacingLeft.png'
    this.imageRight.src = 'Images/Mustachio_FacingRight.png'
    this.imageStraightFire.src = 'Images/Mustachio_Fire.png'
    this.imageLeftFire.src = 'Images/Mustachio_FacingLeft_Fire.png'
    this.imageRightFire.src = 'Images/Mustachio_FacingRight_Fire.png'
  }

  draw(ctx: CanvasRenderingContext2D) {
    let image: HTMLImageElement

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

    this.handleGravity()

    ctx.drawImage(
      image,
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height,
    )
  }

  update(): void {
    this.blockedDirHor = direction.NONE
    this.blockedDirVert = direction.NONE

    this.warpPipe = null
    for (const gameObject of this.gameContext.gameObjects) {
      this.handleGameObject(gameObject)
    }
  }

  goDownPipe() {
    if (this.warpPipe === null) {
      return
    }

    console.log('warp') // TODO: Implement warp
  }

  private trySetBig() {
    if (this.isBig) {
      return
    }
    this.isBig = true
    // TODO: Implement grow animation
    // clearInterval(growID);
    // growID = setInterval(grow, 115);
  }

  private trySetFire() {
    if (this.isFire) {
      return
    }
    this.isFire = true
    this.isBig = true
    // changeTrack = 0;
    // changeID = setInterval(change, 115);
    // clearInterval(shrinkID);
    // clearInterval(growID);
    // growID = setInterval(grow, 115);
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

    if (item instanceof Mustacheroom) {
      this.trySetBig()
    } else if (item instanceof FireStache) {
      this.trySetFire()
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
      this.isFire = false
    } else if (this.isBig) {
      this.isBig = false
    } else {
      this.playerKill()
    }

    this.hitTimer = setTimeout(() => {
      this.hitTimer = null
    }, 1000)
  }

  playerKill() {
    console.log('playerKill') // TODO: Implement playerKill
  }
}
