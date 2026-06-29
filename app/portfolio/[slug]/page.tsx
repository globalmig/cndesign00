"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { projects, imgSrc } from "@/lib/projects";

export default function PortfolioDetail() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const folder = decodeURIComponent(params.slug);
  const project = projects.find((p) => p.folder === folder);

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("cnsdesign@cnsdesign.co.kr").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((i) => (i !== null && project ? (i - 1 + project.images.length) % project.images.length : null)), [project]);
  const next = useCallback(() => setLightbox((i) => (i !== null && project ? (i + 1) % project.images.length : null)), [project]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white/50">프로젝트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* ── NAV ───────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-40 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors">
            <span className="text-lg leading-none">←</span>
            <span>Back</span>
          </button>
          <Link href="/" className="text-xs tracking-[0.3em] uppercase text-white/80">
            CNS Design
          </Link>
        </div>
      </header>

      {/* ── HERO IMAGE ────────────────────────────────────────── */}
      <div className="pt-16">
        <div className="relative w-full h-[60vh] overflow-hidden">
          <Image src={imgSrc(project.folder, project.cover)} alt={project.name} fill className="object-cover" sizes="(max-width: 1920px) 100vw, 1920px" quality={75} priority />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white">
            <p className="text-[0.6rem] tracking-[0.5em] uppercase text-white/50 mb-3">Project</p>
            <h1 className="text-4xl md:text-6xl font-extralight">{project.name}</h1>
            <p className="text-white/50 text-sm mt-3">{project.images.length} photos</p>
          </div>
        </div>
      </div>

      {/* ── GALLERY GRID ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3" style={{ gridAutoRows: "clamp(300px, 42vw, 680px)", gridAutoFlow: "dense" }}>
          {project.images.map((file, i) => {
            const isLast = i === project.images.length - 1;
            const isWide = i === 0 || i % 5 === 0;
            return (
              <button
                key={file}
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden ${isWide ? "col-span-1 md:col-span-2" : ""}`}
                style={isLast && !isWide ? { gridColumn: "1 / -1" } : undefined}
              >
                <Image
                  src={imgSrc(project.folder, file)}
                  alt={`${project.name} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  quality={75}
                  sizes={isWide || isLast ? "(max-width: 1920px) 100vw, 1920px" : "(max-width: 768px) 100vw, 960px"}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="text-white text-2xl">↗</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── INQUIRY ───────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] text-white py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-4">Inquiry</p>
          <h2 className="text-2xl md:text-4xl font-extralight mb-8 md:mb-12">비슷한 공간을 원하신다면</h2>
          <div className="border-t border-white/10 pt-8 md:pt-10 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-16">
            <div className="shrink-0">
              <p className="text-sm text-white/70">씨앤에스디자인</p>
              <p className="text-xs text-white/35 mt-1">대표 강정권</p>
            </div>
            <div className="text-xs text-white/35 leading-loose">
              <p>Tel - 032-710-2523</p>
              <p>Fax - 032-710-2267</p>
              <p>E-mail - cnsdesign@cnsdesign.co.kr</p>
              <p>인천광역시 계양구 서운산업로 27, 204, 205호 (서운동 엘림빌딩)</p>
            </div>
            <div className="sm:ml-auto self-center mt-2 sm:mt-0">
              <button
                onClick={copyEmail}
                className="border border-white/20 hover:border-white/60 text-white/60 hover:text-white text-[0.65rem] tracking-[0.35em] uppercase px-8 py-3 transition-all duration-300"
              >
                {copied ? "복사됨 ✓" : "이메일 문의"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────── */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={close}>
          {/* image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={imgSrc(project.folder, project.images[lightbox])}
              alt={`${project.name} ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1920px) 100vw, 1920px"
              quality={80}
              priority
            />
          </div>

          {/* close */}
          <button onClick={close} className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl leading-none transition-colors">
            ×
          </button>

          {/* counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
            {lightbox + 1} / {project.images.length}
          </div>

          {/* arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl transition-colors px-4 py-6"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl transition-colors px-4 py-6"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
