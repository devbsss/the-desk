import React, { useState, useEffect } from 'react';
import { studyModules, StudyModule, StudyLesson, ContentBlock, QuizBlock } from '../data/academiaStudyContent';
import { SVG_MAP } from '../data/academiaSVGs';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
interface Progress {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem('academia-progress-v2');
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: [], completedQuizzes: [], quizScores: {} };
}

function saveProgress(p: Progress) {
  localStorage.setItem('academia-progress-v2', JSON.stringify(p));
}

// ─────────────────────────────────────────────────────────────
// Inline Quiz (inside study mode)
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
          <p className="text-[#f59e0b] text-sm leading-relaxed">
            <span className="font-bold">⚠ Atenção: </span>{block.content}
          </p>
        </div>
      );
    case 'example':
      return (
        <div className="my-5 rounded-lg border border-[#1a1a1a] bg-[#0d0d0d] p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-widest text-[#4f9eff]">📌 EXEMPLO REAL</span>
          </div>
          <p className="text-[#9ab8e0] text-sm leading-relaxed">{block.content}</p>
        </div>
      );
    case 'table':
      if (!block.table) return null;
      return (
        <div className="my-5 overflow-x-auto rounded-lg border border-[#1a1a1a]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1a1a1a] bg-[#0d0d0d]">
                {block.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-[#888] font-semibold text-xs tracking-wider uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#111] hover:bg-[#0d0d0d] transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 text-sm ${ci === 0 ? 'text-[#e8e8e8] font-medium' : 'text-[#888]'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'svg': {
      const SvgComp = block.svgId ? SVG_MAP[block.svgId] : null;
      if (!SvgComp) return null;
      return (
        <div className="my-6">
          {block.content && <p className="text-xs text-[#555] text-center mb-2 tracking-wider uppercase">{block.content}</p>}
          <div className="rounded-xl overflow-hidden border border-[#1a1a1a]"><SvgComp /></div>
        </div>
      );
    }
    case 'quiz':
      if (!block.quiz) return null;
      return <InlineQuiz quiz={block.quiz} onAnswer={onQuizAnswer} />;
    case 'source':
      return (
        <div className="mt-2 mb-1">
          <a href={block.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#555] hover:text-[#888] transition-colors">
            <span>📎</span>
            <span className="underline underline-offset-2">{block.label || block.url}</span>
          </a>
        </div>
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Study Mode
// ─────────────────────────────────────────────────────────────
function StudyMode({ module, lesson, onComplete, onBack }: {
  module: StudyModule; lesson: StudyLesson; onComplete: () => void; onBack: () => void;
}) {
  // Inline quizzes are for fixation only — they never block lesson completion
  const canComplete = true;

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="sticky top-0 z-10 bg-[#080808]/95 backdrop-blur border-b border-[#111] px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-[#555] hover:text-[#888] transition-colors text-sm">← Voltar</button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#555] truncate">{module.title}</span>
            <span className="text-[#333]">/</span>
            <span className="text-xs text-[#888] truncate">{lesson.title}</span>
          </div>
        </div>
        <span className="text-xs text-[#555] shrink-0">⏱ {lesson.duration}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-widest" style={{ color: module.color }}>
              MÓDULO {module.number} — LIÇÃO {lesson.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#e8e8e8] leading-tight">{lesson.title}</h1>
        </div>

        {lesson.blocks.filter(b => b.type !== 'source').map((block, i) => (
          <BlockRenderer key={i} block={block} onQuizAnswer={() => {}} />
        ))}

        {lesson.blocks.some(b => b.type === 'source') && (
          <div className="mt-8 pt-6 border-t border-[#111]">
            <p className="text-xs text-[#444] font-bold tracking-widest mb-2">FONTES</p>
            {lesson.blocks.filter(b => b.type === 'source').map((b, i) => (
              <BlockRenderer key={i} block={b} onQuizAnswer={() => {}} />
            ))}
          </div>
        )}

        <div className="mt-10 mb-8">
          {canComplete ? (
            <button onClick={onComplete}
              className="w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-200 active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, ${module.color}22, ${module.color}11)`, border: `1px solid ${module.color}44`, color: module.color }}>
              ✓ MARCAR LIÇÃO COMO CONCLUÍDA
            </button>
          ) : (
            <div className="w-full py-4 rounded-xl text-center text-sm text-[#444] border border-[#111]">
              Responda todas as questões de fixação para concluir
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Quiz Mode
// ─────────────────────────────────────────────────────────────
function QuizMode({ module, onFinish, onBack }: {
  module: StudyModule; onFinish: (score: number) => void; onBack: () => void;
}) {
  const questions = module.quizQuestions;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  function handleSelect(id: string) {
    if (answered) return;
    setSelected(id);
    setAnswered(true);
    if (id === questions[current].correctId) setCorrectCount(c => c + 1);
  }

  function handleNext() {
    const newCorrect = correctCount + (selected === questions[current].correctId ? 1 : 0);
    if (current + 1 >= questions.length) {
      const score = Math.round((newCorrect / questions.length) * 100);
      setFinalScore(score);
      setFinished(true);
      onFinish(score);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  const q = questions[current];

  if (finished) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">{finalScore >= 80 ? '🏆' : finalScore >= 60 ? '📈' : '📚'}</div>
          <h2 className="text-2xl font-bold text-[#e8e8e8] mb-2">Quiz Concluído!</h2>
          <p className="text-[#555] mb-6">{module.title}</p>
          <div className="text-5xl font-bold mb-2" style={{ color: finalScore >= 80 ? '#00d4aa' : finalScore >= 60 ? '#f59e0b' : '#ff4444' }}>
            {finalScore}%
          </div>
          <p className="text-[#555] text-sm mb-8">{correctCount} de {questions.length} questões corretas</p>
          {finalScore >= 80 ? (
            <p className="text-[#00d4aa] text-sm mb-6">Excelente! Você domina este módulo.</p>
          ) : finalScore >= 60 ? (
            <p className="text-[#f59e0b] text-sm mb-6">Bom resultado! Revise as lições onde errou.</p>
          ) : (
            <p className="text-[#ff8888] text-sm mb-6">Revise o material de estudo e tente novamente.</p>
          )}
          <button onClick={onBack} className="w-full py-3 rounded-xl border border-[#1a1a1a] text-[#888] text-sm hover:border-[#333] transition-colors">
            Voltar ao Módulo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="sticky top-0 z-10 bg-[#080808]/95 backdrop-blur border-b border-[#111] px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="text-[#555] hover:text-[#888] transition-colors text-sm">← Sair do Quiz</button>
          <span className="text-xs text-[#555]">{current + 1} / {questions.length}</span>
        </div>
        <div className="h-1 bg-[#111] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(current / questions.length) * 100}%`, backgroundColor: module.color }} />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="mb-2">
          <span className="text-xs font-bold tracking-widest" style={{ color: module.color }}>QUIZ — {module.title.toUpperCase()}</span>
        </div>
        <h2 className="text-[#e8e8e8] text-lg font-semibold leading-relaxed mb-8">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt) => {
            let cls = 'w-full text-left px-5 py-4 rounded-xl border text-sm transition-all duration-150 ';
            if (!answered) cls += 'border-[#1a1a1a] bg-[#0d0d0d] text-[#ccc] hover:border-[#333] hover:bg-[#111] cursor-pointer active:scale-[0.99]';
            else if (opt.id === q.correctId) cls += 'border-[#00d4aa] bg-[#00d4aa]/10 text-[#00d4aa] font-medium';
            else if (opt.id === selected && opt.id !== q.correctId) cls += 'border-[#ff4444] bg-[#ff4444]/10 text-[#ff4444]';
            else cls += 'border-[#111] bg-[#0a0a0a] text-[#444]';
            return (
              <button key={opt.id} className={cls} onClick={() => handleSelect(opt.id)}>
                <span className="font-bold mr-3 text-[#444]">{opt.id.toUpperCase()}.</span>{opt.text}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-5 p-4 rounded-xl text-sm leading-relaxed ${selected === q.correctId ? 'bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/30' : 'bg-[#ff4444]/10 text-[#ff8888] border border-[#ff4444]/30'}`}>
            <span className="font-bold">{selected === q.correctId ? '✓ Correto! ' : '✗ Incorreto. '}</span>
            {q.explanation}
          </div>
        )}

        {answered && (
          <button onClick={handleNext}
            className="mt-6 w-full py-4 rounded-xl font-bold text-sm tracking-widest transition-all duration-150 active:scale-[0.98]"
            style={{ background: `linear-gradient(135deg, ${module.color}22, ${module.color}11)`, border: `1px solid ${module.color}44`, color: module.color }}>
            {current + 1 >= questions.length ? 'VER RESULTADO' : 'PRÓXIMA QUESTÃO →'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Module Detail
// ─────────────────────────────────────────────────────────────
function ModuleDetail({ module, progress, onSelectLesson, onStartQuiz, onBack }: {
  module: StudyModule; progress: Progress;
  onSelectLesson: (l: StudyLesson) => void; onStartQuiz: () => void; onBack: () => void;
}) {
  const completedCount = module.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const allDone = completedCount === module.lessons.length;
  const quizScore = progress.quizScores[module.id];
  const quizDone = progress.completedQuizzes.includes(module.id);

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="sticky top-0 z-10 bg-[#080808]/95 backdrop-blur border-b border-[#111] px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-[#555] hover:text-[#888] transition-colors text-sm">← Academia</button>
        <span className="text-[#333]">|</span>
        <span className="text-sm text-[#888]">{module.title}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{module.icon}</span>
            <div>
              <p className="text-xs text-[#555] tracking-widest font-bold">MÓDULO {module.number}</p>
              <h1 className="text-xl font-bold text-[#e8e8e8]">{module.title}</h1>
            </div>
          </div>
          <p className="text-[#555] text-sm">{module.subtitle}</p>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#555] mb-1">
              <span>{completedCount} de {module.lessons.length} lições concluídas</span>
              <span>{Math.round((completedCount / module.lessons.length) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-[#111] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(completedCount / module.lessons.length) * 100}%`, backgroundColor: module.color }} />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-[#555] mb-3">LIÇÕES DE ESTUDO</p>
          <div className="space-y-2">
            {module.lessons.map((lesson, idx) => {
              const done = progress.completedLessons.includes(lesson.id);
              return (
                <button key={lesson.id} onClick={() => onSelectLesson(lesson)}
                  className="w-full text-left rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-4 hover:border-[#222] hover:bg-[#111] transition-all duration-150 active:scale-[0.99] group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors"
                      style={{ background: done ? `${module.color}22` : '#111', border: `1px solid ${done ? module.color + '44' : '#1a1a1a'}`, color: done ? module.color : '#555' }}>
                      {done ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${done ? 'text-[#888]' : 'text-[#e8e8e8]'}`}>{lesson.title}</p>
                      <p className="text-xs text-[#444] mt-0.5">⏱ {lesson.duration}</p>
                    </div>
                    <span className="text-[#333] group-hover:text-[#555] transition-colors text-sm">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
              style={{ background: `${module.color}15`, border: `1px solid ${module.color}30` }}>🎯</div>
            <div>
              <p className="text-[#e8e8e8] font-semibold text-sm">Quiz de {module.title}</p>
              <p className="text-[#555] text-xs mt-0.5">{module.quizQuestions.length} questões · Teste seus conhecimentos</p>
            </div>
          </div>

          {quizDone && (
            <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111] border border-[#1a1a1a]">
              <span className="text-xs text-[#555]">Última pontuação:</span>
              <span className="text-sm font-bold" style={{ color: (quizScore ?? 0) >= 80 ? '#00d4aa' : (quizScore ?? 0) >= 60 ? '#f59e0b' : '#ff4444' }}>
                {quizScore}%
              </span>
            </div>
          )}

          {!allDone && (
            <div className="mb-3 px-3 py-2 rounded-lg bg-[#f59e0b]/5 border border-[#f59e0b]/20">
              <p className="text-[#f59e0b] text-xs">💡 Recomendado: conclua todas as lições antes de fazer o quiz</p>
            </div>
          )}

          <button onClick={onStartQuiz}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-widest transition-all duration-150 active:scale-[0.98]"
            style={{ background: allDone ? `linear-gradient(135deg, ${module.color}22, ${module.color}11)` : '#0d0d0d', border: `1px solid ${allDone ? module.color + '44' : '#1a1a1a'}`, color: allDone ? module.color : '#555' }}>
            {quizDone ? '↺ REFAZER QUIZ' : 'INICIAR QUIZ →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────
export default function Academia() {
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [selectedModule, setSelectedModule] = useState<StudyModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<StudyLesson | null>(null);
  const [quizMode, setQuizMode] = useState(false);

  useEffect(() => { saveProgress(progress); }, [progress]);

  function markLessonComplete(lessonId: string) {
    setProgress(prev => prev.completedLessons.includes(lessonId) ? prev : { ...prev, completedLessons: [...prev.completedLessons, lessonId] });
    setSelectedLesson(null);
  }

  function markQuizComplete(moduleId: string, score: number) {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: prev.completedQuizzes.includes(moduleId) ? prev.completedQuizzes : [...prev.completedQuizzes, moduleId],
      quizScores: { ...prev.quizScores, [moduleId]: score },
    }));
  }

  if (quizMode && selectedModule) {
    return <QuizMode module={selectedModule} onFinish={(score) => { markQuizComplete(selectedModule.id, score); }} onBack={() => setQuizMode(false)} />;
  }

  if (selectedLesson && selectedModule) {
    return <StudyMode module={selectedModule} lesson={selectedLesson} onComplete={() => markLessonComplete(selectedLesson.id)} onBack={() => setSelectedLesson(null)} />;
  }

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} progress={progress} onSelectLesson={setSelectedLesson} onStartQuiz={() => setQuizMode(true)} onBack={() => setSelectedModule(null)} />;
  }

  const totalLessons = studyModules.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#e8e8e8] mb-1">Academia</h1>
          <p className="text-[#555] text-sm">Aprenda trading de futuros com conteúdo baseado em fontes reais</p>
          {progress.completedLessons.length > 0 && (
            <div className="mt-4 flex items-center gap-4 text-xs text-[#555]">
              <span>{progress.completedLessons.length}/{totalLessons} lições</span>
              <span>·</span>
              <span>{progress.completedQuizzes.length}/{studyModules.length} quizzes</span>
            </div>
          )}
        </div>

        <div className="mb-8 rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-4">
          <p className="text-xs font-bold tracking-widest text-[#555] mb-3">COMO FUNCIONA</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📖', title: 'Estude', desc: 'Leia o conteúdo completo com exemplos reais e diagramas' },
              { icon: '✏️', title: 'Fixe', desc: 'Questões intercaladas no material para consolidar o aprendizado' },
              { icon: '🎯', title: 'Teste', desc: 'Quando se sentir pronto, faça o quiz do módulo' },
              { icon: '🏆', title: 'Avance', desc: 'Complete todos os módulos e domine o trading de futuros' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-2">
                <span className="text-base shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-[#888]">{item.title}</p>
                  <p className="text-xs text-[#444] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {studyModules.map(module => {
            const completedCount = module.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const pct = Math.round((completedCount / module.lessons.length) * 100);
            const quizDone = progress.completedQuizzes.includes(module.id);
            const quizScore = progress.quizScores[module.id];
            return (
              <button key={module.id} onClick={() => setSelectedModule(module)}
                className="w-full text-left rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] p-5 hover:border-[#222] hover:bg-[#111] transition-all duration-150 active:scale-[0.99] group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${module.color}15`, border: `1px solid ${module.color}30` }}>
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-xs text-[#555] font-bold tracking-wider">MÓDULO {module.number}</p>
                      {quizDone && (
                        <span className="text-xs font-bold" style={{ color: (quizScore ?? 0) >= 80 ? '#00d4aa' : '#f59e0b' }}>
                          Quiz {quizScore}%
                        </span>
                      )}
                    </div>
                    <p className="text-[#e8e8e8] font-semibold text-sm">{module.title}</p>
                    <p className="text-[#555] text-xs mt-0.5 truncate">{module.subtitle}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-[#444] mb-1">
                        <span>{module.lessons.length} lições · {module.quizQuestions.length} questões no quiz</span>
                        <span style={{ color: pct === 100 ? module.color : '#444' }}>{pct}%</span>
                      </div>
                      <div className="h-1 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: module.color }} />
                      </div>
                    </div>
                  </div>
                  <span className="text-[#333] group-hover:text-[#555] transition-colors text-sm mt-1">→</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#333]">Conteúdo baseado em CME Group Education, Investopedia, Steve Nison e Mark Douglas</p>
        </div>
      </div>
    </div>
  );
}
