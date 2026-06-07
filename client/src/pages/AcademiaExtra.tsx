import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface QuizOption {
  id: string;
  text: string;
}

interface QuizBlock {
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

interface ContentBlock {
  type: 'heading' | 'text' | 'callout' | 'warning' | 'example' | 'table' | 'quiz' | 'source';
  content?: string;
  table?: { headers: string[]; rows: string[][] };
  quiz?: QuizBlock;
  url?: string;
  label?: string;
}

interface StudyLesson {
  id: string;
  title: string;
  duration: string;
  blocks: ContentBlock[];
}

interface Progress {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
}

// ─────────────────────────────────────────────────────────────
// Progress Management
// ─────────────────────────────────────────────────────────────
function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem('academia-extra-progress');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: [], completedQuizzes: [], quizScores: {} };
}

function saveProgress(p: Progress) {
  localStorage.setItem('academia-extra-progress', JSON.stringify(p));
}

// ─────────────────────────────────────────────────────────────
// Inline Quiz Component
// ─────────────────────────────────────────────────────────────
function InlineQuiz({ quiz, onAnswer }: { quiz: QuizBlock; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  function handleSelect(id: string) {
    if (answered) return;
    setSelected(id);
    setAnswered(true);
    onAnswer(id === quiz.correctId);
  }

  return (
    <div className="my-6 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#1a1a1a] flex items-center gap-2">
        <span className="text-xs font-bold tracking-widest text-[#f59e0b]">✏ QUESTÃO DE FIXAÇÃO</span>
      </div>
      <div className="px-5 py-4">
        <p className="text-[#e8e8e8] text-sm font-medium mb-4 leading-relaxed">{quiz.question}</p>
        <div className="space-y-2">
          {quiz.options.map((opt) => {
            let cls = 'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ';
            if (!answered) {
              cls += 'border-[#1a1a1a] bg-[#111] text-[#ccc] hover:border-[#333] hover:bg-[#161616] cursor-pointer';
            } else if (opt.id === quiz.correctId) {
              cls += 'border-[#00d4aa] bg-[#00d4aa]/10 text-[#00d4aa] font-medium';
            } else if (opt.id === selected && opt.id !== quiz.correctId) {
              cls += 'border-[#ff4444] bg-[#ff4444]/10 text-[#ff4444]';
            } else {
              cls += 'border-[#1a1a1a] bg-[#111] text-[#555]';
            }
            return (
              <button key={opt.id} className={cls} onClick={() => handleSelect(opt.id)}>
                <span className="font-bold mr-2 text-[#555]">{opt.id.toUpperCase()}.</span>
                {opt.text}
              </button>
            );
          })}
        </div>
        {answered && (
          <div className={`mt-4 p-3 rounded-lg text-sm leading-relaxed ${selected === quiz.correctId ? 'bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/30' : 'bg-[#ff4444]/10 text-[#ff8888] border border-[#ff4444]/30'}`}>
            <span className="font-bold">{selected === quiz.correctId ? '✓ Correto! ' : '✗ Incorreto. '}</span>
            {quiz.explanation}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Block Renderer
// ─────────────────────────────────────────────────────────────
function BlockRenderer({ block, onQuizAnswer }: { block: ContentBlock; onQuizAnswer: (correct: boolean) => void }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="text-[#e8e8e8] text-xl font-bold mt-8 mb-3 tracking-tight border-l-2 border-[#00d4aa] pl-3">
          {block.content}
        </h2>
      );
    case 'text':
      return <p className="text-[#b0b0b0] text-sm leading-[1.85] mb-4">{block.content}</p>;
    case 'callout':
      return (
        <div className="my-5 pl-4 border-l-2 border-[#00d4aa] bg-[#00d4aa]/5 py-3 pr-4 rounded-r-lg">
          <p className="text-[#00d4aa] text-sm leading-relaxed italic">{block.content}</p>
        </div>
      );
    case 'warning':
      return (
        <div className="my-5 pl-4 border-l-2 border-[#f59e0b] bg-[#f59e0b]/5 py-3 pr-4 rounded-r-lg">
          <p className="text-[#f59e0b] text-sm leading-relaxed">{block.content}</p>
        </div>
      );
    case 'example':
      return (
        <div className="my-5 p-4 bg-[#111] border border-[#1a1a1a] rounded-lg">
          <p className="text-[#00d4aa] text-xs font-bold mb-2 tracking-widest">EXEMPLO</p>
          <p className="text-[#b0b0b0] text-sm leading-relaxed">{block.content}</p>
        </div>
      );
    case 'table':
      if (!block.table) return null;
      return (
        <div className="my-5 overflow-x-auto rounded-lg border border-[#1a1a1a]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111] border-b border-[#1a1a1a]">
                {block.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-[#00d4aa] font-bold text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#1a1a1a] hover:bg-[#0d0d0d]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[#b0b0b0] text-xs">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'quiz':
      if (!block.quiz) return null;
      return <InlineQuiz quiz={block.quiz} onAnswer={onQuizAnswer} />;
    case 'source':
      return (
        <div className="my-4 p-3 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg">
          <p className="text-[#888] text-xs">
            <span className="font-bold text-[#aaa]">Fonte:</span> {block.content}
          </p>
        </div>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Study Lessons Data
// ─────────────────────────────────────────────────────────────
const lessons: StudyLesson[] = [
  {
    id: 'extra-1',
    title: 'VWAP Pullback Strategy',
    duration: '12 min',
    blocks: [
      { type: 'heading', content: 'O que é VWAP?' },
      { type: 'text', content: 'VWAP (Volume Weighted Average Price) é o preço médio ponderado pelo volume. Ele mostra o preço médio que os traders institucionais pagaram por um ativo durante o dia. Quando o preço está acima do VWAP, os compradores estão ganhando. Quando está abaixo, os vendedores estão ganhando.' },
      { type: 'callout', content: 'VWAP é recalculado a cada novo candle, começando do início do dia de negociação.' },
      { type: 'heading', content: 'A Estratégia Pullback' },
      { type: 'text', content: 'Um pullback é quando o preço se afasta do VWAP e depois volta para testá-lo novamente. Isso geralmente indica que o movimento anterior foi forte e o mercado está procurando por mais compradores (ou vendedores) naquele nível.' },
      { type: 'example', content: 'Exemplo: MES sobe de 5450 para 5480 (acima do VWAP). Depois puxa para 5465 (testando o VWAP novamente). Se o preço rejeita para baixo do VWAP, pode ser uma oportunidade SHORT. Se o preço rejeita para cima, pode ser uma oportunidade LONG.' },
      { type: 'heading', content: 'Sinais de Confirmação' },
      { type: 'table', table: { headers: ['Sinal', 'Significado', 'Ação'], rows: [['Preço toca VWAP + Volume alto', 'Interesse institucional forte', 'Preparar entrada'], ['Preço rejeita VWAP rapidamente', 'Rejeição clara do nível', 'Confirmar direção'], ['Preço fecha acima/abaixo VWAP', 'Tendência estabelecida', 'Seguir tendência']] } },
      { type: 'quiz', quiz: { question: 'Quando o VWAP é mais confiável?', options: [{ id: 'a', text: 'Nas primeiras 30 minutos da sessão' }, { id: 'b', text: 'Após 2-3 horas de negociação com volume consistente' }, { id: 'c', text: 'Nos últimos 15 minutos do dia' }, { id: 'd', text: 'Nunca é confiável' }], correctId: 'b', explanation: 'VWAP precisa de tempo e volume para se estabelecer como referência confiável. Nas primeiras horas, há pouco volume acumulado.' } },
      { type: 'source', content: 'TradingView Documentation, CME Group Education' },
    ],
  },
  {
    id: 'extra-2',
    title: 'Candlestick Charts Avançado',
    duration: '10 min',
    blocks: [
      { type: 'heading', content: 'Padrões de Reversão' },
      { type: 'text', content: 'Padrões de reversão são formações de candles que indicam que a tendência atual pode estar terminando. Os mais importantes são: Martelo (Hammer), Engolfo (Engulfing), Doji e Pinbar.' },
      { type: 'example', content: 'Martelo: Candle com corpo pequeno no topo e sombra longa para baixo. Indica rejeição de preços mais baixos. Se aparecer em suporte, é sinal de possível reversão para cima.' },
      { type: 'heading', content: 'Padrões de Continuação' },
      { type: 'text', content: 'Padrões de continuação indicam que a tendência atual vai continuar. Exemplos: Inside Bar, Consolidação, Rompimento de Range.' },
      { type: 'table', table: { headers: ['Padrão', 'Tipo', 'Sinal'], rows: [['Martelo', 'Reversão', 'Possível fundo'], ['Engolfo', 'Reversão', 'Mudança de direção'], ['Inside Bar', 'Continuação', 'Pausa antes de rompimento'], ['Doji', 'Indecisão', 'Esperar confirmação']] } },
      { type: 'quiz', quiz: { question: 'O que indica um Engolfo de Alta?', options: [{ id: 'a', text: 'Um candle vermelho grande seguido de um candle verde que o engole completamente' }, { id: 'b', text: 'Dois candles vermelhos seguidos' }, { id: 'c', text: 'Um candle verde pequeno dentro de um candle vermelho' }, { id: 'd', text: 'Sombra longa para cima' }], correctId: 'a', explanation: 'Engolfo de Alta = candle vermelho (venda) seguido de candle verde (compra) que engole o anterior. Indica reversão de baixa para alta.' } },
      { type: 'source', content: 'Steve Nison - Candlestick Charting Essentials' },
    ],
  },
  {
    id: 'extra-3',
    title: 'Timeframes e Confluência',
    duration: '8 min',
    blocks: [
      { type: 'heading', content: 'Por que usar múltiplos timeframes?' },
      { type: 'text', content: 'Cada timeframe (1min, 5min, 15min, 1h, 4h, diário) mostra uma perspectiva diferente do mercado. Usar múltiplos timeframes aumenta a confiabilidade de um setup.' },
      { type: 'callout', content: 'Regra de Ouro: Analise a tendência em timeframe maior, procure entrada em timeframe menor.' },
      { type: 'example', content: 'Exemplo: No gráfico de 1 hora, MES está em tendência de alta (Higher Highs, Higher Lows). No gráfico de 5 minutos, você vê um pullback para suporte. Essa confluência = setup de alta probabilidade.' },
      { type: 'heading', content: 'Confluência de Sinais' },
      { type: 'text', content: 'Confluência acontece quando múltiplos fatores apontam para a mesma direção: suporte/resistência, VWAP, padrão de candle, volume, e tendência em timeframe maior.' },
      { type: 'table', table: { headers: ['Fator', 'Peso', 'Exemplo'], rows: [['Tendência maior', 'Alto', 'Gráfico 1h em alta'], ['Suporte/Resistência', 'Alto', 'Preço testando S1'], ['Volume', 'Médio', 'Volume acima da média'], ['Padrão de Candle', 'Médio', 'Pinbar em suporte']] } },
      { type: 'quiz', quiz: { question: 'Qual é a melhor confluência para um setup LONG?', options: [{ id: 'a', text: 'Apenas preço acima do VWAP' }, { id: 'b', text: 'Tendência de alta em 1h + pullback em 5min + suporte + volume alto' }, { id: 'c', text: 'Candle verde grande' }, { id: 'd', text: 'Preço próximo da resistência' }], correctId: 'b', explanation: 'Quanto mais fatores apontam para a mesma direção, maior a probabilidade. Tendência + nível técnico + padrão + volume = confluência forte.' } },
      { type: 'source', content: 'Al Brooks - Reading Price Charts Bar by Bar' },
    ],
  },
  {
    id: 'extra-4',
    title: 'Stop Loss Placement',
    duration: '9 min',
    blocks: [
      { type: 'heading', content: 'Onde colocar o Stop Loss?' },
      { type: 'text', content: 'O stop loss deve ser colocado em um nível onde sua tese de trade é invalidada. Não deve ser baseado em um valor fixo em dólares, mas em um nível técnico que faz sentido.' },
      { type: 'warning', content: 'Stop loss muito apertado = muitos falsos stops. Stop loss muito largo = risco grande demais. Encontre o equilíbrio.' },
      { type: 'heading', content: 'Técnicas Comuns' },
      { type: 'table', table: { headers: ['Técnica', 'Descrição', 'Risco'], rows: [['Abaixo de Suporte', 'Stop abaixo do nível de suporte testado', 'Baixo a Médio'], ['Abaixo do Candle', 'Stop abaixo do low do candle de entrada', 'Médio'], ['Abaixo da Sombra', 'Stop abaixo da sombra longa do candle', 'Médio a Alto'], ['ATR-based', 'Stop = Entrada - (2 × ATR)', 'Variável']] } },
      { type: 'example', content: 'Você entra LONG em 5450 com suporte em 5440. O stop loss deve estar abaixo de 5440, talvez em 5435. Se o preço quebra 5435, sua tese está errada e você sai.' },
      { type: 'heading', content: 'Razão Risco:Retorno' },
      { type: 'text', content: 'Sempre calcule a razão R:R antes de entrar. Se você arrisca $100 (stop loss), deve ter potencial de ganhar pelo menos $200 (alvo). Razão 1:2 é o mínimo aceitável.' },
      { type: 'quiz', quiz: { question: 'Você entra LONG em 5450, stop em 5440, alvo em 5470. Qual é a razão R:R?', options: [{ id: 'a', text: '1:1' }, { id: 'b', text: '1:2' }, { id: 'c', text: '2:1' }, { id: 'd', text: '1:3' }], correctId: 'b', explanation: 'Risco = 5450 - 5440 = 10 pontos. Retorno = 5470 - 5450 = 20 pontos. Razão = 10:20 = 1:2.' } },
      { type: 'source', content: 'Mark Douglas - Trading in the Zone' },
    ],
  },
  {
    id: 'extra-5',
    title: 'BOS vs CHoCH',
    duration: '7 min',
    blocks: [
      { type: 'heading', content: 'O que é BOS?' },
      { type: 'text', content: 'BOS (Break of Structure) é quando o preço quebra a estrutura anterior. Em uma tendência de alta, um BOS acontece quando o preço faz um Lower Low (LL) — quebra o suporte anterior.' },
      { type: 'example', content: 'Tendência de alta: High 5480, Low 5450. Depois: High 5490, Low 5445 (LL). Esse LL é um BOS — a estrutura de alta foi quebrada.' },
      { type: 'heading', content: 'O que é CHoCH?' },
      { type: 'text', content: 'CHoCH (Change of Character) é uma mudança mais sutil na estrutura. Não é um rompimento claro, mas uma mudança no padrão de movimento. Pode indicar uma reversão iminente.' },
      { type: 'callout', content: 'BOS = rompimento claro. CHoCH = mudança de padrão. BOS é mais confiável, CHoCH é mais subjetivo.' },
      { type: 'heading', content: 'Como usar na prática' },
      { type: 'table', table: { headers: ['Sinal', 'Ação', 'Confiabilidade'], rows: [['BOS de suporte', 'Sair de longs', 'Alta'], ['BOS de resistência', 'Entrar long', 'Alta'], ['CHoCH detectado', 'Preparar reversão', 'Média'], ['BOS + Confluência', 'Entrada forte', 'Muito Alta']] } },
      { type: 'quiz', quiz: { question: 'Qual é a diferença entre BOS e CHoCH?', options: [{ id: 'a', text: 'Não há diferença, são a mesma coisa' }, { id: 'b', text: 'BOS é rompimento claro de estrutura, CHoCH é mudança de padrão mais sutil' }, { id: 'c', text: 'CHoCH é mais confiável que BOS' }, { id: 'd', text: 'BOS só funciona em timeframes maiores' }], correctId: 'b', explanation: 'BOS = quebra clara (novo LL ou HH). CHoCH = mudança no padrão de movimento. BOS é mais objetivo e confiável.' } },
      { type: 'source', content: 'Smart Money Concepts (SMC) Trading' },
    ],
  },
  {
    id: 'extra-6',
    title: 'Loss Streak Psychology',
    duration: '11 min',
    blocks: [
      { type: 'heading', content: 'O que é uma Loss Streak?' },
      { type: 'text', content: 'Uma loss streak é uma sequência de trades perdidos. Pode ser 2, 3, 5 ou mais trades no vermelho. É normal no trading — até os melhores traders têm loss streaks. O problema é como você reage.' },
      { type: 'warning', content: 'A maioria dos traders piora durante uma loss streak porque começa a quebrar suas regras, aumentar o tamanho da posição ou tomar trades de baixa qualidade.' },
      { type: 'heading', content: 'Sinais de Alerta' },
      { type: 'table', table: { headers: ['Comportamento', 'Risco', 'Ação'], rows: [['Aumentar tamanho após perda', 'Muito Alto', 'Parar imediatamente'], ['Tomar trades fora do plano', 'Alto', 'Voltar ao plano'], ['Ignorar stop loss', 'Crítico', 'Sair do mercado'], ['Operar com raiva/frustração', 'Alto', 'Fazer pausa']] } },
      { type: 'heading', content: 'Como lidar com Loss Streaks' },
      { type: 'text', content: 'Primeiro: aceite que loss streaks são parte do trading. Segundo: revise seus últimos trades — há um padrão? Terceiro: reduza o tamanho da posição até recuperar a confiança. Quarto: tome uma pausa se necessário.' },
      { type: 'example', content: 'Você perdeu 3 trades seguidos. Em vez de aumentar o tamanho para "recuperar", reduza para 50% do normal. Foque em trades de alta qualidade apenas. Quando ganhar 3 seguidos, volte ao tamanho normal.' },
      { type: 'heading', content: 'Journaling durante Loss Streaks' },
      { type: 'text', content: 'Escreva cada trade: entrada, saída, razão da perda, o que aprendeu. Depois de uma loss streak, revise o journal procurando por padrões — você está entrando em zonas ruins? Ignorando sinais de alerta? Operando com emoção?' },
      { type: 'callout', content: 'Loss streaks são oportunidades de aprendizado, não fracassos. Os traders que aprendem com loss streaks se tornam mais fortes.' },
      { type: 'quiz', quiz: { question: 'Qual é a melhor ação durante uma loss streak?', options: [{ id: 'a', text: 'Aumentar o tamanho para recuperar rápido' }, { id: 'b', text: 'Reduzir tamanho, revisar trades, focar em qualidade' }, { id: 'c', text: 'Operar mais frequentemente' }, { id: 'd', text: 'Ignorar o journal e seguir adiante' }], correctId: 'b', explanation: 'Reduzir tamanho mantém você no jogo enquanto você se recupera psicologicamente. Revisar trades identifica problemas. Qualidade > quantidade.' } },
      { type: 'source', content: 'Mark Douglas - Trading in the Zone, Van Tharp - Trade Your Way to Financial Freedom' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export default function AcademiaExtra() {
  const [progress, setProgress] = useState<Progress>(loadProgress());
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [, setRefresh] = useState(0);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);

  function handleLessonComplete(lessonId: string) {
    const updated = { ...progress, completedLessons: Array.from(new Set([...progress.completedLessons, lessonId])) };
    setProgress(updated);
    saveProgress(updated);
    setRefresh(r => r + 1);
  }

  function handleQuizAnswer(correct: boolean) {
    // Just track that they answered — no blocking
  }

  if (selectedLesson) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)]">{selectedLesson.title}</h1>
            <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-1">{selectedLesson.duration} de leitura</p>
          </div>
          <button
            onClick={() => setSelectedLessonId(null)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Voltar
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 animate-fade-in-up stagger-1">
          {selectedLesson.blocks.map((block, idx) => (
            <BlockRenderer key={idx} block={block} onQuizAnswer={handleQuizAnswer} />
          ))}
        </div>

        {/* Mark Complete */}
        <div className="flex gap-3 pt-6 border-t border-[var(--border-color)] animate-fade-in-up stagger-2">
          <button
            onClick={() => {
              handleLessonComplete(selectedLesson.id);
              setSelectedLessonId(null);
            }}
            className="td-btn flex-1 bg-[var(--green)] text-[var(--bg-base)] hover:bg-[#00d4aa]"
          >
            ✓ Marcar como Completo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="font-mono-title text-lg font-semibold text-[var(--text-primary)]">ACADEMIA EXTRA</h1>
        <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-1">6 lições avançadas · Paper Trade</p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 gap-3 animate-fade-in-up stagger-1">
        {lessons.map((lesson) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className="td-card p-4 text-left hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-mono-title text-[13px] font-semibold text-[var(--text-primary)]">{lesson.title}</p>
                  <p className="font-mono-title text-[11px] text-[var(--text-muted)] mt-1">{lesson.duration}</p>
                </div>
                {isCompleted && <span className="text-[var(--green)] text-lg">✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="td-card p-4 animate-fade-in-up stagger-2">
        <p className="font-mono-title text-[13px] font-semibold text-[var(--text-primary)] mb-3">PROGRESSO</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-[var(--bg-base)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--green)] transition-all duration-300"
              style={{ width: `${(progress.completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
          <span className="font-mono-title text-[12px] text-[var(--text-muted)]">
            {progress.completedLessons.length}/{lessons.length}
          </span>
        </div>
      </div>
    </div>
  );
}
