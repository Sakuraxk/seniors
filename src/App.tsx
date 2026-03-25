import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import VerificationReview from './pages/VerificationReview';
import VoiceCall from './pages/VoiceCall';
import RiskProfile from './pages/RiskProfile';
import UserProfile from './pages/UserProfile';
import SafetyNotifications from './pages/SafetyNotifications';
import CallRecords from './pages/CallRecords';
import SafetyCenter from './pages/SafetyCenter';
import ShareCert from './pages/ShareCert';
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
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25, mass: 0.8 }}
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
            <Route path="/verification-review" element={<VerificationReview />} />
            <Route path="/voice-call" element={<VoiceCall />} />
            <Route path="/risk-profile" element={<RiskProfile />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/safety-notifications" element={<SafetyNotifications />} />
            <Route path="/call-records" element={<CallRecords />} />
            <Route path="/safety-center" element={<SafetyCenter />} />
            <Route path="/share-cert" element={<ShareCert />} />
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="custom-toast"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
