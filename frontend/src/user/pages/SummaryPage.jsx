import { useState } from 'react'
import CourseSelector from '../components/summary/CourseSelector'
import ModuleUnitSelector from '../components/summary/ModuleUnitSelector'
import SummaryDisplay from '../components/summary/SummaryDisplay'

function SummaryPage({ user }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)

  const courses = user?.courses?.length > 0 ? user.courses : []

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