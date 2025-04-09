import { useTranslations } from 'next-intl'

const features = [
  {
    title: 'Basic',
    price: '0',
    period: 'Forever',
    features: [
      'Basic search functionality',
      'Access to public tools',
      'Basic analytics',
      'Community support'
    ],
    buttonText: 'Current Plan',
    buttonVariant: 'outline'
  },
  {
    title: 'Pro',
    price: '9.99',
    period: 'Monthly',
    features: [
      'Advanced search filters',
      'Early access to new tools',
      'Detailed analytics',
      'Priority support',
      'Custom collections',
      'API access',
      'No advertisements'
    ],
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'solid',
    highlighted: true
  },
  {
    title: 'Enterprise',
    price: '99',
    period: 'Monthly',
    features: [
      'All Pro features',
      'Custom integration',
      'Dedicated support',
      'Team collaboration',
      'Custom branding',
      'Advanced API access',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline'
  }
]

export default function ProPage() {
  const t = useTranslations('pro')
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((tier) => (
            <div
              key={tier.title}
              className={`relative rounded-2xl ${
                tier.highlighted
                  ? 'bg-gray-900 text-white ring-2 ring-gray-900'
                  : 'bg-white text-gray-900 ring-1 ring-gray-200'
              } p-8 shadow-lg flex flex-col`}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">{t(`plans.${tier.title.toLowerCase()}.title`)}</h3>
                <div className="mt-4 mb-8">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-lg ml-2">/{t(`plans.${tier.title.toLowerCase()}.period`)}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 ${
                          tier.highlighted ? 'text-green-400' : 'text-green-500'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{t(`plans.${tier.title.toLowerCase()}.features.${feature}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-3 px-6 rounded-lg text-base font-medium transition-colors ${
                  tier.buttonVariant === 'solid'
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : tier.highlighted
                      ? 'bg-gray-800 text-white hover:bg-gray-700 ring-1 ring-white/20'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {t(`plans.${tier.title.toLowerCase()}.button`)}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">{t('faq.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{t('faq.cancel.question')}</h3>
              <p className="text-gray-600">{t('faq.cancel.answer')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{t('faq.payment.question')}</h3>
              <p className="text-gray-600">{t('faq.payment.answer')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{t('faq.refund.question')}</h3>
              <p className="text-gray-600">{t('faq.refund.answer')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{t('faq.enterprise.question')}</h3>
              <p className="text-gray-600">{t('faq.enterprise.answer')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
