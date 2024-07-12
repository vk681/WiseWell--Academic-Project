export default function Filter({ category, min, max, onFilterChange }) {
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    onFilterChange(newCategory, min, max); // Updated to use newCategory
  };

  const handleMinChange = (event) => {
    const newMin = event.target.value;
    onFilterChange(category, newMin, max);
  };

  const handleMaxChange = (event) => {
    const newMax = event.target.value;
    onFilterChange(category, min, newMax);
  };

  return (
    <div className="">
      <div className="w-full px-4">
        <h1 className="font-light text-lg flex ">
          Search result for &nbsp;
          <b>{category ? <h2>{category}</h2> : <h2>Events</h2>}</b>{" "}
          {/* Updated to use category */}
        </h1>
        <div className="">
          <div className="item">
            <label htmlFor="city" className="text-xs">
              Location
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City Location"
              className="border border-gray-300 p-2 rounded-md w-full text-xs"
            />
          </div>
        </div>
        <div className=" flex align-center w-full justify-between items-center">
          <div className="w-2/6 flex bg--300 flex-col gap-1 ">
            <label htmlFor="type" className="text-xs">
              Type
            </label>
            <select
              name="type"
              id="type"
              className="border border-gray-300 p-2 rounded-md text-xs w-full"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled selected>
                {category ? category : "Select Category"}
              </option>
              <option value="Physical_Events:">Physical Events:</option>
              <option value="Social_Events:">Social Events:</option>
              <option value="Mental-Health_Events:">
                Mental health events
              </option>
              <option value="Entertaining_Events:">Entertaining events:</option>
              <option value="Relaxation_Events:">Relaxation Events:</option>
            </select>
          </div>

          <div className="ml-2 w-3/11 flex flex-col">
            <label htmlFor="minPrice" className="text-xs">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="any"
              className="border border-gray-300 p-2 rounded-md text-xs w-full"
              value={min}
              onChange={handleMinChange}
            />
          </div>
          <div className="ml-2 flex flex-col w-3/11">
            <label htmlFor="maxPrice" className="text-xs">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="any"
              className="border border-gray-300 p-2 rounded-md text-xs w-full"
              value={max}
              onChange={handleMaxChange}
            />
          </div>

          <button className="w-20 h-10   border-none rounded-md cursor-pointer bg-yellow-300 flex items-center justify-center ml-2 mt-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
