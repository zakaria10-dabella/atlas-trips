import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'

const notes = [
  ['Planned from Marrakech', 'Your trip is drawn up by one designer in our Guéliz office, who answers your messages until the last transfer.'],
  ['One driver, the whole way', 'The same driver-guide from the first pickup to the airport, so the road becomes a conversation, not a shuttle.'],
  ['Rooms we have slept in', 'Every riad, kasbah and desert camp on our list has been visited by the team. If we would not stay there, neither will you.'],
]

export default function Intro() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <section ref={ref} aria-labelledby="intro-title" className="pb-24 pt-24 sm:pb-32 sm:pt-32 xl:pt-40">
      <div className="wrap">
        <Reveal className="xl:max-w-[calc(100%-22rem)]">
          <h2 id="intro-title" className="font-display text-[2rem] font-normal leading-[1.15] tracking-[-0.015em] sm:text-[2.75rem] lg:text-[3.4rem] lg:leading-[1.1]">
            Most tours cross Morocco in a week and see it through a minibus window. <em className="italic text-cobalt">Ours take the slower road:</em> a night inside the ksar, lunch with a family in Imlil, the long way into Fès.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-12 sm:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <figure>
              <div className="aspect-[4/5] overflow-hidden bg-paper-deep">
                <motion.img
                  style={{ y: imgY, scale: 1.14 }}
                  src="/photos/chefchaouen-alley.jpg"
                  alt="A woman in a violet djellaba walks up a blue-washed lane in Chefchaouen as a cat crosses the cobbles"
                  width="1280"
                  height="854"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[28%_50%]"
                />
              </div>
              <figcaption className="mt-3 text-[0.875rem] italic text-ink-soft">Chefchaouen, mid-morning, after the delivery rounds.</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6 lg:self-end xl:col-span-6 xl:col-start-7">
            <p className="label text-cobalt">How we travel</p>
            <dl className="mt-6 border-t border-ink/15">
              {notes.map(([t, d], i) => (
                <Reveal key={t} delay={i * 0.06} className="grid gap-2 border-b border-ink/15 py-7 sm:grid-cols-[15rem_1fr] sm:gap-8">
                  <dt className="font-display text-[1.375rem] leading-snug">{t}</dt>
                  <dd className="max-w-[46ch] text-ink-soft">{d}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
