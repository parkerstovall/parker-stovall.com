import type { GameContext } from '../../../shared/game-context'
import { Enemy } from './point-objects/enemies/enemy'
import { StacheSeed } from './point-objects/enemies/stache-seed'
import { Flag } from './set-pieces/flag'
import { FireStache } from './point-objects/items/fire-stache'
import { Item } from './point-objects/items/item'
import { Stacheroom } from './point-objects/items/stacheroom'
import { EnemyProjectile } from './projectiles/enemy-projectiles/enemy-projectile'
import { FallingFloor } from './set-pieces/obstacles/blocks/falling-floor'
import { WarpPipe } from './set-pieces/obstacles/warp-pipe'
import { Obstacle } from './set-pieces/obstacles/obstacle'
import { SetPiece } from './set-pieces/set-piece'
import { Player } from '@/game-code/shared/player'
import { direction, type collision } from '@/game-code/shared/types'
import { StacheBall } from './projectiles/stache-ball'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { FireBar } from './projectiles/enemy-projectiles/fire-bar'
import { PunchableBlock } from './set-pieces/obstacles/blocks/punchable-blockS/punchable-block'
import { ItemBlock } from './set-pieces/obstacles/blocks/punchable-blockS/item-block'
import { Brick } from './set-pieces/obstacles/blocks/punchable-blockS/brick'

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
  private crouched = false
  private goingDownPipe = false

  constructor(gameContext: GameContext, x: number, y: number) {
    super(gameContext, {
      x,
      y,
      width: BLOCK_SIZE * 0.66,
      height: BLOCK_SIZE * 0.66,
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
        if (this.gameContext.currentDir === direction.LEFT) {
          image = this.imageRight
        } else if (this.gameContext.currentDir === direction.RIGHT) {
          image = this.imageLeft
        } else {
          image = this.imageStraight
        }
      } else {
        if (this.gameContext.currentDir === direction.LEFT) {
          image = this.imageRightFire
        } else if (this.gameContext.currentDir === direction.RIGHT) {
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

  update(collisions: collision[]): void {
    if (this.goingDownPipe) {
      return // Let the goDownPipe method handle the update
    }

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

    for (const collision of collisions) {
      this.handleCollision(collision)
    }

    this.handleGravity()
  }

  goDownPipe() {
    if (this.warpPipe === null) {
      return
    }

    this.goingDownPipe = true
    this.rect.x =
      this.warpPipe.rect.x + this.warpPipe.rect.width / 2 - this.rect.width / 2
    this.rect.y = this.warpPipe.rect.y - this.rect.height

    let downAnimationID: number | null = null
    const downAnimation = () => {
      if (!this.warpPipe) {
        if (downAnimationID) {
          clearInterval(downAnimationID)
        }
        return
      }

      this.rect.y += 5

      if (this.rect.y >= this.warpPipe.rect.y + this.warpPipe.rect.height) {
        if (downAnimationID) {
          clearInterval(downAnimationID)
        }

        this.warpPipe.enter()
        this.warpPipe = null
        this.goingDownPipe = false
      }
    }

    downAnimationID = setInterval(downAnimation, 50)
  }

  private changeSize(isBig: boolean) {
    if (this.isBig === isBig) {
      return
    }

    this.isBig = isBig

    let runCount = 0
    let changeID: number | null = null
    const change = () => {
      if (++runCount > 3 && changeID) {
        clearInterval(changeID)
      }

      if (this.isBig) {
        this.rect.height += 10
        this.rect.y -= 10
        this.rect.width += 3
        this.rect.x -= 1.5
      } else {
        this.rect.height -= 10
        this.rect.y += 10
        this.rect.width -= 3
        this.rect.x += 1.5
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

  protected handleCollision(collision: collision) {
    this.handleCollisionGameObject(collision)
    this.handleCollisionDirection(collision)
  }

  private handleCollisionDirection(collision: collision) {
    if (
      collision.gameObject instanceof ItemBlock &&
      collision.gameObject.hidden
    ) {
      return
    }

    if (collision.gameObject instanceof Item) {
      return
    }

    if (collision.collisionDirection === direction.DOWN) {
      this.blockedDirVert = direction.DOWN
      this.landOnGameObject(collision.gameObject)
    } else if (collision.collisionDirection === direction.UP) {
      this.speedY = 1
      this.rect.y =
        collision.gameObject.rect.y + collision.gameObject.rect.height - 1
      this.blockedDirVert = direction.UP
    } else if (
      collision.collisionDirection === direction.LEFT &&
      this.gameContext.currentDir === direction.LEFT
    ) {
      this.speedX = 0
      this.rect.x = collision.gameObject.rect.x - this.rect.width + 1
      this.blockedDirHor = direction.LEFT
    } else if (
      collision.collisionDirection === direction.RIGHT &&
      this.gameContext.currentDir === direction.RIGHT
    ) {
      this.speedX = 0
      this.rect.x =
        collision.gameObject.rect.x + collision.gameObject.rect.width - 1
      this.blockedDirHor = direction.RIGHT
    }
  }

  private handleCollisionGameObject(collision: collision) {
    const gameObject = collision.gameObject

    // FireBar is a special case since it rotates
    // so it isnt an EnemyProjectile technically
    if (
      gameObject instanceof FireBar ||
      gameObject instanceof EnemyProjectile
    ) {
      this.playerHit()
      return
    }

    if (gameObject instanceof SetPiece) {
      this.handleCollisionSetPiece(collision.collisionDirection, gameObject)
      return
    }

    // If the gameObject is an enemy
    if (gameObject instanceof Enemy) {
      this.handleCollisionEnemy(collision.collisionDirection, gameObject)
      return
    }

    // If the gameobject is an item, collect it and act accordingly
    if (gameObject instanceof Item) {
      this.handleCollisionItem(gameObject)
      return
    }
  }

  private handleCollisionItem(item: Item) {
    item.collect()

    if (item instanceof Stacheroom) {
      this.changeSize(true)
    } else if (item instanceof FireStache) {
      this.changeFire(true)
    }
  }

  private handleCollisionEnemy(dir: direction, enemy: Enemy) {
    if (
      dir !== direction.DOWN &&
      (!(enemy instanceof StacheSeed) || !enemy.inPipe)
    ) {
      if (!enemy.isDead) {
        this.playerHit()
      }

      return
    } else if (dir === direction.DOWN) {
      this.landOnGameObject(enemy)
      enemy.enemyHit()
    }
  }

  private handleCollisionSetPiece(dir: direction, setPiece: SetPiece) {
    // The Flag is the goal
    if (setPiece instanceof Flag) {
      // win(); // TODO: Implement win
      console.log('You win!')
      return
    }

    // If you are on top of a setPiece, set speedY to 0
    // and set the rect.y to the top of the setPiece
    if (dir === direction.DOWN && setPiece instanceof Obstacle) {
      this.handleCollisionObstacle(setPiece)
    } else if (
      this.speedY <= 0 &&
      dir === direction.UP &&
      setPiece instanceof PunchableBlock
    ) {
      if (!(setPiece instanceof Brick) || this.isBig) {
        setPiece.punch()
      }

      this.speedY = 1
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

  private toggleCrouch(crouch: boolean) {
    if (this.crouched === crouch) {
      return
    }

    this.crouched = crouch
    let modifier: number
    if (crouch) {
      modifier = -(this.rect.height / 2)
    } else {
      modifier = this.rect.height
    }

    this.rect.y -= modifier
    this.rect.height += modifier
  }

  playerHit() {
    if (this.hitTimer !== null) {
      return
    }

    if (this.isFire) {
      this.changeFire(false)
    } else if (this.isBig) {
      this.toggleCrouch(false)
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
    this.gameContext.stopTimer()
    this.deathAnimationTimeout = setTimeout(() => {
      this.deathAnimationTimeout = null
      this.speedY = -5
      if (this.rect.y > this.gameContext.gameArea.height) {
        this.gameContext.removeGameObject(this)
        this.gameContext.stopMainLoop()
      }
    }, 1000)
  }

  customKeyDown(key: string): void {
    if (key === '') {
      if (!this.isFire || !this.canFire) {
        return
      }

      this.canFire = false
      setTimeout(() => {
        this.canFire = true
      }, 250)

      const fire = new StacheBall(
        this.gameContext,
        this.rect.x + this.rect.width + 5,
        this.rect.y + this.rect.height / 2,
      )

      fire.speedX = this.gameContext.currentDir === direction.LEFT ? -5 : 5
      fire.speedY = 0

      this.gameContext.addGameObject(fire)
    } else if (key === 'arrowdown' || key === 's') {
      if (this.warpPipe) {
        this.goDownPipe()
      } else {
        this.toggleCrouch(true)
      }
    }
  }

  customKeyUp(key: string): void {
    if (key === 'arrowdown' || key === 's') {
      this.toggleCrouch(false)
    }
  }
}
