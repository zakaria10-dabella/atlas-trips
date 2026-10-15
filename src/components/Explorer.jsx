import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { destinations, regions, types } from '../data/destinations'
import DestinationCard from './DestinationCard'
import DestinationModal from './DestinationModal'
import FilterChips from './FilterChips'
import Reveal from './Reveal'

export default function Explorer({ onBook }) {
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(
    () => destinations.filter((d) => (region === 'All' || d.region === region) && (type === 'All' || d.type === type)),
    [region, type],
  )
  const open = destinations.find((d) => d.id === openId)

  return (
    <section id="explore" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Destination explorer</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">From the Rif to the Sahara</h2>
            <p className="mt-4 text-ink-700/75">Filter by region or landscape. Tap a card to see highlights, the best season and starting prices.</p>
          </div>
          <div className="space-y-3">
            <FilterChips label="Region" group="region" options={regions} value={region} onChange={setRegion} />
            <FilterChips label="Type" group="type" options={types} value={type} onChange={setType} />
          </div>
        </Reveal>

        <p className="mt-10 text-sm text-ink-700/60" aria-live="polite">
          Showing <strong className="text-ink-800">{filtered.length}</strong> of {destinations.length} destinations
        </p>

        <LayoutGroup>
          <motion.ul layout className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((d) => (
                <DestinationCard key={d.id} d={d} onOpen={setOpenId} />
              ))}
            </AnimatePresence>
          </motion.ul>
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-ink-800/20 py-16 text-center"
              >
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                  <Compass className="text-clay-500" size={36} />
                </motion.span>
                <p className="mt-4 font-display text-xl">No match for this combination yet</p>
                <button onClick={() => { setRegion('All'); setType('All') }} className="mt-3 text-sm font-semibold text-clay-600 underline-offset-4 hover:underline">
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <DestinationModal
                key={open.id}
                d={open}
                onClose={() => setOpenId(null)}
                onBook={(id) => { setOpenId(null); onBook(id) }}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  )
}
