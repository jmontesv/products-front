import { useEffect, useState, useMemo } from "react"
import { getProducts } from "../services/products"
import { Product } from "../types/Product"
import Pagination from "./Pagination"
import useDebounce  from "../hooks/useDebounce"
import "./Products.css"

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState<number | null>(null)
  const [nameFilter, setNameFilter] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [numberPerPage, setNumberPerPage] = useState<number>(10)
  const [numberPage, setNumberPage] = useState<number>(1)
  const [numbersPages,  setNumbersPages] = useState<number[]>([])
  const debouncedName = useDebounce(nameFilter, 500)

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts({name: debouncedName, price_max: maxPrice, price_min: minPrice, per_page: numberPerPage, page: numberPage})
      setProducts(data.data)
      setTotalProducts(data.total)
    }
    fetchProducts()
  }, [maxPrice, minPrice, numberPerPage, numberPage, debouncedName])

  const onChangePerPage = (numberPerPage: number) => {
    setNumberPerPage(numberPerPage)
  }

  const onChangePage = (numberPage: number) => {
    setNumberPage(numberPage)
  }

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil((totalProducts || 0) / numberPerPage))
  }, [totalProducts, numberPerPage])

  useEffect(() => {
    const newPages: number[] = Array.from({length: totalPages}, (_, i) => {  
      return i + 1
    })
    setNumbersPages(newPages)
  }, [totalPages])

  return (
    <>
      <h2>Productos</h2>
      <div className="products">
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="nameFilter"
          />
          <div className="price-filters">
            <div>
              <label htmlFor="priceMinRange">
                  Precio mínimo: {minPrice} €
              </label>
              <input
                type="range"
                id="priceMinRange"
                min={0}
                max={2000}
                step={50}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />  
            </div>
            <div>
              <label htmlFor="priceMaxRange">
                Precio máximo: {maxPrice} €
              </label>
              <input
                type="range"
                id="priceMaxRange"
                min={0}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr className="keys">
              <th>NOMBRE</th>
              <th>CATEGORÍA</th>
              <th>DESCRIPCIÓN</th>
              <th>PRECIO</th>
            </tr>
          </thead>
        </table>
        <div className="table-body-scroll">
          <table>
            <tbody>
              {
                products && products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.categoria}</td>
                    <td>{product.descripcion}</td>
                    <td>{product.precio} €</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination currentPage={numberPage} numbersPages={numbersPages} onChangePage={onChangePage} numberPerPage={numberPerPage} onChangePerPage={onChangePerPage} />
      </div>
    </>
  )
}

export default Products