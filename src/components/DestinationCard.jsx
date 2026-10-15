import { motion } from 'framer-motion'
import { ease } from './Reveal'

// per row size on desktop: 1 = full-width feature, 2 = wide pair, 3 = tall trio
const SPAN = { 1: 'lg:col-span-6', 2: 'lg:col-span-3', 3: 'lg:col-span-2' }
const ASPECT = { 1: 'lg:aspect-[21/9]', 2: 'lg:aspect-[4/3]', 3: 'lg:aspect-[4/5]' }

export default function DestinationCard({ d, size, wide, eager, onOpen }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ layout: { duration: 0.6, ease }, opacity: { duration: 0.4 } }}
      className={`${wide ? 'sm:col-span-2' : ''} ${SPAN[size]}`}
    >
      <button
        type="button"
        onClick={() => onOpen(d.id)}
        className="group block w-full text-left"
        aria-haspopup="dialog"
      >
        <motion.div
          layoutId={`photo-${d.id}`}
          transition={{ duration: 0.6, ease }}
          className={`relative aspect-[4/3] overflow-hidden bg-paper-deep ${wide ? 'sm:aspect-[16/9]' : 'sm:aspect-[4/5]'} ${ASPECT[size]}`}
        >
          <img
            src={d.photo}
            alt={d.alt}
            width="1280"
            height="854"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            style={{ objectPosition: d.focus }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </motion.div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[1.75rem] leading-tight tracking-[-0.01em] decoration-1 underline-offset-[6px] group-hover:underline">
            {d.name}
          </h3>
          <p className="shrink-0 text-[0.95rem] text-ink-soft">
            from <span className="tnum font-semibold text-ink">{d.price.toLocaleString('en-US')} MAD</span>
          </p>
        </div>
        <p className="mt-1 italic text-ink-soft">{d.tagline}</p>
        <p className="label mt-3 text-[0.75rem] text-ink-mute">
          {d.region} <span aria-hidden="true">/</span> {d.type} <span aria-hidden="true">/</span> {d.days} {d.days > 1 ? 'days' : 'day'}
        </p>
      </button>
    </motion.li>
  )
}
