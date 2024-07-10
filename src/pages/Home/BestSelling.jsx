import React, { useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";

const BestSelling = ({ categories }) => {
	const [currentSlider, setCurrentSlider] = useState(0);
	const {data:bestSellingProduct } = useGetProductsQuery({limit : 4 , sortBy : "sellCount" , sortOrder : "desc"})

	// console.log(bestSellingProduct);

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
            <Link to="/allProduct" className="btn btn-error px-8 text-white  bg-primary rounded-sm ">
				view All
			</Link>
            </div>``

			<div className="relative">
				<div className=" overflow-hidden flex justify-between  mt-10 a z-50  ">
					{bestSellingProduct?.map((item, inx) => (
						<div
							key={inx}
							className={`flex justify-between ${+-	
								currentSlider - 1 === inx
									? "scale-0"
									: "scale-100 delay-500"
							} duration-300 rounded-lg z-50`}
						>
							<ProductCard item ={item}></ProductCard>
						</div>
					))}
				</div>

			
			</div>
		</div>
	);
};

export default BestSelling;
