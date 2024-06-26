import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import image from "../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { GoHeart } from "react-icons/go";
import { Rating, RoundedStar } from "@smastrom/react-rating";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import {
	useSetWishListProductMutation,
	useGetSingleProductsQuery,
} from "../redux/api/baseApi";
const ProductCard = ({ item }) => {
	const myStyles = {
		itemShapes: RoundedStar,
		activeFillColor: "#ffb700",
		inactiveFillColor: "#fbf1a9",
	};

	const { email, isInitializing } = useSelector((state) => state.userSlice);
	const [setWishListProduct, { data: wishListdata}] =	useSetWishListProductMutation();
	// console.log(wishListdata);

	const addToWishList = () => {

		const wishListObject = {
			productId : wishListdata?._id,
			email : email,
			...rest
		}
		// const wishListProduct = { email, ...item };
		// setWishListProduct(wishListProduct);

		console.log(wishListObject);

		
	};

	return ( <div>
		<Link to={`productdetail/${item?._id}`}>
		
			<div className="w-[250px]  overflow-hidden">
				<div className="rounded-md relative  bg-[#F5F5F5]">
					<div className="p-6 h-[250px] flex items-center">
						<img src={item?.imageUrl} className="mx-auto " alt="" />
					</div>
					<button className="flex hover:text-black rounded-b-md rounded-none w-full text-white  bg-black btn ">
						<IoCartOutline className="text-xl mr-2" />
						<h1 className="texg-">Add to Cart </h1>
					</button>
					<button
						
						className="bg-white hover:bg-primary hover:text-white duration-200 p-2 top-3 right-3 rounded-full absolute"
					>
						<IoEyeOutline className="text-xl" />
					</button>
					<button onClick={addToWishList} className="bg-white hover:bg-primary hover:text-white duration-200 p-2  text-black top-16 right-3 rounded-full absolute">
						<GoHeart className=" text-xl" />
					</button>
				
				</div>

				<h1 className="my-4 min-h-12 font-medium">{item?.title}</h1>
				<h1 className="text-xl   font-medium text-primary ">
					BDT {item?.price} <span  className="text-black font-base font-normal textt-base">({item?.sellCount} sold)</span>
				</h1>
				{/* <Rating className="mt-4" style={{ maxWidth: 120 }} itemStyles={myStyles} value={4} readOnly  /> */}
			</div></Link>

			
	</div>
	);
};

export default ProductCard;
