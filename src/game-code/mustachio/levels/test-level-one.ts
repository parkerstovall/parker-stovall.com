import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'

import type { Level, gamePiece } from '@/game-code/shared/types'
import { Wall } from '../classes/game-objects/set-pieces/obstacles/wall'
import { StacheStalker } from '../classes/game-objects/point-items/enemies/stache-stalker'
import { ScoreDisplay } from '../classes/game-objects/ui-objects/score-display'
import { TimerDisplay } from '../classes/game-objects/ui-objects/timer-display'

export function testLevelOne(gameContext: GameContext) {
  const gamePieces: gamePiece[] = [
    {
      gameObject: Floor,
      rect: {
        x: 0,
        y: gameContext.gameArea.height - 40,
        width: gameContext.gameArea.width,
        height: 40,
      },
    },
    {
      gameObject: Wall,
      rect: {
        x: gameContext.gameArea.width - 250,
        y: gameContext.gameArea.height - 80,
        width: 40,
        height: 40,
      },
    },
    {
      gameObject: Wall,
      rect: {
        x: gameContext.gameArea.width - 750,
        y: gameContext.gameArea.height - 80,
        width: 40,
        height: 40,
      },
    },
    {
      gameObject: StacheStalker,
      rect: {
        x: gameContext.gameArea.width - 600,
        y: gameContext.gameArea.height - 150,
        width: 40,
        height: 40,
      },
    },
  ]

  const uiPieces: gamePiece[] = [
    {
      gameObject: ScoreDisplay,
      rect: {
        x: 40,
        y: 40,
        width: 40,
        height: 40,
      },
    },
    {
      gameObject: TimerDisplay,
      rect: {
        x: gameContext.gameArea.width - 200,
        y: 40,
        width: 40,
        height: 40,
      },
    },
  ]

  const level: Level = {
    name: 'Test Level One',
    gameObjects: gamePieces,
    uiObjects: uiPieces,
  }

  return level
}
