import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { itinerary } from '../data/itinerary'
import Reveal, { ease } from './Reveal'

function Day({ step, index, active, onActive, showPhoto }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => { if (inView) onActive(index) }, [inView, index, onActive])

  return (
    <li ref={ref} className={`relative pl-8 transition-opacity duration-500 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:pl-14 ${active ? '' : 'lg:opacity-40'}`}>
      <span aria-hidden="true" className="absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cobalt-light lg:top-1/2" />
      {showPhoto && (
        <div className="mb-6 aspect-[16/10] overflow-hidden bg-night-line lg:hidden">
          <img src={step.photo} alt="" width="1280" height="854" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
      )}
      <p className="label text-cobalt-light">
        Day <span className="tnum">{step.day}</span> <span aria-hidden="true">/</span> {step.place}
      </p>
      <h3 className="mt-3 font-display text-[2rem] leading-[1.1] tracking-[-0.01em] sm:text-[2.5rem]">{step.title}</h3>
      <p className="mt-4 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-night-soft">{step.detail}</p>
    </li>
  )
}

export default function Itinerary() {
  const listRef = useRef(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 50%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const step = itinerary[active]

  return (
    <section id="itinerary" aria-labelledby="route-title" className="on-dark scroll-mt-16 bg-night py-24 text-paper sm:py-32">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <h2 id="route-title" className="font-display text-[2.75rem] font-normal leading-[1] tracking-[-0.02em] sm:text-[4rem] lg:col-span-7 lg:text-[5rem]">
            Eight days, <em className="italic">Marrakech to Fès</em>
          </h2>
          <p className="max-w-[40ch] text-[1.125rem] leading-[1.7] text-night-soft lg:col-span-4 lg:col-start-9 lg:self-end">
            Our signature route over the High Atlas and into the Sahara. One private driver, riads and a desert camp we know by name, no 5 a.m. starts except the one worth it.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] max-h-[calc(100vh-9rem)] w-full overflow-hidden bg-night-line">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={step.photo}
                    src={step.photo}
                    alt=""
                    width="1280"
                    height="854"
                    decoding="async"
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <p className="mt-4 text-[0.95rem] italic text-night-soft" aria-live="polite">{step.place}, day {step.day}</p>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-night-line" />
            <motion.div aria-hidden="true" style={{ scaleY: reduce ? scrollYProgress : scaleY }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-cobalt-light" />
            <ol ref={listRef} className="space-y-16 lg:space-y-0">
              {itinerary.map((s, i) => (
                <Day key={s.day} step={s} index={i} active={i === active} onActive={setActive} showPhoto={i === 0 || s.photo !== itinerary[i - 1].photo} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
