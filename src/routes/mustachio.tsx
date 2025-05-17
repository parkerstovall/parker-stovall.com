import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { testLevelOne } from '@/game-code/mustachio/levels/test-level-one'
import { GameContext } from '@/game-code/shared/game-context'

export const Route = createFileRoute('/mustachio')({
  component: MustachioGame,
})

function MustachioGame() {
  useEffect(() => {
    const gc = new GameContext()
    gc.restart(testLevelOne)
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
