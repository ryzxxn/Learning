import React, { useState, useEffect } from 'react';

export default function Player() {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const containerSize = { width: 800, height: 600 }; // Adjust container size as needed
  const playerSize = 50;
  const speed = 5;

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'w':
          setPosition((prevPos) => ({ ...prevPos, y: Math.max(prevPos.y - speed, 0) }));
          break;
        case 's':
          setPosition((prevPos) => ({ ...prevPos, y: Math.min(prevPos.y + speed, containerSize.height - playerSize) }));
          break;
        case 'a':
          setPosition((prevPos) => ({ ...prevPos, x: Math.max(prevPos.x - speed, 0) }));
          break;
        case 'd':
          setPosition((prevPos) => ({ ...prevPos, x: Math.min(prevPos.x + speed, containerSize.width - playerSize) }));
          break;
        default:
          break;
      }
    };

    const animate = () => {
      // Your additional animation logic here, if any
      requestAnimationFrame(animate);
    };

    document.addEventListener('keydown', handleKeyPress);
    animate();

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return <div id='player' className='player' style={{ top: position.y + 'px', left: position.x + 'px' }}></div>;
}
