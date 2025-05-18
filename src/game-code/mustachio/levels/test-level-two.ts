import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { WarpPipe } from '../classes/game-objects/set-pieces/obstacles/warp-pipe'
import { caveOne } from './cave-one'
import { Pipe } from '../classes/game-objects/set-pieces/obstacles/pipe'

export function testLevelTwo(
  gameContext: GameContext,
  previousLevels: string[] = [],
) {
  gameContext.clearLevel()

  if (previousLevels.includes('caveOne')) {
    gameContext.setPlayerLocation(BLOCK_SIZE * 18.5, BLOCK_SIZE * 2.5)
  }

  gameContext.addGameObject(
    new Floor(gameContext, {
      x: 0,
      y: BLOCK_SIZE * 17,
      width: BLOCK_SIZE * 32,
      height: BLOCK_SIZE,
    }),
  )

  // The game canvas is 32 blocks wide
  // and 18 blocks tall

  const touchingFloor = BLOCK_SIZE * 16

  let pipe: Pipe
  if (previousLevels.includes('caveOne')) {
    pipe = new Pipe(gameContext, BLOCK_SIZE * 10, touchingFloor, true)
  } else {
    pipe = new WarpPipe(
      gameContext,
      BLOCK_SIZE * 10,
      touchingFloor,
      (gc) => caveOne(gc, [...previousLevels, 'testLevelTwo']),
      true,
    )
  }

  gameContext.addGameObject(pipe)

  gameContext.addGameObject(new Pipe(gameContext, BLOCK_SIZE * 18, 0))

  gameContext.startMainLoop()
}
