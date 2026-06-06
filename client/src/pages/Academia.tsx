import { useState, useEffect } from "react";

interface LessonData {
  id: string;
  title: string;
  content: string[];
  keyConceptTitle: string;
  keyConcept: string;
  svg: () => React.JSX.Element;
}

interface ModuleData {
  id: number;
  title: string;
  level: string;
  levelColor: string;
  lessons: LessonData[];
}

// SVG Components
function CandleSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="200" fill="#0A0A0A" />
      {/* Bullish candle */}
      <line x1="100" y1="30" x2="100" y2="170" stroke="#666" strokeWidth="1" />
      <rect x="80" y="60" width="40" height="80" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      <text x="100" y="190" textAnchor="middle" fill="#666" fontSize="10" fontFamily="IBM Plex Mono">Alta (Bull)</text>
      <text x="55" y="65" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Máxima</text>
      <text x="55" y="145" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Mínima</text>
      <text x="130" y="65" fill="#E8E8E8" fontSize="9" fontFamily="IBM Plex Mono">Fechamento</text>
      <text x="130" y="145" fill="#E8E8E8" fontSize="9" fontFamily="IBM Plex Mono">Abertura</text>
      {/* Bearish candle */}
      <line x1="300" y1="30" x2="300" y2="170" stroke="#666" strokeWidth="1" />
      <rect x="280" y="60" width="40" height="80" fill="#EF5350" stroke="#EF5350" strokeWidth="1.5" />
      <text x="300" y="190" textAnchor="middle" fill="#666" fontSize="10" fontFamily="IBM Plex Mono">Baixa (Bear)</text>
      <text x="255" y="65" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Máxima</text>
      <text x="255" y="145" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Mínima</text>
      <text x="330" y="65" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Abertura</text>
      <text x="330" y="145" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Fechamento</text>
    </svg>
  );
}

function SuportResistSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="200" fill="#0A0A0A" />
      <line x1="20" y1="50" x2="380" y2="50" stroke="#EF5350" strokeWidth="1" strokeDasharray="4,4" />
      <text x="385" y="54" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Resistência</text>
      <line x1="20" y1="150" x2="380" y2="150" stroke="#26A69A" strokeWidth="1" strokeDasharray="4,4" />
      <text x="385" y="154" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Suporte</text>
      <polyline points="40,140 80,60 120,140 160,70 200,130 240,55 280,145 320,65 360,140" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
    </svg>
  );
}

function FuturesSVG() {
  return (
    <svg viewBox="0 0 400 140" className="w-full h-auto max-h-[140px]">
      <rect width="400" height="140" fill="#0A0A0A" />
      <rect x="20" y="20" width="170" height="100" fill="none" stroke="#1E1E1E" strokeWidth="1" />
      <text x="105" y="40" textAnchor="middle" fill="#E8E8E8" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">MES</text>
      <text x="105" y="60" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">$5 × S&P 500</text>
      <text x="105" y="78" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Tick: 0.25 pt = $1.25</text>
      <text x="105" y="96" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">1 pt = $5.00</text>
      <text x="105" y="112" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Stop 10 pts = -$50</text>
      <rect x="210" y="20" width="170" height="100" fill="none" stroke="#1E1E1E" strokeWidth="1" />
      <text x="295" y="40" textAnchor="middle" fill="#E8E8E8" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">MNQ</text>
      <text x="295" y="60" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">$2 × Nasdaq-100</text>
      <text x="295" y="78" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Tick: 0.25 pt = $0.50</text>
      <text x="295" y="96" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">1 pt = $2.00</text>
      <text x="295" y="112" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Stop 10 pts = -$20</text>
    </svg>
  );
}

function RiscoRetornoSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="200" fill="#0A0A0A" />
      <line x1="200" y1="30" x2="200" y2="170" stroke="#666" strokeWidth="0.5" />
      <rect x="180" y="100" width="40" height="5" fill="#E8E8E8" />
      <text x="230" y="105" fill="#E8E8E8" fontSize="9" fontFamily="IBM Plex Mono">Entrada: 5450</text>
      <line x1="180" y1="140" x2="220" y2="140" stroke="#EF5350" strokeWidth="2" />
      <text x="230" y="144" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Stop: 5440 (-10 pts)</text>
      <line x1="180" y1="50" x2="220" y2="50" stroke="#26A69A" strokeWidth="2" />
      <text x="230" y="54" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Alvo: 5470 (+20 pts)</text>
      <text x="155" y="125" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">1R</text>
      <text x="155" y="75" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono" textAnchor="end">2R</text>
      <text x="200" y="190" fill="#666" fontSize="10" fontFamily="IBM Plex Mono" textAnchor="middle">R:R = 1:2</text>
    </svg>
  );
}

