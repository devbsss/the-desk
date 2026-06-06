import { useState, useMemo } from "react";
import { useTrades } from "@/contexts/TradesContext";
import { formatCurrency, formatDate } from "@/lib/trading";
import { Download, ChevronDown, ChevronUp } from "lucide-react";

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
      "Data", "Horário", "Ativo", "Direção", "Entrada", "Stop", "Alvo",
      "Contratos", "Resultado", "P&L", "Seguiu Plano", "Motivo", "Erros", "Observações",
    ];

    const rows = filteredTrades.map((t) => [
      t.date, t.entryTime, t.asset, t.direction, t.entryPrice, t.stopPrice,
      t.targetPrice, t.contracts, t.result, t.pnl, t.followedPlan ? "Sim" : "Não",
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
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)]">
            HISTÓRICO
          </h1>
          <p className="font-mono-title text-[11px] text-[var(--text-muted)]">
            {filteredTrades.length} trade{filteredTrades.length !== 1 ? "s" : ""} encontrado{filteredTrades.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={filteredTrades.length === 0}
          className="td-btn flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Download size={13} />
          EXPORTAR CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-2">
        <select
          value={filterAsset}
          onChange={(e) => setFilterAsset(e.target.value as any)}
          className="td-input w-auto"
        >
          <option value="ALL">Todos Ativos</option>
          <option value="MES">MES</option>
          <option value="MNQ">MNQ</option>
        </select>
        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value as any)}
          className="td-input w-auto"
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
          className="td-input w-auto"
        />
        {(filterAsset !== "ALL" || filterResult !== "ALL" || filterDate) && (
          <button
            onClick={() => {
              setFilterAsset("ALL");
              setFilterResult("ALL");
              setFilterDate("");
            }}
            className="font-mono-title text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Trade List */}
      <div className="space-y-2">
        {filteredTrades.length === 0 ? (
          <div className="td-card p-8 text-center">
            <p className="font-sans-body text-[13px] text-[var(--text-muted)]">
              {trades.length === 0
                ? "Nenhum trade registrado ainda."
                : "Nenhum trade encontrado com esses filtros."}
            </p>
          </div>
        ) : (
          filteredTrades.map((trade) => (
            <div
              key={trade.id}
              className="td-card !p-0 overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === trade.id ? null : trade.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-hover)] transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="font-mono-title text-[11px] text-[var(--text-muted)]">
                    {formatDate(trade.date)}
                  </span>
                  <span className="font-mono-title text-[11px] text-[var(--text-primary)] font-medium">
                    {trade.asset}
                  </span>
                  <span
                    className={`font-mono-title text-[11px] font-medium ${
                      trade.direction === "LONG" ? "text-[var(--green)]" : "text-[var(--red)]"
                    }`}
                  >
                    {trade.direction}
                  </span>
                  <span
                    className={`font-mono-title text-[11px] font-semibold ${
                      trade.result === "WIN"
                        ? "text-[var(--green)]"
                        : trade.result === "LOSS"
                        ? "text-[var(--red)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {trade.result}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono-title text-[12px] font-semibold ${
                      trade.pnl >= 0 ? "pnl-positive" : "pnl-negative"
                    }`}
                  >
                    {formatCurrency(trade.pnl)}
                  </span>
                  {expandedId === trade.id ? (
                    <ChevronUp size={14} className="text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown size={14} className="text-[var(--text-muted)]" />
                  )}
                </div>
              </button>

              {expandedId === trade.id && (
                <div className="border-t border-[var(--border-color)] p-4 space-y-3 bg-[var(--bg-base)]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="td-label !mb-0.5">Entrada</span>
                      <p className="font-mono-title text-[12px] text-[var(--text-primary)]">
                        {trade.entryPrice} @ {trade.entryTime}
                      </p>
                    </div>
                    <div>
                      <span className="td-label !mb-0.5">Stop</span>
                      <p className="font-mono-title text-[12px] text-[var(--red)]">
                        {trade.stopPrice}
                      </p>
                    </div>
                    <div>
                      <span className="td-label !mb-0.5">Alvo</span>
                      <p className="font-mono-title text-[12px] text-[var(--green)]">
                        {trade.targetPrice}
                      </p>
                    </div>
                    <div>
                      <span className="td-label !mb-0.5">Contratos</span>
                      <p className="font-mono-title text-[12px] text-[var(--text-primary)]">
                        {trade.contracts}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="td-label !mb-0.5">Motivo</span>
                    <p className="font-sans-body text-[12px] text-[var(--td-accent)]">
                      {trade.entryReason}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <span className="td-label !mb-0.5">Seguiu Plano</span>
                      <p className={`font-mono-title text-[12px] ${trade.followedPlan ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
                        {trade.followedPlan ? "Sim" : "Não"}
                      </p>
                    </div>
                  </div>

                  {trade.errors && (
                    <div>
                      <span className="td-label !mb-0.5">Erros</span>
                      <p className="font-sans-body text-[12px] text-[var(--red)]">
                        {trade.errors}
                      </p>
                    </div>
                  )}

                  {trade.observations && (
                    <div>
                      <span className="td-label !mb-0.5">Observações</span>
                      <p className="font-sans-body text-[12px] text-[var(--text-secondary)]">
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
