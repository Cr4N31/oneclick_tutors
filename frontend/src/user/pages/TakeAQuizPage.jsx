import { useState, useEffect } from 'react'
import CourseSelector from '../components/summary/CourseSelector'
import ModuleUnitSelector from '../components/summary/ModuleUnitSelector'
import QuizSession from '../components/quiz/QuizSession'

function TakeAQuizPage({ user }) {
  const [selectedCourse, setSelectedCourse] = useState(() => {
    try { return JSON.parse(localStorage.getItem('quiz_course')) || null } catch { return null }
  })

  const [selectedUnit, setSelectedUnit] = useState(() => {
    try { return JSON.parse(localStorage.getItem('quiz_unit')) || null } catch { return null }
  })

  const [selectedModule, setSelectedModule] = useState(() => {
    try { return JSON.parse(localStorage.getItem('quiz_module')) || null } catch { return null }
  })

  const [selectedCourseId, setSelectedCourseId] = useState(() => {
  return localStorage.getItem('quiz_course_id') || null
  })

  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem('quiz_difficulty') || null
  })

  const [quizStarted, setQuizStarted] = useState(false)

  useEffect(() => {
    localStorage.setItem('quiz_course', JSON.stringify(selectedCourse))
  }, [selectedCourse])

  useEffect(() => {
    localStorage.setItem('quiz_unit', JSON.stringify(selectedUnit))
  }, [selectedUnit])

  useEffect(() => {
    localStorage.setItem('quiz_module', JSON.stringify(selectedModule))
  }, [selectedModule])

  useEffect(() => {
  if (selectedCourseId) localStorage.setItem('quiz_course_id', selectedCourseId)
  }, [selectedCourseId])

  useEffect(() => {
    if (difficulty) localStorage.setItem('quiz_difficulty', difficulty)
  }, [difficulty])

  const courses = (() => {
    const raw = user?.raw_courses
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map(c => typeof c === 'string' ? { code: c, title: 'Registered course' } : c)
    }
    return user?.courses || []
  })()

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    setSelectedUnit(null)
    setSelectedModule(null)
    setSelectedCourseId(null)
    localStorage.removeItem('quiz_course_id')
    setDifficulty(null)
    setQuizStarted(false)
  }

  const handleSelectUnit = (unit, module, courseId) => {
    setSelectedUnit(unit)
    setSelectedModule(module)
    setSelectedCourseId(courseId)
    setDifficulty(null)
    setQuizStarted(false)
  }

  const handleRetry = () => {
    setQuizStarted(false)
    setDifficulty(null)
    localStorage.removeItem('quiz_difficulty')
  }

  const difficulties = [
    { key: 'beginner', label: 'Beginner', desc: 'Basic recall and definitions' },
    { key: 'intermediate', label: 'Intermediate', desc: 'Application and understanding' },
    { key: 'pro', label: 'Pro', desc: 'Analysis and complex problems' },
  ]

  return (
    <div className="flex flex-col gap-6 mt-24">
      {!quizStarted ? (
        <>
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
            <div className="flex flex-col gap-3">
              <h3 className="text-[#3D0A4F] font-semibold text-xl">Select Difficulty</h3>
              <div className="flex flex-col gap-3">
                {difficulties.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setDifficulty(d.key)}
                    className={`text-left p-4 rounded-xl border transition-all duration-150 ${
                      difficulty === d.key
                        ? 'border-[#E87722] bg-[#E87722]/5'
                        : 'border-[#3D0A4F]/10 hover:border-[#E87722]/40'
                    }`}
                  >
                    <p className="text-[#3D0A4F] font-semibold text-lg">{d.label}</p>
                    <p className="text-[#E87722] text-sm mt-1">{d.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {difficulty && (
            <button
              onClick={() => setQuizStarted(true)}
              className="w-full bg-[#3D0A4F] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#E87722] transition-colors duration-200"
            >
              Start Quiz
            </button>
          )}
        </>
      ) : (
        selectedUnit && selectedModule && (
          <QuizSession
            unitId={selectedUnit.id}
            unitTitle={selectedUnit.title}
            moduleNumber={selectedModule.module_number}
            moduleId={selectedModule.id}
            courseId={selectedCourseId}
            unitNumber={selectedUnit.unit_number}
            difficulty={difficulty}
            onRetry={handleRetry}
          />
        )
      )}
    </div>
  )
}

export default TakeAQuizPage