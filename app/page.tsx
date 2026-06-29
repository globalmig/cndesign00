import Image from "next/image";
import Link from "next/link";
import { projects, imgSrc, type Category } from "@/lib/projects";
import HeroSequence from "./HeroSequence";
import QuickNav from "./QuickNav";

const CATEGORIES: {
  id: Category;
  label: string;
  title: string;
  desc: string;
  bg: string;
  accent: string;
}[] = [
  {
    id: "retail",
    label: "Retail",
    title: "Retail",
    desc: "카페, 레스토랑, 쇼룸 등 다양한 상업 공간의 인테리어를 전문으로 합니다.",
    bg: "bg-black",
    accent: "text-[#a08060]",
  },
  {
    id: "exercise",
    label: "Exercise",
    title: "Exercise",
    desc: "피트니스 센터, 필라테스 스튜디오 등 건강한 공간을 디자인합니다.",
    bg: "bg-black",
    accent: "text-[#a08060]",
  },
  {
    id: "residence",
    label: "Residence",
    title: "Residence",
    desc: "호텔과 프라이빗 주거 공간의 프리미엄 인테리어를 제공합니다.",
    bg: "bg-black",
    accent: "text-[#a08060]",
  },
  {
    id: "office",
    label: "Office & Etc",
    title: "Office & Etc",
    desc: "브랜드 아이덴티티와 업무 효율을 함께 담은 오피스 및 기타 공간을 디자인합니다.",
    bg: "bg-black",
    accent: "text-[#a08060]",
  },
];

