import { Link } from 'react-router-dom';

export default function Hub() {
    // We removed the placeholders. You can just add your new games to this list as we build them!
    const gamesList = [
        {
            id: 'snake',
            title: 'Snake',
            path: '/snake',
            description: 'The HTML5 Canvas classic with screen-wrap.',
            icon: '🐍',
            accentColor: '#4CAF50'
        }
    ];

    return (
        <div style={{ textAlign: 'center', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Select a Game</h1>
            <p style={{ color: '#aaa', marginBottom: '3rem' }}>Choose a mini-game to play.</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                padding: '1rem'
            }}>

                {gamesList.map((game) => (
                    <Link
                        key={game.id}
                        to={game.path}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div style={{
                            border: `2px solid ${game.accentColor}`,
                            padding: '2rem',
                            borderRadius: '12px',
                            backgroundColor: '#242424',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = `0 10px 20px ${game.accentColor}33`;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{game.icon}</div>
                            <h2 style={{ color: game.accentColor, margin: '0 0 1rem 0' }}>{game.title}</h2>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc', lineHeight: '1.4' }}>
                                {game.description}
                            </p>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}