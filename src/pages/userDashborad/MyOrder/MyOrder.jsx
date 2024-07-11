import React from "react";
import image from "../../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../../redux/api/baseApi";

const MyOrder = () => {

	const { email } = useSelector((state) => state.userSlice)
	const { data: orders } = useGetOrdersQuery(email)


	const formatDateString = (dateString) => {
		const date = new Date(dateString);
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options);
	};

	return (
		<div className=" mt-10">

			{
				orders?.map(item => <div className="mb-16 border-2  ">
					<div className="border-b-2 ">
						<div className="flex p-10  items-center justify-between">
							<div>
								<h1>
									{" "}
									Order ID :{" "}
									<span className="text-primary">
										{item?._id}
									</span>
								</h1>
								<p> Placed on {formatDateString(item?.date)}</p>
							</div>
							<div>
								<h1> Total : {item?.totalPrice}</h1>{" "}
								<p className="bg-base-200 p-1 text-center mt-1 rounded-full">{item?.status}</p>
							</div>
						</div>

					</div>

					<div className="p-10 pt-0">
					{
						item?.OrderDetails.map(OrderedItem => <div className="grid grid-cols-8   font-medium  mt-16">
							<div className="flex relative items-center col-span-4  gap-2">
								<div>
									<img src={OrderedItem?.imageUrl} className="w-10  p-0" alt="" />
								</div>
								<h1 className="max-w-72 col-span-2">
									{" "}
									{OrderedItem?.title}
								</h1>
							</div>
							<h1 className="col-span-3">x {OrderedItem?.quantity}</h1>

							<h1 className="">{OrderedItem?.price * OrderedItem?.quantity}</h1>
						</div>)
					}
					</div>

				</div>)
			}

		</div>
	);
};

export default MyOrder;
