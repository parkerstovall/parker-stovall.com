import { testLevelOne } from '@/game-code/mustachio/levels/test-level-one'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { GameContextMustachio } from '@/game-code/mustachio/game-context-mustachio'

export const Route = createFileRoute('/mustachio')({
  component: MustachioGame,
})

function MustachioGame() {
  useEffect(() => {
    const gc = new GameContextMustachio()
    testLevelOne(gc)
    gc.startMainLoop()
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
