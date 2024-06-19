import React from "react";
import image from "../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";

const ProductDetail = () => {
	const myStyles = {
		itemShapes: RoundedStar,
		activeFillColor: "#ffb700",
		inactiveFillColor: "#fbf1a9",
	};
	return (
		<div className="mx-28 flex gap-12  my-10">
			<div className=" ">
				<img src={image} className="w-[500px] bg-[#F5F5F5]" alt="" />
			</div>

			<div className="w-1/2 space-y-5">
				<h1 className="text-xl text-primary font-medium">
					Lenovo Tab M10 (3rd Gen) 4GB RAM 64GB Storage 10.1-Inch FHD
					Tablet LTE (Sim Supported) with Folio Case
				</h1>
				<div className="flex gap-4 items-center mt-4">
					<Rating
						className=""
						style={{ maxWidth: 120 }}
						itemStyles={myStyles}
						value={4}
						readOnly
					/>{" "}
					<span className="text-green-400 pl-2 border-l-2">
						{" "}
						In stock
					</span>
				</div>

				<h1 className="text-3xl font-medium  ">$748</h1>

				<p>
					Key Features <br />
					MPN: TB328XU <br />
					Model: Tab M10 Gen 3 <br />
					Display: 10.1" FHD IPS (1920 x 1200) <br />
					CPU: UNISOC Tiger T610 (12nm)
					<br />
					RAM: 4GB LPDDR4x,
					<br /> Storage: 64GB (eMCP)
					<br /> Battery: 5100 mAh, Li-ion Polymer
				</p>
				<div className="flex gap-4">
				
						<button className="bg-[#F5F5F5] p-2 px-3 flex items-center b  text-black rounded-none ">
							<GoHeart className=" text-2xl" />
						</button>

					<div>
						<button className="flex hover:text-black rounded-none w-full text-white  bg-black btn ">
							
							<h1>Add to Cart </h1>
						</button>
					</div>

					<div>
						<button className="btn btn-error bg-primary rounded-none w-full text-white   btn ">
							<h1>Buy Now</h1>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
