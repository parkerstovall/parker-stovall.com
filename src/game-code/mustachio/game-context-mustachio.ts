import { GameContext } from '../shared/game-context'
import { Mustachio } from './classes/game-objects/mustachio'

export class GameContextMustachio extends GameContext {
  protected player: Mustachio

  constructor() {
    super()
    this.player = new Mustachio(this, this.generateUniqueId())
  }
}
