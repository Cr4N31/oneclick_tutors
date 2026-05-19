function StatBar({total}){
    const maximumCourses = 12
    const minimumCourses = 9
    const remainingSlots = Math.max(maximumCourses - total, 0)
    const requiredToMeetMinimum = Math.max(minimumCourses - total, 0)
    const stats = [
        { total, text: total === 1 ? "Course registered" : "Courses registered" },
        { total: remainingSlots, text: "Remaining slots" },
        { total: requiredToMeetMinimum, text: "Needed for minimum"}
    ]
    return(
        <section data-aos="fade-up">
            <div className="flex gap-2 bg-[#E87722]/10 p-8 md:flex-row flex-col justify-between items-center">
                {stats.map((s) => (
                    <div key={s.text} className="text-center w-full py-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(61,10,79,0.12)] saturate-150">
                        <h2 className="text-[#E87722] font-bold text-2xl">{s.total}</h2>
                        <p className="text-[#3D0A4F] font-semibold text-lg">{s.text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default StatBar
