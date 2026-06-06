import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useTrades } from "@/contexts/TradesContext";
import { getTodayPnL } from "@/lib/trading";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NovoTrade() {
  const { trades, sessions, addTrade, addSession, getTodaySession, getTodayTrades, updateSession } = useTrades();
  const [, navigate] = useLocation();

  const todaySession = getTodaySession();
  const todayTrades = getTodayTrades();
  const todayPnL = getTodayPnL(trades);

  // Session form state
  const [sessionForm, setSessionForm] = useState({
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    asset: "MES" as "MES" | "MNQ",
    sleep: "6–8h" as "< 4h" | "4–6h" | "6–8h" | "8h+",
    mood: "Focado" as "Calmo" | "Ansioso" | "Cansado" | "Focado",
    initialBalance: 0,
    maxDailyLoss: 100,
    dayPlan: "",
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

    // Check if day should end
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

  // If day is ended, show message
  if (isDayEnded && todaySession) {
    return (
      <div className="space-y-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-[#666666] hover:text-[#999999] text-[13px] font-['JetBrains_Mono'] transition-colors">
            <ArrowLeft size={14} />
            Voltar ao Dashboard
          </button>
        </Link>
        <div className="bg-[#0D0D0D] border border-[#EF5350]/30 rounded-md p-8 text-center animate-fade-in">
          <div className="text-[#EF5350] text-lg font-bold font-['Space_Mono'] mb-2">
            DIA ENCERRADO
          </div>
          <p className="text-[#666666] text-[13px] font-['JetBrains_Mono']">
            {todayTrades.length >= 2
              ? "Máximo de 2 trades atingido."
              : "Limite de loss diário atingido."}
          </p>
          <p className="text-[#444444] text-[11px] font-['JetBrains_Mono'] mt-4">
            Descanse. Amanhã é um novo dia.
          </p>
        </div>
      </div>
    );
  }

  // If no session today, show session form
  if (!todaySession) {
    return (
      <div className="space-y-6">
        <Link href="/">
          <button className="flex items-center gap-2 text-[#666666] hover:text-[#999999] text-[13px] font-['JetBrains_Mono'] transition-colors">
            <ArrowLeft size={14} />
            Voltar ao Dashboard
          </button>
        </Link>

        <div className="animate-fade-in">
          <h1 className="text-lg font-bold font-['Space_Mono'] text-[#E8E8E8] mb-1">
            Iniciar Sessão do Dia
          </h1>
          <p className="text-[12px] text-[#666666] font-['JetBrains_Mono'] mb-6">
            Preencha antes de começar a operar.
          </p>

          <form onSubmit={handleCreateSession} className="space-y-4 max-w-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                  Data
                </label>
                <input
                  type="date"
                  value={sessionForm.date}
                  onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                  Horário Início
                </label>
                <input
                  type="time"
                  value={sessionForm.startTime}
                  onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                  Ativo
                </label>
                <select
                  value={sessionForm.asset}
                  onChange={(e) => setSessionForm({ ...sessionForm, asset: e.target.value as "MES" | "MNQ" })}
                  className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                >
                  <option value="MES">MES</option>
                  <option value="MNQ">MNQ</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                  Sono
                </label>
                <select
                  value={sessionForm.sleep}
                  onChange={(e) => setSessionForm({ ...sessionForm, sleep: e.target.value as any })}
                  className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
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
                <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                  Humor
                </label>
                <select
                  value={sessionForm.mood}
                  onChange={(e) => setSessionForm({ ...sessionForm, mood: e.target.value as any })}
                  className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                >
                  <option value="Calmo">Calmo</option>
                  <option value="Ansioso">Ansioso</option>
                  <option value="Cansado">Cansado</option>
                  <option value="Focado">Focado</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                  Saldo Inicial ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={sessionForm.initialBalance || ""}
                  onChange={(e) => setSessionForm({ ...sessionForm, initialBalance: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                  placeholder="25000"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Loss Máximo do Dia ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={sessionForm.maxDailyLoss || ""}
                onChange={(e) => setSessionForm({ ...sessionForm, maxDailyLoss: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors max-w-[200px]"
                placeholder="100"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Plano do Dia
              </label>
              <textarea
                value={sessionForm.dayPlan}
                onChange={(e) => setSessionForm({ ...sessionForm, dayPlan: e.target.value })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors min-h-[80px] resize-none"
                placeholder="Descreva seu plano para hoje..."
              />
            </div>

            <button
              type="submit"
              className="bg-[#E8E8E8] text-[#000000] font-['Space_Mono'] font-bold text-sm px-6 py-3 rounded-md hover:bg-[#FFFFFF] active:scale-[0.97] transition-all duration-150 w-full sm:w-auto"
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
        <button className="flex items-center gap-2 text-[#666666] hover:text-[#999999] text-[13px] font-['JetBrains_Mono'] transition-colors">
          <ArrowLeft size={14} />
          Voltar ao Dashboard
        </button>
      </Link>

      <div className="animate-fade-in">
        <h1 className="text-lg font-bold font-['Space_Mono'] text-[#E8E8E8] mb-1">
          Registrar Trade
        </h1>
        <p className="text-[12px] text-[#666666] font-['JetBrains_Mono'] mb-1">
          Trade {todayTrades.length + 1} de 2 • {todaySession.asset}
        </p>
        <p className="text-[11px] text-[#444444] font-['JetBrains_Mono'] mb-6">
          Sessão: {todaySession.date} • Humor: {todaySession.mood} • Sono: {todaySession.sleep}
        </p>

        <form onSubmit={handleSubmitTrade} className="space-y-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Horário Entrada
              </label>
              <input
                type="time"
                value={tradeForm.entryTime}
                onChange={(e) => setTradeForm({ ...tradeForm, entryTime: e.target.value })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Direção
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTradeForm({ ...tradeForm, direction: "LONG" })}
                  className={`flex-1 py-2.5 rounded-md text-[12px] font-bold font-['Space_Mono'] border transition-colors ${
                    tradeForm.direction === "LONG"
                      ? "bg-[#26A69A]/10 border-[#26A69A] text-[#26A69A]"
                      : "bg-[#0D0D0D] border-[#1E1E1E] text-[#666666] hover:border-[#2A2A2A]"
                  }`}
                >
                  LONG
                </button>
                <button
                  type="button"
                  onClick={() => setTradeForm({ ...tradeForm, direction: "SHORT" })}
                  className={`flex-1 py-2.5 rounded-md text-[12px] font-bold font-['Space_Mono'] border transition-colors ${
                    tradeForm.direction === "SHORT"
                      ? "bg-[#EF5350]/10 border-[#EF5350] text-[#EF5350]"
                      : "bg-[#0D0D0D] border-[#1E1E1E] text-[#666666] hover:border-[#2A2A2A]"
                  }`}
                >
                  SHORT
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Entrada
              </label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.entryPrice || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, entryPrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                placeholder="5450.00"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Stop
              </label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.stopPrice || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, stopPrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                placeholder="5445.00"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Alvo
              </label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.targetPrice || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, targetPrice: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                placeholder="5460.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
              Contratos
            </label>
            <input
              type="number"
              min="1"
              value={tradeForm.contracts}
              onChange={(e) => setTradeForm({ ...tradeForm, contracts: parseInt(e.target.value) || 1 })}
              className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors max-w-[120px]"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
              Motivo da Entrada
            </label>
            <textarea
              value={tradeForm.entryReason}
              onChange={(e) => setTradeForm({ ...tradeForm, entryReason: e.target.value })}
              className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors min-h-[60px] resize-none"
              placeholder="Descreva o setup e motivo da entrada..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                Resultado
              </label>
              <div className="flex gap-2">
                {(["WIN", "LOSS", "BREAKEVEN"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTradeForm({ ...tradeForm, result: r })}
                    className={`flex-1 py-2 rounded-md text-[11px] font-bold font-['Space_Mono'] border transition-colors ${
                      tradeForm.result === r
                        ? r === "WIN"
                          ? "bg-[#26A69A]/10 border-[#26A69A] text-[#26A69A]"
                          : r === "LOSS"
                          ? "bg-[#EF5350]/10 border-[#EF5350] text-[#EF5350]"
                          : "bg-[#666666]/10 border-[#666666] text-[#666666]"
                        : "bg-[#0D0D0D] border-[#1E1E1E] text-[#444444] hover:border-[#2A2A2A]"
                    }`}
                  >
                    {r === "BREAKEVEN" ? "BE" : r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
                P&L ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={tradeForm.pnl || ""}
                onChange={(e) => setTradeForm({ ...tradeForm, pnl: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors"
                placeholder="50.00"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
              Seguiu o Plano?
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTradeForm({ ...tradeForm, followedPlan: true })}
                className={`px-4 py-2 rounded-md text-[12px] font-['JetBrains_Mono'] border transition-colors ${
                  tradeForm.followedPlan
                    ? "bg-[#26A69A]/10 border-[#26A69A] text-[#26A69A]"
                    : "bg-[#0D0D0D] border-[#1E1E1E] text-[#666666] hover:border-[#2A2A2A]"
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => setTradeForm({ ...tradeForm, followedPlan: false })}
                className={`px-4 py-2 rounded-md text-[12px] font-['JetBrains_Mono'] border transition-colors ${
                  !tradeForm.followedPlan
                    ? "bg-[#EF5350]/10 border-[#EF5350] text-[#EF5350]"
                    : "bg-[#0D0D0D] border-[#1E1E1E] text-[#666666] hover:border-[#2A2A2A]"
                }`}
              >
                Não
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
              Erros Cometidos <span className="text-[#444444]">(opcional)</span>
            </label>
            <textarea
              value={tradeForm.errors}
              onChange={(e) => setTradeForm({ ...tradeForm, errors: e.target.value })}
              className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors min-h-[60px] resize-none"
              placeholder="O que fiz de errado?"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono'] mb-1.5">
              Observações <span className="text-[#444444]">(opcional)</span>
            </label>
            <textarea
              value={tradeForm.observations}
              onChange={(e) => setTradeForm({ ...tradeForm, observations: e.target.value })}
              className="w-full bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2.5 text-[13px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none transition-colors min-h-[60px] resize-none"
              placeholder="Notas adicionais..."
            />
          </div>

          <button
            type="submit"
            className="bg-[#E8E8E8] text-[#000000] font-['Space_Mono'] font-bold text-sm px-6 py-3 rounded-md hover:bg-[#FFFFFF] active:scale-[0.97] transition-all duration-150 w-full sm:w-auto"
          >
            SALVAR TRADE
          </button>
        </form>
      </div>
    </div>
  );
}
