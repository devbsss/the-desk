import { useEffect, useState, useMemo } from "react";
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
  getTodayPnL,
  getRandomQuote,
  formatCurrency,
  formatDate,
} from "@/lib/trading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="animate-count-up">
      {prefix}
      {typeof value === "number" && !Number.isInteger(value)
        ? display.toFixed(2)
        : Math.round(display)}
      {suffix}
    </span>
  );
}

function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  trend,
  delay = 0,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}) {
  return (
    <div
      className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-4 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-2">
        {label}
      </div>
      <div className="flex items-end gap-2">
        <span
          className={`text-2xl font-bold font-['Space_Mono'] ${
            trend === "up"
              ? "text-[#26A69A]"
              : trend === "down"
              ? "text-[#EF5350]"
              : "text-[#E8E8E8]"
          }`}
        >
          <CountUp value={value} prefix={prefix} suffix={suffix} />
        </span>
        {trend === "up" && <ArrowUpRight size={14} className="text-[#26A69A] mb-1" />}
        {trend === "down" && <ArrowDownRight size={14} className="text-[#EF5350] mb-1" />}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { trades, getTodaySession, getTodayTrades } = useTrades();
  const [quote] = useState(() => getRandomQuote());

  const todaySession = getTodaySession();
  const todayTrades = getTodayTrades();
  const todayPnL = getTodayPnL(trades);
  const todayTradeCount = todayTrades.length;

  const winRate = useMemo(() => calculateWinRate(trades), [trades]);
  const totalPnL = useMemo(() => calculateTotalPnL(trades), [trades]);
  const avgPerTrade = useMemo(() => calculateAveragePerTrade(trades), [trades]);
  const streak = useMemo(() => calculateStreak(trades), [trades]);
  const bestDay = useMemo(() => calculateBestDay(trades), [trades]);
  const worstDay = useMemo(() => calculateWorstDay(trades), [trades]);
  const daysTraded = useMemo(() => calculateDaysTraded(trades), [trades]);
  const equityCurve = useMemo(() => calculateEquityCurve(trades), [trades]);
  const winLossByAsset = useMemo(() => calculateWinLossByAsset(trades), [trades]);

  const dayStatus = useMemo(() => {
    if (!todaySession) return "not_started";
    if (todaySession.status === "ended") return "ended";
    if (todayTradeCount >= 2) return "ended";
    if (todaySession.maxDailyLoss && Math.abs(todayPnL) >= todaySession.maxDailyLoss && todayPnL < 0) return "ended";
    return "active";
  }, [todaySession, todayTradeCount, todayPnL]);

  const canTrade = dayStatus === "active" && todayTradeCount < 2;

  const statusConfig = {
    active: { dot: "bg-[#26A69A]", label: "ATIVO", color: "text-[#26A69A]" },
    ended: { dot: "bg-[#EF5350]", label: "DIA ENCERRADO", color: "text-[#EF5350]" },
    not_started: { dot: "bg-[#666666]", label: "NÃO INICIADO", color: "text-[#666666]" },
  };

  const last5Trades = useMemo(
    () => [...trades].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [trades]
  );

  return (
    <div className="space-y-6">
      {/* Status do Dia */}
      <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-5 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[dayStatus].dot} animate-pulse-dot`} />
              <span className={`text-sm font-bold font-['Space_Mono'] ${statusConfig[dayStatus].color}`}>
                {statusConfig[dayStatus].label}
              </span>
            </div>
            <p className="text-[13px] text-[#999999] italic font-['JetBrains_Mono'] max-w-md">
              "{quote}"
            </p>
            <div className="flex gap-4 text-[12px] font-['JetBrains_Mono'] text-[#666666]">
              <span>
                P&L hoje:{" "}
                <span className={todayPnL >= 0 ? "text-[#26A69A]" : "text-[#EF5350]"}>
                  {formatCurrency(todayPnL)}
                </span>
                {todaySession && (
                  <span className="text-[#444444]"> de -${todaySession.maxDailyLoss}</span>
                )}
              </span>
              <span>
                Trades: <span className="text-[#E8E8E8]">{todayTradeCount}</span>
                <span className="text-[#444444]"> de 2</span>
              </span>
            </div>
          </div>
          <div>
            {canTrade ? (
              <Link href="/novo-trade">
                <button className="bg-[#E8E8E8] text-[#000000] font-['Space_Mono'] font-bold text-sm px-6 py-3 rounded-md hover:bg-[#FFFFFF] active:scale-[0.97] transition-all duration-150 w-full sm:w-auto">
                  REGISTRAR NOVO TRADE
                </button>
              </Link>
            ) : dayStatus === "ended" ? (
              <div className="bg-[#1A0A0A] border border-[#EF5350]/30 rounded-md px-4 py-3 text-center">
                <span className="text-[#EF5350] text-[12px] font-['JetBrains_Mono'] font-bold">
                  {todayTradeCount >= 2
                    ? "MÁXIMO DE TRADES DO DIA ATINGIDO"
                    : "LIMITE DIÁRIO ATINGIDO — DIA ENCERRADO"}
                </span>
              </div>
            ) : (
              <Link href="/novo-trade">
                <button className="bg-[#E8E8E8] text-[#000000] font-['Space_Mono'] font-bold text-sm px-6 py-3 rounded-md hover:bg-[#FFFFFF] active:scale-[0.97] transition-all duration-150 w-full sm:w-auto">
                  REGISTRAR NOVO TRADE
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Trades" value={trades.length} delay={0} />
        <StatCard
          label="Win Rate"
          value={winRate}
          suffix="%"
          trend={winRate >= 50 ? "up" : winRate > 0 ? "down" : "neutral"}
          delay={50}
        />
        <StatCard
          label="P&L Total"
          value={totalPnL}
          prefix="$"
          trend={totalPnL >= 0 ? "up" : "down"}
          delay={100}
        />
        <StatCard label="Melhor Dia" value={bestDay} prefix="$" trend="up" delay={150} />
        <StatCard label="Pior Dia" value={worstDay} prefix="$" trend="down" delay={200} />
        <StatCard
          label="Streak"
          value={streak.count}
          suffix={streak.type === "WIN" ? " W" : streak.type === "LOSS" ? " L" : ""}
          trend={streak.type === "WIN" ? "up" : streak.type === "LOSS" ? "down" : "neutral"}
          delay={250}
        />
        <StatCard label="Dias Operados" value={daysTraded} delay={300} />
        <StatCard
          label="Média/Trade"
          value={avgPerTrade}
          prefix="$"
          trend={avgPerTrade >= 0 ? "up" : "down"}
          delay={350}
        />
      </div>

      {/* Equity Curve */}
      <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="text-[12px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
          Equity Curve
        </h2>
        {equityCurve.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={equityCurve} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis
                dataKey="date"
                tick={{ fill: "#666666", fontSize: 10, fontFamily: "JetBrains Mono" }}
                axisLine={{ stroke: "#1E1E1E" }}
                tickLine={false}
                tickFormatter={(v) => {
                  const d = new Date(v + "T12:00:00");
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis
                tick={{ fill: "#666666", fontSize: 10, fontFamily: "JetBrains Mono" }}
                axisLine={{ stroke: "#1E1E1E" }}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  background: "#141414",
                  border: "1px solid #2A2A2A",
                  borderRadius: "4px",
                  fontFamily: "JetBrains Mono",
                  fontSize: "11px",
                  color: "#E8E8E8",
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Saldo"]}
                labelFormatter={(label) => formatDate(label)}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke={equityCurve[equityCurve.length - 1]?.balance >= 0 ? "#26A69A" : "#EF5350"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#E8E8E8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-[#444444] text-[12px] font-['JetBrains_Mono']">
            Nenhum trade registrado ainda. Comece a operar para ver sua equity curve.
          </div>
        )}
      </div>

      {/* Win/Loss por Ativo */}
      <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-5 animate-fade-in" style={{ animationDelay: "250ms" }}>
        <h2 className="text-[12px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
          Performance por Ativo
        </h2>
        {trades.length > 0 ? (
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={winLossByAsset} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis
                dataKey="asset"
                tick={{ fill: "#E8E8E8", fontSize: 12, fontFamily: "Space Mono" }}
                axisLine={{ stroke: "#1E1E1E" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#666666", fontSize: 10, fontFamily: "JetBrains Mono" }}
                axisLine={{ stroke: "#1E1E1E" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#141414",
                  border: "1px solid #2A2A2A",
                  borderRadius: "4px",
                  fontFamily: "JetBrains Mono",
                  fontSize: "11px",
                  color: "#E8E8E8",
                }}
              />
              <Bar dataKey="wins" name="Wins" fill="#26A69A" radius={[2, 2, 0, 0]} />
              <Bar dataKey="losses" name="Losses" fill="#EF5350" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[160px] flex items-center justify-center text-[#444444] text-[12px] font-['JetBrains_Mono']">
            Sem dados de performance por ativo.
          </div>
        )}
      </div>

      {/* Últimos 5 Trades */}
      <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h2 className="text-[12px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-4">
          Últimos 5 Trades
        </h2>
        {last5Trades.length > 0 ? (
          <div className="space-y-2">
            {last5Trades.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between py-2.5 px-3 bg-[#080808] border border-[#1A1A1A] rounded"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#666666] font-['JetBrains_Mono']">
                    {formatDate(trade.date)}
                  </span>
                  <span className="text-[12px] text-[#E8E8E8] font-['Space_Mono'] font-bold">
                    {trade.asset}
                  </span>
                  <span
                    className={`text-[11px] font-['JetBrains_Mono'] ${
                      trade.direction === "LONG" ? "text-[#26A69A]" : "text-[#EF5350]"
                    }`}
                  >
                    {trade.direction}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[13px] font-bold font-['Space_Mono'] ${
                      trade.pnl >= 0 ? "text-[#26A69A]" : "text-[#EF5350]"
                    }`}
                  >
                    {formatCurrency(trade.pnl)}
                  </span>
                  <span className="text-[14px]">
                    {trade.result === "WIN" ? "✅" : trade.result === "LOSS" ? "❌" : "➖"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[#444444] text-[12px] font-['JetBrains_Mono']">
            Nenhum trade registrado. Clique em "Registrar Novo Trade" para começar.
          </div>
        )}
      </div>
    </div>
  );
}
