import { useEffect, type RefObject } from 'react';
export function useMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        media.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.from('.hero-title', { y: 20, opacity: 0, duration: .9, ease: 'power2.out', clearProps: 'all' });
          gsap.from('.hero-photo', { opacity: .6, duration: 1.2, clearProps: 'all' });
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
            // Do not conceal below-fold sections before they are reached.
            ScrollTrigger.create({ trigger: element, start: 'top 94%', once: true, onEnter: () => { gsap.from(element, { y: 16, opacity: .5, duration: .65, clearProps: 'all' }); } });
          });
        });
        media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          const sequence = root.current?.querySelector<HTMLElement>('#sequence');
          if (!sequence) return;
          sequence.classList.add('is-choreographed');
          const frames = sequence.querySelectorAll<HTMLElement>('.sequence-frame');
          const steps = sequence.querySelectorAll<HTMLElement>('.sequence-step');
          steps.forEach((step,i) => { if (i > 0) gsap.fromTo(frames[i]!, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: step, start: 'top 80%', end: 'top 35%', scrub: .4 } }); });
          return () => { sequence.classList.remove('is-choreographed'); };
        });
      },root);
      cleanup = () => { media.revert(); context.revert(); };
    }).catch(() => { /* The unenhanced sequence stays visible and vertical. */ });
    return () => { disposed = true; cleanup?.(); };
  },[root]);
}
