import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
	

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = (data) => console.log(data)

	return (
		<div className="my-10">
			<h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
				{" "}
				Add Product
			</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-5 ">
					<div className="mt-8 flex-1 ">
						<input
							type="text"
							placeholder="Product Title"
							required
                            {...register("title", { required: true })}							className=" input focus:border-none focus:outline-none  rounded-sm w-full mb-8  bg-[#F5F5F5]"
						/>

						<textarea
							placeholder="Product Description"
							required
                            {...register("description", { required: true })}							className="textarea resize-none focus:border-none focus:outline-none rounded-sm mb-8 outline-none w-full h-64  bg-[#F5F5F5]"
							id=""
						></textarea>
						<input
							type="text"
							placeholder=" $ Price "
							required
							name="price"
							className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
						/>
					</div>
					<div className="mt-8">
						<input
							type="file"
							id="file-upload"
							class="hidden input-file"
                            {...register("image", { required: true })}						/>

						<div className="w-[250px] h-[250px] bg-base-200">
							<img
								src="https://i.ibb.co/Sv7ddvR/image-removebg-preview-13.png"
								alt=""
							/>
						</div>

						<label
							htmlFor="file-upload"
							className="btn w-[250px] mt-10 btn-error bg-primary text-white  rounded-sm "
						>
							{" "}
							upload Image{" "}
						</label>

						<select
							required
							name="category"
                            {...register("category", { required: true })}
							className="select block rounded-sm focus:border-none focus:outline-none  mt-10 select-bordered  w-[250px]"
						>
							<option disabled selected>
								Category
							</option>
							px
							<option>Han Solo</option>
							<option>Greedo</option>
						</select>
					</div>
				</div>

				<button
					type="submit"
					className="w-full btn mt-6   btn-error bg-primary text-white  rounded-sm  "
				>
					Add Product
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
