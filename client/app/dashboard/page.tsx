"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Command, Shield, ArrowLeft, Database, Layers, Menu, X } from "lucide-react";
import { FileUploadComponent } from "../components/fileUpload";
import ChatComponent from "../components/chat";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="relative h-[100dvh] w-full flex flex-col md:flex-row bg-zinc-50 dark:bg-[#0B0C0E] text-zinc-900 dark:text-zinc-100 overflow-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <Meteors number={25} />
      </div>

      {/* Mobile Top Header */}
      <header className="md:hidden relative z-40 flex items-center justify-between px-4 h-14 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
            <Command className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight font-mono uppercase">
            DocBridge
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          <UserButton />
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 -mr-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Left Workspace Panel (Sidebar) */}
      <aside 
        className={`fixed md:relative z-50 w-[85vw] max-w-sm md:w-80 lg:w-96 shrink-0 h-[100dvh] md:h-full border-r border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } shadow-2xl md:shadow-none`}
      >
        {/* Top Header & Navigation */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-5 border-b border-zinc-200 dark:border-zinc-800/60 transition-colors">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>

            <div className="flex items-center gap-3">
              {/* Hide on mobile since they are in the mobile top header */}
              <div className="hidden md:flex items-center gap-3">
                <AnimatedThemeToggler />
                <UserButton />
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1.5 -mr-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="hidden md:flex w-6 h-6 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors">
                <Command className="w-3.5 h-3.5" />
              </div>
              <h1 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white font-mono uppercase transition-colors">
                Document Ingestion
              </h1>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans transition-colors">
              Provide a PDF document to parse, embed, and map into isolated
              vector chunks for deterministic retrieval.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="pt-2">
            <FileUploadComponent />
          </div>

          {/* Pipeline Specifications */}
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800/70 bg-zinc-50 dark:bg-zinc-900/30 p-4 space-y-3 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 transition-colors">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> Chunk Size
              </span>
              <span className="text-zinc-700 dark:text-zinc-200">512 tokens</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 transition-colors">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> Vector Index
              </span>
              <span className="text-zinc-700 dark:text-zinc-200">Cosine CosSim</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 transition-colors">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" /> Privacy Tier
              </span>
              <span className="text-emerald-500 dark:text-emerald-400">Air-Gapped</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/60 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center justify-between transition-colors">
          <span>Session #0x8F9A</span>
          <span>Zero-Retention</span>
        </div>
      </aside>

      {/* Main Chat Workspace */}
      <main className="relative z-10 flex-1 h-[calc(100dvh-56px)] md:h-full min-w-0 bg-transparent overflow-hidden flex flex-col">
        <ChatComponent />
      </main>
    </div>
  );
}
