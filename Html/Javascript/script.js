document.addEventListener('DOMContentLoaded', () => {
    const bird = document.getElementById('bird');
    const game = document.getElementById('game');
    const pipe = document.getElementById('pipe');
    const pipe2 = document.getElementById('pipe2');

    let birdY = 200;
    let gravity = 2;
    let lift = -30;
    let isGameOver = false;

    document.addEventListener('keydown', jump);

    function jump() {
        if (!isGameOver) {
            birdY += lift;
        }
    }

    function move() {
        if (!isGameOver) {
            birdY += gravity;
            bird.style.top = birdY + 'px';

            let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('right'));
            let pipe2Left = parseInt(window.getComputedStyle(pipe2).getPropertyValue('right'));

            pipe.style.right = pipeLeft + 2 + 'px';
            pipe2.style.right = pipe2Left + 2 + 'px';

            if (pipeLeft >= 400) {
                pipe.style.right = '-60px';
            }

            if (pipe2Left >= 400) {
                pipe2.style.right = '-60px';
            }

            if (birdY >= 560 || birdY <= 0 || isCollide(pipe) || isCollide(pipe2)) {
                isGameOver = true;
                alert('Game Over');
                window.location.reload();
            }
        }
    }

    function isCollide(pipe) {
        let birdRect = bird.getBoundingClientRect();
        let pipeRect = pipe.getBoundingClientRect();

        return !(
            birdRect.bottom < pipeRect.top ||
            birdRect.top > pipeRect.bottom ||
            birdRect.right < pipeRect.left ||
            birdRect.left > pipeRect.right
        );
    }

    setInterval(move, 20);
});
