import { useState, useEffect } from "react";

interface SessionInfo {
  name: string;
  flags: string;
  openET: string;
  closeET: string;
  openMinutes: number;
  closeMinutes: number;
  crossesMidnight: boolean;
  quality: number;
  description: string;
  highlight?: "best" | "yours" | "avoid";
  badge?: string;
}

const sessions: SessionInfo[] = [
  {
    name: "Sessão Asiática",
    flags: "🇯🇵🇨🇳",
    openET: "8:00 PM",
    closeET: "2:00 AM",
    openMinutes: 20 * 60,
    closeMinutes: 2 * 60,
    crossesMidnight: true,
    quality: 1,
    description: "Mercado asiático ativo, mas futuros americanos têm volume muito baixo. Alta chance de fakeouts e spreads largos. Evitar MES/MNQ nesse horário.",
  },
  {
    name: "Sessão Londres",
    flags: "🇬🇧",
    openET: "3:00 AM",
    closeET: "8:30 AM",
    openMinutes: 3 * 60,
    closeMinutes: 8 * 60 + 30,
    crossesMidnight: false,
    quality: 2,
    description: "Volume europeu começa a entrar. Pode ter movimento, mas sem catalisador americano. Risco de reversão ao abrir NY.",
  },
  {
    name: "Overlap Londres + Nova York",
    flags: "🇬🇧🇺🇸",
    openET: "8:30 AM",
    closeET: "11:00 AM",
    openMinutes: 8 * 60 + 30,
    closeMinutes: 11 * 60,
    crossesMidnight: false,
    quality: 3,
    description: "Maior volume do dia. Abertura de NY às 9:30 AM traz momentum forte. Setups mais claros, moves mais limpos. Ideal para MES e MNQ.",
    highlight: "best",
    badge: "MELHOR JANELA",
  },
  {
    name: "Nova York Tarde",
    flags: "🇺🇸",
    openET: "1:30 PM",
    closeET: "3:30 PM",
    openMinutes: 13 * 60 + 30,
    closeMinutes: 15 * 60 + 30,
    crossesMidnight: false,
    quality: 3,
    description: "Bom volume após almoço. Menos caótico que a abertura. Moves mais técnicos e previsíveis. Recomendado para quem está aprendendo.",
    highlight: "yours",
    badge: "SUA JANELA ATUAL",
  },
  {
    name: "Fechamento NY",
    flags: "🇺🇸",
    openET: "3:30 PM",
    closeET: "4:00 PM",
    openMinutes: 15 * 60 + 30,
    closeMinutes: 16 * 60,
    crossesMidnight: false,
    quality: 2,
    description: "Institucional fecha posições no fim do dia. Pode ter moves bruscos e falsos. Operar só com setup muito claro.",
  },
  {
    name: "After Hours / Overnight",
    flags: "🌙",
    openET: "4:00 PM",
    closeET: "9:30 AM",
    openMinutes: 16 * 60,
    closeMinutes: 9 * 60 + 30,
    crossesMidnight: true,
    quality: 1,
    description: "Volume mínimo. Spreads largos. Sem liquidez institucional. Não operar MES/MNQ nesse período.",
    highlight: "avoid",
    badge: "EVITAR",
  },
];

function getETTime(): Date {
  const now = new Date();
  const etString = now.toLocaleString("en-US", { timeZone: "America/New_York" });
  return new Date(etString);
}

function isSessionOpen(session: SessionInfo, etNow: Date): boolean {
  const currentMinutes = etNow.getHours() * 60 + etNow.getMinutes();
  if (session.crossesMidnight) {
    return currentMinutes >= session.openMinutes || currentMinutes < session.closeMinutes;
  }
  return currentMinutes >= session.openMinutes && currentMinutes < session.closeMinutes;
}

function getTimeUntilOpen(session: SessionInfo, etNow: Date): string {
  const currentMinutes = etNow.getHours() * 60 + etNow.getMinutes();
  let diff = session.openMinutes - currentMinutes;
  if (diff < 0) diff += 24 * 60;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  if (hours > 0) return `${hours}h ${mins}min`;
  return `${mins}min`;
}

function getCurrentWindowMessage(etNow: Date): { message: string; type: "ideal" | "ny" | "outside" } {
  const currentMinutes = etNow.getHours() * 60 + etNow.getMinutes();
  // 1:30 PM - 3:30 PM = 810 - 930
  if (currentMinutes >= 810 && currentMinutes <= 930) {
    return { message: "✓ Você está na sua janela. O mercado está pronto. Você está pronto?", type: "ideal" };
  }
  // 9:30 AM - 11:00 AM = 570 - 660
  if (currentMinutes >= 570 && currentMinutes <= 660) {
    return { message: "Janela de alta qualidade aberta. Volume máximo do dia. Só entre se tiver setup claro.", type: "ny" };
  }
  return { message: "Fora da janela. Use esse tempo para estudar o gráfico, revisar trades anteriores e preparar o plano de amanhã.", type: "outside" };
}

// Timeline segments (24h bar)
const timelineSegments = [
  { label: "Asiática", start: 20, end: 26, color: "rgba(100,100,100,0.3)" }, // 8PM-2AM (26 = 2AM next day)
  { label: "Londres", start: 3, end: 8.5, color: "rgba(200,180,50,0.2)" },
  { label: "Overlap", start: 8.5, end: 11, color: "rgba(38,166,154,0.4)" },
  { label: "NY Tarde", start: 13.5, end: 15.5, color: "rgba(200,200,200,0.25)" },
  { label: "Fechamento", start: 15.5, end: 16, color: "rgba(200,150,50,0.2)" },
  { label: "Overnight", start: 16, end: 21.5, color: "rgba(239,83,80,0.15)" },
];

