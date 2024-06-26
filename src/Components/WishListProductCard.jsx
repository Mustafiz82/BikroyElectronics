import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import image from "../assets/Signup/imou-ranger-2-200x200-removebg-preview.png"
import { useDeleteWishlistProductMutation } from "../redux/api/baseApi";

const WishListProductCard = ({item}) => {

	const [deleteItem , {data  , error}] = useDeleteWishlistProductMutation()
	console.log(error , data);
	
    return (
		<div className="max-w-[280px]  overflow-hidden">
			<div className="rounded-md bg-[#F5F5F5]  relative ">
				<img
					src={item?.imageUrl }
					className="bg-[#F5F5F5] mx-auto"
					alt=""
				/>
				<button className="flex rounded-b-md rounded-none w-full text-white  bg-black hover:text-black btn ">
					<IoCartOutline className="text-xl mr-2" />
					<h1>Add to Cart </h1>
				</button>
                <button onClick={() => {deleteItem(item?._id).unwrap()}} className="bg-white p-2 top-3 right-3 rounded-full absolute">
                <RiDeleteBin6Line />

                </button>
			</div>

			<h1 className="my-4 font-medium">
			{item?.title}
			</h1>
		<h1 className="text-xl font-medium text-primary ">{item?.price}</h1>
		</div>
	);
};

export default WishListProductCard;