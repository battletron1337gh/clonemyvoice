export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm">Limited beta spots available</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Clone Your Voice?
        </h2>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join hundreds of creators who are already saving hours every day and making more money with AI voice automation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-200 glow"
          >
            Join the Waitlist
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
          <a
            href="mailto:hello@clonemyvoice.ai"
            className="inline-flex items-center gap-2 px-8 py-4 bg-surface hover:bg-surface-light text-white font-semibold rounded-full border border-white/10 transition-all duration-200"
          >
            Contact Sales
          </a>
        </div>

        <p className="text-gray-500 mt-8">
          14-day free trial • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  )
}
