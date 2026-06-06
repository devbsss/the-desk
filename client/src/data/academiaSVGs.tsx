// ============================================================
// THE DESK — Academia SVG Diagrams
// All diagrams use the app's dark theme palette
// ============================================================

import React from 'react';

const COLORS = {
  bg: '#0a0a0a',
  bgCard: '#111111',
  border: '#1a1a1a',
  green: '#00d4aa',
  red: '#ff4444',
  blue: '#4f9eff',
  purple: '#a855f7',
  amber: '#f59e0b',
  textPrimary: '#e8e8e8',
  textSecondary: '#888888',
  textMuted: '#555555',
};

// ── Candle Anatomy ──────────────────────────────────────────
export const CandleAnatomySVG: React.FC = () => (
  <svg viewBox="0 0 500 320" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="320" fill={COLORS.bgCard} rx="8" />

    {/* Title */}
    <text x="250" y="28" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      ANATOMIA DE UM CANDLE
    </text>

    {/* Green candle */}
    <g transform="translate(100, 40)">
      {/* Upper wick */}
      <line x1="30" y1="20" x2="30" y2="70" stroke={COLORS.green} strokeWidth="2" />
      {/* Body */}
      <rect x="10" y="70" width="40" height="100" fill={COLORS.green} opacity="0.9" rx="2" />
      {/* Lower wick */}
      <line x1="30" y1="170" x2="30" y2="220" stroke={COLORS.green} strokeWidth="2" />

      {/* Labels */}
      <line x1="55" y1="20" x2="120" y2="20" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="3,3" />
      <text x="125" y="24" fill={COLORS.textSecondary} fontSize="10">HIGH (Máxima)</text>

      <line x1="55" y1="70" x2="120" y2="70" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="3,3" />
      <text x="125" y="74" fill={COLORS.green} fontSize="10">CLOSE (Fechamento)</text>

      <text x="125" y="122" fill={COLORS.textSecondary} fontSize="10">← CORPO (Body)</text>
      <text x="125" y="136" fill={COLORS.textMuted} fontSize="9">Close &gt; Open = Verde</text>

      <line x1="55" y1="170" x2="120" y2="170" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="3,3" />
      <text x="125" y="174" fill={COLORS.textSecondary} fontSize="10">OPEN (Abertura)</text>

      <line x1="55" y1="220" x2="120" y2="220" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="3,3" />
      <text x="125" y="224" fill={COLORS.textSecondary} fontSize="10">LOW (Mínima)</text>

      {/* Candle label */}
      <text x="30" y="255" textAnchor="middle" fill={COLORS.green} fontSize="10" fontWeight="bold">BULLISH</text>
      <text x="30" y="268" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">Compradores venceram</text>
    </g>

    {/* Red candle */}
    <g transform="translate(250, 40)">
      {/* Upper wick */}
      <line x1="30" y1="20" x2="30" y2="70" stroke={COLORS.red} strokeWidth="2" />
      {/* Body */}
      <rect x="10" y="70" width="40" height="100" fill={COLORS.red} opacity="0.9" rx="2" />
      {/* Lower wick */}
      <line x1="30" y1="170" x2="30" y2="220" stroke={COLORS.red} strokeWidth="2" />

      {/* Labels */}
      <line x1="-5" y1="70" x2="-40" y2="70" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="3,3" />
      <text x="-45" y="74" textAnchor="end" fill={COLORS.red} fontSize="10">OPEN (Abertura)</text>

      <line x1="-5" y1="170" x2="-40" y2="170" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="3,3" />
      <text x="-45" y="174" textAnchor="end" fill={COLORS.textSecondary} fontSize="10">CLOSE (Fechamento)</text>

      {/* Candle label */}
      <text x="30" y="255" textAnchor="middle" fill={COLORS.red} fontSize="10" fontWeight="bold">BEARISH</text>
      <text x="30" y="268" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">Vendedores venceram</text>
    </g>

    {/* Sombra label */}
    <text x="250" y="300" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">
      Sombras (Wicks) = extremos rejeitados pelo mercado
    </text>
  </svg>
);

