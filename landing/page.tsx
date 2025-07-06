"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronDown, Star, Users, Zap, Shield, ArrowRight, Play, Menu, X, Check } from 'lucide-react';

const TawalaLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pricingPlans = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: 'KES 1,000',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Basic profile listing',
        'Limited visibility',
        'Standard support',
        'Basic analytics'
      ],
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'silver',
      name: 'Silver',
      price: 'KES 2,000',
      period: '/month',
      description: 'Enhanced visibility and tools',
      features: [
        'Enhanced visibility',
        'Customer insights',
        'Job alerts',
        'Priority support',
        'Advanced analytics'
      ],
      color: 'from-gray-400 to-gray-600',
      popular: true
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 'KES 3,000',
      period: '/month',
      description: 'Maximum features and visibility',
      features: [
        'Maximum visibility',
        'Premium tools',
        'Featured listings',
        'Customer management',
        'Dedicated support',
        'Full analytics suite'
      ],
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  const stats = [
    { label: 'Market Size', value: '$109M', description: 'Annual gig economy revenue' },
    { label: 'Growth Rate', value: '33%', description: 'Year-over-year growth' },
    { label: 'Target Share', value: '30%', description: 'Market penetration goal' },
    { label: 'Workers', value: '36,700+', description: 'Current gig workers' }
  ];

  const features = [
    {
      icon: Users,
      title: 'Unified Platform',
      description: 'Connect service providers with clients seamlessly through our centralized marketplace.'
    },
    {
      icon: Zap,
      title: 'Quick Matching',
      description: 'AI-powered job matching system connects you with the right opportunities instantly.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Integrated payment system ensures safe and timely transactions for all parties.'
    }
  ];

  // Navigate to payment page with selected plan
  const handlePlanSelection = (planId: string) => {
    router.push(`/payment?plan=${planId}`);
  };

  // Helper function to get dynamic transform styles
  const getTransformStyle = (multiplier: number) => ({
    transform: `translateY(${scrollY * multiplier}px)`
  });

  // Helper function to get navbar background opacity
  const getNavbarStyle = () => ({
    backgroundColor: scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(20px)'
  });

  // Helper function to get hero opacity
  const getHeroStyle = () => ({
    transform: `translateY(${scrollY * 0.2}px)`,
    opacity: 1 - scrollY / 800
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-gray-50 to-black/25 text-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-yellow-300/20 to-transparent rounded-full blur-3xl translate-y-[calc(var(--scrollY,0)*0.5px)]"
          style={{ '--scrollY': `${scrollY}` } as React.CSSProperties}
        />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-amber-300/20 to-transparent rounded-full blur-3xl translate-y-[calc(var(--scrollY,0)*-0.3px)]"
          style={{ '--scrollY': `${scrollY}` } as React.CSSProperties}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div
          className="backdrop-blur-md bg-white/90 border-b border-yellow-200"
          style={getNavbarStyle()}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-auto h-auto bg-gradient-to-r from-white to-gray-200 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-150">
                  <Image src="/ta.png" alt="Tawala Logo" width={104} height={104} className="h-auto w-auto object-contain" />
                </div>
                <span className="text-xl font-bold text-gray-900">Tawala App</span>
              </div>
             
              <div className="hidden md:flex space-x-8">
                {['Home', 'Features', 'Pricing', 'About'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-yellow-600 transition-colors duration-200 text-gray-700"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <button
                className="md:hidden text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/90 border-b border-yellow-200">
            <div className="px-4 py-4 space-y-4">
              {['Home', 'Features', 'Pricing', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block hover:text-yellow-600 transition-colors duration-200 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="transform transition-all duration-1000"
            style={getHeroStyle()}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Welcome to Tawala
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
              Revolutionizing Kenya&#39;s gig economy by connecting professionals with clients in need of short-term services
            </p>
           
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-white">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Download from Play Store</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="border-2 border-yellow-500 hover:border-yellow-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-yellow-50 text-gray-700">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="backdrop-blur-md bg-white/80 rounded-xl p-6 border border-yellow-200 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg animate-[fadeInUp_0.8s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-yellow-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold mb-1 text-gray-900">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in the gig economy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/80 rounded-2xl p-8 border border-yellow-200 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg"
                style={{
                  ...getTransformStyle(0.05),
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible subscription plans designed for every stage of your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative backdrop-blur-md bg-white/80 rounded-2xl p-8 border transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-lg ${
                  plan.popular
                    ? 'border-yellow-400 bg-white/90 shadow-2xl shadow-yellow-500/25'
                    : 'border-yellow-200 hover:bg-white/90'
                }`}
                style={{
                  ...getTransformStyle(0.03),
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-2 rounded-full text-sm font-semibold text-white">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.color} mx-auto mb-4 flex items-center justify-center`}>
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white'
                      : 'border-2 border-yellow-400 hover:border-yellow-500 hover:bg-yellow-50 text-gray-700'
                  }`}
                  onClick={() => handlePlanSelection(plan.id)}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-md bg-white/80 rounded-3xl p-12 border border-yellow-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  About Tawala
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Tawala is revolutionizing Kenya&#39;s gig economy by providing a unified platform that connects professionals with clients seeking short-term services, particularly in event management and beyond.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  With Kenya&#39;s gig economy valued at $109 million and growing at 33% annually, we&#39;re positioned to capture 30% of this market through our innovative subscription model and comprehensive service offerings.
                </p>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">$10.8B</div>
                    <div className="text-sm text-gray-600">Digital Economy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">5%</div>
                    <div className="text-sm text-gray-600">GDP Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">33%</div>
                    <div className="text-sm text-gray-600">Gig Growth</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="backdrop-blur-md bg-white/90 rounded-2xl p-8 border border-yellow-200 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To empower gig workers and businesses by providing a seamless platform that simplifies job access and service hiring, becoming the leading digital marketplace for gig economy services in Kenya and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image src="/ta.png" alt="Tawala Logo" width={104} height={104} className="h-auto w-auto object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900">Tawala</span>
            <p className="text-gray-600 mb-4">
              Revolutionizing the gig economy in Kenya
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Tawala. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TawalaLanding;