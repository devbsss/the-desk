import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useTrades } from "@/contexts/TradesContext";
import { getTodayPnL, getRandomFocusQuote } from "@/lib/trading";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const focusQuote = getRandomFocusQuote();

export default function NovoTrade() {
  const { trades, addTrade, addSession, getTodaySession, getTodayTrades, updateSession } = useTrades();
  const [, navigate] = useLocation();

  const todaySession = getTodaySession();
  const todayTrades = getTodayTrades();
  const todayPnL = getTodayPnL(trades);

  // Session form state
  const [sessionForm, setSessionForm] = useState(() => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return {
      date: now.toISOString().split("T")[0],
      startTime: `${hh}:${mm}`,
      asset: "MES" as "MES" | "MNQ",
      sleep: "6–8h" as "< 4h" | "4–6h" | "6–8h" | "8h+",
      mood: "Focado" as "Calmo" | "Ansioso" | "Cansado" | "Focado",
      initialBalance: 0,
      maxDailyLoss: 100,
      dayPlan: "",
    };
  });

  // Trade form state
  const [tradeForm, setTradeForm] = useState({
    entryTime: "",
    direction: "LONG" as "LONG" | "SHORT",
    entryPrice: 0,
    stopPrice: 0,
    targetPrice: 0,
    contracts: 1,
    entryReason: "",
    result: "WIN" as "WIN" | "LOSS" | "BREAKEVEN",
    pnl: 0,
    followedPlan: true,
    errors: "",
    observations: "",
  });

  const isDayEnded = useMemo(() => {
    if (!todaySession) return false;
    if (todaySession.status === "ended") return true;
    if (todayTrades.length >= 2) return true;
    if (todaySession.maxDailyLoss && Math.abs(todayPnL) >= todaySession.maxDailyLoss && todayPnL < 0) return true;
    return false;
  }, [todaySession, todayTrades, todayPnL]);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    addSession({
      ...sessionForm,
      status: "active",
    });
    toast.success("Sessão do dia criada com sucesso!");
  };

  const handleSubmitTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todaySession) return;

    addTrade({
      sessionId: todaySession.id,
      date: todaySession.date,
      asset: todaySession.asset,
      entryTime: tradeForm.entryTime,
      direction: tradeForm.direction,
      entryPrice: tradeForm.entryPrice,
      stopPrice: tradeForm.stopPrice,
      targetPrice: tradeForm.targetPrice,
      contracts: tradeForm.contracts,
      entryReason: tradeForm.entryReason,
      result: tradeForm.result,
      pnl: tradeForm.result === "LOSS" ? -Math.abs(tradeForm.pnl) : Math.abs(tradeForm.pnl),
      followedPlan: tradeForm.followedPlan,
      errors: tradeForm.errors,
      observations: tradeForm.observations,
    });

    const newPnL = todayPnL + (tradeForm.result === "LOSS" ? -Math.abs(tradeForm.pnl) : Math.abs(tradeForm.pnl));
    const newTradeCount = todayTrades.length + 1;

    if (newTradeCount >= 2 || (todaySession.maxDailyLoss && Math.abs(newPnL) >= todaySession.maxDailyLoss && newPnL < 0)) {
      updateSession(todaySession.id, { status: "ended" });
      toast.error("DIA ENCERRADO — Limite atingido");
    } else {
      toast.success("Trade registrado com sucesso!");
    }

    navigate("/");
  };

  const inputClass = "td-input";
  const labelClass = "td-label";

  // If day is ended
  if (isDayEnded && todaySession) {
    return (
      <div className="space-y-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-[12px] font-mono-title transition-colors">
            <ArrowLeft size={14} />
            VOLTAR
          </button>
        </Link>
        <div className="td-card border-[var(--red)]! p-8 text-center animate-fade-in-up">
          <div className="text-[var(--red)] text-lg font-semibold font-mono-title mb-2">
            DIA ENCERRADO
          </div>
          <p className="font-sans-body text-[13px] text-[var(--text-secondary)]">
            {todayTrades.length >= 2
              ? "Máximo de 2 trades atingido."
              : "Limite de loss diário atingido."}
          </p>
          <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-4">
            Descanse. Amanhã é um novo dia.
          </p>
        </div>
      </div>
    );
  }

  // If no session today
  if (!todaySession) {
    return (
      <div className="space-y-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-[12px] font-mono-title transition-colors">
            <ArrowLeft size={14} />
            VOLTAR
          </button>
        </Link>

        <div className="animate-fade-in-up">
          <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)] mb-1">
            INICIAR SESSÃO
          </h1>
          <p className="font-mono-title text-[11px] text-[var(--text-muted)] mb-6">
            Preencha antes de começar a operar.
          </p>

          <form onSubmit={handleCreateSession} className="space-y-4 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Data</label>
                <input
                  type="date"
                  value={sessionForm.date}
                  onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Horário Início</label>
                <input
                  type="time"
                  value={sessionForm.startTime}
                  onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Ativo</label>
                <select
                  value={sessionForm.asset}
                  onChange={(e) => setSessionForm({ ...sessionForm, asset: e.target.value as "MES" | "MNQ" })}
                  className={inputClass}
                >
                  <option value="MES">MES</option>
                  <option value="MNQ">MNQ</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Sono</label>
                <select
                  value={sessionForm.sleep}
                  onChange={(e) => setSessionForm({ ...sessionForm, sleep: e.target.value as any })}
                  className={inputClass}
                >
                  <option value="< 4h">{"< 4h"}</option>
                  <option value="4–6h">4–6h</option>
                  <option value="6–8h">6–8h</option>
                  <option value="8h+">8h+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Humor</label>
                <select
                  value={sessionForm.mood}
                  onChange={(e) => setSessionForm({ ...sessionForm, mood: e.target.value as any })}
                  className={inputClass}
                >
                  <option value="Calmo">Calmo</option>
                  <option value="Ansioso">Ansioso</option>
                  <option value="Cansado">Cansado</option>
                  <option value="Focado">Focado</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Saldo Inicial ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={sessionForm.initialBalance || ""}
                  onChange={(e) => setSessionForm({ ...sessionForm, initialBalance: parseFloat(e.target.value) || 0 })}
                  className={inputClass}
                  placeholder="25000"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Loss Máximo do Dia ($)</label>
              <input
                type="number"
                step="0.01"
                value={sessionForm.maxDailyLoss || ""}
                onChange={(e) => setSessionForm({ ...sessionForm, maxDailyLoss: parseFloat(e.target.value) || 0 })}
                className={`${inputClass} max-w-[200px]`}
                placeholder="100"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Plano do Dia</label>
              <textarea
                value={sessionForm.dayPlan}
                onChange={(e) => setSessionForm({ ...sessionForm, dayPlan: e.target.value })}
                className={`${inputClass} min-h-[80px] resize-none`}
                placeholder="Descreva seu plano para hoje..."
              />
            </div>

            <button
              type="submit"
              className="td-btn w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-base)] hover:bg-[var(--white)]"
            >
              INICIAR SESSÃO
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Trade form
  return (
    <div className="space-y-6">
      <Link href="/">
        <button className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-[12px] font-mono-title transition-colors">
          <ArrowLeft size={14} />
          VOLTAR
        </button>
      </Link>

      <div className="animate-fade-in-up">
        <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)] mb-1">
          REGISTRAR TRADE
        </h1>
        <p className="font-mono-title text-[11px] text-[var(--text-secondary)] mb-1">
          Trade {todayTrades.length + 1} de 2 · {todaySession.asset}
        </p>
        <p className="font-mono-title text-[10px] text-[var(--text-muted)] mb-2">
          Sessão: {todaySession.date} · Humor: {todaySession.mood} · Sono: {todaySession.sleep}
        </p>
        <p className="font-sans-body text-[12px] text-[var(--text-secondary)] italic mb-6">
          "{focusQuote}"
        </p>

        <form onSubmit={handleSubmitTrade} className="space-y-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Horário Entrada</label>
              <input
                type="time"
                value={tradeForm.entryTime}
                onChange={(e) => setTradeForm({ ...tradeForm, entryTime: e.target.value })}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Direção</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTradeForm({ ...tradeForm, direction: "LONG" })}
                  className={`flex-1 py-2.5 text-[12px] font-semibold font-mono-title border transition-colors ${
                    tradeForm.direction === "LONG"
                      ? "bg-[var(--green-dim)] border-[var(--green)] text-[var(--green)]"
                      : "bg-[var(--bg-base)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-bright)]"
                  }`}
                >
                  LONG
                </button>
                <button
                  type="button"
                  onClick={() => setTradeForm({ ...tradeForm, direction: "SHORT" })}
                  className={`flex-1 py-2.5 text-[12px] font-semibold font-mono-title border transition-colors ${
                    tradeForm.direction === "SHORT"
                      ? "bg-[var(--red-dim)] border-[var(--red)] text-[var(--red)]"
                      : "bg-[var(--bg-base)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-bright)]"
                  }`}
                >
                  SHORT
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Entrada</label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.entryPrice || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, entryPrice: parseFloat(e.target.value) || 0 })}
                className={inputClass}
                placeholder="5450.00"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Stop</label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.stopPrice || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, stopPrice: parseFloat(e.target.value) || 0 })}
                className={inputClass}
                placeholder="5445.00"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Alvo</label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.targetPrice || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, targetPrice: parseFloat(e.target.value) || 0 })}
                className={inputClass}
                placeholder="5460.00"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Contratos</label>
            <input
              type="number"
              min="1"
              value={tradeForm.contracts}
              onChange={(e) => setTradeForm({ ...tradeForm, contracts: parseInt(e.target.value) || 1 })}
              className={`${inputClass} max-w-[120px]`}
            />
          </div>

          <div>
            <label className={labelClass}>Motivo da Entrada</label>
            <textarea
              value={tradeForm.entryReason}
              onChange={(e) => setTradeForm({ ...tradeForm, entryReason: e.target.value })}
              className={`${inputClass} min-h-[60px] resize-none`}
              placeholder="Descreva o setup e motivo da entrada..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Resultado</label>
              <div className="flex gap-2">
                {(["WIN", "LOSS", "BREAKEVEN"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTradeForm({ ...tradeForm, result: r })}
                    className={`flex-1 py-2 text-[11px] font-semibold font-mono-title border transition-colors ${
                      tradeForm.result === r
                        ? r === "WIN"
                          ? "bg-[var(--green-dim)] border-[var(--green)] text-[var(--green)]"
                          : r === "LOSS"
                          ? "bg-[var(--red-dim)] border-[var(--red)] text-[var(--red)]"
                          : "bg-[rgba(100,100,100,0.1)] border-[var(--text-muted)] text-[var(--text-muted)]"
                        : "bg-[var(--bg-base)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-bright)]"
                    }`}
                  >
                    {r === "BREAKEVEN" ? "BE" : r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>P&L ($)</label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.pnl || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, pnl: parseFloat(e.target.value) || 0 })}
                className={inputClass}
                placeholder="50.00"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Seguiu o Plano?</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTradeForm({ ...tradeForm, followedPlan: true })}
                className={`px-5 py-2 text-[12px] font-mono-title font-medium border transition-colors ${
                  tradeForm.followedPlan
                    ? "bg-[var(--green-dim)] border-[var(--green)] text-[var(--green)]"
                    : "bg-[var(--bg-base)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-bright)]"
                }`}
              >
                SIM
              </button>
              <button
                type="button"
                onClick={() => setTradeForm({ ...tradeForm, followedPlan: false })}
                className={`px-5 py-2 text-[12px] font-mono-title font-medium border transition-colors ${
                  !tradeForm.followedPlan
                    ? "bg-[var(--red-dim)] border-[var(--red)] text-[var(--red)]"
                    : "bg-[var(--bg-base)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-bright)]"
                }`}
              >
                NÃO
              </button>
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Erros Cometidos <span className="text-[var(--text-muted)]">(opcional)</span>
            </label>
            <textarea
              value={tradeForm.errors}
              onChange={(e) => setTradeForm({ ...tradeForm, errors: e.target.value })}
              className={`${inputClass} min-h-[60px] resize-none`}
              placeholder="O que fiz de errado?"
            />
          </div>

          <div>
            <label className={labelClass}>
              Observações <span className="text-[var(--text-muted)]">(opcional)</span>
            </label>
            <textarea
              value={tradeForm.observations}
              onChange={(e) => setTradeForm({ ...tradeForm, observations: e.target.value })}
              className={`${inputClass} min-h-[60px] resize-none`}
              placeholder="Notas adicionais..."
            />
          </div>

          <button
            type="submit"
            className="td-btn w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-base)] hover:bg-[var(--white)]"
          >
            SALVAR TRADE
          </button>
        </form>
      </div>
    </div>
  );
}
