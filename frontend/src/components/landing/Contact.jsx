function Contact() {
  const contactItems = [
    {
      id: 1,
      label: "Email",
      value: "hello@yourdomain.com",
      helper: "Replace with your support email",
    },
    {
      id: 2,
      label: "Phone",
      value: "+234 000 000 0000",
      helper: "Replace with your business line",
    },
    {
      id: 3,
      label: "Location",
      value: "Lagos, Nigeria",
      helper: "Replace with your office or service area",
    },
  ]

  return (
    <section id="contact" className="bg-[#3D0A4F]/[0.02] px-8 py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div className="flex flex-col gap-8" data-aos="fade-up">
          <div className="flex flex-col gap-3">
            <span className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#3D0A4F] leading-tight tracking-tight">
              Ready to make learning{" "}
              <span className="text-[#E87722]">simpler?</span>
            </h2>
            <p className="text-[#3D0A4F]/50 text-base leading-relaxed max-w-lg">
              Use this template section for enquiries, partnership requests, onboarding questions, or student support.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-[#3D0A4F]/6 bg-white p-5"
              >
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#E87722]/70" />
                <div className="flex flex-col gap-1">
                  <p className="text-[#3D0A4F] text-sm font-semibold tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-[#3D0A4F]/60 text-sm">{item.value}</p>
                  <p className="text-[#3D0A4F]/35 text-xs">{item.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          className="rounded-2xl border border-[#3D0A4F]/6 bg-white p-7 flex flex-col gap-5"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-[#3D0A4F] text-xs font-semibold tracking-wide">
              Full Name
              <input
                type="text"
                placeholder="Your name"
                className="rounded-lg border border-[#3D0A4F]/10 px-4 py-3 text-sm font-normal text-[#3D0A4F] outline-none transition-colors duration-200 placeholder:text-[#3D0A4F]/30 focus:border-[#E87722]/50"
              />
            </label>
            <label className="flex flex-col gap-2 text-[#3D0A4F] text-xs font-semibold tracking-wide">
              Email Address
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-lg border border-[#3D0A4F]/10 px-4 py-3 text-sm font-normal text-[#3D0A4F] outline-none transition-colors duration-200 placeholder:text-[#3D0A4F]/30 focus:border-[#E87722]/50"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-[#3D0A4F] text-xs font-semibold tracking-wide">
            Subject
            <input
              type="text"
              placeholder="How can we help?"
              className="rounded-lg border border-[#3D0A4F]/10 px-4 py-3 text-sm font-normal text-[#3D0A4F] outline-none transition-colors duration-200 placeholder:text-[#3D0A4F]/30 focus:border-[#E87722]/50"
            />
          </label>

          <label className="flex flex-col gap-2 text-[#3D0A4F] text-xs font-semibold tracking-wide">
            Message
            <textarea
              rows="6"
              placeholder="Write your message here..."
              className="resize-none rounded-lg border border-[#3D0A4F]/10 px-4 py-3 text-sm font-normal text-[#3D0A4F] outline-none transition-colors duration-200 placeholder:text-[#3D0A4F]/30 focus:border-[#E87722]/50"
            />
          </label>

          <button
            type="button"
            className="bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide px-7 py-3 rounded-lg hover:bg-[#E87722] transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
