function PersonalDetailsPage({ user }) {
const details = [
  { label: "Full Name", value: user?.full_name || "Student" },
  { label: "Email", value: user?.email || "student@example.com" },
  { label: "Department", value: user?.department || "Not added yet" },
  { label: "Level", value: user?.level || "Not added yet" },
]

  return (
    <section className="mt-20 flex flex-col gap-8" data-aos="fade-up">
      <div>
        <p className="font-semibold text-[#E87722] text-lg">Student Profile</p>
        <h1 className="text-[#3D0A4F] font-bold text-2xl">Personal Details</h1>
        <p className="font-semibold text-[#3D0A4F]/55">
          Your registered profile information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="rounded-xl border border-[#3D0A4F]/10 bg-[#3D0A4F]/[0.02] p-5"
          >
            <p className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
              {detail.label}
            </p>
            <p className="mt-2 text-[#3D0A4F] text-base font-semibold">
              {detail.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PersonalDetailsPage
