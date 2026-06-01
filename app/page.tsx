'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { projects, imgSrc } from '@/lib/projects';

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const seqRef    = useRef<HTMLDivElement>(null);
  const sec2Ref   = useRef<HTMLDivElement>(null);
  const sec3Ref   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!seqRef.current || !sec2Ref.current || !sec3Ref.current) return;

      const rect     = seqRef.current.getBoundingClientRect();
      const maxScroll = seqRef.current.offsetHeight - window.innerHeight;
      const scrolled  = Math.max(0, -rect.top);
      const p         = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;

      // Nav: stays transparent until the whole sequence has scrolled past
      setNavScrolled(scrolled >= maxScroll);

      // Section 2 slides in: p 0 → 0.5
      const s2 = Math.max(0, Math.min(100, (1 - p * 2) * 100));
      // Section 3 slides in: p 0.5 → 1
      const s3 = Math.max(0, Math.min(100, (1 - (p - 0.5) * 2) * 100));

      sec2Ref.current.style.transform = `translateY(${s2}%)`;
      sec3Ref.current.style.transform = `translateY(${s3}%)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="text-[#1c1c1c]">

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          navScrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-black/8 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <a href="#hero">
            <Image
              src={
                navScrolled
                  ? '/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%EB%B8%94%EB%9E%99.png'
                  : '/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png'
              }
              alt="씨앤에스디자인"
              width={130}
              height={44}
              className="h-9 w-auto object-contain"
              priority
            />
          </a>
          <div
            className={`flex gap-10 text-xs tracking-[0.25em] uppercase transition-colors duration-500 ${
              navScrolled ? 'text-[#1c1c1c]' : 'text-white'
            }`}
          >
            {['Portfolio', 'About', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-50 transition-opacity">
                {l}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ── HERO SEQUENCE (300 vh scroll container) ──────────────── */}
      <div ref={seqRef} style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* ── 1. HERO ── */}
          <section id="hero" className="absolute inset-0" style={{ zIndex: 10 }}>
            <Image
              src={imgSrc('홀리랜드호텔', 'L7R02150.jpg')}
              alt="CNS Design"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/42" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
              <Image
                src="/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png"
                alt="씨앤에스디자인"
                width={180}
                height={56}
                className="h-12 w-auto object-contain mb-10"
              />
              <p className="text-[0.65rem] tracking-[0.55em] uppercase text-white/65 mb-5">
                Interior Design Studio
              </p>
              <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-[1.15] mb-6">
                공간이 말하는<br />이야기
              </h1>
              <p className="text-white/50 text-sm tracking-[0.2em]">Spaces that tell your story</p>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40">
              <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
              <span className="block w-px h-12 bg-linear-to-b from-white/50 to-transparent" />
            </div>
          </section>

          {/* ── 2. PHILOSOPHY ── */}
          <div
            ref={sec2Ref}
            className="absolute inset-0"
            style={{ zIndex: 20, transform: 'translateY(100%)' }}
          >
            <Image
              src={imgSrc('골프존파크', 'L7R02290.jpg')}
              alt="Design Philosophy"
              fill
              className="object-cover"
            />
            {/* left-side gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-center px-16 md:px-28 text-white">
              <p className="text-[0.6rem] tracking-[0.6em] uppercase text-white/50 mb-6">
                Philosophy
              </p>
              <h2 className="text-4xl md:text-6xl font-extralight leading-[1.2] mb-8 max-w-lg">
                공간을 넘어,<br />경험을 디자인합니다
              </h2>
              <div className="w-12 h-px bg-white/40 mb-8" />
              <p className="text-white/65 text-base leading-[1.9] max-w-sm">
                기능적 완성도와 감각적 아름다움의 균형을 통해<br />
                클라이언트의 비전이 공간이 됩니다.
              </p>
            </div>
          </div>

          {/* ── 3. PROCESS ── */}
          <div
            ref={sec3Ref}
            className="absolute inset-0"
            style={{ zIndex: 30, transform: 'translateY(100%)' }}
          >
            <Image
              src={imgSrc('칸톤 홍보관', 'L7R06060.JPG')}
              alt="Our Process"
              fill
              className="object-cover"
            />
            {/* right-side gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-l from-black/80 via-black/45 to-black/10" />
            <div className="absolute inset-0 flex flex-col items-end justify-center px-16 md:px-28 text-white text-right">
              <p className="text-[0.6rem] tracking-[0.6em] uppercase text-white/50 mb-6">
                Process
              </p>
              <h2 className="text-4xl md:text-6xl font-extralight leading-[1.2] mb-8 max-w-lg">
                처음 만남부터<br />완공의 순간까지
              </h2>
              <div className="w-12 h-px bg-white/40 mb-8 ml-auto" />
              <p className="text-white/65 text-base leading-[1.9] max-w-sm">
                기획·설계·시공·마감,<br />
                모든 과정을 클라이언트와 함께합니다.
              </p>
            </div>
          </div>

        </div>
      </div>
      {/* ─────────────────────────────────────────────────────────── */}

      {/* ── PORTFOLIO ────────────────────────────────────────────── */}
      <section id="portfolio" className="bg-[#f9f8f5] py-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-4">Our Work</p>
            <h2 className="text-4xl font-extralight">Portfolio</h2>
          </div>

          {/* editorial grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
            style={{ gridAutoRows: 'clamp(220px, 28vw, 420px)', gridAutoFlow: 'dense' }}
          >
            {projects.map((p, idx) => {
              const isLast = idx === projects.length - 1;
              return (
              <Link
                key={p.folder}
                href={`/portfolio/${encodeURIComponent(p.folder)}`}
                className={[
                  'group relative overflow-hidden bg-[#e2e0da]',
                  !isLast && p.colSpan === 2 ? 'col-span-2' : '',
                  !isLast && p.rowSpan === 2 ? 'md:row-span-2' : '',
                ].join(' ')}
                style={isLast ? { gridColumn: '1 / -1' } : undefined}
              >
                <Image
                  src={imgSrc(p.folder, p.cover)}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                  sizes={
                    isLast
                      ? '100vw'
                      : p.colSpan === 2
                        ? '(max-width: 768px) 100vw, 66vw'
                        : '(max-width: 768px) 50vw, 33vw'
                  }
                />
                {/* hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* project name */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-sm md:text-base tracking-wide leading-tight">{p.name}</p>
                  <p className="text-white/50 text-xs mt-1 tracking-wider">View project →</p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section id="about" className="flex flex-col md:flex-row min-h-screen">
        <div className="relative w-full md:w-1/2 min-h-[55vw] md:min-h-0">
          <Image
            src={imgSrc('칸톤 홍보관', 'L7R06048.JPG')}
            alt="About CNS Design"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-12 py-24">
          <div className="max-w-105">
            <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-5">About Us</p>
            <h2 className="text-3xl font-extralight mb-10 leading-relaxed">씨앤에스디자인</h2>
            <p className="text-[#666] leading-loose mb-6 text-[0.95rem]">
              씨앤에스디자인은 상업 공간, 호텔, 카페, 피트니스, 사무실 등 다양한 분야의 인테리어를 전문으로 합니다.
            </p>
            <p className="text-[#666] leading-loose text-[0.95rem]">
              클라이언트의 비전을 공간으로 실현하고, 사람과 공간이 만들어내는 이야기를 디자인합니다.
            </p>
            <div className="mt-12 flex gap-12 border-t border-black/8 pt-8">
              <div>
                <p className="text-2xl font-extralight">
                  17<span className="text-[#a08060] text-sm ml-1">+</span>
                </p>
                <p className="text-[0.7rem] tracking-widest uppercase text-[#888] mt-1">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-extralight">
                  100<span className="text-[#a08060] text-sm ml-1">+</span>
                </p>
                <p className="text-[0.7rem] tracking-widest uppercase text-[#888] mt-1">Photos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#1a1a1a] text-white py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-4">Contact</p>
          <h2 className="text-4xl font-extralight mb-16">함께 만들어가요</h2>
          <div className="grid md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
            <div>
              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-3">Company</p>
              <p className="text-base">씨앤에스디자인</p>
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-3">Phone</p>
              <p className="text-base">연락처를 입력해주세요</p>
            </div>
            <div>
              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-3">Email</p>
              <p className="text-base">이메일을 입력해주세요</p>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
            <p className="text-white/20 text-xs tracking-wider">© 2025 CNS Design. All rights reserved.</p>
            <Image
              src="/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png"
              alt="씨앤에스디자인"
              width={80}
              height={24}
              className="h-5 w-auto object-contain opacity-20"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
