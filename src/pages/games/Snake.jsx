import { useEffect, useRef, useState } from 'react';

export default function Snake() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let specialFood = null;

        let dx = 0;
        let dy = 0;
        let currentScore = 0;

        let gameTimeout;
        let buffTimeout; // Tracks active buffs so we don't accidentally overlap speed resets
        let gameStarted = false;

        let speed = 100;
        let defaultSpeed = 100;

        const drawGame = () => {
            let head = { x: snake[0].x + dx, y: snake[0].y + dy };

            if (gameStarted) {
                // Screen Wrap Logic
                if (head.x < 0) head.x = tileCount - 1;
                else if (head.x >= tileCount) head.x = 0;

                if (head.y < 0) head.y = tileCount - 1;
                else if (head.y >= tileCount) head.y = 0;

                // Check Self Collisions
                for (let i = 0; i < snake.length; i++) {
                    if (head.x === snake[i].x && head.y === snake[i].y) {
                        clearTimeout(gameTimeout);
                        if (buffTimeout) clearTimeout(buffTimeout);
                        setGameOver(true);
                        return;
                    }
                }

                snake.unshift(head);

                // 1. Check Normal Food
                if (head.x === food.x && head.y === food.y) {
                    currentScore += 10;
                    setScore(currentScore);
                    food = {
                        x: Math.floor(Math.random() * tileCount),
                        y: Math.floor(Math.random() * tileCount)
                    };

                    // 5% chance to spawn a special power-up
                    if (!specialFood && Math.random() < 0.05) {
                        let selectedType;
                        const roll = Math.random() * 100; // Roll a 100-sided die

                        if (currentScore < 100) {
                            // Before 100 score: 80% Speed, 20% Shrink
                            if (roll < 80) selectedType = 'speed';
                            else selectedType = 'shrink';
                        } else {
                            // After 100 score: 80% Speed, 15% Shrink, 5% Slow-mo
                            if (roll < 80) selectedType = 'speed';
                            else if (roll < 95) selectedType = 'shrink';
                            else selectedType = 'slow';
                        }

                        specialFood = {
                            x: Math.floor(Math.random() * tileCount),
                            y: Math.floor(Math.random() * tileCount),
                            type: selectedType
                        };
                    }
                } else {
                    // 2. Check Special Food
                    if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {

                        // Clear any existing buff timer so they don't overlap
                        if (buffTimeout) clearTimeout(buffTimeout);

                        if (specialFood.type === 'shrink') {
                            const newLength = Math.max(3, Math.floor(snake.length / 2));
                            snake = snake.slice(0, newLength);
                        } else if (specialFood.type === 'speed') {
                            speed = 50; // Twice as fast
                            buffTimeout = setTimeout(() => { speed = defaultSpeed; }, 5000);
                        } else if (specialFood.type === 'slow') {
                            speed = 200; // Twice as slow
                            buffTimeout = setTimeout(() => { speed = defaultSpeed; }, 5000);
                        }

                        specialFood = null;
                        snake.pop();
                    } else {
                        snake.pop();
                    }
                }
            }

            // Render Background
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Render Normal Food
            ctx.fillStyle = '#ff3333';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

            // Render Special Food
            if (specialFood) {
                if (specialFood.type === 'shrink') ctx.fillStyle = '#b5179e'; // Purple
                else if (specialFood.type === 'speed') ctx.fillStyle = '#fca311'; // Gold
                else if (specialFood.type === 'slow') ctx.fillStyle = '#00bcd4'; // Ice Blue

                ctx.fillRect((specialFood.x * gridSize) + 2, (specialFood.y * gridSize) + 2, gridSize - 4, gridSize - 4);
            }

            // Render Snake
            ctx.fillStyle = '#4CAF50';
            snake.forEach((part) => {
                ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
            });

            gameTimeout = setTimeout(drawGame, speed);
        };

        const handleKeyDown = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                gameStarted = true;
            }
            switch (e.key) {
                case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
                case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
                case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
                case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        gameTimeout = setTimeout(drawGame, speed);

        return () => {
            clearTimeout(gameTimeout);
            if (buffTimeout) clearTimeout(buffTimeout);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameKey]);

    const handleRestart = () => {
        setGameOver(false);
        setScore(0);
        setGameKey(prev => prev + 1);
    };

    return (
        <div style={{ textAlign: 'center', color: 'white' }}>
            <h2>Snake: Enhanced</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Score: {score}</p>

            {/* Clean, mysterious legend without the underlying math */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ color: '#ff3333' }}>{'\u{1F34E} +10'}</span>
                <span style={{ color: '#fca311' }}>{'\u26A1 Speed Boost'}</span>
                <span style={{ color: '#b5179e' }}>{'\u{1F347} Tail Shrink'}</span>
                <span style={{ color: '#00bcd4' }}>{'\u{1F9CA} Slow-mo'}</span>
            </div>

            <canvas
                ref={canvasRef}
                width="400"
                height="400"
                style={{
                    border: '2px solid #4CAF50',
                    backgroundColor: '#111',
                    boxShadow: '0 0 20px rgba(76, 175, 80, 0.2)'
                }}
            />

            {gameOver && (
                <div style={{ marginTop: '1rem' }}>
                    <h3 style={{ color: '#ff3333' }}>Game Over!</h3>
                    <button
                        onClick={handleRestart}
                        style={{
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            backgroundColor: '#4CAF50',
                            border: 'none',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}
