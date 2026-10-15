import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import DestinationArt from './DestinationArt'
import { destinations } from '../data/destinations'

const facts = [
  { id: 'tangier', k: '14 km', t: 'from Europe', d: 'Across the Strait of Gibraltar, Tangier sits closer to Spain than Paris sits to Versailles.' },
  { id: 'imlil', k: '4', t: 'landscapes, one road trip', d: 'Atlantic surf, Mediterranean coves, the High Atlas and the Sahara, all within a week’s drive.' },
  { id: 'marrakech', k: '3 h', t: 'from Paris, 7 h from New York', d: 'Direct flights land in Casablanca, Marrakech and Fès every day of the year.' },
]

function Fact({ f, i, progress }) {
  const start = i / facts.length
  const end = (i + 1) / facts.length
  const opacity = useTransform(progress, [start - 0.05, start + 0.08, end - 0.08, end + 0.02], [0, 1, 1, i === facts.length - 1 ? 1 : 0])
  const y = useTransform(progress, [start - 0.05, start + 0.08, end - 0.08, end + 0.02], [60, 0, 0, -60])
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-4 top-1/2 -mt-24 sm:inset-x-6 lg:inset-x-8">
      <p className="font-display text-7xl font-semibold leading-none text-saffron sm:text-8xl lg:text-9xl">{f.k}</p>
      <p className="mt-3 font-display text-2xl italic sm:text-3xl">{f.t}</p>
      <p className="mt-4 max-w-sm text-sand-100/70">{f.d}</p>
    </motion.div>
  )
}

export default function Crossroads() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.85, 1])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(facts.length - 1, Math.floor(v * facts.length))))
  const d = destinations.find((x) => x.id === facts[active].id)

  return (
    <section ref={ref} aria-label="Morocco at the crossroads" className="relative h-[300vh] bg-ink-900 text-sand-50">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden lg:flex-row">
        <div className="relative grid h-[48vh] w-full place-items-center pt-16 lg:h-full lg:w-1/2 lg:pt-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,163,59,.18),transparent_60%)]" />
          <motion.div style={{ rotate, scale }} className="relative aspect-[4/5] h-[74%] overflow-hidden rounded-t-full rounded-b-3xl border-4 border-sand-50/90 lg:h-[64%]">
            <AnimatePresence initial={false}>
              <motion.div key={d.id} initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
                <DestinationArt scene={d.scene} palette={d.palette} className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute bottom-1 font-display text-lg italic text-sand-100/80 lg:bottom-[10%]">
              {d.name}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="container-x relative flex-1 lg:w-1/2 lg:pr-16">
          <p className="eyebrow absolute left-4 top-6 text-saffron sm:left-6 lg:top-[22%]">Morocco, at the crossroads</p>
          {facts.map((f, i) => <Fact key={f.k} f={f} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  )
}
