export default function Solution() {
  const steps = [
    {
      number: '1',
      title: 'Upload Your Voice',
      description: 'Record or upload 10 minutes of your voice. Just talk naturally — we handle the rest.',
    },
    {
      number: '2',
      title: 'We Clone It',
      description: 'Our AI creates a perfect replica of your voice in minutes. It sounds exactly like you.',
    },
    {
      number: '3',
      title: 'Reply Automatically',
      description: 'Connect your platforms and let your AI voice handle DMs while you sleep.',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to clone your voice and automate your fan engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
