import { useEffect, useState } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import LandingPage from "./layout/LandingPage"
import Layout from "./layout/Layout"
import AuthLayout from "./layout/AuthLayout"

const authHashes = ["#auth", "#login", "#register"]
const landingHashes = ["#home", "#about", "#features", "#pricing", "#contact"]
const storedUserKey = "oneclick-user"

function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [mockUser, setMockUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(storedUserKey)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      localStorage.removeItem(storedUserKey)
      return null
    }
  })
  const isAuthenticated = Boolean(mockUser)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    if (!landingHashes.includes(hash)) return

    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView()
    })
  }, [hash])

  const authMode = hash === "#login" ? "login" : "register"
  const showAuth = authHashes.includes(hash)
  const showLanding = landingHashes.includes(hash)

  const handleAuthenticated = (user) => {
    localStorage.setItem(storedUserKey, JSON.stringify(user))
    setMockUser(user)
    window.history.replaceState(null, "", window.location.pathname)
    setHash("")
  }

  const handleUserUpdate = (updates) => {
    setMockUser((currentUser) => {
      const nextUser = { ...currentUser, ...updates }
      localStorage.setItem(storedUserKey, JSON.stringify(nextUser))
      return nextUser
    })
  }

  const handleLogout = () => {
    localStorage.removeItem(storedUserKey)
    setMockUser(null)
    window.location.hash = "#login"
    setHash("#login")
  }

  return (
    <>
      {isAuthenticated && !showLanding && (
        <Layout
          user={mockUser}
          onLogout={handleLogout}
          onUserUpdate={handleUserUpdate}
        />
      )}
      {!isAuthenticated && showAuth && (
        <AuthLayout
          key={authMode}
          initialMode={authMode}
          onAuthenticated={handleAuthenticated}
        />
      )}
      {showLanding && <LandingPage />}
      {!isAuthenticated && !showAuth && !showLanding && <LandingPage />}
    </>
  )
}

export default App
