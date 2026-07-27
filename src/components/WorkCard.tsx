"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  badges: string[];
  image: string;
  link: string;
}

interface WorkCardProps {
  project: Project;
}

// 1. Mindspace Mockup
const DuoIPhone17ProSilverMockup = () => {
  return (
    <div className="relative w-[120px] h-[122px] transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-[0_0_0.13%_0]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src="/images/work/mindspace_duo_base.png"
        />
      </div>
      <div className="absolute inset-[15.78%_3.1%_3.08%_47.03%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src="/images/work/mindspace_duo_right.png"
        />
      </div>
      <div className="absolute inset-[0_52.58%_26.78%_3.3%]">
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src="/images/work/mindspace_duo_left.png"
        />
      </div>
    </div>
  );
};

// 2. Streamie Mockup
const StreamieMockup = () => {
  const getMaskStyle = (pos: string) => ({
    maskImage: `url("/images/work/streamie_mask.svg")`,
    WebkitMaskImage: `url("/images/work/streamie_mask.svg")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "201px 168px",
    WebkitMaskSize: "201px 168px",
    maskPosition: pos,
    WebkitMaskPosition: pos,
  });

  return (
    // Figma emits the layer insets as percentages of this 241x168 frame, so the
    // layers must stay direct children — a positioned wrapper would rescale them.
    <div className="relative w-[241px] h-[168px] transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-[0_12.31%_52.38%_69.73%]" style={getMaskStyle("-148.053px 0px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img1.png" />
      </div>
      <div className="absolute inset-[7.51%_13.32%_53.85%_70.39%]" style={getMaskStyle("-149.646px -12.621px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img2.png" />
      </div>
      <div className="absolute inset-[51.79%_16.11%_44.51%_70.98%]" style={getMaskStyle("-151.053px -87px")}>
        <div className="absolute inset-[-142.86%_-28.57%]">
          <img alt="" className="block max-w-none size-full" src="/images/work/streamie_group.svg" />
        </div>
      </div>
      <div className="absolute inset-[19.64%_21.97%_-0.46%_11.64%] opacity-70" style={getMaskStyle("-8.053px -33px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img3.png" />
      </div>
      <div className="absolute inset-[19.64%_21.97%_4.31%_11.74%]" style={getMaskStyle("-8.289px -33px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img4.png" />
      </div>
      <div className="absolute inset-[20.67%_40.78%_24.17%_12.57%]" style={getMaskStyle("-10.289px -34.726px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img5.png" />
      </div>
      <div className="absolute inset-[38.16%_34.51%_53.9%_64.38%]" style={getMaskStyle("-135.164px -64.111px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_vector6.svg" />
      </div>
      <div className="absolute inset-[63.03%_20.86%_35.12%_66.23%]" style={getMaskStyle("-139.607px -105.889px")}>
        <div className="absolute inset-[-285.72%_-28.57%]">
          <img alt="" className="block max-w-none size-full" src="/images/work/streamie_group1.svg" />
        </div>
      </div>
      <div className="absolute inset-[26.79%_29.02%_63.69%_69.73%]" style={getMaskStyle("-148.053px -45px")}>
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_vector7.svg" />
      </div>
    </div>
  );
};

// 3. Master Menu Mockup
const MasterMenuMockup = () => {
  return (
    <div className="relative w-[182px] h-[168px] transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-[12.34%_2.44%_12.99%_9.65%] opacity-70">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/mastermenu_img1.png" />
      </div>
      <div className="absolute inset-[12.57%_10.75%_20%_9.86%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/mastermenu_img2.png" />
      </div>
      <div className="absolute inset-[68.46%_35.71%_20.02%_32.5%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/mastermenu_img3.png" />
      </div>
      <div className="absolute inset-[12.55%_10.69%_19.93%_9.84%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/mastermenu_img4.png" />
      </div>
    </div>
  );
};

// 4. Wizdom Mockup
const WizdomMockup = () => {
  return (
    <div className="relative w-[120px] h-[122px] transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-[0_0_0.13%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/mindspace_duo_base.png" />
      </div>
      <div className="absolute inset-[15.78%_3.1%_3.08%_47.03%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/wizdom_img1.png" />
      </div>
      <div className="absolute inset-[0.71%_52.58%_26.07%_3.3%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/wizdom_img2.png" />
      </div>
    </div>
  );
};

// 5. Sportplus Mockup
const SportplusMockup = () => {
  return (
    <div className="relative w-[120px] h-[122px] transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-[0_0_0.13%_0]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/mindspace_duo_base.png" />
      </div>
      <div className="absolute inset-[15.78%_3.1%_3.08%_47.03%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/sportplus_img1.png" />
      </div>
      <div className="absolute inset-[0.71%_52.58%_26.07%_3.3%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/sportplus_img2.png" />
      </div>
    </div>
  );
};

// 6. More on Behance Mockup
const MoreOnBehanceMockup = () => {
  return (
    <div className="relative w-[183px] h-[168px] transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-[-0.05%_0_52.65%_76.5%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/behance_img1.png" />
      </div>
      <div className="absolute inset-[7.44%_1.35%_54.05%_77.28%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/behance_img2.png" />
      </div>
      <div className="absolute inset-[51.74%_4.86%_44.56%_78.14%]">
        <div className="absolute inset-[-142.86%_-28.57%]">
          <img alt="" className="block max-w-none size-full" src="/images/work/behance_group.svg" />
        </div>
      </div>
      <div className="absolute inset-[19.14%_12.57%_0.05%_0] opacity-70">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img3.png" />
      </div>
      <div className="absolute inset-[19.14%_12.57%_4.81%_0.13%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/streamie_img4.png" />
      </div>
      <div className="absolute inset-[20.17%_37.34%_24.67%_1.22%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/behance_img4.png" />
      </div>
      <div className="absolute inset-[27.98%_21.87%_64.29%_76.49%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/images/work/behance_vector5.svg" />
      </div>
    </div>
  );
};

const mockups: Record<string, React.ComponentType> = {
  Streamie: StreamieMockup,
  Mindspace: DuoIPhone17ProSilverMockup,
  Wizdom: WizdomMockup,
  Sportplus: SportplusMockup,
  "Master Menu": MasterMenuMockup,
  "More on Behance": MoreOnBehanceMockup,
};

export default function WorkCard({ project }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white border border-[#eaecf0] border-solid hover:border-transparent flex flex-col sm:flex-row gap-[32px] items-start overflow-hidden p-[24px] rounded-[12px] shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] hover:shadow-[0px_0.474px_14px_0px_rgba(0,0,0,0.15)] transition-all duration-300 w-full sm:h-[260px]"
    >
      {/* Left Column: Content info */}
      <div className="flex flex-col gap-[12px] h-full items-start pb-0 relative shrink-0 w-full sm:w-[221.946px]">
        <div className="flex items-center relative shrink-0">
          <h3 className="font-sans font-bold text-[24px] text-black leading-[32px] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <p className="font-sans font-medium text-[16px] leading-[24px] text-[#475467] w-full flex-1">
          {project.description}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#d0d5dd] border-solid flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative rounded-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0 w-full cursor-pointer transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[3px] hover:shadow-[0px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none hover:bg-neutral-50 active:bg-neutral-100"
        >
          <span className="font-sans font-black leading-[20px] text-[14px] text-[#344054]">
            View
          </span>
        </a>
      </div>

      {/* Right Column: Badges and Graphics */}
      <div className="flex flex-col gap-[20px] h-full items-start min-w-px relative w-full sm:flex-1">
        {/* Badges container */}
        <div className="gap-x-[8px] gap-y-[8px] flex flex-wrap relative shrink-0 w-full">
          {project.badges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-[#f2f4f7] flex gap-[2px] items-center px-[8px] py-[2px] relative rounded-full shrink-0"
            >
              <span className="font-sans font-medium leading-[20px] text-[14px] text-[#667085] text-center whitespace-nowrap">
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* Project Thumbnail Image wrapper */}
        <div className="flex-1 min-h-[180px] sm:min-h-px w-full relative">
          <div className="absolute left-0 top-0 w-[272px] h-[192px] flex items-center justify-center">
            {/* Standard Thumbnail (Fades out on hover) */}
            <motion.div
              initial={false}
              animate={{ opacity: mockups[project.title] && isHovered ? 0 : 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transform group-hover:scale-[1.05] transition-transform duration-500 pointer-events-none"
                sizes="272px"
              />
            </motion.div>

            {/* Figma Mockup Frame (Fades in on hover) */}
            {mockups[project.title] && (() => {
              const MockupComponent = mockups[project.title];
              return (
                <motion.div
                  initial={false}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <MockupComponent />
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
