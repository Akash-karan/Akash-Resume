"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site, gmailComposeHref } from "@/lib/site";
import NoteCard from "./NoteCard";

export default function Hero() {
  const [clickCount, setClickCount] = useState(0);
  const [hasClickedName, setHasClickedName] = useState(false);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [lookLeft, setLookLeft] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const screenWidth = window.innerWidth;
      // If cursor is on the left 50% of the screen, look left! Otherwise look right.
      if (e.clientX < screenWidth / 2) {
        setLookLeft(true);
      } else {
        setLookLeft(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNameClick = () => {
    setClickCount(1);
    setHasClickedName(true);
  };

  const handleNextCardState = () => {
    setClickCount((prev) => {
      if (prev >= 4) return 4;
      return prev + 1;
    });
  };

  const handleCardClickBeforeActive = () => {
    setIsHighlighting(true);
    setTimeout(() => setIsHighlighting(false), 800);
  };

  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden pb-16 pt-24 md:pt-[192px] lg:pt-28 flex flex-col justify-center items-center"
    >
      <div className="relative mx-auto w-full max-w-[1136px] md:max-w-[722px] lg:max-w-[1136px] px-6 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-8 pt-0 -translate-y-[10px] lg:translate-y-[10px]">
        
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col gap-6 md:gap-8 w-full max-w-[514px] text-left shrink-0 z-10 relative">
          <div className="flex flex-col items-start select-none">
            <div className="flex items-baseline gap-4 flex-wrap mb-[-5px]">
              <span className="font-sans font-black text-[36px] sm:text-[50px] md:text-[60px] leading-[44px] sm:leading-[1.1] text-black tracking-[-0.72px] sm:tracking-[-1.2px]">
                I’m
              </span>
              <motion.span
                onClick={handleNameClick}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="font-super-pencil text-[72px] sm:text-[80px] md:text-[96px] leading-[1.1] text-[#dc6803] cursor-pointer inline-block drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)] translate-y-[2px]"
              >
                Akash
              </motion.span>
            </div>
            <span className="font-sans font-black text-[36px] sm:text-[50px] md:text-[60px] leading-[44px] sm:leading-[1.1] text-black tracking-[-0.72px] sm:tracking-[-1.2px]">
              Product Designer
            </span>
          </div>

          <div className="font-sans font-medium text-[16px] leading-[24px] text-ink-soft max-w-[514px]">
            <p>
              <span className="font-bold text-[#101828]">1+ year</span> of turning ideas into screens. Not the most experienced in the room — but probably the <span className="font-bold text-[#101828]">most curious.</span> I ask why before I ask how, and that makes all the difference in what I build.
            </p>
          </div>

          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full border border-[#d0d5dd] bg-white px-5 py-2.5 text-[14px] font-black text-[#344054] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none hover:bg-neutral-50 active:bg-neutral-100 cursor-pointer"
          >
            Let’s talk
          </a>

          {/* Click here indicator (arrow + text) */}
          <AnimatePresence>
            {!hasClickedName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHighlighting ? {
                  opacity: 1,
                  scale: [1, 1.05, 0.98, 1.02, 1],
                  rotate: [0, -2, 2, -2, 2, 0],
                } : {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{ opacity: 0 }}
                transition={isHighlighting ? {
                  duration: 0.8,
                  ease: "easeInOut"
                } : {
                  duration: 0.3
                }}
                className="absolute hidden md:block pointer-events-none z-10"
                style={{ left: "0px", top: "0px", width: "100%", height: "100%" }}
              >
                <div 
                  className={`-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-kalam justify-center leading-[0] left-[474.63px] not-italic text-[24px] text-center top-[-51.53px] tracking-[-0.48px] whitespace-nowrap transition-colors duration-300 ${
                    isHighlighting ? "text-[#dc6803] font-bold" : "text-black/70"
                  }`}
                >
                  <p className="leading-[72px]">Click here</p>
                </div>
                
                {/* Arrow */}
                <div 
                  className="absolute flex items-center justify-center left-[363px] w-[50.405px] h-[50.405px] top-[-55.09px]"
                >
                  <div className="-scale-y-100 flex-none rotate-[90.47deg]">
                    <div className="overflow-clip relative w-[50px] h-[50px]">
                      <div className="absolute inset-[8.2%_13.23%_8.26%_13.23%] transition-all duration-300">
                        <Image
                          src="/images/v2/group.svg"
                          alt=""
                          width={50}
                          height={50}
                          className="absolute block inset-0 max-w-none w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Illustration Stage */}
        <div className="relative mx-auto w-full max-w-[341px] aspect-[341/206] sm:max-w-[580px] sm:h-[350px] shrink-0 z-10">

          {/* Card outline (Union) */}
          <div className="absolute inset-[-1.6%_-1.45%_-2.16%_-0.88%]">
            <Image
              src="/images/v2/union.svg"
              alt=""
              fill
              priority
              className="pointer-events-none object-contain"
            />
          </div>

          {/* Portrait Image (Up) */}
          <div className="absolute inset-[-5.03%_-0.03%_-0.06%_1.01%]">
            <Image
              src={lookLeft ? "/images/v2/up1.svg" : "/images/v2/up.svg"}
              alt="Portrait of Akash"
              fill
              priority
              className="pointer-events-none object-contain"
            />
          </div>

          {/* Interactive Ruled Note Card Component */}
          <NoteCard clickCount={clickCount} onNext={handleNextCardState} onCardClickBeforeActive={handleCardClickBeforeActive} />

          {/* Laptop Screen Boundary Container for Draggable Stickers */}
          <div 
            ref={screenRef}
            className="absolute left-[57.7%] top-[38%] w-[40.5%] h-[60.5%] pointer-events-none z-20"
          >
            {/* Draggable Sticker 1 (Orange card) */}
            <motion.div
              drag
              dragConstraints={screenRef}
              dragElastic={0.01}
              dragMomentum={false}
              whileHover={{ scale: 1.15 }}
              whileDrag={{ scale: 1.2, cursor: "grabbing" }}
              initial={{ rotate: -7.63 }}
              style={{ touchAction: "pan-y" }}
              className="absolute left-[calc(22%-1px)] md:left-[calc(22%+9px)] lg:left-[calc(22%+2px)] top-[28%] md:top-[calc(28%-7px)] lg:top-[calc(28%-5px)] w-[32px] h-[31px] sm:w-[47px] sm:h-[46px] bg-[#ff8901] rounded-[2px] p-[4px] sm:p-[6px] shadow-[2px_2px_4px_rgba(16,24,40,0.15)] flex items-center justify-center cursor-grab pointer-events-auto z-20"
            >
              <div className="relative w-full h-full pointer-events-none select-none">
                <Image
                  src="/images/v2/group3466449.svg"
                  alt="Figma Sticker"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Float green star */}
              <div className="absolute top-[-3px] right-[-3px] w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] pointer-events-none">
                <Image
                  src="/images/v2/group1410097932.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Draggable Sticker 2 (White card with Figma logo) */}
            <motion.div
              drag
              dragConstraints={screenRef}
              dragElastic={0.01}
              dragMomentum={false}
              whileHover={{ scale: 1.15 }}
              whileDrag={{ scale: 1.2, cursor: "grabbing" }}
              initial={{ rotate: -7.63 }}
              style={{ touchAction: "pan-y" }}
              className="absolute md:left-[calc(55%-5px)] left-[calc(55%-1px)] top-[22%] w-[32px] h-[31px] sm:w-[47px] sm:h-[46px] bg-white border border-neutral-200 rounded-[2px] p-[4px] sm:p-[6px] shadow-[2px_2px_4px_rgba(16,24,40,0.15)] flex items-center justify-center cursor-grab pointer-events-auto z-20"
            >
              <div className="relative w-full h-full scale-[0.85] pointer-events-none select-none">
                <Image
                  src="/images/v2/group1410097931.svg"
                  alt="Figma Logo Sticker"
                  fill
                  className="object-contain"
                />
              </div>
              {/* Float outline */}
              <div className="absolute top-[-3px] right-[-3px] w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] pointer-events-none">
                <Image
                  src="/images/v2/group1410097933.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Floating Scroll to Explore text (visible on desktop only; hidden on tablet) */}
      <div className="absolute bottom-6 hidden lg:flex flex-col items-center select-none pointer-events-none">
        <span className="font-kalam text-[24px] text-black/25 tracking-[-0.48px] not-italic">
          Scroll to Explore
        </span>
      </div>
    </section>
  );
}
