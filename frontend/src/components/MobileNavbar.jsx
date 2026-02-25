// ===== START: Mobile Navbar Component =====
// This component is ONLY for small screens.
// Desktop Navbar remains completely untouched.
// ===== END: Mobile Navbar Component =====

import React, { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import axios from "axios"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/userSlice"

const MobileNavbar = () => {
    const user = useSelector(store => store.user.user)
    const cart = useSelector(store => store.product.cart)
    const accessToken = localStorage.getItem("accessToken")
    const admin = user?.role === "admin" ? true : false
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/user/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            if (res.data.success) {
                dispatch(setUser(null))
                toast.success(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200 lg:hidden">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4">

                {/* logo section */}
                <div>
                    <img src="/Ekart.png" alt="Ekart" className="w-[80px]" />
                </div>

                {/* nav section */}
                <nav className="flex gap-2 justify-between items-center">
                    <Link to="/" className="text-sm font-semibold hover:text-pink-600 transition-colors">Home</Link>

                    {/* Menu Button with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 px-2 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            <span className="text-sm font-semibold">Menu</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-pink-200 overflow-hidden z-50">
                                <Link
                                    to="/products"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3 hover:bg-pink-50 transition-colors border-b border-pink-100"
                                >
                                    <span className="text-gray-800 font-medium">Products</span>
                                </Link>

                                {user && (
                                    <Link
                                        to={`/profile/${user._id}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-4 py-3 hover:bg-pink-50 transition-colors border-b border-pink-100"
                                    >
                                        <span className="text-gray-800 font-medium">Hello, {user.firstName}</span>
                                    </Link>
                                )}

                                {admin && (
                                    <Link
                                        to="/dashboard/sales"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-4 py-3 hover:bg-pink-50 transition-colors"
                                    >
                                        <span className="text-gray-800 font-medium">Dashboard</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* cart */}
                        <Link to="/cart" className="relative">
                            <ShoppingCart size={20} />
                            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-3 px-1.5 text-xs">
                                {cart?.items?.length || 0}
                            </span>
                        </Link>

                        {/* auth button */}
                        {user ? (
                            <Button
                                onClick={logoutHandler}
                                className="px-2 py-1 h-auto text-xs bg-pink-600 text-white cursor-pointer"
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                onClick={() => navigate("/login")}
                                className="px-2 py-1 h-auto text-xs bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer"
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default MobileNavbar
