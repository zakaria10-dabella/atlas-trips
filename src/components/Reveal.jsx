import { motion, useReducedMotion } from 'framer-motion'

export const ease = [0.23, 1, 0.32, 1]

export default function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </M>
  )
}
