import { useState } from 'react'
import headerIcons from '../../../assets/imgs/oneclick_tutors_logo.png'
function Header({ onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="font-product-sans w-full bg-[#3D0A4F] border-b border-[#E87722]/20 px-8 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
            {/* Toggle button */}
            <button
                onClick={onToggle}
                className="flex flex-col gap-1.5 p-1 opacity-60 hover:opacity-100 transition-opacity duration-150"
            >
                <span className="block w-5 h-px bg-white" />
                <span className="block w-5 h-px bg-white" />
                <span className="block w-5 h-px bg-white" />
            </button>
          <div className="rounded-md flex items-center justify-center">
            <img src={headerIcons} className="w-48"/>
          </div>
        </div>

        {/* Nav */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <a
              href="#"
              className="text-white/50 text-sm tracking-wide hover:text-white transition-colors duration-150"
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white/50 text-sm tracking-wide hover:text-white transition-colors duration-150"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="#"
              className="bg-[#E87722] text-white text-sm tracking-wide px-5 py-2 rounded-lg hover:bg-[#E87722]/80 transition-colors duration-200"
            >
              Sign Up
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-black/5 pt-4 flex flex-col gap-4 px-8">
          <a href="#" className="text-white/60 text-sm tracking-wide hover:text-white">Contact Us</a>
          <a href="#" className="text-white/60 text-sm tracking-wide hover:text-white">Login</a>
          <a href="#" className="bg-[#E87722] text-white text-sm tracking-wide px-5 py-2 rounded-lg text-center hover:bg-[#E87722]/80 transition-colors duration-200">Sign Up</a>
        </div>
      )}
    </header>
  )
}

export default Header