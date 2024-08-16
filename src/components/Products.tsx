import { useState } from 'react'
import { useProductsStore } from '../store/useProductsStore'
import { useProductDetailsStore } from '../store/useProductDetailsStore'
import productNotFoundLogo from '../assets/productNotFoundLogo.png'
import { ProductCard } from './ProductCard'
import { Modal } from './Modal'
import { Skeletons } from './Skeletons'
import { formatPrice } from '../utilities/formatPrice'

export const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

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
        <div className="flex flex-col items-center">
          <img className="size-16" src={productNotFoundLogo} alt="Not Found" />
          <p>No products found. Please try a different search.</p>
        </div>
      )
    }
    return (
      <main className="self-start">
        <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-3 gap-2 px-8 py-9">
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isLoading ? (
          <Skeletons />
        ) : (
          <div className="text-center w-60">
            <div className="mx-auto my-4 w-52">
              <h3 className="text-xl font-bold">{productDetails?.name}</h3>
              <img className="my-8" alt="Product" src={productDetails?.image} />
              <p className="text-xs font-medium mb-4">
                {productDetails?.description}
              </p>
              <p>{formatPrice(productDetails?.price)}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
