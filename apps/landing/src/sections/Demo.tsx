export default function Demo() {
  const messages = [
    "Hey! Thanks for reaching out. I really appreciate your support!",
    "I'm currently working on something exciting. Stay tuned!",
    "Your message made my day. Thank you for being awesome!",
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Try It Yourself
          </h2>
          <p className="text-xl text-gray-400">
            Hear how realistic AI voice cloning sounds. Select a message and click play.
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-8 h-8 text-white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
            </div>
            <div>
              <p className="font-semibold text-white text-lg">Demo Voice</p>
              <p className="text-sm text-gray-400">AI Generated</p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {messages.map((message, i) => (
              <button
                key={i}
                className="w-full text-left p-4 rounded-xl bg-background/50 hover:bg-background transition-colors border border-white/5"
              >
                <p className="text-gray-300">{message}</p>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
            <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
              <div className="h-full w-0 bg-primary rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm">0:03</span>
          </div>

          <p className="text-gray-500 text-sm mt-4 text-center">
            This is a simulated demo. Real voice cloning requires your voice samples.
          </p>
        </div>
      </div>
    </section>
  )
}
