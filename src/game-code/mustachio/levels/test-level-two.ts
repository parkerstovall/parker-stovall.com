import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'
import { ScoreDisplay } from '../classes/game-objects/ui-objects/score-display'
import { TimerDisplay } from '../classes/game-objects/ui-objects/timer-display'
import { BLOCK_SIZE } from '@/game-code/shared/constants'
import { Mustachio } from '../classes/game-objects/mustachio'
import { WarpPipe } from '../classes/game-objects/set-pieces/obstacles/warp-pipe'
import { caveOne } from './cave-one'

export function testLevelTwo(gameContext: GameContext) {
  gameContext.clearLevel()

  const mustachio = new Mustachio(gameContext, BLOCK_SIZE * 4, BLOCK_SIZE * 13)
  gameContext.setPlayer(mustachio)

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

  gameContext.addGameObject(
    new WarpPipe(gameContext, BLOCK_SIZE * 10, touchingFloor, caveOne),
  )

  gameContext.addUIObject(new ScoreDisplay(gameContext, BLOCK_SIZE, BLOCK_SIZE))

  gameContext.addUIObject(
    new TimerDisplay(gameContext, BLOCK_SIZE * 28, BLOCK_SIZE),
  )

  gameContext.startMainLoop()
}
