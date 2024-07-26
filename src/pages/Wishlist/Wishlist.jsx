import React from "react";
import WishListProductCard from "../../Components/WishListProductCard";
import ProductCard from "../../Components/ProductCard";
import { useDeleteWishlistProductMutation, useGetProductsQuery, useGetWishlistProductQuery, useSetAllCartProductMutation } from "../../redux/api/baseApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import image from "../../assets/Others/emptywishlist.png"
import { Link } from "react-router-dom";

const Wishlist = () => {

	const { email } = useSelector((state) => state.userSlice)
	const { data: wishlistProduct } = useGetWishlistProductQuery(email)
	const { data: Products } = useGetProductsQuery()
	const [deleteProduct , {data}] = useDeleteWishlistProductMutation()
	const [moveToCart , {data : moveStatus , isLoading}] = useSetAllCartProductMutation() 
console.log(data)


const handleMoveToCart = () => {
	if(wishlistProduct){


		

		// const object = 
		const updateProduct = wishlistProduct?.map(item => { 

			const {_id , productId , email , quantity , imageUrl , title , price , category } = item

			const newObject = {
				productId , email  , imageUrl , title , price , category , quantity : 1
			}

			return newObject
		})
		return moveToCart(updateProduct)
	}
	console.log("no wishlist product found")
}
	
	return (
		<div className="max-w-screen-xl px-5 lg:px-0  mx-auto">
			<div className="">
				<div className="flex my-5 lg:my-14 justify-between items-center">
					<h1 className="text-xl">Wishlist ({wishlistProduct?.length})</h1>
					<button disabled={isLoading || wishlistProduct?.length < 1 } onClick={handleMoveToCart} className="btn btn-outline rounded-none ">
						{isLoading ? "Moving to cart..." : "Move all to Cart"}
					</button>
				</div>

				<div>
					
					{
						wishlistProduct?.length < 1 ? <div className="w-2/3 flex items-center flex-col my-20 mx-auto text-center">
						<img src={image} className="w-32" alt="" srcset="" />

						<h1 className="text-xl font-semibold mb-2 font-inter">
							Your wishlist is Empty

						</h1>

					</div> : <div className="grid  grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-16">

							{
								wishlistProduct?.map(item => <WishListProductCard item={item} ></WishListProductCard>)
							}

						</div>
					}
				</div>


			</div>

			<div>
				<div className="flex  mt-16 mb-5 lg:mb-14 justify-between items-center">
					<div className="flex ">
						<span className="p-2 rounded-sm bg-primary"></span>
						<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
							Just for you
						</h1>
					</div>
					<Link to="/allProduct"  className="btn btn-outline px-8 rounded-none ">
						See all
					</Link>
				</div>

				<div className="grid grid-cols-2  lg:grid-cols-4 gap-5 lg:gap-16">

					{
						Products && [...Products]?.sort(() => 0.5 - Math.random()).slice(0, 4).map(item => <ProductCard item={item}></ProductCard>)
					}

				</div>
			</div>
		</div>
	);
};

export default Wishlist;
