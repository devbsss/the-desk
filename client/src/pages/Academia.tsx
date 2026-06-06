import { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  ChevronRight,
  CheckCircle,
  XCircle,
  Trophy,
  Star,
  Zap,
  Target,
  TrendingUp,
  Brain,
  ArrowLeft,
  RotateCcw,
  Award,
} from "lucide-react";
import {
  ACADEMIA_MODULES,
  getModuleProgress,
  getTotalProgress,
  type Module,
  type Lesson,
  type Question,
} from "@/lib/academiaData";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | "home"
  | "module_detail"
  | "lesson_intro"
  | "quiz"
  | "lesson_complete"
  | "module_complete";

interface AcademiaProgress {
  [key: string]: boolean[];
}

const STORAGE_KEY = "the-desk-academia-progress";

function loadProgress(): AcademiaProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: AcademiaProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ─── Module Icon ──────────────────────────────────────────────────────────────
function ModuleIcon({ id }: { id: number }) {
  const icons = [
    <BookOpen size={22} />,
    <TrendingUp size={22} />,
    <Brain size={22} />,
    <Target size={22} />,
  ];
  return <>{icons[id - 1] || <BookOpen size={22} />}</>;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({
  value,
  max,
  color = "#26A69A",
}: {
  value: number;
  max: number;
  color?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  onAnswer,
  answered,
  selectedIndex,
  isCorrect,
}: {
  question: Question;
  onAnswer: (idx: number | null) => void;
  answered: boolean;
  selectedIndex: number | null;
  isCorrect: boolean | null;
}) {
  const isMultipleChoice =
    question.type === "multiple_choice" || question.type === "true_false";
  const isOpenEnded =
    question.type === "calculation" || question.type === "scenario";

  return (
    <div className="space-y-4">
      {/* Question text */}
      <div className="bg-[#0f0f0f] border border-[#222] rounded-lg p-4">
        <div className="text-[10px] text-[#555] font-mono uppercase tracking-widest mb-2">
          {question.type === "multiple_choice" && "Múltipla Escolha"}
          {question.type === "true_false" && "Verdadeiro ou Falso"}
          {question.type === "calculation" && "Cálculo"}
          {question.type === "scenario" && "Cenário"}
        </div>
        <p className="text-[#e0e0e0] font-sans text-sm leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Options for multiple choice / true-false */}
      {isMultipleChoice && question.options && (
        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let borderColor = "#222";
            let bgColor = "transparent";
            let textColor = "#aaa";

            if (answered) {
              if (i === question.correctIndex) {
                borderColor = "#26A69A";
                bgColor = "rgba(38,166,154,0.1)";
                textColor = "#26A69A";
              } else if (i === selectedIndex && i !== question.correctIndex) {
                borderColor = "#EF5350";
                bgColor = "rgba(239,83,80,0.1)";
                textColor = "#EF5350";
              }
            } else if (selectedIndex === i) {
              borderColor = "#FFB74D";
              bgColor = "rgba(255,183,77,0.08)";
              textColor = "#FFB74D";
            }

            return (
              <button
                key={i}
                onClick={() => !answered && onAnswer(i)}
                disabled={answered}
                className="w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 text-sm font-sans"
                style={{
                  borderColor,
                  backgroundColor: bgColor,
                  color: textColor,
                  cursor: answered ? "default" : "pointer",
                }}
              >
                <span className="font-mono text-xs mr-3 opacity-60">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Open-ended: show answer button */}
      {isOpenEnded && !answered && (
        <button
          onClick={() => onAnswer(null)}
          className="w-full py-3 rounded-lg border border-[#333] text-[#aaa] text-sm font-sans hover:border-[#26A69A] hover:text-[#26A69A] transition-colors"
        >
          Ver Resposta
        </button>
      )}

      {/* Feedback */}
      {answered && (
        <div
          className="rounded-lg p-4 border"
          style={{
            borderColor: isCorrect ? "#26A69A" : "#EF5350",
            backgroundColor: isCorrect
              ? "rgba(38,166,154,0.08)"
              : "rgba(239,83,80,0.08)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle size={16} className="text-[#26A69A]" />
            ) : (
              <XCircle size={16} className="text-[#EF5350]" />
            )}
            <span
              className="text-xs font-mono font-bold uppercase tracking-wider"
              style={{ color: isCorrect ? "#26A69A" : "#EF5350" }}
            >
              {isCorrect ? "Correto!" : "Incorreto"}
            </span>
          </div>
          {!isCorrect && isOpenEnded && question.correctAnswer && (
            <div className="mb-2 text-xs font-mono text-[#26A69A]">
              Resposta: {question.correctAnswer}
            </div>
          )}
          {isOpenEnded && question.correctAnswer && (
            <div className="mb-2 text-xs font-mono text-[#26A69A]">
              Resposta: {question.correctAnswer}
            </div>
          )}
          <p className="text-xs text-[#aaa] font-sans leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Lesson Complete Screen ───────────────────────────────────────────────────
function LessonCompleteScreen({
  lesson,
  score,
  total,
  onContinue,
  onRetry,
}: {
  lesson: Lesson;
  score: number;
  total: number;
  onContinue: () => void;
  onRetry: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center border-2"
        style={{
          borderColor: passed ? "#26A69A" : "#EF5350",
          backgroundColor: passed
            ? "rgba(38,166,154,0.1)"
            : "rgba(239,83,80,0.1)",
        }}
      >
        {passed ? (
          <Trophy size={36} className="text-[#26A69A]" />
        ) : (
          <RotateCcw size={36} className="text-[#EF5350]" />
        )}
      </div>

      <div>
        <h2 className="text-xl font-mono font-bold text-[#e0e0e0] mb-1">
          {passed ? "Lição Completa!" : "Tente Novamente"}
        </h2>
        <p className="text-sm text-[#666] font-sans">{lesson.title}</p>
      </div>

      <div className="flex gap-6">
        <div className="text-center">
          <div
            className="text-3xl font-mono font-bold"
            style={{ color: passed ? "#26A69A" : "#EF5350" }}
          >
            {pct}%
          </div>
          <div className="text-[10px] text-[#555] uppercase tracking-wider mt-1">
            Acertos
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-[#FFB74D]">
            {score}/{total}
          </div>
          <div className="text-[10px] text-[#555] uppercase tracking-wider mt-1">
            Questões
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-[#AB47BC]">
            +{passed ? score * 10 : 0}
          </div>
          <div className="text-[10px] text-[#555] uppercase tracking-wider mt-1">
            XP
          </div>
        </div>
      </div>

      {passed ? (
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-lg font-mono text-sm font-bold text-black transition-all active:scale-95"
          style={{ backgroundColor: "#26A69A" }}
        >
          CONTINUAR
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="px-6 py-3 rounded-lg font-mono text-sm font-bold border border-[#EF5350] text-[#EF5350] hover:bg-[rgba(239,83,80,0.1)] transition-all"
          >
            TENTAR NOVAMENTE
          </button>
          <button
            onClick={onContinue}
            className="px-6 py-3 rounded-lg font-mono text-sm font-bold border border-[#333] text-[#666] hover:border-[#555] transition-all"
          >
            PULAR
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Module Complete Screen ───────────────────────────────────────────────────
function ModuleCompleteScreen({
  module: mod,
  onBack,
}: {
  module: Module;
  onBack: () => void;
}) {
  const totalQ = mod.lessons.reduce((s, l) => s + l.questions.length, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center border-2"
        style={{
          borderColor: mod.color,
          backgroundColor: `${mod.color}20`,
        }}
      >
        <Award size={40} style={{ color: mod.color }} />
      </div>

      <div>
        <div
          className="text-xs font-mono uppercase tracking-widest mb-2"
          style={{ color: mod.color }}
        >
          Módulo Completo!
        </div>
        <h2 className="text-2xl font-mono font-bold text-[#e0e0e0] mb-1">
          {mod.title}
        </h2>
        <p className="text-sm text-[#666] font-sans">{mod.subtitle}</p>
      </div>

      <div className="flex gap-6">
        <div className="text-center">
          <div
            className="text-3xl font-mono font-bold"
            style={{ color: mod.color }}
          >
            {mod.lessons.length}
          </div>
          <div className="text-[10px] text-[#555] uppercase tracking-wider mt-1">
            Lições
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-[#FFB74D]">
            {totalQ * 10}
          </div>
          <div className="text-[10px] text-[#555] uppercase tracking-wider mt-1">
            XP Total
          </div>
        </div>
      </div>

      <div
        className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest border"
        style={{ borderColor: mod.color, color: mod.color }}
      >
        🏆 Badge: {mod.title} Master
      </div>

      <button
        onClick={onBack}
        className="px-8 py-3 rounded-lg font-mono text-sm font-bold text-black transition-all active:scale-95"
        style={{ backgroundColor: mod.color }}
      >
        VOLTAR AO INÍCIO
      </button>
    </div>
  );
}

// ─── Quiz Engine ──────────────────────────────────────────────────────────────
function QuizEngine({
  lesson,
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}) {
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const question = lesson.questions[qIdx];
  const total = lesson.questions.length;

  const handleAnswer = useCallback(
    (idx: number | null) => {
      if (answered) return;
      setSelectedIndex(idx);
      setAnswered(true);

      const correct =
        question.type === "calculation" || question.type === "scenario"
          ? true
          : idx === question.correctIndex;

      setIsCorrect(correct);
      if (correct) setScore((s) => s + 1);
    },
    [answered, question]
  );

  const handleNext = () => {
    const finalScore = score + (isCorrect && !answered ? 1 : 0);
    if (qIdx + 1 < total) {
      setQIdx((i) => i + 1);
      setAnswered(false);
      setSelectedIndex(null);
      setIsCorrect(null);
    } else {
      onComplete(score, total);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-[#555] hover:text-[#aaa] transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <ProgressBar value={qIdx} max={total} />
        </div>
        <span className="text-xs font-mono text-[#555]">
          {qIdx + 1}/{total}
        </span>
      </div>

      {/* Lesson title */}
      <div>
        <div className="text-[10px] text-[#555] font-mono uppercase tracking-widest mb-1">
          {lesson.id} — Quiz
        </div>
        <h2 className="text-base font-mono font-bold text-[#e0e0e0]">
          {lesson.title}
        </h2>
      </div>

      {/* Question */}
      <QuestionCard
        question={question}
        onAnswer={handleAnswer}
        answered={answered}
        selectedIndex={selectedIndex}
        isCorrect={isCorrect}
      />

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg font-mono text-sm font-bold text-black transition-all active:scale-95"
          style={{ backgroundColor: "#26A69A" }}
        >
          {qIdx + 1 < total ? "PRÓXIMA QUESTÃO" : "VER RESULTADO"}
        </button>
      )}
    </div>
  );
}

// ─── Lesson Intro Screen ──────────────────────────────────────────────────────
function LessonIntro({
  lesson,
  onStart,
  onBack,
}: {
  lesson: Lesson;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#555] hover:text-[#aaa] transition-colors text-sm font-mono"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div>
        <div className="text-[10px] text-[#555] font-mono uppercase tracking-widest mb-1">
          Lição {lesson.id}
        </div>
        <h2 className="text-xl font-mono font-bold text-[#e0e0e0] mb-1">
          {lesson.title}
        </h2>
        <div className="text-xs text-[#555] font-mono">
          {lesson.questions.length} questões
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {lesson.content.map((line, i) => (
          <div
            key={i}
            className="flex gap-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3"
          >
            <span className="text-[#26A69A] font-mono text-xs mt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm text-[#ccc] font-sans leading-relaxed">
              {line}
            </p>
          </div>
        ))}
      </div>

      {/* Key concept */}
      <div className="bg-[#0f0f0f] border border-[#26A69A33] rounded-lg p-4">
        <div className="text-[10px] text-[#26A69A] font-mono uppercase tracking-widest mb-2">
          Conceito-chave
        </div>
        <p className="text-sm text-[#e0e0e0] font-sans italic leading-relaxed">
          "{lesson.keyConcept}"
        </p>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 rounded-lg font-mono text-sm font-bold text-black transition-all active:scale-95"
        style={{ backgroundColor: "#26A69A" }}
      >
        INICIAR QUIZ →
      </button>
    </div>
  );
}

// ─── Module Detail Screen ─────────────────────────────────────────────────────
function ModuleDetail({
  module: mod,
  progress,
  onSelectLesson,
  onBack,
}: {
  module: Module;
  progress: AcademiaProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}) {
  const key = `mod${mod.id}`;
  const prog = progress[key] || new Array(mod.lessons.length).fill(false);
  const completed = prog.filter(Boolean).length;

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#555] hover:text-[#aaa] transition-colors text-sm font-mono"
      >
        <ArrowLeft size={16} />
        Módulos
      </button>

      {/* Module header */}
      <div
        className="rounded-xl p-5 border"
        style={{
          borderColor: `${mod.color}33`,
          backgroundColor: `${mod.color}08`,
        }}
      >
        <div
          className="text-xs font-mono uppercase tracking-widest mb-1"
          style={{ color: mod.color }}
        >
          Módulo {mod.id} — {mod.subtitle}
        </div>
        <h2 className="text-xl font-mono font-bold text-[#e0e0e0] mb-3">
          {mod.title}
        </h2>
        <ProgressBar value={completed} max={mod.lessons.length} color={mod.color} />
        <div className="text-xs text-[#555] font-mono mt-2">
          {completed}/{mod.lessons.length} lições completas
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-2">
        {mod.lessons.map((lesson, i) => {
          const done = prog[i] === true;
          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className="w-full flex items-center gap-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4 hover:border-[#333] transition-all text-left group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  borderColor: done ? mod.color : "#333",
                  backgroundColor: done ? `${mod.color}20` : "transparent",
                }}
              >
                {done ? (
                  <CheckCircle size={16} style={{ color: mod.color }} />
                ) : (
                  <span className="text-xs font-mono text-[#555]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-mono text-[#e0e0e0] group-hover:text-white transition-colors truncate">
                  {lesson.title}
                </div>
                <div className="text-xs text-[#555] font-mono mt-0.5">
                  {lesson.questions.length} questões
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-[#333] group-hover:text-[#555] transition-colors shrink-0"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({
  progress,
  onSelectModule,
}: {
  progress: AcademiaProgress;
  onSelectModule: (mod: Module) => void;
}) {
  const { completed, total } = getTotalProgress(progress);
  const totalXP = completed * 50;
  const totalQuestions = ACADEMIA_MODULES.reduce(
    (s, m) => s + m.lessons.reduce((ss, l) => ss + l.questions.length, 0),
    0
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-[#e0e0e0]">
          ACADEMIA
        </h1>
        <p className="text-xs text-[#555] font-mono mt-1">
          Aprenda trading de forma interativa
        </p>
      </div>

      {/* Overall progress */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-[#555] font-mono uppercase tracking-wider mb-1">
              Progresso Geral
            </div>
            <div className="text-2xl font-mono font-bold text-[#e0e0e0]">
              {completed}
              <span className="text-sm text-[#555]">/{total} lições</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-[#FFB74D]">
              {totalXP}
            </div>
            <div className="text-[10px] text-[#555] font-mono uppercase tracking-wider">
              XP Total
            </div>
          </div>
        </div>
        <ProgressBar value={completed} max={total} />
      </div>

      {/* Modules */}
      <div className="space-y-3">
        <div className="text-xs text-[#555] font-mono uppercase tracking-widest">
          Módulos
        </div>
        {ACADEMIA_MODULES.map((mod) => {
          const { completed: c, total: t } = getModuleProgress(mod.id, progress);
          const pct = t > 0 ? Math.round((c / t) * 100) : 0;
          const allDone = c === t && t > 0;

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 hover:border-[#2a2a2a] transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${mod.color}20`,
                    color: mod.color,
                  }}
                >
                  <ModuleIcon id={mod.id} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-mono font-bold text-[#e0e0e0] group-hover:text-white transition-colors">
                      {mod.title}
                    </span>
                    {allDone && (
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${mod.color}20`,
                          color: mod.color,
                        }}
                      >
                        ✓ COMPLETO
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#555] font-mono mb-3">
                    {mod.subtitle} · {t} lições
                  </div>
                  <ProgressBar value={c} max={t} color={mod.color} />
                  <div className="text-[10px] text-[#555] font-mono mt-1.5">
                    {c}/{t} · {pct}%
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#333] group-hover:text-[#555] transition-colors shrink-0 mt-1"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Módulos",
            value: ACADEMIA_MODULES.length,
            icon: <BookOpen size={14} />,
          },
          { label: "Lições", value: total, icon: <Star size={14} /> },
          {
            label: "Questões",
            value: totalQuestions,
            icon: <Zap size={14} />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3 text-center"
          >
            <div className="text-[#555] flex justify-center mb-1">
              {stat.icon}
            </div>
            <div className="text-lg font-mono font-bold text-[#e0e0e0]">
              {stat.value}
            </div>
            <div className="text-[10px] text-[#555] font-mono uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Academia() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<AcademiaProgress>(loadProgress);
  const [quizScore, setQuizScore] = useState<{
    score: number;
    total: number;
  } | null>(null);

  // Persist progress
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markLessonComplete = useCallback(
    (moduleId: number, lessonIndex: number) => {
      setProgress((prev) => {
        const key = `mod${moduleId}`;
        const mod = ACADEMIA_MODULES.find((m) => m.id === moduleId)!;
        const arr = prev[key] || new Array(mod.lessons.length).fill(false);
        const next = [...arr];
        next[lessonIndex] = true;
        return { ...prev, [key]: next };
      });
    },
    []
  );

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore({ score, total });
    setScreen("lesson_complete");
  };

  const handleLessonContinue = () => {
    if (!selectedModule || !selectedLesson) return;
    const lessonIndex = selectedModule.lessons.findIndex(
      (l) => l.id === selectedLesson.id
    );
    const passed = quizScore ? quizScore.score / quizScore.total >= 0.6 : false;

    if (passed) {
      markLessonComplete(selectedModule.id, lessonIndex);
    }

    // Check if module is now complete
    const key = `mod${selectedModule.id}`;
    const updatedArr =
      progress[key] || new Array(selectedModule.lessons.length).fill(false);
    const next = [...updatedArr];
    if (passed) next[lessonIndex] = true;
    const allDone = next.every(Boolean);

    if (allDone) {
      setScreen("module_complete");
    } else {
      setScreen("module_detail");
    }
  };

  const handleLessonRetry = () => {
    setQuizScore(null);
    setScreen("quiz");
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <HomeScreen
        progress={progress}
        onSelectModule={(mod) => {
          setSelectedModule(mod);
          setScreen("module_detail");
        }}
      />
    );
  }

  if (screen === "module_detail" && selectedModule) {
    return (
      <ModuleDetail
        module={selectedModule}
        progress={progress}
        onSelectLesson={(lesson) => {
          setSelectedLesson(lesson);
          setScreen("lesson_intro");
        }}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "lesson_intro" && selectedLesson) {
    return (
      <LessonIntro
        lesson={selectedLesson}
        onStart={() => setScreen("quiz")}
        onBack={() => setScreen("module_detail")}
      />
    );
  }

  if (screen === "quiz" && selectedLesson) {
    return (
      <QuizEngine
        lesson={selectedLesson}
        onComplete={handleQuizComplete}
        onBack={() => setScreen("lesson_intro")}
      />
    );
  }

  if (screen === "lesson_complete" && selectedLesson && quizScore) {
    return (
      <LessonCompleteScreen
        lesson={selectedLesson}
        score={quizScore.score}
        total={quizScore.total}
        onContinue={handleLessonContinue}
        onRetry={handleLessonRetry}
      />
    );
  }

  if (screen === "module_complete" && selectedModule) {
    return (
      <ModuleCompleteScreen
        module={selectedModule}
        onBack={() => setScreen("home")}
      />
    );
  }

  return null;
}
