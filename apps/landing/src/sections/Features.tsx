export default function Features() {
  const features = [
    {
      title: 'Multi-Platform',
      description: 'Connect Instagram, Twitter, Telegram, WhatsApp, and more. All your DMs in one place.',
      icon: '🌐',
    },
    {
      title: 'Speak 29 Languages',
      description: 'Your voice, but fluent in any language. Expand your global audience effortlessly.',
      icon: '🗣️',
    },
    {
      title: 'Instant Replies',
      description: 'Answer fans in seconds, not hours. 24/7 availability without the burnout.',
      icon: '⚡',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track engagement, response times, and revenue impact in real-time.',
      icon: '📊',
    },
    {
      title: 'Safe & Secure',
      description: 'Your voice data is encrypted and never shared. Full control over your AI clone.',
      icon: '🔒',
    },
    {
      title: 'Custom Tone',
      description: 'Adjust warmth, enthusiasm, and professionalism to match your brand.',
      icon: '🎛️',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features to help you engage with your audience at scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="glass rounded-2xl p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
