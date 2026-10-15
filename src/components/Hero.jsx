import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { ease } from './Reveal'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const k = reduce ? 0 : 1
  // three planes, three rates: the far dunes drift slowly and push in,
  // the type lifts faster, the inset print rises fastest and crosses the fold
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220 * k])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.04 + 0.16 * k])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140 * k])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])
  const insetY = useTransform(scrollYProgress, [0, 1], [0, -320 * k])

  return (
    <section ref={ref} id="top" className="on-dark relative h-[100svh] min-h-[620px] text-paper">
      <div className="absolute inset-0 overflow-hidden bg-[#7a3a12]">
        <motion.img
          src="/photos/hero-dunes.jpg"
          alt="Sunset over the rippled dunes of Erg Chebbi, near Merzouga"
          width="1280"
          height="854"
          fetchpriority="high"
          decoding="async"
          style={{ y: bgY, scale: bgScale }}
          className="h-full w-full object-cover object-[50%_35%] will-change-transform"
        />
        {/* band scrim under the copy only; the sky and sun stay untouched */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#140c06]/85 via-[#140c06]/45 to-transparent" />
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="wrap relative flex h-full flex-col justify-end pb-14 sm:pb-20 lg:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="max-w-[13ch] font-display text-[3.1rem] font-normal leading-[0.98] tracking-[-0.025em] sm:text-[5rem] lg:text-[7.25rem]"
        >
          Morocco, <em className="font-normal italic">the long way round.</em>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
          className="mt-7 flex flex-col gap-7 sm:mt-9 lg:max-w-[52rem] lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <p className="max-w-[38ch] text-[1.125rem] leading-relaxed text-paper/90 sm:text-[1.25rem]">
            Private journeys from the Rif to the Sahara, planned in Marrakech by people who grew up on these roads.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-3">
            <a href="#explore" className="btn-light">
              Find a destination <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a href="#itinerary" className="inline-flex min-h-[44px] items-center text-[0.95rem] font-semibold underline decoration-paper/50 underline-offset-[6px] hover:decoration-paper">
              See the 8-day route
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.figure
        style={{ y: insetY }}
        initial={{ opacity: 0, clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: 1.2, ease, delay: 0.6 }}
        className="absolute bottom-24 right-12 z-10 hidden w-[15rem] xl:block 2xl:right-[calc((100vw-1320px)/2+3rem)]"
      >
        <div className="aspect-[4/5] overflow-hidden bg-paper-deep outline outline-1 outline-paper/20 shadow-[0_30px_60px_-20px_rgba(20,12,6,.7)]">
          <img
            src="/photos/merzouga.jpg"
            alt="Shadows of a camel caravan stretched across an Erg Chebbi dune"
            width="1280"
            height="854"
            decoding="async"
            className="h-full w-full object-cover object-[38%_50%]"
          />
        </div>
        <figcaption className="mt-3 text-[0.875rem] italic text-paper/85">Erg Chebbi, an hour before dark.</figcaption>
      </motion.figure>
    </section>
  )
}
