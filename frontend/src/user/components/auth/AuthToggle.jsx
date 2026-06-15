function AuthToggle({ activeMode, onChange }) {
  const options = [
    { id: "login", label: "Login" },
    { id: "register", label: "Register" },
  ]

  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#3D0A4F]/5 p-1">
      {options.map((option) => {
        const isActive = activeMode === option.id

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 ${
              isActive
                ? "bg-white text-[#E87722] shadow-sm"
                : "text-[#3D0A4F]/55 hover:text-[#3D0A4F]"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default AuthToggle
