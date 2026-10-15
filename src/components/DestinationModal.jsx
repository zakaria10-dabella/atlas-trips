import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Check, Clock, MapPin, Star, X } from 'lucide-react'
import DestinationArt from './DestinationArt'

export default function DestinationModal({ d, onClose, onBook }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`card-${d.id}`}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <motion.div layoutId={`art-${d.id}`} className="relative aspect-[16/9] overflow-hidden">
          <DestinationArt scene={d.scene} palette={d.palette} className="h-full w-full" />
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow"
          >
            <X size={18} />
          </motion.button>
        </motion.div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">{d.region} · {d.type}</p>
              <motion.h3 layoutId={`title-${d.id}`} id="modal-title" className="mt-1 font-display text-4xl font-semibold">
                {d.name}
              </motion.h3>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-sand-100 px-3 py-1 text-sm font-semibold">
              <Star size={14} className="fill-saffron text-saffron" /> {d.rating} / 5
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="mt-4 leading-relaxed text-ink-700/80">{d.description}</p>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
              {[
                [Calendar, 'Best time', d.bestTime],
                [Clock, 'Suggested', `${d.days} day${d.days > 1 ? 's' : ''}`],
                [MapPin, 'Region', d.region],
              ].map(([Icon, k, v]) => (
                <div key={k} className="rounded-2xl bg-sand-100 p-3">
                  <dt className="flex items-center gap-1 text-xs text-ink-700/60"><Icon size={12} />{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <h4 className="mt-6 font-semibold">Highlights</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/15 text-mint"><Check size={12} /></span>
                  {h}
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-800/10 pt-6">
              <p className="text-sm text-ink-700/70">
                from <span className="font-display text-2xl font-semibold text-ink-800">{d.price.toLocaleString('en-US')} MAD</span> / person
              </p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onBook(d.id)} className="btn-primary">
                Book {d.name}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
