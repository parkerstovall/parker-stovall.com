export function MobileControls() {
  // The buttons just translate to keydowns
  const leftClick = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
    window.dispatchEvent(event)
  }

  const rightClick = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
    window.dispatchEvent(event)
  }

  const jumpClick = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    window.dispatchEvent(event)
  }

  const fireClick = () => {
    const event = new KeyboardEvent('keydown', { key: ' ' })
    window.dispatchEvent(event)
  }

  return (
    <div className="mobile-controls gameCanvas">
      <button onMouseDown={leftClick} className="left"></button>
      <button onClick={rightClick} className="right"></button>
      <button onClick={jumpClick} className="jump"></button>
      <button onClick={fireClick} className="fire"></button>
    </div>
  )
}
