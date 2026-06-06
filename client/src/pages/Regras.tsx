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
      <div className="animate-fade-in">
        <h1 className="text-lg font-bold font-['Space_Mono'] text-[#E8E8E8] mb-1">
          Regras do Dia
        </h1>
        <p className="text-[12px] text-[#666666] font-['JetBrains_Mono']">
          Confira cada item antes de abrir posição. Não salva — é só para conferência mental.
        </p>
      </div>

      {/* Progress */}
      <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[#666666] font-['JetBrains_Mono'] uppercase tracking-wider">
            Checklist
          </span>
          <span className={`text-[12px] font-['Space_Mono'] font-bold ${allChecked ? "text-[#26A69A]" : "text-[#666666]"}`}>
            {checkedCount}/{RULES.length}
          </span>
        </div>
        <div className="h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#26A69A] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${(checkedCount / RULES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-1 animate-fade-in" style={{ animationDelay: "100ms" }}>
        {RULES.map((rule, index) => (
          <button
            key={index}
            onClick={() => toggleRule(index)}
            className={`w-full flex items-start gap-3 p-3 rounded-md text-left transition-all duration-150 border ${
              checked[index]
                ? "bg-[#26A69A]/5 border-[#26A69A]/20"
                : "bg-[#0D0D0D] border-[#1E1E1E] hover:border-[#2A2A2A]"
            }`}
          >
            {checked[index] ? (
              <CheckSquare size={16} className="text-[#26A69A] mt-0.5 shrink-0" />
            ) : (
              <Square size={16} className="text-[#444444] mt-0.5 shrink-0" />
            )}
            <span
              className={`text-[13px] font-['JetBrains_Mono'] transition-colors ${
                checked[index] ? "text-[#26A69A]" : "text-[#C8C8C8]"
              }`}
            >
              {rule}
            </span>
          </button>
        ))}
      </div>

      {/* Objective */}
      <div
        className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-5 animate-fade-in"
        style={{ animationDelay: "150ms" }}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
              Objetivo
            </span>
            <span className="text-[13px] text-[#E8E8E8] font-['Space_Mono'] font-bold">
              Passar a avaliação Lucid 25K
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
              Prop Firm
            </span>
            <span className="text-[13px] text-[#E8E8E8] font-['JetBrains_Mono']">
              Lucid Trading
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
              Produto
            </span>
            <span className="text-[13px] text-[#E8E8E8] font-['JetBrains_Mono']">
              MES / MNQ (futuros)
            </span>
          </div>
        </div>
      </div>

      {/* All checked message */}
      {allChecked && (
        <div className="bg-[#26A69A]/5 border border-[#26A69A]/20 rounded-md p-4 text-center animate-fade-in">
          <p className="text-[#26A69A] text-[13px] font-['Space_Mono'] font-bold">
            CHECKLIST COMPLETA — PRONTO PARA OPERAR
          </p>
        </div>
      )}
    </div>
  );
}
