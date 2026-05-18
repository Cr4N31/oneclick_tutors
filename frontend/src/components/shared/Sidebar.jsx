import { useState } from 'react'


function Sidebar({ onLogout }) {
  const [active, setActive] = useState('Course List')

  const sidebarItems = [
    { name: 'Course List', icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/v1779110381/book-open-svgrepo-com_npuqmz.svg' },
    { name: 'Summary', icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/icons/summary_cwctfr.svg' },
    { name: 'Take a quiz', icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/icons/question_p26n2v.svg' },
    { name: 'Evaluate Progress', icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/v1779111118/course-up-svgrepo-com_ha2shl.svg' },
    { name: 'Personal Details', icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/icons/details_ccmwlp.svg' },
  ]

  return (
    <aside className="font-product-sans flex flex-col w-[240px] h-screen bg-[#3D0A4F] px-5 py-8 border-r border-[#E87722]/40">

      {/* Logo / Brand */}
      <div className="mb-10 px-2">
        <span className="text-[#E87722] font-semibold tracking-[0.2em] text-xs uppercase">
          Student
        </span>
        <h2 className="text-white text-lg font-light tracking-wide leading-tight">
          Profile
        </h2>
      </div>

      {/* Divider */}
      <div className="w-8 h-[1px] bg-[#E87722] mb-8 mx-2" />

      {/* Nav Items */}
      <ul className="flex flex-col gap-1 flex-1">
        {sidebarItems.map((s) => {
          const isActive = active === s.name
          return (
            <li key={s.name}>
              <button
                onClick={() => setActive(s.name)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-base font-light tracking-wide transition-all duration-200
                  ${isActive
                    ? 'bg-[#3D0A4F]/30 text-[#E87722]'
                    : 'text-white hover:text-[#E87722] hover:bg-/5'
                  }
                `}
              >
                <img
                  src={s.icon}
                  alt={s.name}
                  className={`w-4 h-4 shrink-0 transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                />
                <span>{s.name}</span>

                {/* Active indicator */}
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-[#E87722]" />
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Footer */}
      <div className="px-2 pt-6 border-t border-white/10 flex flex-col gap-4">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#E87722]/30 px-4 py-2.5 text-sm font-medium tracking-wide text-[#E87722] hover:bg-[#E87722] hover:text-white transition-colors duration-200"
        >
          Logout
        </button>
        <p className="text-white/20 text-[10px] tracking-widest uppercase">
          Oneclick Tutors
        </p>
      </div>

    </aside>
  )
}

export default Sidebar
