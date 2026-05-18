function About() {
  
  return (
    <section className="bg-white px-8 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">

        {/* Top — Intro block */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Left — Label + Headline */}
          <div className="md:w-1/2 flex flex-col gap-4" data-aos="fade-up">
            <span className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
              What is Oneclick?
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#3D0A4F] leading-tight tracking-tight">
              From confusion to clarity —{" "}
              <span className="text-[#E87722]">Oneclick</span> at a time
            </h2>
          </div>

          {/* Right — Opening paragraph */}
          <div className="md:w-1/2 flex flex-col gap-4 justify-center" data-aos="fade-right">
            <p className="text-[#3D0A4F]/55 text-base leading-relaxed">
              Oneclick is an AI-powered academic learning platform designed to simplify and transform
              the distance learning experience for students of the National Open University of Nigeria.
              Built with the reality of self-paced education in mind, it serves as a smart study companion
              that bridges the gap between raw course materials and true understanding.
            </p>
            <div className="w-8 h-px bg-[#E87722]" />
            <p className="text-[#3D0A4F]/55 text-base leading-relaxed">
              Instead of overwhelming students with bulky PDFs and scattered notes, Oneclick organizes
              learning into a structured, interactive, and intelligent system — turning complex academic
              content into guided learning paths.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#3D0A4F]/30" />

      </div>
    </section>
  )
}

export default About