"use client";

import { useLanguage } from '@/contexts/language-context';
import { Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/jordan-enrique-talledo-salazar-924a55220' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>
        <div className="flex items-center space-x-2">
          {socialLinks.map((social) => (
            <Button
              key={social.name}
              variant="ghost"
              size="icon"
              asChild
              aria-label={social.name}
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
