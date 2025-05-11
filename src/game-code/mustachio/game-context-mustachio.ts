import { GameContext } from '../shared/game-context'
import { Mustachio } from './classes/game-objects/mustachio'
import { testLevelOne } from './levels/test-level-one'

export class GameContextMustachio extends GameContext {
  protected player: Mustachio

  constructor() {
    super()
    this.player = new Mustachio(this, this.generateUniqueId())
    this.levels.push(testLevelOne(this))
  }
}