// ── Candle Wicks Interpretation ─────────────────────────────
export const CandleWicksSVG: React.FC = () => (
  <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="200" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      LEITURA DAS SOMBRAS
    </text>

    {/* Hammer */}
    <g transform="translate(60, 30)">
      <line x1="20" y1="10" x2="20" y2="30" stroke={COLORS.green} strokeWidth="2" />
      <rect x="8" y="30" width="24" height="20" fill={COLORS.green} opacity="0.8" rx="2" />
      <line x1="20" y1="50" x2="20" y2="130" stroke={COLORS.green} strokeWidth="2" />
      <text x="20" y="148" textAnchor="middle" fill={COLORS.green} fontSize="9" fontWeight="bold">HAMMER</text>
      <text x="20" y="160" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Sombra inferior longa</text>
      <text x="20" y="172" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">= compradores fortes</text>
    </g>

    {/* Shooting Star */}
    <g transform="translate(160, 30)">
      <line x1="20" y1="10" x2="20" y2="90" stroke={COLORS.red} strokeWidth="2" />
      <rect x="8" y="90" width="24" height="20" fill={COLORS.red} opacity="0.8" rx="2" />
      <line x1="20" y1="110" x2="20" y2="130" stroke={COLORS.red} strokeWidth="2" />
      <text x="20" y="148" textAnchor="middle" fill={COLORS.red} fontSize="9" fontWeight="bold">SHOOTING STAR</text>
      <text x="20" y="160" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Sombra superior longa</text>
      <text x="20" y="172" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">= vendedores fortes</text>
    </g>

    {/* Doji */}
    <g transform="translate(260, 30)">
      <line x1="20" y1="10" x2="20" y2="70" stroke={COLORS.amber} strokeWidth="2" />
      <rect x="8" y="70" width="24" height="4" fill={COLORS.amber} opacity="0.9" rx="1" />
      <line x1="20" y1="74" x2="20" y2="130" stroke={COLORS.amber} strokeWidth="2" />
      <text x="20" y="148" textAnchor="middle" fill={COLORS.amber} fontSize="9" fontWeight="bold">DOJI</text>
      <text x="20" y="160" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Corpo mínimo</text>
      <text x="20" y="172" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">= indecisão total</text>
    </g>

    {/* Marubozu */}
    <g transform="translate(360, 30)">
      <rect x="8" y="10" width="24" height="120" fill={COLORS.green} opacity="0.9" rx="2" />
      <text x="20" y="148" textAnchor="middle" fill={COLORS.green} fontSize="9" fontWeight="bold">MARUBOZU</text>
      <text x="20" y="160" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Sem sombras</text>
      <text x="20" y="172" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">= força total</text>
    </g>
  </svg>
);

// ── Candle Patterns ─────────────────────────────────────────
export const CandlePatternsSVG: React.FC = () => (
  <svg viewBox="0 0 500 220" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="220" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      PADRÕES ESSENCIAIS
    </text>

    {/* Bullish Engulfing */}
    <g transform="translate(30, 35)">
      <line x1="15" y1="10" x2="15" y2="25" stroke={COLORS.red} strokeWidth="1.5" />
      <rect x="5" y="25" width="20" height="50" fill={COLORS.red} opacity="0.8" rx="1" />
      <line x1="15" y1="75" x2="15" y2="90" stroke={COLORS.red} strokeWidth="1.5" />
      <line x1="40" y1="5" x2="40" y2="20" stroke={COLORS.green} strokeWidth="1.5" />
      <rect x="30" y="20" width="20" height="80" fill={COLORS.green} opacity="0.8" rx="1" />
      <line x1="40" y1="100" x2="40" y2="115" stroke={COLORS.green} strokeWidth="1.5" />
      <text x="27" y="135" textAnchor="middle" fill={COLORS.green} fontSize="8" fontWeight="bold">BULLISH</text>
      <text x="27" y="146" textAnchor="middle" fill={COLORS.green} fontSize="8">ENGULFING</text>
      <text x="27" y="160" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Reversão de baixa</text>
    </g>

    {/* Bearish Engulfing */}
    <g transform="translate(120, 35)">
      <line x1="15" y1="10" x2="15" y2="25" stroke={COLORS.green} strokeWidth="1.5" />
      <rect x="5" y="25" width="20" height="50" fill={COLORS.green} opacity="0.8" rx="1" />
      <line x1="15" y1="75" x2="15" y2="90" stroke={COLORS.green} strokeWidth="1.5" />
      <line x1="40" y1="5" x2="40" y2="20" stroke={COLORS.red} strokeWidth="1.5" />
      <rect x="30" y="20" width="20" height="80" fill={COLORS.red} opacity="0.8" rx="1" />
      <line x1="40" y1="100" x2="40" y2="115" stroke={COLORS.red} strokeWidth="1.5" />
      <text x="27" y="135" textAnchor="middle" fill={COLORS.red} fontSize="8" fontWeight="bold">BEARISH</text>
      <text x="27" y="146" textAnchor="middle" fill={COLORS.red} fontSize="8">ENGULFING</text>
      <text x="27" y="160" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Reversão de alta</text>
    </g>

    {/* Morning Star */}
    <g transform="translate(210, 35)">
      <rect x="0" y="20" width="18" height="60" fill={COLORS.red} opacity="0.8" rx="1" />
      <rect x="22" y="65" width="12" height="12" fill={COLORS.amber} opacity="0.9" rx="1" />
      <line x1="28" y1="55" x2="28" y2="65" stroke={COLORS.amber} strokeWidth="1.5" />
      <line x1="28" y1="77" x2="28" y2="87" stroke={COLORS.amber} strokeWidth="1.5" />
      <rect x="38" y="15" width="18" height="65" fill={COLORS.green} opacity="0.8" rx="1" />
      <text x="28" y="110" textAnchor="middle" fill={COLORS.green} fontSize="8" fontWeight="bold">MORNING STAR</text>
      <text x="28" y="122" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">3 velas — reversão de baixa</text>
    </g>

    {/* Evening Star */}
    <g transform="translate(320, 35)">
      <rect x="0" y="25" width="18" height="65" fill={COLORS.green} opacity="0.8" rx="1" />
      <rect x="22" y="10" width="12" height="12" fill={COLORS.amber} opacity="0.9" rx="1" />
      <line x1="28" y1="22" x2="28" y2="32" stroke={COLORS.amber} strokeWidth="1.5" />
      <line x1="28" y1="44" x2="28" y2="54" stroke={COLORS.amber} strokeWidth="1.5" />
      <rect x="38" y="20" width="18" height="65" fill={COLORS.red} opacity="0.8" rx="1" />
      <text x="28" y="110" textAnchor="middle" fill={COLORS.red} fontSize="8" fontWeight="bold">EVENING STAR</text>
      <text x="28" y="122" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">3 velas — reversão de alta</text>
    </g>

    {/* Source note */}
    <text x="250" y="200" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: Investopedia — Candlestick Charting
    </text>
  </svg>
);

