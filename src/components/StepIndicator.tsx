import { Check, Send, CheckCircle, Search, FileBadge, Eye } from 'lucide-react';
import type { TrustSealStep } from '../data/mockData';
import './StepIndicator.css';

interface StepIndicatorProps {
  steps: TrustSealStep[];
  onStepClick?: (step: number) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  send: Send,
  'check-circle': CheckCircle,
  search: Search,
  'file-badge': FileBadge,
  eye: Eye,
};

export default function StepIndicator({ steps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {steps.map((step) => {
        const Icon = iconMap[step.icon] || CheckCircle;
        return (
          <div
            key={step.step}
            className={`step-item ${step.status}`}
            onClick={() => onStepClick?.(step.step)}
            style={{ cursor: onStepClick ? 'pointer' : 'default' }}
          >
            <div className="step-circle">
              {step.status === 'completed' ? (
                <Check />
              ) : step.status === 'active' ? (
                <Icon />
              ) : (
                <span className="step-number">{step.step}</span>
              )}
            </div>
            <div className="step-content">
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
