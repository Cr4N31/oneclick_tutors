import { useEffect, useState } from 'react'
import Header from '../shared/Header'
import Sidebar from '../shared/Sidebar'
import RegisteredCourseList from '../pages/RegisteredCourseList'
import SummaryPage from '../pages/SummaryPage'
import TakeAQuizPage from '../pages/TakeAQuizPage'
import TrackProgress from '../pages/TrackProgress'
import Contact from '../components/landing/Contact'

function Layout({ user, onLogout, onUserUpdate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState(() => {
    if (typeof window === 'undefined') return 'courses'
    return window.localStorage.getItem('activePage') || 'courses'
  })

  useEffect(() => {
    window.localStorage.setItem('activePage', activePage)
  }, [activePage])

  const renderPage = () => {
    switch (activePage) {
      case 'courses': return <RegisteredCourseList user={user} onUserUpdate={onUserUpdate}/>
      case 'summary': return <SummaryPage user={user}/>
      case 'quiz': return <TakeAQuizPage user={user}/>
      case 'progress': return <TrackProgress user={user}/>
      case 'examCondition': return <div className="text-[#3D0A4F]">Exam condition page coming soon</div>
      case 'contact' : return <Contact/>
      default: return <RegisteredCourseList />
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header onToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'w-[240px]' : 'w-0'}`}>
          <Sidebar
            onLogout={onLogout}
            onPageChange={(page) => setActivePage(page)}
            activePage={activePage}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-white p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default Layout