// ── Support & Resistance ────────────────────────────────────
export const SupportResistanceSVG: React.FC = () => (
  <svg viewBox="0 0 500 260" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="260" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      SUPORTE E RESISTÊNCIA
    </text>

    {/* Resistance line */}
    <line x1="30" y1="80" x2="470" y2="80" stroke={COLORS.red} strokeWidth="1.5" strokeDasharray="8,4" />
    <text x="475" y="84" fill={COLORS.red} fontSize="9">RESISTÊNCIA</text>

    {/* Support line */}
    <line x1="30" y1="200" x2="470" y2="200" stroke={COLORS.green} strokeWidth="1.5" strokeDasharray="8,4" />
    <text x="475" y="204" fill={COLORS.green} fontSize="9">SUPORTE</text>

    {/* Price movement */}
    <polyline
      points="30,160 80,140 120,80 140,100 180,85 220,100 260,80 290,95 330,140 360,200 390,185 420,200 450,170"
      fill="none"
      stroke={COLORS.blue}
      strokeWidth="2"
    />

    {/* Touch points at resistance */}
    <circle cx="120" cy="80" r="5" fill={COLORS.red} opacity="0.8" />
    <circle cx="180" cy="85" r="5" fill={COLORS.red} opacity="0.8" />
    <circle cx="260" cy="80" r="5" fill={COLORS.red} opacity="0.8" />

    {/* Touch points at support */}
    <circle cx="360" cy="200" r="5" fill={COLORS.green} opacity="0.8" />
    <circle cx="420" cy="200" r="5" fill={COLORS.green} opacity="0.8" />

    {/* Annotations */}
    <text x="120" y="68" textAnchor="middle" fill={COLORS.red} fontSize="8">rejeitado</text>
    <text x="260" y="68" textAnchor="middle" fill={COLORS.red} fontSize="8">rejeitado</text>
    <text x="360" y="218" textAnchor="middle" fill={COLORS.green} fontSize="8">suportado</text>
    <text x="420" y="218" textAnchor="middle" fill={COLORS.green} fontSize="8">suportado</text>

    <text x="250" y="248" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: CME Group Education — Support and Resistance
    </text>
  </svg>
);

// ── Polarity Flip ───────────────────────────────────────────
export const PolarityFlipSVG: React.FC = () => (
  <svg viewBox="0 0 500 260" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="260" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      INVERSÃO DE POLARIDADE
    </text>

    {/* Key level */}
    <line x1="30" y1="130" x2="470" y2="130" stroke={COLORS.amber} strokeWidth="1.5" strokeDasharray="6,3" />

    {/* Phase 1: Resistance */}
    <text x="80" y="118" textAnchor="middle" fill={COLORS.red} fontSize="9" fontWeight="bold">RESISTÊNCIA</text>
    <polyline points="30,190 60,170 90,130 110,150 130,130 150,155" fill="none" stroke={COLORS.blue} strokeWidth="2" />
    <circle cx="90" cy="130" r="4" fill={COLORS.red} />
    <circle cx="130" cy="130" r="4" fill={COLORS.red} />

    {/* Breakout arrow */}
    <polyline points="150,155 170,120 190,90" fill="none" stroke={COLORS.green} strokeWidth="2.5" />
    <polygon points="190,90 183,102 197,102" fill={COLORS.green} />
    <text x="195" y="88" fill={COLORS.green} fontSize="9" fontWeight="bold">ROMPIMENTO</text>

    {/* Phase 2: Now Support */}
    <text x="350" y="145" textAnchor="middle" fill={COLORS.green} fontSize="9" fontWeight="bold">AGORA É SUPORTE</text>
    <polyline points="190,90 220,110 250,130 270,115 300,130 330,110 360,130 390,110 440,90" fill="none" stroke={COLORS.blue} strokeWidth="2" />
    <circle cx="250" cy="130" r="4" fill={COLORS.green} />
    <circle cx="300" cy="130" r="4" fill={COLORS.green} />
    <circle cx="360" cy="130" r="4" fill={COLORS.green} />

    {/* Retest annotation */}
    <text x="250" y="148" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">retest</text>
    <text x="300" y="148" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">retest</text>

    <text x="250" y="240" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Resistência rompida → vira suporte. Fonte: Investopedia
    </text>
  </svg>
);

