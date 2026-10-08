import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  ShieldCheck,
  FileCode,
  FileText,
  ChevronRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Sparkles,
  Layers,
  BookOpen,
  Award,
  Check,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ModuleData {
  id: number;
  day: string;
  title: string;
  duration: string;
  durationSec: number;
  description: string;
  keyTakeaway: string;
  pmpGate: string;
  blueprintHtml: string;
  blueprintPdf: string;
  deliverableName: string;
  deliverableType: string;
  youtubeId?: string;
}

const modules: ModuleData[] = [
  {
    id: 1,
    day: "Day 1",
    title: "Day 1 Kickoff & The 45-Min Frictionless Asset Dump",
    duration: "3:45",
    durationSec: 225,
    description:
      "How we onboard you in 45 minutes: drop your raw Google Docs, Loom links, and messy Notion SOPs into our secure vault. Zero meetings, zero homework required from your engineering or product teams.",
    keyTakeaway:
      "PMP® Charter alignment, bilateral enterprise NDA execution, and zero-trust cloud repository setup.",
    pmpGate: "Gate 1: Project Charter & Mutual NDA Execution Packet",
    blueprintHtml: "/downloads/day-1-asset-checklist.html",
    blueprintPdf: "/downloads/day-1-asset-checklist.pdf",
    deliverableName: "Day 1 Asset Checklist",
    deliverableType: "Interactive Audit & PDF Checklist",
    youtubeId: "PCy-L_psXYs",
  },
  {
    id: 2,
    day: "Day 3",
    title: "Day 3 Architecture — Friction Audit & Curriculum Map",
    duration: "4:12",
    durationSec: 252,
    description:
      "We dissect your product analytics to isolate your top 3 customer drop-off choke points. We produce a granular 5-7 module pedagogical curriculum map engineered for client mastery in under 20 minutes.",
    keyTakeaway:
      "Work Breakdown Structure (WBS) sign-off and pedagogical objective mapping according to Bloom's Revised Taxonomy.",
    pmpGate: "Gate 2: WBS & Pedagogy Matrix Formal Approval",
    blueprintHtml: "/downloads/sample-curriculum-blueprint.html",
    blueprintPdf: "/downloads/sample-curriculum-blueprint.pdf",
    deliverableName: "Sample Curriculum Blueprint",
    deliverableType: "Instructional Blueprint & Scope Matrix",
    youtubeId: "bhnz9SgvAzk",
  },
  {
    id: 3,
    day: "Day 7",
    title: "Day 7 Staging — First 4K Video & Voiceover Prototype",
    duration: "5:20",
    durationSec: 320,
    description:
      "Review your benchmark lesson produced at 4K 60fps with broadcast-grade audio, dynamic zoom choreography, smooth kinetic callouts, and modular lesson resources.",
    keyTakeaway:
      "Benchmark video sign-off lock. Establishes brand pacing, tone-of-voice, and visual language before entering mass production.",
    pmpGate: "Gate 3: Benchmark Lesson Style & Audio Sign-off Gate",
    blueprintHtml: "/downloads/studio-style-guide.html",
    blueprintPdf: "/downloads/studio-style-guide.pdf",
    deliverableName: "Studio Style Guide",
    deliverableType: "Audiovisual Standards & Grading Spec",
    youtubeId: "v0ni0dYulI0",
  },
  {
    id: 4,
    day: "Day 11",
    title: "Day 11 Portal Setup — LMS Integration & Configuration",
    duration: "3:50",
    durationSec: 230,
    description:
      "Turnkey student portal deployment in your preferred LMS (Kajabi, Skool, Teachable, Notion, or custom web platform) styled with pixel-perfect brand alignment.",
    keyTakeaway:
      "Zero IT headache: complete portal administration, role-based access control, SSO integration, and learner completion tracking.",
    pmpGate: "Gate 4: LMS Staging Sandbox & User Provisioning Verification",
    blueprintHtml: "/downloads/portal-setup-specs.html",
    blueprintPdf: "/downloads/portal-setup-specs.pdf",
    deliverableName: "Portal Setup Specs",
    deliverableType: "System Architecture & Integration Spec",
    youtubeId: "tYA8ELvMHgE",
  },
  {
    id: 5,
    day: "Day 14",
    title: "Day 14 Go-Live — Automated Welcome Sequences & Handover",
    duration: "4:05",
    durationSec: 245,
    description:
      "Complete 100% intellectual property transfer, raw 4K source video projects, plug-and-play welcome email sequences, learner certifications, and Care Plan onboarding.",
    keyTakeaway:
      "Formal Project Closeout: Full IP assignment warranty, handover verification checklist, and client graduation transition.",
    pmpGate: "Gate 5: Project Closeout, IP Assignment & Handover Sign-off",
    blueprintHtml: "/downloads/go-live-launch-kit.html",
    blueprintPdf: "/downloads/go-live-launch-kit.pdf",
    deliverableName: "Go-Live Launch Kit",
    deliverableType: "Production Handover & Operations Runbook",
    youtubeId: "W19dCMIopF8",
  },
];

