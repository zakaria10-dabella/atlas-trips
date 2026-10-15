import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'

export default function Band() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])
  const clip = useTransform(scrollYProgress, [0, 0.35], reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(8% 6% 8% 6%)', 'inset(0% 0% 0% 0%)'])

  return (
    <section ref={ref} aria-label="Aït Benhaddou" className="on-dark relative">
      <motion.div style={{ clipPath: clip }} className="relative h-[88svh] min-h-[560px] overflow-hidden bg-[#5b3322]">
        <motion.img
          style={{ y, scale: 1.25 }}
          src="/photos/ksar.jpg"
          alt="The flat earthen rooftops of the ksar of Aït Benhaddou seen from above"
          width="1280"
          height="854"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* column of density under the copy; the right half of the photograph stays clean */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a]/90 via-[#1a0f0a]/55 to-transparent md:bg-gradient-to-r md:from-[#1a0f0a]/85 md:via-[#1a0f0a]/45 md:to-transparent" />
        <div className="wrap relative flex h-full items-end pb-14 md:items-center md:pb-0">
          <Reveal as="figure" className="max-w-[34rem] text-paper">
            <blockquote className="font-display text-[2rem] leading-[1.15] tracking-[-0.01em] sm:text-[2.75rem]">
              Earth, straw and river water. <em className="italic">After every rainy season, the families of the ksar plaster it again by hand.</em>
            </blockquote>
            <figcaption className="mt-8 border-t border-paper/30 pt-4 text-[0.95rem] text-paper/85">
              Aït Benhaddou, on the old caravan road from the Sahara to Marrakech. Day 3 of the route.
            </figcaption>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}
