import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Mama from './pages/CancerDeMama/CancerDeMama';
import Utero from './pages/Utero';
import Doacoes from './pages/Doacoes';
import Noticias from './pages/Noticias';

function App() {
  return (
    <Router>
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h1>Rede Feminina de Combate ao Câncer</h1>

        <div style={{ marginBottom: 30, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <Link to="/" style={buttonStyle}>Página Inicial</Link>
          <Link to="/mama" style={buttonStyle}>Câncer de Mama</Link>
          <Link to="/utero" style={buttonStyle}>Câncer do Colo do Útero</Link>
          <Link to="/doacoes" style={buttonStyle}>Colaborações</Link>
          <Link to="/noticias" style={buttonStyle}>Notícias</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mama" element={<Mama />} />
          <Route path="/utero" element={<Utero />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/noticias" element={<Noticias />} />
        </Routes>
      </div>
    </Router>
  );
}

const buttonStyle = {
  width: '250px',
  padding: '12px',
  backgroundColor: '#e91e63',
  color: '#fff',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default App;
