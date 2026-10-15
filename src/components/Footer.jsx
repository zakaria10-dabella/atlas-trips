import credits from '../../public/photos/credits.json'

export default function Footer() {
  return (
    <footer className="on-dark bg-night text-paper">
      <div className="wrap py-20 sm:py-24">
        <div className="grid gap-12 border-b border-night-line pb-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="font-display text-[3rem] leading-none tracking-[-0.02em] sm:text-[4.5rem]">
              Atlas <em className="italic">Trips</em>
            </p>
            <p className="mt-5 max-w-[38ch] text-night-soft">Slow, privately guided journeys through Morocco. A concept studio project designed and built in Casablanca.</p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-8">
            <ul className="space-y-1">
              {[['#explore', 'Destinations'], ['#itinerary', 'The 8-day route'], ['#book', 'Plan a trip']].map(([h, l]) => (
                <li key={h}><a href={h} className="inline-flex min-h-[44px] items-center hover:underline">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div className="text-night-soft lg:col-span-2">
            <p>Rue de la Liberté</p>
            <p>Guéliz, Marrakech</p>
          </div>
        </div>

        <section aria-labelledby="credits-title" className="pt-10">
          <h2 id="credits-title" className="label text-night-soft">Photo credits</h2>
          <ul className="mt-5 grid gap-x-8 gap-y-2 text-[0.875rem] text-night-soft sm:grid-cols-2 lg:grid-cols-3">
            {credits.map((c) => (
              <li key={c.file}>
                <a href={c.source} target="_blank" rel="noreferrer" className="underline decoration-night-soft/40 hover:text-paper hover:decoration-paper">
                  {c.title.replace(/\.jpg$/i, '')}
                </a>
                {' '}by {c.author}, {c.license}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.875rem] text-night-soft">All photographs via Wikimedia Commons, used under their Creative Commons licences.</p>
        </section>

        <div className="mt-14 flex flex-col justify-between gap-2 text-[0.875rem] text-night-soft sm:flex-row">
          <p>Concept project by Zakaria Dabella, Casablanca</p>
          <p>© 2026 Atlas Trips</p>
        </div>
      </div>
    </footer>
  )
}
