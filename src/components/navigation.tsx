import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Viewing } from './viewing';
import { useHydrated } from './use-hydrated';
const links = [['Architecture','#architecture'],['Living spaces','#spaces'],['Gallery','#gallery']] as const;

export function Wordmark() { return <span className="wordmark">MERIDIAN<span>RESIDENCES</span></span>; }
export function Navigation() {
  const [expanded,setExpanded] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const ready = useHydrated();
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && expanded) { setExpanded(false); toggle.current?.focus(); } };
    const media = matchMedia('(min-width: 900px)');
    const resize = () => { if (media.matches) setExpanded(false); };
    document.addEventListener('keydown',escape); media.addEventListener('change',resize);
    return () => { document.removeEventListener('keydown',escape); media.removeEventListener('change',resize); };
  },[expanded]);
  return <>
    <div className="concept-notice">Fictional residential concept by Krelyvo Studio.</div>
    <header className="site-header">
      <div className="nav-inner container">
        <a href="#top" className="brand-link" aria-label="Meridian Residences — back to top"><Wordmark /></a>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <div className="nav-viewing"><Viewing /></div>
        <button ref={toggle} className="icon-button menu-toggle" disabled={!ready} aria-label="Open navigation" aria-expanded={expanded} aria-controls="mobile-nav" onClick={() => setExpanded(!expanded)}>{expanded ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}</button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!expanded}>
        {links.map(([label,href]) => <a href={href} key={href} onClick={() => { setExpanded(false); requestAnimationFrame(() => document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true })); }}>{label}</a>)}
        <a href="#viewing" onClick={() => { setExpanded(false); requestAnimationFrame(() => document.querySelector<HTMLElement>('#viewing')?.focus({ preventScroll: true })); }}>Preview a viewing</a>
      </nav>
    </header>
  </>;
}
