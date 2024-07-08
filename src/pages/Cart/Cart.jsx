import React from "react";
import image from "../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { useGetCartProductQuery, useUpdateCartMutation } from "../../redux/api/baseApi";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const Cart = () => {

	const { email } = useSelector((state) => state.userSlice)

	const { data: cartData, error } = useGetCartProductQuery(email)


	console.log(cartData)

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


	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="px-16">
				<div className="grid  grid-cols-9 font-medium my-16">
					<h1 className="col-span-4">Product</h1>
					<h1 className="col-span-2">Price</h1>
					<h1 className="col-span-2">Quantity</h1>
					<h1 className="col-span-1 ">Subtotal</h1>
				</div>


				{
					cartData?.length < 1 ? <div className="w-2/3 mx-auto text-center">
						<h1 className="text-xl font-semibold mb-2 font-inter">
							Your Cart is Empty

						</h1>
						<p>

							It looks like you haven't added any products to your cart yet. Start exploring our wide range of products and click the Add to cart button to save your favorites here. Happy shopping!
						</p>
					</div> : <div >

						{
							cartData?.map(item => <CartItem item={item} ></CartItem>)
						}

					</div>
				}


			</div>

			<div className="flex justify-between ">
				<button className="btn btn-outline rounded-none ">
					Return To Shop{" "}
				</button>
				<button disabled={cartData?.length < 1} className="btn btn-outline rounded-none ">
					Update Cart{" "}
				</button>
			</div>

			<div className="    mt-20 ">
				<div className="flex gap-4 ">
					<input
						type="text"
						placeholder="Coupon code "
						className="input  border-black  rounded-sm  input-bordered "
					/>
					<button className="btn btn-error bg-primary text-white rounded-sm ">
						Apply coupon
					</button>
				</div>

				<div className="flex justify-end -mt-10">
					<div className=" p-8 space-y-4 border-2 border-black w-1/3">
						<h1 className="text-xl font-medium mb-8 ">cart total</h1>
						<div className="flex justify-between border-b-2 pb-4 border-b-black">
							<span>subtotal:</span>
							<span>$1750</span>
						</div>
						<div className="flex justify-between border-b-2 pb-4 border-b-black">
							<span>Shipping:</span>
							<span>Free</span>
						</div>
						<div className="flex justify-between ">
							<span>Total:</span>
							<span>$1750</span>
						</div>
						<div className="flex justify-center items-center">
							<button className="btn btn-error text-white bg-primary rounded-sm px-8 mt-8">
								Proceed to checkout{" "}
							</button>
						</div>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
