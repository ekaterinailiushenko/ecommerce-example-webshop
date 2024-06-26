import { useState } from 'react'
import { useProductsStore } from '../store/useProductsStore'
import { useProductDetailsStore } from '../store/useProductDetailsStore'
import productNotFoundLogo from '../assets/productNotFoundLogo.png'
import { ProductCard } from './ProductCard'
import { Modal } from './Modal'
import { LoadingSkeleton } from '../utilities/LoadingSkeleton'
import { FormattedPrice } from './FormattedPrice'

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const products = useProductsStore(state => state.filteredProducts)

  const { isLoading, productDetails, getProductDetails } =
    useProductDetailsStore(state => {
      return {
        isLoading: state.isLoading,
        productDetails: state.productDetails,
        getProductDetails: state.getProductDetails,
      }
    })

  const handleOpenModal = async (id: string) => {
    setIsModalOpen(true)
    getProductDetails(id)
  }

  const renderProducts = () => {
    if (!products.length) {
      return (
        <div className="bg-yellow-200">
          <div>
            <img
              className="size-16"
              src={productNotFoundLogo}
              alt="Not Found"
            />
            <p className="">
              No products found. Please try a different search.
            </p>
          </div>
        </div>
      )
    }
    return (
      <main>
        <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-3 gap-2 px-8 py-10">
          {products.map(product => (
            <ProductCard
              key={product.product_id}
              product={product}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </main>
    )
  }

  return (
    <>
      {renderProducts()}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="text-center w-60">
            <div className="mx-auto my-4 w-52">
              <h3 className="text-xl font-bold">{productDetails?.name}</h3>
              <img className="my-8" alt="Product" src={productDetails?.image} />
              <p className="text-xs font-medium mb-4">
                {productDetails?.description}
              </p>
              <p>
                <FormattedPrice price={productDetails?.price} />
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
