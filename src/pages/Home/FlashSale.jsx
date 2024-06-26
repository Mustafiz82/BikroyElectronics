import React, { useState } from 'react';
import Countdown from "react-countdown";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductCard from '../../Components/ProductCard';
const FlashSale = () => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
		return (
			<div className="flex items-center font-bold gap-5">
				<div>
					<h1 className="text-base">Days</h1>
					<h1 className="text-5xl font-bold">{days}</h1>
				</div>
				<span className="text-primary text-5xl font-bold">:</span>
				<div>
					<h1 className="text-base">Hours</h1>
					<h1 className="text-5xl font-bold">{hours}</h1>
				</div>
				<span className="text-primary text-5xl font-bold">:</span>
				<div>
					<h1 className="text-base">Munite</h1>
					<h1 className="text-5xl font-bold">{minutes}</h1>
				</div>
				<span className="text-primary text-5xl font-bold">:</span>
				<div>
					<h1 className="text-base">Second</h1>
					<h1 className="text-5xl font-bold">{seconds}</h1>
				</div>
			</div>
		);
	};


    const [currentSlider, setCurrentSlider] = useState(0)
	const sliders = [
		{
			img: "https://source.unsplash.com/1200x540/?nature",
			title: "Escape 1",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
		{
			img: "https://source.unsplash.com/1200x540/?hill",
			title: "Escape 2",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
		{
			img: "https://source.unsplash.com/1200x540/?mountain",
			title: "Escape 3",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
		{
			img: "https://source.unsplash.com/1200x540/?river",
			title: "Escape 4",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
		{
			img: "https://source.unsplash.com/1200x540/?sea",
			title: "Escape 5",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
		{
			img: "https://source.unsplash.com/1200x540/?sea",
			title: "Escape 5",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
		{
			img: "https://source.unsplash.com/1200x540/?sea",
			title: "Escape 5",
			des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
		},
	];
	const prevSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === 0 ? sliders.length - 1 : currentSlider - 1
		);
	const nextSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
		);
	const isSmallScreen = window.innerWidth <= 768;
    return (
        <div>
            <div className="mt-20 mb-8">
				<div className="flex ">
					<span className="p-2 rounded-sm bg-primary"></span>
					<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
						Today's
					</h1>
				</div>
			</div>
            <div className="flex gap-20 items-center  ">
				<h1 className="text-4xl font-medium font-inter">Flash Sale</h1>
				<div>
					<div className="text-xl">
						<Countdown
							className="tet-xl "
							date={Date.now() + 458895000}
							renderer={renderer}
						/>
					</div>
				</div>
			</div>
            <div>
			<div className="w-full relative h-60 sm:h-96 md:h-[540px] flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative">
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
				<div className=" overflow-hidden  a z-50  py-10">
					<div
						className="ease-linear duration-300 flex gap-4 items-center"
						style={{
							transform: `translateX(-${
								currentSlider * (isSmallScreen ? 98 : 325)
							}px)`,
						}}
					>
						{/* sliders */}
						{sliders.map((slide, inx) => (
							<div
								key={inx}
								src={slide.img}
								className={`mr-20  ${
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
		</div>
        </div>
    );
};

export default FlashSale;