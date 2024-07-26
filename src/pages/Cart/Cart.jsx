import React from "react";
import { useDeleteAllCartProductMutation, useGetCartProductQuery, useUpdateCartMutation } from "../../redux/api/baseApi";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import image from "../../assets/Others/empty-cart-7359557-6024626.webp"
import { Form, Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Cart = () => {

	const { email } = useSelector((state) => state.userSlice)

	const { data: cartData, error } = useGetCartProductQuery(email)
	const [deleteProducts, { data: deletedStatus }] = useDeleteAllCartProductMutation()
	
	const cartTotal = cartData?.reduce((accumulator, product) => {
		return accumulator + ((product?.discountedPrice || product?.price) * product?.quantity);
	  }, 0);


	console.log(cartTotal)

	// const handleUpdateCart = (e, data) => {

	// 	// console.log(data)
	// 	const { quantity, ...rest } = 

	// 	const obj = {
	// 		quantity: e.target.value,
	// 		...rest

	// 	}

	// 	console.log(obj)
	// 	// setUpdateText("Updating Product...");
	// 	// console.log({ imageUrl, ...data });
	// 	// updateProduct({
	// 	// 	id,
	// 	// 	data: {
	// 	// 		imageUrl : imageUrl || product.imageUrl,
	// 	// 		...data,
	// 	// 	},
	// 	// });
	// };


	const handleDeleteAllCartProduct = () => {

		Swal.fire({
			title: "Remove This Product from cart?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove it!"
		}).then((result) => {



			if (result.isConfirmed) {
				deleteProducts()
				Swal.fire({
					title: "Removed!",
					text: "This product has been removed.",
					icon: "success"
				});
			}
		});

	}


	const handleSubmitCoupon = (e) => {
		e.preventDefault()
		const coupon = e.target.coupon.value
		console.log(coupon)
		toast.error('Invalid coupon code', {
			style: {
				padding: '16px',
				color: '#ffffff',
				background: '#DB4444',
			},
			iconTheme: {
				primary: '#ffffff',
				secondary: '#DB4444',
			},
		});
	}


	return (
		<div className="max-w-screen-xl px-5 lg:px-0  mx-auto">
			<div className="w-full overflow-x-scroll">
			<div className="px-5 min-w-[600px]  lg:px-16">
				<div className="grid  grid-cols-9 font-medium my-16">
					<h1 className="col-span-4">Product</h1>
					<h1 className="col-span-2">Price</h1>
					<h1 className="col-span-2">Quantity</h1>
					<h1 className="col-span-1 ">Subtotal</h1>
				</div>


				{
					cartData?.length < 1 ? <div className="w-2/3 flex items-center flex-col my-20 mx-auto text-center">
						<img src={image} className="w-32" alt="" srcset="" />

						<h1 className="text-xl font-semibold mb-2 font-inter">
							Your Cart is Empty

						</h1>

					</div> : <div className="" >

						{
							cartData?.map(item => <CartItem item={item} ></CartItem>)
						}

					</div>
				}


			</div>
			</div>

			<div className="flex justify-between mt-8 ">
				<Link to="/allProduct" className="btn btn-outline rounded-none ">
					Return To Shop{" "}
				</Link>
				<button onClick={handleDeleteAllCartProduct} disabled={cartData?.length < 1} className="btn btn-outline rounded-none ">
					Remove all product
				</button>
			</div>

			<div className="    mt-20 ">
				<form onSubmit={handleSubmitCoupon}  className="flex gap-4 ">
					<input
						type="text"
						placeholder="Coupon code "
						className="input w-full lg:w-auto  border-black  rounded-sm  input-bordered "
						name="coupon"
					/>
					<button type="submit"  className="btn btn-error bg-primary text-white rounded-sm ">
						Apply coupon
					</button>
				</form>

				<div className="flex justify-end mt-10 lg:-mt-10">
					<div className=" p-8 space-y-4 border-2 border-black w-full lg:w-1/3">
						<h1 className="text-xl font-medium mb-8 ">cart total</h1>
						<div className="flex justify-between border-b-2 pb-4 border-b-black">
							<span>subtotal:</span>
							<span>{cartTotal}</span>
						</div>
						<div className="flex justify-between border-b-2 pb-4 border-b-black">
							<span>Shipping:</span>
							<span>Free</span>
						</div>
						<div className="flex justify-between ">
							<span>Total:</span>
							<span>{cartTotal}</span>
						</div>
						<div className="flex justify-center items-center">
							<Link to="/checkout" className="btn btn-error text-white bg-primary rounded-sm px-8 mt-8">
								Proceed to checkout{" "}
							</Link>
						</div>{" "} 
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
