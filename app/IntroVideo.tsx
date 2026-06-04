"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const [gone, setGone] = useState(true);   // 서버 렌더 시 오버레이 숨김
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("introPlayed")) setGone(false);
  }, []);
  // idle → seeking(currentTime 이동 중) → ready(재생 가능)
  const phaseRef = useRef<"idle" | "seeking" | "ready">("idle");

  const dismiss = () => {
    if (fading || gone) return;
    sessionStorage.setItem("introPlayed", "1");
    setFading(true);
    setTimeout(() => setGone(true), 700);
  };

  // duration 확보 후 1/3 지점으로 seek 시작
  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v || !v.duration || phaseRef.current !== "idle") return;
    phaseRef.current = "seeking";
    v.currentTime = v.duration / 3;
  };

  // seek 완료 → ready 상태로 전이
  const handleSeeked = () => {
    if (phaseRef.current === "seeking") phaseRef.current = "ready";
  };

  // 버퍼가 확보된 뒤 canplay 발화 → 그때 재생 시작
  const handleCanPlay = () => {
    const v = videoRef.current;
    if (!v || phaseRef.current !== "ready" || !v.paused) return;
    v.playbackRate = 2.0;
    v.play().catch(() => {});
  };

  if (gone) return null;

  return (
    <div className={`fixed inset-0 z-300 bg-black transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        onCanPlay={handleCanPlay}
        onEnded={dismiss}
        className="w-full h-full object-cover"
        src="/video/hero.mp4"
      />
    </div>
  );
}
