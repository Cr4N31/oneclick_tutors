import { useState } from "react"
function RegisterForm({ onSwitch, onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState(0)

  const courses = Array.from({ length: 12 }, (_, index) => index + 1)
  const departments = [
    "Computer Science",
    "Business Administration",
    "Mass Communication",
    "Accounting",
    "Economics",
    "Public Administration",
    "Education",
  ]

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={(event) => event.preventDefault()} data-aos="fade-up">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[#3D0A4F] text-xl font-semibold tracking-wide">
          Create Account
        </h1>
        <p className="text-[#3D0A4F]/45 text-xs tracking-wide">
          Add your student details to start learning
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
          First Name
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
          Last Name
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
          Level
          <input
            type="text"
            name="level"
            placeholder="100, 200, 300..."
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
          Department
          <select
            name="department"
            defaultValue=""
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] transition-colors duration-150 bg-transparent"
          >
            <option value="" disabled>Select department</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
              Courses
            </p>
            <p className="text-[#3D0A4F]/35 text-xs mt-1">
              Fill 9 to 12 course codes or titles.
            </p>
          </div>
          <span className="text-[#E87722] text-xs font-semibold">9-12</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {courses.map((courseNumber) => (
            <input
              key={courseNumber}
              type="text"
              name={`course${courseNumber}`}
              placeholder={`Course ${courseNumber}${courseNumber > 9 ? " (optional)" : ""}`}
              required={courseNumber <= 9}
              className="rounded-lg border border-[#3D0A4F]/10 px-4 py-2.5 text-sm text-[#3D0A4F] outline-none transition-colors duration-150 placeholder:text-[#3D0A4F]/30 focus:border-[#E87722]/50"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase sm:col-span-2">
          Email Address
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1 text-[#3D0A4F]/90 text-xs tracking-widest uppercase">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            className="pl-0 py-2 border-b border-[#3D0A4F]/15 focus:border-[#E87722] outline-none text-sm normal-case tracking-normal text-[#3D0A4F] placeholder:text-[#3D0A4F]/30 transition-colors duration-150 bg-transparent"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide py-2.5 rounded-lg hover:bg-[#E87722] transition-colors duration-200"
      >
        Create Account
      </button>

      <p className="text-center text-xs text-[#3D0A4F]/50">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#E87722] hover:opacity-70 transition-opacity"
        >
          Log in
        </button>
      </p>
    </form>
  )
}
export default RegisterForm
