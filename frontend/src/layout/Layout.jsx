import { useState } from 'react'
import Header from '../components/shared/Header'
import Sidebar from '../components/shared/Sidebar'
import RegisteredCourseList from '../pages/RegisteredCourseList'
import PersonalDetailsPage from '../pages/PersonalDetailsPage'

function EmptyDashboardPage() {
  return null
}

const dashboardPages = {
  courses: RegisteredCourseList,
  summary: EmptyDashboardPage,
  quiz: EmptyDashboardPage,
  progress: EmptyDashboardPage,
  details: PersonalDetailsPage,
}

function Layout({ user, onLogout, onUserUpdate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [page, setPage] = useState("courses")
  const ActivePage = dashboardPages[page] || RegisteredCourseList

  return (
    <div className="flex flex-col h-screen">
      <Header onToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with smooth slide */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'w-[240px]' : 'w-0'}`}>
          <Sidebar
            activePage={page}
            onPageChange={setPage}
            onLogout={onLogout}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-white p-8">
          <ActivePage user={user} onUserUpdate={onUserUpdate} />
        </main>
      </div>
    </div>
  )
}

export default Layout
