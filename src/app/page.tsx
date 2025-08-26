"use client";

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { Scheduling } from '@/components/sections/scheduling';
import { Summarizer } from '@/components/sections/summarizer';
import { Contact } from '@/components/sections/contact';
import { Testimonials } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Summarizer />
      <Scheduling />
      <Contact />
    </div>
  );
}
