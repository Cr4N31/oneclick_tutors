function QuizHistory({ history }) {
  if (!history || history.length === 0) return null

  const getScoreColor = (score, total) => {
    const pct = (score / total) * 100
    if (pct >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (pct >= 50) return 'text-[#E87722] bg-orange-50 border-orange-200'
    return 'text-red-500 bg-red-50 border-red-200'
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide">
        Recent Activity
      </h2>
      <div className="flex flex-col gap-3">
        {history.map((item) => {
          const pct = Math.round((item.score / item.total) * 100)
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border border-[#3D0A4F]/8 rounded-xl"
            >
              {/* Score badge */}
              <div className={`flex-shrink-0 w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${getScoreColor(item.score, item.total)}`}>
                <span className="font-bold text-lg leading-none">{item.score}</span>
                <span className="text-xs opacity-60">/{item.total}</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-[#3D0A4F] font-semibold text-sm truncate">
                  {item.course_code} — Module {item.module_number}, Unit {item.unit_number}
                </p>
                <p className="text-[#3D0A4F]/50 text-xs mt-0.5 truncate">{item.unit_title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] uppercase tracking-wide font-semibold text-[#3D0A4F]/30">
                    {item.difficulty}
                  </span>
                  <span className="text-[#3D0A4F]/20">·</span>
                  <span className="text-[10px] text-[#3D0A4F]/30">{formatDate(item.taken_at)}</span>
                </div>
              </div>

              {/* Percentage */}
              <div className="flex-shrink-0 text-right">
                <p className={`font-bold text-lg ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-[#E87722]' : 'text-red-500'}`}>
                  {pct}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QuizHistory