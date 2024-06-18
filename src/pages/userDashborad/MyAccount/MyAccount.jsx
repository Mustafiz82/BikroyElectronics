import React from "react";

const MyAccount = () => {
	return (
		<div className="max-w-screen-xl m-10 mx-auto ">
			<h1 className="text font-medium-xl font-medium text-primary">Edit your Profile</h1>

			<div className="flex mt-5 gap-20">
				<div className="mt-5 flex-1">
					<h1 className="mb-2 font-medium">First Name</h1>
					<input
						type="text"
						placeholder="Name"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm  w-full  bg-[#F5F5F5]"
					/>{" "}
				</div>
				<div className="mt-5 flex-1">
					<h1 className="mb-2 font-medium">Last Name</h1>
					<input
						type="text"
						placeholder="Name"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>{" "}
				</div>
			</div>
			<div className="flex mt-5 gap-20">
				<div className="mt-5 flex-1">
					<h1 className="mb-2 font-medium">Email</h1>
					<input
						type="text"
						placeholder="Name"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm  w-full  bg-[#F5F5F5]"
					/>{" "}
				</div>
				<div className="mt-5 flex-1">
					<h1 className="mb-2 font-medium">Address</h1>
					<input
						type="text"
						placeholder="Name"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>{" "}
				</div>
			</div>

            <div className="space-y-5">
            <h1 className="mb-2 font-medium mt-10">Password Cahanges</h1>
            <input
						type="text"
						placeholder="Current Password"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>{" "}

<input
						type="text"
						placeholder="New Password"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>{" "}

<input
						type="text"
						placeholder="Conferm Password"
						required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>{" "}

            </div>

            <div className="flex justify-end items-center mt-8 gap-5">
                <button >Cancel</button>
                <button className="btn btn-error bg-primary  px-8   rounded-sm text-white ">Save Chages </button>
            </div>
		</div>
	);
};

export default MyAccount;
