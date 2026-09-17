"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Search,
  ShieldCheck,
  Command,
  CheckCircle2,
  Quote,
  LogIn,
} from "lucide-react";
import { Meteors } from "@/components/ui/meteors";
import { Show, UserButton } from "@clerk/nextjs";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { useRef } from "react";

export default function LandingPage() {
  const beamContainerRef = useRef<HTMLDivElement>(null);

  const pdfRef = useRef<HTMLDivElement>(null);
  const extractRef = useRef<HTMLDivElement>(null);
  const retrieveRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-[#0B0C0E] text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Subtle Grid */}
      <Meteors />

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-5 border-b border-zinc-200 dark:border-zinc-800/40 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center transition-colors">
            <Command className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </div>
          <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white font-sans transition-colors">
            DocBridge
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <AnimatedThemeToggler />

          <Show when={"signed-in"}>
            <UserButton />
          </Show>
          <Show when={"signed-out"}>
            {" "}
            <Link
              href="/sign-in"
              aria-label="Sign in"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <LogIn className="w-5 h-5" aria-hidden="true" />
            </Link>
          </Show>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 sm:px-6 pt-16 pb-20 max-w-5xl mx-auto w-full text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tight max-w-4xl text-zinc-900 dark:text-zinc-100 mb-6 leading-[1.12] transition-colors">
          Intelligent document analysis, <br />
          <span className="text-zinc-500 dark:text-zinc-400 font-serif italic transition-colors">
            built for accuracy.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed font-normal transition-colors">
          Upload and index dense technical specs, research papers, and complex
          contracts for citation-backed answers.
        </p>

        <div className="mb-20">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-sm font-semibold transition-colors"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product UI Preview */}
        <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/80 dark:bg-zinc-950/80 shadow-2xl overflow-hidden mb-20 text-left transition-colors">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors" />
              <span className="ml-2 text-xs font-mono text-zinc-500 transition-colors">
                regulatory-compliance-q3.pdf
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Indexed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 transition-colors">
            <div className="md:col-span-5 p-6 bg-zinc-50/50 dark:bg-zinc-900/20 text-xs text-zinc-500 dark:text-zinc-400 font-mono space-y-4 transition-colors">
              <div className="text-zinc-700 dark:text-zinc-200 font-semibold uppercase tracking-wider text-[11px] transition-colors">
                Extracted Source Block (p. 42)
              </div>
              <div className="p-3 bg-white dark:bg-zinc-900/60 rounded border border-zinc-200 dark:border-zinc-800/80 leading-relaxed font-sans text-zinc-700 dark:text-zinc-300 transition-colors">
                <Quote className="w-4 h-4 text-zinc-400 dark:text-zinc-600 mb-1 transition-colors" />
                &quot;...under subsection 12(B), audits shall be submitted no later
                than 45 calendar days post-fiscal close...&quot;
              </div>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-[11px] transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 transition-colors" />
                <span>Source match verified</span>
              </div>
            </div>

            <div className="md:col-span-7 p-6 space-y-4 bg-white/40 dark:bg-zinc-950/40 transition-colors">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-zinc-500 uppercase transition-colors">
                  Query
                </span>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200 transition-colors">
                  What is the final statutory deadline for filing compliance
                  audits?
                </p>
              </div>
              <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-800/60 transition-colors">
                <span className="text-[11px] font-mono text-zinc-500 uppercase transition-colors">
                  Synthesized Insight
                </span>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors">
                  Per Section 12(B), submissions must be completed within{" "}
                  <strong className="text-zinc-900 dark:text-white transition-colors">
                    45 calendar days
                  </strong>{" "}
                  following the close of the fiscal year.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Pipeline */}
        <div
          ref={beamContainerRef}
          className="relative mb-20 w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-200 bg-white/80 px-8 py-12 dark:border-zinc-800 dark:bg-zinc-950/80"
        >
          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Document Intelligence Pipeline
            </p>

            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              From PDF to verified answer
            </h2>
          </div>

          {/* Pipeline */}
          <div className="relative mx-auto flex flex-col md:flex-row w-full md:min-w-[600px] items-center justify-between gap-8 md:gap-0">
            {/* PDF */}
            <div
              ref={pdfRef}
              className="relative z-10 flex h-16 w-20 sm:h-20 sm:w-28 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <FileText className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 dark:text-zinc-400" />

              <span className="text-[10px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100">
                PDF
              </span>
            </div>

            {/* Extract */}
            <div
              ref={extractRef}
              className="relative z-10 flex h-16 w-20 sm:h-20 sm:w-28 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Search className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 dark:text-zinc-400" />

              <span className="text-[10px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100">
                Extract
              </span>
            </div>

            {/* Retrieve */}
            <div
              ref={retrieveRef}
              className="relative z-10 flex h-16 w-20 sm:h-20 sm:w-28 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <div className="mb-1 sm:mb-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                ◈
              </div>

              <span className="text-[10px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100">
                Retrieve
              </span>
            </div>

            {/* GenAI */}
            <div
              ref={aiRef}
              className="relative z-10 flex h-16 w-20 sm:h-20 sm:w-28 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Command className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 dark:text-zinc-400" />

              <span className="text-[10px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100">
                GenAI
              </span>
            </div>

            {/* Answer */}
            <div
              ref={answerRef}
              className="relative z-10 flex h-16 w-20 sm:h-20 sm:w-28 shrink-0 flex-col items-center justify-center rounded-xl border border-emerald-200 bg-white shadow-sm dark:border-emerald-900/50 dark:bg-zinc-900"
            >
              <CheckCircle2 className="mb-1 sm:mb-2 h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />

              <span className="text-[10px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100">
                Answer
              </span>
            </div>
          </div>

          {/* Beam 1 */}
          <AnimatedBeam
            containerRef={beamContainerRef}
            fromRef={pdfRef}
            toRef={extractRef}
            curvature={0}
            pathWidth={1.25}
            pathOpacity={0.12}
            gradientStartColor="#94a3b8"
            gradientStopColor="#64748b"
            duration={8}
            delay={0}
          />

          <AnimatedBeam
            containerRef={beamContainerRef}
            fromRef={extractRef}
            toRef={retrieveRef}
            curvature={0}
            pathWidth={1.25}
            pathOpacity={0.12}
            gradientStartColor="#94a3b8"
            gradientStopColor="#64748b"
            duration={8}
            delay={0}
          />

          <AnimatedBeam
            containerRef={beamContainerRef}
            fromRef={retrieveRef}
            toRef={aiRef}
            curvature={0}
            pathWidth={1.25}
            pathOpacity={0.12}
            gradientStartColor="#64748b"
            gradientStopColor="#3b82f6"
            duration={8}
            delay={0}
          />

          <AnimatedBeam
            containerRef={beamContainerRef}
            fromRef={aiRef}
            toRef={answerRef}
            curvature={0}
            pathWidth={1.25}
            pathOpacity={0.15}
            gradientStartColor="#3b82f6"
            gradientStopColor="#10b981"
            duration={8}
            delay={0}
          />
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 transition-colors">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300 transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2 transition-colors">
              PDF Parsing
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed transition-colors">
              Handles tabular records, nested headers, and multi-column document
              structures.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 transition-colors">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2 transition-colors">
              Source Citations
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed transition-colors">
              Answers are mapped directly to source excerpts for fast
              validation.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 transition-colors">
            <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center mb-4 text-zinc-600 dark:text-zinc-300 transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2 transition-colors">
              Private Indexing
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed transition-colors">
              Documents are processed directly for your session without
              third-party model training.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/60 py-6 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center text-xs text-zinc-500 font-mono transition-colors">
        DocBridge
      </footer>
    </div>
  );
}
