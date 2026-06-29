'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  { id: 'hero',      label: 'Home' },
  { id: 'retail',    label: 'Retail' },
  { id: 'exercise',  label: 'Exercise' },
  { id: 'residence', label: 'Residence' },
  { id: 'office',    label: 'Office & Etc' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about',     label: 'About' },
  { id: 'contact',   label: 'Contact' },
];

export default function QuickNav() {
  const [active, setActive] = useState('hero');
  const [dark, setDark]     = useState(true); // 현재 섹션 배경이 어두운지

  const DARK_SECTIONS = new Set(['hero', 'portfolio', 'contact']);

  useEffect(() => {
    const observers = ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
            setDark(DARK_SECTIONS.has(id));
          }
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const dot  = dark ? 'bg-white/90'  : 'bg-[#1c1c1c]/80';
  const ring = dark ? 'border-white/50' : 'border-[#1c1c1c]/40';
  const text = dark ? 'text-white'    : 'text-[#1c1c1c]';

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start gap-5">
      {ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-3"
          >
            {/* 도트 */}
            <span
              className={`
                block rounded-full border transition-all duration-300
                ${isActive
                  ? `w-2 h-2 ${dot} border-transparent`
                  : `w-1.5 h-1.5 bg-transparent ${ring}`
                }
              `}
            />
            {/* 레이블 — 호버 시 표시 */}
            <span
              className={`
                text-[0.58rem] tracking-[0.2em] uppercase font-light
                opacity-0 -translate-x-1
                group-hover:opacity-100 group-hover:translate-x-0
                transition-all duration-200
                ${isActive ? `opacity-70 translate-x-0 ${text}` : text}
              `}
            >
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
