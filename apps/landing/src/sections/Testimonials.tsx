'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Lifestyle Creator',
    followers: '250K followers',
    content: 'I went from spending 4 hours a day on DMs to 30 minutes. My engagement actually went up because fans get instant replies now.',
    rating: 5,
  },
  {
    name: 'Mike T.',
    role: 'Fitness Coach',
    followers: '180K followers',
    content: 'The voice cloning is scary good. My clients can\'t tell the difference. I\'ve 3x\'d my coaching revenue since using CloneMyVoice.',
    rating: 5,
  },
  {
    name: 'Emma R.',
    role: 'OnlyFans Creator',
    followers: '500K followers',
    content: 'Game changer. I can give every fan personal attention without burning out. My tips have increased by 40%.',
    rating: 5,
  },
]

export default function Testimonials() {
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
            Loved by <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what other creators are saying about CloneMyVoice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 mb-6">"{testimonial.content}"</p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role} • {testimonial.followers}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
