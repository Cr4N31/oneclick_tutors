function WeeklyChart({ weekly }) {
  if (!weekly || weekly.length === 0) return null

  const courses = [...new Set(weekly.map(w => w.course_code))]
  const weeks = [...new Set(weekly.map(w => w.week))].sort()

  const colors = ['#E87722', '#3D0A4F', '#10B981', '#6366F1', '#F43F5E']

  const formatWeek = (weekStr) => {
    const date = new Date(weekStr)
    return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })
  }

  const getScore = (course, week) => {
    const entry = weekly.find(w => w.course_code === course && w.week === week)
    return entry ? parseFloat(entry.avg_score) : null
  }

  const maxScore = 100

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide">
        Weekly Performance
      </h2>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {courses.map((course, i) => (
          <div key={course} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: colors[i % colors.length] }} />
            <span className="text-xs text-[#3D0A4F]/60 font-medium">{course}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="border border-[#3D0A4F]/8 rounded-xl p-4 overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Y axis labels + bars */}
          <div className="flex gap-2 items-end" style={{ height: '160px' }}>
            {/* Y axis */}
            <div className="flex flex-col justify-between h-full text-right pr-2">
              {[100, 75, 50, 25, 0].map(v => (
                <span key={v} className="text-[10px] text-[#3D0A4F]/30">{v}%</span>
              ))}
            </div>

            {/* Bars per week */}
            {weeks.map((week, wi) => (
              <div key={week} className="flex-1 flex flex-col gap-1">
                <div className="flex items-end gap-0.5 h-full">
                  {courses.map((course, ci) => {
                    const score = getScore(course, week)
                    return (
                      <div
                        key={course}
                        className="flex-1 rounded-t-sm relative group"
                        style={{
                          height: score !== null ? `${(score / maxScore) * 140}px` : '2px',
                          background: score !== null ? colors[ci % colors.length] : 'transparent',
                          opacity: score !== null ? 0.85 : 0,
                          minHeight: score !== null ? '4px' : '0'
                        }}
                      >
                        {/* Tooltip */}
                        {score !== null && (
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#3D0A4F] text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {course}: {score}%
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* X axis labels */}
          <div className="flex gap-2 mt-2 pl-8">
            {weeks.map(week => (
              <div key={week} className="flex-1 text-center">
                <span className="text-[10px] text-[#3D0A4F]/40">{formatWeek(week)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {weeks.length < 2 && (
        <p className="text-[#3D0A4F]/40 text-xs text-center">
          Keep taking quizzes — your weekly trend will appear here after a few sessions.
        </p>
      )}
    </section>
  )
}

export default WeeklyChart