import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";

const Contack = () => {

	const handleContackUs = (e) => {
		e.preventDefault()
		const name = e.targer.name.value
		const phone = e.targer.phone.value
		const email = e.targer.email.value
		const message = e.targer.message.value

		
		
	}
	return (
		<div className="max-w-screen-xl flex flex-col lg:flex-row px-5 lg:px-0 gap-2 lg:gap-20  mx-auto my-5 lg:my-20">
			<div className="">
				<div className="space-y-2 font-medium font-poppins">
					<div className="font-medium mb-5  flex  items-center gap-4">
						<div className="p-2 inline-block text-white bg-primary rounded-full text-xl">
							<IoCallOutline />
						</div>
						<h1 className="text-xl"> Call to Us</h1>
					</div>

					<p>We are available 24/7, 7 days a week.</p>
					<p className="">phone : +8801742950624</p>
				</div>
				<div className="w-80 h-[2px] mt-10 bg-black"></div>
				<div className="space-y-2 my-10 font-medium font-poppins">
					<div className="font-medium  mb-5 flex  items-center gap-4">
						<div className="p-2  inline-block text-white bg-primary rounded-full text-xl">
							<IoMailOutline />
						</div>
						<h1 className="text-xl mt-5 lg:mt-0"> Write to Us</h1>
					</div>

					<p>
						Fill out the form and we will contack <br />
						you within 24 hours
					</p>
					<p className="">Emails :</p>
					<div>
						<p className="">customer@bikroyelectronics.com</p>
						<p className="">support@bikroyelectronics.com</p>
					</div>
				</div>
			</div>
			<div className="w-full ">
				<div className="flex  gap-5">
					<input
						type="text"
						placeholder="Name"required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>
					<input
						type="tel"
						placeholder="Phone"required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>
					<input
						type="email"
						placeholder="Email"required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>
				</div>
			<div className="mt-5">
				<textarea placeholder="Your Message" required className="textarea resize-none focus:border-none focus:outline-none rounded-sm outline-none w-full h-64  bg-[#F5F5F5]" name="" id=""></textarea>
<div className="flex justify-end">
<button className="btn btn-error bg-primary  px-8  mt-5 rounded-sm text-white ">Send Message</button>

</div>
			</div>
			</div>
		</div>
	);
};

export default Contack;
