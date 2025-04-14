export function ContactHero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div
        className="h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=300&width=1200')" }}
      >
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center gap-4 text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="max-w-[600px] text-lg text-white/90">
            We're here to answer your questions and help you find your dream car
          </p>
        </div>
      </div>
    </section>
  )
}
