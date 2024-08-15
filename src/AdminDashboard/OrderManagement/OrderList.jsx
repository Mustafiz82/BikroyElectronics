import React from 'react';
import { useGetAllOrdersQuery, useGetProductsQuery } from '../../redux/api/baseApi';
import { Link } from 'react-router-dom';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const OrderList = () => {

    const { data: orders,  isLoading} = useGetAllOrdersQuery()

    const elements = Array.from({ length: 7 });


    console.log(orders)


    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    const formateTimeString = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };




    return (
        <div className=''>
             <div className="grid text-primary  grid-cols-7 font-medium ">
                    <h1 className="col-span-1">Date</h1>
                    <h1 className="col-span-2">Ordered by</h1>
                    <h1 className="col-span-1">Price</h1>
                    <h1 className="col-span-2 ">Order ID</h1>
                    <h1 className="col-span-1 ">Pament Method</h1>
                </div>

            {isLoading ? elements?.map((_, index) => (
                <div key={index} className="grid  grid-cols-7 font-medium my-10">

                    <div className='space-y-1'>
                        <div className="skeleton rounded-md w-28 h-5 "></div>
                        <div className="skeleton rounded-md w-16 h-5 "></div>
                    </div>
                    <div className='space-y-1 col-span-2'>
                        <div className="skeleton rounded-md w-36 h-5 "></div>
                        <div className="skeleton rounded-md w-16 h-5 "></div>
                    </div>
                    <div className='space-y-1'>
                        <div className="skeleton rounded-md w-16 h-5 "></div>
                        <div className="skeleton rounded-md w-12 h-5 "></div>
                    </div>
                    <div className='space-y-1 col-span-2'>
                        <div className="skeleton rounded-md w-52 h-5 "></div>
                        <div className="skeleton rounded-md w-16 h-5 "></div>
                    </div>
                    <div className='space-y-1'>
                        <div className="skeleton rounded-md w-28 h-5 "></div>
                        <div className="skeleton rounded-md w-16 h-5 "></div>
                    </div>
                   
                </div>
            )) : ""}
            <div className="">
               
                {
                    orders?.map(item => <Link to={`/admin/orders/${item?._id}`} key={item?._id} className="grid grid-cols-7  font-medium my-10">
                        <div className="">
                            <h1>{formatDateString(item?.date)}</h1>
                            <p className='text-sm text-slate-500'>{formateTimeString(item?.date)}</p>
                        </div>
                        <div className="col-span-2">
                            <h1>{item?.customerDetail?.name}</h1>
                            <p className='whitespace-normal max-w-44 text-sm text-slate-500'>{item?.customerDetail?.address}</p>
                        </div>
                        <div className="">
                            <h1 className='flex items-center gap-1'><span><FaBangladeshiTakaSign></FaBangladeshiTakaSign></span>{item?.totalPrice}</h1>
                            <p className='text-sm text-slate-500'>{item?.OrderDetails?.length} item</p>
                        </div>
                        <div className="col-span-2">
                            <h1 className='f'>{item?._id}</h1>
                            <p className='text-sm text-slate-500'>view Order</p>
                        </div>
                       
                        <div > <div className="col-span-2">
                            <h1 className=''>{item?.paymentMethod}</h1>
                            <p className='text-sm text-slate-500'>{item?.status}</p>
                        </div></div>
                    </Link>)
                }

            </div>
        </div>
    );
};

export default OrderList;