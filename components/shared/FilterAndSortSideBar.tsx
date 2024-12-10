'use client';

import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";


const filterColors = ["Blue", "Green", "Black", "White", "Yellow", "Grey", "Purple", "Red", "Brown"];
const filterSizes = ["S", "M", "L", "XL"];
const sortOptions = [{ label: "High to Low", value: "desc" }, { label: "Low to High", value: "asc" }];


function FilterSortSidebar({ baseRoute, onFilterChange }: FilterSortSidebarProps) {

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  //Handle price sorting function
  async function handleSorting(option: string) {
    try {
      const res = await axiosInstance.get(`${baseRoute}?sortPrice=${option}`);
      onFilterChange(res.data.products, res.data.totalPages);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  }


  //Handle Size Filtering function
  async function handleFilterBySize(size: string) {
    try {
      const res = await axiosInstance.get(`${baseRoute}?size=${size}`);
      onFilterChange(res.data.products, res.data.totalPages);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  }


  //Handle Color Filtering function
  async function handleFilterByColor(color: string) {
    try {
      const res = await axiosInstance.get(`${baseRoute}?color=${color}`);
      onFilterChange(res.data.products, res.data.totalPages);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  }

  //Clear filtering 
  async function fetchProducts() {
    try {
      const res = await axiosInstance.get(`${baseRoute}`);
      onFilterChange(res.data.products, res.data.totalPages);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
    }
  }

  return (
    <>
      {/* FOR LARGE DEVICES */}
      <div className="hidden md:block cursor-pointer w-64 h-screen max-h-[calc(100vh-64px)] p-4 pl-7 tracking-wider rounded-lg sticky top-9 filter-body text-sm overflow-y-auto mt-9">
        <h1 className="text-xl font-semibold mb-10">Filter and sort</h1>
        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Sort By</h4>
          <div className="space-y-2">
            {sortOptions.map((option, index) => (
              <label key={index} className="block">
                <input type="radio" name="sort" className="mr-2" onClick={() => handleSorting(option.value)} />
                Price: {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Color */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Color</h4>
          <ul className="space-y-1">
            {filterColors.map((color, index) => (
              <li key={index}>
                <label className="flex items-center cursor-pointer ">
                  <input
                    name="color"
                    type="checkbox"
                    className="hidden peer" // Hide the default checkbox
                    onClick={() => handleFilterByColor(color)}
                  />
                  {/* Circle to represent color */}
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300 peer-checked:ring-2 peer-checked:ring-offset-1 peer-checked:ring-gray-300 mr-2"
                    style={{ backgroundColor: color }}
                  ></span>
                  {/* Color name */}
                  <span>{color}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter by Size */}
        <div>
          <h4 className="font-semibold mb-2">Size</h4>
          <ul className="space-y-1">
            {filterSizes.map((size, index) => (
              <li key={index}>
                <label className="flex items-center">
                  <input name="size" type="checkbox" className="mr-2" onClick={() => handleFilterBySize(size)} />
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <button onClick={() => fetchProducts()} className="border p-3 mr-2 hover:bg-slate-800 hover:text-white">(x) Clear All</button>
          <button className="border p-3 hover:bg-slate-800 hover:text-white">Apply</button>
        </div>
      </div>




      {/* FOR SMALLER DEVICES */}
      <div className="md:hidden">
        {/* Filter Button */}
        <button
          onClick={toggleModal}
          className="z-40 fixed bottom-7 text-sm font-medium rounded tracking-wider left-6 bg-black  text-white px-4 py-2  shadow-lg"
          id="filter-sortBtn"
        >
          Filter & Sort
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-md p-6 rounded-lg relative">
              {/* Close Button */}
              <button
                onClick={toggleModal}
                className="absolute top-2 right-2  p-2 rounded-full"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              {/* Sort By */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Sort By</h4>
                <div className="space-y-2">
                  {sortOptions.map((option, index) => (
                    <label key={index} className="block">
                      <input type="radio" name="sort" className=" mr-2" onClick={() => handleSorting(option.value)} />
                      Price: {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter by Color */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Color</h4>
                <ul className="space-y-1">
                  {filterColors.map((color, index) => (
                    <li key={index}>
                      <label className="flex items-center cursor-pointer ">
                        <input
                          name="color"
                          type="checkbox"
                          className="hidden peer" // Hide the default checkbox
                          onClick={() => handleFilterByColor(color)}
                        />
                        {/* Circle to represent color */}
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 peer-checked:ring-2 peer-checked:ring-offset-1 peer-checked:ring-gray-300 mr-2"
                          style={{ backgroundColor: color }}
                        ></span>
                        {/* Color name */}
                        <span>{color}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Filter by Size */}
              <div>
                <h4 className="font-semibold mb-2">Size</h4>
                <ul className="space-y-1">
                  {filterSizes.map((size, index) => (
                    <li key={index}>
                      <label className="flex items-center">
                        <input name="size" type="checkbox" className="mr-2" onClick={() => handleFilterBySize(size)} />
                        {size}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-14">
                <button onClick={() => fetchProducts()} className="border p-3 mr-2 hover:bg-slate-800 hover:text-white">(x) Clear All</button>
                <button className="border p-3 hover:bg-slate-800 hover:text-white">Apply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterSortSidebar;
