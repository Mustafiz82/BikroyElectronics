import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).svg";
import {
  useGetCategoryListQuery,
  useSetProductsMutation,
} from "../../redux/api/baseApi";
import { Toaster } from "react-hot-toast";
import RichTextEditor from "../../Components/RichTextEditor";
import { IoMdClose } from "react-icons/io";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [buttonText, setButtonText] = useState("Add product");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const [setProduct, { isSuccess }] = useSetProductsMutation();
  const { data: categoryItems } = useGetCategoryListQuery();

  // Reset form states once the product is successfully added
  useEffect(() => {
    if (isSuccess) {
      setButtonText("Product Added");
      reset();
      setDescription("");
      setFiles([]); // Clear the uploaded files and previews
    }
  }, [isSuccess, reset]);

  const onSubmit = async (data) => {
    try {
      setButtonText("Uploading Images...");

      let imageUrls = [];

      // Loop and upload files to Cloudinary
      for (let image of files) {
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

      setButtonText("Saving Products...");

      // Call mutation to save product
      await setProduct({
        imageUrl: imageUrls,
        description,
        ...data,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setButtonText("Add Product");
    }
  };

  // Convert FileList to Array safely and append
  const handleChangeFile = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  // Remove file from state immutably without direct mutation
  const handleRemoveImg = (idx) => {
    setFiles((prev) => prev.filter((_, index) => idx !== index));
  };

  return (
    <div className="px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Add Product
      </h1>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-5 ">
          <div className="mt-8 col-span-3 flex-3 ">
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
              className="input mt-28 md:mt-20 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
            />
          </div>
          <div className="mt-8 col-span-1 flex-1">
            <div>
              <label
                htmlFor="upload-img"
                className="bg-base-200 w-full h-[300px] cursor-pointer"
              >
                <img src={imageUpload} className="bg-base-200 mb-5" alt="" />
              </label>

              <input
                multiple
                className="hidden"
                onChange={handleChangeFile}
                id="upload-img"
                type="file"
                accept="image/png, image/webp, image/jpeg"
              />

              <div className="flex gap-2 flex-wrap">
                {files.map((item, idx) => (
                  <div key={idx} className="relative">
                    <img
                      className="w-16 h-16 object-cover"
                      src={URL.createObjectURL(item)}
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
              required
              defaultValue=""
              {...register("category", { required: true })}
              className="select block rounded-sm focus:border-none focus:outline-none mt-10 select-bordered w-full md:w-[250px]"
            >
              <option value="" disabled>
                Category
              </option>
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
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;