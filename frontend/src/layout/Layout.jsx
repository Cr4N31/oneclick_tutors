import { useState } from 'react'
import Header from '../components/shared/Header'
import Sidebar from '../components/shared/Sidebar'
import RegisteredCourseList from '../pages/RegisteredCourseList'
import PersonalDetailsPage from '../pages/PersonalDetailsPage'

function Layout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState('Course List')

  const renderPage = () => {
    switch (activePage) {
      case 'courses':      return <RegisteredCourseList />
      case 'summary':          return <div className="text-[#3D0A4F]">Summary page coming soon</div>
      case 'quiz':      return <div className="text-[#3D0A4F]">Quiz page coming soon</div>
      case 'Progress': return <div className="text-[#3D0A4F]">Progress page coming soon</div>
      case 'details': return <PersonalDetailsPage/>
      default:                 return <RegisteredCourseList />
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