import { useState } from "react"
import oneclickLogo from "../../../assets/imgs/oneclick_tutors_logo.png"
import oneclickIcon from "../../../assets/imgs/ONECLICK-TUTOR ASSEST-03.png"
import AuthToggle from "../auth/AuthToggle"
import LoginForm from "../auth/LoginForm"
import RegisterForm from "../auth/RegisterForm"

function AuthLayout({ initialMode = "register", onAuthenticated }) {
  const [activeMode, setActiveMode] = useState(initialMode)
  const isLogin = activeMode === "login"

  return (
    <main className="min-h-screen bg-white px-6 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-stretch">
        <aside className="hidden lg:flex flex-col justify-between rounded-2xl bg-[#3D0A4F] p-8 text-white">
          <div className="flex flex-col gap-10">
            <img src={oneclickLogo} alt="Oneclick Tutors" className="w-48" />

            <div className="flex flex-col gap-4">
              <span className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
                Student Access
              </span>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight">
                Your study space is ready when you are.
              </h1>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                Sign in or create a student account to access courses, AI notes, CBT practice, and progress tracking.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {["Courses", "Notes", "Quizzes"].map((item) => (
              <div key={item} className="flex flex-col gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E87722]" />
                <p className="text-xs text-white/55 tracking-wide">{item}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex flex-col justify-center">
          <div className="w-full max-w-2xl mx-auto rounded-2xl border border-[#3D0A4F]/6 bg-white p-6 sm:p-8 shadow-[0_18px_45px_rgba(61,10,79,0.08)]">
            <div className="flex items-center justify-between gap-4 mb-8">
              <a href="#home" className="flex items-center gap-3">
                <img src={oneclickIcon} alt="Oneclick icon" className="w-9" />
                <span className="text-[#3D0A4F] text-sm font-semibold tracking-wide">
                  Oneclick Tutors
                </span>
              </a>

              <a
                href="#home"
                className="text-[#3D0A4F]/45 text-xs font-semibold tracking-wide hover:text-[#E87722] transition-colors duration-150"
              >
                Back Home
              </a>
            </div>

            <div className="mb-8">
              <AuthToggle activeMode={activeMode} onChange={setActiveMode} />
            </div>

            {isLogin ? (
              <LoginForm
                onSwitch={() => setActiveMode("register")}
                onSubmit={onAuthenticated}
              />
            ) : (
              <RegisterForm
                onSwitch={() => setActiveMode("login")}
                onSubmit={onAuthenticated}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
