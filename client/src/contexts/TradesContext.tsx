import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface DaySession {
  id: string;
  date: string;
  startTime: string;
  asset: "MES" | "MNQ";
  sleep: "< 4h" | "4–6h" | "6–8h" | "8h+";
  mood: "Calmo" | "Ansioso" | "Cansado" | "Focado";
  initialBalance: number;
  maxDailyLoss: number;
  dayPlan: string;
  status: "active" | "ended" | "not_started";
}

export interface Trade {
  id: string;
  sessionId: string;
  date: string;
  entryTime: string;
  asset: "MES" | "MNQ";
  direction: "LONG" | "SHORT";
  entryPrice: number;
  stopPrice: number;
  targetPrice: number;
  contracts: number;
  entryReason: string;
  result: "WIN" | "LOSS" | "BREAKEVEN";
  pnl: number;
  followedPlan: boolean;
  errors: string;
  observations: string;
  createdAt: string;
}

interface TradesContextType {
  trades: Trade[];
  sessions: DaySession[];
  addTrade: (trade: Omit<Trade, "id" | "createdAt">) => Trade;
  addSession: (session: Omit<DaySession, "id">) => DaySession;
  updateSession: (id: string, updates: Partial<DaySession>) => void;
  getTodaySession: () => DaySession | undefined;
  getTodayTrades: () => Trade[];
  deleteTrade: (id: string) => void;
  deleteSession: (id: string) => void;
}

const TRADES_KEY = "thedesk_trades";
const SESSIONS_KEY = "thedesk_sessions";

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

const TradesContext = createContext<TradesContextType | null>(null);

export function TradesProvider({ children }: { children: ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>(() =>
    loadFromStorage<Trade>(TRADES_KEY, [])
  );
  const [sessions, setSessions] = useState<DaySession[]>(() =>
    loadFromStorage<DaySession>(SESSIONS_KEY, [])
  );

  useEffect(() => {
    saveToStorage(TRADES_KEY, trades);
  }, [trades]);

  useEffect(() => {
    saveToStorage(SESSIONS_KEY, sessions);
  }, [sessions]);

  const addTrade = useCallback((trade: Omit<Trade, "id" | "createdAt">) => {
    const newTrade: Trade = {
      ...trade,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTrades((prev) => [...prev, newTrade]);
    return newTrade;
  }, []);

  const addSession = useCallback((session: Omit<DaySession, "id">) => {
    const newSession: DaySession = {
      ...session,
      id: crypto.randomUUID(),
    };
    setSessions((prev) => [...prev, newSession]);
    return newSession;
  }, []);

  const updateSession = useCallback(
    (id: string, updates: Partial<DaySession>) => {
      setSessions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );
    },
    []
  );

  const getTodaySession = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return sessions.find((s) => s.date === today);
  }, [sessions]);

  const getTodayTrades = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return trades.filter((t) => t.date === today);
  }, [trades]);

  const deleteTrade = useCallback((id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <TradesContext.Provider
      value={{
        trades,
        sessions,
        addTrade,
        addSession,
        updateSession,
        getTodaySession,
        getTodayTrades,
        deleteTrade,
        deleteSession,
      }}
    >
      {children}
    </TradesContext.Provider>
  );
}

export function useTrades() {
  const context = useContext(TradesContext);
  if (!context) {
    throw new Error("useTrades must be used within a TradesProvider");
  }
  return context;
}
