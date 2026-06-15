'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const LOGO_WHITE  = '/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png';
const LOGO_BLACK  = '/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%EB%B8%94%EB%9E%99.png';

const sections = [
  {
    src: '',
    label: 'Interior Design Studio',
    ko: '고객을 위한 최상의\n디자인을 제공합니다.',
    en: 'Must Be Design For You',
    desc: '씨앤에스디자인은 고객 여러분을 위한 디자인을 최우선으로 합니다.\n방대한 디자인 작업물과 다양한 공간의 디자인 경험으로 고객을 위한 디자인을 제공하고\n다년간의 시공 경험으로 최상의 디자인과 최선의 디테일을 제공합니다.',
  },
  {
    src: '/hero/hero_bg_02.png',
    label: 'Design Philosophy',
    ko: '공간을 넘어,\n경험을 디자인합니다.',
    en: 'Beyond Space, Design Experience',
    desc: '기능적 완성도와 감각적 아름다움의 균형을 통해\n클라이언트의 비전이 공간이 됩니다.\n사람과 공간이 만들어내는 이야기를 디자인합니다.',
  },
  {
    src: '/hero/hero_bg_03.png',
    label: 'Our Process',
    ko: '처음 만남부터\n완공의 순간까지.',
    en: 'From First Meeting to Completion',
    desc: '기획·설계·시공·마감, 모든 과정을\n클라이언트와 함께합니다.\n최상의 결과를 위해 디테일 하나하나를 책임집니다.',
  },
];

function SectionContent({
  s,
  mobile = false,
  textStyle,
}: {
  s: typeof sections[0];
  mobile?: boolean;
  textStyle?: React.CSSProperties;
}) {
  const titleSize = mobile ? 'text-[1.65rem]' : 'text-[3.25rem]';
  const enSize    = mobile ? 'text-[0.95rem]' : 'text-[1.3rem]';
  const descSize  = mobile ? 'text-[0.72rem]' : 'text-[0.82rem]';

  return (
    <>
      <div className="absolute inset-0 bg-black/48" />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8"
        style={textStyle}
      >
        <p className="text-[0.55rem] tracking-[0.6em] uppercase text-white/55 mb-6 md:mb-8">
          {s.label}
        </p>

        <h2 className={`${titleSize} font-light leading-[1.3] text-white pb-5 md:pb-6 border-b border-white/35 w-fit max-w-xl`}
          style={{ whiteSpace: 'pre-line' }}>
          {s.ko}
        </h2>

        <p className={`${enSize} font-extralight tracking-[0.15em] text-white/80 mt-5 md:mt-6 mb-6 md:mb-8`}>
          {s.en}
        </p>

        <p className={`${descSize} text-white/50 leading-[2.1] max-w-sm md:max-w-md`}
          style={{ whiteSpace: 'pre-line' }}>
          {s.desc}
        </p>
      </div>

    </>
  );
}

const mainNavLinks = [
  { label: 'Home',      href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Retail',    href: '#retail' },
  { label: 'Office',    href: '#office' },
  { label: 'Residence', href: '#residence' },
  { label: 'Exercise',  href: '#exercise' },
];

const subNavLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact',   href: '#contact' },
];

