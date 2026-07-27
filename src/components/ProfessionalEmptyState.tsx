"use client";

import { useActionState, useEffect, useState } from "react";
import { subscribeToUpdates } from "@/lib/actions";
import { subscribeInitialState, type SubscribeState } from "@/lib/newsletter";

const NOTE_COPY = `Professional work? Coming soon.

Truth is, I'm still building up my professional portfolio — real projects, real clients, real stakes. Not much to show here yet, but I'm working on it.`;

// The paper, shadow and tape layers sit directly on the 350x353.13 frame: Figma
// sizes them as percentages of it, so a positioned wrapper would rescale them.
function StickyNote() {
  return (
    <div className="relative h-[353.13px] w-[350px] shrink-0 scale-[0.92] sm:scale-100">
      <div className="absolute inset-[2.44%_0_0_1.67%] mix-blend-multiply">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/work/prof-note-shadow.svg" />
      </div>
      <div className="absolute inset-[1.09%_1.66%_1.35%_0]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/work/prof-note-paper.svg" />
      </div>
      <div className="absolute inset-[0_53.32%_84.53%_9.8%]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/work/prof-note-tape.svg" />
      </div>

      <div className="absolute left-[50px] top-[48px] flex h-[235.084px] w-[272.991px] items-center justify-center">
        <div className="flex-none rotate-[-6.5deg]">
          <p className="w-[251.059px] whitespace-pre-wrap font-kalam text-[16px] leading-[24px] text-black/80">
            {NOTE_COPY}
          </p>
        </div>
      </div>

      <div className="absolute left-[228px] top-[222px] flex h-[83.054px] w-[68.853px] items-center justify-center">
        <div className="-rotate-7 flex-none">
          <div className="relative h-[76.311px] w-[60px] drop-shadow-[0px_1.387px_2.081px_rgba(16,24,40,0.1),0px_1.387px_1.387px_rgba(16,24,40,0.06)]">
            <div className="absolute left-[-2.84px] top-[-3.63px] h-[83.538px] w-[65.682px]">
              <div className="absolute inset-[-1.65%_-0.46%_-0.34%_0]">
                <img alt="" className="block size-full max-w-none" src="/images/work/prof-note-logo-bg.svg" />
              </div>
            </div>
            <div className="absolute left-0 top-[1.39px] flex items-center">
              <div className="relative h-[76.311px] w-[59.956px]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src="/images/work/prof-note-logo.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsletterCard() {
  const [state, formAction, pending] = useActionState<SubscribeState, FormData>(
    subscribeToUpdates,
    subscribeInitialState,
  );
  // React resets the form once the action settles, which would also wipe a
  // rejected address, so the field is controlled and only cleared on success.
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.status === "success") setEmail("");
  }, [state]);

  return (
    <div className="flex w-full max-w-[558px] flex-col gap-[12px] rounded-[12px] border border-solid border-[#eaecf0] bg-white px-[32px] py-[24px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]">
      <h3 className="font-sans text-[24px] font-bold leading-[32px] text-black">
        Email Newsletter
      </h3>
      <p className="font-sans text-[16px] font-medium leading-[24px] text-[#475467]">
        Drop your email and I&apos;ll ping you the moment something worth showing lands
        here. No spam, just design.
      </p>

      <form action={formAction} className="flex w-full flex-col gap-[8px]">
        <div className="flex w-full flex-col items-stretch gap-[16px] sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={pending}
            aria-invalid={state.status === "error"}
            className="min-w-0 flex-1 rounded-full border border-solid border-[#d0d5dd] bg-white px-[12px] py-[8px] font-sans text-[14px] font-medium leading-[20px] text-[#101828] outline-none transition-colors placeholder:text-[#d0d5dd] focus-visible:border-[#dc6803] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={pending}
            className="shrink-0 cursor-pointer rounded-full border border-solid border-[#d0d5dd] bg-white px-[24px] py-[8px] font-sans text-[14px] font-black leading-[20px] text-[#344054] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:bg-neutral-50 hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:bg-neutral-100 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
          >
            {pending ? "Sending…" : "Send"}
          </button>
        </div>

        <p
          aria-live="polite"
          className={`font-sans text-[14px] font-medium leading-[20px] ${
            state.status === "success"
              ? "text-[#079455]"
              : state.status === "error"
                ? "text-[#d82363]"
                : "sr-only"
          }`}
        >
          {state.message}
        </p>
      </form>
    </div>
  );
}

export default function ProfessionalEmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 lg:flex-row lg:gap-[96px]">
      <StickyNote />
      <NewsletterCard />
    </div>
  );
}
