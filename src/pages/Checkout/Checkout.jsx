import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetCartProductQuery } from '../../redux/api/baseApi';

const Checkout = () => {

    const { email } = useSelector((state) => state.userSlice)
    const { data: cartData, error } = useGetCartProductQuery(email)
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data)

    }
    console.log(cartData)

    const cartTotal = cartData?.reduce((accumulator, product) => {
		return accumulator + (product?.price * product?.quantity);
	  }, 0);





    return (<div className='max-w-screen-xl my-10  mx-auto  '>
        <h1 className='text-2xl font-semibold font-inter  '>Billing Details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between gap-32  '>
            <div className='flex-1'>


                <div className='mt-10 font-poppins space-y-6'>
                    <div  >
                        <label htmlFor="first-name " className='text-[#00000090]'>
                            Name<sup className='text-primary'>*</sup>
                        </label>
                        <input  {...register("name",)}
                            type="text"
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                        />
                    </div>
                    <div  >
                        <label htmlFor="companyName" className='text-[#00000090]'>
                            Company Name <sup></sup>
                        </label>
                        <input
                            type="text"
                            {...register("companyName")}
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                        />
                    </div>
                    <div  >
                        <label htmlFor="streetAddress" className='text-[#00000090]'>
                            Street Address<sup className='text-primary'>*</sup>
                        </label>
                        <input  {...register("streetAddress")}
                            type="text"
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                        />
                    </div>
                    <div  >
                        <label htmlFor="apartMentFloor" className='text-[#00000090]'>
                            Apartment, Floor, etc. (optional)<sup></sup>
                        </label>
                        <input
                            type="text"
                            {...register("apartMentFloor")}
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                        />
                    </div>
                    <div  >
                        <label htmlFor="PhoneNumber" className='text-[#00000090]'>
                            Phone Number<sup className='text-primary'>*</sup>
                        </label>
                        <input
                            type="tel"
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                            {...register("PhoneNumber")}
                        />
                    </div>
                    <div  >
                        <label htmlFor="email" className='text-[#00000090]'>
                            Email Address<sup className='text-primary'>*</sup>
                        </label>
                        <input
                            type="email"
                            id='email'
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                            {...register("email")}
                        />
                    </div>

                </div>
            </div>
            <div className='flex-1 space-y-5 mt-10'>

                {
                    cartData?.map(item =>  <div className='flex justify-between mb-10 items-center '>
                        <div className='flex  gap-2 items-center'>
                            <div>
                                <img src={item?.imageUrl} className="w-16  p-0" alt="" />
                            </div>
                            <h1 className="max-w-72 font-semibold col-span-2">
                                {" "}
                                {item?.title} x <span className='text-primary'>{item?.quantity}</span>
                            </h1>
                        </div>
    
                        <h1 className='font-semibold'>BDT {item?.price * item?.quantity  }</h1>
                    </div>
    )
                }
               
                <div className=" space-y-4 pt-10 font-medium ">
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

                    <div className='pt-5'>
                        <div className='flex items-center gap-2 my-4'>
                            <input type="radio" name="radio-8" className="radio radio-error" defaultChecked /> <span> Cash On Delivery</span>
                        </div>
                        <div className='flex items-center gap-2 my-4'>
                            <input type="radio" disabled name="radio-8" className="radio radio-error" /> <span> Pay with SSLCOMMERZ (Upcoming)</span>
                        </div>

                    </div>
                    <div className="flex items-center">
                        <button type='submit' className="btn btn-error text-white bg-primary rounded-sm px-8 mt-6">
                            Proceed Order{" "}
                        </button>
                    </div>{" "}
                </div>
            </div>
        </form>
    </div>);
};

export default Checkout;