export type AiBuildTool = {
  name: string;
  icon: string;
};

export type AiBuild = {
  title: string;
  /** Path to the stamp SVG shown beside the title. */
  icon: string;
  description: string;
  tools: AiBuildTool[];
  /** Repo/demo link. Omit and "View Code" renders as plain text instead of a link. */
  href?: string;
};

const viewCodeClass =
  "absolute right-[15px] bottom-[21px] font-kalam text-[16px] leading-[26px] text-black/80 underline decoration-solid [text-underline-position:from-font]";

// Figma sizes this note at 340x198 with a -3deg tilt. Widths here are fluid so the
// card can fill its grid column, and the tape / "View Code" anchor from the right
// edge so they hold their position at any width.
export default function AiBuildCard({ build }: { build: AiBuild }) {
  return (
    <div className="group relative -rotate-3 rounded-[2px] border-[0.5px] border-[#ababab] bg-white p-px shadow-[0px_2px_1px_rgba(0,0,0,0.1)] transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0px_10px_20px_-8px_rgba(16,24,40,0.22)]">
      <img
        src="/images/ai-builds/note-tape.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-[17px] right-[22px] h-[34px] w-[97px] -rotate-4"
      />

      <div className="flex flex-col gap-[4px] pt-[14px] pr-[9px] pb-[9px] pl-[8px]">
        {/* pr keeps the tape's landing zone clear of a long title. */}
        <div className="flex items-center px-[7px] pr-[104px]">
          {/* Relative wrapper sized to the title so the absolute stamp hugs the
              text end and centres against the title's own line box. */}
          <div className="relative">
            <h3 className="font-kalam text-[20px] leading-[1.2] font-bold tracking-[-0.4px] text-black/80">
              {build.title}
            </h3>
            {/* Out of flow so the 30px stamp overflows the 24px title line instead
                of growing the card. The Noto robot's face mass sits below the
                SVG's geometric centre (antenna + sticker padding), so the extra
                6px in translateY lands the head on the title's optical centre. */}
            <img
              src={build.icon}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-full ml-[6px] h-[30px] w-[30px] -translate-y-[calc(50%+6px)]"
            />
          </div>
        </div>
        <div className="h-px w-full bg-[#f15353]" />
      </div>

      <div className="note-ruled relative min-h-[127px] overflow-hidden rounded-[1px] pt-px pr-[22px] pb-[43px] pl-[15px]">
        <p className="font-kalam text-[16px] leading-[26px] text-black/60">{build.description}</p>

        {/* Tool tray: sits flush in the note's bottom-left corner and slides in from
            the left on hover, clipped by this container. */}
        <div className="absolute bottom-0 left-0 flex h-[55px] -translate-x-full items-start gap-[12px] bg-white pt-[10px] pr-[11px] pl-[16px] opacity-0 shadow-[0px_-2px_16px_-4px_rgba(16,24,40,0.08),4px_4px_6px_-2px_rgba(16,24,40,0.03)] transition-[translate,opacity] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          {build.tools.map((tool) => (
            <img
              key={tool.name}
              src={tool.icon}
              alt={tool.name}
              title={tool.name}
              className="h-[30px] w-[30px] shrink-0"
            />
          ))}
        </div>
      </div>

      {/* bottom-[18px] drops this into the 26px band the body's bottom padding
          reserves, so it shares the copy's line-box phase and its baseline lands on
          a rule. Any change in copy line count shifts it by a whole 26px period. */}
      {build.href ? (
        <a href={build.href} target="_blank" rel="noopener noreferrer" className={`${viewCodeClass} transition-colors hover:text-brand`}>
          View Code
        </a>
      ) : (
        <span className={viewCodeClass}>View Code</span>
      )}
    </div>
  );
}
