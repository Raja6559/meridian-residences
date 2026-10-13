import { Photo } from './photo';
import type { ImageName } from '../data/images';
const moments: { name: ImageName; heading: string; body: string; label: string }[] = [
  { name:'exterior', heading:'The setting.', body:'Strong horizontal lines meet an open horizon. The architecture begins with the view, and lets the landscape set the pace.', label:'A frame for the horizon' },
  { name:'living', heading:'The light.', body:'Glazing draws the evening inward. Warm textures soften the geometry, creating an imagined place to settle into the everyday.', label:'Inside and outside, in conversation' },
  { name:'terrace', heading:'The pause.', body:'A sheltered terrace, still water, a slower moment. An exploration of how a home might invite you to stay a little longer.', label:'Space to simply be' },
];
export function Sequence() {
  return <section id="sequence" tabIndex={-1} className="sequence-section section" aria-labelledby="sequence-title">
    <div className="container">
      <div className="section-heading" data-reveal><div><p className="eyebrow">03 / A sense of place</p><h2 id="sequence-title">From the setting<br />to the everyday.</h2></div><p>Architecture as a sequence<br />of small, considered moments.</p></div>
      <div className="sequence-layout">
        <div className="sequence-stage" aria-hidden="true">{moments.map((moment,i) => <div className="sequence-frame" key={moment.name}><Photo name={moment.name} decorative sizes="65vw" /><span className="frame-label">0{i + 1} / {moment.label}</span></div>)}</div>
        <div className="sequence-steps">{moments.map((moment,i) => <article className="sequence-step" key={moment.name}>
          <figure className="sequence-moment"><Photo name={moment.name} /><figcaption>{i === 0 ? 'Concept reference image' : 'AI-generated concept image'}</figcaption></figure>
          <div className="sequence-copy"><p className="eyebrow">0{i + 1} / {moment.label}</p><h3>{moment.heading}</h3><p>{moment.body}</p></div>
        </article>)}</div>
      </div>
    </div>
  </section>;
}
