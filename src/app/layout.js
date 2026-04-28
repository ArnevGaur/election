import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ChatProvider } from '@/context/ChatContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Election Guide Assistant — Understand Elections in Minutes',
  description: 'An interactive, educational web app that helps you understand the complete election process through step-by-step guidance, AI chat, visual timelines, and quizzes.',
  keywords: 'election, voting, democracy, voter registration, India elections, election guide',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AppProvider>
          <ChatProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </ChatProvider>
        </AppProvider>
      </body>
    </html>
  );
}
