"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Phone, CreditCard, Smartphone, AlertCircle, Loader2, CheckCircle, Star } from 'lucide-react';

const TawalaPayment = () => {
  type PricingPlan = {
    id: string;
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    color: string;
    popular?: boolean;
  };

  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(''); // 'success', 'failed', 'pending'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pricingPlans = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: 1000,
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
      price: 2000,
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
      price: 3000,
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

  // Select the plan based on URL search params (?plan=bronze|silver|gold)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const planId = params.get("plan");
      const plan = pricingPlans.find(p => p.id === planId) || pricingPlans[0];
      setSelectedPlan(plan);
    }
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
   
    // Format as Kenyan phone number
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
    return cleaned.substring(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 12;
  };

  const handlePayment = async () => {
    if (!selectedPlan || !phoneNumber || !validatePhoneNumber(phoneNumber)) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('pending');

    try {
      // Simulate M-Pesa payment process
      const response = await simulateMpesaPayment({
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        amount: selectedPlan.price,
        planId: selectedPlan.id
      });

      if (response.success) {
        setPaymentStatus('success');
        setShowConfirmation(true);
      } else {
        setPaymentStatus('failed');
      }
    } catch {
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateMpesaPayment = async (paymentData: { phoneNumber: string; amount: number; planId: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
   
    console.log('Processing payment for:', paymentData);
   
    // Simulate random success/failure for demo
    return {
      success: Math.random() > 0.2, // 80% success rate
      transactionId: 'TXN' + Date.now(),
      message: 'Payment processed successfully'
    };
  };

  const resetPayment = () => {
    setPaymentStatus('');
    setIsProcessing(false);
    setShowConfirmation(false);
  };

  const handleDashboardRedirect = () => {
    console.log('Redirecting to dashboard...');
    // Reset to show landing page simulation
    window.location.reload();
  };

  const handleBackToLanding = () => {
    window.location.href = '/'
  };

  if (showConfirmation && paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-gray-50 to-black/25 flex items-center justify-center p-4">
        <div className="backdrop-blur-md bg-white/90 rounded-3xl p-8 border border-yellow-200 shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your {selectedPlan?.name} subscription has been activated successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan:</span>
              <span className="font-semibold">{selectedPlan?.name}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">KES {selectedPlan?.price}</span>
            </div>
          </div>
          <button
            onClick={handleDashboardRedirect}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-gray-50 to-black/25 text-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-yellow-300/20 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-amber-300/20 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * -0.3}px)`,
            willChange: 'transform'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
            <button 
            onClick={handleBackToLanding}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors mb-6"
            >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Plans</span>
            </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Complete Your Subscription
          </h1>
          <p className="text-xl text-gray-600">
            Subscribe to {selectedPlan?.name} plan and start your journey with Tawala
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Plan Summary */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-md bg-white/90 rounded-2xl p-6 border border-yellow-200 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h3>
              
              {selectedPlan && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedPlan.color} flex items-center justify-center mb-3`}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedPlan.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                    </div>
                    {selectedPlan.popular && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">KES {selectedPlan.price}</span>
                    <span className="text-gray-500 text-sm">{selectedPlan.period}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">KES {selectedPlan?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">KES 0</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-yellow-600 text-lg">KES {selectedPlan?.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Secure Payment</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Your payment is protected by industry-standard encryption
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-md bg-white/90 rounded-2xl p-8 border border-yellow-200 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Payment Information</h3>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4 text-gray-900">Select Payment Method</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'mpesa' 
                        ? 'border-yellow-500 bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('mpesa')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">M-Pesa</h5>
                        <p className="text-sm text-gray-600">Pay with M-Pesa</p>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === 'card' 
                        ? 'border-yellow-500 bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Card Payment</h5>
                        <p className="text-sm text-gray-600">Visa, Mastercard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* M-Pesa Payment Form */}
              {paymentMethod === 'mpesa' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      M-Pesa Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="254 712 345 678"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        maxLength={15}
                      />
                    </div>
                    {phoneNumber && !validatePhoneNumber(phoneNumber) && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Please enter a valid phone number
                      </p>
                    )}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">How it works:</h5>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Click &quot;Pay with M-Pesa&quot; button</li>
                      <li>2. You&apos;ll receive an M-Pesa prompt on your phone</li>
                      <li>3. Enter your M-Pesa PIN to complete payment</li>
                      <li>4. Your subscription will be activated instantly</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Payment Status */}
              {paymentStatus === 'failed' && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Payment Failed</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    There was an issue processing your payment. Please try again.
                  </p>
                  <button
                    onClick={resetPayment}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Payment Button */}
              <div className="mt-8">
                <button
                  onClick={handlePayment}
                  disabled={isProcessing || !selectedPlan || (paymentMethod === 'mpesa' && (!phoneNumber || !validatePhoneNumber(phoneNumber)))}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isProcessing || !selectedPlan || (paymentMethod === 'mpesa' && (!phoneNumber || !validatePhoneNumber(phoneNumber)))
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>
                        {paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Pay with Card'}
                      </span>
                      <span className="font-bold">KES {selectedPlan?.price}</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Terms and Conditions */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  By clicking &quot;Pay&quot;, you agree to our{' '}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-yellow-600 hover:text-yellow-700 underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TawalaPayment;