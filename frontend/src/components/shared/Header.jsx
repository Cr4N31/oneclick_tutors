import { useEffect, useState } from 'react'

const headerLinks = [
  { id: 1, name: 'Contact', href: '#contact' },
]

function Header({ onToggle, user }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home')
  const displayName = user?.full_name || "Student"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
  
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash || '#home')

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <header className="font-product-sans fixed top-0 left-0 right-0 z-50 px-4 pt-2">
      <div
        className={`
          flex justify-between items-center px-5 md:px-6 py-3 rounded-2xl
          transition-all duration-500 ease-in-out
          ${scrolled
            ? 'bg-white/90 backdrop-blur-md border border-[#3D0A4F]/8 shadow-[0_8px_32px_rgba(61,10,79,0.12)] saturate-150'
            : 'bg-white/75 backdrop-blur-sm border border-[#3D0A4F]/6 shadow-sm'
          }
        `}
      >

        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Toggle button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Toggle sidebar"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full bg-[#3D0A4F]/5 hover:bg-[#E87722]/10 transition-colors duration-150"
          >
            <span className="block w-4 h-px bg-[#3D0A4F]" />
            <span className="block w-4 h-px bg-[#3D0A4F]" />
            <span className="block w-4 h-px bg-[#3D0A4F]" />
          </button>
          <div className="rounded-md flex items-center justify-center">
            <img 
              src='https://res.cloudinary.com/dapzvtbty/image/upload/v1779107427/ONECLICK-TUTOR_ASSEST-02_g0scfo.png' 
              alt="Oneclick Tutors" 
              className="w-36 md:w-40" 
            />
          </div>
        </div>

        {/* Nav */}
        <ul className="hidden md:flex items-center tracking-wider gap-3">
          {headerLinks.map((link) => {
            const isActive = activeHash === link.href

            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`
                    relative rounded-full px-3 py-2 text-sm cursor-pointer transition-all duration-200
                    ${isActive
                      ? 'bg-[#E87722]/10 text-[#E87722]'
                      : 'text-[#3D0A4F]/70 hover:text-[#E87722]'
                    }
                  `}
                >
                  {link.name}
                </a>
              </li>
            )
          })}
          <li>
            <span
              className="inline-flex items-center gap-2 bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide px-5 py-2.5 rounded-lg"
            >
              <span className="h-2 w-2 rounded-full bg-[#E87722]" />
              {displayName}
            </span>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full bg-[#3D0A4F]/5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-4 h-px bg-[#3D0A4F] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-4 h-px bg-[#3D0A4F] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-px bg-[#3D0A4F] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 rounded-2xl border border-[#3D0A4F]/8 bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(61,10,79,0.12)] p-4 flex flex-col gap-2">
          {headerLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-full px-3 py-2 text-sm tracking-wide transition-colors duration-150 ${
                activeHash === link.href
                  ? 'bg-[#E87722]/10 text-[#E87722]'
                  : 'text-[#3D0A4F]/70 hover:text-[#E87722]'
              }`}
            >
              {link.name}
            </a>
          ))}
          <span
            className="inline-flex items-center justify-center gap-2 bg-[#3D0A4F] text-white text-sm font-semibold tracking-wide px-5 py-2.5 rounded-lg text-center"
          >
            <span className="h-2 w-2 rounded-full bg-[#E87722]" />
            {displayName}
          </span>
        </div>
      )}
    </header>
  )
}

export default Header
