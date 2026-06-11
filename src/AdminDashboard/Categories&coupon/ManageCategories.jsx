import React from "react";
import { PiPlusBold } from "react-icons/pi";
import {
  useGetCategoryListQuery,
  useSetCategoryListMutation,
} from "../../redux/api/baseApi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

const ManageCategories = () => {
  const imageBBApiKey = "c696443c798ad9c58798852ae8d4166a";
  const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;

  const { register, handleSubmit } = useForm();

  const {
    data: categoryItems,
    isLoading,
    error,
    refetch,
  } = useGetCategoryListQuery();
  const [setCategory, { data: categories }] = useSetCategoryListMutation();

  const onSubmit = (data) => {
    console.log(data);
    const imageFile = { image: data?.CategoryImage[0] };

    axios
      .post(imageBBUrl, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res?.data.data.display_url);

        setCategory({
          title: data?.CategoryName,
          imageUrl: res?.data.data.display_url,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Category Added!",
            timer: 1200,
            showConfirmButton: false,
          });

          refetch(); // ✅ refresh data from API
        });
      });
  };

  const handleDeleteCategory = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/categories/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });

        refetch(); // ✅ refresh list
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4">
        <div className=" flex flex-wrap justify-center gap-5">
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          <div className="skeleton w-44 h-44 p-2 rounded-sm"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-5">
      <div className="flex flex-wrap gap-5 justify-center ">
        {categoryItems?.map((item) => (
          <div
            // key={inx}
            className={` relative duration-300 rounded-lg z-50`}
          >
            <div className="flex  justify-center items-center p-2 border-2 min-w-44 text-center min-h-44  space-y-2">
              <div>
                <div className="flex w-24 mx-auto h-24  mb-4 justify-center items-center">
                  {" "}
                  <img src={item?.imageUrl} alt="" />
                </div>{" "}
                <h1>{item?.title}</h1>
              </div>
            </div>

            <button
              onClick={(e) => handleDeleteCategory(item._id, e)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-50"
            >
              <MdClose size={18} />
            </button>
          </div>
        ))}
        <div
          // key={inx}
          className={`  duration-300 rounded-lg z-50`}
        >
          <label htmlFor="my_modal_7" className="">
            <div className="flex justify-center items-center p-2 border-2 min-w-44 text-center min-h-44  space-y-2">
              <div>
                <div className="flex  mb-4 justify-center items-center">
                  <PiPlusBold className="text-5xl text-primary" />
                </div>{" "}
                <h1>New Category</h1>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("CategoryName", { required: true })}
              type="text"
              placeholder="Category Name"
              required
              className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
            />
            <input
              {...register("CategoryImage", { required: true })}
              type="file"
              className="file-input my-5 file-input-bordered focus:border-none focus:outline-none w-full"
            />
            <button type="submit" className="btn  w-full rounded-sm">
              Add New Category
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default ManageCategories;
