import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetSingleProductsQuery,
  useGetWishlistedStutusQuery,
  useSetWishListProductMutation
} from "../../redux/api/baseApi";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading: productLoading } = useGetSingleProductsQuery(id);
  const { email } = useSelector((state) => state.userSlice);
  const [wishListStatus, setWishListStatus] = useState(null); // State to hold wish list status
  const [setWishListProduct, { data: wishListData, error, isLoading }] = useSetWishListProductMutation();
  const [actionStatus, setActionStatus] = useState(null); // null for no action, 'success', 'error'

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        try {
          const { data } = await useGetWishlistedStutusQuery(email, id);
          setWishListStatus(data); // Set wish list status once fetched
        } catch (error) {
          console.error("Error fetching wish list status:", error);
        }
      };

      fetchData();
    }
  }, [email, id]);

  const addToWishList = async () => {
    if (!product || !email) {
      console.error('Product or email is undefined', { product, email });
      return;
    }

    const { _id, ...rest } = product;

    const wishListObject = {
      productId: _id,
      email: email,
      ...rest
    };

    try {
      await setWishListProduct(wishListObject);
      setActionStatus('success');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setActionStatus('error');
    }
  };

  useEffect(() => {
    if (actionStatus === 'success') {
      console.log('Product added to wishlist successfully!');
    } else if (actionStatus === 'error') {
      console.log('Error: Failed to add product to wishlist');
    }
  }, [actionStatus]);

  if (productLoading || !email) return <p>Loading...</p>; // Return loading state if product or email is not loaded

  return (
    <div className="mx-28 flex gap-12 my-10">
      <div className=" ">
        <img src={product?.imageUrl} className="w-[500px] bg-[#F5F5F5]" alt="" />
      </div>

      <div className="w-1/2 space-y-5">
        <h1 className="text-xl text-primary font-medium">{product?.title}</h1>
        <div className="flex gap-4 items-center mt-4">
          <span className="text-green-400 pl-2 border-l-2">In stock</span>
        </div>

        <h1 className="text-3xl font-medium">BDT {product?.price}</h1>

        <p className="inline-block" dangerouslySetInnerHTML={{ __html: product?.description }}></p>

        <div className="flex gap-4">
          <button onClick={addToWishList} className="bg-[#F5F5F5] p-2 px-3 flex items-center b text-black rounded-none">
            {
              wishListStatus?.wishListed === 'success' ? <GoHeartFill className=" text-2xl" /> : <GoHeart className=" text-2xl" />
            }
          </button>

          <div>
            <button className="flex hover:text-black rounded-none w-full text-white bg-black btn">
              <h1>Add to Cart</h1>
            </button>
          </div>

          <div>
            <button className="btn btn-error bg-primary rounded-none w-full text-white btn">
              <h1>Buy Now</h1>
            </button>
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {actionStatus === 'success' && <p>Product added to wishlist successfully!</p>}
        {actionStatus === 'error' && <p>Error: Failed to add product to wishlist</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
