import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const names = ['Marrakech', 'Chefchaouen', 'Merzouga', 'Essaouira', 'Fès', 'Dakhla', 'Imlil', 'Tangier']

export default function Marquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])
  const row = (
    <>
      {names.map((n) => (
        <span key={n} className="flex items-center gap-8">
          {n}
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-saffron sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 6.2L21 12l-6.6 2.4L12 22l-2.4-7.6L3 12l6.6-3.8z" /></svg>
        </span>
      ))}
    </>
  )
  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden border-y border-ink-800/10 py-6 font-display text-5xl font-semibold tracking-tight sm:text-7xl">
      <motion.div style={{ x: x1 }} className="flex w-max gap-8 whitespace-nowrap">{row}{row}</motion.div>
      <motion.div style={{ x: x2 }} className="mt-2 flex w-max gap-8 whitespace-nowrap italic text-transparent [-webkit-text-stroke:1.5px_#C65D3B]">{row}{row}</motion.div>
    </div>
  )
}
