import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Architecture } from "@/components/Architecture";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <Work />
        <Architecture />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
