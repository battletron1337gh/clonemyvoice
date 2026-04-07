export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '€39',
      period: '/month',
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
      price: '€119',
      period: '/month',
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
      price: '€399',
      period: '/month',
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

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass rounded-2xl p-8 ${plan.popular ? 'border-2 border-primary relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-green-500 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary-dark text-white'
                    : 'bg-surface hover:bg-surface-light text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
