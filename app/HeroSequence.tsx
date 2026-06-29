"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LOGO_WHITE = "/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png";
const LOGO_BLACK = "/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%EB%B8%94%EB%9E%99.png";
const LOGO_NATURAL_W = 384;
const LOGO_PARTS = [
  { src: "/logo/logo_part_1.png", x: 0,   y: 0,  w: 113, h: 135 },
  { src: "/logo/logo_part_2.png", x: 113, y: 0,  w: 99,  h: 86  },
  { src: "/logo/logo_part_3.png", x: 212, y: 0,  w: 172, h: 86  },
  { src: "/logo/logo_part_4.png", x: 113, y: 86, w: 271, h: 49  },
] as const;

const sections = [
  {
    src: "",
    label: "Interior Design Studio",
    ko: "고객을 위한 최상의\n디자인을 제공합니다.",
    en: "Must Be Design For You",
    desc: "씨앤에스디자인은 고객 여러분을 위한 디자인을 최우선으로 합니다.\n방대한 디자인 작업물과 다양한 공간의 디자인 경험으로 고객을 위한 디자인을 제공하고\n다년간의 시공 경험으로 최상의 디자인과 최선의 디테일을 제공합니다.",
  },
  {
    src: "/hero/hero_bg_02.png",
    label: "Design Philosophy",
    ko: "공간을 넘어,\n경험을 디자인합니다.",
    en: "Beyond Space, Design Experience",
    desc: "기능적 완성도와 감각적 아름다움의 균형을 통해\n클라이언트의 비전이 공간이 됩니다.\n사람과 공간이 만들어내는 이야기를 디자인합니다.",
  },
  {
    src: "/hero/hero_bg_03.png",
    label: "Our Process",
    ko: "처음 만남부터\n완공의 순간까지.",
    en: "From First Meeting to Completion",
    desc: "기획·설계·시공·마감, 모든 과정을\n클라이언트와 함께합니다.\n최상의 결과를 위해 디테일 하나하나를 책임집니다.",
  },
];

function SectionContent({ s, mobile = false, textStyle }: { s: (typeof sections)[0]; mobile?: boolean; textStyle?: React.CSSProperties }) {
  const titleSize = mobile ? "text-[1.65rem]" : "text-[3.25rem]";
  const enSize = mobile ? "text-[0.95rem]" : "text-[1.3rem]";
  const descSize = mobile ? "text-[0.72rem]" : "text-[0.82rem]";

  return (
    <>
      <div className="absolute inset-0 bg-black/48" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8" style={textStyle}>
        <p className="text-[0.55rem] tracking-[0.6em] uppercase text-white/55 mb-6 md:mb-8">{s.label}</p>
        <h2 className={`${titleSize} font-light leading-[1.3] text-white pb-5 md:pb-6 border-b border-white/35 w-fit max-w-xl`} style={{ whiteSpace: "pre-line" }}>
          {s.ko}
        </h2>
        <p className={`${enSize} font-extralight tracking-[0.15em] text-white/80 mt-5 md:mt-6 mb-6 md:mb-8`}>{s.en}</p>
        <p className={`${descSize} text-white/50 leading-[2.1] max-w-sm md:max-w-md`} style={{ whiteSpace: "pre-line" }}>
          {s.desc}
        </p>
      </div>
    </>
  );
}

const mainNavLinks = [
  { label: "About", href: "#about" },
  { label: "Retail", href: "#retail" },
  { label: "Exercise", href: "#exercise" },
  { label: "Residence", href: "#residence" },
  { label: "Office & Etc", href: "#office" },
];

const subNavLinks = [{ label: "Contact", href: "#contact" }];

