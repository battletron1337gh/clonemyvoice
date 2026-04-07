export default function FAQ() {
  const faqs = [
    {
      question: 'How accurate is the voice cloning?',
      answer: 'Our AI creates a voice clone that\'s virtually indistinguishable from your real voice. With just 10 minutes of clear audio, we capture your tone, cadence, and speaking style. Most people can\'t tell the difference in blind tests.',
    },
    {
      question: 'Is my voice data safe?',
      answer: 'Absolutely. Your voice data is encrypted at rest and in transit. We never share or sell your data. You can delete your voice clone at any time, and we\'ll permanently remove all associated data from our servers.',
    },
    {
      question: 'Can I use this for my OnlyFans/Twitter/Instagram?',
      answer: 'Yes! We support all major platforms including OnlyFans, Twitter/X, Instagram, Telegram, and WhatsApp. We\'re constantly adding more integrations based on user requests.',
    },
    {
      question: 'What languages are supported?',
      answer: 'Your voice clone can speak 29 languages including English, Dutch, Spanish, French, German, Italian, Portuguese, and many more. The AI maintains your voice characteristics across all languages.',
    },
    {
      question: 'How long does it take to create a voice clone?',
      answer: 'Initial voice cloning takes about 5-10 minutes. Once created, generating voice messages is nearly instant (1-2 seconds). You can start using your AI voice right away.',
    },
    {
      question: 'Can I customize how my AI voice responds?',
      answer: 'Yes! You can set custom response templates, adjust tone (warm vs professional), and even create different "personalities" for different platforms or fan tiers.',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about CloneMyVoice.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
