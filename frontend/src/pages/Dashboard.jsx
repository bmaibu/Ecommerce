import Sidebar from '@/components/Sidebar'
import MobileSidebar from '@/components/MobileSidebar'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className='pt-10 flex'>
      {/* Hamburger Menu Button - Only visible on mobile/tablet */}
      <button
        className="hamburger-menu-btn"
        onClick={() => setIsMobileSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Desktop Sidebar - unchanged */}
      <Sidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard