import React from "react";
import WishListProductCard from "../../Components/WishListProductCard";
import ProductCard from "../../Components/ProductCard";
import { useGetProductsQuery, useGetWishlistProductQuery } from "../../redux/api/baseApi";
import { useSelector } from "react-redux";

const Wishlist = () => {

	const {email} = useSelector((state) => state.userSlice)
	const {data:wishlistProduct} = useGetWishlistProductQuery(email)
	const {data:Products} = useGetProductsQuery()


	console.log(wishlistProduct);
	return (
		<div className="max-w-screen-xl mx-auto">
			<div className=" ">
				<div className="flex my-14 justify-between items-center">
					<h1 className="text-xl">Wishlist (4)</h1>
					<button className="btn btn-outline rounded-none ">
						Move all to Cart
					</button>
				</div>

				<div className="grid grid-cols-4 gap-16">

					{
						wishlistProduct?.map(item =><WishListProductCard item={item} ></WishListProductCard> )
					}
					
				</div>
			</div>

			<div>
				<div className="flex mt-16 mb-14 justify-between items-center">
					<div className="flex ">
						<span className="p-2 rounded-sm bg-primary"></span>
						<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
							Just for you
						</h1>
					</div>
					<button className="btn btn-outline px-8 rounded-none ">
						See all
					</button>
				</div>

                <div className="grid grid-cols-4 gap-16">

					{
						Products && [...Products]?.sort(() => 0.5 - Math.random()).slice(0, 4).map(item => <ProductCard item={item}></ProductCard>)
					}
					
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
