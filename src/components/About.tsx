"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { gmailComposeHref } from "@/lib/site";

const books = [
  {
    title: "The Almanack of Naval Ravikant",
    cover: "/images/about/book-almanack.png",
    width: 100,
    height: 149,
    link: "https://www.navalmanack.com/",
  },
  {
    title: "Atomic Habits",
    cover: "/images/about/book-atomic.png",
    width: 96,
    height: 149,
    link: "https://jamesclear.com/atomic-habits",
  },
  {
    title: "How to Win Friends And Influence People",
    cover: "/images/about/book-carnegie.png",
    width: 93,
    height: 150,
    link: "https://www.goodreads.com/book/show/4865.How_to_Win_Friends_and_Influence_People",
  },
] as const;

/** Figma's pin seat on the clan photo, as % of the image frame. */
const PIN_HOME = { x: 50.73, y: 38.3 };

function ReadingHover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<"left" | "right">("left");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const measureSide = () => {
    if (typeof window === "undefined") return;
    // Side detection only matters on mobile. Desktop/tablet keeps centered.
    if (window.innerWidth >= 640) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const buttonCenter = rect.left + rect.width / 2;
    setSide(buttonCenter < window.innerWidth / 2 ? "left" : "right");
  };

  const handleOpen = () => {
    measureSide();
    setOpen(true);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleOpen}
      onMouseLeave={() => setOpen(false)}
      onFocus={handleOpen}
      onBlur={() => setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        className="cursor-pointer text-ink underline decoration-solid [text-underline-position:from-font] [text-decoration-skip-ink:none] transition-colors hover:text-brand focus-visible:outline-none focus-visible:text-brand"
        aria-describedby={open ? "about-reading-popup" : undefined}
        aria-expanded={open}
      >
        {children}
      </button>

      <span
        id="about-reading-popup"
        role="tooltip"
        className={`absolute bottom-full z-30 max-w-[calc(100vw-1.5rem)] pb-[10px] transition-[opacity,transform] duration-200 ease-out sm:left-1/2 sm:-translate-x-1/2 sm:origin-bottom max-sm:origin-bottom-left ${
          side === "left"
            ? "max-sm:left-0"
            : "max-sm:right-0 max-sm:left-auto"
        } ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0"
        }`}
      >
        <span className="flex max-sm:gap-1.5 gap-3 rounded-md border border-[#eaecf0] bg-white max-sm:px-[3px] max-sm:pt-[3px] max-sm:pb-[6px] px-[5px] pt-[5px] pb-[10px] shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06),0px_4px_8px_-2px_rgba(16,24,40,0.1)]">
          {books.map((book) => (
            <a
              key={book.title}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex max-sm:w-[80px] w-[135px] shrink-0 flex-col items-center max-sm:gap-0 gap-[10px] group/book cursor-pointer"
            >
              <span
                className="relative block overflow-hidden rounded-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 max-sm:scale-[0.6] max-sm:origin-top group-hover/book:-translate-y-1 group-hover/book:shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                style={{ width: book.width, height: book.height }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="absolute inset-0 size-full max-w-none object-cover"
                />
              </span>
              <span className="px-[10px] text-center font-kalam text-[10px] font-bold leading-[14px] sm:text-[12px] sm:leading-5 text-black/70 transition-colors duration-300 group-hover/book:text-brand">
                {book.title}
              </span>
            </a>
          ))}
        </span>
      </span>
    </span>
  );
}

interface DraggablePinProps {
  pos: { x: number; y: number };
  setPos: (pos: { x: number; y: number }) => void;
  isDragged: boolean;
  setIsDragged: (val: boolean) => void;
}

