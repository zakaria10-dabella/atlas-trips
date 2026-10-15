import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Explorer from './components/Explorer'
import Itinerary from './components/Itinerary'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  const [preset, setPreset] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  const onBook = (id) => {
    setPreset({ id, at: Date.now() })
    requestAnimationFrame(() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-clay-500" />
      <Navbar />
      <main>
        <Hero />
        <Explorer onBook={onBook} />
        <Itinerary />
        <Booking preset={preset} />
      </main>
      <Footer />
    </>
  )
}
