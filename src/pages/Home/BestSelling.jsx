import React, { useState } from "react";
import ProductCard from "../../Components/ProductCard";

const BestSelling = ({ categories }) => {
	const [currentSlider, setCurrentSlider] = useState(0);

	return (
		<div className="my-20">
			<div className="flex justify-between items-center">
            <div >
            <div className="flex ">
				<span className="p-2 rounded-sm bg-primary"></span>
				<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
					This Month
				</h1>
			</div>
			<h1 className="text-4xl mt-10 font-medium font-inter">
				Best Selling Products
			</h1>

            </div>
            <button className="btn btn-error px-8 text-white  bg-primary rounded-sm ">
				view All
			</button>
            </div>``

			<div className="relative">
				<div className=" overflow-hidden flex justify-between  mt-10 a z-50  ">
					{categories?.map((item, inx) => (
						<div
							key={inx}
							className={`mr-16 ${+-
								currentSlider - 1 === inx
									? "scale-0"
									: "scale-100 delay-500"
							} duration-300 rounded-lg z-50`}
						>
							<ProductCard></ProductCard>
						</div>
					))}
				</div>

			
			</div>
		</div>
	);
};

export default BestSelling;
