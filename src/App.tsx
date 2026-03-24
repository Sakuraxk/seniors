import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from './components/NavBar';
import ParticleField from './components/ParticleField';
import Welcome from './pages/Welcome';
import Landing from './pages/Landing';
import CertDashboard from './pages/CertDashboard';
import TrustSeal from './pages/TrustSeal';
import ChatRisk from './pages/ChatRisk';
import RiskAlert from './pages/RiskAlert';
import FamilyGuard from './pages/FamilyGuard';
import GreenCard from './pages/GreenCard';
import GoldCard from './pages/GoldCard';
import BlueShield from './pages/BlueShield';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const isWelcome = location.pathname === '/welcome';

  return (
    <>
      {/* Global warm particle background (not on Welcome page) */}
      {!isWelcome && <ParticleField count={25} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Routes location={location}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={<Landing />} />
            <Route path="/cert-dashboard" element={<CertDashboard />} />
            <Route path="/trust-seal" element={<TrustSeal />} />
            <Route path="/chat-risk" element={<ChatRisk />} />
            <Route path="/risk-alert" element={<RiskAlert />} />
            <Route path="/family-guard" element={<FamilyGuard />} />
            <Route path="/green-card" element={<GreenCard />} />
            <Route path="/gold-card" element={<GoldCard />} />
            <Route path="/blue-shield" element={<BlueShield />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* NavBar hidden on Welcome page */}
      {!isWelcome && <NavBar />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
