'use client'
import { useState } from "react"
import { getSearchedItems } from "@/services/search"
import { FaGreaterThan, FaLessThan } from "react-icons/fa"

function SearchPage() {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [pageNo, setpageNo] = useState('')
  const [Products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function Handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedTerm(e.target.value)
  }

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()
      console.log(searchedTerm)
      const res = await getSearchedItems(searchedTerm, pageNo);
      // setProducts(res.orders)
      console.log(res)
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }



  return (
    <div id="order-details-container" className="mt-60 justify-self-center ">
      <form onSubmit={HandleSubmit} className="flex-col items-center">
        <input onChange={Handlechange} value={searchedTerm} type="text" id="search-input" placeholder="Search" className="w-full p-2 ring-0 border rounded border-solid border-black" />
      </form>
     
    </div>

  )
}

export default SearchPage