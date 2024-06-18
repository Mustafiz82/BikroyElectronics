import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import image from "../assets/Signup/imou-ranger-2-200x200-removebg-preview.png"
import { GoHeart } from "react-icons/go";
import { Rating , RoundedStar} from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
const ProductCard = () => {

    const myStyles = {
        itemShapes: RoundedStar,
        activeFillColor: '#ffb700',
        inactiveFillColor: '#fbf1a9'
      }
	return (
		<div className="w-[250px]  overflow-hidden">
			<div className="rounded-md relative bg-[#F5F5F5]">
				<div className="p-6">
                <img
					src={image}
					className="mx-auto "
					alt=""
				/>
                </div>
				<button className="flex hover:text-black rounded-b-md rounded-none w-full text-white  bg-black btn ">
					<IoCartOutline className="text-xl mr-2" />
					<h1>Add to Cart </h1>
				</button>
                <button className="bg-white p-2 top-3 right-3 rounded-full absolute">
                <IoEyeOutline className="text-xl" />

                </button>
                <button className="bg-white p-2  text-black top-16 right-3 rounded-full absolute">
				<GoHeart  className=" text-xl"/>

                </button>
			</div>

			<h1 className="my-4 font-medium">
				Epson Perfection V39 II Photo and Document Flatbed Scanner
			</h1>
			<h1 className="text-xl  font-medium text-primary ">$960</h1>
             <Rating className="mt-4" style={{ maxWidth: 120 }} itemStyles={myStyles} value={4} readOnly  />

		</div>
	);
};

export default ProductCard;
