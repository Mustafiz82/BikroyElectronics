import React from "react";
import image from "../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { useGetSingleProductsQuery, useSetWishListProductMutation } from "../../redux/api/baseApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
	// const myStyles = {
	// 	itemShapes: RoundedStar,
	// 	activeFillColor: "#ffb700",
	// 	inactiveFillColor: "#fbf1a9",
	// };

	const { id } = useParams();
	const { data: product } = useGetSingleProductsQuery(id);
	const { email, isInitializing } = useSelector((state) => state.userSlice);
	const [setWishListProduct , {data : wishListdata , error}] = useSetWishListProductMutation()
	console.log(wishListdata)
	console.log(error)

	const addToWishList = () => {

		const wishListProduct = {email , ...product}
		setWishListProduct(wishListProduct);

	}

	return (
		<div className="mx-28 flex gap-12  my-10">
			<div className=" ">
				<img
					src={product?.imageUrl}
					className="w-[500px] bg-[#F5F5F5]"
					alt=""
				/>
			</div>

			<div className="w-1/2 space-y-5">
				<h1 className="text-xl text-primary font-medium">
					{product?.title}
				</h1>
				<div className="flex gap-4 items-center mt-4">
					<span className="text-green-400 pl-2 border-l-2">
						{" "}
						In stock
					</span>
				</div>

				<h1 className="text-3xl font-medium  ">BDT {product?.price}</h1>

				<p className="inline-block">{product?.description}</p>
				
				<div className="flex gap-4">
					<button className="bg-[#F5F5F5] p-2 px-3 flex items-center b  text-black rounded-none ">
						<GoHeart className=" text-2xl" />
					</button>

					<div>
						<button onClick={addToWishList} className="flex hover:text-black rounded-none w-full text-white  bg-black btn ">
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
