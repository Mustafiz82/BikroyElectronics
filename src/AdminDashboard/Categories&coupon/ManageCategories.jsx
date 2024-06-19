import React from "react";
import { PiPlusBold } from "react-icons/pi";

const ManageCategories = () => {
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
		<div className="m-10">
			<div className="flex flex-wrap gap-5">
				{categoryItems?.map((item) => (
					<div
						// key={inx}
						className={`  duration-300 rounded-lg z-50`}
					>
						<div className="flex justify-center items-center p-2 border-2 min-w-44 text-center min-h-44  space-y-2">
							<div>
								<div className="flex  mb-4 justify-center items-center">
									{" "}
									<img src={item?.imageurl} alt="" />
								</div>{" "}
								<h1>{item?.title}</h1>
							</div>
						</div>
					</div>
				))}
				<div
					// key={inx}
					className={`  duration-300 rounded-lg z-50`}
				>
					<label htmlFor="my_modal_7" className="">
						<div className="flex justify-center items-center p-2 border-2 min-w-44 text-center min-h-44  space-y-2">
							<div>
								<div className="flex  mb-4 justify-center items-center">
									<PiPlusBold className="text-5xl text-primary" />
								</div>{" "}
								<h1>New Category</h1>
							</div>
						</div>
					</label>
				</div>
			</div>

			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<input type="checkbox" id="my_modal_7" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box">
					<input
						type="text"
						placeholder="Category Name"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>
					<input
						type="file"
						className="file-input my-5 file-input-bordered focus:border-none focus:outline-none w-full"
					/>
                    <button className="btn  w-full rounded-sm">Add New Category</button>
				</div>
				<label className="modal-backdrop" htmlFor="my_modal_7">
					Close
				</label>
			</div>
		</div>
	);
};

export default ManageCategories;
