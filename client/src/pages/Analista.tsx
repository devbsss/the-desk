import { useState, useEffect } from "react";
import { useTrades } from "../contexts/TradesContext";
import { trpc } from "@/lib/trpc";

interface AnalysisResult {
  resumo: string;
  pontos_fortes: string;
  pontos_fracos: string;
  melhor_horario: string;
  melhor_ativo: string;
  padrao_comportamental: string;
  recomendacao_principal: string;
  pronto_para_eval: boolean;
}

const LOADING_TEXTS = [
  "Lendo seus trades...",
  "Analisando padrões de comportamento...",
  "Identificando seu melhor horário...",
  "Cruzando humor com performance...",
  "Preparando relatório...",
];

function buildTradeData(trades: any[], sessions: any[]) {
  const wins = trades.filter((t) => t.result === "WIN");
  const losses = trades.filter((t) => t.result === "LOSS");
  const breakevens = trades.filter((t) => t.result === "BREAKEVEN");
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);

  // Streak
  let streak = 0;
  let streakType = "";
  for (let i = trades.length - 1; i >= 0; i--) {
    if (i === trades.length - 1) {
      streakType = trades[i].result;
      streak = 1;
    } else if (trades[i].result === streakType) {
      streak++;
    } else {
      break;
    }
  }

  // Trades por ativo
  const tradesPorAtivo: Record<string, { total: number; wins: number; losses: number; pnl: number }> = {};
  trades.forEach((t) => {
    if (!tradesPorAtivo[t.asset]) tradesPorAtivo[t.asset] = { total: 0, wins: 0, losses: 0, pnl: 0 };
    tradesPorAtivo[t.asset].total++;
    if (t.result === "WIN") tradesPorAtivo[t.asset].wins++;
    if (t.result === "LOSS") tradesPorAtivo[t.asset].losses++;
    tradesPorAtivo[t.asset].pnl += t.pnl;
  });

  // Trades por horário
  const tradesPorHorario: Record<string, { wins: number; losses: number }> = {};
  trades.forEach((t) => {
    const hour = t.entryTime?.split(":")[0] || "00";
    if (!tradesPorHorario[hour]) tradesPorHorario[hour] = { wins: 0, losses: 0 };
    if (t.result === "WIN") tradesPorHorario[hour].wins++;
    if (t.result === "LOSS") tradesPorHorario[hour].losses++;
  });

  // Trades por dia da semana
  const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const tradesPorDia: Record<string, { wins: number; losses: number }> = {};
  trades.forEach((t) => {
    const day = dayNames[new Date(t.date).getDay()];
    if (!tradesPorDia[day]) tradesPorDia[day] = { wins: 0, losses: 0 };
    if (t.result === "WIN") tradesPorDia[day].wins++;
    if (t.result === "LOSS") tradesPorDia[day].losses++;
  });

  // Trades por humor (from sessions)
  const tradesPorHumor: Record<string, { wins: number; losses: number }> = {};
  trades.forEach((t) => {
    const session = sessions.find((s) => s.id === t.sessionId);
    const mood = session?.mood || "Desconhecido";
    if (!tradesPorHumor[mood]) tradesPorHumor[mood] = { wins: 0, losses: 0 };
    if (t.result === "WIN") tradesPorHumor[mood].wins++;
    if (t.result === "LOSS") tradesPorHumor[mood].losses++;
  });

  // Trades por sono
  const tradesPorSono: Record<string, { wins: number; losses: number }> = {};
  trades.forEach((t) => {
    const session = sessions.find((s) => s.id === t.sessionId);
    const sleep = session?.sleep || "Desconhecido";
    if (!tradesPorSono[sleep]) tradesPorSono[sleep] = { wins: 0, losses: 0 };
    if (t.result === "WIN") tradesPorSono[sleep].wins++;
    if (t.result === "LOSS") tradesPorSono[sleep].losses++;
  });

  // Seguiu plano
  const seguiuPlano: Record<string, { total: number; wins: number }> = {
    sim: { total: 0, wins: 0 },
    nao: { total: 0, wins: 0 },
  };
  trades.forEach((t) => {
    const key = t.followedPlan ? "sim" : "nao";
    seguiuPlano[key].total++;
    if (t.result === "WIN") seguiuPlano[key].wins++;
  });

  // Dias operados
  const uniqueDays = new Set(trades.map((t) => t.date));

  // Histórico diário (últimos 30)
  const dailyMap: Record<string, { pnl: number; trades: number; humor: string; sono: string }> = {};
  trades.forEach((t) => {
    if (!dailyMap[t.date]) {
      const session = sessions.find((s) => s.date === t.date);
      dailyMap[t.date] = { pnl: 0, trades: 0, humor: session?.mood || "", sono: session?.sleep || "" };
    }
    dailyMap[t.date].pnl += t.pnl;
    dailyMap[t.date].trades++;
  });
  const historicoDiario = Object.entries(dailyMap)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 30)
    .map(([data, d]) => ({ data, ...d }));

  return {
    total_trades: trades.length,
    wins: wins.length,
    losses: losses.length,
    breakevens: breakevens.length,
    win_rate: trades.length > 0 ? `${Math.round((wins.length / trades.length) * 100)}%` : "0%",
    pnl_total: totalPnl,
    maior_win: wins.length > 0 ? Math.max(...wins.map((t) => t.pnl)) : 0,
    maior_loss: losses.length > 0 ? Math.min(...losses.map((t) => t.pnl)) : 0,
    media_por_trade: trades.length > 0 ? Math.round(totalPnl / trades.length) : 0,
    streak_atual: streak > 0 ? `${streak} ${streakType === "WIN" ? "wins" : streakType === "LOSS" ? "losses" : "breakevens"} seguidos` : "Nenhum",
    trades_por_ativo: tradesPorAtivo,
    trades_por_horario: tradesPorHorario,
    trades_por_dia_semana: tradesPorDia,
    trades_por_humor: tradesPorHumor,
    trades_por_sono: tradesPorSono,
    seguiu_plano: seguiuPlano,
    dias_operados: uniqueDays.size,
    historico_diario: historicoDiario,
  };
}