function DraggablePin({ pos, setPos, isDragged, setIsDragged }: DraggablePinProps) {
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPos(PIN_HOME);
        setIsDragged(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPos, setIsDragged]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const frame = event.currentTarget.parentElement;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x,
      originY: pos.y,
      width: rect.width,
      height: rect.height,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const dx = ((event.clientX - state.startX) / state.width) * 100;
    const dy = ((event.clientY - state.startY) / state.height) * 100;
    
    // Trigger dragged state when the user drags the pin
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      setIsDragged(true);
    }

    setPos({
      x: Math.min(92, Math.max(2, state.originX + dx)),
      y: Math.min(90, Math.max(2, state.originY + dy)),
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (drag.current?.pointerId === event.pointerId) {
      drag.current = null;
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  return (
    <button
      type="button"
      aria-label="Drag to reveal the face underneath. Press Escape to reset."
      title="Drag me"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-10 -rotate-[5.77deg] cursor-grab touch-none active:cursor-grabbing focus-visible:outline-none transition-opacity duration-300 ${
        isDragged ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <span className="relative block h-[19.08px] w-[15px] drop-shadow-[0px_1px_1.5px_rgba(16,24,40,0.1),0px_1px_1px_rgba(16,24,40,0.06)] transition-transform duration-150 ease-out hover:scale-110 active:scale-105">
        <img
          src="/images/about/pin-outline.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-0.71px] top-[-0.91px] h-[20.88px] w-[16.42px] max-w-none"
        />
        <img
          src="/images/about/pin-face.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[0.35px] h-[19.07px] w-[15.03px] max-w-none"
        />
      </span>
    </button>
  );
}

function ClanPolaroid() {
  const [isDragged, setIsDragged] = useState(false);
  const [pinPos, setPinPos] = useState(PIN_HOME);

  const resetPin = () => {
    setPinPos(PIN_HOME);
    setIsDragged(false);
  };

  return (
    <div 
      className={`relative ${isDragged ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (isDragged) resetPin();
      }}
      title={isDragged ? "Click photo to cover face" : undefined}
    >
      <div className="relative -rotate-6">
        <div className="relative flex w-[350px] max-w-full items-start rounded-md border border-[#eaecf0] bg-white px-[5px] pt-[5px] pb-[10px] shadow-[0px_1px_2px_rgba(16,24,40,0.06),0px_1px_3px_rgba(16,24,40,0.1)]">
          <div className="relative flex min-w-0 flex-1 flex-col gap-[10px] overflow-hidden rounded-[7.5px]">
            <div className="relative aspect-[4032/2603] w-full overflow-hidden">
              <img
                src="/images/about/clan-photo.jpg"
                alt="The Clan Community group photo"
                className="absolute left-0 top-0 h-[116.17%] w-full max-w-none object-cover object-top"
                draggable={false}
              />
              <DraggablePin 
                pos={pinPos}
                setPos={setPinPos}
                isDragged={isDragged}
                setIsDragged={setIsDragged}
              />
            </div>
            <div className="px-[10px]">
              <p className="font-kalam text-[16px] font-bold leading-5 text-black/70">
                The Clan Community
              </p>
            </div>
          </div>

          <img
            src="/images/about/tape.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-[37px] top-[-17px] h-[34px] w-[81px]"
          />
        </div>
      </div>

      <div 
        className="pointer-events-none absolute hidden sm:block 
                   sm:-right-1 sm:top-[6%] sm:w-[110px] 
                   lg:absolute lg:left-[371px] lg:top-[12px] lg:right-auto lg:w-[228px] lg:h-[104px]"
      >
        <div 
          className="transition-all duration-300
                     sm:text-center sm:font-kalam sm:text-[20px] sm:leading-[1.2] sm:tracking-[-0.48px] sm:text-black/70 sm:rotate-[-6.1deg]
                     lg:absolute lg:left-[110px] lg:top-[35px] lg:w-[118px] lg:h-[70px] lg:text-[24px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex lg:items-center lg:justify-center lg:rotate-0"
        >
          <div className="rotate-0 lg:rotate-[-6.1deg]">
            {isDragged ? "here im" : "Spot me in this group"}
          </div>
        </div>
        <div 
          className="sm:mt-1 sm:flex sm:justify-start sm:pl-1
                     lg:absolute lg:left-0 lg:top-[40px] lg:m-0 lg:p-0"
        >
          <div className="flex size-[50px] items-center justify-center">
            <div className="-scale-y-100 flex-none rotate-[90.47deg]">
              <div className="relative w-[50px] h-[50px] overflow-clip">
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
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative w-full overflow-x-clip pt-[60px] sm:pt-20 pb-28">
      <div className="relative mx-auto w-full max-w-[1136px] px-6 md:max-w-[722px] lg:max-w-[1136px] flex flex-col gap-8 items-start lg:min-h-[415px]">
        {/* Title block */}
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[20px] font-bold leading-[30px] text-brand">
            About Me
          </span>
          <h2 className="w-full font-sans text-[28px] font-black leading-[36px] tracking-[-0.72px] text-black sm:text-[36px] sm:leading-[44px]">
            I read, cook (with mixed success), and love a good outdoor break.
          </h2>
        </div>

        {/* Body Text */}
        <div className="font-sans text-[16px] font-medium leading-[24px] text-ink-soft max-w-[514px]">
          <p className="mb-4">
            I&apos;m Akash, an engineer who somehow ended up in design — still figuring most of it
            out as I go. I like getting things right, so I tend to experiment a lot, whether
            that&apos;s a new AI tool or a design domain I&apos;ve never touched before.
          </p>
          <p>
            Outside of work, I&apos;m usually reading <ReadingHover>something</ReadingHover>,
            attempting to cook, or outdoors trying to remember what sunlight feels like. And if
            there&apos;s a chance for a bad joke, I&apos;ll probably take it.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={gmailComposeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full border border-[#d0d5dd] bg-white px-[14px] py-[10px] text-[14px] font-black leading-[20px] text-[#344054] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:bg-neutral-50 hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:bg-neutral-100 active:shadow-none"
        >
          Still curious? Let&apos;s talk
        </a>

        {/* Polaroid (on desktop: absolutely positioned relative to the outer container; below: stacked under CTA) */}
        <div className="relative mx-auto w-full max-w-[380px] pt-2 lg:pointer-events-none lg:absolute lg:left-[605px] lg:top-[114px] lg:mx-0 lg:w-[376px] lg:max-w-none lg:pt-0">
          <div className="lg:pointer-events-auto">
            <ClanPolaroid />
          </div>
        </div>
      </div>
    </section>
  );
}
