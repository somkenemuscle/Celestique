function FilterSortSidebar() {
    return (
      <div className="w-64 h-full p-4 bg-white border-r rounded-lg fixed filter-body text-sm">
  
        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Sort By</h4>
          <div className="space-y-2">
            <label className="block">
              <input type="radio" name="sort" className="mr-2" />
              Price: High to Low
            </label>
            <label className="block">
              <input type="radio" name="sort" className="mr-2" />
              Price: Low to High
            </label>
          </div>
        </div>
  
        {/* Filter by Color */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Filter by Color</h4>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Red
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Blue
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Green
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Black
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                White
              </label>
            </li>
          </ul>
        </div>
  
        {/* Filter by Size */}
        <div>
          <h4 className="font-semibold mb-2">Filter by Size</h4>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                S
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                M
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                L
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                XL
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                XXL
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default FilterSortSidebar;
  