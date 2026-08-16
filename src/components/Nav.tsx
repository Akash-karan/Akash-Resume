"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gmailComposeHref, nav, site } from "@/lib/site";
import { ExternalLinkIcon } from "@/components/icons";
import Logo from "@/components/Logo";

// Measures the pill bar rather than the <header> so an open mobile menu panel,
// which is still mounted while it animates out, doesn't inflate the result.
function navClearance() {
  const bar = document.querySelector("header nav");
  if (!bar) return 96;
  return Math.max(bar.getBoundingClientRect().bottom, 0) + 16;
}

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const elTop = window.scrollY + el.getBoundingClientRect().top;
  const slack = window.innerHeight - el.offsetHeight;

  // A section taller than the viewport can't be centred, so align its top edge
  // just below the nav — centring it would land halfway down the section.
  const target = slack > 0 ? elTop - slack / 2 - 25 : elTop - navClearance();

  window.scrollTo({ top: Math.max(target, 0), behavior: "smooth" });
}

function SocialLinks({ size = "md" }: { size?: "md" | "lg" }) {
  const li = size === "lg" ? 34 : 32;
  const be = size === "lg" ? 34 : 32;
  return (
    <>
      <a
        href={site.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="transition-transform hover:-translate-y-0.5 active:scale-90"
      >
        <Image src="/images/icon-linkedin.svg" alt="LinkedIn" width={li} height={li} />
      </a>
      <a
        href={site.socials.behance}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Behance"
        className="transition-transform hover:-translate-y-0.5 active:scale-90"
      >
        <Image src="/images/icon-behance.svg" alt="Behance" width={be} height={be} />
      </a>
    </>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show nav at the very top of the page
      if (currentScrollY < 50) {
        setVisible(true);
      } else {
        // If scrolling down, hide; if scrolling up, show!
        if (currentScrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ 
        y: (visible || open) ? 0 : -100, 
        opacity: (visible || open) ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-5 sm:px-6"
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1136px] md:max-w-[722px] lg:max-w-[1136px] items-center justify-between rounded-full border border-black bg-white px-4 sm:h-[72px] sm:px-6">
        {/* Logo with smooth hover swap */}
        <a
          href="#top"
          aria-label="Akash R — home"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            smoothScrollTo("#top");
          }}
          className="group relative block h-[43.2px] w-[33.6px] shrink-0 sm:h-[55px] sm:w-[43px]"
        >
          <Logo className="h-full w-full" />
        </a>

        {/* Desktop cluster */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          <ul className="flex items-center gap-6 text-[18px] font-medium text-black lg:gap-8 lg:text-[20px]">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(item.href);
                  }}
                  className="transition-colors hover:text-brand"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                Resume
                <ExternalLinkIcon className="h-[16px] w-[16px] text-current transition-colors" />
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <SocialLinks />
          </div>

          <a
            href={gmailComposeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-brand bg-brand px-[14px] py-2.5 text-[14px] font-black text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black bg-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-4 w-5">
            <motion.span
              className="absolute left-0 block h-0.5 w-5 rounded-full bg-black"
              animate={open ? { top: 7, rotate: 45 } : { top: 1, rotate: 0 }}
              transition={{ duration: 0.25 }}
              style={{ top: 1 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] block h-0.5 w-5 rounded-full bg-black"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 block h-0.5 w-5 rounded-full bg-black"
              animate={open ? { top: 7, rotate: -45 } : { top: 13, rotate: 0 }}
              transition={{ duration: 0.25 }}
              style={{ top: 13 }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 w-full max-w-[1136px] overflow-hidden rounded-3xl border border-black bg-white p-5 md:hidden"
          >
            <ul className="flex flex-col gap-1 text-[18px] font-medium text-black">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      smoothScrollTo(item.href);
                    }}
                    className="block rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-brand/10 hover:pl-4 hover:text-brand active:bg-brand/10 active:pl-4 active:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-brand/10 hover:pl-4 hover:text-brand active:bg-brand/10 active:pl-4 active:text-brand"
                >
                  Resume
                  <ExternalLinkIcon className="h-[16px] w-[16px] text-current transition-colors" />
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
              <div className="flex items-center gap-4 pl-3">
                <SocialLinks size="lg" />
              </div>
              <a
                href={gmailComposeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-brand bg-brand px-4 py-2.5 text-[14px] font-black text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:shadow-[0px_6px_0px_0px_#000]"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
