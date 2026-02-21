import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hub from './pages/Hub';
import Snake from './pages/games/Snake';

const Navbar = () => (
  <nav style={{ padding: '1rem', backgroundColor: '#1a1a1a', borderBottom: '2px solid #4CAF50' }}>
    <Link to="/" style={{ textDecoration: 'none', color: '#4CAF50', fontSize: '1.5rem', fontWeight: 'bold' }}>
      🕹️ Aaron's Arcade
    </Link>
  </nav>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/snake" element={<Snake />} />
        </Routes>
      </div>
    </Router>
  );
}