export default function HeroSequence() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [showContent, setShowContent] = useState(false);
  const seqRef    = useRef<HTMLDivElement>(null);
  const sec2Ref   = useRef<HTMLDivElement>(null);
  const sec3Ref   = useRef<HTMLDivElement>(null);
  const navScrolledRef = useRef(false);
  const slowVideo = (el: HTMLVideoElement | null) => {
    if (el) el.playbackRate = 0.4;
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    const t = setTimeout(() => setShowContent(true), 1900);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  const setNav = (v: boolean) => {
    if (v === navScrolledRef.current) return;
    navScrolledRef.current = v;
    setNavScrolled(v);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const onScroll = () => setNav(window.scrollY >= window.innerHeight * 0.8);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

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
      {/* ── GNB (전체 공통) ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          navScrolled
            ? 'bg-white/95 backdrop-blur-sm border-black/8 py-3'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* 로고 */}
          <a href="#hero">
            <Image
              src={navScrolled ? LOGO_BLACK : LOGO_WHITE}
              alt="씨앤에스디자인"
              width={130}
              height={44}
              className="h-9 w-auto object-contain transition-all duration-500"
              priority
            />
          </a>

          {/* 주 메뉴 — 데스크탑 */}
          <div className={`hidden lg:flex items-center gap-8 text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-500 ${
            navScrolled ? 'text-[#1c1c1c]' : 'text-white/85'
          }`}>
            {[...mainNavLinks, ...subNavLinks].map(({ label, href }) => (
              <a key={label} href={href} className="hover:opacity-60 transition-opacity">
                {label}
              </a>
            ))}
          </div>

          {/* 햄버거 — 모바일 */}
          <button aria-label="메뉴" className="lg:hidden flex flex-col gap-1.25">
            <span className={`block w-5 h-[1.5px] transition-colors duration-500 ${navScrolled ? 'bg-[#1c1c1c]' : 'bg-white'}`} />
            <span className={`block w-5 h-[1.5px] transition-colors duration-500 ${navScrolled ? 'bg-[#1c1c1c]' : 'bg-white'}`} />
            <span className={`block w-5 h-[1.5px] transition-colors duration-500 ${navScrolled ? 'bg-[#1c1c1c]' : 'bg-white'}`} />
          </button>
        </nav>
      </header>

      {/* ── 데스크탑: 300vh 스티키 시퀀스 ── */}
      <div ref={seqRef} style={{ height: '300vh' }} className="hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden">

          <section id="hero" className="absolute inset-0" style={{ zIndex: 10 }}>
            <video
              ref={slowVideo}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/design_hero.mp4" type="video/mp4" />
            </video>

            {/* 인트로 로고 */}
            <div
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              style={{
                opacity: showContent ? 0 : 1,
                transition: showContent ? 'opacity 0.8s ease-out' : 'none',
              }}
            >
              <Image
                src={LOGO_WHITE}
                alt="씨앤에스디자인"
                width={300}
                height={102}
                className="w-auto"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(28px)',
                  transition: 'opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.22,1,0.36,1)',
                }}
                priority
              />
            </div>

            <SectionContent
              s={sections[0]}
              textStyle={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                transition: showContent
                  ? 'opacity 1s ease-out 0.1s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.1s'
                  : 'none',
              }}
            />

            {/* 스크롤 다운 인디케이터 */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
              <span className="text-[0.5rem] tracking-[0.55em] uppercase">Scroll Down</span>
              <span
                className="block w-px h-14 bg-white/40"
                style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
              />
            </div>
          </section>

          <div ref={sec2Ref} className="absolute inset-0" style={{ zIndex: 20, transform: 'translateY(100%)' }}>
            <Image src={sections[1].src} alt="Design Philosophy"
              fill loading="lazy" sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <SectionContent s={sections[1]} />
          </div>

          <div ref={sec3Ref} className="absolute inset-0" style={{ zIndex: 30, transform: 'translateY(100%)' }}>
            <Image src={sections[2].src} alt="Our Process"
              fill loading="lazy" sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <SectionContent s={sections[2]} />
          </div>

        </div>
      </div>

      {/* ── 모바일: 3개 풀스크린 스택 ── */}
      <div className="md:hidden">
        <div id="hero" className="relative h-dvh">
          <video
            ref={slowVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/design_hero.mp4" type="video/mp4" />
          </video>

          {/* 인트로 로고 */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{
              opacity: showContent ? 0 : 1,
              transition: showContent ? 'opacity 0.8s ease-out' : 'none',
            }}
          >
            <Image
              src={LOGO_WHITE}
              alt="씨앤에스디자인"
              width={220}
              height={74}
              className="w-auto"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 1.1s ease-out, transform 1.1s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>

          <SectionContent
            s={sections[0]}
            mobile
            textStyle={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
              transition: showContent
                ? 'opacity 1s ease-out 0.1s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.1s'
                : 'none',
            }}
          />
        </div>
        {sections.slice(1).map((s, i) => (
          <div key={i + 1} className="relative h-dvh">
            <Image
              src={s.src}
              alt={s.en}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 1px, 100vw"
              className="object-cover"
            />
            <SectionContent s={s} mobile />
          </div>
        ))}
      </div>
    </>
  );
}