function PropFirmSVG() {
  return (
    <svg viewBox="0 0 400 150" className="w-full h-auto max-h-[150px]">
      <rect width="400" height="150" fill="#0A0A0A" />
      <text x="200" y="25" textAnchor="middle" fill="#E8E8E8" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">LUCID TRADING — 25K</text>
      <rect x="30" y="40" width="100" height="50" fill="none" stroke="#26A69A" strokeWidth="1" />
      <text x="80" y="60" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Meta</text>
      <text x="80" y="78" textAnchor="middle" fill="#E8E8E8" fontSize="12" fontFamily="IBM Plex Mono">$1,500</text>
      <rect x="150" y="40" width="100" height="50" fill="none" stroke="#EF5350" strokeWidth="1" />
      <text x="200" y="60" textAnchor="middle" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Loss Diário</text>
      <text x="200" y="78" textAnchor="middle" fill="#E8E8E8" fontSize="12" fontFamily="IBM Plex Mono">-$1,000</text>
      <rect x="270" y="40" width="100" height="50" fill="none" stroke="#EF5350" strokeWidth="1" />
      <text x="320" y="60" textAnchor="middle" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Loss Total</text>
      <text x="320" y="78" textAnchor="middle" fill="#E8E8E8" fontSize="12" fontFamily="IBM Plex Mono">-$2,500</text>
      <text x="200" y="120" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Comissão: $0.50/lado | Capital: $25,000</text>
      <text x="200" y="140" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Objetivo: provar consistência, não velocidade</text>
    </svg>
  );
}

function EstruturaSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      <text x="70" y="15" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Tendência de Alta</text>
      <polyline points="20,140 50,100 70,120 100,70 120,90 150,40" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      <text x="40" y="105" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">HL</text>
      <text x="90" y="75" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">HH</text>
      <text x="200" y="15" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Tendência de Baixa</text>
      <polyline points="170,40 200,80 220,60 250,110 270,90 300,140" fill="none" stroke="#EF5350" strokeWidth="1.5" />
      <text x="210" y="65" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">LH</text>
      <text x="260" y="115" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">LL</text>
      <text x="350" y="15" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Range</text>
      <line x1="320" y1="50" x2="390" y2="50" stroke="#666" strokeWidth="0.5" strokeDasharray="3,3" />
      <line x1="320" y1="130" x2="390" y2="130" stroke="#666" strokeWidth="0.5" strokeDasharray="3,3" />
      <polyline points="325,120 340,60 355,125 370,55 385,120" fill="none" stroke="#E8E8E8" strokeWidth="1" />
    </svg>
  );
}

function ReversalSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      {/* Pin Bar */}
      <line x1="60" y1="30" x2="60" y2="150" stroke="#666" strokeWidth="1" />
      <rect x="50" y="35" width="20" height="15" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      <text x="60" y="170" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Pin Bar</text>
      {/* Engolfo */}
      <rect x="140" y="70" width="15" height="40" fill="#EF5350" stroke="#EF5350" strokeWidth="1" />
      <rect x="160" y="50" width="20" height="70" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      <text x="160" y="170" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Engolfo</text>
      {/* Inside Bar */}
      <rect x="250" y="50" width="20" height="80" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      <rect x="275" y="65" width="15" height="40" fill="none" stroke="#666" strokeWidth="1" />
      <text x="270" y="170" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Inside Bar</text>
      {/* Doji */}
      <line x1="360" y1="40" x2="360" y2="140" stroke="#666" strokeWidth="1" />
      <rect x="350" y="88" width="20" height="4" fill="#E8E8E8" stroke="#E8E8E8" strokeWidth="1" />
      <text x="360" y="170" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Doji</text>
    </svg>
  );
}

function BreakoutSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      {/* Breakout real */}
      <text x="100" y="15" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Breakout Real</text>
      <line x1="20" y1="90" x2="180" y2="90" stroke="#666" strokeWidth="0.5" strokeDasharray="3,3" />
      <polyline points="30,120 50,100 70,110 90,95 110,85 130,60 150,40 170,30" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      <text x="100" y="170" textAnchor="middle" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">Fecha acima → confirma</text>
      {/* Fakeout */}
      <text x="300" y="15" textAnchor="middle" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Fakeout</text>
      <line x1="220" y1="90" x2="380" y2="90" stroke="#666" strokeWidth="0.5" strokeDasharray="3,3" />
      <polyline points="230,120 250,100 270,110 290,95 310,80 320,75 330,85 340,100 360,120 380,130" fill="none" stroke="#EF5350" strokeWidth="1.5" />
      <text x="300" y="170" textAnchor="middle" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">Rompe e volta → armadilha</text>
    </svg>
  );
}

function OfertaDemandaSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      <rect x="30" y="120" width="340" height="30" fill="#26A69A" fillOpacity="0.15" stroke="#26A69A" strokeWidth="0.5" />
      <text x="200" y="140" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Zona de Demanda</text>
      <rect x="30" y="20" width="340" height="30" fill="#EF5350" fillOpacity="0.15" stroke="#EF5350" strokeWidth="0.5" />
      <text x="200" y="40" textAnchor="middle" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Zona de Oferta</text>
      <polyline points="50,130 80,60 110,125 140,30 170,120 200,70 230,130 260,40 290,125 320,65 350,130" fill="none" stroke="#E8E8E8" strokeWidth="1" />
    </svg>
  );
}

function LiquidezSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      <line x1="30" y1="40" x2="370" y2="40" stroke="#EF5350" strokeWidth="0.5" strokeDasharray="3,3" />
      <text x="375" y="44" fill="#EF5350" fontSize="8" fontFamily="IBM Plex Mono">Stops (Sell)</text>
      <line x1="30" y1="140" x2="370" y2="140" stroke="#26A69A" strokeWidth="0.5" strokeDasharray="3,3" />
      <text x="375" y="144" fill="#26A69A" fontSize="8" fontFamily="IBM Plex Mono">Stops (Buy)</text>
      <polyline points="50,90 80,70 110,95 140,50 160,35 170,60 200,90 230,110 260,130 280,145 290,130 310,90 340,70 360,80" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      <circle cx="160" cy="35" r="4" fill="none" stroke="#FFB74D" strokeWidth="1" />
      <circle cx="280" cy="145" r="4" fill="none" stroke="#FFB74D" strokeWidth="1" />
      <text x="160" y="25" textAnchor="middle" fill="#FFB74D" fontSize="8" fontFamily="IBM Plex Mono">Liquidez</text>
      <text x="280" y="165" textAnchor="middle" fill="#FFB74D" fontSize="8" fontFamily="IBM Plex Mono">Liquidez</text>
    </svg>
  );
}

function OrderBlockSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      {/* Candles going down then up */}
      <rect x="60" y="60" width="20" height="30" fill="#EF5350" stroke="#EF5350" strokeWidth="1" />
      <rect x="90" y="70" width="20" height="35" fill="#EF5350" stroke="#EF5350" strokeWidth="1" />
      <rect x="120" y="85" width="20" height="25" fill="#EF5350" stroke="#EF5350" strokeWidth="1" />
      {/* OB candle */}
      <rect x="148" y="95" width="24" height="30" fill="#EF5350" fillOpacity="0.3" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="160" y="140" textAnchor="middle" fill="#FFB74D" fontSize="8" fontFamily="IBM Plex Mono">OB</text>
      {/* Impulse up */}
      <rect x="180" y="50" width="20" height="60" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      <rect x="210" y="30" width="20" height="50" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      <rect x="240" y="20" width="20" height="40" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      <text x="200" y="170" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Bullish Order Block</text>
    </svg>
  );
}

function FVGSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      {/* Candle 1 */}
      <line x1="100" y1="50" x2="100" y2="140" stroke="#666" strokeWidth="1" />
      <rect x="85" y="90" width="30" height="40" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      {/* Candle 2 - big impulse */}
      <line x1="180" y1="20" x2="180" y2="100" stroke="#666" strokeWidth="1" />
      <rect x="165" y="30" width="30" height="60" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      {/* Candle 3 */}
      <line x1="260" y1="20" x2="260" y2="80" stroke="#666" strokeWidth="1" />
      <rect x="245" y="25" width="30" height="40" fill="none" stroke="#E8E8E8" strokeWidth="1.5" />
      {/* FVG zone */}
      <rect x="85" y="65" width="205" height="25" fill="#26A69A" fillOpacity="0.15" stroke="#26A69A" strokeWidth="0.5" strokeDasharray="3,3" />
      <text x="190" y="80" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">FVG</text>
      <text x="200" y="170" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Gap entre candle 1 e 3</text>
    </svg>
  );
}

function BOSSVG() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto max-h-[180px]">
      <rect width="400" height="180" fill="#0A0A0A" />
      <polyline points="30,150 60,100 80,120 110,70 130,90 160,50 180,70" fill="none" stroke="#26A69A" strokeWidth="1.5" />
      <text x="60" y="105" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">HL</text>
      <text x="110" y="65" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">HH</text>
      <text x="160" y="45" fill="#666" fontSize="8" fontFamily="IBM Plex Mono">HH</text>
      {/* CHoCH */}
      <polyline points="180,70 210,100 230,80" fill="none" stroke="#FFB74D" strokeWidth="1.5" />
      <text x="210" y="115" fill="#FFB74D" fontSize="8" fontFamily="IBM Plex Mono">CHoCH</text>
      {/* BOS */}
      <polyline points="230,80 260,120 280,95 310,140 340,110 370,160" fill="none" stroke="#EF5350" strokeWidth="1.5" />
      <line x1="180" y1="70" x2="370" y2="70" stroke="#EF5350" strokeWidth="0.5" strokeDasharray="3,3" />
      <text x="320" y="65" fill="#EF5350" fontSize="8" fontFamily="IBM Plex Mono">BOS</text>
    </svg>
  );
}

