import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Navigation, Wordmark } from '../components/navigation';
import { Photo } from '../components/photo';
import { Viewing } from '../components/viewing';
import { Gallery } from '../components/gallery';
import { Sequence } from '../components/sequence';
import { useMotion } from '../components/use-motion';

export const Route = createFileRoute('/')({ component: Meridian });
function Meridian() {
  const root = useRef<HTMLElement>(null);
  useMotion(root);
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <div id="top" />
    <Navigation />
    <main ref={root} id="main" tabIndex={-1}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-heading"><div><p className="eyebrow">An exploration of considered living</p><h1 className="hero-title" id="hero-title">Space for<br />what comes <span>next.</span></h1></div><div className="hero-intro"><p>Considered architecture. Light-filled spaces. An exploration of the everyday moments that make a place feel like home.</p><a href="#spaces" className="text-link">Explore the spaces <ArrowDown size={17} aria-hidden="true" /></a></div></div>
        <figure className="hero-figure"><div className="hero-photo"><Photo name="exterior" eager sizes="100vw" /></div><figcaption><span>MERIDIAN / AN ARCHITECTURAL EXPLORATION</span><span>Concept reference image</span></figcaption></figure>
        <div className="hero-bottom"><p>Architecture with intention.<br />A different perspective on home.</p><Viewing quiet /></div>
      </section>

      <section id="architecture" tabIndex={-1} className="section container philosophy" aria-labelledby="architecture-title">
        <div className="philosophy-copy" data-reveal><p className="eyebrow">01 / The architecture</p><h2 id="architecture-title">Give the space<br />room to speak.</h2><p className="lead">A quieter canvas.<br />An open conversation with the landscape.</p><p>Meridian imagines a home shaped by the things we notice slowly: the warmth of timber, the path of light across stone, the horizon beyond a window.</p><p>Strong lines give the spaces structure. Natural textures bring them closer. Together, they explore a gentler rhythm for everyday living.</p><a className="text-link" href="#sequence">Follow the perspective <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <figure className="material-figure" data-reveal><Photo name="detail" /><figcaption><span>Stone. Timber. Light.</span><small>AI-generated concept image</small></figcaption></figure>
      </section>

      <section id="spaces" tabIndex={-1} className="section living-section" aria-labelledby="spaces-title">
        <div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow">02 / Living spaces</p><h2 id="spaces-title">Room for<br />your everyday.</h2></div><p>Imagined interiors.<br />Considered down to the quieter moments.</p></div>
          <article className="living-feature" data-reveal><figure><Photo name="living" /><figcaption>AI-generated concept image</figcaption></figure><div className="living-description"><span className="space-index">01 / LIVING</span><h3>Light, lived in.</h3><p>A generous opening to the horizon. Soft seating and warm surfaces imagine a place for unhurried mornings and evenings that unfold.</p></div></article>
          <div className="living-pair">
            <article data-reveal><figure><Photo name="dining" sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>AI-generated concept image</figcaption></figure><div className="living-description"><span className="space-index">02 / GATHERING</span><h3>Good company.<br />A place for it.</h3><p>Timber, texture and a view beyond the table. An imagined setting for the moments best shared.</p></div></article>
            <article data-reveal><figure><Photo name="bedroom" sizes="(max-width: 700px) 100vw, 45vw" /><figcaption>AI-generated concept image</figcaption></figure><div className="living-description"><span className="space-index">03 / REST</span><h3>A quieter rhythm.</h3><p>Soft light, simple materials and room to exhale. A study in the comfort of less.</p></div></article>
          </div>
        </div>
      </section>

      <Sequence />
      <Gallery />

      <section id="viewing" tabIndex={-1} className="viewing-section section" aria-labelledby="viewing-title"><div className="container viewing-layout"><div data-reveal><p className="eyebrow">05 / The next perspective</p><h2 id="viewing-title">Imagine your<br />next chapter.</h2></div><div className="viewing-invitation" data-reveal><p>A considered first step starts with curiosity. Explore how a viewing enquiry could feel.</p><Viewing /><p className="small-note">An illustrative journey only.<br />No real property or viewing is offered.</p></div></div></section>
    </main>
    <footer className="site-footer container"><div className="footer-top"><a href="#top" className="brand-link" aria-label="Meridian Residences — back to top"><Wordmark /></a><a className="text-link" href="https://krelyvo.com/work/meridian-residences">View the Krelyvo case study <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="footer-bottom"><p>Fictional residential concept by Krelyvo Studio.</p><p>Supporting interiors and details are AI-generated concept imagery.<br />No real development, listing or property specifications are represented.</p></div></footer>
  </>;
}
