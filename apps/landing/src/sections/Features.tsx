'use client'

import { motion } from 'framer-motion'
import { Globe, MessageSquare, BarChart3, Shield, Zap, Languages } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Multi-Platform',
    description: 'Connect Instagram, Twitter, Telegram, WhatsApp, and more. All your DMs in one place.',
  },
  {
    icon: Languages,
    title: 'Speak 29 Languages',
    description: 'Your voice, but fluent in any language. Expand your global audience effortlessly.',
  },
  {
    icon: Zap,
    title: 'Instant Replies',
    description: 'Answer fans in seconds, not hours. 24/7 availability without the burnout.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track engagement, response times, and revenue impact in real-time.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your voice data is encrypted and never shared. Full control over your AI clone.',
  },
  {
    icon: Globe,
    title: 'Custom Tone',
    description: 'Adjust warmth, enthusiasm, and professionalism to match your brand.',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You <span className="gradient-text">Need</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features to help you engage with your audience at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass rounded-2xl p-6 hover:bg-surface-light transition-colors group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
