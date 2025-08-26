"use client";

import { useLanguage } from '@/contexts/language-context';
import { Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
