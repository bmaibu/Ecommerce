import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { setProducts } from "@/redux/productSlice"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { Edit, Trash2, Search } from "lucide-react"
import ImageUpload from "@/components/ImageUpload"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const AdminProduct = () => {
  const { products } = useSelector(store => store.product)
  const [editProduct, setEditProduct] = useState(null)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()

  let filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (sortOrder === 'lowToHigh') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.productPrice - b.productPrice)
  }

  if (sortOrder === 'highToLow') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.productPrice - a.productPrice)
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("productName", editProduct.productName)
    formData.append("productDesc", editProduct.productDesc)
    formData.append("productPrice", editProduct.productPrice)
    formData.append("category", editProduct.category)
    formData.append("brand", editProduct.brand)

    const exisitingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id)

    formData.append("existingImages", JSON.stringify(exisitingImages))

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file)
      })

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res.data.success) {
        toast.success("Product updated successfully")
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p
        )
        dispatch(setProducts(updateProducts))
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProducts = products.filter((product) => product._id !== productId)
      const res = await axios.delete(`http://localhost:8000/api/v1/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setProducts(remainingProducts))
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100 admin-product-container">
      <div className="pt-20 flex justify-between admin-product-header">
        <div className="relative bg-white rounded-lg admin-product-search-wrapper">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Product..."
            className="w-[400px] items-center admin-product-search-input"
          />
          <Search className="absolute right-3 top-1.5 text-gray-500" />
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-white admin-product-sort-select">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4 admin-product-list">
        {
          filteredProducts.map((product, index) => {
            return (
              <Card key={index} className="px-4 admin-product-card">
                <div className="flex items-center justify-between admin-product-card-content">

                  <div className="flex gap-2 items-center admin-product-info-section">
                    <img
                      src={product.productImg[0]?.url}
                      alt=""
                      className="w-25 h-25"
                    />
                    <h1 className="font-semibold text-gray-700 w-80">
                      {product.productName}
                    </h1>
                  </div>

                  <h1 className="font-semibold text-gray-800 admin-product-price">
                    ₹{product.productPrice}
                  </h1>

                  <div className="flex gap-3 admin-product-actions">

                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Edit onClick={() => { setOpen(true); setEditProduct(product) }} className="text-green-500 cursor-pointer" />
                      </DialogTrigger>

                      {editProduct && (
                        <DialogContent className="sm:max-w-[625px] max-h-[760px] overflow-scroll">
                          <form onSubmit={handleSave}>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>
                                Update product details and save changes.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">

                              <div className="grid gap-2">
                                <Label>Product Name</Label>
                                <Input
                                  type="text"
                                  value={editProduct?.productName}
                                  onChange={handleChange}
                                  name="productName"
                                  placeholder="EX-Iphone"
                                  required
                                />
                              </div>

                              <div className="grid gap-2">
                                <Label>Price</Label>
                                <Input
                                  type="number"
                                  value={editProduct?.productPrice}
                                  onChange={handleChange}
                                  name="productPrice"
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label>Brand</Label>
                                  <Input
                                    type="text"
                                    value={editProduct?.brand}
                                    onChange={handleChange}
                                    name="brand"
                                    placeholder="Ex-apple"
                                    required
                                  />
                                </div>

                                <div className="grid gap-2">
                                  <Label>Category</Label>
                                  <Input
                                    type="text"
                                    value={editProduct?.category}
                                    onChange={handleChange}
                                    name="category"
                                    placeholder="Ex-mobile"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="grid gap-2">
                                <div className="flex items-center">
                                  <Label>Description</Label>
                                </div>
                                <Textarea
                                  name="productDesc"
                                  value={editProduct?.productDesc}
                                  onChange={handleChange}
                                  placeholder="Enter brief description of product"
                                />
                              </div>

                              <ImageUpload productData={editProduct} setProductData={setEditProduct} />

                            </div>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                              </DialogClose>
                              <Button type="submit" className="cursor-pointer">Save Changes</Button>
                            </DialogFooter>

                          </form>
                        </DialogContent>
                      )}

                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash2 className='text-red-500 cursor-pointer' />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteProductHandler(product._id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>


                  </div>
                </div>
              </Card>
            )
          })}
      </div>
    </div>
  )
}

export default AdminProduct
