import { useEffect, useState } from 'react'
import API_BASE from '../../config'
import Loader from '../../shared/Loader'

function QuizSession({ unitId, unitTitle, moduleNumber, moduleId, courseId, unitNumber, difficulty, onRetry }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/api/quiz/${unitId}?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) { setError(data.error); return; }
        setQuestions(data.questions)
      })
      .catch(() => setError('Failed to load quiz.'))
      .finally(() => setLoading(false))
  }, [unitId, difficulty])

  const saveAttempt = async (finalAnswers) => {
  const user = JSON.parse(localStorage.getItem('oneclick-user'));
   console.log('Saving attempt:', { user, unitId, moduleId, courseId, difficulty });
  if (!user?.id) return;

  try {
    await fetch(`${API_BASE}/api/quiz/${unitId}?difficulty=${difficulty}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: user.id,
        unit_id: unitId,
        module_id: moduleId,
        course_id: courseId,
        difficulty,
        score: finalAnswers.filter(a => a.isCorrect).length,
        total: finalAnswers.length,
        answers: finalAnswers,
        scope: 'unit'
      })
    });
  } catch (err) {
    console.error('Failed to save attempt:', err.message);
  }
};

  const handleSelect = (option) => {
    if (selected) return // prevent changing answer
    setSelected(option)
  }

  const handleNext = () => {
    if (!selected) return

    const currentQ = questions[current]
    const isCorrect = selected === currentQ.correct_answer

    const newAnswers = [...answers, {
      question: currentQ.question,
      selected,
      correct: currentQ.correct_answer,
      explanation: currentQ.explanation,
      isCorrect,
    }]

    setAnswers(newAnswers)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      saveAttempt(newAnswers)
      setShowResult(true)
    }
  }

  const score = answers.filter(a => a.isCorrect).length

  const optionColors = (option) => {
    if (!selected) return 'border-[#3D0A4F]/10 hover:border-[#E87722]/40 text-[#3D0A4F]/70'
    const currentQ = questions[current]
    if (option === currentQ.correct_answer) return 'border-green-500 bg-green-50 text-green-700'
    if (option === selected && option !== currentQ.correct_answer) return 'border-red-400 bg-red-50 text-red-600'
    return 'border-[#3D0A4F]/10 text-[#3D0A4F]/40'
  }

  if (loading) return <Loader/>

  if (error) return <p className="text-red-500 text-sm">{error}</p>

  if (showResult) return (
    <div className="flex flex-col gap-6">
      {/* Score */}
      <div className="text-center py-8 border border-[#3D0A4F]/8 rounded-2xl">
        <p className="text-[#E87722] text-xs tracking-widest uppercase font-semibold mb-2">
          Quiz Complete
        </p>
        <p className="text-[#3D0A4F] font-bold text-5xl">{score}<span className="text-2xl text-[#3D0A4F]/30">/{questions.length}</span></p>
        <p className="text-[#3D0A4F]/50 text-sm mt-2">
          {score === 10 ? '🎉 Perfect score!' : score >= 7 ? '👏 Great job!' : score >= 5 ? '📚 Keep studying!' : '💪 Review the unit and try again'}
        </p>
      </div>

      {/* Review */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide">Review</h3>
        {answers.map((a, i) => (
          <div key={i} className={`border rounded-xl p-4 flex flex-col gap-2 ${a.isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
            <p className="text-[#3D0A4F] text-sm font-medium">{i + 1}. {a.question}</p>
            <div className="flex gap-2 text-xs">
              <span className={`px-2 py-1 rounded-lg font-semibold ${a.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                Your answer: {a.selected}
              </span>
              {!a.isCorrect && (
                <span className="px-2 py-1 rounded-lg font-semibold bg-green-100 text-green-700">
                  Correct: {a.correct}
                </span>
              )}
            </div>
            <p className="text-[#3D0A4F]/60 text-xs leading-relaxed">{a.explanation}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 border border-[#3D0A4F]/10 text-[#3D0A4F] font-semibold text-sm py-3 rounded-xl hover:border-[#E87722] transition-colors"
        >
          Try Different Settings
        </button>
        <button
          onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setShowResult(false); }}
          className="flex-1 bg-[#3D0A4F] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#E87722] transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  )

  const q = questions[current]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
            Module {moduleNumber} · Unit {unitNumber} · {difficulty}
          </p>
          <p className="text-[#3D0A4F] font-bold text-lg">{unitTitle}</p>
        </div>
        <span className="text-[#3D0A4F]/40 text-sm font-medium">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#3D0A4F]/8 rounded-full">
        <div
          className="h-1.5 bg-[#E87722] rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="border border-[#3D0A4F]/8 rounded-2xl p-6">
        <p className="text-[#3D0A4F] font-semibold text-base leading-relaxed">{q.question}</p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {Object.entries(q.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${optionColors(key)}`}
          >
            <span className="font-bold text-sm min-w-[20px]">{key}.</span>
            <span className="text-sm leading-relaxed">{value}</span>
          </button>
        ))}
      </div>

      {/* Explanation after answer */}
      {selected && (
        <div className="bg-[#3D0A4F]/[0.02] border border-[#3D0A4F]/8 rounded-xl p-4">
          <p className="text-[#3D0A4F]/50 text-xs uppercase tracking-wide font-semibold mb-1">Explanation</p>
          <p className="text-[#3D0A4F]/70 text-sm leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {selected && (
        <button
          onClick={handleNext}
          className="w-full bg-[#3D0A4F] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#E87722] transition-colors duration-200"
        >
          {current + 1 === questions.length ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
}

export default QuizSession