function PsicologiaSVG() {
  return (
    <svg viewBox="0 0 400 140" className="w-full h-auto max-h-[140px]">
      <rect width="400" height="140" fill="#0A0A0A" />
      {/* Pie chart approximation */}
      <circle cx="80" cy="70" r="45" fill="none" stroke="#1E1E1E" strokeWidth="1" />
      <path d="M80,25 A45,45 0 0,1 125,70 L80,70 Z" fill="#EF5350" fillOpacity="0.6" />
      <path d="M125,70 A45,45 0 0,1 80,115 L80,70 Z" fill="#FFB74D" fillOpacity="0.6" />
      <path d="M80,115 A45,45 0 0,1 35,70 L80,70 Z" fill="#42A5F5" fillOpacity="0.6" />
      <path d="M35,70 A45,45 0 0,1 80,25 L80,70 Z" fill="#AB47BC" fillOpacity="0.6" />
      <text x="160" y="40" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Overtrading 30%</text>
      <text x="160" y="60" fill="#FFB74D" fontSize="9" fontFamily="IBM Plex Mono">Revenge Trading 25%</text>
      <text x="160" y="80" fill="#42A5F5" fontSize="9" fontFamily="IBM Plex Mono">Sem Stop 20%</text>
      <text x="160" y="100" fill="#AB47BC" fontSize="9" fontFamily="IBM Plex Mono">Size Errado 15%</text>
      <text x="160" y="120" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Sem Diário 10%</text>
    </svg>
  );
}

function RevengeSVG() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-auto max-h-[100px]">
      <rect width="400" height="100" fill="#0A0A0A" />
      <rect x="20" y="30" width="70" height="40" fill="#EF5350" fillOpacity="0.2" stroke="#EF5350" strokeWidth="0.5" rx="2" />
      <text x="55" y="55" textAnchor="middle" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">LOSS</text>
      <text x="110" y="55" fill="#666" fontSize="14">→</text>
      <rect x="125" y="30" width="70" height="40" fill="#FFB74D" fillOpacity="0.2" stroke="#FFB74D" strokeWidth="0.5" rx="2" />
      <text x="160" y="55" textAnchor="middle" fill="#FFB74D" fontSize="9" fontFamily="IBM Plex Mono">RAIVA</text>
      <text x="215" y="55" fill="#666" fontSize="14">→</text>
      <rect x="230" y="30" width="70" height="40" fill="#AB47BC" fillOpacity="0.2" stroke="#AB47BC" strokeWidth="0.5" rx="2" />
      <text x="265" y="50" textAnchor="middle" fill="#AB47BC" fontSize="8" fontFamily="IBM Plex Mono">TRADE</text>
      <text x="265" y="62" textAnchor="middle" fill="#AB47BC" fontSize="8" fontFamily="IBM Plex Mono">IMPULSIVO</text>
      <text x="320" y="55" fill="#666" fontSize="14">→</text>
      <rect x="335" y="30" width="55" height="40" fill="#EF5350" fillOpacity="0.4" stroke="#EF5350" strokeWidth="1" rx="2" />
      <text x="362" y="50" textAnchor="middle" fill="#EF5350" fontSize="8" fontFamily="IBM Plex Mono">LOSS</text>
      <text x="362" y="62" textAnchor="middle" fill="#EF5350" fontSize="8" fontFamily="IBM Plex Mono">MAIOR</text>
    </svg>
  );
}

function PositionSizeSVG() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-auto max-h-[100px]">
      <rect width="400" height="100" fill="#0A0A0A" />
      <text x="200" y="25" textAnchor="middle" fill="#E8E8E8" fontSize="10" fontFamily="IBM Plex Mono">Fórmula de Position Sizing</text>
      <text x="200" y="55" textAnchor="middle" fill="#26A69A" fontSize="11" fontFamily="IBM Plex Mono">Contratos = (Capital × %Risco) ÷ (Stop × Valor/pt)</text>
      <text x="200" y="80" textAnchor="middle" fill="#666" fontSize="9" fontFamily="IBM Plex Mono">Ex: ($25,000 × 1%) ÷ (10 pts × $5) = 5 MES</text>
    </svg>
  );
}

function DiarioSVG() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-auto max-h-[100px]">
      <rect width="400" height="100" fill="#0A0A0A" />
      <text x="200" y="30" textAnchor="middle" fill="#E8E8E8" fontSize="10" fontFamily="IBM Plex Mono">Impacto do Diário de Trading</text>
      <rect x="60" y="50" width="120" height="25" fill="#26A69A" fillOpacity="0.3" stroke="#26A69A" strokeWidth="0.5" />
      <text x="120" y="67" textAnchor="middle" fill="#26A69A" fontSize="9" fontFamily="IBM Plex Mono">Com diário: +23%</text>
      <rect x="220" y="50" width="120" height="25" fill="#EF5350" fillOpacity="0.3" stroke="#EF5350" strokeWidth="0.5" />
      <text x="280" y="67" textAnchor="middle" fill="#EF5350" fontSize="9" fontFamily="IBM Plex Mono">Sem diário: base</text>
    </svg>
  );
}

