import React, { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetSingleProductsQuery,
  useSetCartProductMutation,
  useSetWishListProductMutation,
} from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import { MdOutlineZoomIn } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redux & API Hooks
  const { email } = useSelector((state) => state.userSlice);
  const { data: product, isLoading: productLoading } = useGetSingleProductsQuery(id);
  const [setWishListProduct, { isLoading: isWishlistLoading }] = useSetWishListProductMutation();
  const [setCart] = useSetCartProductMutation();

  // Local Component States
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImgLoading, setIsImgLoading] = useState(true); 
  const [wishListStatus, setWishListStatus] = useState(null); 
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });
  
  // Persistent first-time hover state
  const [showHint, setShowHint] = useState(() => {
    return !localStorage.getItem("hasUsedZoom");
  });

  // Zoom Configuration
  const zoomLevel = 2.5;
  const boxWidth = 100 / zoomLevel;
  const boxHeight = 100 / zoomLevel;
  const boxLeft = (hoverPos.x / 100) * (100 - boxWidth);
  const boxTop = (hoverPos.y / 100) * (100 - boxHeight);

  // Sync selected image when product data loads
  useEffect(() => {
    if (product?.imageUrl?.length > 0) {
      setSelectedImage(product.imageUrl[0]);
    }
  }, [product]);

  // Remove the old useEffect that watched selectedImage to set loader,
  // since we now handle it synchronously on click to prevent flickers.

  // Toast Configuration Helper
  const toastStyle = {
    style: {
      padding: "16px",
      color: "#ffffff",
      background: "#DB4444",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#DB4444",
    },
  };

  // Handlers
  const addToWishList = async () => {
    if (!product || !email) {
      console.error("Product or email is undefined", { product, email });
      return navigate("/login");
    }

    const { _id, ...rest } = product;
    const wishListObject = {
      productId: _id,
      email,
      ...rest,
    };

    try {
      const response = await setWishListProduct(wishListObject).unwrap();
      console.log(response)
      toast.success("Product Added to WishList", toastStyle);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const addToCart = async () => {
    if (!product || !email) {
      console.error("Product or email is undefined", { product, email });
      return navigate("/login");
    }

    const { _id, ...rest } = product;
    const cartObject = {
      productId: _id,
      email,
      quantity: 1,
      ...rest,
    };

    try {
      await setCart(cartObject).unwrap();
      toast.success("Product Added to Cart", toastStyle);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleMouseMove = (e) => {
    if (isImgLoading) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: `scale(${zoomLevel})`,
    });
    setHoverPos({ x, y });
    setIsHovering(true);

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

  // Exact-matching Initial Skeleton Loader
  if (productLoading) {
    return (
      <div className="mx-5 lg:mx-auto lg:px-28 flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
        {/* Left Column: Image Gallery & Zoom Section */}
        <div className="flex gap-4">
          {/* Mock Thumbnail Skeletons */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton w-20 h-20 rounded-lg" />
            ))}
          </div>
          {/* Main Image Frame Skeleton */}
          <div className="skeleton w-[500px] h-[500px] rounded-sm" />
        </div>

        {/* Right Column: Product Information Section */}
        <div className="w-full lg:w-1/2 space-y-5">
          {/* Title */}
          <div className="skeleton h-7 w-3/4 rounded-sm" />
          
          {/* Stock Status */}
          <div className="flex gap-4 items-center mt-4">
            <div className="skeleton h-5 w-20 rounded-sm" />
          </div>

          {/* Price */}
          <div className="skeleton h-9 w-40 rounded-sm" />

          {/* Description Paragraph Blocks */}
          <div className="space-y-2 pt-2">
            <div className="skeleton h-4 w-full rounded-sm" />
            <div className="skeleton h-4 w-11/12 rounded-sm" />
            <div className="skeleton h-4 w-4/5 rounded-sm" />
            <div className="skeleton h-4 w-2/3 rounded-sm" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {/* Wishlist Button Placeholder */}
            <div className="skeleton w-12 h-10 rounded-none" />
            {/* Add to Cart Button Placeholder */}
            <div className="skeleton w-36 h-10 rounded-none" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-5 lg:mx-auto lg:px-28 flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
      {/* Image Gallery & Zoom Section */}
      <div className="flex gap-4">
        <div className="space-y-4">
          {product?.imageUrl?.map((item, index) => (
            <img
              key={index}
              onClick={() => {
                if (selectedImage !== item) {
                  setIsImgLoading(true); // Set loading state synchronously
                  setSelectedImage(item);
                }
              }}
              src={item}
              className={`w-20 bg-base-200 p-2 h-20 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedImage === item ? "border-2 border-primary scale-105" : "border border-transparent hover:scale-105"
              }`}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
        
        <div
          className="relative overflow-hidden w-[500px] h-[500px] bg-[#F5F5F5] flex items-center justify-center cursor-zoom-in rounded-sm border border-gray-100"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Exact-size Skeleton Placeholder shown while loading */}
          {isImgLoading && (
            <div className="absolute inset-0 skeleton w-[500px] h-[500px] rounded-none z-10" />
          )}

          {/* Animated Transition Wrapper Container */}
          <div
            key={selectedImage} // React key forces a re-mount to re-trigger transition classes
            className={`w-full h-full flex items-center justify-center transition-all duration-300 ease-out transform ${
              isImgLoading ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
            }`}
          >
            <img
              src={selectedImage}
              onLoad={() => setIsImgLoading(false)}
              onError={() => setIsImgLoading(false)} 
              style={zoomStyle}
              className="w-full h-full object-contain"
              alt={product?.title || "Product"}
            />
          </div>

          {/* First-time Hover Hint Icon */}
          <div
            className={`absolute top-4 right-4 bg-black/60 p-2.5 rounded-full text-white shadow-md z-20 pointer-events-none select-none transition-opacity duration-500 ease-in-out ${
              showHint && !isImgLoading ? "opacity-100" : "opacity-0"
            }`}
          >
            <MdOutlineZoomIn className="text-3xl animate-pulse" />
          </div>

          {/* Viewport Minimap/Radar Locator */}
          {isHovering && !isImgLoading && (
            <div className="absolute bottom-3 right-3 w-20 h-20 bg-white border border-gray-300 shadow-md p-1 rounded z-10 pointer-events-none select-none overflow-hidden">
              <div className="relative w-full h-full">
                <img
                  src={selectedImage}
                  className="w-full h-full object-contain opacity-40"
                  alt="Minimap"
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
      </div>

      {/* Product Information Section */}
      <div className="w-full lg:w-1/2 space-y-5">
        <h1 className="text-xl text-primary font-medium">{product?.title}</h1>
        <div className="flex gap-4 items-center mt-4">
          <span className="text-green-400 pl-2 border-l-2">In stock</span>
        </div>

        <h1 className="text-3xl font-medium">
          BDT {product?.discountedPrice ? product?.discountedPrice : product?.price}
          {product?.discountedPrice && (
            <span className="text-[#00000090] line-through ml-4 text-2xl">
              {product?.price}
            </span>
          )}
        </h1>

        <p
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />

        <div className="flex gap-4">
          <button
            onClick={addToWishList}
            className="bg-[#F5F5F5] p-2 px-3 flex items-center text-black rounded-none"
          >
            {wishListStatus?.wishListed === "success" ? (
              <GoHeartFill className="text-2xl" />
            ) : (
              <GoHeart className="text-2xl" />
            )}
          </button>

          <button
            onClick={addToCart}
            className="flex hover:text-black rounded-none text-white bg-black btn"
          >
            Add to Cart
          </button>
        </div>

        {isWishlistLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ProductDetail;