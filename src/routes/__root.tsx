import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import appCss from '../styles.css?url';
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet:'utf-8' }, { name:'viewport', content:'width=device-width, initial-scale=1' },
      { title:'Meridian Residences | A residential concept by Krelyvo Studio' },
      { name:'description', content:'Space for what comes next. Explore a fictional architectural and residential website concept by Krelyvo Studio.' },
      { name:'robots', content:'noindex, nofollow' }, { name:'theme-color', content:'#e9e7e0' },
    ],
    links: [{ rel:'stylesheet', href:appCss }],
  }),
  shellComponent: ({ children }: { children: ReactNode }) => <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>,
  component: Outlet,
  notFoundComponent: () => <main className="error-page"><p className="eyebrow">Meridian Residences</p><h1>A different direction.</h1><p>This page doesn’t exist.</p><a className="button" href="/">Return to Meridian</a></main>,
  errorComponent: () => <main className="error-page"><h1>A moment to reconnect.</h1><p>The page couldn’t load.</p><a className="button" href="/">Reload the experience</a></main>,
});
