import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others//image-removebg-preview (14).svg";
import {
  useGetCategoryListQuery,
  useSetProductsMutation,
} from "../../redux/api/baseApi";
import toast, { Toaster } from "react-hot-toast";
import RichTextEditor from "../../Components/RichTextEditor";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);
  const imageBBApiKey = "c696443c798ad9c58798852ae8d4166a";
  const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;
  const [buttonText, setButtonText] = useState("Add product");

  const [setProduct, { data, isSuccess }] = useSetProductsMutation();
  const { data: categoryItems, isLoading, error } = useGetCategoryListQuery();

  const [description, setDescription] = useState("");

  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [resetFile, setResetFile] = useState(false);

  console.log(description);
  useEffect(() => {
    if (isSuccess) {
      setButtonText("Product Added");
      reset();
      setDescription("");
      setImageUrl("");
    }
  }, [isSuccess]);

  const onSubmit = async (data) => {
    setButtonText("Uploading Images...");

    let imageUrl = [];

    for (let image of files) {
      const formdata = new FormData();

      formdata.append("file", image);
      formdata.append("upload_preset", "furniro");

      // console.log(formdata);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcpjqjkht/image/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      imageUrl.push(res.data.url);
    }

    setImageUrl(imageUrl);
    setButtonText("Saving Products");

    // console.log({ imageUrl, ...data });
    setProduct({ imageUrl, description, ...data });
  };

  // start
  const handleChangeFile = (e) => {
    setFiles((prev) => [...prev, ...e.target.files]);
  };

  const handleRemoveImg = (idx) => {
    let newFiles = files;
    newFiles.splice(idx, 1);
    console.log(newFiles);
    setNewFiles(newFiles);
    setResetFile(!resetFile);
  };

  useEffect(() => {
    setFiles(newFiles);
  }, [resetFile]);

  // const handleImageUpload = async (event) => {
  //   setUploading(true);
  //   const file = event.target.files[0];

  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     try {
  //       const res = await axios.post(imageBBUrl, formData, {
  //         headers: {
  //           "content-type": "multipart/form-data",
  //         },
  //       });

  //       const imageUrl = res?.data.data.image.url;
  //       setImageUrl("");
  //       await checkImageAvailability(imageUrl);
  //       setImageUrl(imageUrl);
  //     } catch (err) {
  //       console.error("Error uploading image", err);
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  // const checkImageAvailability = (url, retries = 5, delay = 1000) => {
  //   return new Promise((resolve, reject) => {
  //     let attempts = 0;

  //     const tryLoadImage = () => {
  //       const img = new Image();
  //       img.onload = () => resolve(true);
  //       img.onerror = () => {
  //         if (attempts < retries) {
  //           attempts++;
  //           setTimeout(tryLoadImage, delay);
  //         } else {
  //           reject(new Error("Image not found"));
  //         }
  //       };
  //       img.src = url;
  //     };

  //     tryLoadImage();
  //   });
  // };

  return (
    <div className="px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Add Product
      </h1>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-5 ">
          <div className="mt-8  col-span-3 flex-3 ">
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
          <div className="mt-8  col-span-1 flex-1">
            <div className="">
              {/* <input
                type="file"
                id="file-upload"
                className="hidden input-file"
                onChange={handleImageUpload}
              />

              <div className="md:w-[250px] flex  justify-center items-center w-full h-full md:h-[250px] bg-base-200">
                <img
                  src={imageUrl || imageUpload}
                  alt=""
                  className="w-full "
                />
              </div>

              <label
                htmlFor="file-upload"
                className="btn w-full md:w-[250px] mt-6 btn-error bg-primary text-white rounded-sm"
              >
                {uploading ? (
                  <div className="flex gap-2 justify-center items-center">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Uploading ...</span>
                  </div>
                ) : (
                  "Upload Image"
                )}
              </label> */}

              <label
                htmlFor="upload-img"
                className="bg-base-200 w-full h-[300px]"
              >
                <img src={imageUpload} className="bg-base-200 mb-5" alt="" />
              </label>

              <input
                multiple
                className="hidden"
                onChange={handleChangeFile}
                id="upload-img"
                type="file"
              />

              <div className="flex  gap-2 flex-wrap">
                {files.map((item, idx) => (
                  <div key={idx} className="relative">
                    <img
                      className="w-16 h-16"
                      src={URL.createObjectURL(item)}
                      alt=""
                    />
                    <span
                      onClick={() => handleRemoveImg(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-[2px]"
                    >
                      <IoMdClose />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <select
              required
              {...register("category", { required: true })}
              className="select block rounded-sm focus:border-none focus:outline-none mt-10 select-bordered w-full md:w-[250px]"
            >
              <option disabled selected>
                Category
              </option>
              {categoryItems?.map((item, inx) => (
                <option key={inx}>{item?.title}</option>
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
