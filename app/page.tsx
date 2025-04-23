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
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#2563eb]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0ea5e9]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Lurely Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow py-5 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block mb-6 px-6 py-3 bg-[#2563eb]/5 rounded-full">
                <span className="text-[#2563eb] text-sm font-medium">Open Source Security Tools</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900">
                Secure Your Team
                <br />
                Against Phishing
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-600 mb-16 max-w-3xl mx-auto">
                Lurely simulates real-world phishing attacks to train and protect your employees from sophisticated threats.
              </p>
            </div>

            {/* Waitlist form */}
            <div className="max-w-xl mx-auto mb-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="flex-grow px-6 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 cursor-pointer bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    disabled={loading}
                  >
                    <span className="relative z-10">{loading ? 'Joining...' : 'Join Waitlist'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              ) : (
                <div className="text-[#2563eb] text-2xl animate-fade-in text-center">
                  Thanks for joining! We will be in touch soon.
                </div>
              )}
              {error && (
                <div className="mt-4 text-[#ef4444] text-sm animate-fade-in text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Features grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Real-world Simulations",
                  description: "Advanced phishing scenarios that mirror current attack patterns"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Detailed Analytics",
                  description: "Comprehensive reporting and insights into team performance"
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  ),
                  title: "Customizable Training",
                  description: "Tailored scenarios and content for your organization"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-2xl glass-card hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 mb-6 rounded-xl bg-[#2563eb]/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
