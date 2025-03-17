import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, DollarSign, BarChart, Package, Users, ArrowRight, Globe, Rocket, Target, Zap } from 'lucide-react';

const SellerRegistration = () => {
  const [registrationType, setRegistrationType] = useState<'individual' | 'business' | null>(null);

  const benefits = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with shoppers from around the world seeking unique treasures'
    },
    {
      icon: Rocket,
      title: 'Swift Launch',
      description: 'Start selling in minutes with our streamlined setup process'
    },
    {
      icon: Target,
      title: 'Smart Tools',
      description: 'Access intelligent pricing and market insights to maximize success'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Receive secure payments directly to your account'
    }
  ];

  const buyerPerks = [
    {
      title: 'Treasure Hunt',
      description: 'Discover unique finds from verified sellers worldwide'
    },
    {
      title: 'Smart Shopping',
      description: 'Compare prices and read authentic reviews before buying'
    },
    {
      title: 'Secure Transactions',
      description: 'Shop with confidence using our protected payment system'
    }
  ];

  const sellerPerks = [
    {
      title: 'Market Intelligence',
      description: 'Use our smart pricing tools to optimize your listings'
    },
    {
      title: 'Growth Partner',
      description: 'Access personalized coaching and seller success resources'
    },
    {
      title: 'Simplified Shipping',
      description: 'Streamlined shipping with integrated label printing'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Tridefair Community</h1>
            <p className="text-xl mb-8">Where smart sellers meet savvy shoppers</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setRegistrationType('individual')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  registrationType === 'individual'
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-600 text-white'
                }`}
              >
                Individual Creator
              </button>
              <button
                onClick={() => setRegistrationType('business')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  registrationType === 'business'
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-600 text-white'
                }`}
              >
                Business Partner
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer & Seller Info */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Shop Smart on Tridefair</h2>
            <div className="space-y-6">
              {buyerPerks.map((perk, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">{perk.title}</h3>
                    <p className="text-gray-600">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Grow with Tridefair</h2>
            <div className="space-y-6">
              {sellerPerks.map((perk, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-1">{perk.title}</h3>
                    <p className="text-gray-600">{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setRegistrationType('individual')}
              className="mt-8 inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Selling
            </button>
          </div>
        </div>

        {/* Registration Form */}
        {registrationType && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                {registrationType === 'individual' ? 'Creator' : 'Business Partner'} Registration
              </h2>
              <form className="space-y-6">
                {registrationType === 'business' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax ID / VAT Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Business tax ID"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a strong password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your Account
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Guest Section */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Test Drive Selling</h2>
            <p className="text-gray-600">
              Try our platform with a quick start option - no registration needed
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Quick Start Selling</h3>
                <p className="text-gray-600">List items instantly</p>
              </div>
              <Store className="h-12 w-12 text-blue-600" />
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-gray-700">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                List up to 3 items instantly
              </li>
              <li className="flex items-center text-gray-700">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                Access basic seller tools
              </li>
              <li className="flex items-center text-gray-700">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                Secure payment processing
              </li>
            </ul>
            <Link
              to="/quick-start"
              className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center"
            >
              Quick Start Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Tridefair?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-lg">
                <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;