import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { MustachioGameContext } from '@/game-code/mustachio/mustachi-game-context'
import { testLevelOne } from '@/game-code/mustachio/levels/test-levels/test-level-one'

export const Route = createFileRoute('/mustachio')({
  component: MustachioGame,
})

let gc: MustachioGameContext | null = null

function MustachioGame() {
  useEffect(() => {
    if (!gc) {
      gc = new MustachioGameContext()
      gc.restart(testLevelOne)
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
