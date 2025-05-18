import { GameContext } from '@/game-code/shared/game-context'
import { createCoinWall, createPyramid, createWall } from './level-helpers'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'
import { ItemBlock } from '../classes/game-objects/set-pieces/obstacles/blocks/punchable-blockS/item-block'
import { Brick } from '../classes/game-objects/set-pieces/obstacles/blocks/punchable-blockS/brick'
import { Wall } from '../classes/game-objects/set-pieces/obstacles/blocks/wall'
import { StacheStalker } from '../classes/game-objects/point-objects/enemies/stache-stalker'

export function levelOne(gameContext: GameContext) {
  gameContext.clearLevel()

  sectionOne(gameContext)

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
  createWall(gameContext, 0, 0, 1, 17)
  createCoinWall(gameContext, 1, 5, 1, 11)

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

  createPyramid(gameContext, 16, 16, 12)

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
