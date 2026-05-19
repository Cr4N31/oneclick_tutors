function AddCourseCard({ onAdd }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-[#3D0A4F]/20 bg-[#3D0A4F]/[0.02] hover:border-[#E87722]/40 hover:text-[#E87722] text-[#3D0A4F]/40 transition-all duration-200 min-h-[110px]"
    >
      <span className="text-xl">+</span>
      <span className="text-xs">Add course</span>
    </button>
  )
}

export default AddCourseCard
