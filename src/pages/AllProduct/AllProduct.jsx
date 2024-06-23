import React, { useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router-dom";

import ProductCard from "../../Components/ProductCard";
import { useGetProductsQuery } from "../../redux/api/baseApi";

const AllProduct = () => {


    const { pathname } = useLocation();
	const {data: products} = useGetProductsQuery()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);





	const categoryItems = [
		{
			title: "Laptop",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/laptop-48x48.png",
		},
		{
			title: "Laptop Accessories",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/brand-logo/laptop-acc-icon-48x48.png",
		},
		{
			title: "Mobile Phone",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/mobile-phone-48x48.png",
		},
		{
			title: "Mobile Accessories",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/mobile-phone-accessories-48x48.png",
		},
		{
			title: "Drone",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/drone-48x48.png",
		},
		{
			title: "Smart Watch",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/smart-watch-48x48.png",
		},
		{
			title: "Earbuds",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/earbuds-48x48.png",
		},
		{
			title: "Bluetooth Speaker",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/bt-speaker-48x48.png",
		},
		{
			title: "HeadPhone",
			imageurl:
				"https://www.startech.com.bd/image/cache/catalog/category-thumb/headphone-48x48.png",
		},
	];

	return (
		<div id="start_of_all_product_page" className="flex max-w-screen-xl  mx-auto ">
			{/* Category section */}
			<div className="lg:pt-5  hidden border-r lg:block w-1/4 h-auto bg-transparent  lg:p-0  ">
				<h1 className="text-2xl mt-10 md:mt-0    font-medium">
					Filter From
				</h1>

				<form
					// onSubmit={handleSubmitPrice}
					className="lg:flex mt-5 pr-4 items-center gap-4"
				>
					<div className="flex gap-2  items-center">
						<input
							// onChange={(e) => setLowestPrice(e.target.value)}
							type="number"
							className="input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]  "
							name="lowest_price"
							placeholder="$ Min"
							min={0}
						/>

						<span className="font-bold">-</span>
						<input
							type="number"
							className="input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5] "
							name="highest_price"
							placeholder="$ Max"
							// min={lowestPrice}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-error bg-primary   rounded-sm text-white "
					>
						{" "}
						<MdOutlineArrowForwardIos />
					</button>
				</form>
				<h1 className="text-2xl mt-8  font-medium">Filter Check</h1>

				<div className="text-base mt-5 font-normal text-black ">
					{categoryItems?.map((item, index) => (
						<label
							key={index}
							htmlFor={item}
							className="py-2  flex justify-between items-center"
						>
							<label className="flex gap-2">
								<input
									type="checkbox"
									id={item}
									className="checkbox rounded-none checkbox-sm checkbox "
									defaultChecked
									// onChange={handleCheckboxChange}
								/>
								<h2 className=" "> {item?.title}</h2>
							</label>
						</label>
					))}
				</div>
			</div>

			{/* product viewing section */}
			<div className="p-10 pt-5 pr-0 w-full lg:w-3/4 ">
				<div className="flex mb-5 items-center justify-between gap-5 ">
					<p className="flex-1">
						5 item found for "
						<span className="text-primary">monitor</span>"
					</p>
					<div className="flex  items-center flex-1 gap-2 ">
                        <h1>Items per Page : </h1>
						<select className="select  select-bordered w-full max-w-[150px]">
							<option defaultChecked selected>
								15
							</option>
							<option>30</option>
							<option>50</option>
						</select>
					</div>
					<div className="flex justify-end items-center flex-1 gap-2 ">
                        <h1>Sort By : </h1>
						<select className="select select-bordered w-full max-w-[150px]">
							<option defaultChecked selected>
								Default
							</option>
							<option>price min to max</option>
							<option>Price max to min</option>
						</select>
					</div>
				</div>
				{
					<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
						{products?.map((item) => (
							<ProductCard item ={item}></ProductCard>
						))}
					</div>
				}
			</div>
		</div>
	);
};

export default AllProduct;
