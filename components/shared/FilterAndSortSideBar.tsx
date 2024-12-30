'use client';

import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { filterColors, filterSizes, sortOptions } from "@/constants/filterSidebar";


function FilterSortSidebar({ baseRoute, onFilterChange }: FilterSortSidebarProps) {
  // STATES FOR SELECTED FILTERS
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  // STATE TO CONTROL MODAL VISIBILITY
  const [isModalOpen, setIsModalOpen] = useState(false);


  // FUNCTION TO TOGGLE COLOR
  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // FUNCTION TO TOGGLE SIZE
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };


  // FUNCTION TO TOGGLE MODAL VISIBILTY
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  // FUNCTION TO FETCH PRODUCTS BASED ON CURRENT FILTERS
  const fetchFilteredProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (selectedColors.length > 0) {
        params.append("color", selectedColors.join(","));
      }
      if (selectedSizes.length > 0) {
        params.append("size", selectedSizes.join(","));
      }
      if (sortOption) {
        params.append("sortPrice", sortOption);
      }

      const res = await axiosInstance.get(`${baseRoute}?${params.toString()}`);
      onFilterChange(res.data.products, res.data.totalPages);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };


  // FUNCTION TO CLEAR ALL FILTERS
  const clearFilters = async () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortOption("");
    const res = await axiosInstance.get(`${baseRoute}`);
    onFilterChange(res.data.products, res.data.totalPages);
  };



  return (
    <>
      {/* FOR LARGE DEVICES */}
      <div className="hidden md:block cursor-pointer  w-64 h-screen max-h-[calc(100vh-64px)] p-4 pl-7 tracking-wider rounded-lg sticky top-9 filter-body text-sm overflow-y-auto mt-9">
        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Sort By</h4>
          <div className="space-y-2">
            {sortOptions.map((option, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name="sort"
                  className="mr-2"
                  checked={sortOption === option.value}
                  onChange={() => setSortOption(option.value)}
                />
                Price: {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Color */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Colors</h4>
          <ul className="space-y-1">
            {filterColors.map((color, index) => (
              <li key={index}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden peer"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-gray-100 peer-checked:ring-2 peer-checked:ring-offset-1 peer-checked:ring-gray-300 mr-2"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span>{color}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter by Size */}
        <div>
          <h4 className="font-medium mb-2">Size</h4>
          <ul className="space-y-1">
            {filterSizes.map((size, index) => (
              <li key={index}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <button onClick={clearFilters} className="border p-3 mr-2 hover:bg-slate-800 hover:text-white">
            (x) Clear All
          </button>
          <button onClick={fetchFilteredProducts} className="border p-3 hover:bg-slate-800 hover:text-white">
            Apply
          </button>
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
                      <input
                        type="radio"
                        name="sort"
                        className="mr-2"
                        checked={sortOption === option.value}
                        onChange={() => setSortOption(option.value)}
                      />
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
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColor(color)}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-gray-100 peer-checked:ring-2 peer-checked:ring-offset-1 peer-checked:ring-gray-300 mr-2"
                          style={{ backgroundColor: color }}
                        ></span>
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
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedSizes.includes(size)}
                          onChange={() => toggleSize(size)}
                        />
                        {size}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-14">
                <button onClick={clearFilters} className="border p-3 mr-2 hover:bg-slate-800 hover:text-white">
                  (x) Clear All
                </button>
                <button onClick={fetchFilteredProducts} className="border p-3 hover:bg-slate-800 hover:text-white">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterSortSidebar;
