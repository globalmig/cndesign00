'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { imgSrc } from '@/lib/projects';

const LOGO_WHITE = '/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png';
const LOGO_BLACK = '/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%EB%B8%94%EB%9E%99.png';

export default function HeroSequence() {
  const [navScrolled, setNavScrolled] = useState(false);
  const seqRef  = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  // 값이 바뀔 때만 setState — 매 스크롤마다 리렌더 방지
  const navScrolledRef = useRef(false);
  const setNav = (v: boolean) => {
    if (v === navScrolledRef.current) return;
    navScrolledRef.current = v;
    setNavScrolled(v);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // 모바일: 단순 nav 색상 전환만 처리
      const onScroll = () => setNav(window.scrollY >= window.innerHeight * 0.8);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    // 데스크탑: 300vh 스크롤 시퀀스
    if (!seqRef.current || !sec2Ref.current || !sec3Ref.current) return;

    let isSnapping = false;

    const snapTo = (y: number) => {
      isSnapping = true;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setTimeout(() => { isSnapping = false; }, 900);
    };

    const onScroll = () => {
      if (!seqRef.current || !sec2Ref.current || !sec3Ref.current) return;
      const rect      = seqRef.current.getBoundingClientRect();
      const maxScroll = seqRef.current.offsetHeight - window.innerHeight;
      const scrolled  = Math.max(0, -rect.top);
      const p         = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;

      setNav(scrolled >= maxScroll);

      sec2Ref.current.style.transform = `translateY(${Math.max(0, (1 - p * 2) * 100)}%)`;
      sec3Ref.current.style.transform = `translateY(${Math.max(0, (1 - (p - 0.5) * 2) * 100)}%)`;
    };

    const onWheel = (e: WheelEvent) => {
      if (!seqRef.current) return;
      const seqTop    = seqRef.current.offsetTop;
      const vh        = window.innerHeight;
      const relScroll = window.scrollY - seqTop;

      if (relScroll < 0 || relScroll > 2 * vh) return;

      const section = Math.round(relScroll / vh);
      if (section >= 2 && e.deltaY > 0) return;
      if (section <= 0 && e.deltaY < 0) return;

      e.preventDefault();
      if (isSnapping) return;

      snapTo(seqTop + (e.deltaY > 0 ? section + 1 : section - 1) * vh);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <>
      {/* ── NAV ── */}
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
              src={navScrolled ? LOGO_BLACK : LOGO_WHITE}
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

      {/* ── 데스크탑: 300vh 스크롤 시퀀스 ── */}
      <div ref={seqRef} style={{ height: '300vh' }} className="hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden">

          <section id="hero" className="absolute inset-0" style={{ zIndex: 10 }}>
            <Image src={imgSrc('홀리랜드호텔', 'L7R02150.jpg')} alt="CNS Design"
              fill priority sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/42" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
              <Image src={LOGO_WHITE} alt="씨앤에스디자인"
                width={180} height={56} className="h-12 w-auto object-contain mb-10" />
              <p className="text-[0.65rem] tracking-[0.55em] uppercase text-white/65 mb-5">Interior Design Studio</p>
              <h1 className="text-7xl font-extralight tracking-tight leading-[1.15] mb-6">공간이 말하는<br />이야기</h1>
              <p className="text-white/50 text-sm tracking-[0.2em]">Spaces that tell your story</p>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40">
              <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
              <span className="block w-px h-12 bg-linear-to-b from-white/50 to-transparent" />
            </div>
          </section>

          <div ref={sec2Ref} className="absolute inset-0" style={{ zIndex: 20, transform: 'translateY(100%)' }}>
            <Image src={imgSrc('골프존파크', 'L7R02290.jpg')} alt="Design Philosophy"
              fill loading="lazy" sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 flex flex-col justify-center px-28 text-white">
              <p className="text-[0.6rem] tracking-[0.6em] uppercase text-white/50 mb-6">Philosophy</p>
              <h2 className="text-6xl font-extralight leading-[1.2] mb-8 max-w-lg">공간을 넘어,<br />경험을 디자인합니다</h2>
              <div className="w-12 h-px bg-white/40 mb-8" />
              <p className="text-white/65 text-base leading-[1.9] max-w-sm">
                기능적 완성도와 감각적 아름다움의 균형을 통해<br />클라이언트의 비전이 공간이 됩니다.
              </p>
            </div>
          </div>

          <div ref={sec3Ref} className="absolute inset-0" style={{ zIndex: 30, transform: 'translateY(100%)' }}>
            <Image src={imgSrc('칸톤 홍보관', 'L7R06060.JPG')} alt="Our Process"
              fill loading="lazy" sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-l from-black/80 via-black/45 to-black/10" />
            <div className="absolute inset-0 flex flex-col items-end justify-center px-28 text-white text-right">
              <p className="text-[0.6rem] tracking-[0.6em] uppercase text-white/50 mb-6">Process</p>
              <h2 className="text-6xl font-extralight leading-[1.2] mb-8 max-w-lg">처음 만남부터<br />완공의 순간까지</h2>
              <div className="w-12 h-px bg-white/40 mb-8 ml-auto" />
              <p className="text-white/65 text-base leading-[1.9] max-w-sm">
                기획·설계·시공·마감,<br />모든 과정을 클라이언트와 함께합니다.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── 모바일: 3개 풀스크린 섹션 단순 스택 ── */}
      <div className="md:hidden">

        <section id="hero" className="relative h-dvh">
          <Image src={imgSrc('홀리랜드호텔', 'L7R02150.jpg')} alt="CNS Design"
            fill priority sizes="(min-width: 768px) 1px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/42" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
            <Image src={LOGO_WHITE} alt="씨앤에스디자인"
              width={140} height={44} className="h-9 w-auto object-contain mb-8" />
            <p className="text-[0.6rem] tracking-[0.5em] uppercase text-white/65 mb-4">Interior Design Studio</p>
            <h1 className="text-4xl font-extralight tracking-tight leading-[1.2] mb-5">공간이 말하는<br />이야기</h1>
            <p className="text-white/50 text-xs tracking-[0.2em]">Spaces that tell your story</p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-[0.5rem] tracking-[0.4em] uppercase">Scroll</span>
            <span className="block w-px h-10 bg-linear-to-b from-white/50 to-transparent" />
          </div>
        </section>

        <div className="relative h-dvh">
          <Image src={imgSrc('골프존파크', 'L7R02290.jpg')} alt="Design Philosophy"
            fill loading="lazy" sizes="(min-width: 768px) 1px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
            <p className="text-[0.6rem] tracking-[0.6em] uppercase text-white/50 mb-5">Philosophy</p>
            <h2 className="text-4xl font-extralight leading-[1.2] mb-6">공간을 넘어,<br />경험을 디자인합니다</h2>
            <div className="w-10 h-px bg-white/40 mb-6" />
            <p className="text-white/65 text-sm leading-[1.9]">
              기능적 완성도와 감각적 아름다움의 균형을 통해<br />클라이언트의 비전이 공간이 됩니다.
            </p>
          </div>
        </div>

        <div className="relative h-dvh">
          <Image src={imgSrc('칸톤 홍보관', 'L7R06060.JPG')} alt="Our Process"
            fill loading="lazy" sizes="(min-width: 768px) 1px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-l from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-end justify-center px-8 text-white text-right">
            <p className="text-[0.6rem] tracking-[0.6em] uppercase text-white/50 mb-5">Process</p>
            <h2 className="text-4xl font-extralight leading-[1.2] mb-6">처음 만남부터<br />완공의 순간까지</h2>
            <div className="w-10 h-px bg-white/40 mb-6 ml-auto" />
            <p className="text-white/65 text-sm leading-[1.9]">
              기획·설계·시공·마감,<br />모든 과정을 클라이언트와 함께합니다.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