// Module data
const MODULES: ModuleData[] = [
  {
    id: 1,
    title: "FUNDAMENTOS",
    level: "INICIANTE",
    levelColor: "#26A69A",
    lessons: [
      { id: "1.1", title: "O que é um Candle", content: ["Um candle (vela) representa a movimentação de preço em um período de tempo específico. Cada candle mostra quatro informações: preço de abertura, fechamento, máxima e mínima do período.", "Se o preço fechou acima da abertura, o candle é de alta (bullish) — representado em branco/cinza. Se fechou abaixo, é de baixa (bearish) — representado em vermelho.", "O corpo do candle mostra a diferença entre abertura e fechamento. Os pavios (sombras) mostram as máximas e mínimas atingidas."], keyConceptTitle: "Conceito-chave", keyConcept: "O candle conta a história da batalha entre compradores e vendedores em um período de tempo.", svg: CandleSVG },
      { id: "1.2", title: "Suporte e Resistência", content: ["Suporte é um nível de preço onde historicamente compradores apareceram com força suficiente para impedir que o preço caísse mais.", "Resistência é o oposto — um nível onde vendedores historicamente impediram o preço de subir.", "Esses níveis funcionam porque traders colocam ordens nesses pontos, criando uma profecia auto-realizável."], keyConceptTitle: "Conceito-chave", keyConcept: "Suporte é onde compradores historicamente apareceram. Resistência é onde vendedores historicamente apareceram.", svg: SuportResistSVG },
      { id: "1.3", title: "O que são Futuros (MES e MNQ)", content: ["Um contrato futuro é um acordo para comprar ou vender um ativo em uma data futura por um preço determinado hoje.", "MES (Micro E-mini S&P 500) replica o S&P 500 com multiplicador de $5 por ponto. Cada tick mínimo (0.25 ponto) vale $1.25.", "MNQ (Micro E-mini Nasdaq-100) replica o Nasdaq-100 com multiplicador de $2 por ponto. Cada tick mínimo (0.25 ponto) vale $0.50."], keyConceptTitle: "Conceito-chave", keyConcept: "Com 1 MES, cada ponto vale $5. Stop de 10 pontos = perda de $50.", svg: FuturesSVG },
      { id: "1.4", title: "Risco e Retorno", content: ["R:R (Risk-to-Reward) é a proporção entre o que você arrisca perder e o que espera ganhar.", "Um R:R de 1:2 significa que para cada $1 arriscado, você busca $2 de lucro.", "Com R:R de 1:2, mesmo acertando apenas 40% dos trades, você é lucrativo no longo prazo."], keyConceptTitle: "Conceito-chave", keyConcept: "Com R:R de 1:2, você pode errar 40% das vezes e ainda ser lucrativo.", svg: RiscoRetornoSVG },
      { id: "1.5", title: "O que é uma Prop Firm (Lucid Trading)", content: ["Prop firms são empresas que financiam traders. Você faz uma avaliação e, se passar, opera com o capital deles.", "A Lucid Trading oferece contas de $25,000 com meta de lucro de $1,500 (6%), loss máximo diário de $1,000 e loss máximo total de $2,500.", "O objetivo não é ganhar rápido — é provar que você tem disciplina e consistência para não perder de forma descontrolada."], keyConceptTitle: "Conceito-chave", keyConcept: "O objetivo da avaliação não é ganhar dinheiro rápido. É provar que você não perde dinheiro de forma descontrolada.", svg: PropFirmSVG },
    ],
  },
  {
    id: 2,
    title: "PRICE ACTION",
    level: "BÁSICO",
    levelColor: "#42A5F5",
    lessons: [
      { id: "2.1", title: "Estrutura de Mercado", content: ["Tendência de alta: sequência de Higher Highs (HH) e Higher Lows (HL) — topos e fundos ascendentes.", "Tendência de baixa: sequência de Lower Highs (LH) e Lower Lows (LL) — topos e fundos descendentes.", "Range/Lateralização: preço oscila entre um suporte e uma resistência sem direção clara."], keyConceptTitle: "Conceito-chave", keyConcept: "Antes de entrar em qualquer trade, identifique: o mercado está subindo, caindo ou lateralizando?", svg: EstruturaSVG },
      { id: "2.2", title: "Candles de Reversão", content: ["Pin Bar: corpo pequeno com pavio longo — indica rejeição de um nível. Doji: abertura e fechamento praticamente iguais — indecisão.", "Engolfo: candle que 'engole' completamente o anterior — sinal de força na direção do engolfo.", "Inside Bar: candle contido dentro do range do anterior — compressão de volatilidade antes de um movimento."], keyConceptTitle: "Conceito-chave", keyConcept: "Esses padrões por si só não são sinal de entrada. São alertas de que algo pode estar mudando.", svg: ReversalSVG },
      { id: "2.3", title: "Breakout vs Fakeout", content: ["Breakout real: preço rompe um nível de suporte/resistência e o candle fecha além dele, confirmando o rompimento.", "Fakeout: preço rompe momentaneamente mas volta para dentro do range — é uma armadilha para traders apressados.", "Regra de ouro: espere o candle fechar acima/abaixo do nível antes de entrar. Entrar no meio do candle é entrar cedo demais."], keyConceptTitle: "Conceito-chave", keyConcept: "Espere o candle fechar acima/abaixo do nível antes de entrar. Entrar no rompimento do candle é entrar cedo demais.", svg: BreakoutSVG },
      { id: "2.4", title: "Zonas de Oferta e Demanda", content: ["Diferente de linhas simples de suporte/resistência, zonas representam áreas onde grandes players colocaram ordens significativas.", "Zona de demanda: região onde compradores institucionais entraram com força — preço tende a reagir ao revisitar.", "Zona de oferta: região onde vendedores institucionais entraram — preço tende a cair ao revisitar."], keyConceptTitle: "Conceito-chave", keyConcept: "Instituições deixam pegadas nos gráficos. Zonas são onde eles colocaram ordens grandes.", svg: OfertaDemandaSVG },
    ],
  },
  {
    id: 3,
    title: "SMART MONEY CONCEPTS",
    level: "INTERMEDIÁRIO",
    levelColor: "#AB47BC",
    lessons: [
      { id: "3.1", title: "O que é Liquidez", content: ["Liquidez no contexto de SMC são os stops dos traders varejistas. Instituições precisam dessa liquidez para preencher suas ordens grandes.", "Máximas e mínimas anteriores são pools de liquidez — é onde a maioria dos traders coloca seus stops.", "O mercado frequentemente vai até esses níveis para 'pegar' a liquidez antes de reverter na direção real."], keyConceptTitle: "Conceito-chave", keyConcept: "O mercado vai onde tem liquidez. Máximas e mínimas anteriores são pools de liquidez.", svg: LiquidezSVG },
      { id: "3.2", title: "Order Blocks", content: ["Order Block (OB) é o último candle na direção oposta antes de um movimento impulsivo forte.", "Bullish OB: último candle de baixa antes de uma subida explosiva — marca onde institucional comprou.", "O preço tende a retornar ao OB antes de continuar na direção do impulso — é uma zona de entrada de alta probabilidade."], keyConceptTitle: "Conceito-chave", keyConcept: "Order Block é a última vela na direção oposta antes de um move impulsivo. É onde institucional entrou.", svg: OrderBlockSVG },
      { id: "3.3", title: "Fair Value Gap (FVG)", content: ["FVG é um gap de preço entre o pavio do primeiro candle e o pavio do terceiro candle em uma sequência de três.", "Representa um desequilíbrio — o preço se moveu tão rápido que deixou um 'vazio' no orderflow.", "O mercado frequentemente volta para preencher esse gap antes de continuar na direção original."], keyConceptTitle: "Conceito-chave", keyConcept: "FVG é um desequilíbrio. O mercado frequentemente volta para preenchê-lo antes de continuar.", svg: FVGSVG },
      { id: "3.4", title: "Break of Structure (BOS) vs CHoCH", content: ["CHoCH (Change of Character): primeiro sinal de que a tendência pode estar mudando — quebra do último HL em uptrend ou LH em downtrend.", "BOS (Break of Structure): confirmação de que a tendência mudou — preço faz novo LL em ex-uptrend ou novo HH em ex-downtrend.", "CHoCH é alerta, BOS é confirmação. Traders conservadores esperam o BOS; agressivos entram no CHoCH."], keyConceptTitle: "Conceito-chave", keyConcept: "CHoCH é o primeiro sinal de reversão. BOS confirma que a tendência mudou.", svg: BOSSVG },
    ],
  },
  {
    id: 4,
    title: "GESTÃO E PSICOLOGIA",
    level: "TODOS",
    levelColor: "#FFB74D",
    lessons: [
      { id: "4.1", title: "Por que traders perdem", content: ["Mais de 80% dos day traders perdem dinheiro no longo prazo. Não é por falta de conhecimento técnico.", "As 5 causas mais comuns: overtrading (operar demais), revenge trading (operar com raiva), operar sem stop, position size errado, e não manter um diário.", "A maioria dos problemas é comportamental, não técnica. Você pode ter o melhor setup do mundo e ainda perder se não tiver disciplina."], keyConceptTitle: "Conceito-chave", keyConcept: "80%+ dos day traders perdem. A diferença não é conhecimento — é disciplina e gestão emocional.", svg: PsicologiaSVG },
      { id: "4.2", title: "Revenge Trading", content: ["Revenge trading é quando você toma um loss e imediatamente entra em outro trade para 'recuperar' — movido por emoção, não por análise.", "O ciclo: loss → frustração/raiva → trade impulsivo sem setup → loss maior → mais frustração.", "Como parar: regra dos 2 trades/dia, timer de 15 minutos após um loss, e aceitar que nem todo dia é dia de operar."], keyConceptTitle: "Conceito-chave", keyConcept: "Depois de um loss, seu cérebro quer recuperar. Esse impulso é seu maior inimigo.", svg: RevengeSVG },
      { id: "4.3", title: "Tamanho de posição e gestão de risco", content: ["A regra de ouro: nunca arrisque mais de 1-2% do capital por trade.", "Fórmula: Contratos = (Capital × %Risco) ÷ (Stop em pontos × Valor por ponto).", "Exemplo: com $25,000 e 1% de risco ($250), stop de 10 pontos no MES ($5/pt): 250 ÷ 50 = 5 contratos máximo."], keyConceptTitle: "Conceito-chave", keyConcept: "Nunca arrisque mais de 1-2% do capital por trade.", svg: PositionSizeSVG },
      { id: "4.4", title: "O diário de trading (por que o The Desk existe)", content: ["Traders que mantêm um diário detalhado têm performance em média 23% melhor do que os que não mantêm.", "O diário permite identificar padrões invisíveis: seus melhores horários, piores estados emocionais, e setups que realmente funcionam para você.", "Registrar não é burocracia — é a ferramenta que transforma experiência em aprendizado real."], keyConceptTitle: "Conceito-chave", keyConcept: "Você não melhora o que não mede.", svg: DiarioSVG },
    ],
  },
];

