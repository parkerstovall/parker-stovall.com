export function MobileControls() {
  // The buttons just translate to keydowns
  const onMouseDown = (key: string) => {
    const event = new KeyboardEvent('keydown', { key })
    window.dispatchEvent(event)
  }

  const onMouseUp = (key: string) => {
    const event = new KeyboardEvent('keyup', { key })
    window.dispatchEvent(event)
  }

  return (
    <div className="mobile-controls gameCanvas">
      <button
        onMouseDown={() => onMouseDown('ArrowLeft')}
        onMouseUp={() => onMouseUp('ArrowLeft')}
        className="left"
      ></button>
      <button
        onMouseDown={() => onMouseDown('ArrowRight')}
        onMouseUp={() => onMouseUp('ArrowRight')}
        className="right"
      ></button>
      <button
        onMouseDown={() => onMouseDown('ArrowUp')}
        onMouseUp={() => onMouseUp('ArrowUp')}
        className="jump"
      ></button>
      <button
        onMouseDown={() => onMouseDown(' ')}
        onMouseUp={() => onMouseUp(' ')}
        className="fire"
      ></button>
    </div>
  )
}
