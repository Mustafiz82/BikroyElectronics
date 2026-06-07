import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { setPage } from "../../redux/features/filter/filterSlice"; 
import Pagination from "../../Components/Pagination";

const ProductList = () => {
  const dispatch = useDispatch();

  const { page, limit } = useSelector((state) => state.filterSearch);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // 3. Debounce search text and reset Redux page state to 0 on new search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
      dispatch(setPage({ page: 0 }));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText, dispatch]);

  // 4. Memoize the filter parameters to prevent unnecessary component re-renders
  const filter = useMemo(() => {
    return {
      searchText: debouncedSearch,
      sortBy,
      sortOrder,
    };
  }, [debouncedSearch, sortBy, sortOrder]);

  // 5. Query products passing parameters from both Redux and local states
  const { data: products, isLoading } = useGetProductsQuery(
    {
      limit,
      page,
      ...filter,
    },
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  // Handle sort changes
  const handleSortChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setSortBy("");
      setSortOrder("asc");
    } else {
      const [field, order] = value.split("-");
      setSortBy(field);
      setSortOrder(order);
    }
    dispatch(setPage({ page: 0 })); // Reset page state in Redux
  };

  const elements = Array.from({ length: 7 });

  return (
    <div className="px-4">
      {/* Search and Sort controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-6">
        <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
          Product List
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered focus:outline-none rounded-sm w-full md:w-64 bg-[#F5F5F5]"
          />

          {/* Sort Dropdown */}
          <select
            onChange={handleSortChange}
            className="select select-bordered focus:outline-none rounded-sm w-full md:w-48"
            defaultValue=""
          >
            <option value="">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>
      </div>

      <div>
        {/* Table Headers */}
        <div className="grid grid-cols-8 md:grid-cols-9 font-medium border-b pb-2 mb-4">
          <h1 className="col-span-6 md:col-span-4">Product</h1>
          <h1 className="col-span-2 hidden md:block">Price</h1>
          <h1 className="col-span-2 hidden md:block">Quantity</h1>
          <h1 className="col-span-1">Edit</h1>
        </div>

        {/* Loading Skeletons */}
        {isLoading
          ? elements?.map((_, index) => (
              <div key={index} className="grid my-10 grid-cols-9 font-medium">
                <div className="flex relative items-center col-span-4 gap-2">
                  <div className="skeleton w-10 h-10"></div>
                  <h1 className="skeleton w-52 h-6 rounded-sm col-span-2"></h1>
                </div>
                <h1 className="col-span-2 skeleton w-20 h-6 rounded-sm"></h1>
                <div className="col-span-2">
                  <h1 className="skeleton w-5 h-5"></h1>
                </div>
                <div className="skeleton w-16 h-10 rounded-md"></div>
              </div>
            ))
          : ""}

        {/* Empty State */}
        {!isLoading && products?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No products found matching your search.
          </div>
        )}

        {/* Render Product List */}
        {!isLoading &&
          products?.map((item) => (
            <div
              key={item?._id}
              className="grid grid-cols-8 md:grid-cols-9 gap-4 font-medium my-10 items-center"
            >
              <div className="flex relative items-center md:col-span-4 col-span-6 gap-2">
                <div className="min-w-12">
                  <img
                    src={item?.imageUrl?.[0] || "https://placehold.co/40"}
                    className="w-10 p-0 rounded-sm"
                    alt={item?.title || "Product Image"}
                  />
                </div>
                <h1 className="max-w-72 col-span-2">{item?.title}</h1>
              </div>
              <h1 className="col-span-2 hidden md:block">BDT {item?.price}</h1>
              <div className="col-span-2 hidden md:block">
                <h1>5</h1>
              </div>
              <Link to={`/admin/editproducts/${item?._id}`}>
                <button className="btn btn-outline text-primary rounded-sm">
                  Edit
                </button>
              </Link>
            </div>
          ))}
      </div>

      {/* 6. Dynamic Redux Pagination */}
      {!isLoading && products?.length > 0 && (
        <div className="mt-8 w-fit mx-auto">
          <Pagination filter={filter} />
        </div>
      )}
    </div>
  );
};

export default ProductList;