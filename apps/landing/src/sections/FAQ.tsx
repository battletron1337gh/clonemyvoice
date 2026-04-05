'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

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

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-400">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about CloneMyVoice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
