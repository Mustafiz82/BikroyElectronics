import React, { useState } from "react";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductCard from "../../Components/ProductCard";
import { Link } from "react-router-dom";

const ExploreProduct = ({ products }) => {
	const [currentSlider, setCurrentSlider] = useState(0);
	const slicedProducts = products?.slice(0,16)

	console.log(slicedProducts);

	const prevSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === 0 ? slicedProducts.length - 12 : currentSlider - 1
		);
	const nextSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === slicedProducts.length - 12 ? 0 : currentSlider + 1
		);
	const isSmallScreen = window.innerWidth <= 768;
	return (
		<div className="my-20">
			<div className="flex ">
				<span className="p-2 rounded-sm bg-primary"></span>
				<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
					Our Prouduct
				</h1>
			</div>
			<h1 className="text-4xl mt-10 font-medium font-inter">
				Explore Our's Product
			</h1>

			<div>
				<div className="w-full relative  flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative">
					{/* arrow */}
					<div className="absolute   -top-12 right-0 text-2xl  flex gap-8 z-50 pl-5">
						{/* arrow left */}
						<button
							onClick={prevSlider}
							className="bg-base-200 p-4 rounded-full"
						>
							<FaArrowLeftLong />
						</button>
						{/* arrow right */}
						<button
							onClick={nextSlider}
							className="bg-base-200 p-4 rounded-full"
						>
							{" "}
							<FaArrowRightLong />
						</button>
					</div>
					{/* text container here */}

					{/* slider container */}
					<div className=" overflow-hidden mt-10 a z-50  ">
						<div
							className="ease-linear  duration-300 grid grid-cols-8 w-[2750px] items-center"
							style={{
								transform: `translateX(-${
									currentSlider * (isSmallScreen ? 98 : 350)
								}px)`,
							}}
						>
							{/* sliders */}
							{slicedProducts?.map((item, inx) => (
								<div
									key={inx}
									className={`mr-20 ${
										currentSlider - 1 === inx
											? "scale-0"
											: "scale-100 delay-500"
									} duration-300 rounded-lg z-50`}
								>
									

									<div className="grid mt-10 ">
									<ProductCard item={item}></ProductCard>

									</div>
								</div>
							))}
						</div>

						<div className="flex justify-center">
							<Link   to="/allproduct">
								<button className="btn mt-12 btn-error px-8 rounded-sm text-white bg-primary ">
									view all Product
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExploreProduct;
