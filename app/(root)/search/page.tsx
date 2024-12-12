'use client'
import { useEffect, useState } from "react"
import { getSearchedItems } from "@/services/search"
import { FaGreaterThan, FaLessThan } from "react-icons/fa"
import Pagination from "@/components/ui/Pagination"
import ProductCard from "@/components/ui/ProductCard"
// import FilterSortSidebar from "@/components/shared/FilterAndSortSideBar"

export default function SearchPage() {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [Products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   getSearchedItems(searchedTerm,currentPage)
  // }, [currentPage]);


  function Handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedTerm(e.target.value)
  }



  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true before the API call
    setError(null); // Reset error state

    try {
      const res = await getSearchedItems(searchedTerm, currentPage); // Use state values
      console.log(res.products)
      setProducts(res.products); // Update the product list
      setTotalPages(res.totalPages); // Update total pages if provided by the API
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false); // Set loading state to false after completion
    }
  }


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {Products && Products.length > 0 ? (
        <div className="flex" >
          {/* Sidebar */}
          {/* < div >
            <FilterSortSidebar />
          </div> */}

          {/* Products and Pagination */}
          <div className="flex-1" >
            <div className="pt-11 justify-self-center  w-full lg:px-11 sm:px-4 px-4">
              <form onSubmit={HandleSubmit} >
                <input onChange={Handlechange} value={searchedTerm} type="text" id="search-input" placeholder="Search" className="w-full py-3 px-6 ring-0 border border-solid border-black rounded-3xl" />
              </form>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 p-4 sm:p-4 lg:p-11 gap-3">
              {Products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ul>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div >
        </div >
      ) : (
        <div id="order-details-container" className="mt-40 justify-self-center ">
          <form onSubmit={HandleSubmit} className="flex-col">
            <input onChange={Handlechange} value={searchedTerm} type="text" id="search-input" placeholder="Search" className="w-full py-3 px-6 ring-0 border border-solid border-black rounded-3xl" />
          </form>
        </div>)}
    </>
  )
}
