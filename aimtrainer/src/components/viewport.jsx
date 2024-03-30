import React, { useState, useEffect } from 'react';

export default function Viewport() {
  const [dinoPosition, setDinoPosition] = useState({ x: 0, y: 0 });
  const [obstaclePosition, setobstaclePosition] = useState({x: 0, y: 250});
  const [velocity, setVelocity] = useState(0);
  const gravity = 0.1;
  const jumpVelocity = -5; // Adjust jump velocity as needed

  useEffect(() => {
    const viewport = document.querySelector('.viewport_display');
    const viewportRect = viewport.getBoundingClientRect();
    const dinoHeight = document.querySelector('.dino').clientHeight;
    const obstacleHeight = document.querySelector('.obstacle').clientHeight

    const applyGravity = () => {
      setVelocity(prevVelocity => prevVelocity + gravity);
      setDinoPosition(prevPosition => ({
        ...prevPosition,
        y: Math.min(
          Math.max(prevPosition.y + velocity, 0),
          viewportRect.height - dinoHeight
        )
      }));
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Space' && dinoPosition.y === viewportRect.height - dinoHeight) {
        setVelocity(jumpVelocity);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const animationFrameId = requestAnimationFrame(applyGravity);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [velocity, dinoPosition.y]); // Re-run effect when velocity or dinoPosition.y changes

  return (
    <div className='viewport_display'>
      <div className='dino' style={{ top: dinoPosition.y }}></div>
      <div className='obstacle' style={{top: obstaclePosition.y, left: obstaclePosition.x}}></div>
    </div>
  );
}
