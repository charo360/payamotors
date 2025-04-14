export function AboutHero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div
        className="h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200')" }}
      >
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center gap-4 text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About PayaMotors</h1>
          <p className="max-w-[800px] text-lg sm:text-xl text-white/90">
            Kenya's premier car dealership offering quality vehicles at competitive prices
          </p>
        </div>
      </div>
    </section>
  )
}
