import { useState, useEffect } from "react";

interface MarketInfo {
  name: string;
  flag: string;
  openHourET: number;
  openMinuteET: number;
  closeHourET: number;
  closeMinuteET: number;
  crossesMidnight: boolean;
}

const markets: MarketInfo[] = [
  { name: "TOKYO", flag: "🇯🇵", openHourET: 20, openMinuteET: 0, closeHourET: 2, closeMinuteET: 0, crossesMidnight: true },
  { name: "LONDON", flag: "🇬🇧", openHourET: 3, openMinuteET: 0, closeHourET: 11, closeMinuteET: 30, crossesMidnight: false },
  { name: "NEW YORK", flag: "🇺🇸", openHourET: 9, openMinuteET: 30, closeHourET: 16, closeMinuteET: 0, crossesMidnight: false },
  { name: "FUTURES", flag: "📈", openHourET: 18, openMinuteET: 0, closeHourET: 17, closeMinuteET: 0, crossesMidnight: true },
];

function getETTime(): Date {
  const now = new Date();
  const etString = now.toLocaleString("en-US", { timeZone: "America/New_York" });
  return new Date(etString);
}

function isMarketOpen(market: MarketInfo, etNow: Date): boolean {
  const currentMinutes = etNow.getHours() * 60 + etNow.getMinutes();
  const openMinutes = market.openHourET * 60 + market.openMinuteET;
  const closeMinutes = market.closeHourET * 60 + market.closeMinuteET;

  if (market.crossesMidnight) {
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }
  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

function isIdealWindow(etNow: Date): boolean {
  const currentMinutes = etNow.getHours() * 60 + etNow.getMinutes();
  // 1:30 PM = 810 minutes, 3:30 PM = 930 minutes
  return currentMinutes >= 810 && currentMinutes <= 930;
}

function getLocalTime(timezone: string): string {
  return new Date().toLocaleTimeString("pt-BR", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const timezoneMap: Record<string, string> = {
  TOKYO: "Asia/Tokyo",
  LONDON: "Europe/London",
  "NEW YORK": "America/New_York",
  FUTURES: "America/New_York",
};

export default function MarketBar() {
  const [etNow, setEtNow] = useState(getETTime());
  const [etTimeStr, setEtTimeStr] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const et = getETTime();
      setEtNow(et);
      setEtTimeStr(
        et.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);
    // Initial
    const et = getETTime();
    setEtTimeStr(
      et.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
    return () => clearInterval(interval);
  }, []);

  const idealWindow = isIdealWindow(etNow);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[44px] bg-[#050505] border-b border-[var(--border-color)] flex items-center">
      <div className="flex-1 flex items-center overflow-x-auto no-scrollbar px-3 gap-4">
        {markets.map((market) => {
          const open = isMarketOpen(market, etNow);
          const localTime = getLocalTime(timezoneMap[market.name]);
          const showIdeal = market.name === "FUTURES" && idealWindow;

          return (
            <div
              key={market.name}
              className="flex items-center gap-2 shrink-0"
            >
              <span className="text-[11px]">{market.flag}</span>
              <span className="font-mono-title text-[11px] text-[var(--text-secondary)] font-medium">
                {market.name}
              </span>
              <span className="font-mono-title text-[11px] text-[var(--text-primary)]">
                {localTime}
              </span>
              {showIdeal ? (
                <span className="text-[9px] font-mono-title font-semibold px-1.5 py-0.5 bg-[var(--green-dim)] text-[var(--green)] border border-[var(--green)] animate-pulse-green">
                  JANELA IDEAL
                </span>
              ) : open ? (
                <span className="text-[9px] font-mono-title font-semibold px-1.5 py-0.5 bg-[var(--green-dim)] text-[var(--green)]">
                  ABERTO
                </span>
              ) : (
                <span className="text-[9px] font-mono-title font-semibold px-1.5 py-0.5 bg-[var(--red-dim)] text-[var(--red)]">
                  FECHADO
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="shrink-0 pr-4 pl-3 border-l border-[var(--border-color)]">
        <span className="font-mono-title text-[13px] text-[var(--white)] font-medium tabular-nums">
          {etTimeStr} ET
        </span>
      </div>
    </div>
  );
}
