import { useEffect, useState } from 'react'
import Loader from '../../shared/Loader'

function SummaryDisplay({ unitId, unitTitle, moduleNumber, unitNumber }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!unitId) return

    setLoading(true)
    setError(null)
    setSummary(null)

    fetch(`http://localhost:3000/api/summary/${unitId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setSummary(data.summary)
        }
      })
      .catch(err => setError('Failed to load summary.'))
      .finally(() => setLoading(false))
  }, [unitId])

  if (loading) {
     return <Loader />
  }

  if (error) {
    return <p className="text-red-500 text-sm py-8">{error}</p>
  }

  if (!summary) return null

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div>
        <p className="text-[#E87722] text-xs tracking-widest uppercase font-semibold mb-1">
          Module {moduleNumber} · Unit {unitNumber}
        </p>
        <h2 className="text-[#3D0A4F] font-bold text-2xl">{unitTitle}</h2>
      </div>

      {/* Overview */}
      <section>
        <h3 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide mb-2">Overview</h3>
        <p className="text-[#3D0A4F]/70 text-sm leading-relaxed">{summary.overview}</p>
      </section>

      {/* Key Concepts */}
      <section>
        <h3 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide mb-2">Key Concepts</h3>
        <div className="flex flex-wrap gap-2">
          {summary.key_concepts?.map((concept, i) => (
            <span key={i} className="text-xs bg-[#E87722]/10 text-[#E87722] px-3 py-1.5 rounded-full font-medium">
              {concept}
            </span>
          ))}
        </div>
      </section>

      {/* Definitions */}
      <section>
        <h3 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide mb-3">Definitions</h3>
        <div className="flex flex-col gap-3">
          {summary.definitions?.map((def, i) => (
            <div key={i} className="border border-[#3D0A4F]/8 rounded-xl p-4">
              <p className="text-[#3D0A4F] font-semibold text-sm mb-1">{def.term}</p>
              <p className="text-[#3D0A4F]/60 text-sm leading-relaxed">{def.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Keynotes */}
      <section>
        <h3 className="text-[#3D0A4F] font-semibold text-sm uppercase tracking-wide mb-3">Keynotes</h3>
        <ul className="flex flex-col gap-2">
          {summary.keynotes?.map((note, i) => (
            <li key={i} className="flex gap-3 text-sm text-[#3D0A4F]/70 leading-relaxed">
              <span className="text-[#E87722] font-bold mt-0.5">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default SummaryDisplay