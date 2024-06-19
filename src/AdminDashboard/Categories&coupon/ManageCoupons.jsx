import React from "react";

const ManageCoupons = () => {
	return (
		<div className="m-10">
			<div>
				<h1 className="text-xl  font-medium mb-10">Available coupons </h1>

				<div className="my-5 ">
                    <div className="grid grid-cols-6">
                        <h1 className="text-primary font-medium">Coupon </h1>
                        <h1 className="font-medium text-primary">Discount</h1>
                    </div>
                </div>
				<div className="my-5 ">
                    <div className="grid grid-cols-6 ">
                        <h1>5XThUY</h1>
                        <h1>15%</h1>
                    </div>
                </div>
				<div className="my-5 ">
                    <div className="grid grid-cols-6 ">
                        <h1>8VT5XLt</h1>
                        <h1>3%</h1>
                    </div>
                </div>
			</div>
			<div>
				<h1 className="text-xl font-medium mt-16">Create new coupon</h1>

				<div className="flex  gap-10 mt-5">
					<input
						type="text"
						placeholder="Coupon Code"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>
					<input
						type="text"
						placeholder="Discount Amount"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>

					<button className="btn rounded-sm">Submit</button>
				</div>
			</div>
		</div>
	);
};

export default ManageCoupons;
