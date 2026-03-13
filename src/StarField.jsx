import React, { useEffect, useMemo, useState } from 'react';

function StarField() {
  const [shootingStars, setShootingStars] = useState([]);

  // Generate static star data once
  const stars = useMemo(() => {
    return Array.from({ length: 180 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.08 ? 2.5 : Math.random() < 0.25 ? 1.5 : 1,
      delay: (Math.random() * 6).toFixed(2),
      duration: (2.5 + Math.random() * 4).toFixed(2),
      opacity: (0.4 + Math.random() * 0.6).toFixed(2),
    }));
  }, []);

  // Shooting star every ~60 seconds
  useEffect(() => {
    const spawnShooter = () => {
      const id = Date.now();
      const angle = 20 + Math.random() * 30; // 20–50 deg downward
      setShootingStars(prev => [...prev, {
        id,
        x: Math.random() * 70,
        y: Math.random() * 50,
        angle,
      }]);
      // Remove after animation completes
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id));
      }, 2200);
    };

    // First one after a short delay so it's visible early
    const firstTimeout = setTimeout(spawnShooter, 8000);
    const interval = setInterval(spawnShooter, 60000);
    return () => { clearTimeout(firstTimeout); clearInterval(interval); };
  }, []);

  return (
    <div className="space-bg" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {shootingStars.map(s => (
        <div
          key={s.id}
          className="shooting-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            '--ss-angle': `${s.angle}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default StarField;