export default function Analista() {
  const { trades, sessions } = useTrades();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);

  const generateMutation = trpc.analysis.generate.useMutation({
    onSuccess: (data) => {
      setAnalysis(data as AnalysisResult);
      const now = new Date().toISOString();
      setGeneratedAt(now);
      localStorage.setItem("thedesk_analysis", JSON.stringify(data));
      localStorage.setItem("thedesk_analysis_at", now);
      localStorage.setItem("thedesk_analysis_trades_count", String(trades.length));
    },
  });

  // Load cached analysis
  useEffect(() => {
    const cached = localStorage.getItem("thedesk_analysis");
    const cachedAt = localStorage.getItem("thedesk_analysis_at");
    if (cached && cachedAt) {
      try {
        setAnalysis(JSON.parse(cached));
        setGeneratedAt(cachedAt);
      } catch { /* ignore */ }
    }
  }, []);

  // Rotate loading text
  useEffect(() => {
    if (!generateMutation.isPending) return;
    const interval = setInterval(() => {
      setLoadingTextIdx((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [generateMutation.isPending]);

  const handleGenerate = () => {
    const tradeData = buildTradeData(trades, sessions);
    generateMutation.mutate({ tradeData });
  };

  const hasEnoughTrades = trades.length >= 5;

  // Loading state
  if (generateMutation.isPending) {
    return (
      <div className="animate-fade-in-up">
        <header className="mb-8">
          <h1 className="font-mono-title text-xl font-semibold text-[var(--text-primary)] tracking-tight">
            ANALISTA PESSOAL
          </h1>
          <p className="text-[12px] text-[var(--text-secondary)] mt-1 font-mono-title">
            Baseado nos seus dados reais de trading
          </p>
        </header>

        <div className="flex flex-col items-center justify-center py-20">
          <div className="flex gap-1 mb-6">
            <span className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-[var(--text-primary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] font-mono-title animate-pulse">
            {LOADING_TEXTS[loadingTextIdx]}
          </p>
        </div>
      </div>
    );
  }

  // Result state
  if (analysis) {
    return (
      <div className="animate-fade-in-up">
        <header className="mb-8">
          <h1 className="font-mono-title text-xl font-semibold text-[var(--text-primary)] tracking-tight">
            ANALISTA PESSOAL
          </h1>
          <p className="text-[12px] text-[var(--text-secondary)] mt-1 font-mono-title">
            Baseado nos seus dados reais de trading
          </p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5 font-mono-title italic">
            "Dados não mentem. Ego sim."
          </p>
        </header>

        {/* Seção 1 — Resumo Executivo */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-bright)] p-5 mb-5 relative">
          <div className="absolute top-3 right-3">
            {analysis.pronto_para_eval ? (
              <span className="text-[10px] font-mono-title font-semibold text-[#26A69A] bg-[#26A69A]/10 px-2 py-1 border border-[#26A69A]/30">
                PRONTO PARA EVAL ✓
              </span>
            ) : (
              <span className="text-[10px] font-mono-title font-semibold text-[#EF5350] bg-[#EF5350]/10 px-2 py-1 border border-[#EF5350]/30">
                AINDA NÃO ✗
              </span>
            )}
          </div>
          <h2 className="text-[11px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-3">
            Resumo Executivo
          </h2>
          <p className="text-[13px] text-[var(--text-primary)] font-sans leading-relaxed pr-24">
            {analysis.resumo}
          </p>
        </div>

        {/* Seção 2 — Pontos Fortes vs Fracos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#26A69A] text-lg">↑</span>
              <h3 className="text-[11px] text-[#26A69A] font-mono-title uppercase tracking-wider font-semibold">
                Pontos Fortes
              </h3>
            </div>
            <p className="text-[12px] text-[var(--text-secondary)] font-sans leading-relaxed">
              {analysis.pontos_fortes}
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#EF5350] text-lg">↓</span>
              <h3 className="text-[11px] text-[#EF5350] font-mono-title uppercase tracking-wider font-semibold">
                Pontos Fracos
              </h3>
            </div>
            <p className="text-[12px] text-[var(--text-secondary)] font-sans leading-relaxed">
              {analysis.pontos_fracos}
            </p>
          </div>
        </div>

        {/* Seção 3 — Dados Cruzados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-4">
            <h4 className="text-[10px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-2">
              Melhor Horário
            </h4>
            <p className="text-[16px] text-[var(--text-primary)] font-mono-title font-semibold">
              {analysis.melhor_horario}
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-4">
            <h4 className="text-[10px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-2">
              Melhor Ativo
            </h4>
            <p className="text-[16px] text-[var(--text-primary)] font-mono-title font-semibold">
              {analysis.melhor_ativo}
            </p>
          </div>
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-4 sm:col-span-2 lg:col-span-1">
            <h4 className="text-[10px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-2">
              Seguiu o Plano
            </h4>
            <div className="flex gap-3">
              {Object.entries(buildTradeData(trades, sessions).seguiu_plano).map(([key, val]: [string, any]) => (
                <div key={key} className="text-center">
                  <p className="text-[14px] font-mono-title font-semibold text-[var(--text-primary)]">
                    {val.total > 0 ? Math.round((val.wins / val.total) * 100) : 0}%
                  </p>
                  <p className="text-[9px] text-[var(--text-muted)] font-mono-title uppercase">
                    {key === "sim" ? "Seguiu" : "Não seguiu"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seção 4 — Padrão Comportamental */}
        <div className={`border-l-4 p-5 mb-5 bg-[var(--bg-surface)] ${analysis.pronto_para_eval ? "border-l-[#26A69A]" : "border-l-[#EF5350]"}`}>
          <h3 className="text-[11px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-3">
            Padrão Comportamental
          </h3>
          <p className="text-[13px] text-[var(--text-primary)] font-sans leading-relaxed font-medium">
            {analysis.padrao_comportamental}
          </p>
        </div>

        {/* Seção 5 — Recomendação Principal */}
        <div className="bg-[#0F0F0F] border border-[var(--border-bright)] p-6 mb-5">
          <h3 className="text-[11px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-3">
            Recomendação Principal
          </h3>
          <p className="text-[15px] text-[var(--text-primary)] font-sans leading-relaxed">
            {analysis.recomendacao_principal}
          </p>
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
          <div>
            <p className="text-[10px] text-[var(--text-muted)] font-mono-title">
              Gerado em {generatedAt ? new Date(generatedAt).toLocaleString("pt-BR") : "—"}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] font-mono-title">
              Baseado em {trades.length} trades registrados
            </p>
          </div>
          <button
            onClick={handleGenerate}
            className="text-[11px] font-mono-title text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] px-3 py-1.5 transition-colors"
          >
            ↻ ATUALIZAR ANÁLISE
          </button>
        </div>
      </div>
    );
  }

  // Initial state
  return (
    <div className="animate-fade-in-up">
      <header className="mb-8">
        <h1 className="font-mono-title text-xl font-semibold text-[var(--text-primary)] tracking-tight">
          ANALISTA PESSOAL
        </h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-1 font-mono-title">
          Baseado nos seus dados reais de trading
        </p>
        <p className="text-[10px] text-[var(--text-muted)] mt-0.5 font-mono-title italic">
          "Dados não mentem. Ego sim."
        </p>
      </header>

      <div className="flex flex-col items-center justify-center py-16 bg-[var(--bg-surface)] border border-[var(--border-color)]">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--text-muted)] mb-4">
          <path d="M3 3v18h18" />
          <path d="M7 16l4-4 4 4 5-5" />
        </svg>
        <p className="text-[13px] text-[var(--text-secondary)] font-mono-title mb-2">
          Você tem <span className="text-[var(--text-primary)] font-semibold">{trades.length}</span> trades registrados.
        </p>
        {!hasEnoughTrades && (
          <p className="text-[11px] text-[#FFB74D] font-mono-title mb-4 px-4 py-2 bg-[#FFB74D]/10 border border-[#FFB74D]/20">
            Registre pelo menos 5 trades para uma análise significativa.
          </p>
        )}
        {hasEnoughTrades && (
          <p className="text-[11px] text-[var(--text-muted)] font-mono-title mb-4">
            Clique para gerar sua análise personalizada.
          </p>
        )}
        <button
          onClick={handleGenerate}
          disabled={!hasEnoughTrades}
          className={`font-mono-title text-[12px] font-semibold tracking-wide px-6 py-3 transition-all duration-150 active:scale-[0.97] ${
            hasEnoughTrades
              ? "bg-[var(--text-primary)] text-[#000000] hover:opacity-90"
              : "bg-[var(--bg-elevated)] text-[var(--text-muted)] cursor-not-allowed"
          }`}
        >
          ⚡ GERAR ANÁLISE
        </button>

        {generateMutation.isError && (
          <p className="text-[11px] text-[#EF5350] font-mono-title mt-3">
            Erro ao gerar análise. Tente novamente.
          </p>
        )}
      </div>
    </div>
  );
}
