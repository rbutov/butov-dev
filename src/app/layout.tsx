import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';

import '../styles/globals.css';
import ThemeToggle from './theme-toggle';
import WindowControls from './window-controls';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'Ruslan Butov | Senior Software Engineer',
  description:
    'Ruslan Butov — Senior Software Engineer based in the San Francisco Bay Area. Connect on GitHub and LinkedIn.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()`,
          }}
        />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <main className="page-background flex min-h-svh items-center justify-center px-3 py-10 sm:px-4">
          <section
            aria-label="Ruslan Butov profile"
            className="editor-window w-fit max-w-full overflow-hidden rounded-2xl border"
          >
            <header className="flex h-9 items-center gap-3 px-3.5">
              <WindowControls />
              <ThemeToggle />
            </header>
            <div className="editor-surface mx-2 mb-2 rounded-xl px-2 py-6 sm:px-6">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
