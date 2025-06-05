import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { MustachioGameContext } from '@/game-code/mustachio/mustachi-game-context'
import { levelOne } from '@/game-code/mustachio/levels/level-one'
import { MobileControls } from '@/game-code/mobile-controls'

export const Route = createFileRoute('/mustachio')({
  component: MustachioGame,
})

let gc: MustachioGameContext | null = null

function MustachioGame() {
  useEffect(() => {
    if (!gc) {
      gc = new MustachioGameContext()
      gc.restart(levelOne)
    }
  }, [])

  return (
    <div>
      <h1>Mustachio</h1>
      <p>Welcome to the Mustachio game!</p>
      <canvas id="background-layer" className="gameCanvas" />
      <canvas id="game-layer" className="gameCanvas" />
      <canvas id="ui-layer" className="gameCanvas" />
      <MobileControls />
    </div>
  )
}
