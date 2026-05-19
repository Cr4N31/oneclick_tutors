function CourseHeader({total, onEdit, onSave, editing, onCancel}){
    return(
        <section className="mx-auto my-20">
            <header className="flex gap-4 justify-between items-center">
                <div>
                    <p className="font-semibold text-[#E87722] text-lg">Academic Session</p>
                    <h1 className="text-[#3D0A4F] font-bold text-2xl">My Courses - <span className="text-lg">{total} registered</span></h1>
                    <p className="font-semibold">Your registered course materials for this session</p>
                </div>
                <div>
                    {editing ? (
                        <div className="flex gap-2 md:flex-row flex-col">
                            <button 
                                onClick={onSave}
                                className="border border-2 rounded-xl border-[#3D0A4F] text-[#3D0A4F] font-semibold px-4 py-[5px] hover:border-[#E87722] hover:text-[#E87722] duration-100 transition-all ease-in active:px-[15px] active:py-[3px]"
                                >
                                   <span className="italic pr-[3px]">✓</span> Save Changes
                            </button>
                            <button
                                onClick={onCancel}
                                className="border border-2 rounded-xl border-[#3D0A4F] text-[#3D0A4F] font-semibold px-4 py-[5px] hover:border-[#E87722] hover:text-[#E87722] duration-100 transition-all ease-in active:px-[15px] active:py-[3px]"
                                >
                                   <span className="italic pr-[3px]">X</span> Cancel
                            </button>
                        </div>
                    ):(
                            <button 
                                onClick={onEdit}
                                className="border border-2 rounded-xl border-[#3D0A4F] text-[#3D0A4F] font-semibold px-4 py-[5px] hover:border-[#E87722] hover:text-[#E87722] duration-100 transition-all ease-in active:px-[15px] active:py-[3px]"
                            >
                                Edit Courses
                            </button>
                    )}

                </div>

            </header>
        </section>
    )
}
export default CourseHeader