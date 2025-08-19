import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { PacManScene } from '@/game-code/phaser/pac-man/scenes/main-scene'

export const Route = createFileRoute('/games/pac-man')({
  component: PacManGame,
})

function PacManGame() {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameRef.current) return // prevent duplicates

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current!, // attach to this div
      backgroundColor: '#028af8',
      width: 1024,
      height: 768,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        max: {
          width: 800,
          height: 600,
        },
      },
      scene: [PacManScene],
    }

    gameRef.current = new Phaser.Game(config)

    return () => {
      // cleanup on unmount
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ margin: '10px 0' }}>Pac Man</h1>
        <p style={{ margin: '0' }}>Welcome to the Pac Man game!</p>
      </div>
      <div ref={containerRef} id="phaser-game" />
    </div>
  )
}