// ── Futures Contract ────────────────────────────────────────
export const FuturesContractSVG: React.FC = () => (
  <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="200" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      COMO FUNCIONA UM FUTURO
    </text>

    {/* Trader box */}
    <rect x="20" y="60" width="120" height="60" fill="#111" stroke={COLORS.blue} strokeWidth="1.5" rx="4" />
    <text x="80" y="85" textAnchor="middle" fill={COLORS.blue} fontSize="11" fontWeight="bold">TRADER</text>
    <text x="80" y="100" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">Você</text>
    <text x="80" y="113" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Margem: ~$40-100</text>

    {/* CME box */}
    <rect x="190" y="60" width="120" height="60" fill="#111" stroke={COLORS.amber} strokeWidth="1.5" rx="4" />
    <text x="250" y="85" textAnchor="middle" fill={COLORS.amber} fontSize="11" fontWeight="bold">CME GROUP</text>
    <text x="250" y="100" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">Bolsa / Clearing</text>
    <text x="250" y="113" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Garante o contrato</text>

    {/* S&P box */}
    <rect x="360" y="60" width="120" height="60" fill="#111" stroke={COLORS.green} strokeWidth="1.5" rx="4" />
    <text x="420" y="85" textAnchor="middle" fill={COLORS.green} fontSize="11" fontWeight="bold">S&P 500</text>
    <text x="420" y="100" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">Índice subjacente</text>
    <text x="420" y="113" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">500 empresas EUA</text>

    {/* Arrows */}
    <line x1="140" y1="90" x2="188" y2="90" stroke={COLORS.textMuted} strokeWidth="1.5" markerEnd="url(#arrow)" />
    <line x1="312" y1="90" x2="358" y2="90" stroke={COLORS.textMuted} strokeWidth="1.5" />
    <text x="330" y="85" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">rastreia</text>

    {/* MES spec */}
    <text x="250" y="155" textAnchor="middle" fill={COLORS.textSecondary} fontSize="10">
      MES = $5 × S&P 500 | 1 ponto = $5 | Tick = $1,25
    </text>
    <text x="250" y="170" textAnchor="middle" fill={COLORS.textMuted} fontSize="9">
      MNQ = $2 × Nasdaq-100 | 1 ponto = $2 | Tick = $0,50
    </text>
    <text x="250" y="188" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: CME Group — Micro E-mini Specifications
    </text>
  </svg>
);

// ── Risk/Reward ─────────────────────────────────────────────
export const RiskRewardSVG: React.FC = () => (
  <svg viewBox="0 0 500 220" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="220" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      RISK / REWARD RATIO
    </text>

    {/* Entry line */}
    <line x1="80" y1="130" x2="420" y2="130" stroke={COLORS.textSecondary} strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="75" y="134" textAnchor="end" fill={COLORS.textSecondary} fontSize="9">ENTRADA</text>
    <text x="75" y="146" textAnchor="end" fill={COLORS.textMuted} fontSize="8">5.200</text>

    {/* Target line */}
    <line x1="80" y1="60" x2="420" y2="60" stroke={COLORS.green} strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="75" y="64" textAnchor="end" fill={COLORS.green} fontSize="9">TARGET</text>
    <text x="75" y="76" textAnchor="end" fill={COLORS.textMuted} fontSize="8">5.240 (+40pts)</text>

    {/* Stop line */}
    <line x1="80" y1="170" x2="420" y2="170" stroke={COLORS.red} strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="75" y="174" textAnchor="end" fill={COLORS.red} fontSize="9">STOP</text>
    <text x="75" y="186" textAnchor="end" fill={COLORS.textMuted} fontSize="8">5.180 (-20pts)</text>

    {/* Risk zone */}
    <rect x="200" y="130" width="80" height="40" fill={COLORS.red} opacity="0.15" />
    <text x="240" y="154" textAnchor="middle" fill={COLORS.red} fontSize="10" fontWeight="bold">RISCO</text>
    <text x="240" y="166" textAnchor="middle" fill={COLORS.red} fontSize="9">20 pts = $100</text>

    {/* Reward zone */}
    <rect x="200" y="60" width="80" height="70" fill={COLORS.green} opacity="0.15" />
    <text x="240" y="92" textAnchor="middle" fill={COLORS.green} fontSize="10" fontWeight="bold">RETORNO</text>
    <text x="240" y="106" textAnchor="middle" fill={COLORS.green} fontSize="9">40 pts = $200</text>

    {/* R:R label */}
    <text x="350" y="110" fill={COLORS.amber} fontSize="14" fontWeight="bold">R:R = 1:2</text>
    <text x="350" y="126" fill={COLORS.textMuted} fontSize="9">Ganho 2x o risco</text>

    <text x="250" y="205" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Mínimo recomendado: R:R 1:2 | Profissional: 1:3 ou mais
    </text>
  </svg>
);