function FlipCard({ p, sizes, colSpanClass = "", rowSpanClass = "" }: { p: (typeof projects)[0]; sizes: string; colSpanClass?: string; rowSpanClass?: string }) {
  return (
    <Link href={`/portfolio/${encodeURIComponent(p.folder)}`} className={["flip-card block h-full", colSpanClass, rowSpanClass].filter(Boolean).join(" ")} style={{ perspective: "1200px" }}>
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front overflow-hidden bg-[#111]">
          <Image src={imgSrc(p.folder, p.cover)} alt={p.name} fill loading="lazy" className="object-cover" sizes={sizes} />
        </div>
        {/* Back */}
        <div className="flip-card-back bg-[#1c1c1c] flex flex-col items-center justify-center text-white p-8">
          <p className="text-[0.58rem] tracking-[0.45em] uppercase text-[#a08060] mb-5">CNS Design</p>
          <p className="text-lg font-light tracking-wide mb-5">{p.name}</p>
          <div className="w-8 h-px bg-white/25 mb-5" />
          <p className="text-white/70 text-[0.65rem] tracking-[0.3em] uppercase">View Project →</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="bg-black text-white">
      <QuickNav />
      <HeroSequence />

      {/* ── 카테고리 섹션 ─────────────────────────────────────────── */}
      {CATEGORIES.map((cat) => {
        const list = projects.filter((p) => p.category === cat.id);
        const cols = list.length <= 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2 md:grid-cols-3";
        const rowH = list.length <= 2 ? "clamp(280px, 35vw, 560px)" : "clamp(200px, 24vw, 380px)";

        return (
          <section key={cat.id} id={cat.id} className={`${cat.bg} py-14 md:py-24 px-4 md:px-8`}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-3 md:gap-4">
                <div>
                  <h2 className="text-2xl md:text-4xl font-semibold text-[#a08060]">{cat.title}</h2>
                </div>
                <p className="text-white/70 text-sm leading-loose max-w-xs md:text-right">{cat.desc}</p>
              </div>

              <div className={`grid ${cols} gap-2 md:gap-3`} style={{ gridAutoRows: rowH, gridAutoFlow: "dense" }}>
                {list.flatMap((p, idx) => {
                  const isLast = idx === list.length - 1;
                  const card = (
                    <FlipCard
                      key={p.folder}
                      p={p}
                      colSpanClass={isLast && list.length > 2 ? "col-span-full" : list.length > 2 && p.colSpan === 2 ? "col-span-2" : ""}
                      rowSpanClass={!isLast && list.length > 2 && p.rowSpan === 2 ? "md:row-span-2" : ""}
                      sizes={
                        isLast && list.length > 2 ? "100vw" : list.length <= 2 ? "(max-width: 768px) 100vw, 50vw" : p.colSpan === 2 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"
                      }
                    />
                  );
                  if (cat.id === "exercise" && isLast) {
                    return [
                      <div key="cns-logo" className="hidden md:flex flex-col items-center justify-center bg-[#111] gap-4">
                        <Image
                          src="/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png"
                          alt="씨앤에스디자인"
                          width={280}
                          height={84}
                          className="w-56 h-auto object-contain opacity-85"
                        />
                        <p className="text-[0.58rem] tracking-[0.4em] uppercase text-white/60">Design Studio</p>
                      </div>,
                      card,
                    ];
                  }
                  return card;
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── PORTFOLIO ────────────────────────────────────────────── */}
      <section id="portfolio" className="hidden bg-black py-16 md:py-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-4">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-extralight text-white">Portfolio</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3" style={{ gridAutoRows: "clamp(220px, 28vw, 420px)", gridAutoFlow: "dense" }}>
            {projects.map((p, idx) => {
              const isLast = idx === projects.length - 1;
              return (
                <Link
                  key={p.folder}
                  href={`/portfolio/${encodeURIComponent(p.folder)}`}
                  className={["group relative overflow-hidden bg-[#111]", !isLast && p.colSpan === 2 ? "col-span-2" : "", !isLast && p.rowSpan === 2 ? "md:row-span-2" : ""].join(" ")}
                  style={isLast ? { gridColumn: "1 / -1" } : undefined}
                >
                  <Image
                    src={imgSrc(p.folder, p.cover)}
                    alt={p.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
                    sizes={isLast ? "100vw" : p.colSpan === 2 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
      <section id="about" className="flex flex-col md:flex-row min-h-screen bg-black">
        <div className="relative w-full md:w-1/2 min-h-[55vw] md:min-h-0">
          <Image src="/about.jpg" alt="About CNS Design" fill loading="lazy" className="object-cover" sizes="50vw" />
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center bg-black px-6 md:px-12 py-14 md:py-24">
          <div className="max-w-105 w-full">
            <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-5">About Us</p>
            <h2 className="text-2xl md:text-3xl font-extralight mb-8 md:mb-10 leading-relaxed text-white">씨앤에스디자인</h2>
            <p className="text-white/75 leading-loose mb-6 text-[0.95rem]">씨앤에스디자인은 상업 공간, 호텔, 카페, 피트니스, 사무실 등 다양한 분야의 인테리어를 전문으로 합니다.</p>
            <p className="text-white/75 leading-loose text-[0.95rem]">클라이언트의 비전을 공간으로 실현하고, 사람과 공간이 만들어내는 이야기를 디자인합니다.</p>
            <div className="mt-10 md:mt-12 flex gap-10 md:gap-12 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-extralight text-white">
                  17<span className="text-[#a08060] text-sm ml-1">+</span>
                </p>
                <p className="text-[0.7rem] tracking-widest uppercase text-white/65 mt-1">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-extralight text-white">
                  100<span className="text-[#a08060] text-sm ml-1">+</span>
                </p>
                <p className="text-[0.7rem] tracking-widest uppercase text-white/65 mt-1">Photos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-black text-white py-16 md:py-28 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[0.65rem] tracking-[0.5em] uppercase text-[#a08060] mb-4">Contact</p>
          <h2 className="text-2xl md:text-4xl font-extralight mb-10 md:mb-16">함께 만들어가요</h2>
          <div className="border-t border-white/10 pt-8 md:pt-10 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-16">
            <div className="shrink-0">
              <p className="text-sm text-white/90">씨앤에스디자인</p>
              <p className="text-xs text-white/65 mt-1">대표 강정권</p>
            </div>
            <div className="text-xs text-white/65 leading-loose">
              <p>Tel - 032-710-2523</p>
              <p>Fax - 032-710-2267</p>
              <p>E-mail - cnsdesign@cnsdesign.co.kr</p>
              <p>인천광역시 계양구 서운산업로 27, 204, 205호 (서운동 엘림빌딩)</p>
            </div>
          </div>
          <div className="mt-12 md:mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-white/45 text-xs tracking-wider">© 2026 CNS Design. All rights reserved.</p>
              <div className="text-white/45 text-xs tracking-wider">
                Created by{" "}
                <a href="https://www.weasley-market.com/homepage-development" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">
                  GlobalMIG
                </a>
              </div>
            </div>
            <Image
              src="/logo/%EC%94%A8%EC%95%A4%EC%97%90%EC%8A%A4%20%EB%A1%9C%EA%B3%A0-%ED%99%94%EC%9D%B4%ED%8A%B8.png"
              alt="씨앤에스디자인"
              width={80}
              height={24}
              className="h-5 w-auto object-contain opacity-20"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
