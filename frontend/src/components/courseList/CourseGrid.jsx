import CourseCard from './CourseCard'
import AddCourseCard from './AddCourseCard'

function CourseGrid({ courses, editing, onRemove, onAdd, onUpdate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course, i) => (
        <CourseCard
          key={i}
          course={course}
          index={i}
          editing={editing}
          onRemove={onRemove}
          onUpdate={onUpdate}
          canRemove={courses.length > 9}
        />
      ))}
      {editing && courses.length < 12 && (
        <AddCourseCard onAdd={onAdd} />
      )}
    </div>
  )
}

export default CourseGrid
