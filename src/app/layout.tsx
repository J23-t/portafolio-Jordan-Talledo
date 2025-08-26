import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Jordan Talledo | Web & Mobile Developer',
  description: 'Portfolio of Jordan Talledo, a web and mobile application developer. Expert in Next.js, Kotlin, Flutter, and more.',
  keywords: 'Jordan Talledo, developer, Next.js, Kotlin, Flutter, web developer, mobile developer, portfolio',
  openGraph: {
    title: 'Jordan Talledo | Web & Mobile Developer',
    description: 'Expert in creating innovative and efficient web and mobile solutions.',
    url: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'Jordan Talledo Portfolio',
    images: [
      {
        url: 'https://picsum.photos/1200/630?random=20', // Replace with a specific OG image URL
        width: 1200,
        height: 630,
        alt: 'Jordan Talledo Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jordan Talledo | Web & Mobile Developer',
    description: 'Expert in creating innovative and efficient web and mobile solutions.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
    images: ['https://picsum.photos/1200/630?random=20'], // Replace with a specific OG image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
