import Image from 'next/image';
import Link from 'next/link';
import { projects, imgSrc } from '@/lib/projects';
import HeroSequence from './HeroSequence';

export default function Home() {
  return (
    <div className="text-[#1c1c1c]">

      <HeroSequence />

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
                  loading="lazy"
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
            loading="lazy"
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
          <div className="border-t border-white/10 pt-10 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-20">
            <div className="shrink-0">
              <p className="text-sm text-white/70">씨앤에스디자인</p>
              <p className="text-xs text-white/35 mt-1">대표 유두석</p>
            </div>
            <div className="text-xs text-white/35 leading-loose">
              <p>Fax. 032-710-2267</p>
              <p>cnsdesign@cnsdesign.co.kr</p>
              <p>인천광역시 계양구 서운산어로 27, 204,205호 (서운동 엘림빌딩)</p>
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
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
