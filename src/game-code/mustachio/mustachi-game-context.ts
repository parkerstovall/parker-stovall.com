import { BLOCK_SIZE } from '../shared/constants'
import { GameContext } from '../shared/game-context'
import { Mustachio } from './classes/game-objects/mustachio'
import { ScoreDisplay } from './classes/game-objects/ui-objects/score-display'
import { TimerDisplay } from './classes/game-objects/ui-objects/timer-display'

export class MustachioGameContext extends GameContext {
  protected readonly gameName = 'Mustachio'
  protected readonly player: Mustachio

  constructor() {
    super()

    // Start mustachio with default position
    this.player = new Mustachio(this, BLOCK_SIZE * 4, BLOCK_SIZE * 13)
    this.addGameObject(this.player)

    // Add score and timer displays
    this.addUIObject(new ScoreDisplay(this, BLOCK_SIZE, BLOCK_SIZE))
    this.addUIObject(new TimerDisplay(this, BLOCK_SIZE * 28, BLOCK_SIZE))
  }
}
