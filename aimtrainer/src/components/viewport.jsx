import React, { useState, useEffect } from 'react';

export default function Viewport() {
  const [dinoPosition, setDinoPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [obstacle, setObstacle] = useState({ position: 0, height: 0 });
  const [obstacleSpeed, setObstacleSpeed] = useState(2); // Adjust obstacle speed as needed
  const gravity = 0.1;
  const jumpVelocity = -5; // Adjust jump velocity as needed

  useEffect(() => {
    const viewport = document.querySelector('.viewport_display');
    const viewportRect = viewport.getBoundingClientRect();
    const dinoHeight = document.querySelector('.dino').clientHeight;

    const addObstacle = () => {
      const obstacleHeight = Math.floor(Math.random() * (viewportRect.height - 100)) + 50; // Generate random height for obstacle
      setObstacle({
        position: viewportRect.width, // Start obstacle at right edge of viewport
        height: obstacleHeight,
      });
    };

    const applyGravity = () => {
      setVelocity(prevVelocity => prevVelocity + gravity);
      setDinoPosition(prevPosition => ({
        ...prevPosition,
        y: Math.min(
          Math.max(prevPosition.y + velocity, 0),
          viewportRect.height - dinoHeight
        )
      }));

      // Move obstacle to the left
      setObstacle(prevObstacle => ({
        ...prevObstacle,
        position: prevObstacle.position - obstacleSpeed, // Subtract obstacle speed from position
      }));

      // Remove obstacle if it has moved off the left edge of the viewport
      if (obstacle.position < -50) {
        setObstacle({ position: 0, height: 0 });
      }

      if (detectCollision()) {
        console.log('Game over!');
        // Stop the game by clearing the animation frame and obstacle interval
        cancelAnimationFrame(animationFrameId);
        clearInterval(obstacleIntervalId);
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Space' && dinoPosition.y === viewportRect.height - dinoHeight) {
        setVelocity(jumpVelocity);
      }
    };

    const detectCollision = () => {
      const dinoRect = document.querySelector('.dino').getBoundingClientRect();
      const dinoX = dinoRect.left + viewportRect.left;
      const dinoY = dinoRect.top + viewportRect.top;
      const dinoHeight = dinoRect.height;
      const dinoWidth = dinoRect.width;

      const obstacleRect = {
        left: obstacle.position,
        top: viewportRect.height - obstacle.height,
        width: 50,
        height: obstacle.height,
      };

      return (
        dinoX < obstacleRect.left + obstacleRect.width &&
        dinoX + dinoWidth > obstacleRect.left &&
        dinoY < obstacleRect.top + obstacleRect.height &&
        dinoY + dinoHeight > obstacleRect.top
      );
    };

    document.addEventListener('keydown', handleKeyDown);

    const animationFrameId = requestAnimationFrame(applyGravity);
    const maxInterval = 100; // Maximum interval between obstacles (in milliseconds)
    const minInterval = 10; // Minimum interval between obstacles (in milliseconds)
    const obstacleIntervalId = setInterval(() => {
      const interval = Math.random() * (maxInterval - minInterval) + minInterval; // Generate random interval
      setTimeout(addObstacle, interval); // Call addObstacle after random interval
    }, maxInterval);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(obstacleIntervalId);
    };
  }, [velocity, dinoPosition.y, obstacleSpeed, obstacle.position, obstacle.height]); // Re-run effect when velocity, dinoPosition.y, obstacleSpeed, or obstacle changes

  return (
    <div className='viewport_display'>
      <div className='dino' style={{ top: dinoPosition.y }}></div>
      {obstacle.position > 0 && (
        <div
          className="obstacle"
          style={{ left: obstacle.position, height: obstacle.height }}
        />
      )}
    </div>
  );
}
