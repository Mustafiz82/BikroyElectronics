import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill, GoSearch } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetSingleProductsQuery,
  useGetWishlistedStutusQuery,
  useSetCartProductMutation,
  useSetWishListProductMutation,
} from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import { MdOutlineZoomIn } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading: productLoading } =
    useGetSingleProductsQuery(id);
  const { email } = useSelector((state) => state.userSlice);
  const [wishListStatus, setWishListStatus] = useState(null); // State to hold wish list status
  const [setWishListProduct, { data: wishListData, error, isLoading }] =
    useSetWishListProductMutation();
  const [setCart, { data: cartData, error: cartError }] =
    useSetCartProductMutation();
  const [actionStatus, setActionStatus] = useState(null); // null for no action, 'success', 'error'
  const navigate = useNavigate();
  MdOutlineZoomIn;

  //  wishlist ---------------------------------------

  const addToWishList = async () => {
    if (!product || !email) {
      console.error("Product or email is undefined", { product, email });
      return navigate("/login");
    }

    const { _id, ...rest } = product;

    const wishListObject = {
      productId: _id,
      email: email,
      ...rest,
    };

    // Lenovo IdeaPad Flex 5 14ALC7
    // BDT 93500 (0 sold)

    try {
      await setWishListProduct(wishListObject);
      toast.success("product Added to WishList", {
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
      console.error("Error adding to wishlist:", error);
      setActionStatus("error");
    }
  };

  // add ot cart ============================================

  const addToCart = async () => {
    if (!product || !email) {
      console.error("Product or email is undefined", { product, email });
      return navigate("/login");
    }

    const { _id, ...rest } = product;

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
      setActionStatus("error");
    }
  };

  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Persistent first-time hover state
  const [showHint, setShowHint] = useState(() => {
    return !localStorage.getItem("hasUsedZoom");
  });

  const zoomLevel = 2.5;
  const boxWidth = 100 / zoomLevel;
  const boxHeight = 100 / zoomLevel;
  const boxLeft = (hoverPos.x / 100) * (100 - boxWidth);
  const boxTop = (hoverPos.y / 100) * (100 - boxHeight);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: `scale(${zoomLevel})`,
    });
    setHoverPos({ x, y });
    setIsHovering(true);

    // Permanently write to storage and hide icon on first hover
    if (showHint) {
      setShowHint(false);
      localStorage.setItem("hasUsedZoom", "true");
    }
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
    setIsHovering(false);
  };

  useEffect(() => {
    if (actionStatus === "success") {
      console.log("Product added to wishlist successfully!");
    } else if (actionStatus === "error") {
      console.log("Error: Failed to add product to wishlist");
    }
  }, [actionStatus]);

  if (productLoading)
    return (
      <div className="mx-5 lg:mx-28 flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
        <div className="skeleton h-[350px] lg:h-[500px] w-full lg:w-[500px] rounded-none"></div>
        <div>
          <div className="skeleton h-7 w-80 rounded-sm"></div>
          <div className="skeleton  mt-4 lg:mt-10 h-6 w-24 rounded-md"></div>
          <div className="skeleton  mt-10 h-10 w-40 rounded-md"></div>
          <div className="skeleton  mt-10 h-6 w-50 rounded-md"></div>
          <div className="skeleton  mt-4 h-6 w-40 rounded-md"></div>
          <div className="skeleton  mt-4 h-6 w-48 rounded-md"></div>
          <div className="skeleton  mt-4 h-6 w-50 rounded-md"></div>
          <div className="skeleton  mt-4 h-6 w-44 rounded-md"></div>
        </div>
      </div>
    );

  return (
    <div className="mx-5 lg:mx-auto lg:px-28  flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
      <div
        className="relative overflow-hidden w-[500px] h-[500px] bg-[#F5F5F5] flex items-center justify-center cursor-zoom-in rounded-sm border border-gray-100"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Zoomable Image */}
        <img
          src={product?.imageUrl}
          style={zoomStyle}
          className="w-full h-full object-contain transition-transform duration-75 ease-out"
          alt={product?.title || "Product"}
        />

        {/* First-time Hover Hint Icon */}
        <div
          className={`absolute top-4 right-4 bg-black/60 p-2.5 rounded-full text-white shadow-md z-20 pointer-events-none select-none transition-opacity duration-500 ease-in-out ${
            showHint ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <MdOutlineZoomIn className="text-3xl animate-pulse" />
        </div>

        {/* Viewport Minimap/Radar Locator */}
        {isHovering && (
          <div className="absolute bottom-3 right-3 w-20 h-20 bg-white border border-gray-300 shadow-md p-1 rounded z-10 pointer-events-none select-none overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src={product?.imageUrl}
                className="w-full h-full object-contain opacity-40"
                alt=""
              />
              <div
                className="absolute border border-[#DB4444] bg-[#DB4444]/15 transition-all duration-75 ease-out"
                style={{
                  width: `${boxWidth}%`,
                  height: `${boxHeight}%`,
                  left: `${boxLeft}%`,
                  top: `${boxTop}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 space-y-5">
        <h1 className="text-xl text-primary font-medium">{product?.title}</h1>
        <div className="flex gap-4 items-center mt-4">
          <span className="text-green-400 pl-2 border-l-2">In stock</span>
        </div>

        <h1 className="text-3xl font-medium">
          BDT{" "}
          {product?.discountedPrice ? product?.discountedPrice : product?.price}
          <span
            className={`${product?.discountedPrice ? "" : "hidden"} text-[#00000090] line-through ml-4`}
          >
            {product?.price}
          </span>
        </h1>

        <p
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        ></p>

        <div className="flex gap-4">
          <button
            onClick={addToWishList}
            className="bg-[#F5F5F5] p-2 px-3 flex items-center b text-black rounded-none"
          >
            {wishListStatus?.wishListed === "success" ? (
              <GoHeartFill className=" text-2xl" />
            ) : (
              <GoHeart className=" text-2xl" />
            )}
          </button>

          <div>
            <button
              onClick={addToCart}
              className="flex hover:text-black rounded-none w-full text-white bg-black btn"
            >
              <h1>Add to Cart</h1>
            </button>
          </div>

          <div>
            {/* <button className="btn btn-error bg-primary rounded-none w-full text-white btn">
              <h1>Buy Now</h1>
            </button> */}
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
