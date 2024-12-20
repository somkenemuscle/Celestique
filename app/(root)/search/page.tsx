'use client'
import { useEffect, useState, useCallback } from "react"
import { getSearchedItems } from "@/services/search"
import Pagination from "@/components/ui/Pagination"
import ProductCard from "@/components/ui/ProductCard"
import FilterSortSidebar from "@/components/shared/FilterAndSortSideBar"
import { SearchIcon } from "lucide-react"
import debounce from "lodash.debounce";

export default function SearchPage() {
  const [searchedTerm, setSearchedTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([]); // Tracks suggestions
  const [showsuggestions, setshowSuggestions] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [Products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const HandleChange = useCallback(
    debounce(async (value: string) => {
      if (value === "") {
        setshowSuggestions(false);
        setSuggestions([])
        setError('')
        return;
      }

      try {
        setLoading(true);
        const res = await getSearchedItems(value, currentPage);
        setSuggestions(res.products);
        setshowSuggestions(true);
      } catch (err: any) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }, 200), // Adjust the debounce delay as needed
    []
  );

  function Handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setSearchedTerm(value);
    HandleChange(value);
  }

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement> | string) {
    setshowSuggestions(false);

    let value = searchedTerm; // Default to the current state
    if (typeof e === "string") {
      value = e; // Use the clicked suggestion
      setSearchedTerm(value); // Update the state for future use
    } else {
      e.preventDefault(); // Prevent default form submission behavior
    }

    try {
      const res = await getSearchedItems(value, currentPage); // Use state values
      setProducts(res.products)
      setTotalPages(res.totalPages)// Update total pages if provided by the API
    } catch (err: any) {
      setshowSuggestions(false)
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
      <div onClick={() => setshowSuggestions(false)} className={`${Products.length>0 ? 'mt-5' : 'my-20'}`} >
        <div onClick={() => setshowSuggestions(false)} className="justify-self-center w-10/12   md:w-8/12 ">
          <h1 className="font-medium md:text-xl text-center pb-10 tracking-wide text-lg">Search Our Store</h1>
          <form onSubmit={HandleSubmit} className="relative flex-col">
            <input
              onChange={Handlechange}
              value={searchedTerm}
              type="text"
              placeholder="Search"
              className="w-full py-3 px-6 border border-black outline-none border-lg"
            />
            <button className="absolute top-6 transform -translate-y-1/2 right-3 text-gray-600" type="submit">
              <SearchIcon className="h-5 w-5" />
            </button>

            {showsuggestions && (
              <div className="border text-sm w-full shadow-sm rounded z-50 absolute  bg-white">
                <ul>
                  <li className="py-3 px-6 font-medium">Suggestions</li>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="py-3 px-6 hover:bg-gray-100 cursor-pointer"
                      onClick={() => { HandleSubmit(suggestion.name) }}
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
                <div className="bg-black text-white py-3 font-medium text-center tracking-wide cursor-pointer hover:bg-zinc-900" onClick={() => { HandleSubmit(searchedTerm) }}> Search for "{searchedTerm}"</div>
              </div>
            )}


            {error && (
              <h1 className="font-medium md:text-xl text-center pt-14 tracking-wide text-lg">Product Not Found</h1>
            )}

          </form>
        </div>
      </div>

      <div className="flex">
        <div>
          {Products.length > 0 && (
            <FilterSortSidebar
              baseRoute=""
              onFilterChange={() => { }}
            />
          )}
        </div>

        {Products.length > 0 && (
          <div className="flex-1">
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 lg:p-11 gap-3">
              {Products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>

  )
}
