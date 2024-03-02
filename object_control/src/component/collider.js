// component/collider.js
import React, { useEffect } from 'react';

const Collider = () => {
  useEffect(() => {
    const checkCollision = () => {
      const player = document.getElementById('player');
      const collider = document.getElementById('collider');

      if (player && collider) {
        const playerRect = player.getBoundingClientRect();
        const colliderRect = collider.getBoundingClientRect();

        if (
          playerRect.x < colliderRect.x + colliderRect.width &&
          playerRect.x + playerRect.width > colliderRect.x &&
          playerRect.y < colliderRect.y + colliderRect.height &&
          playerRect.y + playerRect.height > colliderRect.y
        ) {
            alert('Game Over')
          console.log('Collision detected!');
          // Handle collision logic here
        }
      }
    };

    const interval = setInterval(checkCollision, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return <div id='collider' className='collider'></div>;
};

export default Collider;
