'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, Pause, Mic, Sparkles } from 'lucide-react'

const sampleTexts = [
  "Hey! Thanks for reaching out. I really appreciate your support!",
  "I'm currently working on something exciting. Stay tuned!",
  "Your message made my day. Thank you for being awesome!",
]

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedText, setSelectedText] = useState(0)

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
            Try It <span className="gradient-text">Yourself</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear how realistic AI voice cloning sounds. Select a message and click play.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 sm:p-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Demo Voice</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>AI Generated</span>
                </div>
              </div>
            </div>

            {/* Text selector */}
            <div className="space-y-3 mb-8">
              {sampleTexts.map((text, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedText(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedText === index
                      ? 'bg-primary/20 border border-primary/50'
                      : 'bg-surface-light border border-white/5 hover:border-white/10'
                  }`}
                >
                  <p className="text-white">{text}</p>
                </button>
              ))}
            </div>

            {/* Audio player */}
            <div className="bg-surface-light rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>

                <div className="flex-1">
                  {/* Waveform */}
                  <div className="flex items-center gap-1 h-12">
                    {[...Array(50)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-primary rounded-full"
                        animate={{
                          height: isPlaying
                            ? [4, 20 + Math.random() * 30, 4]
                            : 4,
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          delay: i * 0.01,
                        }}
                        style={{ height: 4 }}
                      />
                    ))}
                  </div>
                </div>

                <span className="text-gray-400 text-sm">0:03</span>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              This is a simulated demo. Real voice cloning requires your voice samples.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
