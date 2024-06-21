import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).png";
import { categoryItems } from "../../../public/categoryObject";

const AddProduct = () => {
	const { register, handleSubmit } = useForm();
	const [imageUrl, setImageUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const imageBBApiKey = "c696443c798ad9c58798852ae8d4166a";
	const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;

	const onSubmit = (data) => {
	    
            console.log({imageUrl ,...data});
	
	};

        

	const handleImageUpload = (event) => {
		setUploading(true);
		const file = event.target.files[0];
		console.log(file);
		if (file) {
			const formData = new FormData();
			formData.append("image", file);

			axios
				.post(imageBBUrl, formData, {
					headers: {
						"content-type": "multipart/form-data",
					},
				})
				.then((res) => {
					setImageUrl(res?.data.data.display_url);
					console.log(res?.data);
					setUploading(false);
				})
				.catch((err) => {
					console.error("Error uploading image", err);
					setUploading(false);
				});
		}
	};

	return (
		<div className="my-10">
			<h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
				{" "}
				Add Product
			</h1>
			
			<form onSubmit={handleSubmit(onSubmit)} >
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
                            {...register("price", { required: true })}							className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
						/>
					</div>
					<div className="mt-8">
                    <div>
				<input
					type="file"
					id="file-upload"
					className="hidden input-file"
					onChange={handleImageUpload}
				/>

				<div className="w-[250px] p-5 h-[250px] bg-base-200">
					<img
						src={imageUrl ? imageUrl : imageUpload}
						alt=""
						className="w-full h-full "
					/>
				</div>

				<label
					htmlFor="file-upload"
					className="btn w-[250px] mt-10 btn-error bg-primary text-white rounded-sm"
				>
					{uploading ? (
						<div className="flex gap-2 justify-center items-center">
							<span className="loading loading-spinner loading-sm"></span>
							<span>Uploading ...</span>
						</div>
					) : (
						"Upload Image"
					)}
				</label>
			</div>
						<select
							required
                            {...register("category", { required: true })}							
							className="select block rounded-sm focus:border-none focus:outline-none  mt-10 select-bordered  w-[250px]"
						>
							<option disabled selected>
								Category
							</option>
							px
							{
                                categoryItems.map((item , inx) => <option key={inx}> {item?.title}</option>
                                   )
                            }
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
