import { useProductsStore } from '../store'
import { ProductCard } from './ProductCard'
import productNotFoundLogo from '../assets/productNotFoundLogo.png'

export const Products = () => {
  const products = useProductsStore(state => state.filteredProducts)

  const renderProducts = () => {
    if (!products.length) {
      return (
        <div className="flex flex-col items-center h-[calc(100vh-64px)] justify-center">
          <img className="size-16" src={productNotFoundLogo} alt="Not Found" />
          <p>No products found. Please try a different search.</p>
        </div>
      )
    }
    return (
      <main className="h-[calc(100vh-64px)]">
        <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-3 gap-2 px-8 py-9">
          {products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </main>
    )
  }

  return renderProducts()
}
