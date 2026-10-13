import { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { images } from '../data/images';
import { Photo } from './photo';
import { useHydrated } from './use-hydrated';

export function Gallery() {
  const [index,setIndex] = useState(0);
  const [open,setOpen] = useState(false);
  const origin = useRef<HTMLButtonElement | null>(null);
  const ready = useHydrated();
  const selected = images[index]!;
  const next = (delta: number) => setIndex(value => (value + delta + images.length) % images.length);
  return <section id="gallery" tabIndex={-1} className="section container gallery-section" aria-labelledby="gallery-title">
    <div className="section-heading" data-reveal><div><p className="eyebrow">04 / Perspectives</p><h2 id="gallery-title">A closer<br />perspective.</h2></div><p>Six views of one imagined world.<br />Open a frame to explore the details.</p></div>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="gallery-grid">
        {images.map((image,i) => <figure className={`gallery-item gallery-item-${i}`} key={image.name}>
          <button className="gallery-trigger" disabled={!ready} aria-label={`View ${image.title}`} onClick={event => { origin.current = event.currentTarget; setIndex(i); setOpen(true); }}>
            <Photo name={image.name} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 60vw" /><span className="gallery-open" aria-hidden="true"><ArrowUpRight size={23} /></span>
          </button>
          <figcaption><span>{String(i + 1).padStart(2,'0')} / {image.title}</span><small>{image.source}</small></figcaption>
        </figure>)}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="gallery-dialog" onCloseAutoFocus={event => { event.preventDefault(); origin.current?.focus(); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); next(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); next(1); } }}>
          <div className="gallery-dialog-top"><p className="eyebrow">Meridian / A closer perspective</p><Dialog.Close className="icon-button" aria-label="Close image preview"><X size={23} aria-hidden="true" /></Dialog.Close></div>
          <Photo key={selected.name} name={selected.name} eager sizes="95vw" />
          <div className="gallery-dialog-bottom"><div aria-live="polite"><Dialog.Title>{selected.title}</Dialog.Title><Dialog.Description>{selected.source} · {index + 1} of {images.length}</Dialog.Description></div><div className="gallery-controls"><button className="icon-button" aria-label="Previous image" onClick={() => next(-1)}><ArrowLeft aria-hidden="true" size={22} /></button><button className="icon-button" aria-label="Next image" onClick={() => next(1)}><ArrowRight aria-hidden="true" size={22} /></button></div></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </section>;
}
