import Card from "../components/Card"
import { useCategories, useProducts } from "../hooks/product.hook"
import { useState } from "react"


const Products = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("")

  const productsQuery = useProducts();
  const categoryQuery = useCategories();

  return (
    <div className="p-4 flex flex-col justify-center">
      <input
        value={searchTerm}
        placeholder="Search"
        type="text"
        className="px-3 py-2 rounded-3xl border"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex mt-2 mx-1">
        <label >
          Filter:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-2 ml-1 rounded-lg bg-white/80 p-1 max-h-100"
          >
            <option value="" >All</option>
            {categoryQuery?.data?.map((category) => {
              return <option key={category} value={category}>{category}</option>
            })}
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 p-5">
        
        {productsQuery.isLoading ? (
          <div className="flex justify-center py-10">
            Loading...
          </div> 
          ) : productsQuery.isError ? (
            <div className="flex justify-center py-10">
              {productsQuery.error.message}
            </div>
          ) : !productsQuery.data?.length ? (
            productsQuery?.data?.products?.map((product: any) => (
            <Card key={product.id} {...product}/>
          ))
          ) : (
            <div>
              No Data
            </div>
          )}
      </div>
    </div>    
  )
}

export default Products