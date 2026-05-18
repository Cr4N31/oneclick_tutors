import { useEffect, useState } from 'react'

const navList = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Features", href: "#features" },
  { id: 4, name: "Pricing", href: "#pricing" },
  { id: 5, name: "Contact", href: "#contact" },
]

function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navList
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-2">
      <div
        className={`
          flex justify-between items-center px-6 py-3 rounded-2xl
          transition-all duration-500 ease-in-out
          ${scrolled
            ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(61,10,79,0.12)] saturate-150'
            : 'bg-transparent border border-transparent shadow-none'
          }
        `}
      >
        {/* Logo */}
        <div>
          <img
            src="https://res.cloudinary.com/dapzvtbty/image/upload/ONECLICK-TUTOR_ASSEST-02_g0scfo.png"
            alt="header_img"
            className="w-36"
          />
        </div>

        {/* Nav */}
        <nav>
          <ul className="flex tracking-wider gap-2 sm:gap-4 md:gap-6">
            {navList.map((n) => (
              <li
                key={n.id}
              >
                <a
                  href={n.href}
                  className={`
                    relative rounded-full px-1 md:px-2 py-2 text-xs md:text-sm cursor-pointer transition-all duration-200
                    ${activeSection === n.href.replace("#", "")
                      ? 'bg-[#E87722]/10 text-[#E87722]'
                      : 'text-[#3D0A4F]/70 hover:text-[#E87722]'
                    }
                  `}
                >
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default LandingNav
