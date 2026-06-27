import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

function ModuleUnitSelector({ courseCode, selectedUnit, onSelectUnit }) {
  const [structure, setStructure] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedModule, setExpandedModule] = useState(null)
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    if (!courseCode) return

    setLoading(true)
    const cleanCode = courseCode.replace(/\s+/g, '')

    fetch(`https://oneclick-tutors-backend.onrender.com/api/courses/${cleanCode}/structure`)
      .then(res => res.json())
      .then(data => {
        setStructure(data)
        setCourseId(data.id)
        if (data.modules?.length > 0) {
          setExpandedModule(data.modules[0].id)
        }
      })
      .catch(err => console.error('Structure fetch error:', err))
      .finally(() => setLoading(false))
  }, [courseCode])

  if (loading) {
    return <p className="text-[#3D0A4F]/40 text-sm">Loading course structure...</p>
  }

  if (!structure || structure.error) {
    return <p className="text-[#3D0A4F]/40 text-sm">No content available for this course yet.</p>
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[#3D0A4F] font-semibold text-sm mb-2">
        {structure.code} — Select a Unit
      </h3>

      {structure.modules.map((mod) => {
        const isExpanded = expandedModule === mod.id

        return (
          <div key={mod.id} className="border border-[#3D0A4F]/8 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#3D0A4F]/[0.02] transition-colors"
            >
              <span className="text-[#3D0A4F] font-medium text-sm">
                Module {mod.module_number}
              </span>
              {isExpanded
                ? <ChevronDown size={16} className="text-[#3D0A4F]/40" />
                : <ChevronRight size={16} className="text-[#3D0A4F]/40" />}
            </button>

            {isExpanded && (
              <div className="border-t border-[#3D0A4F]/6 bg-[#3D0A4F]/[0.01]">
                {mod.units.map((unit) => {
                  const isActive = selectedUnit?.id === unit.id
                  return (
                    <button
                      key={unit.id}
                      onClick={() => onSelectUnit(unit, mod, courseId)}
                      className={`w-full text-left px-6 py-2.5 text-sm transition-colors border-b border-[#3D0A4F]/4 last:border-0 ${
                        isActive
                          ? 'text-[#E87722] font-medium bg-[#E87722]/5'
                          : 'text-[#3D0A4F]/70 hover:text-[#E87722]'
                      }`}
                    >
                      Unit {unit.unit_number} — {unit.title}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ModuleUnitSelector