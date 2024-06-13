import { useState } from 'react'
import { Modal } from './Modal'
import axios from 'axios'
import { FormattedPrice } from './FormattedPrice'
import { API_URL } from '../api/products'
import { ProductType } from '../store/useProductsStore'

export type ProductDetailsType = {
  product_id: string
  name: string
  price: number
  image: string
  description?: string
}

export const ProductsList = ({ products }: { products: ProductType[] }) => {
  const [open, setOpen] = useState(false)
  const [productDetails, setProductDetails] =
    useState<ProductDetailsType | null>(null)

  const handleOpenModal = async (id: string) => {
    setOpen(true)

    const response = await axios.get(`${API_URL}/${id}/detail`)

    setProductDetails(response.data)
    console.log(productDetails)
  }

  return (
    <>
      {!products.length ? (
        <p>No users found</p>
      ) : (
        <main>
          <div className="border-4 border-orange-500 grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-3 gap-2 px-8 py-10">
            {products.map((product: ProductType) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleOpenModal(product.product_id)}
                className="h-64 bg-white rounded flex flex-col justify-between"
                key={product.product_id}
              >
                <h5 className="font-bold text-lg self-start pl-6 pt-6">
                  {product.name}
                </h5>
                <img
                  className="object-contain w-3/5 h-3/5 self-center"
                  src={product.image}
                  alt="ProductImage"
                />
                <h5 className="pr-6 pb-6 self-end">
                  <FormattedPrice price={product.price} />
                </h5>
              </div>
            ))}
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="text-center w-60 bg-yellow-200">
              <div className="mx-auto my-4 w-52 bg-green-100">
                <h3 className="text-xl font-bold">{productDetails?.name}</h3>
                <img
                  className="my-8"
                  alt="Product"
                  src={productDetails?.image}
                />
                <p className="text-xs font-medium mb-4">
                  {productDetails?.description}
                </p>
                <p className="">
                  <FormattedPrice price={productDetails?.price} />
                </p>
              </div>
            </div>
          </Modal>
        </main>
      )}
    </>
  )
}
