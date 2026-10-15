import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Landmark, Map, Mountain, Plane, Route, Sun, Tent, Trees } from 'lucide-react'
import { itinerary } from '../data/itinerary'
import Reveal from './Reveal'

const icons = { sun: Sun, map: Map, mountain: Mountain, route: Route, tent: Tent, trees: Trees, landmark: Landmark, plane: Plane }

export default function Itinerary() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="itinerary" className="scroll-mt-16 bg-ink-800 py-20 text-sand-50 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-saffron">Signature itinerary</p>
          <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Imperial cities & Sahara, in 8 days</h2>
          <p className="mt-4 text-sand-100/70">Marrakech to Fès through the High Atlas and the dunes of Erg Chebbi. Private driver, hand-picked riads, no rushing.</p>
        </Reveal>

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-sand-50/15 md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-5 top-0 w-px origin-top bg-saffron md:left-1/2" />
          <ol className="space-y-10 md:space-y-16">
            {itinerary.map((step, i) => {
              const Icon = icons[step.icon]
              const right = i % 2 === 1
              return (
                <li key={step.day} className="relative grid md:grid-cols-2 md:gap-16">
                  <motion.span
                    style={{ x: '-50%' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="absolute left-5 top-1 z-10 grid h-10 w-10 place-items-center rounded-full bg-saffron text-ink-900 md:left-1/2"
                  >
                    <Icon size={18} />
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`pl-14 md:pl-0 ${right ? 'md:col-start-2' : 'md:pr-4 md:text-right'}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Day {step.day} · {step.place}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sand-100/70">{step.detail}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
