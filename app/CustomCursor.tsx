'use client';

import { useEffect, useRef, useState } from 'react';

const RING = 64;
const DOT  = 4;

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
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  // 1단계: 디바이스 감지 + 뷰포트 폭 감지 (마운트 직후)
  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const check = () => {
      setActive(!isCoarse && window.innerWidth >= 1200);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 2단계: active 상태(DOM 요소 존재) 이후 애니메이션 셋업
  useEffect(() => {
    if (!active) return;

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
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onDown  = () => { clicking = true; };
    const onUp    = () => { clicking = false; };
    const onLeave = () => { mouse.x = -500; mouse.y = -500; };

    const tick = () => {
      dot.x  = lerp(dot.x,  mouse.x, 0.9);
      dot.y  = lerp(dot.y,  mouse.y, 0.9);
      ring.x = lerp(ring.x, mouse.x, 0.1);
      ring.y = lerp(ring.y, mouse.y, 0.1);
      ring.scale = lerp(ring.scale, clicking ? 0.72 : 1, 0.14);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.x - DOT / 2}px, ${dot.y - DOT / 2}px)`;
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

      // 링이 마우스에 충분히 가까워지면 RAF 중단
      const settled =
        Math.abs(ring.x - mouse.x) < 0.5 &&
        Math.abs(ring.y - mouse.y) < 0.5 &&
        Math.abs(ring.scale - (clicking ? 0.72 : 1)) < 0.01;

      if (settled) {
        raf = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
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
    transform:     'translate(-500px, -500px)',
    pointerEvents: 'none',
    zIndex:        99999,
    willChange:    'transform',
    borderRadius:  '50%',
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
          transition:      'opacity 0.15s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...base,
          width:      RING,
          height:     RING,
          border:     '1.5px solid rgba(255,255,255,0.88)',
          boxShadow:  '0 0 0 1px rgba(28,28,28,0.1), 0 4px 20px rgba(0,0,0,0.06)',
          transition: 'border-color 0.22s ease, background-color 0.22s ease',
          display:    'flex',
          alignItems: 'center',
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
