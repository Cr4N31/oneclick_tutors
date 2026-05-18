function Features() {
  const features = [
    {
      id: 1,
      icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/v1779110381/book-open-svgrepo-com_npuqmz.svg',
      title: "Structured Course Access",
      body: "Instantly access your registered course materials, automatically organized into modules and units — no more digging through scattered PDFs."
    },
    {
      id: 2,
      icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/v1779110634/ai-svgrepo-com_kvuupj.svg',
      title: "AI-Powered Study Notes",
      body: "Complex course content is simplified into clear, digestible study notes. Oneclick doesn't just summarize — it teaches."
    },
    {
      id: 3,
      icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/v1779110813/computer-svgrepo-com_xlxzbw.svg',
      title: "CBT Practice & Testing",
      body: "AI generates relevant CBT-style questions per unit, module, and topic — complete with detailed answers and references to your exact course material."
    },
    {
      id: 4,
      icon: 'https://res.cloudinary.com/dapzvtbty/image/upload/v1779110967/gps-on-svgrepo-com_iism61.svg',
      title: "Progress Tracking",
      body: "Monitor your improvement, identify weak areas, and get insights into your exam readiness. The more you study, the smarter Oneclick guides you."
    },
  ]

  return (
    <section className="bg-[#3D0A4F]/[0.02] px-8 py-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3" data-aos="fade-up">
          <span className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D0A4F] leading-tight tracking-tight max-w-xl">
            Everything you need to{" "}
            <span className="text-[#E87722]">study smarter</span>
          </h2>
          <p className="text-[#3D0A4F]/45 text-base leading-relaxed max-w-lg">
            Oneclick combines AI, structure, and insight into one seamless academic experience built for NOUN students.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.id}
              data-aos="fade-up"
              className="flex flex-col gap-4 p-7 rounded-2xl bg-white border border-[#3D0A4F]/6 hover:border-[#E87722]/30 hover:shadow-sm transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-[#3D0A4F]/5 flex items-center justify-center">
                {f.icon
                  ? <img src={f.icon} alt={f.title} className="w-5 h-5" />
                  : <span className="w-3 h-3 rounded-full bg-[#E87722]/60" />
                }
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[#3D0A4F] text-sm font-semibold tracking-wide">
                  {f.title}
                </h3>
                <p className="text-[#3D0A4F]/50 text-sm leading-relaxed">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#3D0A4F]/6" />

        {/* Bottom CTA strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#3D0A4F]/50 text-base leading-relaxed max-w-xl text-center md:text-left">
            Oneclick is not just a study tool — it is a structured learning ecosystem designed for
            clarity, consistency, and confidence. Just one click from confusion to understanding.
          </p>
          <a
            href="#"
            className="shrink-0 bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide px-7 py-3 rounded-lg hover:bg-[#E87722] transition-colors duration-200"
          >
            Get Started Free
          </a>
        </div>

      </div>
    </section>
  )
}

export default Features