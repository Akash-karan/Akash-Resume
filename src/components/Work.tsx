"use client";

import { Fragment, useState } from "react";
import { site } from "@/lib/site";
import WorkCard from "./WorkCard";
import ProfessionalEmptyState from "./ProfessionalEmptyState";

const ribbonSkills = [
  { label: "Web Design", face: "/images/work/ribbon-face-a.svg" },
  { label: "Saas Products", face: "/images/work/ribbon-face-a.svg" },
  { label: "Illustration", face: "/images/work/ribbon-face-b.svg" },
  { label: "Graphic Design", face: "/images/work/ribbon-face-c.svg" },
];

// Built at the exact Figma size and scaled down, so the nested pixel offsets
// between the outline and the face stay aligned at every breakpoint.
function RibbonAvatar({ src }: { src: string }) {
  return (
    <div className="h-[44px] w-[34.6px] shrink-0 sm:h-[56px] sm:w-[44.03px] md:h-[70px] md:w-[55.038px]">
      <div className="origin-top-left scale-[0.6286] sm:scale-[0.8] md:scale-100">
        <div className="relative h-[70px] w-[55.038px] drop-shadow-[0px_0.933px_0.933px_rgba(16,24,40,0.05)]">
          <div className="absolute left-[-2.61px] top-[-3.33px] h-[76.629px] w-[60.251px]">
            <div className="absolute inset-[-1.65%_-0.46%_-0.34%_0]">
              <img alt="" className="block size-full max-w-none" src="/images/work/ribbon-avatar-outline.svg" />
            </div>
          </div>
          <div className="absolute left-0 top-[1.27px] flex items-center">
            <div className="relative h-[70px] w-[54.998px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={src} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: "Streamie",
    description: "A streaming app concept with real-time updates, personalized watchlists, and AI recommendations",
    badges: ["Personal", "Web & Mobile", "UI"],
    image: "/images/work/streamie.png",
    link: "https://www.behance.net/gallery/210110441/Streamie-AppStreaming-Platform",
  },
  {
    title: "Mindspace",
    description: "A mental fitness app concept combining wearable tech and personalized, neuroscience-backed insights to help people build better mental well-being.",
    badges: ["Personal", "Mobile", "UI"],
    image: "/images/work/mindspace.png",
    link: "https://www.behance.net/gallery/201238233/Mindspace-App-UI-Design",
  },
  {
    title: "Wizdom",
    description: "A project focused on improving the app's onboarding experience through thoughtful interface design.",
    badges: ["Personal", "Mobile", "UI"],
    image: "/images/work/wizdom.png",
    link: "https://www.behance.net/gallery/202778451/Wizdom-AppRedesign",
  },
  {
    title: "Master Menu",
    description: "An app where you find the perfect recipe and get everything you need to buy the ingredients, all in one place",
    badges: ["Personal", "Mobile", "UX"],
    image: "/images/work/mastermenu.png",
    link: "https://www.behance.net/gallery/205479621/MasterMenuFood-AppUX-Case-Study",
  },
  {
    title: "Sportplus",
    description: "An app concept to join matches, find players nearby, and discover local sports shops to buy equipment online.",
    badges: ["Personal", "Mobile", "UI&UX"],
    image: "/images/work/sportplus.png",
    link: "https://www.behance.net/gallery/200153481/Sportplus-App-UXUI-Case-Study",
  },
  {
    title: "More on Behance",
    description: "Explore more of my visual projects and design work on Behance.",
    badges: ["Personal", "Visual Works"],
    image: "/images/work/uidesign.png",
    link: "https://www.behance.net/Akash_UX",
  },
];

const tabWidths: Record<string, string> = {
  All: "w-[65px]",
  Personal: "w-[81px]",
  Professional: "w-[104px]",
};

