import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

const AdminDashboardLayout = () => {
	return (
		<div className="flex  max-w-screen-2xl pl-5 font-poppins mx-auto">
			
            <div className="hidden lg:block lg:w-1/5  font-medium  border-r pt-10 px-10 pb-0 pl-0  ">
                <div className="mb-5">
                <NavLink
						to="/admin/overview"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Dashboard Overview</NavLink>
                </div>
				 <div className="mb-5">
                    
					<NavLink
						to="/admin/orders"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Orders Management </NavLink>{" "}
                    
                </div>
                <div className="mb-5">
                    <Link to="/admin/manageCategories">Category & coupon</Link>
                    <div className="flex text-sm flex-col mt-3 gap-1 ml-12 font-normal">
                    <NavLink
						to="/admin/manageCategories"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Manage Category </NavLink>{" "}
                    <NavLink
						to="/admin/managecoupons"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Manage coupon</NavLink>{" "}
					
                    </div>
                </div>
                <div className="mb-5">
                    <Link to="/admin/productlist">Product Management</Link>
                    <div className="flex text-sm flex-col mt-3 gap-1 ml-12 font-normal">
                    <NavLink
						to="/admin/productlist"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Product List </NavLink>{" "}
                    <NavLink
						to="/admin/addproduct"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Add Product </NavLink>{" "}
                    <NavLink
						to="/admin/bestsellings"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Best Selling Product </NavLink>{" "}
                    <NavLink
						to="/admin/createflashsale"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Create Flash Sale event </NavLink>{" "}
					
                    </div>
                </div>
                <div className="mb-5">
                    <h1>User Management</h1>
                    <div className="flex text-sm flex-col mt-3 gap-1 ml-12 font-normal">
                    <NavLink
						to="/admin/userlist"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>Site users List </NavLink>{" "}
                    <NavLink
						to="/admin/customerList"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
								? "text-primary font-semibold  "
								: ""
						}
					>customers List </NavLink>{" "}
					
                    </div>
                </div>
               
            </div>
			<div className="w-full p-10 lg:w-4/5">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default AdminDashboardLayout;
