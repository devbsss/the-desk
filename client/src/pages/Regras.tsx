import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";

const RULES = [
  "Dormi pelo menos 4 horas",
  "Não estou operando logo que acordei",
  "Horário: 1:30 PM – 3:30 PM ET (ou 9:30–11:00 AM)",
  "Ativo: MES (semanas 1 e 2) ou MNQ (semana 3+)",
  "Contratos: máximo 1 por agora",
  "Máximo 2 trades por dia",
  "Se ganhar o 1º trade, posso parar",
  "Se perder 2 trades, o dia acabou",
  "Stop: 5 a 10 pontos (MES = $25–$50)",
  "Alvo: 10 a 20 pontos (MES = $50–$100)",
  "Risco/Retorno mínimo: 1:2",
  "Não estou operando por tédio ou para recuperar loss",
  "Tenho um setup claro — caso contrário, 0 trades",
];

export default function Regras() {
  const [checked, setChecked] = useState<boolean[]>(new Array(RULES.length).fill(false));

  const toggleRule = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const checkedCount = checked.filter(Boolean).length;
  const allChecked = checkedCount === RULES.length;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="animate-fade-in-up">
        <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)] mb-1">
          REGRAS DO DIA
        </h1>
        <p className="font-mono-title text-[11px] text-[var(--text-muted)]">
          Confira cada item antes de abrir posição. Não salva — é só para conferência mental.
        </p>
      </div>

      {/* Progress */}
      <div className="animate-fade-in-up stagger-2">
        <div className="flex items-center justify-between mb-2">
          <span className="td-label !mb-0">Checklist</span>
          <span className={`font-mono-title text-[12px] font-semibold ${allChecked ? "text-[var(--green)]" : "text-[var(--text-muted)]"}`}>
            {checkedCount}/{RULES.length}
          </span>
        </div>
        <div className="h-[3px] bg-[var(--border-color)] overflow-hidden">
          <div
            className="h-full bg-[var(--green)] transition-all duration-300"
            style={{ width: `${(checkedCount / RULES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-1">
        {RULES.map((rule, index) => (
          <button
            key={index}
            onClick={() => toggleRule(index)}
            className={`w-full flex items-start gap-3 p-3 text-left transition-all duration-150 border animate-fade-in-up stagger-${Math.min(index + 1, 8)} ${
              checked[index]
                ? "bg-[var(--green-dim)] border-[var(--green)]"
                : "bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--border-bright)]"
            }`}
          >
            {checked[index] ? (
              <CheckSquare size={15} className="text-[var(--green)] mt-0.5 shrink-0" />
            ) : (
              <Square size={15} className="text-[var(--text-muted)] mt-0.5 shrink-0" />
            )}
            <span
              className={`font-mono-title text-[12px] transition-colors ${
                checked[index] ? "text-[var(--green)]" : "text-[var(--td-accent)]"
              }`}
            >
              {rule}
            </span>
          </button>
        ))}
      </div>

      {/* Objective */}
      <div className="td-card">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="td-label !mb-0">Objetivo</span>
            <span className="font-mono-title text-[13px] text-[var(--text-primary)] font-semibold">
              Passar a avaliação Lucid 25K
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="td-label !mb-0">Prop Firm</span>
            <span className="font-mono-title text-[12px] text-[var(--text-primary)]">
              Lucid Trading
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="td-label !mb-0">Produto</span>
            <span className="font-mono-title text-[12px] text-[var(--text-primary)]">
              MES / MNQ (futuros)
            </span>
          </div>
        </div>
      </div>

      {/* All checked message */}
      {allChecked && (
        <div className="td-card border-[var(--green)]! bg-[var(--green-dim)] text-center animate-fade-in-up">
          <p className="font-mono-title text-[13px] text-[var(--green)] font-semibold">
            CHECKLIST COMPLETA — PRONTO PARA OPERAR
          </p>
        </div>
      )}
    </div>
  );
}