const PROGRESS_KEY = "thedesk_academia_progress";

function loadProgress(): Record<string, boolean[]> {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<string, boolean[]>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export default function Academia() {
  const [progress, setProgress] = useState<Record<string, boolean[]>>(loadProgress);
  const [activeLesson, setActiveLesson] = useState<{ moduleId: number; lessonIdx: number } | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const getModuleProgress = (moduleId: number) => {
    const key = `modulo${moduleId}`;
    const mod = MODULES.find((m) => m.id === moduleId)!;
    const prog = progress[key] || new Array(mod.lessons.length).fill(false);
    const completed = prog.filter(Boolean).length;
    return { completed, total: mod.lessons.length, prog };
  };

  const isModuleUnlocked = (moduleId: number) => {
    if (moduleId === 1 || moduleId === 4) return true;
    const prev = getModuleProgress(moduleId - 1);
    return prev.completed === prev.total;
  };

  const markLessonComplete = (moduleId: number, lessonIdx: number) => {
    const key = `modulo${moduleId}`;
    const mod = MODULES.find((m) => m.id === moduleId)!;
    const prog = progress[key] || new Array(mod.lessons.length).fill(false);
    prog[lessonIdx] = true;
    setProgress({ ...progress, [key]: prog });
  };

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalCompleted = MODULES.reduce((sum, m) => {
    const { completed } = getModuleProgress(m.id);
    return sum + completed;
  }, 0);

  // Lesson view
  if (activeLesson) {
    const mod = MODULES.find((m) => m.id === activeLesson.moduleId)!;
    const lesson = mod.lessons[activeLesson.lessonIdx];
    const { prog } = getModuleProgress(mod.id);
    const isLast = activeLesson.lessonIdx === mod.lessons.length - 1;
    const SVGComponent = lesson.svg;

    return (
      <div className="animate-fade-in-up">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveLesson(null)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm"
          >
            ←
          </button>
          <div className="flex-1 h-1 bg-[var(--bg-elevated)] overflow-hidden">
            <div
              className="h-full bg-[var(--text-primary)] transition-all duration-300"
              style={{ width: `${((activeLesson.lessonIdx + 1) / mod.lessons.length) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-mono-title">
            {activeLesson.lessonIdx + 1}/{mod.lessons.length}
          </span>
        </div>

        {/* Lesson content */}
        <h2 className="font-mono-title text-lg font-semibold text-[var(--text-primary)] mb-1">
          {lesson.title}
        </h2>
        <p className="text-[10px] text-[var(--text-muted)] font-mono-title mb-6 uppercase tracking-wider">
          Módulo {mod.id} — {mod.title}
        </p>

        {lesson.content.map((paragraph, i) => (
          <p key={i} className="text-[13px] text-[var(--text-secondary)] font-sans leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}

        {/* SVG */}
        <div className="my-6 border border-[var(--border-color)] overflow-hidden">
          <SVGComponent />
        </div>

        {/* Key concept */}
        <div className="bg-[var(--bg-surface)] border-l-2 border-l-[var(--text-primary)] p-4 mb-8">
          <p className="text-[10px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider mb-1">
            {lesson.keyConceptTitle}
          </p>
          <p className="text-[12px] text-[var(--text-primary)] font-mono-title italic leading-relaxed">
            "{lesson.keyConcept}"
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-[var(--border-color)]">
          <button
            onClick={() => {
              if (activeLesson.lessonIdx > 0) {
                setActiveLesson({ ...activeLesson, lessonIdx: activeLesson.lessonIdx - 1 });
              }
            }}
            disabled={activeLesson.lessonIdx === 0}
            className={`text-[11px] font-mono-title px-4 py-2 border border-[var(--border-color)] transition-colors ${
              activeLesson.lessonIdx === 0
                ? "text-[var(--text-muted)] cursor-not-allowed"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            ← ANTERIOR
          </button>
          <button
            onClick={() => {
              markLessonComplete(mod.id, activeLesson.lessonIdx);
              if (isLast) {
                setActiveLesson(null);
              } else {
                setActiveLesson({ ...activeLesson, lessonIdx: activeLesson.lessonIdx + 1 });
              }
            }}
            className="text-[11px] font-mono-title px-4 py-2 bg-[var(--text-primary)] text-[#000000] font-semibold transition-all active:scale-[0.97]"
          >
            {isLast ? "CONCLUIR MÓDULO ✓" : "PRÓXIMO →"}
          </button>
        </div>
      </div>
    );
  }

  // Module grid view
  return (
    <div className="animate-fade-in-up">
      <header className="mb-6">
        <h1 className="font-mono-title text-xl font-semibold text-[var(--text-primary)] tracking-tight">
          ACADEMIA
        </h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-1 font-mono-title">
          Do básico ao profissional — futuros de índice americano
        </p>
      </header>

      {/* Overall progress */}
      <div className="mb-6 bg-[var(--bg-surface)] border border-[var(--border-color)] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[var(--text-muted)] font-mono-title uppercase tracking-wider">
            Progresso Geral
          </span>
          <span className="text-[11px] text-[var(--text-primary)] font-mono-title font-semibold">
            {totalCompleted} de {totalLessons} lições
          </span>
        </div>
        <div className="h-1.5 bg-[var(--bg-elevated)] overflow-hidden">
          <div
            className="h-full bg-[#26A69A] transition-all duration-500"
            style={{ width: `${totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULES.map((mod) => {
          const { completed, total } = getModuleProgress(mod.id);
          const unlocked = isModuleUnlocked(mod.id);
          const isComplete = completed === total;

          return (
            <div
              key={mod.id}
              className={`bg-[var(--bg-surface)] border p-5 transition-all ${
                !unlocked
                  ? "border-[var(--border-color)] opacity-50"
                  : isComplete
                  ? "border-[#26A69A]/50"
                  : "border-[var(--border-color)] hover:border-[var(--border-bright)]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-mono-title text-[var(--text-muted)] uppercase tracking-wider">
                    Módulo {mod.id}
                  </span>
                  <h3 className="font-mono-title text-[14px] font-semibold text-[var(--text-primary)] mt-0.5">
                    {mod.title}
                  </h3>
                </div>
                <span
                  className="text-[9px] font-mono-title font-semibold px-2 py-0.5 border"
                  style={{ color: mod.levelColor, borderColor: `${mod.levelColor}40`, backgroundColor: `${mod.levelColor}10` }}
                >
                  {mod.level}
                </span>
              </div>

              {/* Progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[var(--text-muted)] font-mono-title">
                  {completed} de {total} lições
                </span>
                {!unlocked && (
                  <span className="text-[9px] text-[var(--text-muted)] font-mono-title">BLOQUEADO</span>
                )}
                {isComplete && (
                  <span className="text-[9px] text-[#26A69A] font-mono-title font-semibold">CONCLUÍDO ✓</span>
                )}
              </div>
              <div className="h-1 bg-[var(--bg-elevated)] overflow-hidden mb-4">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${(completed / total) * 100}%`, backgroundColor: mod.levelColor }}
                />
              </div>

              {/* Lesson list */}
              {unlocked && (
                <div className="space-y-1">
                  {mod.lessons.map((lesson, idx) => {
                    const prog = getModuleProgress(mod.id).prog;
                    const done = prog[idx];
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson({ moduleId: mod.id, lessonIdx: idx })}
                        className={`w-full text-left flex items-center gap-2 px-2 py-1.5 text-[11px] font-mono-title transition-colors hover:bg-[var(--bg-hover)] ${
                          done ? "text-[var(--text-muted)]" : "text-[var(--text-secondary)]"
                        }`}
                      >
                        <span className={`w-3 h-3 border flex items-center justify-center text-[8px] ${
                          done ? "border-[#26A69A] text-[#26A69A]" : "border-[var(--border-color)]"
                        }`}>
                          {done ? "✓" : ""}
                        </span>
                        <span className={done ? "line-through" : ""}>{lesson.id} — {lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
