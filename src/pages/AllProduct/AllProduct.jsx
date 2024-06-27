import React, { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router-dom";

import ProductCard from "../../Components/ProductCard";
import {
	useGetCategoryListQuery,
	useGetProductsQuery,
} from "../../redux/api/baseApi";
import { useForm } from "react-hook-form";
import Categories from "../Home/Categories";
import { useDispatch, useSelector } from "react-redux";
import sortBy from "sort-by";
import Pagination from "../../Components/Pagination";
import { setCategories, setLimit, setPage } from "../../redux/features/filter/filterSlice";

const AllProduct = () => {
	// Filter Hook is used to set to give params to filter products
	const [filter, setFilter] = useState({});


	const dispatch = useDispatch();
	const { handleSubmit, register } = useForm();

	const { data: categoryItems } = useGetCategoryListQuery();
	const { data: products } = useGetProductsQuery(filter);
	const { searchText, page, limit , categories } = useSelector(
		(state) => state.filterSearch
	);
	
	const [selectedCategories, setSelectedCategories] = useState([]);



	console.log(categories , "theese are selectecdc ate");

	const [text, setText] = useState(`Showing ${products?.length} item `);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	useEffect(() => {
		if(typeof categories === 'string'){
			setSelectedCategories(categories?.split(","))
		}
	}, [categories]);


	useEffect(() => {
		setFilter({ ...filter, searchText, limit, page , categories});

		if (searchText !== "") {
			setText(`Showing ${products?.length} item for ${searchText}`);
		} else {
			setText(`Showing ${products?.length} item`);
		}

		if (products?.length === 0) {
			dispatch(setPage({ page: 0 }));
		}

	}, [searchText, products, limit, page]);



	useEffect(() => {
		const categoryTitle = categoryItems?.map((item) => item?.title);
		const categoryString = categoryTitle?.join(",");

		
		dispatch(
			setCategories({
				categories: categoryString,
			})
		);
	}, [categoryItems]);

	const handleFilterPrice = (data) => {
		console.log("Price Filter Data:", data);
		setFilter({
			...filter,
			maxPrice: data?.maxPrice,
			minPrice: data?.minPrice,
		});
	};

	const handleFilterCategory = (event) => {
		const { id, checked } = event.target;
		let updatedCategories;

		if (checked) {
			updatedCategories = [...selectedCategories, id];
		} else {
			updatedCategories = selectedCategories.filter(
				(category) => category !== id
			);


		
		}

		setSelectedCategories(updatedCategories);
		const categories = updatedCategories.join(",");
		setFilter({git 
			...filter,
			category: categories,
		});
		console.log("Updated Filter:", filter);
	};

	const handleShowItemPerPage = (e) => {
		const limit = parseInt(e.target.value);

		dispatch(setLimit({ limit }));

		console.log("Items per page:", limit);
	};

	const handleSortBy = (e) => {
		const sortOrder = e.target.value;
		setFilter({
			...filter,
			sortOrder: sortOrder,
			sortBy: "price",
		});
	};

	return (
		<div id="start_of_all_product_page" className="flex max-w-screen-xl mx-auto">
			{/* Category section */}
			<div className="lg:pt-5 hidden border-r lg:block w-1/4 h-auto bg-transparent lg:p-0">
				<h1 className="text-2xl mt-10 md:mt-0 font-medium">Filter From</h1>

				<form onSubmit={handleSubmit(handleFilterPrice)} className="lg:flex mt-5 pr-4 items-center gap-4">
					<div className="flex gap-2 items-center">
						<input
							type="number"
							className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
							name="lowest_price"
							placeholder="$ Min"
							min={0}
							{...register("minPrice", { required: true })}
						/>
						<span className="font-bold">-</span>
						<input
							type="number"
							className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
							name="highest_price"
							placeholder="$ Max"
							{...register("maxPrice", { required: true })}
						/>
					</div>
					<button type="submit" className="btn btn-error bg-primary rounded-sm text-white">
						<MdOutlineArrowForwardIos />
					</button>
				</form>

				<h1 className="text-2xl mt-8 font-medium">Filter Check</h1>

				<div className="text-base mt-5 font-normal text-black">
					{categoryItems?.map((item, index) => (
						<label key={index} htmlFor={item.title} className="py-2 flex justify-between items-center">
							<label className="flex gap-2">
								<input
									type="checkbox"
									id={item.title}
									className="checkbox rounded-none checkbox-sm checkbox"
									checked={selectedCategories?.includes(item?.title)}
									onChange={handleFilterCategory}
								/>
								<h2 className="">{item.title}</h2>
							</label>
						</label>
					))}
				</div>
			</div>

			{/* Product viewing section */}
			<div className="p-10 pb-2 pt-5 pr-0 w-full lg:w-3/4">
				<div className="flex mb-5 items-center justify-between gap-5">
					<p className="flex-1">{text}</p>
					<div className="flex items-center flex-1 gap-2">
						<h1>Items per Page:</h1>
						<select onChange={handleShowItemPerPage} className="select select-bordered w-full max-w-[150px]">
							<option value={15}>15</option>
							<option selected value={30}>
								30
							</option>
							<option value={50}>50</option>
						</select>
					</div>
					<div className="flex justify-end items-center flex-1 gap-2">
						<h1>Sort By:</h1>
						<select onChange={handleSortBy} className="select select-bordered w-full max-w-[150px]">
							<option value="" selected>
								Default
							</option>
							<option value="asc">price min to max</option>
							<option value="desc">Price max to min</option>
						</select>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
					{products?.map((item) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>
				<div className="flex justify-center mt-20">
					<Pagination />
				</div>
			</div>
		</div>
	);
};

export default AllProduct;
