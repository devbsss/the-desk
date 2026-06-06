import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTrades } from "@/contexts/TradesContext";

// ─── helpers ─────────────────────────────────────────────────────────────────
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DOW = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function formatPnl(v: number): string {
  const abs = Math.abs(v).toFixed(2);
  return v >= 0 ? `+$${abs}` : `-$${abs}`;
}

function pnlColor(v: number): string {
  if (v > 0) return "text-[var(--green)]";
  if (v < 0) return "text-[var(--red)]";
  return "text-[var(--text-muted)]";
}

function pnlBg(v: number): string {
  if (v > 0) return "bg-[var(--green-dim)] border-[var(--green)]";
  if (v < 0) return "bg-[var(--red-dim)] border-[var(--red)]";
  return "bg-[rgba(255,255,255,0.03)] border-[var(--border-color)]";
}

// ─── component ───────────────────────────────────────────────────────────────
export default function PnlTracker() {
  const { trades } = useTrades();

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

  // Aggregate P&L per calendar date (YYYY-MM-DD)
  const pnlByDate = useMemo(() => {
    const map: Record<string, { pnl: number; trades: number; wins: number; losses: number }> = {};
    for (const t of trades) {
      const key = t.date; // "YYYY-MM-DD"
      if (!map[key]) map[key] = { pnl: 0, trades: 0, wins: 0, losses: 0 };
      map[key].pnl += t.pnl;
      map[key].trades += 1;
      if (t.result === "WIN") map[key].wins += 1;
      else if (t.result === "LOSS") map[key].losses += 1;
    }
    return map;
  }, [trades]);

  // Build calendar grid for the current month
  const { days, firstDow } = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDow = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    const days: Array<{ day: number; dateKey: string } | null> = [];
    for (let i = 0; i < firstDow; i++) days.push(null); // padding
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(viewMonth + 1).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      days.push({ day: d, dateKey: `${viewYear}-${mm}-${dd}` });
    }
    return { days, firstDow };
  }, [viewYear, viewMonth]);

  // Monthly summary
  const monthlySummary = useMemo(() => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const prefix = `${viewYear}-${mm}-`;
    let pnl = 0, totalTrades = 0, wins = 0, losses = 0, tradingDays = 0;
    let bestDay = { pnl: -Infinity, date: "" };
    let worstDay = { pnl: Infinity, date: "" };

    for (const [key, val] of Object.entries(pnlByDate)) {
      if (!key.startsWith(prefix)) continue;
      pnl += val.pnl;
      totalTrades += val.trades;
      wins += val.wins;
      losses += val.losses;
      tradingDays += 1;
      if (val.pnl > bestDay.pnl) bestDay = { pnl: val.pnl, date: key };
      if (val.pnl < worstDay.pnl) worstDay = { pnl: val.pnl, date: key };
    }
    const winRate = totalTrades > 0 ? Math.round((wins / totalTrades) * 100) : 0;
    return { pnl, totalTrades, wins, losses, tradingDays, winRate, bestDay, worstDay };
  }, [pnlByDate, viewYear, viewMonth]);

  // Yearly summary bar
  const yearlySummary = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const mm = String(i + 1).padStart(2, "0");
      const prefix = `${viewYear}-${mm}-`;
      let pnl = 0;
      for (const [key, val] of Object.entries(pnlByDate)) {
        if (key.startsWith(prefix)) pnl += val.pnl;
      }
      return { month: i, pnl };
    });
    const totalYearly = months.reduce((s, m) => s + m.pnl, 0);
    return { months, totalYearly };
  }, [pnlByDate, viewYear]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)]">
          P&L TRACKER
        </h1>
        <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-1">
          Calendário mensal de resultados · Paper Trade
        </p>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up stagger-1">
        <div className="td-card">
          <p className="td-label mb-1">P&L DO MÊS</p>
          <p className={`font-mono-title text-xl font-semibold tabular-nums ${pnlColor(monthlySummary.pnl)}`}>
            {formatPnl(monthlySummary.pnl)}
          </p>
        </div>
        <div className="td-card">
          <p className="td-label mb-1">WIN RATE</p>
          <p className="font-mono-title text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {monthlySummary.winRate}%
          </p>
          <p className="font-mono-title text-[10px] text-[var(--text-muted)]">
            {monthlySummary.wins}W · {monthlySummary.losses}L
          </p>
        </div>
        <div className="td-card">
          <p className="td-label mb-1">TRADES</p>
          <p className="font-mono-title text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {monthlySummary.totalTrades}
          </p>
          <p className="font-mono-title text-[10px] text-[var(--text-muted)]">
            {monthlySummary.tradingDays} dias operados
          </p>
        </div>
        <div className="td-card">
          <p className="td-label mb-1">MELHOR DIA</p>
          {monthlySummary.bestDay.date ? (
            <>
              <p className={`font-mono-title text-xl font-semibold tabular-nums ${pnlColor(monthlySummary.bestDay.pnl)}`}>
                {formatPnl(monthlySummary.bestDay.pnl)}
              </p>
              <p className="font-mono-title text-[10px] text-[var(--text-muted)]">
                {monthlySummary.bestDay.date.slice(8)} {MONTHS[viewMonth].slice(0, 3)}
              </p>
            </>
          ) : (
            <p className="font-mono-title text-xl font-semibold text-[var(--text-muted)]">—</p>
          )}
        </div>
      </div>

      {/* Calendar */}
      <div className="td-card animate-fade-in-up stagger-2">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="p-1.5 hover:bg-[var(--bg-elevated)] transition-colors rounded"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={16} className="text-[var(--text-secondary)]" />
          </button>
          <div className="text-center">
            <p className="font-mono-title text-[13px] font-semibold text-[var(--text-primary)]">
              {MONTHS[viewMonth].toUpperCase()} {viewYear}
            </p>
          </div>
          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-[var(--bg-elevated)] transition-colors rounded"
            aria-label="Próximo mês"
          >
            <ChevronRight size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DOW.map((d) => (
            <div key={d} className="text-center">
              <span className="font-mono-title text-[9px] text-[var(--text-muted)]">{d}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((cell, idx) => {
            if (!cell) {
              return <div key={`empty-${idx}`} className="aspect-square" />;
            }
            const data = pnlByDate[cell.dateKey];
            const isToday = cell.dateKey === todayKey;
            const isWeekend = (firstDow + cell.day - 1) % 7 === 0 || (firstDow + cell.day - 1) % 7 === 6;

            return (
              <div
                key={cell.dateKey}
                className={`
                  relative aspect-square border rounded-sm flex flex-col items-center justify-center p-0.5 transition-all
                  ${data ? pnlBg(data.pnl) : isWeekend ? "bg-transparent border-transparent" : "bg-[var(--bg-base)] border-[var(--border-color)]"}
                  ${isToday ? "ring-1 ring-[var(--white)] ring-offset-0" : ""}
                `}
              >
                {/* Day number */}
                <span className={`font-mono-title text-[10px] leading-none mb-0.5 ${
                  isToday ? "text-[var(--white)] font-bold" : isWeekend && !data ? "text-[var(--text-muted)]" : "text-[var(--text-secondary)]"
                }`}>
                  {cell.day}
                </span>

                {/* P&L value */}
                {data ? (
                  <span className={`font-mono-title text-[8px] leading-none font-semibold tabular-nums ${pnlColor(data.pnl)}`}>
                    {formatPnl(data.pnl)}
                  </span>
                ) : null}

                {/* Trade count dot */}
                {data && data.trades > 0 && (
                  <span className="font-mono-title text-[7px] leading-none text-[var(--text-muted)] mt-0.5">
                    {data.trades}t
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[var(--green-dim)] border border-[var(--green)]" />
            <span className="font-mono-title text-[9px] text-[var(--text-muted)]">DIA POSITIVO</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[var(--red-dim)] border border-[var(--red)]" />
            <span className="font-mono-title text-[9px] text-[var(--text-muted)]">DIA NEGATIVO</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)]" />
            <span className="font-mono-title text-[9px] text-[var(--text-muted)]">BREAKEVEN</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm ring-1 ring-[var(--white)]" />
            <span className="font-mono-title text-[9px] text-[var(--text-muted)]">HOJE</span>
          </div>
        </div>
      </div>

      {/* Yearly Overview Bar */}
      <div className="td-card animate-fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-4">
          <p className="td-label">VISÃO ANUAL {viewYear}</p>
          <p className={`font-mono-title text-[13px] font-semibold tabular-nums ${pnlColor(yearlySummary.totalYearly)}`}>
            {formatPnl(yearlySummary.totalYearly)}
          </p>
        </div>
        <div className="grid grid-cols-12 gap-1">
          {yearlySummary.months.map(({ month, pnl }) => {
            const isCurrentMonth = month === viewMonth;
            return (
              <button
                key={month}
                onClick={() => setViewMonth(month)}
                className={`flex flex-col items-center gap-1 p-1.5 rounded transition-all hover:bg-[var(--bg-elevated)] ${
                  isCurrentMonth ? "ring-1 ring-[var(--white)]" : ""
                }`}
              >
                <div
                  className={`w-full h-8 rounded-sm border ${
                    pnl > 0
                      ? "bg-[var(--green-dim)] border-[var(--green)]"
                      : pnl < 0
                      ? "bg-[var(--red-dim)] border-[var(--red)]"
                      : "bg-[var(--bg-base)] border-[var(--border-color)]"
                  }`}
                  style={{
                    opacity: pnl !== 0 ? Math.min(0.4 + Math.abs(pnl) / 500, 1) : 0.3,
                  }}
                />
                <span className="font-mono-title text-[8px] text-[var(--text-muted)]">
                  {MONTHS[month].slice(0, 3).toUpperCase()}
                </span>
                {pnl !== 0 && (
                  <span className={`font-mono-title text-[7px] tabular-nums leading-none ${pnlColor(pnl)}`}>
                    {pnl > 0 ? "+" : ""}{Math.round(pnl)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day-by-day list for the month */}
      {monthlySummary.tradingDays > 0 && (
        <div className="td-card animate-fade-in-up stagger-4">
          <p className="td-label mb-4">DIAS OPERADOS — {MONTHS[viewMonth].toUpperCase()}</p>
          <div className="space-y-2">
            {Object.entries(pnlByDate)
              .filter(([key]) => {
                const mm = String(viewMonth + 1).padStart(2, "0");
                return key.startsWith(`${viewYear}-${mm}-`);
              })
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([dateKey, data]) => {
                const day = parseInt(dateKey.slice(8));
                const dow = new Date(dateKey).getDay();
                return (
                  <div
                    key={dateKey}
                    className={`flex items-center justify-between px-3 py-2 border rounded-sm ${pnlBg(data.pnl)}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono-title text-[11px] text-[var(--text-secondary)] w-16">
                        {DOW[dow]}, {day} {MONTHS[viewMonth].slice(0, 3)}
                      </span>
                      <span className="font-mono-title text-[10px] text-[var(--text-muted)]">
                        {data.trades} trade{data.trades !== 1 ? "s" : ""} · {data.wins}W {data.losses}L
                      </span>
                    </div>
                    <span className={`font-mono-title text-[13px] font-semibold tabular-nums ${pnlColor(data.pnl)}`}>
                      {formatPnl(data.pnl)}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {monthlySummary.tradingDays === 0 && (
        <div className="td-card text-center py-10 animate-fade-in-up stagger-4">
          <p className="font-mono-title text-[13px] text-[var(--text-muted)]">
            Nenhum trade registrado em {MONTHS[viewMonth]} {viewYear}.
          </p>
          <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-2">
            Registre seus trades na aba NOVO para ver o P&L aqui.
          </p>
        </div>
      )}
    </div>
  );
}
