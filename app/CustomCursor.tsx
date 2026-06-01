'use client';

import { useEffect, useRef } from 'react';

const RING = 52;
const DOT  = 5;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function isClickable(el: Element | null): boolean {
  if (!el) return false;
  return !!(
    el.closest('a, button, [role="button"], input, label, select, textarea') ||
    (el instanceof HTMLElement && window.getComputedStyle(el).cursor === 'pointer')
  );
}

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mouse = { x: -500, y: -500 };
    const dot   = { x: -500, y: -500 };
    const ring  = { x: -500, y: -500, scale: 1 };
    let hovering = false;
    let clicking = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x  = e.clientX;
      mouse.y  = e.clientY;
      hovering = isClickable(e.target as Element);
    };

    const onDown  = () => { clicking = true; };
    const onUp    = () => { clicking = false; };
    const onLeave = () => { mouse.x = -500; mouse.y = -500; };

    const tick = () => {
      dot.x  = lerp(dot.x,  mouse.x, 0.9);
      dot.y  = lerp(dot.y,  mouse.y, 0.9);
      ring.x = lerp(ring.x, mouse.x, 0.1);
      ring.y = lerp(ring.y, mouse.y, 0.1);
      ring.scale = lerp(ring.scale, clicking ? 0.55 : hovering ? 1.45 : 1, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x - DOT / 2}px, ${dot.y - DOT / 2}px)`;
        dotRef.current.style.opacity   = hovering ? '0' : '1';
      }

      if (ringRef.current) {
        ringRef.current.style.transform       = `translate(${ring.x - RING / 2}px, ${ring.y - RING / 2}px) scale(${ring.scale})`;
        ringRef.current.style.backgroundColor = hovering ? 'white' : 'transparent';
      }

      raf = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base: React.CSSProperties = {
    position:      'fixed',
    top:           0,
    left:          0,
    pointerEvents: 'none',
    zIndex:        99999,
    mixBlendMode:  'difference',
    willChange:    'transform',
    borderRadius:  '50%',
  };

  return (
    <>
      {/* precise dot */}
      <div
        ref={dotRef}
        style={{ ...base, width: DOT, height: DOT, backgroundColor: 'white' }}
      />
      {/* big ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width:  RING,
          height: RING,
          border: '1.5px solid white',
          transition: 'background-color 0.12s ease',
        }}
      />
    </>
  );
}
