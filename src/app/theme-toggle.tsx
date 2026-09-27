'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const update = () => {
    document.documentElement.dataset.theme = theme;
  };
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (!reduceMotion && 'startViewTransition' in document) {
    // `ready` rejects when the transition is skipped (hidden tab, rapid
    // clicks); the theme is still applied, so the rejection can be ignored.
    document.startViewTransition(update).ready.catch(() => undefined);
  } else {
    update();
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('theme');
      } catch {}
      const next: Theme =
        saved === 'light' || saved === 'dark'
          ? saved
          : media.matches
            ? 'dark'
            : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('storage', sync);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  function toggle() {
    const next: Theme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Dark theme"
      title={
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      }
      className="theme-switch"
      onClick={toggle}
    >
      <span aria-hidden="true" className="theme-switch-thumb">
        <svg
          className="theme-icon-sun"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
        </svg>
        <svg
          className="theme-icon-moon"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        </svg>
      </span>
    </button>
  );
}
