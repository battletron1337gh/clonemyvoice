export default function Testimonials() {
  const testimonials = [
    {
      quote: "I went from spending 4 hours a day on DMs to 30 minutes. My engagement actually went up because fans get instant replies now.",
      author: 'Sarah K.',
      role: 'Lifestyle Creator',
      followers: '250K followers',
      initial: 'S',
    },
    {
      quote: "The voice cloning is scary good. My clients can't tell the difference. I've 3x'd my coaching revenue since using CloneMyVoice.",
      author: 'Mike T.',
      role: 'Fitness Coach',
      followers: '180K followers',
      initial: 'M',
    },
    {
      quote: "Game changer. I can give every fan personal attention without burning out. My tips have increased by 40%.",
      author: 'Emma R.',
      role: 'OnlyFans Creator',
      followers: '500K followers',
      initial: 'E',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by Creators
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what other creators are saying about CloneMyVoice.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="glass rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-primary">{testimonial.initial}</span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role} • {testimonial.followers}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
