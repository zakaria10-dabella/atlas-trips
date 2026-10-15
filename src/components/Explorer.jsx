import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { destinations, regions, types } from '../data/destinations'
import DestinationCard from './DestinationCard'
import DestinationModal from './DestinationModal'
import Reveal from './Reveal'

// Magazine rhythm: rows alternate two wide frames and three tall ones,
// re-balanced so no row leaves an empty cell; an odd list closes on a
// full-width feature.
function rowSizes(n) {
  const sizes = []
  let want = 2
  const feature = n >= 5 && n % 2 === 1
  let r = feature ? n - 1 : n
  while (r > 0) {
    let s = Math.min(want, r)
    if (r - s === 1 && r > 1) s = s === 3 ? 2 : 3
    sizes.push(s)
    r -= s
    want = want === 2 ? 3 : 2
  }
  if (feature) sizes.push(1)
  return sizes.flatMap((s) => Array(s).fill(s))
}

function Tabs({ label, options, value, onChange, group }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
      <span className="label w-28 shrink-0 text-ink-mute" id={`${group}-label`}>{label}</span>
      <div role="radiogroup" aria-labelledby={`${group}-label`} className="-mx-2 flex flex-wrap">
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={`relative min-h-[44px] px-2 text-[1.0625rem] transition-colors duration-150 sm:px-3 ${
                active ? 'text-ink' : 'text-ink-mute hover:text-ink'
              }`}
            >
              {opt === 'All' ? 'Everywhere' : opt}
              {active && (
                <motion.span
                  layoutId={`tab-${group}`}
                  className="absolute inset-x-2 bottom-2 h-px bg-cobalt sm:inset-x-3"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Explorer({ onBook }) {
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(
    () => destinations.filter((d) => (region === 'All' || d.region === region) && (type === 'All' || d.type === type)),
    [region, type],
  )
  const sizes = rowSizes(filtered.length)
  const open = destinations.find((d) => d.id === openId)

  return (
    <section id="explore" aria-labelledby="explore-title" className="scroll-mt-20 border-t border-ink/10 py-24 sm:py-32">
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 id="explore-title" className="font-display text-[2.75rem] font-normal leading-[1] tracking-[-0.02em] sm:text-[4rem] lg:col-span-6 lg:text-[5rem]">
            Nine places worth <em className="italic">the detour</em>
          </h2>
          <div className="space-y-1 lg:col-span-6 lg:pb-2">
            <Tabs label="Region" group="region" options={regions} value={region} onChange={setRegion} />
            <Tabs label="Landscape" group="type" options={types} value={type} onChange={setType} />
          </div>
        </Reveal>

        <p className="mt-12 border-b border-ink/15 pb-4 text-[0.95rem] text-ink-soft" aria-live="polite">
          <span className="tnum">{filtered.length}</span> of <span className="tnum">{destinations.length}</span> destinations
          {region !== 'All' || type !== 'All' ? (
            <button type="button" onClick={() => { setRegion('All'); setType('All') }} className="ml-4 min-h-[44px] text-cobalt underline underline-offset-4">
              Clear filters
            </button>
          ) : null}
        </p>

        <LayoutGroup>
          <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-20">
            <AnimatePresence mode="popLayout">
              {filtered.map((d, i) => {
                const lastOdd = filtered.length % 2 === 1 && i === filtered.length - 1
                return <DestinationCard key={d.id} d={d} size={sizes[i]} wide={lastOdd} eager={i < 2} onOpen={setOpenId} />
              })}
            </AnimatePresence>
          </motion.ul>

          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="font-display text-[2rem] italic">Nothing there, yet.</p>
                <p className="mx-auto mt-3 max-w-[40ch] text-ink-soft">
                  We have no {type.toLowerCase()} trips in the {region} for now. Ask us anyway: we often build them on request.
                </p>
                <button type="button" onClick={() => { setRegion('All'); setType('All') }} className="btn-solid mt-8">
                  Show all destinations
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
