import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { MobileControls } from '@/game-code/mobile-controls'
import { levelOne } from '@/game-code/custom/mustachio/levels/level-one'
import { MustachioGameContext } from '@/game-code/custom/mustachio/mustachi-game-context'

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

  const useMobileControls = window.innerWidth <= 1000

  return (
    <div>
      <h1>Mustachio</h1>
      <p>Welcome to the Mustachio game!</p>
      <canvas id="background-layer" className="gameCanvas" />
      <canvas id="game-layer" className="gameCanvas" />
      <canvas id="ui-layer" className="gameCanvas" />
      {useMobileControls && <MobileControls />}
    </div>
  )
}
