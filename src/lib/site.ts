export const site = {
  name: "Akash R",
  role: "Product Designer",
  title: "Akash Resume",
  description:
    "Akash R is a Product Designer turning ideas into thoughtful, curious, human-centred screens. Portfolio, work, and what makes me tick.",
  url: "https://akashr.design",
  email: "itsakashkaran@gmail.com",
  resume: "https://drive.google.com/file/d/1LixEetWnfCoAt-cY_R8auY8nwtrd6SdX/view?usp=drive_link",
  socials: {
    linkedin: "https://www.linkedin.com/in/akashux/",
    x: "https://x.com/Akhas_R",
    behance: "https://www.behance.net/Akash_UX",
    github: "https://github.com/Akash-karan",
  },
} as const;

export const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  site.email,
)}`;

export const nav = [
  { label: "Work", href: "#works" },
  { label: "AI Builds", href: "#vibe-code" },
  { label: "About", href: "#about" },
] as const;
