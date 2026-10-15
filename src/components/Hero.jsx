import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import Magnetic from './Magnetic'
import { hasWebGL } from '../three/webgl'

const Globe = lazy(() => import('../three/Globe'))

const rotating = [{ word: 'red city' }, { word: 'blue pearl' }, { word: 'golden dunes' }, { word: 'Atlantic breeze' }]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }
const word = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: '0%', rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
}

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [webgl] = useState(hasWebGL)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % rotating.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-20 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-saffron/20 blur-3xl" />
      <div className="container-x grid items-center gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="order-2 lg:order-1">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-5">
            Handcrafted journeys · Since 2019
          </motion.p>
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-[2.9rem] font-semibold leading-[1] tracking-[-0.03em] sm:text-7xl lg:text-[5.6rem]"
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
            transition={{ delay: 1.5 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-700/80 sm:text-lg"
          >
            From the riads of Marrakech to a night under Saharan stars, we design small-group and private trips with local guides
            who call these places home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic>
              <motion.a whileTap={{ scale: 0.95 }} href="#explore" className="btn-primary group px-7 py-4">
                Explore destinations
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a whileTap={{ scale: 0.95 }} href="#itinerary" className="btn-ghost px-7 py-4">
                See the 8-day loop
              </motion.a>
            </Magnetic>
          </motion.div>
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.8 } } }}
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
        </motion.div>

        <motion.div
          style={{ y: artY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto -mb-4 aspect-square w-full max-w-[280px] sm:max-w-[420px] lg:order-2 lg:mb-0 lg:max-w-[560px]"
        >
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(227,163,59,.35),transparent_65%)] blur-2xl" />
          {webgl ? (
            <Suspense fallback={<div className="absolute inset-[14%] rounded-full bg-majorelle/80" />}>
              <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
                <Globe progress={scrollYProgress} />
              </div>
            </Suspense>
          ) : (
            <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#5A7FD0,#2F4BA8_55%,#1E2A3A)]" />
          )}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-[14%] left-0 hidden rounded-2xl sm:block border border-white/60 bg-white/70 p-3 pr-5 shadow-card backdrop-blur-md sm:left-2"
          >
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-ink-700/60"><MapPin size={12} /> You are here</p>
            <p className="font-display text-lg font-semibold">Morocco · 31.8°N 7.1°W</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 2.1 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute right-0 top-[12%] hidden items-center sm:flex gap-2 rounded-full bg-ink-800/90 px-4 py-2 text-sm text-sand-50 shadow-card backdrop-blur"
          >
            <Star size={14} className="fill-saffron text-saffron" /> 4.9 · 2,180 reviews
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
