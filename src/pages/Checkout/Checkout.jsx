import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAllCartProductMutation,
  useGetCartProductQuery,
  useGetSingleUserQuery,
  useSetOrdersMutation,
  useSetSSLOrdersMutation,
} from "../../redux/api/baseApi";
import Swal from "sweetalert2";
import bkash from "../../assets/Logo/bkash.png";
import cod from "../../assets/Logo/cod.png";
import ssl from "../../assets/Logo/ssl.png";
import stripe from "../../assets/Logo/stripe.png";

// Sub-component with corrected props for state management and accessibility
const PaymentMethod = ({ logo, txt, value, currentValue, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer hover:bg-base-100 p-2 rounded-md transition-all">
      <img
        src={logo}
        className="w-10 mr-3 rounded-full bg-base-200 h-10 object-contain"
        alt={txt}
      />
      <input
        onChange={() => onChange(value)}
        checked={currentValue === value}
        type="radio"
        name="payment-method"
        className="radio radio-error"
      />
      <span className="font-medium text-sm">{txt}</span>
    </label>
  );
};

const Checkout = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: cartData, isLoading: cartDataLoading } =
    useGetCartProductQuery(email);
  const { data: userData } = useGetSingleUserQuery(email);

  const [setOrder] = useSetOrdersMutation();
  const [setSSLOrder] = useSetSSLOrdersMutation();
  const [deleteProducts] = useDeleteAllCartProductMutation();

  const { register, handleSubmit, reset } = useForm();
  const [orderButtonText, setOrderButtonText] = useState("Proceed Order");
  const { discount, discountedCartTotal } = useSelector(
    (state) => state.CartSlice,
  );
  const [paymentMethod, setPaymentMethod] = useState("SSL");

  const navigate = useNavigate();

  // Populate form with fetched user data when it arrives
  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.name || "",
        companyName: userData?.companyName || "",
        address: userData?.address || "",
        apartMentFloor: userData?.apartMentFloor || "",
        PhoneNumber: userData?.PhoneNumber || "",
      });
    }
  }, [userData, reset]);

  const cartTotal = cartData?.reduce((accumulator, product) => {
    return (
      accumulator +
      (product?.discountedPrice || product?.price) * product?.quantity
    );
  }, 0);

  const onSubmit = async (data) => {
    setOrderButtonText("proceeding...");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed Order",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const ordersData = {
          customerDetail: {
            email: email,
            ...data,
          },
          cartData: cartData,
          totalPrice: discountedCartTotal || cartTotal,
          discount: discount,
          paymentMethod: paymentMethod, // Dynamic payment method passed here
          date: new Date(),
        };

        try { 
          const response = await setOrder(ordersData);
          if (response?.data) {

            console.log(response.data)

            if(response?.data?.url){
              window.location.replace(response?.data?.url)
              setOrderButtonText("Order proceed");
            }
            else{
              
            window.location.replace("/payment/success");
              setOrderButtonText("Order proceed");
            }
          }
        } catch (error) {
          console.error("Order processing failed", error);
          setOrderButtonText("Proceed Order");
        }
      } else {
        setOrderButtonText("Proceed Order");
      }
    });
  };

  return (
    <div className="px-5 lg:px-0 my-10 mx-auto">
      <h1 className="text-2xl font-semibold font-inter">Billing Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-24"
      >
        <div className="flex-1">
          <div className="mt-10 font-poppins space-y-6">
            <div>
              <label htmlFor="name" className="text-[#00000090]">
                Name<sup className="text-primary">*</sup>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                className="input mt-2 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label htmlFor="companyName" className="text-[#00000090]">
                Company Name
              </label>
              <input
                {...register("companyName")}
                type="text"
                id="companyName"
                className="input mt-2 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label htmlFor="address" className="text-[#00000090]">
                Address<sup className="text-primary">*</sup>
              </label>
              <input
                {...register("address", { required: true })}
                type="text"
                id="address"
                className="input mt-2 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label htmlFor="apartMentFloor" className="text-[#00000090]">
                Apartment, Floor, etc. (optional)
              </label>
              <input
                {...register("apartMentFloor")}
                type="text"
                id="apartMentFloor"
                className="input mt-2 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label htmlFor="PhoneNumber" className="text-[#00000090]">
                Phone Number<sup className="text-primary">*</sup>
              </label>
              <input
                {...register("PhoneNumber", { required: true })}
                type="number" 
                id="PhoneNumber"
                className="input mt-2 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-[#00000090]">
                Email Address<sup className="text-primary">*</sup>
              </label>
              <input
                type="email"
                value={email || ""}
                id="email"
                disabled
                className="input mt-2 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5 mt-10">
          {cartDataLoading && (
            <div>
              <div className="skeleton w-full my-8 rounded-md h-9"></div>
              <div className="skeleton w-full my-8 rounded-md h-9"></div>
              <div className="skeleton w-full my-8 rounded-md h-9"></div>
            </div>
          )}

          {cartData?.map((item) => (
            <div
              key={item?._id || item?.id}
              className="grid grid-cols-2 lg:flex justify-between mb-10 items-center"
            >
              <div className="flex gap-2 items-center">
                <div>
                  <img src={item?.imageUrl?.[0]} className="w-12 p-0" alt="" />
                </div>
                <h1 className="max-w-72 font-semibold col-span-2">
                  {item?.title} x{" "}
                  <span className="text-primary">{item?.quantity}</span>
                </h1>
              </div>
              <h1 className="text-right lg:text-left font-semibold">
                BDT {(item?.discountedPrice || item?.price) * item?.quantity}
              </h1>
            </div>
          ))}

          <div className="space-y-4 pt-10 font-medium">
            <div className="flex justify-between border-b-2 pb-4 border-b-black">
              <span>Subtotal:</span>
              <span>{cartTotal}</span>
            </div>
            <div className="flex justify-between border-b-2 pb-4 border-b-black">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-b-2 pb-4 border-b-black">
              <span>Discount:</span>
              <span>{discount}%</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span>
                {discountedCartTotal ? discountedCartTotal : cartTotal}
              </span>
            </div>

            <div className="pt-5 space-y-2">
              <PaymentMethod
                logo={cod}
                txt="Cash On Delivery"
                value="COD"
                currentValue={paymentMethod}
                onChange={setPaymentMethod}
              />
              <PaymentMethod
                logo={stripe}
                txt="Pay with Stripe"
                value="Stripe"
                currentValue={paymentMethod}
                onChange={setPaymentMethod}
              />
              <PaymentMethod
                logo={ssl}
                txt="Pay With SSLCOMMERSZ"
                value="SSL"
                currentValue={paymentMethod}
                onChange={setPaymentMethod}
              />
              <PaymentMethod
                logo={bkash}
                txt="Pay With bKash"
                value="Bkash"
                currentValue={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>

            <div className="flex items-center">
              <button
                id="submitButton"
                type="submit"
                className="btn btn-error text-white bg-primary rounded-sm px-8 mt-6"
              >
                {orderButtonText}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
