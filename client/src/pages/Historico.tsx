import { useState, useMemo } from "react";
import { useTrades } from "@/contexts/TradesContext";
import { formatCurrency, formatDate } from "@/lib/trading";
import { Download, ChevronDown, ChevronUp, Filter } from "lucide-react";

export default function Historico() {
  const { trades } = useTrades();
  const [filterAsset, setFilterAsset] = useState<"ALL" | "MES" | "MNQ">("ALL");
  const [filterResult, setFilterResult] = useState<"ALL" | "WIN" | "LOSS" | "BREAKEVEN">("ALL");
  const [filterDate, setFilterDate] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTrades = useMemo(() => {
    let result = [...trades].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filterAsset !== "ALL") {
      result = result.filter((t) => t.asset === filterAsset);
    }
    if (filterResult !== "ALL") {
      result = result.filter((t) => t.result === filterResult);
    }
    if (filterDate) {
      result = result.filter((t) => t.date === filterDate);
    }

    return result;
  }, [trades, filterAsset, filterResult, filterDate]);

  const exportCSV = () => {
    const headers = [
      "Data",
      "Horário",
      "Ativo",
      "Direção",
      "Entrada",
      "Stop",
      "Alvo",
      "Contratos",
      "Resultado",
      "P&L",
      "Seguiu Plano",
      "Motivo",
      "Erros",
      "Observações",
    ];

    const rows = filteredTrades.map((t) => [
      t.date,
      t.entryTime,
      t.asset,
      t.direction,
      t.entryPrice,
      t.stopPrice,
      t.targetPrice,
      t.contracts,
      t.result,
      t.pnl,
      t.followedPlan ? "Sim" : "Não",
      `"${t.entryReason.replace(/"/g, '""')}"`,
      `"${t.errors.replace(/"/g, '""')}"`,
      `"${t.observations.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `the-desk-trades-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-lg font-bold font-['Space_Mono'] text-[#E8E8E8]">
            Histórico
          </h1>
          <p className="text-[12px] text-[#666666] font-['JetBrains_Mono']">
            {filteredTrades.length} trade{filteredTrades.length !== 1 ? "s" : ""} encontrado{filteredTrades.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={filteredTrades.length === 0}
          className="flex items-center gap-2 bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-4 py-2 text-[12px] text-[#E8E8E8] font-['JetBrains_Mono'] hover:border-[#2A2A2A] active:scale-[0.97] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "50ms" }}>
        <select
          value={filterAsset}
          onChange={(e) => setFilterAsset(e.target.value as any)}
          className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2 text-[12px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none"
        >
          <option value="ALL">Todos Ativos</option>
          <option value="MES">MES</option>
          <option value="MNQ">MNQ</option>
        </select>
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value as any)}
          className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2 text-[12px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none"
        >
          <option value="ALL">Todos Resultados</option>
          <option value="WIN">WIN</option>
          <option value="LOSS">LOSS</option>
          <option value="BREAKEVEN">BREAKEVEN</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-3 py-2 text-[12px] text-[#E8E8E8] font-['JetBrains_Mono'] focus:border-[#2A2A2A] focus:outline-none"
        />
        {(filterAsset !== "ALL" || filterResult !== "ALL" || filterDate) && (
          <button
            onClick={() => {
              setFilterAsset("ALL");
              setFilterResult("ALL");
              setFilterDate("");
            }}
            className="text-[11px] text-[#666666] hover:text-[#999999] font-['JetBrains_Mono'] transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Trade List */}
      <div className="space-y-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
        {filteredTrades.length === 0 ? (
          <div className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md p-8 text-center">
            <p className="text-[#444444] text-[12px] font-['JetBrains_Mono']">
              {trades.length === 0
                ? "Nenhum trade registrado ainda."
                : "Nenhum trade encontrado com esses filtros."}
            </p>
          </div>
        ) : (
          filteredTrades.map((trade) => (
            <div
              key={trade.id}
              className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === trade.id ? null : trade.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#111111] transition-colors"
              >
                <div className="flex items-center gap-4">
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
                  <span
                    className={`text-[12px] font-bold font-['Space_Mono'] ${
                      trade.result === "WIN"
                        ? "text-[#26A69A]"
                        : trade.result === "LOSS"
                        ? "text-[#EF5350]"
                        : "text-[#666666]"
                    }`}
                  >
                    {trade.result}
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
                  {expandedId === trade.id ? (
                    <ChevronUp size={14} className="text-[#666666]" />
                  ) : (
                    <ChevronDown size={14} className="text-[#666666]" />
                  )}
                </div>
              </button>

              {expandedId === trade.id && (
                <div className="border-t border-[#1E1E1E] p-4 space-y-3 bg-[#080808]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Entrada
                      </span>
                      <p className="text-[12px] text-[#E8E8E8] font-['JetBrains_Mono']">
                        {trade.entryPrice} @ {trade.entryTime}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Stop
                      </span>
                      <p className="text-[12px] text-[#EF5350] font-['JetBrains_Mono']">
                        {trade.stopPrice}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Alvo
                      </span>
                      <p className="text-[12px] text-[#26A69A] font-['JetBrains_Mono']">
                        {trade.targetPrice}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Contratos
                      </span>
                      <p className="text-[12px] text-[#E8E8E8] font-['JetBrains_Mono']">
                        {trade.contracts}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                      Motivo
                    </span>
                    <p className="text-[12px] text-[#C8C8C8] font-['JetBrains_Mono'] mt-0.5">
                      {trade.entryReason}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Seguiu Plano
                      </span>
                      <p
                        className={`text-[12px] font-['JetBrains_Mono'] ${
                          trade.followedPlan ? "text-[#26A69A]" : "text-[#EF5350]"
                        }`}
                      >
                        {trade.followedPlan ? "Sim" : "Não"}
                      </p>
                    </div>
                  </div>

                  {trade.errors && (
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Erros
                      </span>
                      <p className="text-[12px] text-[#EF5350]/80 font-['JetBrains_Mono'] mt-0.5">
                        {trade.errors}
                      </p>
                    </div>
                  )}

                  {trade.observations && (
                    <div>
                      <span className="text-[10px] text-[#666666] uppercase tracking-wider font-['JetBrains_Mono']">
                        Observações
                      </span>
                      <p className="text-[12px] text-[#999999] font-['JetBrains_Mono'] mt-0.5">
                        {trade.observations}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