export default function HeroSequence() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const seqRef = useRef<HTMLDivElement>(null);
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const sec3Ref = useRef<HTMLDivElement>(null);
  const navScrolledRef = useRef(false);

  const slowVideo = (el: HTMLVideoElement | null) => {
    if (el) el.playbackRate = 0.15;
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 새로고침 시 항상 인트로부터 시작
    const frame = requestAnimationFrame(() => setMounted(true));
    // 로고 애니메이션 완료 후 히어로 섹션으로 자동 스크롤
    const t = setTimeout(() => {
      if (window.scrollY > 50) return; // 이미 스크롤한 경우 건너뜀
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      } else if (seqRef.current) {
        window.scrollTo({ top: seqRef.current.offsetTop + window.innerHeight, behavior: "smooth" });
      }
    }, 5500);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t);
    };
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
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    if (!seqRef.current || !sec1Ref.current || !sec2Ref.current || !sec3Ref.current) return;

    let isSnapping = false;

    const snapTo = (y: number) => {
      isSnapping = true;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => { isSnapping = false; }, 1400);
    };

    const onScroll = () => {
      if (!seqRef.current || !sec1Ref.current || !sec2Ref.current || !sec3Ref.current) return;
      const rect = seqRef.current.getBoundingClientRect();
      const maxScroll = seqRef.current.offsetHeight - window.innerHeight; // 3 * vh
      const scrolled = Math.max(0, -rect.top);
      const p = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;

      setNav(scrolled >= maxScroll);

      sec1Ref.current.style.transform = `translateY(${Math.max(0, (1 - p * 3) * 100)}%)`;
      sec2Ref.current.style.transform = `translateY(${Math.max(0, (1 - (p - 1 / 3) * 3) * 100)}%)`;
      sec3Ref.current.style.transform = `translateY(${Math.max(0, (1 - (p - 2 / 3) * 3) * 100)}%)`;
    };

    const onWheel = (e: WheelEvent) => {
      if (!seqRef.current) return;
      const seqTop = seqRef.current.offsetTop;
      const vh = window.innerHeight;
      const relScroll = window.scrollY - seqTop;

      if (relScroll < 0 || relScroll > 3 * vh) return;

      const section = Math.round(relScroll / vh);
      if (section >= 3 && e.deltaY > 0) return;
      if (section <= 0 && e.deltaY < 0) return;

      e.preventDefault();
      if (isSnapping) return;

      snapTo(seqTop + (e.deltaY > 0 ? section + 1 : section - 1) * vh);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      {/* ── GNB ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
          menuOpen ? "bg-[#1c1c1c] border-transparent py-5" : navScrolled ? "bg-white/95 backdrop-blur-sm border-black/8 py-3" : "bg-transparent border-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#intro" onClick={() => setMenuOpen(false)}>
            <Image src={navScrolled && !menuOpen ? LOGO_BLACK : LOGO_WHITE} alt="씨앤에스디자인" width={130} height={44} className="h-9 w-auto object-contain transition-all duration-500" priority />
          </a>
          <div className={`hidden lg:flex items-center gap-8 text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-500 ${navScrolled ? "text-[#1c1c1c]" : "text-white/85"}`}>
            {[...mainNavLinks, ...subNavLinks].map(({ label, href }) => (
              <a key={label} href={href} className="hover:opacity-60 transition-opacity">
                {label}
              </a>
            ))}
          </div>
          <button aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} onClick={() => setMenuOpen((v) => !v)} className="lg:hidden relative w-6 h-4 flex flex-col justify-between">
            <span className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7.5px] bg-white" : navScrolled ? "bg-[#1c1c1c]" : "bg-white"}`} />
            <span className={`block w-full h-[1.5px] transition-all duration-300 ${menuOpen ? "opacity-0 bg-white" : navScrolled ? "bg-[#1c1c1c]" : "bg-white"}`} />
            <span className={`block w-full h-[1.5px] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 translate-y-[-7.5px] bg-white" : navScrolled ? "bg-[#1c1c1c]" : "bg-white"}`} />
          </button>
        </nav>
      </header>

      {/* ── 모바일 메뉴 오버레이 ── */}
      <div
        className={`fixed inset-0 z-45 bg-[#1c1c1c] flex flex-col items-center justify-center lg:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-7">
          {[...mainNavLinks, ...subNavLinks].map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-extralight tracking-[0.2em] uppercase hover:text-white/50 transition-all duration-300"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${menuOpen ? i * 50 : 0}ms, transform 0.4s ease ${menuOpen ? i * 50 : 0}ms`,
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-12 text-white/20 text-[0.6rem] tracking-[0.4em] uppercase" style={{ opacity: menuOpen ? 1 : 0, transition: "opacity 0.4s ease 0.4s" }}>
          CNS Design
        </div>
      </div>

      {/* ── 데스크탑: 400vh 스티키 시퀀스 (인트로 + 히어로 3개) ── */}
      <div ref={seqRef} style={{ height: "400vh" }} className="hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* 인트로 섹션 — 로고 애니메이션 (z=10, 항상 하단에 존재) */}
          <section id="intro" className="absolute inset-0" style={{ zIndex: 10 }}>
            <video ref={slowVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/video/design_hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/58" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
              {/* 황금 광원 */}
              <div style={{
                position: "absolute",
                width: "600px", height: "380px",
                background: "radial-gradient(ellipse at center, rgba(160,128,96,0.18) 0%, transparent 65%)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 2.8s ease-out 0.1s",
              }} />

              {/* 상단 골드 다이아몬드 */}
              <div style={{
                width: "7px", height: "7px",
                border: "1px solid rgba(160,128,96,0.75)",
                transform: mounted ? "rotate(45deg) scale(1)" : "rotate(45deg) scale(0)",
                opacity: mounted ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s, opacity 0.5s ease-out 0.3s",
                marginBottom: "22px",
              }} />

              {/* 로고 — 파트별 PNG 순서대로 스르륵 등장 */}
              <div style={{ position: "relative", width: 340, height: 120 }}>
                {LOGO_PARTS.map(({ src, x, y, w, h }, i) => {
                  const S = 340 / LOGO_NATURAL_W;
                  const delay = `${1.0 + i * 0.4}s`;
                  return (
                    <img
                      key={i}
                      src={src}
                      alt={i === 0 ? "씨앤에스디자인" : ""}
                      aria-hidden={i > 0 ? "true" : undefined}
                      style={{
                        position: "absolute",
                        left: Math.round(x * S),
                        top: Math.round(y * S),
                        width: Math.round(w * S),
                        height: Math.round(h * S),
                        display: "block",
                        opacity: mounted ? 1 : 0,
                        filter: mounted ? "blur(0px)" : "blur(10px)",
                        transform: mounted ? "translateY(0)" : "translateY(-28px)",
                        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}, filter 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}`,
                      }}
                    />
                  );
                })}
              </div>

              {/* 장식 3분할 선 — 로고 완성 후 등장 */}
              <div style={{ display: "flex", alignItems: "center", marginTop: "26px" }}>
                <div style={{
                  height: "1px", width: "90px",
                  background: "rgba(255,255,255,0.15)",
                  transformOrigin: "right",
                  transform: mounted ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 1.0s cubic-bezier(0.22,1,0.36,1) 3.5s",
                }} />
                <div style={{
                  width: "4px", height: "4px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.22)",
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.4s ease-out 3.9s",
                  margin: "0 7px",
                }} />
                <div style={{
                  height: "1px", width: "52px",
                  background: "#a08060",
                  transformOrigin: "center",
                  transform: mounted ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1) 3.7s",
                }} />
                <div style={{
                  width: "4px", height: "4px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.22)",
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.4s ease-out 3.9s",
                  margin: "0 7px",
                }} />
                <div style={{
                  height: "1px", width: "90px",
                  background: "rgba(255,255,255,0.15)",
                  transformOrigin: "left",
                  transform: mounted ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 1.0s cubic-bezier(0.22,1,0.36,1) 3.5s",
                }} />
              </div>

              {/* 스튜디오 레이블 — letter-spacing 전개 */}
              <p
                className="text-[0.55rem] uppercase text-white/55 font-light"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(12px)",
                  letterSpacing: mounted ? "0.65em" : "0.1em",
                  marginTop: "20px",
                  transition: "opacity 0.9s ease-out 4.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 4.1s, letter-spacing 1.4s ease-out 3.9s",
                }}
              >
                Interior Design Studio
              </p>
            </div>
          </section>

          {/* 히어로 섹션 1 — 텍스트 콘텐츠 (비디오 동일) */}
          <div ref={sec1Ref} className="absolute inset-0" style={{ zIndex: 20, transform: "translateY(100%)", transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)" }}>
            <section id="hero" className="absolute inset-0">
              <video ref={slowVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/video/design_hero.mp4" type="video/mp4" />
              </video>
              <SectionContent s={sections[0]} />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/40">
                <span className="text-[0.5rem] tracking-[0.55em] uppercase">Scroll Down</span>
                <span className="block w-px h-14 bg-white/40" style={{ animation: "scrollLine 1.8s ease-in-out infinite" }} />
              </div>
            </section>
          </div>

          {/* 히어로 섹션 2 */}
          <div ref={sec2Ref} className="absolute inset-0" style={{ zIndex: 30, transform: "translateY(100%)", transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)" }}>
            <Image src={sections[1].src} alt="Design Philosophy" fill loading="lazy" sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <SectionContent s={sections[1]} />
          </div>

          {/* 히어로 섹션 3 */}
          <div ref={sec3Ref} className="absolute inset-0" style={{ zIndex: 40, transform: "translateY(100%)", transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)" }}>
            <Image src={sections[2].src} alt="Our Process" fill loading="lazy" sizes="(max-width: 767px) 1px, 100vw" className="object-cover" />
            <SectionContent s={sections[2]} />
          </div>
        </div>
      </div>

      {/* ── 모바일: 4개 풀스크린 스택 (인트로 + 히어로 3개) ── */}
      <div className="md:hidden">
        {/* 인트로 */}
        <div id="intro" className="relative h-dvh">
          <video ref={slowVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/video/design_hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            {/* 황금 광원 */}
            <div style={{
              position: "absolute",
              width: "360px", height: "260px",
              background: "radial-gradient(ellipse at center, rgba(160,128,96,0.18) 0%, transparent 65%)",
              opacity: mounted ? 1 : 0,
              transition: "opacity 2.8s ease-out 0.1s",
            }} />

            {/* 상단 골드 다이아몬드 */}
            <div style={{
              width: "6px", height: "6px",
              border: "1px solid rgba(160,128,96,0.75)",
              transform: mounted ? "rotate(45deg) scale(1)" : "rotate(45deg) scale(0)",
              opacity: mounted ? 1 : 0,
              transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s, opacity 0.5s ease-out 0.3s",
              marginBottom: "18px",
            }} />

            {/* 로고 — 파트별 PNG 순서대로 스르륵 등장 */}
            <div style={{ position: "relative", width: 230, height: 81 }}>
              {LOGO_PARTS.map(({ src, x, y, w, h }, i) => {
                const S = 230 / LOGO_NATURAL_W;
                const delay = `${1.0 + i * 0.4}s`;
                return (
                  <img
                    key={i}
                    src={src}
                    alt={i === 0 ? "씨앤에스디자인" : ""}
                    aria-hidden={i > 0 ? "true" : undefined}
                    style={{
                      position: "absolute",
                      left: Math.round(x * S),
                      top: Math.round(y * S),
                      width: Math.round(w * S),
                      height: Math.round(h * S),
                      display: "block",
                      opacity: mounted ? 1 : 0,
                      filter: mounted ? "blur(0px)" : "blur(10px)",
                      transform: mounted ? "translateY(0)" : "translateY(-28px)",
                      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}, filter 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}`,
                    }}
                  />
                );
              })}
            </div>

            {/* 장식 3분할 선 — 로고 완성 후 등장 */}
            <div style={{ display: "flex", alignItems: "center", marginTop: "22px" }}>
              <div style={{
                height: "1px", width: "64px",
                background: "rgba(255,255,255,0.15)",
                transformOrigin: "right",
                transform: mounted ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.0s cubic-bezier(0.22,1,0.36,1) 3.5s",
              }} />
              <div style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.4s ease-out 3.9s",
                margin: "0 6px",
              }} />
              <div style={{
                height: "1px", width: "40px",
                background: "#a08060",
                transformOrigin: "center",
                transform: mounted ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1) 3.7s",
              }} />
              <div style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.4s ease-out 3.9s",
                margin: "0 6px",
              }} />
              <div style={{
                height: "1px", width: "64px",
                background: "rgba(255,255,255,0.15)",
                transformOrigin: "left",
                transform: mounted ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.0s cubic-bezier(0.22,1,0.36,1) 3.5s",
              }} />
            </div>

            {/* 스튜디오 레이블 */}
            <p
              className="text-[0.5rem] uppercase text-white/55 font-light"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                letterSpacing: mounted ? "0.6em" : "0.1em",
                marginTop: "18px",
                transition: "opacity 0.9s ease-out 4.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 4.1s, letter-spacing 1.4s ease-out 3.9s",
              }}
            >
              Interior Design Studio
            </p>
          </div>
        </div>

        {/* 히어로 섹션 1 */}
        <div id="hero" className="relative h-dvh">
          <video ref={slowVideo} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/video/design_hero.mp4" type="video/mp4" />
          </video>
          <SectionContent s={sections[0]} mobile />
        </div>

        {/* 히어로 섹션 2, 3 */}
        {sections.slice(1).map((s, i) => (
          <div key={i + 1} className="relative h-dvh">
            <Image src={s.src} alt={s.en} fill loading="lazy" sizes="(min-width: 768px) 1px, 100vw" className="object-cover" />
            <SectionContent s={s} mobile />
          </div>
        ))}
      </div>
    </>
  );
}
