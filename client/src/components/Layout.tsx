import { Link, useLocation } from "wouter";
import { LayoutDashboard, PlusCircle, History, BookOpen } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/novo-trade", label: "Novo Trade", icon: PlusCircle },
  { path: "/historico", label: "Histórico", icon: History },
  { path: "/regras", label: "Regras", icon: BookOpen },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] border-r border-[#1E1E1E] bg-[#000000] fixed h-screen z-50">
        <div className="p-5 border-b border-[#1E1E1E]">
          <h1 className="font-['Space_Mono'] font-bold text-[#E8E8E8] text-lg tracking-tight">
            THE DESK
          </h1>
          <p className="text-[11px] text-[#666666] mt-0.5 font-['JetBrains_Mono']">
            Where discipline becomes data.
          </p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-['JetBrains_Mono'] transition-colors duration-150 ${
                    isActive
                      ? "bg-[#141414] text-[#E8E8E8] border border-[#2A2A2A]"
                      : "text-[#666666] hover:text-[#999999] hover:bg-[#0A0A0A]"
                  }`}
                >
                  <item.icon size={16} strokeWidth={1.5} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#1E1E1E]">
          <div className="text-[10px] text-[#444444] font-['JetBrains_Mono'] uppercase tracking-wider">
            Lucid Trading 25K
          </div>
          <div className="text-[10px] text-[#444444] font-['JetBrains_Mono'] mt-1">
            MES / MNQ Futures
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#000000] border-t border-[#1E1E1E] flex justify-around py-2 px-1">
        {navItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-md text-[10px] font-['JetBrains_Mono'] transition-colors duration-150 ${
                  isActive
                    ? "text-[#E8E8E8]"
                    : "text-[#666666]"
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} />
                <span>{item.label.split(" ")[0]}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[220px] pb-20 lg:pb-0 min-h-screen">
        <div className="p-4 lg:p-6 max-w-[1200px]">
          {children}
        </div>
      </main>
    </div>
  );
}
