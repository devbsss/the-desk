import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useTrades } from "@/contexts/TradesContext";
import {
  calculateWinRate,
  calculateTotalPnL,
  calculateAveragePerTrade,
  calculateStreak,
  calculateBestDay,
  calculateWorstDay,
  calculateDaysTraded,
  calculateEquityCurve,
  calculateWinLossByAsset,
  calculatePerformanceByHour,
  calculatePnLByWeekday,
  getTodayPnL,
  getRandomQuote,
  formatCurrency,
  formatDate,
} from "@/lib/trading";
import CountUp from "@/components/CountUp";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { Plus, TrendingUp, TrendingDown, Check, X } from "lucide-react";

export default function Dashboard() {
  const { trades, getTodaySession, getTodayTrades } = useTrades();
  const [quote] = useState(() => getRandomQuote());

  const todaySession = getTodaySession();
  const todayTrades = getTodayTrades();
  const todayPnL = getTodayPnL(trades);

  const stats = useMemo(() => ({
    totalTrades: trades.length,
    winRate: calculateWinRate(trades),
    totalPnL: calculateTotalPnL(trades),
    bestDay: calculateBestDay(trades),
    worstDay: calculateWorstDay(trades),
    streak: calculateStreak(trades),
    daysTraded: calculateDaysTraded(trades),
    avgPerTrade: calculateAveragePerTrade(trades),
  }), [trades]);

  const equityCurve = useMemo(() => calculateEquityCurve(trades), [trades]);
  const assetPerf = useMemo(() => calculateWinLossByAsset(trades), [trades]);
  const hourPerf = useMemo(() => calculatePerformanceByHour(trades), [trades]);
  const weekdayPerf = useMemo(() => calculatePnLByWeekday(trades), [trades]);

  const statusLabel = todaySession?.status === "active"
    ? "ATIVO"
    : todaySession?.status === "ended"
    ? "DIA ENCERRADO"
    : "AGUARDANDO";

  const statusColor = todaySession?.status === "active"
    ? "var(--green)"
    : todaySession?.status === "ended"
    ? "var(--red)"
    : "var(--text-muted)";

  const last5Trades = useMemo(
    () => [...trades].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [trades]
  );

  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <div className="td-card-elevated animate-fade-in-up p-5 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <p className="td-label !mb-0">SESSÃO DE HOJE</p>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColor }}
              />
              <span
                className="font-mono-title text-base font-semibold"
                style={{ color: statusColor }}
              >
                {statusLabel}
              </span>
            </div>
            <p className="font-sans-body text-[14px] text-[var(--text-secondary)] italic max-w-md leading-relaxed">
              "{quote}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="text-right">
              <p className="td-label !text-right !mb-1">Losses / Limite</p>
              <p className="font-mono-title text-sm text-[var(--text-primary)]">
                {todayTrades.filter((t) => t.result === "LOSS").length} / {todaySession?.maxDailyLoss ? `$${todaySession.maxDailyLoss}` : "—"}
              </p>
            </div>
            <div className="text-right">
              <p className="td-label !text-right !mb-1">Trades / Máx</p>
              <p className="font-mono-title text-sm text-[var(--text-primary)]">
                {todayTrades.length} / 2
              </p>
            </div>
            <div className="text-right">
              <p className="td-label !text-right !mb-1">P&L Hoje</p>
              <p className={`font-mono-title text-sm font-semibold ${todayPnL >= 0 ? "pnl-positive" : "pnl-negative"}`}>
                {formatCurrency(todayPnL)}
              </p>
            </div>
            <div className="text-right">
              <p className="td-label !text-right !mb-1">Win Rate</p>
              <p className="font-mono-title text-sm text-[var(--text-primary)]">
                {stats.winRate}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Register Trade Button */}
      <Link href="/novo-trade">
        <button className="td-btn w-full flex items-center justify-center gap-2">
          <Plus size={14} />
          REGISTRAR TRADE
        </button>
      </Link>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "TOTAL TRADES", value: stats.totalTrades, suffix: "", decimals: 0, trend: null },
          { label: "WIN RATE", value: stats.winRate, suffix: "%", decimals: 0, trend: stats.winRate >= 50 ? "up" : stats.winRate > 0 ? "down" : null },
          { label: "P&L ACUMULADO", value: stats.totalPnL, prefix: "$", decimals: 0, trend: stats.totalPnL >= 0 ? "up" : "down" },
          { label: "MELHOR DIA", value: stats.bestDay, prefix: "$", decimals: 0, trend: "up" as const },
          { label: "PIOR DIA", value: stats.worstDay, prefix: "$", decimals: 0, trend: "down" as const },
          { label: "STREAK", value: stats.streak.count, suffix: stats.streak.type === "WIN" ? " W" : stats.streak.type === "LOSS" ? " L" : "", decimals: 0, trend: stats.streak.type === "WIN" ? "up" as const : stats.streak.type === "LOSS" ? "down" as const : null },
          { label: "DIAS OPERADOS", value: stats.daysTraded, suffix: "", decimals: 0, trend: null },
          { label: "MÉDIA/TRADE", value: stats.avgPerTrade, prefix: "$", decimals: 0, trend: stats.avgPerTrade >= 0 ? "up" as const : "down" as const },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`td-card animate-fade-in-up stagger-${i + 1}`}
          >
            <p className="td-label">{stat.label}</p>
            <div className="flex items-end gap-1.5 mt-1">
              <span className="font-mono-title text-xl font-semibold text-[var(--text-primary)]">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                  decimals={stat.decimals}
                />
              </span>
              {stat.trend === "up" && <TrendingUp size={13} className="text-[var(--green)] mb-0.5" />}
              {stat.trend === "down" && <TrendingDown size={13} className="text-[var(--red)] mb-0.5" />}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-4">
        {/* Equity Curve */}
        <div className="td-card">
          <p className="td-label mb-4">EQUITY CURVE — PAPER TRADE</p>
          {equityCurve.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={equityCurve}>
                <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "'IBM Plex Mono'" }}
                  tickFormatter={(v) => v.slice(5)}
                  axisLine={{ stroke: "var(--border-color)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "'IBM Plex Mono'" }}
                  tickFormatter={(v) => `$${v}`}
                  axisLine={{ stroke: "var(--border-color)" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-bright)",
                    borderRadius: "2px",
                    fontFamily: "'IBM Plex Mono'",
                    fontSize: "12px",
                    color: "var(--text-primary)",
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "P&L"]}
                  labelFormatter={(label) => formatDate(label)}
                />
                <defs>
                  <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stats.totalPnL >= 0 ? "var(--green)" : "var(--red)"} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={stats.totalPnL >= 0 ? "var(--green)" : "var(--red)"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke={stats.totalPnL >= 0 ? "var(--green)" : "var(--red)"}
                  strokeWidth={1.5}
                  fill="url(#equityGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center">
              <p className="font-sans-body text-[13px] text-[var(--text-muted)]">
                Nenhum trade registrado ainda. Comece a operar para ver sua equity curve.
              </p>
            </div>
          )}
        </div>

        {/* Performance por Ativo */}
        <div className="td-card">
          <p className="td-label mb-4">PERFORMANCE POR ATIVO</p>
          {trades.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={assetPerf}>
                <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" />
                <XAxis dataKey="asset" tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "'IBM Plex Mono'" }} axisLine={{ stroke: "var(--border-color)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "'IBM Plex Mono'" }} axisLine={{ stroke: "var(--border-color)" }} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border-bright)", borderRadius: "2px", fontFamily: "'IBM Plex Mono'", fontSize: "12px", color: "var(--text-primary)" }} />
                <Bar dataKey="wins" fill="var(--green)" name="Wins" />
                <Bar dataKey="losses" fill="var(--red)" name="Losses" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[160px] flex items-center justify-center">
              <p className="font-sans-body text-[13px] text-[var(--text-muted)]">Sem dados de performance por ativo.</p>
            </div>
          )}
        </div>

        {/* Performance por Horário */}
        <div className="td-card">
          <p className="td-label mb-4">PERFORMANCE POR HORÁRIO</p>
          {hourPerf.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={hourPerf} layout="vertical">
                <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "'IBM Plex Mono'" }} axisLine={{ stroke: "var(--border-color)" }} tickLine={false} />
                <YAxis type="category" dataKey="hour" tick={{ fontSize: 10, fill: "var(--text-secondary)", fontFamily: "'IBM Plex Mono'" }} axisLine={{ stroke: "var(--border-color)" }} tickLine={false} width={45} />
                <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border-bright)", borderRadius: "2px", fontFamily: "'IBM Plex Mono'", fontSize: "12px", color: "var(--text-primary)" }} />
                <Bar dataKey="wins" fill="var(--green)" name="Wins" stackId="a" />
                <Bar dataKey="losses" fill="var(--red)" name="Losses" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[160px] flex items-center justify-center">
              <p className="font-sans-body text-[13px] text-[var(--text-muted)]">Sem dados de performance por horário.</p>
            </div>
          )}
        </div>

        {/* P&L por Dia da Semana */}
        <div className="td-card">
          <p className="td-label mb-4">MELHOR DIA DA SEMANA</p>
          {trades.length > 0 ? (
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={weekdayPerf}>
                <CartesianGrid stroke="var(--border-color)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "'IBM Plex Mono'" }} axisLine={{ stroke: "var(--border-color)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "'IBM Plex Mono'" }} tickFormatter={(v) => `$${v}`} axisLine={{ stroke: "var(--border-color)" }} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border-bright)", borderRadius: "2px", fontFamily: "'IBM Plex Mono'", fontSize: "12px", color: "var(--text-primary)" }} formatter={(value: number) => [`$${value.toFixed(2)}`, "P&L"]} />
                <Bar dataKey="pnl" fill="var(--green)" name="P&L" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[140px] flex items-center justify-center">
              <p className="font-sans-body text-[13px] text-[var(--text-muted)]">Sem dados de P&L por dia da semana.</p>
            </div>
          )}
        </div>
      </div>

      {/* Últimos Trades */}
      <div className="td-card">
        <p className="td-label mb-3">ÚLTIMOS 5 TRADES</p>
        {last5Trades.length > 0 ? (
          <div className="divide-y divide-[var(--border-color)]">
            {last5Trades.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between py-2.5 hover:bg-[var(--bg-hover)] transition-colors duration-150 px-2 -mx-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-title text-[11px] text-[var(--text-muted)]">
                    {formatDate(trade.date)}
                  </span>
                  <span className="font-mono-title text-[11px] text-[var(--text-primary)] font-medium">
                    {trade.asset}
                  </span>
                  <span className={`font-mono-title text-[11px] font-medium ${trade.direction === "LONG" ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
                    {trade.direction}
                  </span>
                  <span className="font-mono-title text-[10px] text-[var(--text-muted)]">
                    {trade.entryTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono-title text-[12px] font-semibold ${trade.pnl >= 0 ? "pnl-positive" : "pnl-negative"}`}>
                    {formatCurrency(trade.pnl)}
                  </span>
                  {trade.followedPlan ? (
                    <Check size={12} className="text-[var(--green)]" />
                  ) : (
                    <X size={12} className="text-[var(--red)]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-sans-body text-[13px] text-[var(--text-muted)] py-4 text-center">
            Nenhum trade registrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}
