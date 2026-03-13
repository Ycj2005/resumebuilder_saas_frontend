"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Transition, Variants } from "framer-motion";
import {
  ArrowRight,
  MoveRight,
  Layers,
  Layout,
  Printer,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";
import TestimonialGrid from "./testimonialGrids";
import ExpansionGrid from "./testimonialGrids";

export default function MainDashboard() {
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  };

  const floatingTransition: Transition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Structural Frame */}
      <div className="fixed inset-0 border-[12px] border-white z-50 pointer-events-none" />

      <main className="relative max-w-[1400px] mx-auto px-10 pt-10 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Industrial Standardized 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-[100px] font-black leading-[0.85] tracking-tighter"
            >
              The Next <br />
              <span className="text-slate-300 italic">Standard</span> <br />
              of Career.
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <p className="max-w-md text-lg text-slate-500 font-light leading-relaxed">
                Build a job-winning resume for free. [cite: 7] Our ATS-optimized
                system ensures your narrative survives automated filters and
                resonates with human recruiters. [cite: 101]
              </p>

              <ul className="grid grid-cols-2 gap-4">
                <li className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <CheckCircle2 size={14} className="text-black" /> 100% Free
                  Forever [cite: 8]
                </li>
                <li className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <CheckCircle2 size={14} className="text-black" /> No
                  Watermarks [cite: 96]
                </li>
                <li className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <CheckCircle2 size={14} className="text-black" /> Unlimited
                  Downloads [cite: 98]
                </li>
                <li className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  <CheckCircle2 size={14} className="text-black" /> ATS-Friendly
                  [cite: 101]
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="pt-6"
            >
              <Link href="/login">
                <button className="group bg-black text-white px-12 py-6 flex items-center gap-6 hover:bg-zinc-800 transition-all">
                  <span className="font-bold uppercase tracking-widest text-xs">
                    Start Your First Resume
                  </span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Side Visual Component */}
          {/* Right Side Visual Component - Refined to match your Resume Code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative group hidden lg:block"
          >
            <div className="absolute -inset-10 bg-blue-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative w-[520px] h-[700px] mx-auto bg-white border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-700 group-hover:-translate-y-4">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />

              <div className="p-10 flex flex-col h-full justify-between overflow-hidden">
                <div>
                  {/* Fake Personal Header */}
                  <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                        Alex Rivera
                      </h2>
                      <p className="text-sm text-blue-600 font-medium mt-1 uppercase tracking-wider">
                        Senior Full Stack Engineer
                      </p>
                    </div>
                    <div className="text-right text-[9px] text-slate-400 space-y-0.5 font-bold uppercase tracking-tight">
                      <p>alex.rivera@devmail.com</p>
                      <p>+1 (555) 012-3456</p>
                      <p className="text-blue-600">portfolio.io/arivera</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1.6fr_1fr] gap-8">
                    {/* Left Column Representation */}
                    <div className="space-y-8">
                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-2 border-l-2 border-blue-600 pl-2">
                          Summary
                        </h3>
                        <p className="text-[10px] text-slate-500 leading-relaxed italic pr-4">
                          "Strategic developer with 6+ years experience building
                          scalable web applications. Expert in React and Node.js
                          ecosystems."
                        </p>
                      </section>

                      <section className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-2 border-l-2 border-blue-600 pl-2">
                          Experience
                        </h3>
                        <div className="space-y-4">
                          <div className="text-[9px]">
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>Lead Engineer</span>
                              <span className="text-slate-300">
                                2021 - PRES
                              </span>
                            </div>
                            <p className="text-blue-600 font-bold uppercase text-[8px] mb-1">
                              TechFlow Systems
                            </p>
                            <div className="h-1 w-full bg-slate-50 mb-1" />
                            <div className="h-1 w-2/3 bg-slate-50" />
                          </div>
                          <div className="text-[9px]">
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>Full Stack Dev</span>
                              <span className="text-slate-300">
                                2018 - 2021
                              </span>
                            </div>
                            <p className="text-blue-600 font-bold uppercase text-[8px] mb-1">
                              BrightPixel Agency
                            </p>
                            <div className="h-1 w-full bg-slate-50" />
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* Right Column Representation */}
                    <div className="border-l border-slate-50 pl-6 space-y-8">
                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-3 border-l-2 border-blue-600 pl-2">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "React",
                            "Next.js",
                            "TypeScript",
                            "Node.js",
                            "AWS",
                            "Docker",
                          ].map((s) => (
                            <span
                              key={s}
                              className="bg-slate-900 text-white text-[8px] px-2 py-1 rounded font-bold uppercase tracking-tighter"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-2 border-l-2 border-blue-600 pl-2">
                          Education
                        </h3>
                        <div className="text-[9px] space-y-1">
                          <p className="font-bold text-slate-900">
                            B.S. Computer Science
                          </p>
                          <p className="text-slate-400">State University</p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[8px] font-black text-slate-200 uppercase tracking-widest">
                    Standard v2.0
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Export Indicator */}
            <motion.div
              // animate={{ y: [0, -10, 0] }}
              // transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              animate={{ y: [0, -10, 0] }}
              transition={floatingTransition}
              className="absolute -bottom-6 -right-6 bg-black text-white p-6 shadow-2xl flex items-center gap-4 border border-white/10"
            >
              <Printer size={20} className="text-blue-400" />
              <div className="pr-4">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                  Export Status
                </p>
                <p className="text-[12px] font-light text-slate-400 leading-none">
                  PDF Standard Met [cite: 97]
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <ExpansionGrid />

      <FeatureSlider />

      <footer className="px-10 py-12 flex justify-between items-center max-w-[1400px] mx-auto border-t border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
          No Credit Card Required [cite: 94]
        </p>
        <p className="text-[10px] font-bold text-slate-900 tracking-[0.4em] uppercase italic">
          Standardized for Excellence
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Layout size={20} />,
    title: "Grid Perfection",
    desc: "Swiss-inspired layouts for maximum legibility.",
  },
  {
    icon: <Layers size={20} />,
    title: "Multi-Format",
    desc: "Silicon Valley and Tech-Minimalist templates.",
  },
  {
    icon: <Printer size={20} />,
    title: "Export Ready",
    desc: "Print-perfect A4 PDF generation in one click.",
  },
  {
    icon: <Zap size={20} />,
    title: "Live Preview",
    desc: "Real-time updates as you type your career data.",
  },
  {
    icon: <Shield size={20} />,
    title: "ATS Optimized",
    desc: "Built to pass through automated screening filters.",
  },
  {
    icon: <Globe size={20} />,
    title: "Global Standard",
    desc: "Standardized ISO formats recognized worldwide.",
  },
];

function FeatureSlider() {
  return (
    <div className="py-24 bg-[#FAFAFA] overflow-hidden border-y border-slate-100">
      <div className="max-w-[1400px] mx-auto px-10 mb-16 flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">
            Core Capabilities
          </h2>
          <p className="text-3xl font-bold tracking-tighter">
            Everything you need to win.
          </p>
        </div>
      </div>

      <div className="relative flex">
        <motion.div
          className="flex flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...features, ...features].map((item, idx) => (
            <div key={idx} className="w-[380px] flex-shrink-0 px-4">
              <FeatureCard {...item} index={idx % features.length} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <div className="group h-[320px] bg-white p-10 border border-slate-100 flex flex-col justify-between transition-all duration-500 hover:border-black hover:shadow-[24px_24px_0px_rgba(0,0,0,0.03)]">
      <div>
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-10 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-black">
          {title}
        </h3>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex justify-end pt-6 border-t border-slate-50">
        <span className="text-[10px] font-black text-slate-200 group-hover:text-black transition-colors">
          0{index + 1}
        </span>
      </div>
    </div>
  );
}
