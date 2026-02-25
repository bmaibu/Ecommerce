

// // import React from "react"
// // import { ShoppingCart } from "lucide-react"
// // import { Button } from "./ui/button"
// // import { Skeleton } from "./ui/skeleton"
// // import { useDispatch } from "react-redux"
// // import { useNavigate } from "react-router-dom"
// // import { setCart } from "@/redux/productSlice"

// // const ProductCard = ({ product, loading }) => {
// //     const { productImg, productPrice, productName } = product
// //     const accessToken = localStorage.getItem("accessToken")
// //     const dispatch = useDispatch()
// //     const navigate = useNavigate()

// //     const addToCart = async (productId) => {
// //         try {
// //             const res = await axios.post(`http://localhost:8000/api/v1/cart/add`, { productId },{
// //                 headers: {
// //                     Authorization: `Bearer ${accessToken}`,
// //                 },
// //             })
// //             if(res.data.success){
// //                 toast.success('Product added to cart')
// //                 dispatch(setCart(res.data.cart)) // Fetch updated cart data
// //             }
// //         } catch (error) {
// //             console.log(error)

// //         }

// //     }

// //     return (
// //         <div className="w-45 bg-white shadow-lg rounded-lg overflow-hidden">
// //             {/* Image */}
// //             <div className="w-full h-36 bg-white flex items-center justify-center overflow-hidden">
// //                 {loading ? (
// //                     <Skeleton className="w-full h-full" />
// //                 ) : (
// //                     <img
// //                         src={productImg?.[0]?.url}
// //                         alt={productName}
// //                         className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
// //                     />
// //                 )}
// //             </div>

// //             {/* Content */}
// //             {loading ? (
// //                 <div className="p-3 space-y-2">
// //                     <Skeleton className="h-4 w-full" />
// //                     <Skeleton className="h-4 w-24" />
// //                     <Skeleton className="h-9 w-full" />
// //                 </div>
// //             ) : (
// //                 <div className="p-3 space-y-1">
// //                     <h1 className="font-semibold text-sm h-10 line-clamp-2">
// //                         {productName}
// //                     </h1>
// //                     <h2 className="font-bold">₹{productPrice}</h2>
// //                     <Button className="bg-pink-600 w-full flex items-center justify-center gap-2">
// //                         <ShoppingCart size={18} />
// //                         Add to Cart
// //                     </Button>
// //                 </div>
// //             )}
// //         </div>
// //     )
// // }

// // export default ProductCard


// import React from "react"
// import axios from "axios"
// import { ShoppingCart } from "lucide-react"
// import { Button } from "./ui/button"
// import { Skeleton } from "./ui/skeleton"
// import { toast } from "sonner"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { setCart } from "@/redux/productSlice"

// const ProductCard = ({ product, loading }) => {
//     const { productImg, productPrice, productName, _id } = product || {}
//     const accessToken = localStorage.getItem("accessToken")
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const addToCart = async (productId) => {
//         try {
//             const res = await axios.post(
//                 "http://localhost:8000/api/v1/cart/add",
//                 { productId },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             )

//             if (res.data.success) {
//                 toast.success("Product added to cart")
//                 dispatch(setCart(res.data.cart))
//             }
//         } catch (error) {
//             console.error(error)
//             toast.error("Failed to add product")
//         }
//     }

//     return (
//         <div className="w-45 bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Image */}
//             <div className="w-full h-36 bg-white flex items-center justify-center overflow-hidden">
//                 {loading ? (
//                     <Skeleton className="w-full h-full" />
//                 ) : (
//                     <img
//                         src={productImg?.[0]?.url}
//                         alt={productName}
//                         className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
//                     />
//                 )}
//             </div>

//             {/* Content */}
//             {loading ? (
//                 <div className="p-3 space-y-2">
//                     <Skeleton className="h-4 w-full" />
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-9 w-full" />
//                 </div>
//             ) : (
//                 <div className="p-3 space-y-1">
//                     <h1 className="font-semibold text-sm h-10 line-clamp-2">
//                         {productName}
//                     </h1>
//                     <h2 className="font-bold">₹{productPrice}</h2>

//                     <Button
//                         onClick={() => addToCart(_id)}
//                         className="bg-pink-600 w-full flex items-center justify-center gap-2"
//                     >
//                         <ShoppingCart size={18} />
//                         Add to Cart
//                     </Button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ProductCard


import React from "react"
import axios from "axios"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCart } from "@/redux/productSlice"

const ProductCard = ({ product, loading }) => {
    const { productImg, productPrice, productName, _id } = product || {}
    const accessToken = localStorage.getItem("accessToken")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addToCart = async (productId) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/cart/add`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            if (res.data.success) {
                toast.success("Product added to cart")
                dispatch(setCart(res.data.cart))
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to add product")
        }
    }

    return (
        // MODIFIED - Changed width to w-full to fit grid column and prevent overlapping
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image */}
            <div className="w-full h-36 bg-white flex items-center justify-center overflow-hidden">
                {loading ? (
                    <Skeleton className="w-full h-full rounded-lg" />
                ) : (
                    <img
                        onClick={() => navigate(`/products/${product._id}`)}
                        src={productImg?.[0]?.url}
                        alt={productName}
                        // MODIFIED - Added w-full object-contain to ensure image fits properly
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 cursor-pointer"
                    />
                )}
            </div>

            {/* Content */}
            {loading ? (
                <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-9 w-full" />
                </div>
            ) : (
                <div className="p-3 space-y-1">
                    <h1 className="font-semibold text-sm h-10 line-clamp-2">
                        {productName}
                    </h1>
                    <h2 className="font-bold">₹{productPrice}</h2>

                    <Button
                        onClick={() => addToCart(_id)}
                        className="bg-pink-600 w-full flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        Add to Cart
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ProductCard
