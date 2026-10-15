import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Explorer from './components/Explorer'
import Band from './components/Band'
import Itinerary from './components/Itinerary'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  const [preset, setPreset] = useState(null)

  const onBook = (id) => {
    setPreset({ id, at: Date.now() })
    requestAnimationFrame(() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }))
  }

  return (
    <>
      <a href="#explore" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">
        Skip to destinations
      </a>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Explorer onBook={onBook} />
        <Band />
        <Itinerary />
        <Booking preset={preset} />
      </main>
      <Footer />
    </>
  )
}
