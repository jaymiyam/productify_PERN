import React from 'react';
import { useState, useEffect } from 'react';
import { PaletteIcon } from 'lucide-react';

const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

const ThemeSelector = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('productify-theme') || 'forest';
    }
    return 'forest';
  });

  useEffect(() => {
    localStorage.setItem('productify-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <PaletteIcon className="size-4" />
        <span className="hidden sm:inline">Theme</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
      >
        {THEMES.map((theme) => (
          <li key={theme}>
            <button
              onClick={() => setTheme(theme)}
              className="flex justify-between"
            >
              <span className="capitalize">{theme}</span>
              <div className="flex gap-0.5" data-theme={theme}>
                <span className="w-2 h-4 rounded-sm bg-primary" />
                <span className="w-2 h-4 rounded-sm bg-secondary" />
                <span className="w-2 h-4 rounded-sm bg-accent" />
                <span className="w-2 h-4 rounded-sm bg-neutral" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
