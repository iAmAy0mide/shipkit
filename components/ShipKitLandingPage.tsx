"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiGithub } from "react-icons/fi"; 
import {
  Check, Zap, ShieldCheck, CreditCard, Globe, Mail,
  Database, Lock, ChevronDown, ExternalLink, Star, Copy, CheckCheck,
  ArrowRight, Package, Clock,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import AnimatedCounter from "@/components/AnimatedCounter";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Feature {
  id: string;
  label: string;
  hours: number;
  category: "auth" | "payments" | "infra" | "email" | "ui";
  icon: React.ElementType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES: Feature[] = [
  { id: "auth",        label: "Auth (email, OAuth, magic link)", hours: 12, category: "auth",     icon: Lock       },
  { id: "db",          label: "Database schema & migrations",    hours: 8,  category: "infra",    icon: Database   },
  { id: "stripe",      label: "Stripe payments + webhooks",      hours: 10, category: "payments", icon: CreditCard },
  { id: "email",       label: "Transactional email setup",       hours: 6,  category: "email",    icon: Mail       },
  { id: "rbac",        label: "Role-based access control",       hours: 8,  category: "auth",     icon: ShieldCheck},
  { id: "subdomain",   label: "Multi-tenant subdomain routing",  hours: 10, category: "infra",    icon: Globe      },
  { id: "dashboard",   label: "Admin dashboard & user table",    hours: 7,  category: "ui",       icon: Zap        },
  { id: "billing",     label: "Billing portal & plan upgrades",  hours: 6,  category: "payments", icon: CreditCard },
  { id: "onboard",     label: "Onboarding flow & empty states",  hours: 5,  category: "ui",       icon: Package    },
  { id: "deploy",      label: "Vercel + GitHub CI/CD pipeline",  hours: 4,  category: "infra",    icon: Globe      },
];

const CATEGORY_COLOR: Record<Feature["category"], string> = {
  auth:     "#818CF8", // indigo-400
  payments: "#34D399", // emerald-400
  infra:    "#60A5FA", // blue-400
  email:    "#F472B6", // pink-400
  ui:       "#A78BFA", // violet-400
};

const FAQ = [
  { q: "What framework does ShipKit use?", a: "Next.js 14 with the App Router. TypeScript throughout. Tailwind CSS for styling, Prisma for the database layer, and NextAuth for authentication." },
  { q: "Is this a subscription?", a: "No. One-time payment. You get the code, you own it forever. No monthly fees, no license renewals. Future major versions are paid upgrades, but you'll never be cut off from what you bought." },
  { q: "What database does it support?", a: "Postgres by default (we recommend Supabase or Neon for hosted Postgres). The Prisma schema is portable — swap to MySQL or SQLite with one config change." },
  { q: "Can I use ShipKit for client projects?", a: "Yes. The license covers unlimited personal and commercial projects. Build as many SaaS products as you want. The only thing you can't do is resell ShipKit itself." },
  { q: "I'm stuck. Is there support?", a: "Every tier includes access to a private Discord. Pro and Team tiers include priority support with guaranteed 24h response. We also have extensive docs covering every module." },
];


// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ShipKitLandingPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const prefersReduced = useReducedMotion();

  const totalHours = FEATURES.filter(f => checked.has(f.id)).reduce((sum, f) => sum + f.hours, 0);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const checkAll = () => setChecked(new Set(FEATURES.map(f => f.id)));
  const clearAll = () => setChecked(new Set());

  const PLANS = [
    { name: "Starter", price: billingAnnual ? 79 : 99, orig: 99, desc: "One project, one developer.", features: ["Full source code", "Auth + DB + Stripe", "Email templates", "Discord community", "12 months of updates"] },
    { name: "Pro", price: billingAnnual ? 149 : 179, orig: 179, popular: true, desc: "Unlimited projects, one developer.", features: ["Everything in Starter", "Multi-tenancy module", "Admin dashboard", "Priority support (24h)", "Lifetime updates"] },
    { name: "Team", price: billingAnnual ? 299 : 349, orig: 349, desc: "Unlimited projects, up to 5 devs.", features: ["Everything in Pro", "Team licence (5 seats)", "RBAC & audit log", "Private Slack channel", "1:1 onboarding call"] },
  ];

  return (
    <main
    className="min-h-screen antialiased overflow-x-hidden bg-[#0A0A0A] text-[#E4E4E7]"
      // style={{ background: "#0A0A0A", color: "#E4E4E7", fontFamily: "Inter, -apple-system, sans-serif" }}
    >
      {/* ── Nav ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ height: 60, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#6366F1" }}>
            <Zap size={13} color="#fff" fill="#fff" />
          </div>
          <span className="font-semibold text-sm" style={{ color: "#E4E4E7" }}>ShipKit</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#71717A" }}>
          {["Features", "Pricing", "Docs", "Changelog"].map(item => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="#" className="hidden md:flex items-center gap-1.5 text-sm" style={{ color: "#71717A" }}>
            <FiGithub size={15} /> GitHub
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium px-3 py-1.5 rounded-md transition-all"
            style={{ background: "#6366F1", color: "#fff" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
          >
            Get ShipKit
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative dot-grid flex flex-col items-center justify-center text-center px-6 pt-36 pb-32" style={{ minHeight: "100vh" }}>
        {/* Radial fade to kill dots at edges */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0A0A0A 100%)" }} />
        {/* Indigo glow */}
        <div className="absolute pointer-events-none" style={{ top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full text-xs font-medium font-mono-code"
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#818CF8" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            v2.4 — Now with multi-tenancy
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ color: "#FAFAFA", letterSpacing: "-0.03em", maxWidth: 700 }}>
            Launch your Next.js SaaS<br />
            <span style={{ color: "#6366F1" }}>in days, not months.</span>
          </h1>

          <p className="text-lg mb-10" style={{ color: "#71717A", maxWidth: 440, lineHeight: 1.7 }}>
            You've rebuilt auth three times. You've wired Stripe from scratch twice. ShipKit means you never do it again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#pricing"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: "#6366F1", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Get ShipKit — from $99 <ArrowRight size={15} />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.05)", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "#E4E4E7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "#A1A1AA"; }}
            >
              <FiGithub size={15} /> View on GitHub
            </Link>
          </div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-6 mt-12"
          >
            <div className="flex -space-x-2">
              {["#6366F1","#8B5CF6","#EC4899","#3B82F6","#10B981"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ background: c, borderColor: "#0A0A0A", color: "#fff", zIndex: 5 - i }}>
                  {["A","R","J","T","M"][i]}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5 mb-0.5">{[...Array(5)].map((_,i) => <Star key={i} size={11} fill="#6366F1" style={{ color: "#6366F1" }} />)}</div>
              <p className="text-xs" style={{ color: "#52525B" }}>Used by <span style={{ color: "#A1A1AA" }}>1,200+ developers</span> to ship faster</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8"
        >
          <motion.div animate={prefersReduced ? {} : { y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={18} style={{ color: "#3F3F46" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Pain section ── */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs font-mono-code tracking-widest uppercase mb-6" style={{ color: "#6366F1", letterSpacing: "0.18em" }}>the cost of starting from scratch</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8" style={{ color: "#FAFAFA", letterSpacing: "-0.025em" }}>
            You've started from scratch<br />three times. You've shipped zero.
          </h2>
          <p className="text-base" style={{ color: "#71717A", lineHeight: 1.85 }}>
            Not because you can't build it. Because you spend the first three weeks on auth, Stripe webhooks, email, and deployment config — and run out of energy before you even write the feature that makes your SaaS worth using. ShipKit ends that cycle.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-16 grid grid-cols-3 gap-4">
            {[
              { num: "76h", label: "Avg. setup time before first feature" },
              { num: "3×",  label: "Average rebuilds before launch" },
              { num: "0",   label: "Hours ShipKit makes you spend on boilerplate" },
            ].map(({ num, label }) => (
              <div key={label} className="p-4 md:p-6 rounded-xl" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="font-bold font-mono-code text-2xl md:text-3xl mb-1" style={{ color: num === "0" ? "#6366F1" : "#FAFAFA" }}>{num}</p>
                <p className="text-xs" style={{ color: "#52525B", lineHeight: 1.6 }}>{label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Interactive checklist ── */}
      <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto" id="features">
        <FadeIn className="mb-12">
          <p className="text-xs font-mono-code tracking-widest uppercase mb-4" style={{ color: "#6366F1", letterSpacing: "0.18em" }}>what's included</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#FAFAFA", letterSpacing: "-0.025em" }}>
              Tick what you'd build yourself.<br />
              <span style={{ color: "#6366F1" }}>Watch the hours add up.</span>
            </h2>
            <div className="flex gap-3 text-xs">
              <button onClick={checkAll} className="px-3 py-1.5 rounded-md transition-colors" style={{ background: "rgba(99,102,241,0.1)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}>
                Check all
              </button>
              <button onClick={clearAll} className="px-3 py-1.5 rounded-md transition-colors" style={{ background: "rgba(255,255,255,0.04)", color: "#52525B", border: "1px solid rgba(255,255,255,0.06)" }}>
                Clear
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {FEATURES.map((feat, i) => {
            const isChecked = checked.has(feat.id);
            const Icon = feat.icon;
            const accent = CATEGORY_COLOR[feat.category];
            return (
              <FadeIn key={feat.id} delay={i * 0.04}>
                <motion.button
                  onClick={() => toggle(feat.id)}
                  whileTap={prefersReduced ? {} : { scale: 0.98 }}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                  style={{
                    background: isChecked ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isChecked ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                    cursor: "pointer",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    className="w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all"
                    style={{ background: isChecked ? "#6366F1" : "rgba(255,255,255,0.05)", border: `1px solid ${isChecked ? "#6366F1" : "rgba(255,255,255,0.12)"}` }}
                  >
                    {isChecked && <Check size={11} color="#fff" strokeWidth={3} />}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ background: `${accent}15` }}>
                    <Icon size={15} style={{ color: accent }} />
                  </div>

                  {/* Label */}
                  <span className="flex-1 text-sm" style={{ color: isChecked ? "#E4E4E7" : "#71717A" }}>{feat.label}</span>

                  {/* Hours */}
                  <span className="text-xs font-mono-code shrink-0" style={{ color: isChecked ? "#6366F1" : "#3F3F46" }}>
                    {feat.hours}h
                  </span>
                </motion.button>
              </FadeIn>
            );
          })}
        </div>

        {/* Time saved counter */}
        <FadeIn>
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
            style={{ background: totalHours > 0 ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${totalHours > 0 ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)"}`, transition: "all 0.4s ease" }}
          >
            <div className="flex-1">
              <p className="text-xs font-mono-code mb-1" style={{ color: "#52525B", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {totalHours > 0 ? "Hours you just saved" : "Select features to see your time savings"}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="font-bold font-mono-code" style={{ fontSize: 52, color: totalHours > 0 ? "#6366F1" : "#27272A", lineHeight: 1, transition: "color 0.3s" }}>
                  <AnimatedCounter value={totalHours} />
                </span>
                {totalHours > 0 && (
                  <span className="text-sm" style={{ color: "#52525B" }}>hours of setup</span>
                )}
              </div>
              {totalHours > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm mt-2"
                  style={{ color: "#71717A" }}
                >
                  That's <span style={{ color: "#A1A1AA", fontWeight: 600 }}>{Math.round(totalHours / 8)} full work days</span> back in your hands — ready to build what actually matters.
                </motion.p>
              )}
            </div>
            {totalHours > 0 && (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                href="#pricing"
                className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold shrink-0 transition-all"
                style={{ background: "#6366F1", color: "#fff" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
              >
                <Clock size={14} /> Stop rebuilding
              </motion.a>
            )}
          </div>
        </FadeIn>
      </section>

      {/* ── Code preview ── */}
      <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <p className="text-xs font-mono-code tracking-widest uppercase mb-4" style={{ color: "#6366F1", letterSpacing: "0.18em" }}>the code</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#FAFAFA", letterSpacing: "-0.025em" }}>
              Open the repo. Write your feature. Ship.
            </h2>
            <p className="text-sm mb-6" style={{ color: "#71717A", lineHeight: 1.85 }}>
              Every module is pre-wired and documented. Auth talks to the DB. Stripe webhooks update the DB. Email fires on the right events. You don't touch the plumbing. You just build.
            </p>
            <div className="space-y-3">
              {[
                "TypeScript end-to-end — no implicit any",
                "Every module independently documented",
                "Env variables validated at startup (Zod)",
                "100% tested payment webhook handlers",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "#71717A" }}>
                  <Check size={14} style={{ color: "#6366F1", flexShrink: 0, marginTop: 2 }} />
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CodeBlock />
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-6 py-24 md:py-32 max-w-5xl mx-auto" id="pricing">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-mono-code tracking-widest uppercase mb-4" style={{ color: "#6366F1", letterSpacing: "0.18em" }}>pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "#FAFAFA", letterSpacing: "-0.025em" }}>
            One payment. Own it forever.
          </h2>
          <p className="text-sm mb-8" style={{ color: "#71717A" }}>No subscriptions. No seat taxes after month 3. Just the code.</p>

          {/* Annual toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-lg" style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}>
            {["Monthly","Annual"].map(mode => (
              <button
                key={mode}
                onClick={() => setBillingAnnual(mode === "Annual")}
                className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
                style={{
                  background: (mode === "Annual") === billingAnnual ? "#6366F1" : "transparent",
                  color: (mode === "Annual") === billingAnnual ? "#fff" : "#71717A",
                }}
              >
                {mode} {mode === "Annual" && <span className="ml-1 text-xs" style={{ color: (mode === "Annual") === billingAnnual ? "#C7D2FE" : "#52525B" }}>–20%</span>}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 0.07}>
              <div
                className="relative flex flex-col p-6 rounded-2xl h-full"
                style={{
                  background: plan.popular ? "rgba(99,102,241,0.08)" : "#0F0F0F",
                  border: plan.popular ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#6366F1", color: "#fff" }}>
                    Most popular
                  </div>
                )}

                <div className="mb-6">
                  <p className="font-semibold mb-1" style={{ color: "#FAFAFA" }}>{plan.name}</p>
                  <p className="text-xs mb-4" style={{ color: "#52525B" }}>{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-mono-code" style={{ color: "#FAFAFA" }}>${plan.price}</span>
                    {billingAnnual && <span className="text-sm line-through ml-1" style={{ color: "#3F3F46" }}>${plan.orig}</span>}
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#52525B" }}>one-time · USD</p>
                </div>

                <div className="space-y-3 flex-1 mb-8">
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: "#71717A" }}>
                      <Check size={13} style={{ color: "#6366F1", flexShrink: 0, marginTop: 2 }} />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link
                  href="#"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: plan.popular ? "#6366F1" : "rgba(255,255,255,0.05)",
                    color: plan.popular ? "#fff" : "#A1A1AA",
                    border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = plan.popular ? "#4F46E5" : "rgba(255,255,255,0.08)";
                    if (!plan.popular) el.style.color = "#E4E4E7";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = plan.popular ? "#6366F1" : "rgba(255,255,255,0.05)";
                    if (!plan.popular) el.style.color = "#A1A1AA";
                  }}
                >
                  Buy {plan.name} <ArrowRight size={14} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="text-center text-xs mt-8" style={{ color: "#3F3F46" }}>
            All plans include a 7-day refund guarantee. No questions asked. · Payments secured by Stripe.
          </p>
        </FadeIn>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-24 md:py-32 max-w-2xl mx-auto" id="faq">
        <FadeIn className="mb-10">
          <p className="text-xs font-mono-code tracking-widest uppercase mb-4" style={{ color: "#6366F1", letterSpacing: "0.18em" }}>FAQ</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#FAFAFA", letterSpacing: "-0.02em" }}>
            The questions you'd Google anyway.
          </h2>
        </FadeIn>

        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", background: openFaq === i ? "#0F0F0F" : "transparent" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium" style={{ color: "#E4E4E7" }}>{item.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={15} style={{ color: "#52525B", flexShrink: 0 }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-5 pb-5 text-sm" style={{ color: "#71717A", lineHeight: 1.8 }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 py-24 md:py-32">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6" style={{ color: "#FAFAFA", letterSpacing: "-0.03em" }}>
              Stop rebuilding.<br />
              <span style={{ color: "#6366F1" }}>Start shipping.</span>
            </h2>
            <p className="text-base mb-10" style={{ color: "#71717A", lineHeight: 1.8 }}>
              Every week you wait is another week spent on auth and webhooks instead of the feature that makes your SaaS worth using.
            </p>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold transition-all"
              style={{ background: "#6366F1", color: "#fff" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#6366F1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Get ShipKit — from $99 <ExternalLink size={15} />
            </Link>
            <p className="text-xs mt-4" style={{ color: "#3F3F46" }}>7-day refund guarantee · Instant access · 1,200+ developers</p>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
