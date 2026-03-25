export const SkeletonText = ({ lines = 1, className = '', height = '16px' }) => {
  return (
    <div className={`skeleton-container ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height, width: i === lines - 1 && lines > 1 ? '70%' : '100%', borderRadius: '4px' }} />
      ))}
    </div>
  );
};

export const SkeletonCircle = ({ size = '48px', className = '' }) => {
  return <div className={`skeleton ${className}`} style={{ width: size, height: size, borderRadius: '50%' }} />;
};

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`glass-card skeleton-card ${className}`} style={{ padding: '20px', display: 'flex', gap: '16px' }}>
      <SkeletonCircle />
      <div style={{ flex: 1, paddingTop: '4px' }}>
        <SkeletonText lines={3} />
      </div>
    </div>
  );
};
