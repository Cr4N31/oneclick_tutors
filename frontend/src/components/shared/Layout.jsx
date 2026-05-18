import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      <Header onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with smooth slide */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'w-[240px]' : 'w-0'}`}>
          <Sidebar />
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