// ── Prop Firm Flow ──────────────────────────────────────────
export const PropFirmFlowSVG: React.FC = () => (
  <svg viewBox="0 0 500 180" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="180" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      FLUXO DE UMA PROP FIRM
    </text>

    {/* Step 1 */}
    <rect x="10" y="45" width="95" height="70" fill="#111" stroke={COLORS.textMuted} strokeWidth="1" rx="4" />
    <text x="57" y="68" textAnchor="middle" fill={COLORS.textSecondary} fontSize="9" fontWeight="bold">PAGAR TAXA</text>
    <text x="57" y="82" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">$50-200</text>
    <text x="57" y="96" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Acesso à</text>
    <text x="57" y="108" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">avaliação</text>

    {/* Arrow 1 */}
    <line x1="105" y1="80" x2="118" y2="80" stroke={COLORS.textMuted} strokeWidth="1.5" />
    <polygon points="118,76 126,80 118,84" fill={COLORS.textMuted} />

    {/* Step 2 */}
    <rect x="126" y="45" width="95" height="70" fill="#111" stroke={COLORS.amber} strokeWidth="1" rx="4" />
    <text x="173" y="68" textAnchor="middle" fill={COLORS.amber} fontSize="9" fontWeight="bold">AVALIAÇÃO</text>
    <text x="173" y="82" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Conta simulada</text>
    <text x="173" y="96" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Atingir meta</text>
    <text x="173" y="108" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">sem violar regras</text>

    {/* Arrow 2 */}
    <line x1="221" y1="80" x2="234" y2="80" stroke={COLORS.textMuted} strokeWidth="1.5" />
    <polygon points="234,76 242,80 234,84" fill={COLORS.textMuted} />

    {/* Step 3 */}
    <rect x="242" y="45" width="95" height="70" fill="#111" stroke={COLORS.green} strokeWidth="1" rx="4" />
    <text x="289" y="68" textAnchor="middle" fill={COLORS.green} fontSize="9" fontWeight="bold">CONTA FUNDED</text>
    <text x="289" y="82" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">$50k-$150k</text>
    <text x="289" y="96" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Capital real</text>
    <text x="289" y="108" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">da firma</text>

    {/* Arrow 3 */}
    <line x1="337" y1="80" x2="350" y2="80" stroke={COLORS.textMuted} strokeWidth="1.5" />
    <polygon points="350,76 358,80 350,84" fill={COLORS.textMuted} />

    {/* Step 4 */}
    <rect x="358" y="45" width="132" height="70" fill="#111" stroke={COLORS.blue} strokeWidth="1" rx="4" />
    <text x="424" y="68" textAnchor="middle" fill={COLORS.blue} fontSize="9" fontWeight="bold">DIVISÃO DE LUCROS</text>
    <text x="424" y="82" textAnchor="middle" fill={COLORS.green} fontSize="11" fontWeight="bold">80-90%</text>
    <text x="424" y="96" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">para o trader</text>
    <text x="424" y="108" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">10-20% para a firma</text>

    <text x="250" y="158" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Topstep: 90/10 | Apex: 100% primeiros $25k | Fonte: Topstep Blog 2026
    </text>
  </svg>
);

// ── Trend Structure ─────────────────────────────────────────
export const TrendStructureSVG: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="240" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      ESTRUTURA DE TENDÊNCIA
    </text>

    {/* Uptrend */}
    <g transform="translate(20, 30)">
      <text x="100" y="15" textAnchor="middle" fill={COLORS.green} fontSize="10" fontWeight="bold">UPTREND</text>
      <polyline
        points="10,160 40,130 70,100 100,120 130,80 160,100 190,55"
        fill="none" stroke={COLORS.green} strokeWidth="2"
      />
      {/* HH labels */}
      <text x="70" y="95" textAnchor="middle" fill={COLORS.green} fontSize="8">HH</text>
      <text x="130" y="75" textAnchor="middle" fill={COLORS.green} fontSize="8">HH</text>
      <text x="190" y="50" textAnchor="middle" fill={COLORS.green} fontSize="8">HH</text>
      {/* HL labels */}
      <text x="40" y="145" textAnchor="middle" fill={COLORS.blue} fontSize="8">HL</text>
      <text x="100" y="135" textAnchor="middle" fill={COLORS.blue} fontSize="8">HL</text>
      <text x="160" y="115" textAnchor="middle" fill={COLORS.blue} fontSize="8">HL</text>
      {/* Legend */}
      <text x="100" y="185" textAnchor="middle" fill={COLORS.green} fontSize="8">HH = Higher High</text>
      <text x="100" y="197" textAnchor="middle" fill={COLORS.blue} fontSize="8">HL = Higher Low</text>
    </g>

    {/* Downtrend */}
    <g transform="translate(260, 30)">
      <text x="100" y="15" textAnchor="middle" fill={COLORS.red} fontSize="10" fontWeight="bold">DOWNTREND</text>
      <polyline
        points="10,55 40,80 70,110 100,90 130,130 160,110 190,160"
        fill="none" stroke={COLORS.red} strokeWidth="2"
      />
      {/* LH labels */}
      <text x="40" y="75" textAnchor="middle" fill={COLORS.red} fontSize="8">LH</text>
      <text x="100" y="85" textAnchor="middle" fill={COLORS.red} fontSize="8">LH</text>
      <text x="160" y="105" textAnchor="middle" fill={COLORS.red} fontSize="8">LH</text>
      {/* LL labels */}
      <text x="70" y="125" textAnchor="middle" fill={COLORS.amber} fontSize="8">LL</text>
      <text x="130" y="145" textAnchor="middle" fill={COLORS.amber} fontSize="8">LL</text>
      <text x="190" y="175" textAnchor="middle" fill={COLORS.amber} fontSize="8">LL</text>
      {/* Legend */}
      <text x="100" y="185" textAnchor="middle" fill={COLORS.red} fontSize="8">LH = Lower High</text>
      <text x="100" y="197" textAnchor="middle" fill={COLORS.amber} fontSize="8">LL = Lower Low</text>
    </g>

    <text x="250" y="228" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: CME Group Education — Trend and Continuation Patterns
    </text>
  </svg>
);

