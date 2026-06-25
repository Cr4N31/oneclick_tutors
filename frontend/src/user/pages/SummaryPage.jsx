import { useState, useEffect, use } from 'react'
import CourseSelector from '../components/summary/CourseSelector'
import ModuleUnitSelector from '../components/summary/ModuleUnitSelector'
import SummaryDisplay from '../components/summary/SummaryDisplay'

function SummaryPage({ user }) {
  const [selectedCourse, setSelectedCourse] = useState(() => {
    try { return JSON.parse(localStorage.getItem('summary_course')) || null } catch { return null }
  })
  const [selectedUnit, setSelectedUnit] = useState(() => {
    try { return JSON.parse(localStorage.getItem('summary_unit')) || null } catch { return null }
  })
  const [selectedModule, setSelectedModule] = useState(() => {
    try { return JSON.parse(localStorage.getItem('summary_module')) || null } catch { return null }
  })


  useEffect(() => {
    localStorage.setItem('summary_course', JSON.stringify(selectedCourse))
  }, [selectedCourse])

  useEffect(() => {
    localStorage.setItem('summary_unit', JSON.stringify(selectedUnit))
  }, [selectedUnit])

  useEffect(() => {
    localStorage.setItem('summary_module', JSON.stringify(selectedModule))
  }, [selectedModule])

  const courses = (() => {
  const raw = user?.raw_courses
    if (Array.isArray(raw) && raw.length > 0) {
        return raw.map((c, i) => 
        typeof c === 'string' 
            ? { code: c, title: 'Registered course' } 
            : c
        )
    }
    return user?.courses || []
  })()

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    setSelectedUnit(null)
    setSelectedModule(null)
  }

  const handleSelectUnit = (unit, module) => {
    setSelectedUnit(unit)
    setSelectedModule(module)
  }

  return (
    <div className="flex flex-col my-24 gap-6">
      <CourseSelector
        courses={courses}
        selectedCourse={selectedCourse}
        onSelect={handleSelectCourse}
      />

      {selectedCourse && (
        <ModuleUnitSelector
          courseCode={selectedCourse.code}
          selectedUnit={selectedUnit}
          onSelectUnit={handleSelectUnit}
        />
      )}

      {selectedUnit && (
        <SummaryDisplay
          unitId={selectedUnit.id}
          unitTitle={selectedUnit.title}
          moduleNumber={selectedModule.module_number}
          unitNumber={selectedUnit.unit_number}
        />
      )}
    </div>
  )
}

export default SummaryPage