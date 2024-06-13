import logo from './assets/logo.png'
import { Input } from './components/Input'
import { useEffect } from 'react'
import { ProductsList } from './components/ProductsList'
import { useProductsStore } from './store/useProductsStore'

function App() {
  const products = useProductsStore(state => state.products)
  const loading = useProductsStore(state => state.isLoading)
  const error = useProductsStore(state => state.isError)
  const getProducts = useProductsStore(state => state.getProducts)
  const filteredProducts = useProductsStore(state => state.filteredProducts)
  const filterItems = useProductsStore(state => state.filterProducts)
  console.log(products)
  useEffect(() => {
    getProducts()
  }, [getProducts])
  // const { products, loading, error } = useGetProducts()
  // const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])

  // useEffect(() => {
  //   if (Object.keys(products).length > 0) {
  //     setFilteredProducts(products)
  //   }
  // }, [products])

  // const filterItems = (searchTerm: string) => {
  //   const filteredItems = products.filter((product: ProductType) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   setFilteredProducts(filteredItems)
  // }

  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="flex h-16 justify-between items-center bg-header">
        <img className="size-16" src={logo} alt="Logo" />
        <Input onChangeCallback={filterItems} />
        <div className="size-16" aria-hidden="true"></div>
      </header>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the users</p>}
      {!loading && !error && <ProductsList products={filteredProducts} />}
    </div>
  )
}

export default App
