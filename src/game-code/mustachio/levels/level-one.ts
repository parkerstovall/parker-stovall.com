import { GameContext } from '@/game-code/shared/game-context'
import {
  createBlockPyramid,
  createBlockSquare,
  createBlockWall,
} from './level-helpers'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'
import { ItemBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/punchable-blockS/item-block'
import { Brick } from '../classes/game-objects/set-pieces/obstacles/blocks/punchable-blockS/brick'
import { Wall } from '../classes/game-objects/set-pieces/obstacles/blocks/wall'
import { StacheStalker } from '../classes/game-objects/point-objects/enemies/stache-stalker'
import { Pipe } from '../classes/game-objects/set-pieces/obstacles/pipe'

export function levelOne(gameContext: GameContext) {
  gameContext.clearLevel()

  sectionOne(gameContext)
  sectionTwo(gameContext)

  //gameContext.setPlayerLocation(BLOCK_SIZE * 46, BLOCK_SIZE * 15)
  gameContext.startMainLoop()
}

function sectionOne(gameContext: GameContext) {
  // Floor
  gameContext.addGameObject(
    new Floor(gameContext, {
      x: 0,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 40,
      height: BLOCK_SIZE,
    }),
  )

  // First barrier
  createBlockWall(gameContext, 0, 0, 1, 17, 'wall')
  createBlockWall(gameContext, 1, 5, 1, 11, 'coin')

  gameContext.addGameObject(
    new ItemBlock(gameContext, BLOCK_SIZE * 6, BLOCK_SIZE * 14, false, 'coin'),
  )

  gameContext.addGameObject(
    new Brick(gameContext, BLOCK_SIZE * 7, BLOCK_SIZE * 14),
  )

  gameContext.addGameObject(
    new ItemBlock(gameContext, BLOCK_SIZE * 8, BLOCK_SIZE * 14, true, 'coin'),
  )

  gameContext.addGameObject(
    new ItemBlock(gameContext, BLOCK_SIZE * 8, BLOCK_SIZE * 11, true, 'coin'),
  )

  gameContext.addGameObject(
    new Brick(gameContext, BLOCK_SIZE * 9, BLOCK_SIZE * 14),
  )

  gameContext.addGameObject(
    new ItemBlock(gameContext, BLOCK_SIZE * 10, BLOCK_SIZE * 14, false, 'coin'),
  )

  createBlockPyramid(gameContext, 16, 16, 12, 'wall')

  gameContext.addGameObject(
    new Wall(gameContext, BLOCK_SIZE * 39, BLOCK_SIZE * 16),
  )

  gameContext.addGameObject(
    new StacheStalker(gameContext, BLOCK_SIZE * 28, BLOCK_SIZE * 14),
  )

  gameContext.addGameObject(
    new StacheStalker(gameContext, BLOCK_SIZE * 37.5, BLOCK_SIZE * 14),
  )
}

function sectionTwo(gameContext: GameContext) {
  gameContext.addGameObject(
    new Wall(gameContext, BLOCK_SIZE * 46, BLOCK_SIZE * 16),
  )

  gameContext.addGameObject(
    new ItemBlock(gameContext, BLOCK_SIZE * 49, BLOCK_SIZE * 13, false, 'coin'),
  )

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      BLOCK_SIZE * 49,
      BLOCK_SIZE * 9,
      true,
      'stacheroom',
    ),
  )

  createBlockSquare(gameContext, 53, 11, 6, 4, 'brick')
  createBlockWall(gameContext, 54, 12, 4, 2, 'coin')

  gameContext.addGameObject(
    new Pipe(gameContext, BLOCK_SIZE * 64, BLOCK_SIZE * 15, true),
  )

  // Floor
  gameContext.addGameObject(
    new Floor(gameContext, {
      x: BLOCK_SIZE * 46,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 20,
      height: BLOCK_SIZE,
    }),
  )
}
