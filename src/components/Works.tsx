"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import WorksCharacter from "./WorksCharacter";
import RocketAnimation from "./RocketAnimation";

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lookRight, setLookRight] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const svgEl = document.querySelector("#works svg");
      if (!svgEl) return;

      const rect = svgEl.getBoundingClientRect();
      const eyeX = rect.left + rect.width * (180 / 604);

      setLookRight(e.clientX > eyeX);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} id="works" className="dot-grid w-full px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setIsInView(true)}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[1136px] overflow-visible rounded-xl border border-black bg-[#ffe68c] p-6 drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] sm:p-8"
      >
        {/* Character + monitor — left side, head pokes above */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-0 left-[-15px] hidden w-[510px] min-[900px]:block xl:w-[630px]"
        >
          <div className="relative w-full">
            <WorksCharacter className="h-auto w-full" lookRight={lookRight} />
            {isInView && (
              <RocketAnimation
                className="absolute top-0 left-0 h-auto w-full"
                style={{ transform: "translateX(230px)" }}
              />
            )}
          </div>
        </motion.div>

        <div className="flex flex-col items-start min-[900px]:items-end">
          <div className="flex w-full max-w-[463px] flex-col gap-6">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-sans text-[28px] font-bold leading-tight tracking-[-0.8px] text-black sm:text-[40px] sm:leading-[1.4]">
                Proof&apos;s in the Pixels
              </h2>
              <p className="text-[15px] leading-6 text-ink sm:text-[16px]">
                Everyone has ideas. Few show the work. This is mine — built with patience, not shortcuts.
                No AI in the process. Just thinking, sketching, failing, fixing. Still proud of every bit.
              </p>
            </div>

            <a
              href={site.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center gap-1.5 rounded-full border border-black bg-white px-3.5 py-2.5 text-[14px] font-black text-ink shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none"
            >
              <Image src="/images/icon-behance.svg" alt="Behance" width={20} height={20} className="h-5 w-auto" />
              Take a Look!!
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
