import type { Trade } from "@/contexts/TradesContext";

export function calculateWinRate(trades: Trade[]): number {
  const eligible = trades.filter((t) => t.result !== "BREAKEVEN");
  if (eligible.length === 0) return 0;
  const wins = eligible.filter((t) => t.result === "WIN").length;
  return Math.round((wins / eligible.length) * 100);
}

export function calculateTotalPnL(trades: Trade[]): number {
  return trades.reduce((sum, t) => sum + t.pnl, 0);
}

export function calculateAveragePerTrade(trades: Trade[]): number {
  if (trades.length === 0) return 0;
  return calculateTotalPnL(trades) / trades.length;
}

export function calculateStreak(trades: Trade[]): {
  type: "WIN" | "LOSS" | "NONE";
  count: number;
} {
  if (trades.length === 0) return { type: "NONE", count: 0 };

  const sorted = [...trades].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const lastResult = sorted[0].result;
  if (lastResult === "BREAKEVEN") return { type: "NONE", count: 0 };

  let count = 0;
  for (const trade of sorted) {
    if (trade.result === lastResult) {
      count++;
    } else {
      break;
    }
  }

  return { type: lastResult as "WIN" | "LOSS", count };
}

export function calculateBestDay(trades: Trade[]): number {
  const byDay = groupTradesByDay(trades);
  if (Object.keys(byDay).length === 0) return 0;
  return Math.max(
    ...Object.values(byDay).map((dayTrades) => calculateTotalPnL(dayTrades))
  );
}

export function calculateWorstDay(trades: Trade[]): number {
  const byDay = groupTradesByDay(trades);
  if (Object.keys(byDay).length === 0) return 0;
  return Math.min(
    ...Object.values(byDay).map((dayTrades) => calculateTotalPnL(dayTrades))
  );
}

export function calculateDaysTraded(trades: Trade[]): number {
  const days = new Set(trades.map((t) => t.date));
  return days.size;
}

export function groupTradesByDay(
  trades: Trade[]
): Record<string, Trade[]> {
  return trades.reduce(
    (acc, trade) => {
      if (!acc[trade.date]) acc[trade.date] = [];
      acc[trade.date].push(trade);
      return acc;
    },
    {} as Record<string, Trade[]>
  );
}

export function calculateEquityCurve(
  trades: Trade[]
): { date: string; balance: number }[] {
  const byDay = groupTradesByDay(trades);
  const sortedDays = Object.keys(byDay).sort();

  let cumulative = 0;
  return sortedDays.map((date) => {
    const dayPnL = calculateTotalPnL(byDay[date]);
    cumulative += dayPnL;
    return { date, balance: cumulative };
  });
}

export function calculateWinLossByAsset(
  trades: Trade[]
): { asset: string; wins: number; losses: number; pnl: number }[] {
  const assets = ["MES", "MNQ"];
  return assets.map((asset) => {
    const assetTrades = trades.filter((t) => t.asset === asset);
    return {
      asset,
      wins: assetTrades.filter((t) => t.result === "WIN").length,
      losses: assetTrades.filter((t) => t.result === "LOSS").length,
      pnl: calculateTotalPnL(assetTrades),
    };
  });
}

export function calculatePerformanceByHour(
  trades: Trade[]
): { hour: string; wins: number; losses: number; pnl: number }[] {
  const hours: Record<string, { wins: number; losses: number; pnl: number }> = {};

  trades.forEach((t) => {
    const hour = t.entryTime.split(":")[0] + ":00";
    if (!hours[hour]) hours[hour] = { wins: 0, losses: 0, pnl: 0 };
    hours[hour].pnl += t.pnl;
    if (t.result === "WIN") hours[hour].wins++;
    if (t.result === "LOSS") hours[hour].losses++;
  });

  return Object.entries(hours)
    .map(([hour, data]) => ({ hour, ...data }))
    .sort((a, b) => a.hour.localeCompare(b.hour));
}

export function calculatePnLByWeekday(
  trades: Trade[]
): { day: string; pnl: number; trades: number }[] {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const weekdayData: Record<number, { pnl: number; trades: number }> = {};

  trades.forEach((t) => {
    const date = new Date(t.date + "T12:00:00");
    const dow = date.getDay();
    if (!weekdayData[dow]) weekdayData[dow] = { pnl: 0, trades: 0 };
    weekdayData[dow].pnl += t.pnl;
    weekdayData[dow].trades++;
  });

  return [1, 2, 3, 4, 5].map((dow) => ({
    day: days[dow],
    pnl: weekdayData[dow]?.pnl || 0,
    trades: weekdayData[dow]?.trades || 0,
  }));
}

export function getTodayPnL(trades: Trade[]): number {
  const today = new Date().toISOString().split("T")[0];
  const todayTrades = trades.filter((t) => t.date === today);
  return calculateTotalPnL(todayTrades);
}

// Frases motivacionais em português
export const MOTIVATIONAL_QUOTES = [
  "Disciplina não é motivação. É o que você faz quando a motivação vai embora.",
  "O mercado paga quem espera o setup certo, não quem opera mais.",
  "Um loss seguindo o plano vale mais que um win quebrando as regras.",
  "Sua edge só aparece em 100+ trades. Confie no processo.",
  "Amadores operam para ter razão. Profissionais operam para ganhar dinheiro.",
  "Não operar também é uma decisão de trading. Tome ela conscientemente.",
  "2 trades. 2 horas. Esse é o trabalho de hoje.",
  "Se não tem setup, não tem trade. Simples assim.",
  "Proteja o capital. O lucro cuida de si mesmo.",
  "Consistência bate intensidade toda vez.",
  "O funded account é construído um trade disciplinado por vez.",
  "Hoje o objetivo é seguir o plano — não ganhar dinheiro. Seguir o plano.",
  "Cada trade registrado é dado. Cada dado é aprendizado.",
];

export const FOCUS_QUOTES = [
  "Tem setup claro? Então entra. Senão, fecha o app.",
  "Registre com honestidade. Esse dado é só seu.",
  "Foco no processo. O resultado é consequência.",
  "Antes de entrar: setup, stop, alvo. Sem exceção.",
  "Esse trade segue o plano? Se não, não é trade.",
];

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
}

export function getRandomFocusQuote(): string {
  const index = Math.floor(Math.random() * FOCUS_QUOTES.length);
  return FOCUS_QUOTES[index];
}

export function formatCurrency(value: number): string {
  const prefix = value >= 0 ? "+$" : "-$";
  return `${prefix}${Math.abs(value).toFixed(2)}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}
