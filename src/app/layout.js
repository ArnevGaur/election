import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import dynamic from 'next/dynamic';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ChatProvider } from '@/context/ChatContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
});
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), {
  ssr: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Niti — Understand Democracy in Minutes',
  description: 'An interactive, educational platform that helps you understand the complete election process through step-by-step guidance, AI chat, visual timelines, and quizzes.',
  keywords: 'Niti, election, voting, democracy, voter registration, India elections, election guide',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AppProvider>
          <ChatProvider>
            <ParallaxBackground />
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
            <ChatWidget />
          </ChatProvider>
        </AppProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'} />
      </body>
    </html>
  );
}
