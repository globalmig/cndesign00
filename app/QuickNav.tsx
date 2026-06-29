'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  { id: 'intro',     label: 'Home' },
  { id: 'retail',    label: 'Retail' },
  { id: 'exercise',  label: 'Exercise' },
  { id: 'residence', label: 'Residence' },
  { id: 'office',    label: 'Office & Etc' },
  { id: 'about',     label: 'About' },
  { id: 'contact',   label: 'Contact' },
];

export default function QuickNav() {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observers = ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start gap-4.5">
      {ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a key={id} href={`#${id}`} className="group flex items-center gap-3">
            {/* 도트 */}
            <span
              className="block rounded-full transition-all duration-300"
              style={
                isActive
                  ? { width: '7px', height: '7px', background: '#a08060', border: 'none' }
                  : { width: '5px', height: '5px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }
              }
            />
            {/* 레이블 */}
            <span
              className="text-[0.58rem] tracking-[0.22em] uppercase font-light transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
              style={
                isActive
                  ? { opacity: 1, transform: 'translateX(0)', color: '#a08060' }
                  : { color: 'rgba(255,255,255,0.5)' }
              }
            >
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
