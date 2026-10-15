import { motion } from 'framer-motion'

export default function FilterChips({ label, options, value, onChange, group }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active ? 'text-sand-50' : 'text-ink-700 hover:bg-ink-800/5'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`chip-${group}`}
                className="absolute inset-0 rounded-full bg-ink-800"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}
