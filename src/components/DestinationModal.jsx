import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { ease } from './Reveal'

export default function DestinationModal({ d, onClose, onBook }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('button, a[href]')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      opener?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  const facts = [
    ['Best season', d.bestTime],
    ['Time to give it', `${d.days} ${d.days > 1 ? 'days' : 'day'}`],
    ['Region', d.region],
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center sm:items-center sm:p-6 lg:p-10" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-night/75"
      />
      <div ref={panelRef} className="relative z-10 grid max-h-[100svh] w-full max-w-6xl overflow-y-auto bg-paper sm:max-h-[90vh] lg:grid-cols-[1.1fr_1fr] lg:overflow-hidden">
        <motion.div
          layoutId={`photo-${d.id}`}
          transition={{ duration: 0.6, ease }}
          className="relative aspect-[4/3] overflow-hidden bg-paper-deep lg:aspect-auto lg:min-h-[36rem]"
        >
          <img src={d.photo} alt={d.alt} width="1280" height="854" decoding="async" style={{ objectPosition: d.focus }} className="absolute inset-0 h-full w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="relative flex flex-col p-6 pb-8 sm:p-10 lg:overflow-y-auto lg:p-12"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${d.name}`}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center text-ink transition-colors hover:bg-ink/5 sm:right-5 sm:top-5"
          >
            <X size={20} />
          </button>
          <p className="label text-cobalt">{d.region} / {d.type}</p>
          <h3 id="modal-title" className="mt-3 pr-10 font-display text-[2.75rem] leading-[1] tracking-[-0.02em] sm:text-[3.5rem]">{d.name}</h3>
          <p className="mt-3 font-display text-[1.375rem] italic text-ink-soft">{d.tagline}</p>
          <p className="mt-6 max-w-[52ch] leading-relaxed">{d.description}</p>

          <dl className="mt-8 grid grid-cols-3 border-y border-ink/15">
            {facts.map(([k, v], i) => (
              <div key={k} className={`py-4 ${i ? 'border-l border-ink/15 pl-4' : 'pr-4'}`}>
                <dt className="text-[0.8125rem] text-ink-mute">{k}</dt>
                <dd className="mt-1 font-semibold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>

          <h4 className="label mt-8 text-ink-mute">On the way</h4>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
            {d.highlights.map((h) => (
              <li key={h} className="border-b border-ink/10 py-2.5">{h}</li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-10">
            <p className="text-ink-soft">
              from <span className="tnum block font-display text-[2rem] leading-none text-ink">{d.price.toLocaleString('en-US')} MAD</span>
              <span className="text-[0.875rem]">per person, before flights</span>
            </p>
            <button type="button" onClick={() => onBook(d.id)} className="btn-solid">
              Plan this trip <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
