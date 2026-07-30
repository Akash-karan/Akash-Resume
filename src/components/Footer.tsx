"use client";

import { useEffect, useState, useRef } from "react";
import { site, gmailComposeHref } from "@/lib/site";

interface FooterCharacterProps {
  views: number;
}

function FooterCharacter({ views }: FooterCharacterProps) {
  return (
    <div className="relative w-[208px] h-[434.86px] select-none pointer-events-none">
      {/* Pants (node 716:46927) */}
      <div className="absolute flex h-[114.944px] items-center justify-center left-[92.76px] top-[279.31px] w-[79.154px]">
        <div className="flex-none rotate-[-23.5deg]">
          <div className="h-[108.282px] relative w-[39.23px]">
            <img
              src="/images/footer/char-pant.svg"
              alt=""
              className="absolute block inset-0 max-w-none size-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Eyes (node 716:46932) */}
      <div className="absolute inset-[30.51%_36.32%_54.54%_34.72%]">
        <img
          src="/images/footer/char-eyes.svg"
          alt=""
          className="absolute block inset-0 max-w-none size-full object-contain"
        />
      </div>

      {/* Body Shirt (node 716:46935) */}
      <div className="absolute inset-[39.06%_23.72%_23.39%_23.71%]">
        <img
          src="/images/footer/char-body.svg"
          alt=""
          className="absolute block inset-0 max-w-none size-full object-contain"
        />
      </div>

      {/* Arm Right (node 716:46944) */}
      <div className="absolute inset-[42.25%_9.04%_26.78%_62.38%]">
        <img
          src="/images/footer/char-arm-right.svg"
          alt=""
          className="absolute block inset-0 max-w-none size-full object-contain"
        />
      </div>

      {/* Arm Left (node 716:46946) */}
      <div className="absolute inset-[42.25%_59.19%_24.98%_12.23%]">
        <img
          src="/images/footer/char-arm-left.svg"
          alt=""
          className="absolute block inset-0 max-w-none size-full object-contain"
        />
      </div>

      {/* Head (node 716:46948) */}
      <div className="absolute flex h-[174.168px] items-center justify-center left-[16.61px] top-[10.93px] w-[150.133px]">
        <div className="-rotate-13 flex-none">
          <div className="h-[151.237px] relative w-[119.166px]">
            <img
              src="/images/footer/char-head.svg"
              alt=""
              className="absolute block inset-0 max-w-none size-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Views Card Sticker (node 716:46968) */}
      <div className="absolute inset-[47.84%_2.63%_23.2%_6.05%]">
        <img
          src="/images/footer/views-sticker.svg"
          alt=""
          className="absolute block inset-0 max-w-none size-full object-contain"
        />
      </div>

      {/* Views Text (node 716:46972) */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[72.749px] items-center justify-center left-[104.17px] top-[271.15px] w-[75.718px]">
        <div className="flex-none rotate-[-0.57deg]">
          <div className="[word-break:break-word] flex flex-col font-kalam justify-center leading-[0] not-italic relative text-[22px] text-black/75 text-center tracking-[-0.48px] whitespace-nowrap">
            <p className="leading-[72px]">{views} {views === 1 ? "View" : "Views"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [views, setViews] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("portfolio_views");
      const current = stored ? parseInt(stored, 10) : 0;
      const nextViews = current + 1;
      localStorage.setItem("portfolio_views", nextViews.toString());
      setViews(nextViews);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="w-full pb-16 pt-8 overflow-hidden select-none">
      <div className="relative mx-auto w-full max-w-[1136px] px-6 md:max-w-[722px] lg:max-w-[1136px] -translate-y-[70px]">
        
        {/* Mobile/Tablet Card Layout */}
        <div className={`lg:hidden w-full bg-[#f7a7a6] rounded-[24px] p-8 flex flex-col items-center gap-8 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-900 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible
            ? "opacity-100 translate-y-0 rotate-0"
            : "opacity-0 translate-y-[80px] -rotate-6"
        }`}>
          {/* Squiggle line overlays */}
          <div className="absolute inset-0 size-full opacity-10 pointer-events-none bg-repeat bg-[url('/images/footer/squiggle-over.svg')] bg-cover" />
          
          {/* Links & Socials Row */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-black/10 pb-6 z-10">
            <div className="flex font-kalam font-bold text-[24px] gap-8 text-black/70">
              <a
                href={site.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                Behance
              </a>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                Resume
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[44px] h-[44px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:-translate-y-1.5 active:scale-90"
              >
                <img src="/images/footer/icon-x.svg" className="size-full" alt="LinkedIn" />
              </a>
              <a
                href={site.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[44px] h-[44px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:-translate-y-1.5 active:scale-90"
              >
                <img src="/images/footer/icon-linkedin.svg" className="size-full" alt="X" />
              </a>
            </div>
          </div>

          {/* Connect Title */}
          <p className="font-kalam font-bold text-[24px] sm:text-[28px] text-black/80 leading-normal text-center z-10 max-w-[480px]">
            Always curious to meet fellow creatives <br />
            <a
              href={gmailComposeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block no-underline group leading-[44px] text-black/70 hover:text-black transition-colors"
            >
              Lets Connect
              <span className="absolute left-0 bottom-[2px] h-[2.5px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          </p>

          {/* Character Peeking */}
          <div className="mt-4 scale-90 sm:scale-100 z-10 origin-bottom">
            <FooterCharacter views={views} />
          </div>
        </div>

        {/* Desktop Layout - Scaled Down & Visually Centered */}
        <div className={`hidden lg:block relative w-full h-[315px] origin-bottom scale-[0.75] translate-x-[120px] transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible
            ? "opacity-100 translate-y-0 rotate-0"
            : "opacity-0 translate-y-[100px] -rotate-6"
        }`}>
          {/* Squiggle Banner Background (Under/Over) */}
          <img
            src="/images/footer/squiggle-under.svg"
            className="absolute left-[-371.5px] top-[102.7px] w-[1639.25px] h-[1640.90px] max-w-none mix-blend-multiply"
            alt=""
          />
          <img
            src="/images/footer/squiggle-over.svg"
            className="absolute left-[-399.25px] top-[80px] w-[1639.25px] h-[1640.95px] max-w-none"
            alt=""
          />

          {/* Character */}
          <div 
            className="absolute left-[935px] top-[-41px] rotate-[23.5deg] z-10 pointer-events-none scale-[1.15] origin-bottom-left"
          >
            <FooterCharacter views={views} />
          </div>

          {/* Rotated Contact Bar (Behance, Resume, LinkedIn, X) */}
          <div 
            className="absolute flex h-[158.46px] items-center justify-center left-[-50px] top-[130.7px] w-[1040px] z-20 pointer-events-auto"
          >
            <div className="flex-none rotate-[-6.5deg]">
              <div className="content-stretch flex items-center justify-between w-[1040px]">
                {/* Behance & Resume */}
                <div className="[word-break:break-word] content-stretch flex font-kalam font-bold gap-[64px] items-center leading-[0] not-italic relative shrink-0 text-[40px] text-black/60 whitespace-nowrap -translate-x-[80px]">
                  <a
                    href={site.socials.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    Behance
                  </a>
                  <a
                    href={site.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    Resume
                  </a>
                </div>
                
                {/* LinkedIn & X */}
                <div className="content-stretch flex gap-5 items-center">
                  <a
                    href={site.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[90px] h-[90px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:-translate-y-1.5 active:scale-90 flex items-center justify-center"
                  >
                    <img src="/images/footer/icon-x.svg" className="size-full" alt="LinkedIn" />
                  </a>
                  <a
                    href={site.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[90px] h-[90px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:-translate-y-1.5 active:scale-90 flex items-center justify-center"
                  >
                    <img src="/images/footer/icon-linkedin.svg" className="w-[80px] h-[80px] max-w-none" alt="X" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Rotated Center Message */}
          <div 
            className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[160px] items-center justify-center left-[461.52px] top-[386.9px] w-[760px] z-20 pointer-events-auto"
          >
            <div className="flex-none rotate-[-6.5deg]">
              <div className="[word-break:break-word] flex flex-col font-kalam font-bold justify-center items-center leading-[0] not-italic relative text-[40px] text-black/80 text-center tracking-[-0.72px] w-[750px]">
                <p className="flex flex-col items-center">
                  <span className="leading-[48px] whitespace-nowrap">Always curious to meet fellow creatives</span>
                  <a
                    href={gmailComposeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block no-underline group leading-[48px] text-black/60 hover:text-black transition-colors"
                  >
                    Lets Connect
                    <span className="absolute left-0 bottom-[2px] h-[3px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