export default function Work() {
  const [selectedTab, setSelectedTab] = useState<string>("All");

  const filteredProjects = projects.filter((project) => {
    if (selectedTab === "All") return true;
    return project.badges.includes(selectedTab);
  });

  return (
    <section id="works" className="relative w-full overflow-hidden pt-20 pb-28">
      
      {/* Works List Container */}
      <div className="relative mx-auto w-full max-w-[1136px] md:max-w-[722px] lg:max-w-[1136px] px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-black text-[#dc6803] uppercase tracking-wider">
              Work
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-black text-black leading-[44px] tracking-[-0.72px]">
              What I've Been Building
            </h2>
          </div>

          {/* Filters/Tabs */}
          <div className="bg-white border border-[#eaecf0] border-solid flex gap-[4px] items-center p-[4px] relative rounded-full drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] w-fit shrink-0 select-none">
            {["All", "Personal", "Professional"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex gap-[8px] h-[36px] items-center justify-center shrink-0 cursor-pointer text-[14px] font-bold transition-all duration-300 ${
                  tabWidths[tab] || "w-auto"
                } ${
                  selectedTab === tab
                    ? "bg-[#dc6803] text-white rounded-full shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]"
                    : "text-[#667085] hover:text-black rounded-[6px]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[20px] w-full">
            {filteredProjects.map((project, index) => (
              <WorkCard key={index} project={project} />
            ))}
          </div>
        ) : (
          <ProfessionalEmptyState />
        )}
      </div>

      {/* Things That Work for Me / Scrolling Ribbons.
          Figma frames this section at 1440x512 with the two bands crossing in an X:
          the dark one at +7deg centred 57% down, the orange at -10deg centred 51.4%. */}
      <div className="relative w-full mt-[156px] h-[340px] sm:h-[430px] md:h-[512px] overflow-hidden select-none">

        {/* Section Title — sits on the section's top edge in the design */}
        <h3 className="absolute inset-x-0 top-0 px-6 text-center font-sans font-black text-[28px] sm:text-[36px] leading-[44px] tracking-[-0.72px] text-black">
          Things That Work for Me
        </h3>

        {/* Ribbon 1: Teaming Up With You As Well!! */}
        <div className="absolute inset-x-0 top-[57.03%] z-10 flex -translate-y-1/2 justify-center">
          <div className="rotate-7">
            <div className="h-[68px] sm:h-[84px] md:h-[100px] w-[120vw] overflow-hidden bg-[#182230] shadow-[0px_4px_15px_rgba(0,0,0,0.15)]">
              <div className="animate-marquee h-full items-center gap-[80px] sm:gap-[120px] md:gap-[160px]">
                {Array(10)
                  .fill("Teaming Up With You As Well!!")
                  .map((text, idx) => (
                    <span
                      key={idx}
                      className="shrink-0 font-sans font-black text-transparent text-[24px] sm:text-[30px] md:text-[36px] leading-[44px] tracking-[-0.72px] whitespace-nowrap [-webkit-text-stroke:1px_#ffffff]"
                    >
                      {text}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ribbon 2: Skills & Avatars */}
        <div className="absolute inset-x-0 top-[51.37%] z-20 flex -translate-y-1/2 justify-center">
          <div className="-rotate-10">
            <div className="h-[68px] sm:h-[84px] md:h-[100px] w-[120vw] overflow-hidden bg-[#dc6803] shadow-[0px_6px_20px_rgba(0,0,0,0.2)]">
              {/* Four repeats so the -50% marquee shift lands on a whole number of cycles */}
              <div className="animate-marquee-reverse h-full items-center gap-[40px] sm:gap-[60px] md:gap-[80px]">
                {Array(4)
                  .fill(ribbonSkills)
                  .flat()
                  .map((item, idx) => (
                    <Fragment key={idx}>
                      <RibbonAvatar src={item.face} />
                      <span className="font-sans font-black text-white text-[24px] sm:text-[30px] md:text-[36px] leading-[44px] tracking-[-0.72px] whitespace-nowrap">
                        {item.label}
                      </span>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
