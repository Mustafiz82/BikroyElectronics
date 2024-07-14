import React from "react";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useGetCancelledOrdersQuery, useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../../redux/api/baseApi";
import image from "../../../assets/Others/no-orders.png"
import { Link } from "react-router-dom";


const MyCancellations = () => {

    const { email } = useSelector((state) => state.userSlice)
	const { data: orders } = useGetCancelledOrdersQuery(email)


	const formatDateString = (dateString) => {
		const date = new Date(dateString);
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options);
	};


    return (
        <div className=" mt-10">

            {
                orders?.length == 0 ? <div>
                    <div class="flex justify-center gap-2 h-[500px] items-center flex-col text-center">
                        <img src={image} className="w-20 h-20" alt="" />

                        <h2 className=" text-3xl">No Cancellation Yet</h2>
                        <p>If you want to cancel any order go to Order page.</p>
                        <Link to="/Dashboard/myorders" className="btn btn-primary bg-primary rounded-sm border-none mt-4">Manage Orders</Link>
                    </div>
                </div> : orders?.map(item => <div className="mb-16 border-2  ">
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

export default MyCancellations;