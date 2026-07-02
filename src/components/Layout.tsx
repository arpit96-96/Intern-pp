import { motion } from "framer-motion";
import { Activity, Command, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { pageVariants } from "@/lib/motion";
import { ToastViewport } from "./ToastViewport";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.28),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,#07080d_0%,#111827_52%,#09090f_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="mb-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] px-5 py-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <Link
                to="/"
                className="group inline-flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
              >
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 shadow-inner shadow-white/10">
                  <Command className="h-5 w-5 text-cyan-200" aria-hidden />
                </span>
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-white transition group-hover:text-cyan-100">
                    Influencer Compass
                  </span>
                  <span className="block text-sm text-slate-400">
                    Creator intelligence for modern teams
                  </span>
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                <Activity className="h-3.5 w-3.5" aria-hidden />
                Live data room
              </div>
              {title ? (
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  <span className="truncate">{title}</span>
                </div>
              ) : null}
            </div>
          </div>

          {subtitle ? (
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
              {subtitle}
            </p>
          ) : null}
        </motion.header>

        <motion.main
          className="flex-1"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>
      </div>
      <ToastViewport />
    </div>
  );
}
