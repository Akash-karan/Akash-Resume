import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import AiBuilds from "@/components/AiBuilds";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.socials.linkedin, site.socials.x, site.socials.behance],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Nav />
      <main>
        <Hero />
        <Work />
        <AiBuilds />
        <About />
      </main>
      <Footer />
    </>
  );
}
