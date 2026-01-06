'use client';

import { ShieldCheck, TrendingUp, Zap, Users, Award, ChevronRight, Star, Sparkles, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LandingPage() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const pillars = [
    { icon: Zap, title: "UPI Behavior", weight: "35%", color: "from-indigo-500 to-blue-500", description: "Transaction patterns" },
    { icon: Sparkles, title: "Bills Utility", weight: "20%", color: "from-emerald-500 to-green-500", description: "Payment history" },
    { icon: Users, title: "Employment", weight: "15%", color: "from-blue-500 to-cyan-500", description: "Gig work proof" },
    { icon: TrendingUp, title: "Social", weight: "10%", color: "from-pink-500 to-rose-500", description: "Network signals" },
    { icon: Award, title: "Finance", weight: "10%", color: "from-amber-500 to-orange-500", description: "Savings ratio" },
    { icon: ShieldCheck, title: "Identity", weight: "10%", color: "from-purple-500 to-indigo-500", description: "KYC verified" },
  ];

  const stats = [
    { value: "50K+", label: "Gig Workers Scored", icon: Users },
    { value: "₹10Cr+", label: "Loans Disbursed", icon: TrendingUp },
    { value: "99%", label: "Fraud Free", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between backdrop-blur-md bg-white/50 dark:bg-slate-900/50 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
              GigCredit AI
            </span>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium -mt-1">India's First Gig Worker Credit Score</p>
          </div>
        </div>
        <Link href="/get-started">
          <button className="bg-gradient-to-r from-primary to-indigo-600 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
            Get Free Score
            <Sparkles className="w-4 h-4" />
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-gray-200/50 dark:border-gray-700/50"
          >
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
              Trusted by 50K+ Gig Workers
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100">
              Credit Scores for
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 animate-gradient">
              Gig Economy Heroes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto font-medium"
          >
            Rapido • Swiggy • Uber • Zomato • Freelancers
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            No salary slip? No problem. Get instant credit scores based on your gig work, UPI transactions, and hustle.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/get-started" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-gradient-to-r from-primary via-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group">
                Get Your Score FREE
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="w-full sm:w-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-gray-900 dark:text-white px-10 py-5 rounded-2xl text-lg font-bold border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-y border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6 Pillars Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-white dark:to-blue-100">
              6 Pillars of Scoring
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We analyze what banks miss
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredPillar(i)}
                onHoverEnd={() => setHoveredPillar(null)}
                className="group relative"
              >
                <div className={`
                  relative p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700
                  hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden
                  ${hoveredPillar === i ? 'scale-105' : ''}
                `}>
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <pillar.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {pillar.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      {pillar.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${pillar.color}`}>
                        {pillar.weight}
                      </span>
                      <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to unlock your credit potential?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join 50,000+ gig workers who got loans without salary slips
          </p>
          <Link href="/get-started">
            <button className="bg-white text-primary px-12 py-5 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto">
              Start Free Assessment
              <Sparkles className="w-6 h-6" />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2026 GigCredit AI • Privacy • Terms • Contact
          </p>
        </div>
      </footer>
    </div>
  );
}
