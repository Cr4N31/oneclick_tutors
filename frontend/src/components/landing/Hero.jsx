
function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center px-8 pt-24 pb-16 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Left — Text */}
        <div className="flex flex-col gap-6 md:w-1/2 text-center md:text-left" data-aos="fade-in">

          {/* Badge */}
          <span className="inline-flex self-center md:self-start items-center gap-2 bg-[#3D0A4F]/6 text-[#3D0A4F] text-xs tracking-widest uppercase px-4 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E87722] animate-pulse" />
            AI-Powered Learning
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-semibold text-[#3D0A4F] leading-tight tracking-tight">
            Your Personal{" "}
            <span className="text-[#E87722]">Tutor</span>
            {" "}is Always On
          </h1>

          {/* Subheadline */}
          <p className="text-[#3D0A4F]/50 text-base leading-relaxed max-w-md mx-auto md:mx-0">
            Oneclick Tutors uses AI to help students learn faster, track progress, and ace their exams — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="#"
              className="bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide px-7 py-3 rounded-lg hover:bg-[#E87722] transition-colors duration-200"
            >
              Get Started Free
            </a>

            <a
              href="#"
              className="border border-[#3D0A4F]/15 text-[#3D0A4F]/70 text-sm font-medium px-7 py-3 rounded-lg hover:border-[#E87722]/40 hover:text-[#3D0A4F] transition-all duration-200"
            >
              See How It Works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 justify-center md:justify-start mt-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-[#3D0A4F]/10 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-xs text-[#3D0A4F]/40 tracking-wide">
              Joined by <span className="text-[#3D0A4F] font-medium">2,400+</span> students
            </p>
          </div>
        </div>

        {/* Right — Image */}
        <div className="md:w-1/2 flex justify-center" data-aos="fade-up">
          <div className="relative w-full max-w-md">

            {/* Decorative blob behind image */}
            <div className="absolute inset-0 bg-[#3D0A4F]/5 rounded-3xl scale-95 blur-2xl" />

            {/* Actual image */}
            <img
              src="https://res.cloudinary.com/dapzvtbty/image/upload/v1779106561/gdj-anatomy-6274865_1920_i3pkaj.png"
              alt="AI Tutor illustration"
              className="relative w-full object-contain drop-shadow-xl"
            />

            {/* Floating stat card */}
            <div className="absolute bottom-6 left-0 bg-white border border-[#3D0A4F]/8 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E87722]/10 flex items-center justify-center">
                <span className="text-[#E87722] text-sm">📈</span>
              </div>
              <div>
                <p className="text-[#3D0A4F] text-xs font-semibold">98% Pass Rate</p>
                <p className="text-[#3D0A4F]/40 text-[10px]">across all subjects</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
