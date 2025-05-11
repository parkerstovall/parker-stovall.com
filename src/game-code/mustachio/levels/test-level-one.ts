import type { GameContext } from '../../shared/game-context'
import { Floor } from '../classes/game-objects/set-pieces/obstacles/floor'

import type { levelPiece } from '@/game-code/shared/types'
import { Wall } from '../classes/game-objects/set-pieces/obstacles/wall'
import { StacheStalker } from '../classes/game-objects/point-items/enemies/stache-stalker'

export function testLevelOne(gameContext: GameContext) {
  const levelPieces: levelPiece[] = [
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

  gameContext.setLevel(levelPieces)
}
