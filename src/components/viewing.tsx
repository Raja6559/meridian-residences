import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, X } from 'lucide-react';
import { useHydrated } from './use-hydrated';

export function Viewing({ quiet = false }: { quiet?: boolean }) {
  const ready = useHydrated();
  return <Dialog.Root>
    <Dialog.Trigger disabled={!ready} className={`button ${quiet ? 'button-outline' : ''}`}>Preview a viewing <ArrowUpRight size={17} aria-hidden="true" /></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="viewing-dialog">
        <Dialog.Close className="icon-button dialog-close" aria-label="Close viewing preview"><X aria-hidden="true" size={23} /></Dialog.Close>
        <p className="eyebrow">An imagined first step</p>
        <Dialog.Title>Picture the possibilities.</Dialog.Title>
        <Dialog.Description>Meridian Residences is a fictional residential concept. This illustrates a viewing journey; no real viewing can be booked here.</Dialog.Description>
        <ol className="viewing-steps">
          <li><span>01</span><div><h3>Explore the spaces</h3><p>Discover the architectural direction and imagined interiors.</p></div></li>
          <li><span>02</span><div><h3>Discuss your interests</h3><p>A real property team would help you understand the details that matter to you.</p></div></li>
          <li><span>03</span><div><h3>Arrange a viewing</h3><p>For a live development, the team would confirm availability and the next steps.</p></div></li>
        </ol>
        <p className="small-note">Preview only. No personal details are collected or sent.</p>
        <Dialog.Close className="button">Back to the spaces <ArrowUpRight size={17} aria-hidden="true" /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
