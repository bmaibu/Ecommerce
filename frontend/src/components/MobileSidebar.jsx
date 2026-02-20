import React from "react"
import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
  X,
} from "lucide-react"
import { FaRegEdit } from "react-icons/fa"

const MobileSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="mobile-sidebar-backdrop"
        onClick={onClose}
      />
      
      {/* Mobile Sidebar */}
      <div className="mobile-sidebar">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="mobile-sidebar-close"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Navigation Items */}
        <div className="mobile-sidebar-nav">
          {/* Dashboard */}
          <NavLink
            to="/dashboard/sales"
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} 
               flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </NavLink>

          {/* Add Product */}
          <NavLink
            to="/dashboard/add-product"
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} 
               flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <PackagePlus />
            <span>Add Product</span>
          </NavLink>

          {/* Products */}
          <NavLink
            to="/dashboard/products"
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} 
               flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <PackageSearch />
            <span>Products</span>
          </NavLink>

          {/* Users */}
          <NavLink
            to="/dashboard/users"
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} 
               flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <Users />
            <span>Users</span>
          </NavLink>

          {/* Orders */}
          <NavLink
            to="/dashboard/orders"
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"} 
               flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <FaRegEdit />
            <span>Orders</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default MobileSidebar
