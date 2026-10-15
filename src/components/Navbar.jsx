import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#explore', label: 'Destinations' },
  { href: '#itinerary', label: 'The 8-day route' },
  { href: '#book', label: 'Plan a trip' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > window.innerHeight * 0.85))
  const light = !solid && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-300 ease-out ${
        light ? 'text-paper' : 'bg-paper/95 text-ink shadow-[0_1px_0_rgba(23,25,30,.1)] backdrop-blur'
      }`}
    >
      <nav className={`wrap flex h-16 items-center justify-between sm:h-20 ${light ? 'on-dark' : ''}`} aria-label="Main">
        <a href="#top" className="font-display text-[1.375rem] font-medium tracking-[-0.01em]">
          Atlas <span className="italic">Trips</span>
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="py-3 text-[0.95rem] decoration-1 underline-offset-[6px] hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="-mr-2 grid h-11 w-11 place-items-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="wrap border-t border-ink/10 pb-6 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-ink/10 py-4 font-display text-2xl">
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
