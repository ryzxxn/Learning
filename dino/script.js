const dino = document.getElementById('dino');

let jumping = false;
let gravity = 0.9;
let velocity = 0;
let jumpCount = 0;

function jump() {
    if (jumpCount < 2) {
        velocity = -15;
        jumping = true;
        jumpCount++;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (!jumping) jump();
    }
});

function animate() {
    velocity += gravity;
    dino.style.bottom = parseInt(dino.style.bottom) + velocity + 'px';

    if (parseInt(dino.style.bottom) <= 0) {
        dino.style.bottom = 0;
        velocity = 0;
        jumping = false;
        jumpCount = 0;
    }

    requestAnimationFrame(animate);
}

animate();
