'use client'

import { motion } from 'framer-motion'
import { MessageCircle, TrendingUp, AlertCircle } from 'lucide-react'

const stats = [
  { label: 'DMs per day', value: '500+', icon: MessageCircle },
  { label: 'Lost revenue', value: '€5K+/mo', icon: TrendingUp },
  { label: 'Creator burnout', value: '73%', icon: AlertCircle },
]

export default function Problem() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            You're drowning in <span className="text-red-400">DMs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every day, creators lose money and fans because they can't keep up with messages.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
                <stat.icon className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 glass rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <blockquote className="text-xl text-gray-300 text-center italic">
            "I used to spend 4 hours every day just answering DMs. Now I can focus on creating 
            the content my fans actually want to see."
          </blockquote>
          <p className="text-center text-gray-500 mt-4">— Sarah K., Lifestyle Creator (250K followers)</p>
        </motion.div>
      </div>
    </section>
  )
}
