function Pricing() {
  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "Free",
      description: "A simple way to begin studying with guided AI support.",
      features: ["Access sample study notes", "Try limited CBT questions", "Track basic progress"],
      highlighted: false,
    },
    {
      id: 2,
      name: "Student",
      price: "Edit price",
      description: "For students who want full course support and consistent exam practice.",
      features: ["Full course materials", "AI study notes per unit", "CBT practice and corrections"],
      highlighted: true,
    },
    {
      id: 3,
      name: "Premium",
      price: "Edit price",
      description: "A complete study companion for deeper revision and stronger accountability.",
      features: ["Everything in Student", "Advanced progress insights", "Priority learning support"],
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="bg-white px-8 py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center text-center gap-3" data-aos="fade-up">
          <span className="text-[#E87722] text-xs tracking-widest uppercase font-semibold">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3D0A4F] leading-tight tracking-tight max-w-xl">
            Flexible plans for every{" "}
            <span className="text-[#E87722]">learning stage</span>
          </h2>
          <p className="text-[#3D0A4F]/45 text-base leading-relaxed max-w-lg">
            Replace these template details with your real pricing, benefits, and plan limits when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <article
              key={plan.id}
              data-aos="fade-up"
              className={`flex flex-col gap-6 rounded-2xl border p-7 transition-all duration-200 ${
                plan.highlighted
                  ? "bg-[#3D0A4F] border-[#3D0A4F] text-white shadow-[0_18px_40px_rgba(61,10,79,0.16)]"
                  : "bg-white border-[#3D0A4F]/6 hover:border-[#E87722]/30 hover:shadow-sm"
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`text-sm font-semibold tracking-wide ${plan.highlighted ? "text-white" : "text-[#3D0A4F]"}`}>
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <span className="rounded-full bg-[#E87722] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p className={`text-3xl font-semibold tracking-tight ${plan.highlighted ? "text-white" : "text-[#3D0A4F]"}`}>
                  {plan.price}
                </p>
                <p className={`text-sm leading-relaxed ${plan.highlighted ? "text-white/65" : "text-[#3D0A4F]/50"}`}>
                  {plan.description}
                </p>
              </div>

              <div className={`h-px w-full ${plan.highlighted ? "bg-white/15" : "bg-[#3D0A4F]/6"}`} />

              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 text-sm leading-relaxed ${plan.highlighted ? "text-white/75" : "text-[#3D0A4F]/55"}`}
                  >
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${plan.highlighted ? "bg-[#E87722]" : "bg-[#E87722]/70"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto text-center text-sm font-semibold tracking-wide px-7 py-3 rounded-lg transition-colors duration-200 ${
                  plan.highlighted
                    ? "bg-white text-[#3D0A4F] hover:bg-[#E87722] hover:text-white"
                    : "bg-[#3D0A4F] text-white hover:bg-[#E87722]"
                }`}
              >
                Choose Plan
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