// ── Reversal Patterns ───────────────────────────────────────
export const ReversalPatternsSVG: React.FC = () => (
  <svg viewBox="0 0 500 220" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="220" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      PADRÕES DE REVERSÃO
    </text>

    {/* Head & Shoulders */}
    <g transform="translate(20, 35)">
      <text x="100" y="15" textAnchor="middle" fill={COLORS.red} fontSize="9" fontWeight="bold">HEAD & SHOULDERS</text>
      <polyline
        points="10,120 30,90 50,120 80,50 110,120 130,80 150,120 170,160"
        fill="none" stroke={COLORS.blue} strokeWidth="2"
      />
      <text x="30" y="85" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">LS</text>
      <text x="80" y="45" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Head</text>
      <text x="130" y="75" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">RS</text>
      {/* Neckline */}
      <line x1="10" y1="120" x2="170" y2="120" stroke={COLORS.amber} strokeWidth="1" strokeDasharray="4,3" />
      <text x="85" y="135" textAnchor="middle" fill={COLORS.amber} fontSize="7">neckline</text>
      <text x="85" y="165" textAnchor="middle" fill={COLORS.red} fontSize="8">Reversão de ALTA</text>
    </g>

    {/* Double Bottom */}
    <g transform="translate(270, 35)">
      <text x="100" y="15" textAnchor="middle" fill={COLORS.green} fontSize="9" fontWeight="bold">DOUBLE BOTTOM</text>
      <polyline
        points="10,40 40,120 70,80 100,120 130,80 160,40"
        fill="none" stroke={COLORS.blue} strokeWidth="2"
      />
      <circle cx="40" cy="120" r="4" fill={COLORS.green} />
      <circle cx="100" cy="120" r="4" fill={COLORS.green} />
      <text x="40" y="135" textAnchor="middle" fill={COLORS.green} fontSize="7">1º fundo</text>
      <text x="100" y="135" textAnchor="middle" fill={COLORS.green} fontSize="7">2º fundo</text>
      {/* Neckline */}
      <line x1="10" y1="80" x2="160" y2="80" stroke={COLORS.amber} strokeWidth="1" strokeDasharray="4,3" />
      <text x="85" y="75" textAnchor="middle" fill={COLORS.amber} fontSize="7">neckline</text>
      <text x="85" y="165" textAnchor="middle" fill={COLORS.green} fontSize="8">Reversão de BAIXA</text>
    </g>

    <text x="250" y="208" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: CME Group Education — Technical Patterns: Reversals
    </text>
  </svg>
);

