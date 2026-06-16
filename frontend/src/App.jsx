import { useEffect, useState } from "react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import LandingPage from "./user/layout/LandingPage"
import Layout from "./user/layout/Layout"
import AuthLayout from "./user/layout/AuthLayout"
import UploadPdf from "./admin/pages/UploadPdf"
import Loader from "./user/shared/Loader"

const authHashes = ["#auth", "#login", "#register"]
const landingHashes = ["#home", "#about", "#features", "#pricing", "#contact"]
const uploadHash = "#upload" 
const storedUserKey = "oneclick-user"

function App() {
  const [data, setData] = useState('')
  const [appLoading, setAppLoading] = useState(true)
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

  const handleLogout = () => {
    localStorage.removeItem(storedUserKey)
    setMockUser(null) 
    window.location.hash = "#login"
    setHash("#login")
  }

  const handleUserUpdate = (updates) => {
  const updatedUser = { ...mockUser, ...updates }
  localStorage.setItem(storedUserKey, JSON.stringify(updatedUser))
  setMockUser(updatedUser)
}

  useEffect(() => {
    fetch("https://oneclick-tutors-backend.onrender.com")
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error("Error fetching from backend:", err))
      .finally(() => setAppLoading(false))
  }, [])

  if (appLoading) return <Loader />

  return (
  <>
    {hash === "#upload" ? (
      <UploadPdf />
    ) : isAuthenticated && !showLanding ? (
      <Layout onUserUpdate={handleUserUpdate} user={mockUser} onLogout={handleLogout} />
    ) : !isAuthenticated && showAuth ? (
      <AuthLayout
        key={authMode}
        initialMode={authMode}
        onAuthenticated={handleAuthenticated}
      />
    ) : showLanding ? (
      <LandingPage />
    ) : (
      <LandingPage />
    )}
  </>
)
}

export default App