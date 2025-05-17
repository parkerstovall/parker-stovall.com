import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
// { testLevelOne } from '@/game-code/mustachio/levels/test-level-one'
import { GameContext } from '@/game-code/shared/game-context'
//import { caveOne } from '@/game-code/mustachio/levels/cave-one'
import { testLevelTwo } from '@/game-code/mustachio/levels/test-level-two'

export const Route = createFileRoute('/mustachio')({
  component: MustachioGame,
})

let gc: GameContext | null = null

function MustachioGame() {
  useEffect(() => {
    if (!gc) {
      gc = new GameContext()
    }

    //gc.restart(testLevelOne)
    gc.restart(testLevelTwo)
    //gc.restart(caveOne)
  }, [])

  return (
    <div>
      <h1>Mustachio</h1>
      <p>Welcome to the Mustachio game!</p>
      <canvas id="game-layer" className="gameCanvas" />
      <canvas id="ui-layer" className="gameCanvas" />
    </div>
  )
}
