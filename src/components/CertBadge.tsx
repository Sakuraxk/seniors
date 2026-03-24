import { ShieldCheck, CreditCard, Shield } from 'lucide-react';
import './CertBadge.css';

interface CertBadgeProps {
  type: 'green' | 'gold' | 'blue';
  label: string;
  pulse?: boolean;
}

const iconMap = {
  green: ShieldCheck,
  gold: CreditCard,
  blue: Shield,
};

const labelMap = {
  green: '绿卡',
  gold: '金卡',
  blue: '蓝盾',
};

export default function CertBadge({ type, label, pulse = false }: CertBadgeProps) {
  const Icon = iconMap[type];

  return (
    <span className={`cert-badge ${type} ${pulse ? 'pulse' : ''}`}>
      <Icon className="badge-icon" />
      <span>{label || labelMap[type]}</span>
    </span>
  );
}
