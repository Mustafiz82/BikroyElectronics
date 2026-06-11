import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useDeleteWishlistProductMutation,
  useSetCartProductMutation,
} from "../redux/api/baseApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WishListProductCard = ({ item }) => {
  const [deleteItem, { isLoading }] = useDeleteWishlistProductMutation();
  const { email } = useSelector((state) => state.userSlice);
  const [setCart, { data: cartData, error: cartError }] =
    useSetCartProductMutation();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // <-- Marked callback as async
      if (result.isConfirmed) {
        try {
          // 1. Wait for the API request to resolve successfully [1.2.2]
          await deleteItem({ id, email }).unwrap();

          // 2. Show the success modal only if the API call succeeded [1.2.1]
          Swal.fire({
            title: "Deleted!",
            text: "The product has been removed from your wishlist.",
            icon: "success",
          });
        } catch (err) {
          // 3. Catch and handle any server errors gracefully [1.2.1]
          console.error("Failed to delete wishlist item:", err);
          Swal.fire({
            title: "Error!",
            text:
              err?.data?.message ||
              "Failed to delete the item. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const addToCart = async () => {
    if (!item || !email) {
      return navigate("/login");
    }

    const { _id, ...rest } = item;

    const cartObject = {
      productId: _id,
      email: email,
      quantity: 1,
      ...rest,
    };

    try {
      await setCart(cartObject);
      toast.success("product Added to Cart", {
        style: {
          padding: "16px",
          color: "#ffffff",
          background: "#DB4444",
        },
        iconTheme: {
          primary: "#ffffff",
          secondary: "#DB4444",
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="max-w-[280px] overflow-hidden">
      <div className="rounded-md bg-[#F5F5F5] relative">
        <div className="p-6 h-[250px] flex items-center">
          <img
            src={item?.imageUrl?.[0]}
            className="mx-auto"
            alt={item?.title}
          />
        </div>
        <button
          onClick={addToCart}
          className="flex rounded-b-md rounded-none w-full text-white bg-black hover:text-black btn"
        >
          <IoCartOutline className="text-xl mr-2" />
          <h1>Add to Cart</h1>
        </button>
        <button
          onClick={() => handleDelete(item?._id)}
          disabled={isLoading} // Disable the button while deletion is processing
          className="bg-white p-2 top-3 right-3 rounded-full absolute"
        >
          <RiDeleteBin6Line className={isLoading ? "animate-pulse" : ""} />
        </button>
      </div>

      <h1 className="mb-2 lg:mb-auto my-4 text-sm lg:min-h-12 font-medium">
        {item?.title}
      </h1>
      <h1 className="lg:text-xl font-medium text-primary">
        BDT {item?.discountedPrice ? item?.discountedPrice : item?.price}{" "}
        <span>
          {item?.discountedPrice ? (
            <span className="text-[#00000090] line-through">{item?.price}</span>
          ) : (
            <span className="text-black font-base font-normal text-base">
              ({item?.sellCount || 0} sold)
            </span>
          )}
        </span>
      </h1>
    </div>
  );
};

export default WishListProductCard;
