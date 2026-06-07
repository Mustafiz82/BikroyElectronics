import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).svg";
import {
  useGetCategoryListQuery,
  useGetSingleProductsQuery,
  useUpdateSingleProductMutation,
} from "../../redux/api/baseApi";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RichTextEditor from "../../Components/RichTextEditor";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();

  const { register, handleSubmit, reset } = useForm();
  const { data: product, isLoading } = useGetSingleProductsQuery(id);
  const [updateProduct, { isSuccess }] = useUpdateSingleProductMutation();

  const [files, setFiles] = useState([]);
  const [updateText, setUpdateText] = useState("Update product");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: categoryItems } = useGetCategoryListQuery();

  // Reset form values dynamically when product data is successfully loaded
  useEffect(() => {
    if (product) {
      setDescription(product.description || "");
      setSelectedCategory(product?.category || "");
      setFiles(product?.imageUrl || []);

      reset({
        title: product.title,
        price: product.price,
      });
    }
  }, [product, reset]);

  useEffect(() => {
    if (isSuccess) {
      setUpdateText("Product Updated");
    }
  }, [isSuccess]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      setUpdateText("Uploading Images...");

      const oldImages = files.filter((item) => typeof item === "string");
      const newImages = files.filter((item) => typeof item !== "string");

      let imageUrls = [];

      for (let image of newImages) {
        const formdata = new FormData();
        formdata.append("file", image);
        formdata.append("upload_preset", "furniro");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dcpjqjkht/image/upload",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrls.push(res.data.url);
      }

      setUpdateText("Updating Product...");

      const response = await updateProduct({
        id,
        data: {
          imageUrl: [...oldImages, ...imageUrls],
          ...data,
          description,
          category: selectedCategory,
        },
      });

      const result = response?.data;

      if (result?.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "The product has been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else if (result?.matchedCount > 0 && result?.modifiedCount === 0) {
        Swal.fire({
          icon: "info",
          title: "No Changes Detected",
          text: "You didn't modify any product information.",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Update Failed",
          text: "Product could not be updated.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          "Something went wrong while updating the product.",
      });
    } finally {
      setUpdateText("Update Product");
    }
  };

  const handleChangeFile = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImg = (idx) => {
    setFiles((prev) => prev.filter((item, index) => idx !== index));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mb-5 lg:my-10 px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Update Product
      </h1>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-5 ">
          <div className="mt-8 col-span-3 flex-1 ">
            <input
              type="text"
              placeholder="Product Title"
              required
              {...register("title", { required: true })}
              className="input focus:border-none focus:outline-none rounded-sm w-full mb-8 bg-[#F5F5F5]"
            />

            <RichTextEditor value={description} onChange={setDescription} />

            <input
              type="text"
              placeholder=" $ Price "
              required
              {...register("price", { required: true })}
              className="input mt-28 lg:mt-20 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
            />
          </div>
          <div className="mt-8 col-span-1">
            <div>
              <label
                htmlFor="upload-img"
                className="bg-base-200 w-full h-[300px] cursor-pointer"
              >
                <img className="bg-base-200" src={imageUpload} alt="" />
              </label>

              <input
                multiple
                className="hidden"
                onChange={handleChangeFile}
                id="upload-img"
                type="file"
                accept="image/png, image/webp, image/jpeg"
              />

              <div className="flex mt-5 gap-2 flex-wrap">
                {files.map((item, idx) => (
                  <div key={idx} className="relative">
                    <img
                      className="w-16 h-16 object-cover"
                      src={
                        typeof item === "string"
                          ? item
                          : URL.createObjectURL(item)
                      }
                      alt=""
                    />
                    <span
                      onClick={() => handleRemoveImg(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-[2px] cursor-pointer"
                    >
                      <IoMdClose />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="select block rounded-sm focus:border-none focus:outline-none mt-10 select-bordered w-full lg:w-[250px]"
            >
              <option value="" disabled>Category</option>
              {categoryItems?.map((item, inx) => (
                <option key={inx} value={item?.title}>
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn mt-6 btn-error bg-primary text-white rounded-sm"
        >
          {updateText}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;