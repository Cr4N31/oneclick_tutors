function CourseSelector({ courses, selectedCourse, onSelect }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[#3D0A4F] font-bold text-xl">Select a Course</h2>
      <p className="text-[#3D0A4F]/50 text-sm">
        Choose one of your registered courses to view its summary.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {courses.map((course) => {
          const isActive = selectedCourse?.code === course.code
          return (
            <button
              key={course.code}
              onClick={() => onSelect(course)}
              className={`text-left rounded-xl border p-4 transition-all duration-150 ${
                isActive
                  ? 'border-[#E87722] bg-[#E87722]/5'
                  : 'border-[#3D0A4F]/10 hover:border-[#E87722]/40'
              }`}
            >
              <p className="text-[#3D0A4F] font-semibold text-sm">{course.code}</p>
              <p className="text-[#3D0A4F]/50 text-xs mt-1 truncate">{course.title || course.name}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CourseSelector