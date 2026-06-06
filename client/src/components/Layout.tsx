import { Link, useLocation } from "wouter";
import { LayoutDashboard, History, Clock, BookOpen, Brain, Zap, BarChart2 } from "lucide-react";
import type { ReactNode } from "react";
import MarketBar from "./MarketBar";

const navItems = [
  { path: "/", label: "HOJE", icon: LayoutDashboard },
  { path: "/novo-trade", label: "NOVO", icon: Zap },
  { path: "/historico", label: "TRADES", icon: History },
  { path: "/janelas", label: "JANELAS", icon: Clock },
  { path: "/analista", label: "IA", icon: Brain },
  { path: "/academia", label: "AULA", icon: BookOpen },
  { path: "/pnl", label: "P&L", icon: BarChart2 },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* Market Bar - fixed top */}
      <MarketBar />

      <div className="flex pt-[44px]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] border-r border-[var(--border-color)] bg-[var(--bg-base)] fixed top-[44px] bottom-0 z-50">
          <div className="p-5 border-b border-[var(--border-color)]">
            <h1 className="font-mono-title font-semibold text-[var(--text-primary)] text-lg tracking-tight">
              THE DESK
            </h1>
            <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono-title">
              Where discipline becomes data.
            </p>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 text-[12px] font-mono-title font-medium tracking-wide transition-all duration-150 ${
                      isActive
                        ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-l-2 border-l-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border-l-2 border-l-transparent"
                    }`}
                  >
                    <item.icon size={15} strokeWidth={1.5} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-[var(--border-color)]">
            <div className="text-[10px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider">
              MES / MNQ Futures
            </div>
            <div className="text-[10px] text-[var(--text-muted)] font-mono-title mt-1 opacity-40">
              THE DESK v3
            </div>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#050505] border-t border-[var(--border-color)] flex justify-around items-center h-[60px]">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors duration-150 ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                  <span className="text-[9px] font-mono-title font-medium tracking-wide">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-[280px] pb-[80px] lg:pb-0 min-h-[calc(100vh-44px)]">
          <div className="p-4 lg:p-8 max-w-[1100px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
