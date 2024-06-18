import React from "react";
import Slider from "../../Components/Slider";
import Countdown from "react-countdown";
import ProductSlider from "../../Components/ProductSlider";
import FlashSale from "./FlashSale";
import Categories from "./Categories";
import BestSelling from "./BestSelling";
import drone from "../../assets/banner/bannerAdd.png";
import BannerAdd from "./BannerAdd";
import ExploreProduct from "./ExploreProduct";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { LuShieldCheck } from "react-icons/lu";

const Home = () => {
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
		<div className="max-w-screen-xl mx-auto ">
			<div className="flex ">
				<ul className="border-r-2 font-poppins  w-1/5 space-y-5 pt-5">
					{categoryItems?.map((item) => (
						<li key={item.id}>{item.title}</li>
					))}
				</ul>
				<div className="w-4/5 pt-5 pl-5">
					<Slider></Slider>
				</div>
			</div>

			<FlashSale></FlashSale>
			<Categories categories={categoryItems}></Categories>
			<BestSelling categories={categoryItems}></BestSelling>
			<BannerAdd></BannerAdd>
			<ExploreProduct categories={categoryItems}></ExploreProduct>

			<div className="flex justify-around my-40">
				

				<div className="space-y-4 text-center ">
					<div className="p-2	inline-block bg-slate-400 rounded-full">
						<div className="flex ">
							<div className="text-2xl inline-block  bg-black p-2 rounded-full ">
							<TbTruckDelivery className="text-5xl text-white " />
						</div>
						</div>
					</div>

					<h1 className="font-bold text-2xl ">FREE AND FAST DELIVERY</h1>
					<p className="text-base">Free delivery for all orders over $140</p>
				</div>
				<div className="space-y-4 text-center ">
					<div className="p-2	inline-block bg-slate-400 rounded-full">
						<div className="flex ">
							<div className="text-2xl inline-block  bg-black p-2 rounded-full ">
							<TbTruckDelivery className="text-5xl text-white " />
						</div>
						</div>
					</div>

					<h1 className="font-bold text-2xl ">FREE AND FAST DELIVERY</h1>
					<p className="text-base">Free delivery for all orders over $140</p>
				</div>
				<div className="space-y-4 text-center ">
					<div className="p-2	inline-block bg-slate-400 rounded-full">
						<div className="flex ">
							<div className="text-2xl inline-block  bg-black p-2 rounded-full ">
							<TbTruckDelivery className="text-5xl text-white " />
						</div>
						</div>
					</div>

					<h1 className="font-bold text-2xl ">FREE AND FAST DELIVERY</h1>
					<p className="text-base">Free delivery for all orders over $140</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
