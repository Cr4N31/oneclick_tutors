function CourseCard({ course, index, editing, onRemove, onUpdate, canRemove }) {
  return (
    <div className={`flex flex-col gap-3 p-4 rounded-xl border transition-all duration-200
      ${editing
        ? 'border-[#E87722] bg-white'
        : 'border-[#3D0A4F]/10 bg-white hover:border-[#E87722]/40'
      }`}
    >
      <p className="text-[10px] uppercase tracking-widest text-[#E87722] font-medium">
        Course {index + 1}
      </p>

      {editing ? (
        <div className="flex flex-col gap-2">
          <input
            value={course.code}
            onChange={(event) => onUpdate(index, "code", event.target.value.toUpperCase())}
            placeholder="e.g. CIT 101"
            className="text-sm px-2 py-1.5 border border-[#3D0A4F]/20 rounded-md text-[#3D0A4F] outline-none focus:border-[#E87722] bg-transparent uppercase"
          />
          <input
            value={course.name}
            onChange={(event) => onUpdate(index, "name", event.target.value)}
            placeholder="Course title"
            className="text-xs px-2 py-1.5 border border-[#3D0A4F]/20 rounded-md text-[#3D0A4F] outline-none focus:border-[#E87722] bg-transparent"
          />
        </div>
      ) : (
        <p className="text-sm font-medium text-[#3D0A4F]">{course.code}</p>
      )}

      {!editing && (
        <p className="text-xs text-[#3D0A4F]/50 leading-relaxed">{course.name}</p>
      )}

      {editing && canRemove && (
        <button
          onClick={() => onRemove(index)}
          className="self-end text-[10px] text-[#E87722]/70 hover:text-[#E87722] transition-colors"
        >
          Remove
        </button>
      )}
    </div>
  )
}

export default CourseCard
