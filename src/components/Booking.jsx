import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { destinations } from '../data/destinations'
import Reveal from './Reveal'

const styles = [
  { id: 'comfort', label: 'Comfort', note: 'Charming riads', mult: 1 },
  { id: 'boutique', label: 'Boutique', note: 'Design stays', mult: 1.35 },
  { id: 'luxury', label: 'Luxury', note: 'Palaces & spas', mult: 1.9 },
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
      controls.start({ x: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } })
      return
    }
    setDone(true)
  }

  return (
    <section id="book" className="scroll-mt-16 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Request a trip</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Tell us where. We handle the rest.</h2>
          <p className="mt-4 text-ink-700/75">A trip designer based in Marrakech will reply within 24 hours with a tailored proposal. No payment until you confirm.</p>
          <AnimatePresence>
            {dest && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="mt-8 rounded-3xl bg-ink-800 p-6 text-sand-50"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-saffron">Estimate</p>
                <motion.p key={total} initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 font-display text-4xl font-semibold">
                  {total.toLocaleString('en-US')} MAD
                </motion.p>
                <p className="mt-1 text-sm text-sand-100/70">
                  {dest.name} · {values.travelers} traveller{values.travelers > 1 ? 's' : ''} · {style.label}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div animate={controls} className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-12 text-center">
                  <svg viewBox="0 0 52 52" className="h-20 w-20">
                    <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#3E7C6B" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                    <motion.path d="M15 27l7 7 15-15" fill="none" stroke="#3E7C6B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
                  </svg>
                  <h3 className="mt-6 font-display text-3xl font-semibold">Shukran, {values.name.split(' ')[0]}!</h3>
                  <p className="mt-2 max-w-sm text-ink-700/70">Your request for {dest?.name} is in. We will call you on {values.phone} within 24 hours.</p>
                  <button onClick={() => { setDone(false); setValues(empty); setTouched({}); setSubmitted(false) }} className="btn-ghost mt-8">
                    Plan another trip
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0, y: -10 }} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" error={show('name')} id="name">
                    <input id="name" className="field" value={values.name} onChange={set('name')} onBlur={blur('name')} placeholder="Yasmine El Idrissi" autoComplete="name" />
                  </Field>
                  <Field label="Phone" error={show('phone')} id="phone">
                    <input id="phone" className="field" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="+212 6 12 34 56 78" inputMode="tel" autoComplete="tel" />
                  </Field>
                  <Field label="Destination" error={show('destination')} id="destination">
                    <select id="destination" className="field" value={values.destination} onChange={set('destination')} onBlur={blur('destination')}>
                      <option value="">Select a destination</option>
                      {destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </Field>
                  <Field label="Start date" error={show('date')} id="date">
                    <input id="date" type="date" min={today} className="field" value={values.date} onChange={set('date')} onBlur={blur('date')} />
                  </Field>
                  <div>
                    <span className="mb-2 block text-sm font-semibold">Travellers</span>
                    <div className="flex items-center justify-between rounded-xl border border-ink-800/15 px-2 py-1.5">
                      <Stepper label="Remove traveller" onClick={() => setValues((v) => ({ ...v, travelers: Math.max(1, v.travelers - 1) }))}><Minus size={16} /></Stepper>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span key={values.travelers} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="font-semibold tabular-nums">
                          {values.travelers}
                        </motion.span>
                      </AnimatePresence>
                      <Stepper label="Add traveller" onClick={() => setValues((v) => ({ ...v, travelers: Math.min(12, v.travelers + 1) }))}><Plus size={16} /></Stepper>
                    </div>
                  </div>
                  <div>
                    <span className="mb-2 block text-sm font-semibold">Travel style</span>
                    <div role="radiogroup" aria-label="Travel style" className="grid grid-cols-3 gap-1 rounded-xl bg-sand-100 p-1">
                      {styles.map((s) => (
                        <button type="button" role="radio" aria-checked={values.style === s.id} key={s.id} onClick={() => setValues((v) => ({ ...v, style: s.id }))} className="relative rounded-lg px-2 py-2 text-xs font-semibold">
                          {values.style === s.id && <motion.span layoutId="style-pill" className="absolute inset-0 rounded-lg bg-white shadow" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                          <span className="relative">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="mb-2 block text-sm font-semibold">Anything we should know? <span className="font-normal text-ink-700/50">(optional)</span></label>
                    <textarea id="notes" rows={3} className="field resize-none" value={values.notes} onChange={set('notes')} placeholder="Honeymoon, vegetarian, travelling with kids..." />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-primary sm:col-span-2">
                    Send my request
                  </motion.button>
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
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-1.5 text-xs font-medium text-clay-600" role="alert">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Stepper({ children, onClick, label }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.85 }} onClick={onClick} aria-label={label} className="grid h-8 w-8 place-items-center rounded-lg bg-sand-100 hover:bg-sand-200">
      {children}
    </motion.button>
  )
}
