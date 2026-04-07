export default function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            You're drowning in DMs
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every day, creators lose money and fans because they can't keep up with messages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-gray-400">DMs per day</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">€5K+/mo</div>
            <p className="text-gray-400">Lost revenue</p>
          </div>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="text-4xl font-bold text-primary mb-2">73%</div>
            <p className="text-gray-400">Creator burnout</p>
          </div>
        </div>

        <div className="mt-16 glass rounded-2xl p-8 max-w-3xl mx-auto">
          <blockquote className="text-xl text-gray-300 italic text-center">
            "I used to spend 4 hours every day just answering DMs. Now I can focus on creating the content my fans actually want to see."
          </blockquote>
          <p className="text-center text-gray-400 mt-4">— Sarah K., Lifestyle Creator (250K followers)</p>
        </div>
      </div>
    </section>
  )
}