export default function Janelas() {
  const [etNow, setEtNow] = useState(getETTime());
  const [etTimeStr, setEtTimeStr] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const et = getETTime();
      setEtNow(et);
      setEtTimeStr(
        et.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
      );
    }, 1000);
    const et = getETTime();
    setEtTimeStr(
      et.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
    );
    return () => clearInterval(interval);
  }, []);

  const windowMessage = getCurrentWindowMessage(etNow);
  const currentHourDecimal = etNow.getHours() + etNow.getMinutes() / 60;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)]">
              JANELAS DE MERCADO
            </h1>
            <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-1">
              Horários em Eastern Time (New Jersey) · Futuros de Índice
            </p>
          </div>
          <div className="font-mono-title text-[14px] text-[var(--white)] tabular-nums">
            {etTimeStr} ET
          </div>
        </div>
      </div>

      {/* Session Cards */}
      <div className="space-y-3">
        {sessions.map((session, i) => {
          const open = isSessionOpen(session, etNow);
          const borderClass = session.highlight === "best"
            ? "border-[var(--green)]"
            : session.highlight === "yours"
            ? "border-[var(--white)]"
            : session.highlight === "avoid"
            ? "border-[var(--red)]"
            : "border-[var(--border-color)]";

          const bgClass = session.highlight === "avoid" ? "bg-[var(--red-dim)]" : "bg-[var(--bg-surface)]";

          return (
            <div
              key={session.name}
              className={`${bgClass} border ${borderClass} p-4 animate-fade-in-up stagger-${i + 1}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[14px]">{session.flags}</span>
                  <span className="font-mono-title text-[13px] font-medium text-[var(--text-primary)]">
                    {session.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {session.badge && (
                    <span className={`text-[9px] font-mono-title font-semibold px-2 py-0.5 ${
                      session.highlight === "best"
                        ? "bg-[var(--green-dim)] text-[var(--green)] border border-[var(--green)]"
                        : session.highlight === "yours"
                        ? "bg-[rgba(255,255,255,0.05)] text-[var(--white)] border border-[var(--white)] animate-pulse-green"
                        : "bg-[var(--red-dim)] text-[var(--red)] border border-[var(--red)]"
                    }`}>
                      {session.badge}
                    </span>
                  )}
                  {open ? (
                    <span className="text-[9px] font-mono-title font-semibold px-1.5 py-0.5 bg-[var(--green-dim)] text-[var(--green)]">
                      ABERTA
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono-title font-semibold px-1.5 py-0.5 bg-[var(--red-dim)] text-[var(--red)]">
                      {`ABRINDO EM ${getTimeUntilOpen(session, etNow)}`}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono-title text-[11px] text-[var(--text-secondary)]">
                  {session.openET} – {session.closeET} ET
                </span>
                <span className="text-[11px]">
                  {"⭐".repeat(session.quality)}
                </span>
              </div>

              <p className="font-sans-body text-[12px] text-[var(--text-secondary)] leading-relaxed">
                {session.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Timeline Visual */}
      <div className="td-card">
        <p className="td-label mb-4">TIMELINE DO DIA (24H ET)</p>
        <div className="relative h-10 bg-[var(--bg-base)] border border-[var(--border-color)] overflow-hidden">
          {/* Segments */}
          {timelineSegments.map((seg) => {
            let startPct: number;
            let widthPct: number;

            if (seg.start >= 20) {
              // Wraps around midnight - show as two segments
              startPct = (seg.start / 24) * 100;
              widthPct = ((24 - seg.start + (seg.end > 24 ? seg.end - 24 : seg.end)) / 24) * 100;
            } else {
              startPct = (seg.start / 24) * 100;
              widthPct = ((seg.end - seg.start) / 24) * 100;
            }

            return (
              <div
                key={seg.label}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${startPct}%`,
                  width: `${widthPct}%`,
                  background: seg.color,
                }}
              />
            );
          })}

          {/* Current time marker */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[var(--white)] z-10"
            style={{ left: `${(currentHourDecimal / 24) * 100}%` }}
          >
            <div className="absolute -top-1 -left-1 w-1 h-1 bg-[var(--white)] rounded-full" />
          </div>
        </div>

        {/* Hour labels */}
        <div className="flex justify-between mt-1.5">
          {[0, 4, 8, 12, 16, 20, 24].map((h) => (
            <span key={h} className="font-mono-title text-[9px] text-[var(--text-muted)]">
              {h === 24 ? "0:00" : `${h}:00`}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3">
          {timelineSegments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <div className="w-3 h-2" style={{ background: seg.color }} />
              <span className="font-mono-title text-[9px] text-[var(--text-muted)]">{seg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Window Message */}
      <div className={`td-card-elevated border ${
        windowMessage.type === "ideal" ? "border-[var(--green)]" : windowMessage.type === "ny" ? "border-[var(--border-bright)]" : "border-[var(--border-color)]"
      }`}>
        <p className={`font-sans-body text-[14px] leading-relaxed ${
          windowMessage.type === "ideal" ? "text-[var(--green)]" : windowMessage.type === "ny" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
        }`}>
          {windowMessage.message}
        </p>
      </div>
    </div>
  );
}
