import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

const AdminDashboardLayout = () => {
	return (
		<div className="flex gap-5 max-w-screen-xl font-poppins mx-auto">
			
            <div className="hidden lg:block lg:w-1/5  font-medium  border-r p-10 pb-0 pl-0  ">
                <div className="mb-5">
                <NavLink
						to="/admin/overview"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Site's Overview</NavLink>
                </div>
                <div className="mb-5">
                    <h1>Category & coupon</h1>
                    <div className="flex flex-col mt-3 gap-1 ml-8 font-normal">
                    <NavLink
						to="/admin/manageCategories"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Manage Category </NavLink>{" "}
                    <NavLink
						to="/admin/managecoupons"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Manage coupon</NavLink>{" "}
					
                    </div>
                </div>
                <div className="mb-5">
                    <h1>Product Management</h1>
                    <div className="flex flex-col mt-3 gap-1 ml-8 font-normal">
                    <NavLink
						to="/admin/productlist"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Product List </NavLink>{" "}
                    <NavLink
						to="/admin/addproduct"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Add Product </NavLink>{" "}
                    <NavLink
						to="/admin/bestsellings"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Best Selling Product </NavLink>{" "}
                    <NavLink
						to="/admin/createflashsale"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Create Flash Sale event </NavLink>{" "}
					
                    </div>
                </div>
                <div className="mb-5">
                    <h1>User Management</h1>
                    <div className="flex flex-col mt-3 gap-1 ml-8 font-normal">
                    <NavLink
						to="/admin/userlist"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Site users List </NavLink>{" "}
                    <NavLink
						to="/admin/myaccount"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>customers List </NavLink>{" "}
					
                    </div>
                </div>
                <div className="">
                    <h1>Order Management</h1>
                    <div className="flex flex-col mt-3 gap-1 ml-8 font-normal">
                    <NavLink
						to="/admin/orders"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>Orders List </NavLink>{" "}
                    <NavLink
						to="/admin/myaccount"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary  "
								: ""
						}
					>customers List </NavLink>{" "}
					
                    </div>
                </div>
            </div>
			<div className="w-full p-4 lg:w-3/4">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default AdminDashboardLayout;
