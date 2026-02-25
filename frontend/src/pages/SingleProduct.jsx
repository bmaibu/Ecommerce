import Breadcrumps from '@/components/Breadcrumps'
import ProductDesc from '@/components/ProductDesc'
import ProductImg from '@/components/ProductImg'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleProduct = () => {
  const params = useParams()
  const productId = params.id
  const { products } = useSelector((store) => store.product)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/get/${productId}`)
        if (res.data.success) {
          setProduct(res.data.product)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const foundProduct = products.find((item) => item._id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      fetchProduct()
    }
  }, [productId, products])

  if (loading || !product) return <div className="pt-20 text-center text-gray-500">Loading Product...</div>

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto">
      <Breadcrumps product={product} />
      <div className="mt-10 grid grid-cols-2 items-start single-product-grid">
        <ProductImg images={product.productImg} />
        <ProductDesc product={product} />
      </div>

    </div>
  )
}

export default SingleProduct