import { useState } from 'react'
import Header from '../components/shared/Header'
import Sidebar from '../components/shared/Sidebar'

function Layout({ children, user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      <Header onToggle={() => setSidebarOpen(!sidebarOpen)} user={user} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with smooth slide */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'w-[240px]' : 'w-0'}`}>
          <Sidebar onLogout={onLogout} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-white p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
