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

export function getTodayPnL(trades: Trade[]): number {
  const today = new Date().toISOString().split("T")[0];
  const todayTrades = trades.filter((t) => t.date === today);
  return calculateTotalPnL(todayTrades);
}

export const MOTIVATIONAL_QUOTES = [
  "Discipline is the bridge between goals and accomplishment.",
  "The market rewards patience and punishes emotion.",
  "You don't need to trade every day. You need to trade the right setups.",
  "A loss following the plan is better than a win breaking the rules.",
  "The funded account is built one disciplined trade at a time.",
  "Not trading IS a trading decision. Make it deliberately.",
  "Protect the downside. The upside takes care of itself.",
  "Your edge is only visible over 100+ trades. Trust the process.",
  "Amateurs trade to be right. Pros trade to make money.",
  "2 trades. 2 hours. That's the job today.",
  "If there's no setup, there's no trade. Simple.",
  "The goal today: follow the plan. Not make money — follow the plan.",
  "Consistency beats intensity every time.",
];

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
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
