import React from "react";
import image from "../../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { TiDelete } from "react-icons/ti";

const MyOrder = () => {
	return (
		<div className=" mt-10">
			<div className="mb-12 border-2  p-10">
				<div className="flex items-center justify-between">
					<div>
						<h1>
							{" "}
							Order ID :{" "}
							<span className="text-primary">
								497616549749846
							</span>
						</h1>
						<p> Placed on 31 aug 2024</p>
					</div>
					<div>
						<h1> Total : 650$</h1>{" "}
                        <p className="bg-base-200 p-1 text-center mt-1 rounded-full">Pending</p>
					</div>
				</div>
						<div className="mt-4 border-[1px] " />

				<div className="grid grid-cols-8  font-medium  mt-16">
					<div className="flex relative items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-3">x 2</h1>

					<h1 className="">$650</h1>
				</div>
			</div>
			<div className="mb-16 border-2  p-10">
				<div>
					<h1>
						{" "}
						Order ID :{" "}
						<span className="text-primary">497616549749846</span>
					</h1>
					<p> Placed on 31 aug 2024</p>
					<hr />
				</div>

				<div className="grid grid-cols-8  font-medium  mt-16">
					<div className="flex relative items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-3">x 2</h1>

					<h1 className="">$650</h1>
				</div>
				<div className="grid grid-cols-8  font-medium  mt-16">
					<div className="flex relative items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-3">x 2</h1>

					<h1 className="">$650</h1>
				</div>
				<div className="grid grid-cols-8  font-medium  mt-16">
					<div className="flex relative items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-3">x 2</h1>

					<h1 className="">$650</h1>
				</div>
			</div>
		</div>
	);
};

export default MyOrder;
