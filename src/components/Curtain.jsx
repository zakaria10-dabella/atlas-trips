import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Intro curtain: brand mark, then the page is revealed with a wipe. */
export default function Curtain() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900)
    return () => clearTimeout(t)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] grid place-items-center bg-clay-500 text-sand-50"
        >
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="font-display text-4xl font-semibold italic sm:text-6xl">
            Atlas Trips
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
