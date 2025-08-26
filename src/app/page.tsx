"use client";

import { useState, useMemo } from 'react';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/services';
import { Scheduling } from '@/components/sections/scheduling';
import { Contact } from '@/components/sections/contact';
import { Testimonials } from '@/components/sections/testimonials';
import { cn } from '@/lib/utils';
import { Chatbot } from '@/components/chatbot';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function Home() {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatUserDetails = useMemo(() => {
    let name = '';
    let email = '';

    // Crude parsing of user messages to find name and email.
    // In a real app, this could be more robust, or the AI could return structured data.
    for (const message of messages) {
      if (message.role === 'user') {
        // Try to find an email
        const emailMatch = message.content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
        if (emailMatch && !email) {
          email = emailMatch[0];
        }

        // Try to find a name. This is less reliable.
        // It looks for phrases like "mi nombre es", "soy", "me llamo".
        const nameKeywords = ['mi nombre es', 'soy', 'me llamo'];
        const contentLower = message.content.toLowerCase();
        
        for(const keyword of nameKeywords) {
            if (contentLower.includes(keyword)) {
                const potentialName = message.content.substring(contentLower.indexOf(keyword) + keyword.length).trim().split(' ')[0];
                // Simple validation to avoid picking up random words
                if (potentialName.length > 2 && potentialName.length < 20 && !name) {
                    name = potentialName.charAt(0).toUpperCase() + potentialName.slice(1);
                }
            }
        }
      } else if (message.role === 'model') {
        // Look for tool calls that contain user info
        try {
          // This is a very fragile way to parse tool calls from a string response.
          // A better approach would be for the AI flow to return structured tool call data.
          if (message.content.includes('sendContactInformation')) {
            const toolCallRegex = /sendContactInformation\s*\((\{.*?\})\)/s;
            const match = message.content.match(toolCallRegex);
            if (match && match[1]) {
              const args = JSON.parse(match[1]);
              if (args.name && !name) name = args.name;
              if (args.email && !email) email = args.email;
            }
          }
        } catch (e) {
            // Ignore parsing errors
        }
      }
    }

    return { name, email };
  }, [messages]);


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
        <Contact 
            setIsFormFocused={setIsFormFocused}
            chatUserName={chatUserDetails.name}
            chatUserEmail={chatUserDetails.email}
        />
        <Chatbot 
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}
