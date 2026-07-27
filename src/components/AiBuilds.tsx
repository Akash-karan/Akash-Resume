import { site } from "@/lib/site";
import AiBuildCard, { type AiBuild, type AiBuildTool } from "./AiBuildCard";

const tools: Record<string, AiBuildTool> = {
  openai: { name: "OpenAI", icon: "/images/ai-builds/tool-openai.svg" },
  cursor: { name: "Cursor", icon: "/images/ai-builds/tool-cursor.svg" },
};

// Add an entry per build; the grid reflows from one to three columns on its own.
const builds: AiBuild[] = [
  {
    title: "Job Hunt Agent",
    icon: "/images/ai-builds/emoji-robot.svg",
    description:
      "An automated agent on GCP that filters jobs by role, location, and salary, scrapes listings via Apify, and emails me matches every 2 days.",
    tools: [tools.openai, tools.cursor],
    href: "https://github.com/Akash-karan/job-search-agent",
  },
];

export default function AiBuilds() {
  return (
    <section id="vibe-code" className="relative w-full pt-20 pb-28">
      <div className="relative mx-auto w-full max-w-[1136px] px-6 md:max-w-[722px] lg:max-w-[1136px]">

        {/* Header Block — mirrors the Work section's title block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-black text-[#dc6803] uppercase tracking-wider">
              AI Builds
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-black text-black leading-[44px] tracking-[-0.72px]">
              Playing Around With AI Tools
            </h2>
          </div>

          <a
            href={site.socials.github || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#d0d5dd] border-solid flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0 w-fit cursor-pointer transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none hover:bg-neutral-50 active:bg-neutral-100"
          >
            <span className="font-sans font-black leading-[20px] text-[14px] text-[#344054]">
              Visit GitHub
            </span>
          </a>
        </div>

        {/* Note grid — pt leaves room for the tape overhanging each card's top edge */}
        <div className="grid grid-cols-1 gap-[48px] pt-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {builds.map((build) => (
            <AiBuildCard key={build.title} build={build} />
          ))}
        </div>
      </div>
    </section>
  );
}
