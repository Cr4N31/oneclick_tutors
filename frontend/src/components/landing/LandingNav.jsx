import { useEffect, useState } from 'react'

function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navList = [
    { id: 1, name: "Home" },
    { id: 2, name: "About" },
    { id: 3, name: "Features" },
    { id: 4, name: "Pricing" },
    { id: 5, name: "Contact Us" },
  ]

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
          <ul className="flex tracking-wider gap-6">
            {navList.map((n) => (
              <li
                key={n.id}
                className={`
                  md:text-normal text-xs cursor-pointer transition-colors duration-250
                  ${scrolled
                    ? 'text-[#3D0A4F] hover:text-[#E87722]'
                    : 'text-[#3D0A4F] hover:text-[#E87722]'
                  }
                `}
              >
                {n.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default LandingNav