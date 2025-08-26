"use client";

import { useState } from 'react';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { Scheduling } from '@/components/sections/scheduling';
import { Contact } from '@/components/sections/contact';
import { Testimonials } from '@/components/sections/testimonials';
import { cn } from '@/lib/utils';
import { Chatbot } from '@/components/chatbot';

export default function Home() {
  const [isFormFocused, setIsFormFocused] = useState(false);

  return (
    <div className="relative">
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-10 transition-opacity duration-500 pointer-events-none",
          isFormFocused ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="overflow-x-hidden relative z-0">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Scheduling />
        <Contact setIsFormFocused={setIsFormFocused} />
        <Chatbot />
      </div>
    </div>
  );
}
