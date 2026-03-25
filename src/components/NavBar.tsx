import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShieldCheck, MessageCircle, User, ShieldPlus, Sun, Moon, Users } from 'lucide-react';
import './NavBar.css';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/cert-dashboard', label: '认证', icon: ShieldCheck },
  { path: '/chat-risk', search: '?tab=messages', label: '消息', icon: MessageCircle },
  { path: '/chat-risk', search: '?tab=friends', label: '联系人', icon: Users },
  { path: '/family-guard', label: '我的', icon: User },
];

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <motion.div
          className="nav-brand-icon"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        >
          <ShieldPlus />
        </motion.div>
        <span className="nav-brand-text">银盾安鉴</span>
      </div>
      {navItems.map((item) => {
        let isActive = location.pathname === item.path;
        if (item.path === '/chat-risk') {
          const isFriendsTab = location.search.includes('tab=friends');
          if (item.search === '?tab=friends') {
            isActive = isActive && isFriendsTab;
          } else {
            isActive = isActive && !isFriendsTab;
          }
        }

        return (
          <motion.button
            key={item.label}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path + (item.search || ''))}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <item.icon />
            <span className="nav-label">{item.label}</span>
            {isActive && (
              <motion.span
                className="nav-active-dot"
                layoutId="navActiveDot"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                }}
              />
            )}
          </motion.button>
        );
      })}
      
      <motion.button
        className="nav-item"
        onClick={toggleTheme}
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {isDark ? <Sun /> : <Moon />}
        <span className="nav-label">{isDark ? '浅色' : '深色'}</span>
      </motion.button>
    </nav>
  );
}

