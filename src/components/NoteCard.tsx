"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

interface NoteCardProps {
  clickCount: number;
  onNext: () => void;
  onCardClickBeforeActive?: () => void;
  wobbleTrigger?: number;
}

export const noteCardStates = [
  {
    title: "Nothing here yet.",
    body: "Try clicking my name.",
    type: "default"
  },
  {
    title: "Akash /ə-kaash/",
    body: "Product Designer.\n\nAllergic to bad UX. Symptoms flare up near cluttered screens.",
    type: "info"
  },
  {
    title: "Hobbies / Interests",
    body: "When not designing... reading, cooking, or outdoors chasing sunlight.",
    type: "info"
  },
  {
    title: "Currently..",
    body: "Teaching AI to do my job, badly, so I can focus on the fun parts.",
    type: "info"
  },
  {
    title: "That's me.",
    body: "Let's talk — no AI required.",
    type: "social"
  }
];

export default function NoteCard({ clickCount, onNext, onCardClickBeforeActive, wobbleTrigger = 0 }: NoteCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isInitial = clickCount === 0;
  const stateIndex = isMobile ? 1 : (isInitial ? 0 : ((clickCount - 1) % (noteCardStates.length - 1)) + 1);
  const current = noteCardStates[stateIndex];

  return (
    <motion.div
      key={`${stateIndex}-${wobbleTrigger}`}
      initial={{ rotate: -5, scale: 0.95, opacity: 0.9 }}
      animate={{ rotate: -3, scale: 1, opacity: 1 }}
      whileHover={{ rotate: -1, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="absolute top-[-20%] right-[10%] sm:top-[-18%] sm:right-[10%] max-md:translate-x-[15px] w-[160px] h-[100px] sm:w-[232px] sm:h-[143px] bg-white border-[#ababab] border-[0.215px] sm:border-[0.298px] border-solid flex flex-col items-start p-[0.429px] sm:p-[0.596px] rounded-[0.858px] sm:rounded-[1.191px] drop-shadow-[0px_0.858px_0.429px_rgba(0,0,0,0.1)] sm:drop-shadow-[0px_1.191px_0.596px_rgba(0,0,0,0.1)] cursor-default z-20"
      onClick={(e) => {
        // Without clicking the name the card shouldn't change, highlight instead
        if (isInitial && !isMobile) {
          onCardClickBeforeActive?.();
        }
      }}
    >
      {/* Note tape */}
      <div className="absolute left-[104.99px] sm:left-[145.68px] top-[-10.3px] sm:top-[-14.29px] w-[47.883px] sm:w-[66.443px] h-[19.767px] sm:h-[27.429px] z-30">
        <Image
          src="/images/v2/vector.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Title Container */}
      <div className="flex flex-col gap-[2.146px] sm:gap-[2.978px] items-start pb-[4.292px] sm:pb-[5.956px] pl-[3.863px] sm:pl-[5.36px] pr-[4.292px] sm:pr-[5.956px] pt-[6.868px] sm:pt-[9.529px] w-full relative z-10">
        <p className="font-kalam font-bold text-[10.089px] sm:text-[14px] leading-[1.2] text-black/80 tracking-[-0.2px] sm:tracking-[-0.28px] px-1 truncate w-full">
          {current.title}
        </p>
        {/* Underline vector */}
        <div className="relative w-[152.705px] sm:w-[211.895px] h-[4.32px] sm:h-[6px] mt-[-1px] sm:mt-[-2px]">
          <Image
            src="/images/v2/vector3.svg"
            alt=""
            fill
            className="object-contain object-left"
          />
        </div>
      </div>

      {/* Body Container */}
      <div 
        className="flex-[1_0_0] flex flex-col justify-between pb-[7.941px] sm:pb-[11.018px] pl-[4.292px] sm:pl-[5.956px] pr-[7.941px] sm:pr-[11.018px] pt-[0.429px] sm:pt-[0.596px] rounded-[0.429px] sm:rounded-[0.596px] w-full max-w-full relative z-10 bg-repeat bg-[length:159.8px_12.4px] sm:bg-[length:221.8px_17.2px] bg-top-left overflow-hidden"
        style={{ backgroundImage: "url('/images/v2/frame25.png')" }}
      >
        <p className="font-kalam font-normal text-[8.648px] sm:text-[12px] leading-[12.4px] sm:leading-[17.272px] text-black/70 whitespace-pre-wrap pr-1 sm:pr-2 pt-[0.5px] sm:pt-0">
          {current.body}
        </p>

        {/* Interactive Buttons / Links inside the card */}
        {current.type === "info" && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute hidden sm:block sm:left-[189.47px] top-[45.56px] sm:top-[63.28px] font-kalam text-[9px] sm:text-[12px] text-[#079455] hover:text-[#067647] underline select-none cursor-pointer leading-[18.7px] sm:leading-[25.982px]"
          >
            Next
          </span>
        )}

        {current.type === "social" && (
          <div className="absolute left-[91.71px] sm:left-[127.38px] top-[45.54px] sm:top-[63.25px] flex items-center gap-[6px] sm:gap-[8px] font-kalam text-[9px] sm:text-[12px] text-[#079455] leading-[18.7px] sm:leading-[25.982px]">
            <a
              href={site.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[#067647] underline cursor-pointer"
            >
              Twitter
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[#067647] underline cursor-pointer"
            >
              LinkedIn
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
