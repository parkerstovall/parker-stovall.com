import type { GameContext } from '@/game-code/shared/game-context'
import { CaveWall } from '../../classes/game-objects/set-pieces/obstacles/blocks/cave-wall'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Coin } from '../../classes/game-objects/point-objects/items/coin'
import { Pipe } from '../../classes/game-objects/set-pieces/obstacles/pipe'
import { WarpPipe } from '../../classes/game-objects/set-pieces/obstacles/warp-pipe'
import { testLevelTwo } from '../test-levels/test-level-two'
import { ItemBlock } from '../../classes/game-objects/set-pieces/obstacles/blocks/punchable-blockS/item-block'

export function caveOne(
  gameContext: GameContext,
  previousLevels: string[] = [],
) {
  gameContext.clearLevel()
  gameContext.setStatic(true)

  // Cave walls
  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: -gameContext.gameArea.width,
      y: 0,
      width: gameContext.gameArea.width + BLOCK_SIZE * 4,
      height: gameContext.gameArea.height,
    }),
  )

  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: BLOCK_SIZE * 28,
      y: 0,
      width: gameContext.gameArea.width + BLOCK_SIZE * 4,
      height: gameContext.gameArea.height,
    }),
  )

  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: BLOCK_SIZE * 4,
      y: BLOCK_SIZE * 16,
      width: BLOCK_SIZE * 24,
      height: BLOCK_SIZE * 2,
    }),
  )

  gameContext.addGameObject(
    new CaveWall(gameContext, {
      x: BLOCK_SIZE * 4,
      y: 0,
      width: BLOCK_SIZE * 24,
      height: BLOCK_SIZE * 2,
    }),
  )

  gameContext.addGameObject(
    new Pipe(gameContext, BLOCK_SIZE * 4, BLOCK_SIZE * 2),
  )

  gameContext.addGameObject(
    new WarpPipe(gameContext, BLOCK_SIZE * 26, BLOCK_SIZE * 14, (gc) => {
      testLevelTwo(gc, [...previousLevels, 'caveOne'])
    }),
  )

  for (let i = 7; i < 24; i += 2) {
    for (let j = 10; j < 16; j += 2) {
      gameContext.addGameObject(
        new Coin(gameContext, BLOCK_SIZE * i, BLOCK_SIZE * j),
      )
    }
  }

  gameContext.addGameObject(
    new ItemBlock(
      gameContext,
      BLOCK_SIZE * 27,
      BLOCK_SIZE * 9,
      true,
      'fire-stache',
    ),
  )

  gameContext.setPlayerLocation(BLOCK_SIZE * 4.5, BLOCK_SIZE * 5)

  gameContext.startMainLoop()
}
