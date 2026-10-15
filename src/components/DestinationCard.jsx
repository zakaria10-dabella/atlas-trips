import { motion } from 'framer-motion'
import { Clock, MapPin, Star } from 'lucide-react'
import DestinationArt from './DestinationArt'

export default function DestinationCard({ d, onOpen }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.button
        layoutId={`card-${d.id}`}
        onClick={() => onOpen(d.id)}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="group block w-full overflow-hidden rounded-3xl bg-white text-left shadow-card"
        aria-label={`Open ${d.name} details`}
      >
        <motion.div layoutId={`art-${d.id}`} className="relative aspect-[4/3] overflow-hidden">
          <DestinationArt scene={d.scene} palette={d.palette} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold backdrop-blur">{d.type}</span>
        </motion.div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <motion.h3 layoutId={`title-${d.id}`} className="font-display text-2xl font-semibold">
              {d.name}
            </motion.h3>
            <span className="flex items-center gap-1 text-sm font-semibold">
              <Star size={14} className="fill-saffron text-saffron" /> {d.rating}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-700/70">{d.tagline}</p>
          <div className="mt-4 flex items-center justify-between border-t border-ink-800/10 pt-4 text-sm">
            <span className="flex items-center gap-3 text-ink-700/70">
              <span className="flex items-center gap-1"><MapPin size={14} />{d.region}</span>
              <span className="flex items-center gap-1"><Clock size={14} />{d.days}d</span>
            </span>
            <span>
              from <strong className="font-semibold text-clay-600">{d.price.toLocaleString('en-US')} MAD</strong>
            </span>
          </div>
        </div>
      </motion.button>
    </motion.li>
  )
}