// ── Order Block ─────────────────────────────────────────────
export const OrderBlockSVG: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="240" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      BULLISH ORDER BLOCK
    </text>

    {/* Candles before OB */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${30 + i * 35}, 80)`}>
        <line x1="10" y1="5" x2="10" y2="15" stroke={COLORS.red} strokeWidth="1.5" />
        <rect x="2" y="15" width="16" height="30" fill={COLORS.red} opacity="0.7" rx="1" />
        <line x1="10" y1="45" x2="10" y2="55" stroke={COLORS.red} strokeWidth="1.5" />
      </g>
    ))}

    {/* Order Block candle (highlighted) */}
    <g transform="translate(135, 80)">
      <rect x="0" y="10" width="30" height="50" fill={COLORS.red} opacity="0.3" rx="2" />
      <rect x="2" y="10" width="26" height="50" fill={COLORS.red} opacity="0.8" rx="1" />
      <line x1="15" y1="5" x2="15" y2="10" stroke={COLORS.red} strokeWidth="1.5" />
      <line x1="15" y1="60" x2="15" y2="68" stroke={COLORS.red} strokeWidth="1.5" />
      {/* OB zone highlight */}
      <rect x="-5" y="5" width="40" height="68" fill={COLORS.amber} opacity="0.1" stroke={COLORS.amber} strokeWidth="1" strokeDasharray="3,2" rx="2" />
      <text x="15" y="-5" textAnchor="middle" fill={COLORS.amber} fontSize="8" fontWeight="bold">OB</text>
    </g>

    {/* Impulse up */}
    <polyline
      points="165,130 185,100 205,70 225,50 245,30"
      fill="none" stroke={COLORS.green} strokeWidth="2.5"
    />
    <polygon points="245,30 238,42 252,42" fill={COLORS.green} />
    <text x="255" y="35" fill={COLORS.green} fontSize="9" fontWeight="bold">IMPULSO</text>

    {/* Return to OB */}
    <polyline
      points="245,30 270,50 290,80 310,110 330,130"
      fill="none" stroke={COLORS.blue} strokeWidth="2" strokeDasharray="5,3"
    />

    {/* OB zone extended */}
    <rect x="135" y="85" width="200" height="60" fill={COLORS.amber} opacity="0.05" stroke={COLORS.amber} strokeWidth="1" strokeDasharray="4,3" />

    {/* Entry point */}
    <circle cx="330" cy="130" r="6" fill={COLORS.green} opacity="0.9" />
    <text x="340" y="128" fill={COLORS.green} fontSize="9" fontWeight="bold">ENTRADA</text>
    <text x="340" y="140" fill={COLORS.textMuted} fontSize="8">Compra no retorno ao OB</text>

    {/* Labels */}
    <text x="150" y="175" fill={COLORS.amber} fontSize="9">Zona do Order Block</text>
    <text x="150" y="188" fill={COLORS.textMuted} fontSize="8">Última vela vermelha antes do impulso</text>

    <text x="250" y="225" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: TradeZella — Key ICT Concepts
    </text>
  </svg>
);

// ── Fair Value Gap ──────────────────────────────────────────
export const FairValueGapSVG: React.FC = () => (
  <svg viewBox="0 0 500 220" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="220" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      FAIR VALUE GAP (FVG)
    </text>

    {/* 3 candles */}
    {/* Candle 1 */}
    <g transform="translate(80, 50)">
      <line x1="15" y1="5" x2="15" y2="20" stroke={COLORS.green} strokeWidth="1.5" />
      <rect x="5" y="20" width="20" height="60" fill={COLORS.green} opacity="0.8" rx="1" />
      <line x1="15" y1="80" x2="15" y2="95" stroke={COLORS.green} strokeWidth="1.5" />
      <text x="15" y="112" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Vela 1</text>
      <text x="15" y="123" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">High: 5.200</text>

      {/* High marker */}
      <line x1="25" y1="20" x2="200" y2="20" stroke={COLORS.green} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
    </g>

    {/* Candle 2 (impulse) */}
    <g transform="translate(160, 20)">
      <line x1="15" y1="5" x2="15" y2="10" stroke={COLORS.green} strokeWidth="1.5" />
      <rect x="5" y="10" width="20" height="100" fill={COLORS.green} opacity="0.9" rx="1" />
      <line x1="15" y1="110" x2="15" y2="120" stroke={COLORS.green} strokeWidth="1.5" />
      <text x="15" y="137" textAnchor="middle" fill={COLORS.green} fontSize="8" fontWeight="bold">Impulso</text>
    </g>

    {/* Candle 3 */}
    <g transform="translate(240, 30)">
      <line x1="15" y1="5" x2="15" y2="20" stroke={COLORS.green} strokeWidth="1.5" />
      <rect x="5" y="20" width="20" height="50" fill={COLORS.green} opacity="0.8" rx="1" />
      <line x1="15" y1="70" x2="15" y2="85" stroke={COLORS.green} strokeWidth="1.5" />
      <text x="15" y="102" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">Vela 3</text>
      <text x="15" y="113" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Low: 5.215</text>

      {/* Low marker */}
      <line x1="-160" y1="85" x2="25" y2="85" stroke={COLORS.blue} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
    </g>

    {/* FVG zone */}
    <rect x="105" y="70" width="160" height="45" fill={COLORS.purple} opacity="0.15" stroke={COLORS.purple} strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="185" y="88" textAnchor="middle" fill={COLORS.purple} fontSize="10" fontWeight="bold">FVG</text>
    <text x="185" y="102" textAnchor="middle" fill={COLORS.purple} fontSize="8">5.200 — 5.215</text>

    {/* Labels */}
    <text x="100" y="165" fill={COLORS.textSecondary} fontSize="9">Gap entre High da Vela 1 e Low da Vela 3</text>
    <text x="100" y="180" fill={COLORS.textMuted} fontSize="8">O preço tende a retornar a essa zona para "preencher"</text>

    {/* Return arrow */}
    <path d="M 350 60 Q 380 90 350 115" fill="none" stroke={COLORS.blue} strokeWidth="1.5" strokeDasharray="4,3" />
    <polygon points="350,115 344,105 356,105" fill={COLORS.blue} />
    <text x="385" y="90" fill={COLORS.blue} fontSize="8">retorno</text>
    <text x="385" y="102" fill={COLORS.blue} fontSize="8">ao FVG</text>

    <text x="250" y="205" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">
      Fonte: TradeZella — Key ICT Concepts | ICT Smart Money
    </text>
  </svg>
);

// ── Liquidity Sweep ─────────────────────────────────────────
export const LiquiditySweepSVG: React.FC = () => (
  <svg viewBox="0 0 500 230" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="230" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      LIQUIDITY SWEEP (STOP HUNT)
    </text>

    {/* Support level */}
    <line x1="30" y1="150" x2="470" y2="150" stroke={COLORS.green} strokeWidth="1.5" strokeDasharray="6,3" />
    <text x="35" y="145" fill={COLORS.green} fontSize="8">SUPORTE 5.100</text>

    {/* Stops zone */}
    <rect x="30" y="155" width="440" height="25" fill={COLORS.red} opacity="0.08" />
    <text x="250" y="171" textAnchor="middle" fill={COLORS.red} fontSize="8">Zona de Stops (5.090 — 5.098)</text>

    {/* Price approaching */}
    <polyline
      points="30,80 80,100 120,120 160,140 190,150"
      fill="none" stroke={COLORS.blue} strokeWidth="2"
    />

    {/* Sweep down */}
    <polyline
      points="190,150 210,165 230,175 240,178"
      fill="none" stroke={COLORS.red} strokeWidth="2.5"
    />
    <text x="245" y="182" fill={COLORS.red} fontSize="8" fontWeight="bold">SWEEP!</text>
    <text x="245" y="194" fill={COLORS.textMuted} fontSize="7">Stops acionados</text>

    {/* Reversal up */}
    <polyline
      points="240,178 260,160 290,130 330,100 380,70 430,50"
      fill="none" stroke={COLORS.green} strokeWidth="2.5"
    />
    <polygon points="430,50 422,62 436,62" fill={COLORS.green} />
    <text x="435" y="55" fill={COLORS.green} fontSize="9" fontWeight="bold">REVERSÃO</text>

    {/* Annotations */}
    <text x="120" y="75" fill={COLORS.textSecondary} fontSize="8">Preço se aproxima</text>
    <text x="120" y="87" fill={COLORS.textSecondary} fontSize="8">do suporte</text>

    <text x="30" y="210" fill={COLORS.textMuted} fontSize="8">
      Institucionais coletam liquidez dos stops → revertem na direção oposta
    </text>
    <text x="30" y="222" fill={COLORS.textMuted} fontSize="8">
      Fonte: FluxCharts — Liquidity Sweeps Explained
    </text>
  </svg>
);

// ── Emotion Cycle ───────────────────────────────────────────
export const EmotionCycleSVG: React.FC = () => (
  <svg viewBox="0 0 500 260" className="w-full max-w-lg mx-auto" style={{ fontFamily: 'monospace' }}>
    <rect width="500" height="260" fill={COLORS.bgCard} rx="8" />
    <text x="250" y="22" textAnchor="middle" fill={COLORS.textSecondary} fontSize="11" letterSpacing="2">
      CICLO EMOCIONAL DO TRADER
    </text>

    {/* Cycle path */}
    <ellipse cx="250" cy="140" rx="180" ry="90" fill="none" stroke={COLORS.textMuted} strokeWidth="1" strokeDasharray="4,4" />

    {/* Emotions around the cycle */}
    {/* Top - Euforia */}
    <circle cx="250" cy="50" r="28" fill="#111" stroke={COLORS.green} strokeWidth="1.5" />
    <text x="250" y="46" textAnchor="middle" fill={COLORS.green} fontSize="9" fontWeight="bold">EUFORIA</text>
    <text x="250" y="58" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Série de ganhos</text>
    <text x="250" y="69" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Aumenta posição</text>

    {/* Right - Medo */}
    <circle cx="430" cy="140" r="28" fill="#111" stroke={COLORS.amber} strokeWidth="1.5" />
    <text x="430" y="136" textAnchor="middle" fill={COLORS.amber} fontSize="9" fontWeight="bold">MEDO</text>
    <text x="430" y="148" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">1ª perda grande</text>
    <text x="430" y="159" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Reduz posição</text>

    {/* Bottom - Desespero */}
    <circle cx="250" cy="225" r="28" fill="#111" stroke={COLORS.red} strokeWidth="1.5" />
    <text x="250" y="221" textAnchor="middle" fill={COLORS.red} fontSize="9" fontWeight="bold">DESESPERO</text>
    <text x="250" y="233" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Revenge trading</text>
    <text x="250" y="244" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Viola regras</text>

    {/* Left - Esperança */}
    <circle cx="70" cy="140" r="28" fill="#111" stroke={COLORS.blue} strokeWidth="1.5" />
    <text x="70" y="136" textAnchor="middle" fill={COLORS.blue} fontSize="9" fontWeight="bold">ESPERANÇA</text>
    <text x="70" y="148" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Novo começo</text>
    <text x="70" y="159" textAnchor="middle" fill={COLORS.textMuted} fontSize="7">Sem plano ainda</text>

    {/* Arrows */}
    <path d="M 270 72 Q 360 80 408 118" fill="none" stroke={COLORS.textMuted} strokeWidth="1.5" markerEnd="url(#a)" />
    <path d="M 408 162 Q 380 210 272 222" fill="none" stroke={COLORS.textMuted} strokeWidth="1.5" />
    <path d="M 228 222 Q 120 210 92 162" fill="none" stroke={COLORS.textMuted} strokeWidth="1.5" />
    <path d="M 92 118 Q 120 70 228 68" fill="none" stroke={COLORS.textMuted} strokeWidth="1.5" />

    {/* Center text */}
    <text x="250" y="135" textAnchor="middle" fill={COLORS.textMuted} fontSize="8">A solução:</text>
    <text x="250" y="148" textAnchor="middle" fill={COLORS.textSecondary} fontSize="9" fontWeight="bold">PLANO + DIÁRIO</text>
  </svg>
);

// ── SVG Registry ────────────────────────────────────────────
export const SVG_MAP: Record<string, React.FC> = {
  'candle-anatomy': CandleAnatomySVG,
  'candle-wicks': CandleWicksSVG,
  'candle-patterns': CandlePatternsSVG,
  'support-resistance': SupportResistanceSVG,
  'polarity-flip': PolarityFlipSVG,
  'futures-contract': FuturesContractSVG,
  'risk-reward': RiskRewardSVG,
  'prop-firm-flow': PropFirmFlowSVG,
  'trend-structure': TrendStructureSVG,
  'reversal-patterns': ReversalPatternsSVG,
  'order-block': OrderBlockSVG,
  'fair-value-gap': FairValueGapSVG,
  'liquidity-sweep': LiquiditySweepSVG,
  'emotion-cycle': EmotionCycleSVG,
};
