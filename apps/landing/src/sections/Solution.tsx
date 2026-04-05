'use client'

import { motion } from 'framer-motion'
import { Upload, Cpu, Send } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Voice',
    description: 'Record or upload 10 minutes of your voice. Just talk naturally — we handle the rest.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cpu,
    title: 'We Clone It',
    description: 'Our AI creates a perfect replica of your voice in minutes. It sounds exactly like you.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Send,
    title: 'Reply Automatically',
    description: 'Connect your platforms and let your AI voice handle DMs while you sleep.',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function Solution() {
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
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to clone your voice and automate your fan engagement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-surface-light border border-white/10 flex items-center justify-center text-sm font-bold text-gray-400">
                {index + 1}
              </div>

              <div className="glass rounded-2xl p-8 h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-6`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
