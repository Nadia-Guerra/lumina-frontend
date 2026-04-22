'use client';

import { useEffect, useState } from 'react';

interface LoadingBarProps {
  loading: boolean;
  color?: string;
}

export default function LoadingBar({ loading, color = '#F297A0' }: LoadingBarProps) {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let raf: number;
    let timeout: ReturnType<typeof setTimeout>;

    if (loading) {
      setFading(false);
      setWidth(0);
      setVisible(true);

      let current = 0;
      const tick = () => {
        current = current < 30 ? current + 3
                : current < 60 ? current + 1.5
                : current < 80 ? current + 0.5
                : current;
        setWidth(current);
        if (current < 80) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else if (visible) {
      cancelAnimationFrame(raf);
      setWidth(100);
      setFading(true);
      timeout = setTimeout(() => {
        setVisible(false);
        setWidth(0);
        setFading(false);
      }, 400);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
      style={{ transition: fading ? 'opacity 0.4s ease' : undefined, opacity: fading ? 0 : 1 }}
    >
      <div
        style={{
          width: `${width}%`,
          backgroundColor: color,
          height: '100%',
          transition: 'width 0.25s ease',
          boxShadow: `0 0 8px ${color}88`,
        }}
      />
    </div>
  );
}
