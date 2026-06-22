import { useState } from 'react'
import CourseSelector from '../components/summary/CourseSelector'
import ModuleUnitSelector from '../components/summary/ModuleUnitSelector'
import QuizSession from '../components/quiz/QuizSession'

function TakeAQuizPage({ user }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)
  const [difficulty, setDifficulty] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)

  const courses = user?.courses?.length > 0 ? user.courses : []

  const handleSelectCourse = (course) => {
    setSelectedCourse(course)
    setSelectedUnit(null)
    setSelectedModule(null)
    setDifficulty(null)
    setQuizStarted(false)
  }

  const handleSelectUnit = (unit, module) => {
    setSelectedUnit(unit)
    setSelectedModule(module)
    setDifficulty(null)
    setQuizStarted(false)
  }

  const handleStartQuiz = () => {
    if (!difficulty) return
    setQuizStarted(true)
  }

  const handleRetry = () => {
    setQuizStarted(false)
    setDifficulty(null)
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
              <div className="grid grid-cols-3 gap-3">
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
                    <p className="text-[#E87722]/100 font-base text-sm mt-1">{d.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {difficulty && (
            <button
              onClick={handleStartQuiz}
              className="w-full bg-[#3D0A4F] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#E87722] transition-colors duration-200"
            >
              Start Quiz
            </button>
          )}
        </>
      ) : (
        <QuizSession
          unitId={selectedUnit.id}
          unitTitle={selectedUnit.title}
          moduleNumber={selectedModule.module_number}
          unitNumber={selectedUnit.unit_number}
          difficulty={difficulty}
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}

export default TakeAQuizPage