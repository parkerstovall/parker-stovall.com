import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
// { testLevelOne } from '@/game-code/mustachio/levels/test-level-one'
//import { caveOne } from '@/game-code/mustachio/levels/cave-one'
import { testLevelTwo } from '@/game-code/mustachio/levels/test-level-two'
import { MustachioGameContext } from '@/game-code/mustachio/mustachi-game-context'

export const Route = createFileRoute('/mustachio')({
  component: MustachioGame,
})

let gc: MustachioGameContext | null = null

function MustachioGame() {
  useEffect(() => {
    if (!gc) {
      gc = new MustachioGameContext()
      //gc.restart(testLevelOne)
      //gc.restart(caveOne)
      gc.restart(testLevelTwo)
    }
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
