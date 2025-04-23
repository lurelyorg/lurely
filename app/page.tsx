'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Lurely Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow py-5 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-[#0066FF]/5 rounded-full">
                <span className="text-[#0066FF] text-sm font-medium">Open Source Security Tools</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900">
                Secure Your Team Against Phishing
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Lurely simulates real-world phishing attacks to train and protect your employees from sophisticated threats.
              </p>
            </div>

            {/* Waitlist form */}
            <div className="max-w-md mx-auto mb-16">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="flex-grow px-6 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-colors"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 cursor-pointer bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    disabled={loading}
                  >
                    <span className="relative z-10">{loading ? 'Joining...' : 'Join Waitlist'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#0052CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              ) : (
                <div className="text-[#0066FF] text-xl animate-fade-in">
                  Thanks for joining! We'll be in touch soon.
                </div>
              )}
              {error && (
                <div className="mt-4 text-[#FF4444] text-sm animate-fade-in">
                  {error}
                </div>
              )}
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#0066FF]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Real-world Simulations</h3>
                <p className="text-gray-600">Advanced phishing scenarios that mirror current attack patterns</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Detailed Analytics</h3>
                <p className="text-gray-600">Comprehensive reporting and insights into team performance</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[#0066FF]/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0066FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Customizable Training</h3>
                <p className="text-gray-600">Tailored scenarios and content for your organization</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
