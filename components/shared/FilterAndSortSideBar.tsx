'use client';

import { useState } from "react";

const filterColors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
const filterSizes = ["S", "M", "L", "XL"];
const sortOptions = ["High to Low", "Low to High"];

function FilterSortSidebar() {

  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


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
                <input type="radio" name="sort" className="mr-2" />
                Price: {option}
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
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {color}
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
                  <input type="checkbox" className="mr-2" />
                  {size}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <button className="border p-3 mr-2">(x) Clear All</button>
          <button className="border p-3">Apply</button>
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
                      <input type="radio" name="sort" className="mr-2" />
                      Price: {option}
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
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        {color}
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
                        <input type="checkbox" className="mr-2" />
                        {size}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterSortSidebar;
