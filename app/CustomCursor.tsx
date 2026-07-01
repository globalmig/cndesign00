'use client';

import { useEffect, useRef, useState } from 'react';

const RING = 64;
const DOT  = 4;

function isClickable(el: Element | null): boolean {
  if (!el) return false;
  return !!(
    el.closest('a, button, [role="button"], input, label, select, textarea') ||
    (el instanceof HTMLElement && window.getComputedStyle(el).cursor === 'pointer')
  );
}

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const check = () => {
      setActive(!isCoarse && window.innerWidth >= 1200);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!active) return;

    const mouse = { x: 0, y: 0 };
    const ring  = { x: 0, y: 0, scale: 1 };
    let hovering    = false;
    let clicking    = false;
    let mouseInside = false;
    let raf = 0;

    const setVisible = (v: boolean) => {
      const op = v ? '1' : '0';
      if (dotRef.current)  dotRef.current.style.opacity  = op;
      if (ringRef.current) ringRef.current.style.opacity = op;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x  = e.clientX;
      mouse.y  = e.clientY;
      hovering = isClickable(e.target as Element);

      if (!mouseInside) {
        // 뷰포트 재진입 시 링을 현재 위치로 즉시 스냅
        ring.x = mouse.x;
        ring.y = mouse.y;
        mouseInside = true;
        setVisible(true);
      }

      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onDown  = () => { clicking = true;  if (!raf) raf = requestAnimationFrame(tick); };
    const onUp    = () => { clicking = false; if (!raf) raf = requestAnimationFrame(tick); };
    const onLeave = () => {
      mouseInside = false;
      setVisible(false);
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    const tick = () => {
      // 도트: 즉시 마우스 위치로
      const dx = mouse.x - DOT / 2;
      const dy = mouse.y - DOT / 2;

      // 링: 약간 부드럽게 (t=0.18 → 전보다 빠르게)
      ring.x     += (mouse.x - ring.x) * 0.18;
      ring.y     += (mouse.y - ring.y) * 0.18;
      ring.scale += ((clicking ? 0.72 : 1) - ring.scale) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
        dotRef.current.style.opacity   = hovering ? '0' : '1';
      }

      if (ringRef.current) {
        ringRef.current.style.transform       = `translate(${ring.x - RING / 2}px, ${ring.y - RING / 2}px) scale(${ring.scale})`;
        ringRef.current.style.borderColor     = hovering ? 'rgba(160,128,96,1)' : 'rgba(255,255,255,0.88)';
        ringRef.current.style.backgroundColor = hovering ? 'rgba(160,128,96,0.18)' : 'transparent';
      }

      if (labelRef.current) {
        labelRef.current.style.opacity = hovering ? '1' : '0';
      }

      const settled =
        Math.abs(ring.x - mouse.x) < 0.5 &&
        Math.abs(ring.y - mouse.y) < 0.5 &&
        Math.abs(ring.scale - (clicking ? 0.72 : 1)) < 0.01;

      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;

  const base: React.CSSProperties = {
    position:      'fixed',
    top:           0,
    left:          0,
    pointerEvents: 'none',
    zIndex:        99999,
    willChange:    'transform',
    borderRadius:  '50%',
    opacity:       0,
  };

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...base,
          width:           DOT,
          height:          DOT,
          backgroundColor: 'white',
          boxShadow:       '0 0 0 1.5px rgba(28,28,28,0.22)',
          transition:      'opacity 0.12s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...base,
          width:          RING,
          height:         RING,
          border:         '1.5px solid rgba(255,255,255,0.88)',
          boxShadow:      '0 0 0 1px rgba(28,28,28,0.1), 0 4px 20px rgba(0,0,0,0.06)',
          transition:     'border-color 0.22s ease, background-color 0.22s ease, opacity 0.12s ease',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize:      '8px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.95)',
            fontFamily:    'var(--font-geist-sans), Pretendard, Arial, sans-serif',
            fontWeight:    300,
            opacity:       0,
            transition:    'opacity 0.22s ease',
            userSelect:    'none',
            lineHeight:    1,
            borderRadius:  0,
          }}
        >
          click
        </span>
      </div>
    </>
  );
}
