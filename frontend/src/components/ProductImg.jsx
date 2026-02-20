import React, { useState } from "react"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0].url)

  return (
    <div className="flex gap-5 w-max product-img-container">
      <div className="gap-5 flex flex-col product-img-thumbnails-wrapper">
        {images.map((img) => {
          return (
            <img
              onClick={() => setMainImg(img.url)}
              src={img.url}
              alt=""
              className="cursor-pointer w-20 h-20 border shadow product-img-thumbnail-item"
            />
          )
        })}
      </div>
      <Zoom>
        <img
          src={mainImg}
          alt=""
          className="w-[500px] border shadow-lg product-img-main-view"
        />
      </Zoom>

    </div>
  )
}

export default ProductImg
