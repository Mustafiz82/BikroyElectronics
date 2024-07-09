import React, { useEffect } from "react";
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
import {
	useGetCategoryListQuery,
	useGetProductsQuery,
} from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategories } from "../../redux/features/filter/filterSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../../firebase.config";
import { setUser } from "../../redux/features/user/userSlice";
import { Toaster } from "react-hot-toast";

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

	const { data: categoryItems, isLoading, error } = useGetCategoryListQuery();
	const { data: products } = useGetProductsQuery();
	const dispatch = useDispatch();


	const handleSelectCategory = (category) => {
		dispatch(setCategories({
			categories: category
		}))
		console.log(category);
	}

	// console.log(products);

	
	return (
		<div className="max-w-screen-xl mx-auto ">
			<div className="flex ">
				<ul className="border-r-2 font-poppins  w-1/5 space-y-5 pt-5">
					{categoryItems?.map((item) => (
						<li onClick={() => handleSelectCategory(item?.title)} key={item.id}>
							<Link to={`/allproduct`}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
				<div className="w-4/5 pt-5 pl-5">
					<Slider></Slider>
				</div>
			</div>

			<FlashSale></FlashSale>
			<Categories categories={categoryItems}></Categories>
			<BestSelling ></BestSelling>
			<BannerAdd></BannerAdd>
			<ExploreProduct explore="explore" products={products}></ExploreProduct>

			<div className="flex justify-around my-40">
				<div className="space-y-4 text-center ">
					<div className="p-2	inline-block bg-slate-400 rounded-full">
						<div className="flex ">
							<div className="text-2xl inline-block  bg-black p-2 rounded-full ">
								<TbTruckDelivery className="text-5xl text-white " />
							</div>
						</div>
					</div>

					<h1 className="font-bold text-2xl ">
						FREE AND FAST DELIVERY
					</h1>
					<p className="text-base">
						Free delivery for all orders over $140
					</p>
				</div>
				<div className="space-y-4 text-center ">
					<div className="p-2	inline-block bg-slate-400 rounded-full">
						<div className="flex ">
							<div className="text-2xl inline-block  bg-black p-2 rounded-full ">
								<TbTruckDelivery className="text-5xl text-white " />
							</div>
						</div>
					</div>

					<h1 className="font-bold text-2xl ">
						FREE AND FAST DELIVERY
					</h1>
					<p className="text-base">
						Free delivery for all orders over $140
					</p>
				</div>
				<div className="space-y-4 text-center ">
					<div className="p-2	inline-block bg-slate-400 rounded-full">
						<div className="flex ">
							<div className="text-2xl inline-block  bg-black p-2 rounded-full ">
								<TbTruckDelivery className="text-5xl text-white " />
							</div>
						</div>
					</div>

					<h1 className="font-bold text-2xl ">
						FREE AND FAST DELIVERY
					</h1>
					<p className="text-base">
						Free delivery for all orders over $140
					</p>
				</div>
			</div>

			
		</div>
	);
};

export default Home;
