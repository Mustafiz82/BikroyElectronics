import React from "react";
import image from "../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { TiDelete } from "react-icons/ti";

const Cart = () => {
	return (
		<div className="max-w-screen-xl mx-auto">
			<div className="px-16">
				<div className="grid  grid-cols-9 font-medium my-16">
					<h1 className="col-span-4">Product</h1>
					<h1 className="col-span-2">Price</h1>
					<h1 className="col-span-2">Quantity</h1>
					<h1 className="col-span-1 ">Subtotal</h1>
				</div>
				<div className="grid grid-cols-9  font-medium my-16">
					<div className="flex relative items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
                    <h1 className="text-red-500 text-xl   -top-1 absolute"><TiDelete />
                    </h1>

					</div>
					<h1 className="col-span-2">$650</h1>
					<div className="col-span-2">
						<input
							type="number"
							defaultValue={1}
							className="input w-16 input-bordered "
						/>
					</div>
					<h1 className="col-span-">$650</h1>

				</div>
				<div className="grid grid-cols-9  font-medium my-16">
					<div className="flex items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-2">$650</h1>
					<div className="col-span-2">
						<input
							type="number"
							defaultValue={1}
							className="input w-16 input-bordered "
						/>
					</div>
					<h1 className="col-span-">$650</h1>
				</div>
				<div className="grid grid-cols-9  font-medium my-16">
					<div className="flex items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-2">$650</h1>
					<div className="col-span-2">
						<input
							type="number"
							defaultValue={1}
							className="input w-16 input-bordered "
						/>
					</div>
					<h1 className="col-span-">$650</h1>
				</div>
			</div>

			<div className="flex justify-between ">
				<button className="btn btn-outline rounded-none ">
					Return To Shop{" "}
				</button>
				<button className="btn btn-outline rounded-none ">
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
