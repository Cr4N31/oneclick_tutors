function Proficiency({ proficiency }) {
  if (!proficiency || proficiency.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide">
        Proficiency per Course
      </h2>
      <div className="flex flex-col gap-3">
        {proficiency.map((item, i) => {
          const score = parseFloat(item.avg_score)
          const barColor = score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-[#E87722]' : 'bg-red-400'
          const label = score >= 80 ? 'Strong' : score >= 50 ? 'Developing' : 'Needs Work'
          const labelColor = score >= 80 ? 'text-green-600 bg-green-50' : score >= 50 ? 'text-[#E87722] bg-orange-50' : 'text-red-500 bg-red-50'

          return (
            <div key={i} className="border border-[#3D0A4F]/8 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#3D0A4F] font-semibold text-sm">{item.course_code}</p>
                  <p className="text-[#3D0A4F]/40 text-xs mt-0.5">{item.attempts} attempt{item.attempts !== '1' ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${labelColor}`}>{label}</span>
                  <span className="text-[#3D0A4F] font-bold text-lg">{score}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-[#3D0A4F]/6 rounded-full">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Proficiency