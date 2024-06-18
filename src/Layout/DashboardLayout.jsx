import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
const DashboardLayout = () => {
	return (
		<div className="flex gap-5 max-w-screen-xl font-poppins mx-auto">
			<div className="w-1/4 font-medium  border-r p-10 pl-0  ">
				<NavLink
					to="/Dashboard/myaccount"
					className={({ isActive, isPending }) =>
						isPending
							? "pending"
							: isActive
							? "text-primary  border-b-2 pb-5  border-primary"
							: ""
					}
				>
					<div className="flex items-center  mb-5 gap-2 flex-row">
						<span>
							{" "}
							<VscAccount className="text-xl "></VscAccount>
						</span>{" "}
						Manage My account{" "}
					</div>
				</NavLink>

				<NavLink
					to="/Dashboard/myorders"
					className={({ isActive, isPending }) =>
						isPending
							? "pending"
							: isActive
							? "text-primary items-center border-b-2 pb-1  border-primary"
							: ""
					}
				>
					<div className="flex items-center mb-5 gap-2 flex-row">
						<span>
							{" "}
							<FiShoppingBag className="text-xl "></FiShoppingBag>
						</span>{" "}
						My Order{" "}
					</div>
				</NavLink>
				<NavLink
					to="/Dashboard/mycancellation"
					className={({ isActive, isPending }) =>
						isPending
							? "pending"
							: isActive
							? "text-primary border-b-2 pb-1  border-primary"
							: ""
					}
				>
					<div className="flex gap-1 items-center flex-row">
						<span>
							{" "}
							<TiDeleteOutline className="text-2xl p-0 "></TiDeleteOutline>
						</span>{" "}
						My Cancellation{" "}
					</div>
				</NavLink>
			</div>
			<div className="w-3/4">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default DashboardLayout;
