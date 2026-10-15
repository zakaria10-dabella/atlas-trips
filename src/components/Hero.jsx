import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import DestinationArt from './DestinationArt'
import { destinations } from '../data/destinations'

const rotating = [
  { word: 'red city', id: 'marrakech' },
  { word: 'blue pearl', id: 'chefchaouen' },
  { word: 'golden dunes', id: 'merzouga' },
  { word: 'Atlantic breeze', id: 'essaouira' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }
const word = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const { scrollY } = useScroll()
  const artY = useTransform(scrollY, [0, 600], [0, 80])

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % rotating.length), 2800)
    return () => clearInterval(t)
  }, [])

  const current = destinations.find((d) => d.id === rotating[index].id)

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-saffron/20 blur-3xl" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-5">
            Handcrafted journeys · Since 2019
          </motion.p>
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {['Discover', 'the'].map((w) => (
              <span key={w} className="mr-3 inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={word} className="inline-block">{w}</motion.span>
              </span>
            ))}
            <span className="relative -ml-2 block h-[1.15em] overflow-hidden pl-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotating[index].word}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 whitespace-nowrap italic text-clay-500"
                >
                  {rotating[index].word}
                </motion.span>
              </AnimatePresence>
            </span>
            {['of', 'Morocco.'].map((w) => (
              <span key={w} className="mr-3 inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={word} className="inline-block">{w}</motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-700/80 sm:text-lg"
          >
            From the riads of Marrakech to a night under Saharan stars, we design small-group and private trips with local guides
            who call these places home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#explore" className="btn-primary group">
              Explore destinations
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="#itinerary" className="btn-ghost">
              See the 8-day loop
            </motion.a>
          </motion.div>
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ink-800/10 pt-6"
          >
            {[
              ['12k+', 'Travellers'],
              ['4.9', 'Avg. rating'],
              ['38', 'Local guides'],
            ].map(([v, l]) => (
              <motion.div key={l} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                <dt className="font-display text-2xl font-semibold sm:text-3xl">{v}</dt>
                <dd className="text-xs text-ink-700/60 sm:text-sm">{l}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          style={{ y: artY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-white shadow-card">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <DestinationArt scene={current.scene} palette={current.palette} className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute -left-2 bottom-16 rounded-2xl bg-white/90 p-3 pr-5 shadow-card backdrop-blur sm:-left-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-700/50">Now showing</p>
            <AnimatePresence mode="wait">
              <motion.p key={current.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-display text-lg font-semibold">
                {current.name}
              </motion.p>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1.3 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute -right-2 top-20 flex items-center gap-2 rounded-full bg-ink-800 px-4 py-2 text-sm text-sand-50 shadow-card sm:-right-6"
          >
            <Star size={14} className="fill-saffron text-saffron" /> 4.9 · 2,180 reviews
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
