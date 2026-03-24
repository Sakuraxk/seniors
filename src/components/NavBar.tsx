import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShieldCheck, MessageCircle, User, ShieldPlus } from 'lucide-react';
import './NavBar.css';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/cert-dashboard', label: '认证', icon: ShieldCheck },
  { path: '/chat-risk', label: '消息', icon: MessageCircle },
  { path: '/family-guard', label: '我的', icon: User },
];

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-brand-icon">
          <ShieldPlus />
        </div>
        <span className="nav-brand-text">银盾安鉴</span>
      </div>
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <item.icon />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
