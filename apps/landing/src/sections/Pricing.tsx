'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    price: 49,
    description: 'Perfect for creators just getting started',
    features: [
      '1 voice clone',
      '500 voice notes/month',
      'Instagram DM integration',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 149,
    description: 'For serious creators ready to scale',
    features: [
      '3 voice clones',
      'Unlimited voice notes',
      'All platform integrations',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Multi-language support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Agency',
    price: 499,
    description: 'For agencies managing multiple creators',
    features: [
      '10+ voice clones',
      'Unlimited everything',
      'White-label option',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'Team collaboration',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <section id="waitlist" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-surface border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual <span className="text-green-400">(-20%)</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/20 to-surface border-2 border-primary'
                  : 'glass border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">€{isAnnual ? Math.round(plan.price * 0.8) : plan.price}</span>
                <span className="text-gray-400">/month</span>
                {isAnnual && (
                  <p className="text-sm text-green-400 mt-1">Billed annually (€{Math.round(plan.price * 0.8 * 12)}/year)</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary-dark text-white glow'
                    : 'bg-surface-light hover:bg-surface text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
