import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { destinations } from '../data/destinations'
import Reveal from './Reveal'

const styles = [
  { id: 'comfort', label: 'Riad', note: 'Family-run riads', mult: 1 },
  { id: 'boutique', label: 'Boutique', note: 'Small design hotels', mult: 1.35 },
  { id: 'luxury', label: 'Palace', note: 'Palaces and spas', mult: 1.9 },
]

const today = new Date().toISOString().slice(0, 10)
const empty = { name: '', phone: '', destination: '', date: '', travelers: 2, style: 'comfort', notes: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^(\+212|0)[5-7]\d{8}$/.test(v.phone.replace(/[\s-]/g, ''))) e.phone = 'Use a Moroccan number, e.g. +212 6 12 34 56 78.'
  if (!v.destination) e.destination = 'Choose where you would like to go.'
  if (!v.date) e.date = 'Pick a start date.'
  else if (v.date < today) e.date = 'The start date cannot be in the past.'
  return e
}

export default function Booking({ preset }) {
  const [values, setValues] = useState(empty)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [done, setDone] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    if (preset) setValues((v) => ({ ...v, destination: preset.id }))
  }, [preset])

  const errors = validate(values)
  const show = (k) => (touched[k] || submitted) && errors[k]
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }))

  const dest = destinations.find((d) => d.id === values.destination)
  const style = styles.find((s) => s.id === values.style)
  const total = dest ? Math.round(dest.price * values.travelers * style.mult) : 0

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length) {
      controls.start({ x: [0, -8, 8, -4, 4, 0], transition: { duration: 0.35 } })
      document.getElementById(Object.keys(errors)[0])?.focus()
      return
    }
    setDone(true)
  }

  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-16 py-24 sm:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2 id="book-title" className="font-display text-[2.75rem] font-normal leading-[1] tracking-[-0.02em] sm:text-[4rem]">
            Tell us where. <em className="italic">We draw the route.</em>
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.125rem] leading-[1.7] text-ink-soft">
            A trip designer in Marrakech replies within 24 hours with a day-by-day proposal. Nothing to pay until you say yes.
          </p>

          <div className="mt-12 border-t border-ink" aria-live="polite">
            <p className="label pt-4 text-ink-mute">Your estimate</p>
            {dest ? (
              <dl className="mt-4">
                {[
                  ['Destination', dest.name],
                  ['Travellers', values.travelers],
                  ['Stays', `${style.label}, ${style.note.toLowerCase()}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-ink/15 py-3">
                    <dt className="text-ink-soft">{k}</dt>
                    <dd className="tnum text-right">{v}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 pt-5">
                  <dt className="text-ink-soft">From</dt>
                  <motion.dd key={total} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="tnum font-display text-[2.5rem] leading-none">
                    {total.toLocaleString('en-US')} MAD
                  </motion.dd>
                </div>
              </dl>
            ) : (
              <p className="mt-3 max-w-[36ch] italic text-ink-soft">Choose a destination and the estimate appears here, updated as you change the details.</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
          <motion.div animate={controls} className="relative">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-t border-ink py-12">
                  <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
                    <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#2140A6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                    <motion.path d="M15 27l7 7 15-15" fill="none" stroke="#2140A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
                  </svg>
                  <h3 className="mt-6 font-display text-[2.5rem] leading-tight">Shukran, {values.name.trim().split(' ')[0]}.</h3>
                  <p className="mt-3 max-w-[44ch] text-[1.125rem] text-ink-soft">Your request for {dest?.name} is with us. We will call you on {values.phone} within 24 hours.</p>
                  <button onClick={() => { setDone(false); setValues(empty); setTouched({}); setSubmitted(false) }} className="btn mt-8 border border-ink/30 hover:border-ink">
                    Plan another trip
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 border-t border-ink pt-8 sm:grid-cols-2">
                  <Field label="Full name" error={show('name')} id="name">
                    <input id="name" className="field" value={values.name} onChange={set('name')} onBlur={blur('name')} placeholder="Yasmine El Idrissi" autoComplete="name" aria-invalid={!!show('name')} aria-describedby={show('name') ? 'name-error' : undefined} />
                  </Field>
                  <Field label="Phone" error={show('phone')} id="phone">
                    <input id="phone" className="field" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="+212 6 12 34 56 78" inputMode="tel" autoComplete="tel" aria-invalid={!!show('phone')} aria-describedby={show('phone') ? 'phone-error' : undefined} />
                  </Field>
                  <Field label="Destination" error={show('destination')} id="destination">
                    <select id="destination" className="field" value={values.destination} onChange={set('destination')} onBlur={blur('destination')} aria-invalid={!!show('destination')} aria-describedby={show('destination') ? 'destination-error' : undefined}>
                      <option value="">Select a destination</option>
                      {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Start date" error={show('date')} id="date">
                    <input id="date" type="date" min={today} className="field" value={values.date} onChange={set('date')} onBlur={blur('date')} aria-invalid={!!show('date')} aria-describedby={show('date') ? 'date-error' : undefined} />
                  </Field>
                  <div>
                    <span className="block text-[0.95rem] font-semibold" id="travellers-label">Travellers</span>
                    <div className="flex items-center justify-between border-b border-ink/25 py-1" role="group" aria-labelledby="travellers-label">
                      <Stepper label="Remove traveller" disabled={values.travelers <= 1} onClick={() => setValues((v) => ({ ...v, travelers: Math.max(1, v.travelers - 1) }))}><Minus size={18} /></Stepper>
                      <span className="tnum text-[1.125rem]" aria-live="polite">{values.travelers}</span>
                      <Stepper label="Add traveller" disabled={values.travelers >= 12} onClick={() => setValues((v) => ({ ...v, travelers: Math.min(12, v.travelers + 1) }))}><Plus size={18} /></Stepper>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[0.95rem] font-semibold" id="style-label">Stays</span>
                    <div role="radiogroup" aria-labelledby="style-label" className="flex justify-between border-b border-ink/25">
                      {styles.map((s) => (
                        <button type="button" role="radio" aria-checked={values.style === s.id} key={s.id} onClick={() => setValues((v) => ({ ...v, style: s.id }))} className={`relative min-h-[48px] px-1 text-[1rem] transition-colors duration-150 ${values.style === s.id ? 'text-ink' : 'text-ink-mute hover:text-ink'}`}>
                          {s.label}
                          {values.style === s.id && <motion.span layoutId="style-line" className="absolute inset-x-0 -bottom-px h-0.5 bg-cobalt" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="block text-[0.95rem] font-semibold">Anything we should know? <span className="font-normal text-ink-mute">(optional)</span></label>
                    <textarea id="notes" rows={2} className="field resize-none" value={values.notes} onChange={set('notes')} placeholder="Honeymoon, vegetarian, travelling with kids..." />
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="btn-solid w-full sm:w-auto">Send my request</button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, error, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-semibold">{label}</label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p id={`${id}-error`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-2 text-[0.875rem] text-[#A12D1F]" role="alert">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stepper({ children, onClick, label, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} className="grid h-11 w-11 place-items-center transition-colors duration-150 hover:bg-ink/5 active:translate-y-px disabled:opacity-30">
      {children}
    </button>
  )
}
