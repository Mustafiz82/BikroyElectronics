import React from 'react';
import image from "../../assets/Signup/imou-ranger-2-200x200-removebg-preview.png"
const ProductList = () => {
    return (
        <div>
          <div className="px-10">
				<div className="grid  grid-cols-9 font-medium my-10">
					<h1 className="col-span-4">Product</h1>
					<h1 className="col-span-2">Price</h1>
					<h1 className="col-span-2">Quantity</h1>
					<h1 className="col-span-1 ">Edit</h1>
				</div>
				<div className="grid grid-cols-9  font-medium my-10">
					<div className="flex relative items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
                    <h1 className="text-red-500 text-xl   -top-1 absolute"></h1>

					</div>
					<h1 className="col-span-2">$650</h1>
					<div className="col-span-2">
												<h1 className=''>5</h1>

					</div>
                    <button className="btn  btn-outline text-primary  rounded-sm btn-">Edit </button>
				

				</div>
				<div className="grid grid-cols-9  font-medium my-10">
					<div className="flex items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-2">$650</h1>
					<div className="col-span-2">
												<h1 className=''>5</h1>

					</div>
					<button className="btn  btn-outline text-primary  rounded-sm btn-">Edit </button>
				</div>
				<div className="grid grid-cols-9  font-medium my-10">
					<div className="flex items-center col-span-4  gap-2">
						<div>
							<img src={image} className="w-10  p-0" alt="" />
						</div>
						<h1 className="max-w-72 col-span-2">
							{" "}
							Epson Perfection V39 II Photo and Document Flatbed
							Scanner
						</h1>
					</div>
					<h1 className="col-span-2">$650</h1>
					<div className="col-span-2">
						<h1 className=''>5</h1>
					</div>
					<button className="btn  btn-outline text-primary  rounded-sm btn-">Edit </button>
				</div>
			</div>
        </div>
    );
};

export default ProductList;