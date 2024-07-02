import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).png";
import { categoryItems } from "../../../public/categoryObject";
import {
	useGetSingleProductsQuery,
	useSetProductsMutation,
	useUpdateSingleProductMutation,
} from "../../redux/api/baseApi";
import { useParams } from "react-router-dom";

const EditProduct = () => {
	const { id } = useParams();

	const { data: product } = useGetSingleProductsQuery(id);
	const [updateProduct, { isSuccess }] = useUpdateSingleProductMutation();

	const { register, handleSubmit } = useForm();
	const [imageUrl, setImageUrl] = useState("");
	const [uploading, setUploading] = useState(false);
	const [updateText, setUpdateText] = useState("Update Product");
	const imageBBApiKey = "c696443c798ad9c58798852ae8d4166a";
	const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;

	const onSubmit = (data) => {
		setUpdateText("Updating Product...");
		console.log({ imageUrl, ...data });
		updateProduct({
			id,
			data: {
				imageUrl : imageUrl || product.imageUrl,
				...data,
			},
		});
	};

	console.log(product?.imageUrl);

	useEffect(() => {
		if (isSuccess) {
			setUpdateText("Product Updated");
		}
	}, [isSuccess]);

	const handleImageUpload = (event) => {
		setUploading(true);

		const file = event.target.files[0];

		// removeBG({file : file})
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
				Update Product
			</h1>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex gap-5 ">
					<div className="mt-8 flex-1 ">
						<input
							type="text"
							defaultValue={product?.title}
							{...register("title", { required: true })}
							className=" input focus:border-none focus:outline-none  rounded-sm w-full mb-8  bg-[#F5F5F5]"
						/>

						<textarea
							defaultValue={product?.description}
							required
							{...register("description", { required: true })}
							className="textarea resize-none focus:border-none focus:outline-none rounded-sm mb-8 outline-none w-full h-64  bg-[#F5F5F5]"
							id=""
						></textarea>
						<input
							type="text"
							defaultValue={product?.price}
							required
							{...register("price", { required: true })}
							className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
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

							<div className="w-[250px] p-6 justify-center flex items-center h-[250px] bg-base-200">
								<img
									src={imageUrl || product?.imageUrl}
									alt=""
									className=" "
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
							<option disabled>Category</option>
							px
							{categoryItems?.map((item, inx) => (
								<option
									selected={
										item?.title == product?.category
											? "true"
											: "false"
									}
									key={inx}
								>
									{" "}
									{item?.title}
								</option>
							))}
						</select>
					</div>
				</div>

				<button
					type="submit"
					className="w-full btn mt-6   btn-error bg-primary text-white  rounded-sm  "
				>
					{/* {isUpdating ? "Updating Product ..." :( isSuccess ? "Product Updated" : "Update Product") } */}
					{updateText}
				</button>
			</form>
		</div>
	);
};

export default EditProduct;
