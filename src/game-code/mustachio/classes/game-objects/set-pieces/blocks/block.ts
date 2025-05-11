import { SetPiece } from '../set-piece'

export abstract class Block extends SetPiece {
  protected abstract punched: boolean
  abstract punch(): void
}