const ClientOnboarding: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleData>(modules[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [completedModules, setCompletedModules] = useState<number[]>([1]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const sendIframeCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (nextMute) {
      sendIframeCommand("mute");
    } else {
      sendIframeCommand("unMute");
      sendIframeCommand("setVolume", [volume || 80]);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
      sendIframeCommand("mute");
    } else {
      setIsMuted(false);
      sendIframeCommand("unMute");
      sendIframeCommand("setVolume", [newVol]);
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Video playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSec((prev) => {
          if (prev >= activeModule.durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeModule.durationSec]);

  // Switch module handler
  const handleSelectModule = (mod: ModuleData) => {
    setActiveModule(mod);
    setElapsedSec(0);
    if (!mod.youtubeId) {
      setIsPlaying(false);
    }
  };

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Helmet>
        <title>Client Onboarding Academy | Interactive Prototype — Mercer &amp; Mills</title>
        <meta
          name="description"
          content="Experience Mercer & Mills' 14-day client onboarding architecture under PMP® sprint governance. Explore 5 high-definition modules, live blueprints, and 4K production standards."
        />
        <link rel="canonical" href="https://mercerandmills.com/client-onboarding" />
      </Helmet>

      {/* TOP HEADER: Clean LMS Portal Navbar */}
      <header className="h-18 px-4 sm:px-6 lg:px-8 border-b border-slate-800/90 bg-[#0A0E1A]/95 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40 shrink-0">
        {/* Left: Logo & Academy Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors group"
            title="Return to Main Mercer & Mills Site"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-slate-700 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <img src={logo} alt="Mercer & Mills" className="h-7 w-auto hidden md:block" />
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-sm tracking-tight text-white block">
                Mercer <span className="text-cyan-400">&amp;</span> Mills
              </span>
            </div>
          </Link>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Client Onboarding Academy</span>
            </span>
            <span className="hidden xl:inline-flex text-[11px] font-mono text-slate-500">
              v2.4 Production Sandbox
            </span>
          </div>
        </div>

        {/* Center: PMP® Governance SLA Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">PMP® Governance SLA:</span>
          <span className="text-cyan-400 font-mono font-medium">Day 1 to Day 14 Sprint</span>
        </div>

        {/* Right: Progress Bar */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-cyan-400">{progressPercent}% Complete</span>
              <span className="text-slate-400 hidden sm:inline">
                ({completedModules.length} of 5 Finished)
              </span>
            </div>
            <div className="w-32 sm:w-44 h-2 bg-slate-900 rounded-full overflow-hidden mt-1.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN PORTAL INTERFACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT SIDEBAR: 5-Module Curriculum */}
        <aside className="w-full lg:w-96 xl:w-[420px] bg-[#0A0E1A]/80 border-r border-slate-800/90 flex flex-col shrink-0">
          {/* Sidebar Title */}
          <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-[#080C14]/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Curriculum Structure
              </h2>
            </div>
            <span className="text-xs text-cyan-400 font-mono font-medium px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
              21 Min Total
            </span>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
            {modules.map((mod) => {
              const isActive = activeModule.id === mod.id;
              const isDone = completedModules.includes(mod.id);

              return (
                <div
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className={`group relative rounded-xl border p-3.5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-slate-900/90 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30"
                      : "bg-[#0D1322]/60 border-slate-800/70 hover:border-slate-700 hover:bg-[#0D1322]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Module Number / Check Badge */}
                    <button
                      type="button"
                      onClick={(e) => toggleComplete(mod.id, e)}
                      title={isDone ? "Mark as incomplete" : "Mark as completed"}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-transform hover:scale-105 ${
                        isDone
                          ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                          : isActive
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : mod.id}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.2 rounded bg-slate-800/80 text-cyan-300">
                          {mod.day}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {mod.duration}
                        </span>
                        {mod.youtubeId && (
                          <span className="text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.2 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
                            Video Ready
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-xs sm:text-sm font-semibold leading-snug truncate ${
                          isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {mod.title}
                      </h3>

                      {/* Working HTML Blueprint Link */}
                      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <a
                          href={mod.blueprintHtml}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                          title={`Open ${mod.deliverableName} (HTML Blueprint)`}
                        >
                          <FileCode className="w-3.5 h-3.5" />
                          <span>View Blueprint (HTML)</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>

                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive ? "text-cyan-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer with Deliverables Index */}
          <div className="p-4 border-t border-slate-800/90 bg-[#080C14]/90 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                All 5 Action Blueprints:
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                100% Unlocked
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every deliverable is downloadable as both an interactive offline HTML tool and a formal print-ready PDF specification.
            </p>
          </div>
        </aside>

        {/* MAIN AREA: 4K Video Player & Pedagogical Details */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4">
          {/* Status Bar Above Player: Positioned Outside for Clean, Unobstructed Playback */}
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-slate-900 text-cyan-400 border border-slate-800">
                {activeModule.day} Sprint Staging
              </span>
              {activeModule.youtubeId && (
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Video Available
                </span>
              )}
            </div>

            {/* The High-Contrast Glowing Badge — Outside the Video Screen */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-[11px] font-black tracking-widest text-white uppercase">
                4K STUDIO MASTER <span className="text-cyan-400">• CRISP AUDIO</span>
              </span>
            </div>
          </div>

          {/* 16:9 4K Video Player Container */}
          <div
            ref={playerContainerRef}
            className="relative rounded-2xl border border-slate-800 bg-[#050811] aspect-video w-full max-w-5xl mx-auto overflow-hidden shadow-2xl shadow-cyan-950/20 group flex flex-col justify-between"
          >
            {isPlaying && activeModule.youtubeId ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${activeModule.youtubeId}?autoplay=1&controls=1&enablejsapi=1&playsinline=1&rel=0`}
                title={activeModule.title}
                className="w-full h-full border-0 absolute inset-0 z-10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                {/* Visual Screen Emulation Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/70 z-0 pointer-events-none" />

                {/* Glowing Grid Substrate */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

                {/* Top Left: Active Module Identifier */}
                <div className="relative z-10 m-4 sm:m-6 self-start flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-slate-900/90 text-cyan-400 border border-slate-800 backdrop-blur-md">
                    {activeModule.day} Sprint Staging
                  </span>
                  {activeModule.youtubeId && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                      Live Video Available
                    </span>
                  )}
                </div>

                {/* Center: Play Action Area */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all group/btn mb-4"
                    aria-label="Play Video Preview"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 ml-1 group-hover/btn:scale-110 transition-transform" />
                  </button>
                  <h3 className="text-base sm:text-xl font-bold font-heading text-white max-w-lg mb-1 drop-shadow-md">
                    {activeModule.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-md hidden sm:block">
                    {activeModule.youtubeId
                      ? "Click to start the full 4K studio recording with crisp audio mastering"
                      : "Ultra-crisp screen capture, pedagogical zooms, voiceover mastering & live action checklists"}
                  </p>
                </div>

                {/* Bottom Scrubber & Video Controls */}
                <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-semibold">{formatTime(elapsedSec)}</span>
                      <span>/</span>
                      <span>{activeModule.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800/40">
                        60 FPS RAW PRORES
                      </span>
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        title={isMuted ? "Click to Unmute" : "Click to Mute"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-red-400" />
                        ) : volume < 50 ? (
                          <Volume1 className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-slate-300" />
                        )}
                        <span className="text-[10px] font-mono">{isMuted || volume === 0 ? "Muted" : `${volume}%`}</span>
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        aria-label="Volume level"
                      />
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Toggle Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Scrubber */}
                  <div
                    className="w-full h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      setElapsedSec(Math.round(pos * activeModule.durationSec));
                    }}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                      style={{ width: `${(elapsedSec / activeModule.durationSec) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Active Module Details & Pedagogical Design Gate */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left 7 cols: Module Overview & Core Objective */}
            <div className="md:col-span-7 bg-[#0A0E1A]/90 border border-slate-800/90 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  {activeModule.day} Focus
                </span>
                <h3 className="text-lg font-bold font-heading text-white">
                  Executive Briefing &amp; Objectives
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModule.description}
              </p>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Certified PMP® Quality Gate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>100% IP Transfer on Completion</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Pedagogical Gate & Working Download Action */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#0F172A] to-[#0A0E1A] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-lg shadow-cyan-950/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pedagogical Design Gate</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                  <span className="font-semibold text-white block">
                    {activeModule.pmpGate}
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {activeModule.keyTakeaway}
                  </p>
                </div>
              </div>

              {/* Working Blueprint Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={activeModule.blueprintPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download {activeModule.deliverableName} (PDF)</span>
                </a>

                <a
                  href={activeModule.blueprintHtml}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 font-semibold text-xs transition-colors"
                >
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span>Open Interactive HTML Blueprint</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientOnboarding;
