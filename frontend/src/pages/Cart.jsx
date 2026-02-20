import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import userLogo from "../assets/userlogo.png"
import { setCart } from "@/redux/productSlice"

const Cart = () => {
  const cart = useSelector(state => state.product.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = localStorage.getItem("accessToken")
  const API = "http://localhost:8000/api/v1/cart"

  /* ---------- totals ---------- */
  const subtotal = cart?.totalPrice || 0
  const shipping = subtotal > 299 ? 0 : 10
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  /* ---------- load cart ---------- */
  const fetchCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data.success) {
        dispatch(setCart(res.data.cart))
      }
    } catch (err) {
      console.log(err)
    }
  }

  /* ---------- quantity ---------- */
  const updateQty = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (res.data.success) {
        dispatch(setCart(res.data.cart))
      }
    } catch (err) {
      console.log(err)
    }
  }

  /* ---------- remove ---------- */
  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      })
      if (res.data.success) {
        dispatch(setCart(res.data.cart))
        toast.success("Item removed")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  /* ---------- empty cart ---------- */
  if (!cart?.items?.length) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <ShoppingCart className="w-16 h-16 text-pink-500" />
        <h2 className="text-xl font-semibold mt-4">Your cart is empty</h2>
        <Button
          className="mt-6 bg-pink-600"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-7">Shopping Cart</h1>

        <div className="flex gap-7">
          {/* ---------------- CART ITEMS ---------------- */}
          <div className="flex-1 flex flex-col gap-5">
            {cart.items.map(item => {
              const product = item.productId

              return (
                <Card key={product._id}>
                  <div className="flex justify-between items-center pr-7">
                    <div className="flex items-center gap-4 w-[350px]">
                      <img
                        src={product?.productImg?.[0]?.url || userLogo}
                        alt={product?.productName}
                        className="w-24 h-24 object-contain"
                      />

                      <div className="w-[260px]">
                        <h2 className="font-semibold">
                          {product.productName}
                        </h2>
                        <p>₹{product.productPrice}</p>
                      </div>
                    </div>

                    {/* quantity */}
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() =>
                          updateQty(product._id, "decrease")
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        onClick={() =>
                          updateQty(product._id, "increase")
                        }
                      >
                        +
                      </Button>
                    </div>

                    {/* price */}
                    <p>
                      ₹{product.productPrice * item.quantity}
                    </p>

                    {/* remove */}
                    <button
                      onClick={() => removeItem(product._id)}
                      className="flex items-center gap-1 text-red-500"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* ---------------- SUMMARY ---------------- */}
          <Card className="w-[400px] h-fit">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.items.length} items)</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-3">
                <Input placeholder="Promo Code" />
                <Button variant="outline">Apply</Button>
              </div>

              <Button onClick={() => navigate('/address')} className="w-full bg-pink-600">
                PLACE ORDER
              </Button>

              <Button variant="outline" className="w-full">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <div className='text-sm text-muted-foreground pt-4'>
                <p>* Free shipping on orders over 299</p>
                <p>* 30-days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Cart
