import React, { useState } from "react";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetCategoryListQuery } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategories } from "../../redux/features/filter/filterSlice";

const Categories = ({ categories }) => {
	const [currentSlider, setCurrentSlider] = useState(0);
	const dispatch = useDispatch()

	const handleSelectCategory = (category) => {
		dispatch(setCategories({
			categories : category
		}))
		console.log(category);
	}


	const prevSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === 0 ? categories.length - 6 : currentSlider - 1
		);
	const nextSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === categories.length - 6 ? 0 : currentSlider + 1
		);
	const isSmallScreen = window.innerWidth <= 768;
	return (
		<div className="my-20">
			<div className="flex ">
				<span className="p-2 rounded-sm bg-primary"></span>
				<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
					Categories
				</h1>
			</div>
			<h1 className="text-4xl mt-10 font-medium font-inter">
				Browse By Category
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
							className="ease-linear duration-300 flex gap-4 items-center"
							style={{
								transform: `translateX(-${
									currentSlider * (isSmallScreen ? 98 : 205)
								}px)`,
							}}
						>
							{/* sliders */}
							{categories?.map((item, inx) => (
								<Link to={`/allproduct`} >
									<div onClick={() => handleSelectCategory(item?.title)}
										key={inx}
										className={` ${
											currentSlider - 1 === inx
												? "scale-0"
												: "scale-100 delay-500"
										} duration-300 rounded-lg z-50`}
									>
										<div className="flex mr-7 justify-center items-center p-2 border-2 min-w-44 text-center min-h-44  space-y-2">
											<div>
												<div className="flex  mb-4 justify-center items-center">
													{" "}
													<img
														src={item?.imageurl}
														alt=""
													/>
												</div>{" "}
												<h1>{item?.title}</h1>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
//to={`/allproduct`}	