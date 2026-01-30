import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { startMustachio } from 'mustachio-game'

export const Route = createFileRoute('/games/mustachio')({
  component: MustachioGame,
})

function MustachioGame() {
  useEffect(() => {
    startMustachio('game-container')
  }, [])

  // const useMobileControls = window.innerWidth <= 1000

  return (
    <div>
      <h1>Mustachio</h1>
      <p>Welcome to the Mustachio game!</p>
      <div id="game-container"></div>
      {/* {useMobileControls && <MobileControls />} */}
    </div>
  )
}
