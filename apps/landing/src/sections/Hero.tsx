export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Background shapes - static, no animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm text-gray-300">Now accepting beta users</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Your Voice,{' '}
          <span className="gradient-text">Infinite Possibilities</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
          Clone your voice with AI. Reply to thousands of fans in your own voice while you sleep.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#waitlist"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-200 glow"
          >
            Join the Waitlist
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-surface hover:bg-surface-light text-white font-semibold rounded-full border border-white/10 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Watch Demo
          </button>
        </div>

        {/* Demo Card */}
        <div className="relative max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">AI Voice Demo</p>
                <p className="text-sm text-gray-400">Try it yourself below</p>
              </div>
            </div>
            
            {/* Simple waveform visualization - static */}
            <div className="flex items-center justify-center gap-1 h-16 mb-6">
              {[40, 60, 35, 80, 50, 70, 45, 90, 55, 65, 40, 75, 50, 85, 45, 70, 55, 60, 40, 80, 50, 70, 45, 85, 55, 65, 40, 75, 50, 90, 45, 70, 55, 60, 40, 80, 50, 70, 45, 85].map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <p className="text-gray-400 text-sm">
              "Hey! Thanks for your message. I'm currently busy creating content, 
              but I wanted to personally thank you for reaching out..."
            </p>
          </div>

          {/* Floating stat - static */}
          <div className="absolute -top-4 -right-4 glass rounded-lg px-4 py-2 text-sm">
            <span className="text-green-400">●</span> 2,847 DMs answered today
          </div>
        </div>
      </div>
    </section>
  )
}
