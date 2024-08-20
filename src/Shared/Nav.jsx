import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import auth from "../../firebase.config";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/user/userSlice";
import { setSearchText } from "../redux/features/filter/filterSlice";
import { useGetSingleUserQuery, useRemoveTokenMutation } from "../redux/api/baseApi";

const Nav = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { email } = useSelector((state) => state.userSlice);
	const {isAdmin} = useGetSingleUserQuery()
	const [removeToken ,{data:status}] = useRemoveTokenMutation()
	console.log({ userEmail: email })
console.log(status , "cookie status")


	const handleSearch = (e) => {
		e.preventDefault();
		const searchText = e.target.search.value;
		dispatch(setSearchText({
			searchText: searchText
		}))
		navigate("/allproduct")
	};







	const handleLogout = () => {
		signOut(auth).then(() => {
			dispatch(setUser({
				name: "",
				email: "",
				isLoggedIn: false
			}))
			removeToken({})

		}).catch((error) => {
			// An error happened.
		});
	}


	const ul = (
		<>
			<NavLink
				to="/"
				className={({ isActive, isPending }) =>
					isPending
						? "pending"
						: isActive
							? "text-primary border-b-2 pb-1  border-primary"
							: ""
				}
			>
				Home
			</NavLink>
			<NavLink
				to="/allProduct"
				className={({ isActive, isPending }) =>
					isPending
						? "pending"
						: isActive
							? "text-primary border-b-2 pb-1  border-primary"
							: ""
				}
			>
				All Products
			</NavLink>
			<NavLink
				to="/contact"
				className={({ isActive, isPending }) =>
					isPending
						? "pending"
						: isActive
							? "text-primary border-b-2 pb-1  border-primary"
							: ""
				}
			>
				Contact
			</NavLink>
			<NavLink
				to="/login"
				className={({ isActive, isPending }) =>
					isPending
						? "pending"
						: isActive
							? "text-primary border-b-2 pb-1  border-primary"
							: email ? "hidden" : "block"
				}
			>
				Login
			</NavLink>
		</>
	);


	const userUl = <>
	<ul
									tabIndex={0}
									className="menu z-10  space-y-2 text-xl rounded backdrop-blur-[150px] bg-[rgba(0,0,0,0.5)] text-white bg-black menu-sm dropdown-content mt-3  p-3 shadow   w-52"
								>
									<li className=" ">
										<div className="flex gap-2 flex-row">
											<span>
												{" "}
												<VscAccount className="text-xl "></VscAccount>
											</span>{" "}
											<Link to="/Dashboard/myaccount">
												Manage My account
											</Link>{" "}
										</div>
									</li>
									<li className=" ">
										<div className="flex gap-2 flex-row">
											<span>
												{" "}
												<FiShoppingBag className="text-xl "></FiShoppingBag>
											</span>{" "}
											<Link to="/Dashboard/myorders">
												My Order
											</Link>{" "}
										</div>
									</li>
									<li className=" ">
										<div className="flex gap-2 flex-row">
											<span>
												{" "}
												<TiDeleteOutline className="text-xl "></TiDeleteOutline>
											</span>{" "}
											<Link to="/Dashboard/mycancellation">
												{" "}
												My Cancellation
											</Link>{" "}
										</div>
									</li>

									<li className=" ">
										<div onClick={handleLogout} className="flex gap-2 flex-row">
											<span>
												{" "}
												<SlLogout className="text-xl "></SlLogout>
											</span>{" "}
											Logout{" "}
										</div>
									</li>
								</ul></>


	const adminUl = <>

		<ul
			tabIndex={0}
			className="menu z-10  space-y-2 text-xl rounded backdrop-blur-[150px] bg-[rgba(0,0,0,0.5)] text-white bg-black menu-sm dropdown-content mt-3  p-3 shadow   w-52"
		>
			<li className=" ">
				<div className="flex gap-2 flex-row">
					<span>
						{" "}
						<VscAccount className="text-xl "></VscAccount>
					</span>{" "}
					<Link to="/Dashboard/myaccount">
						Overview
					</Link>{" "}
				</div>
			</li>
			<li className=" ">
				<div className="flex gap-2 flex-row">
					<span>
						{" "}
						<VscAccount className="text-xl "></VscAccount>
					</span>{" "}
					<Link to="/Dashboard/myaccount">
						Manage Orders
					</Link>{" "}
				</div>
			</li>
			<li className=" ">
				<div className="flex gap-2 flex-row">
					<span>
						{" "}
						<VscAccount className="text-xl "></VscAccount>
					</span>{" "}
					<Link to="/Dashboard/myaccount">
						Manage Product
					</Link>{" "}
				</div>
			</li>
			<li className=" ">
				<div className="flex gap-2 flex-row">
					<span>
						{" "}
						<FiShoppingBag className="text-xl "></FiShoppingBag>
					</span>{" "}
					<Link to="/Dashboard/myorders">
						Manage category
					</Link>{" "}
				</div>
			</li>
			<li className=" ">
				<div className="flex gap-2 flex-row">
					<span>
						{" "}
						<TiDeleteOutline className="text-xl "></TiDeleteOutline>
					</span>{" "}
					<Link to="/Dashboard/mycancellation">
						{" "}
						Manage Coupon
					</Link>{" "}
				</div>
			</li>

			<li className=" ">
				<div onClick={handleLogout} className="flex gap-2 flex-row">
					<span>
						{" "}
						<SlLogout className="text-xl "></SlLogout>
					</span>{" "}
					Logout{" "}
				</div>
			</li>
		</ul>

	</>



	return (
		<div className="max-w-screen-xl sticky top-0 bg-white z-[999] border-b-2 mx-auto py-4 ">
			<div className="navbar px-0 gap-28 bg-base-100">
				<div className="navbar-start ">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							{ul}
						</ul>
					</div>
					<a className=" text-2xl font-semibold">BikroyElectronics</a>
				</div>
				<div className="navbar-center  hidden lg:flex">
					<ul className="flex gap-8 -ml-28 font-medium px-1">{ul}</ul>
				</div>
				<div className="navbar-end   flex justify-end items-center text-2xl gap-4">
					<form
						onSubmit={handleSearch}
						className="flex  items-center  py-1 px-6 text-base  bg-[rgb(245,245,245)]  "
					>
						<input
							type="text"
							name="search"
							className="p-2 outline-none bg-transparent w-full "
							placeholder="What are you looking for?"
						/>
						<button type="submit">
							<IoSearch className="ml-4 text-xl" />
						</button>
					</form>
					{
						email ? <>
							<NavLink
								to="/wishlist"
								className={({ isActive, isPending }) =>
									isPending
										? "pending"
										: isActive
											? "text-primary  "
											: ""
								}
							>
								<GoHeart className="" />
							</NavLink>
							<NavLink
								to="/cart"
								className={({ isActive, isPending }) =>
									isPending
										? "pending"
										: isActive
											? "text-primary"
											: ""
								}
							>
								<IoCartOutline />
							</NavLink>

							<div className="dropdown  dropdown-end">
								<div tabIndex={0} role="button" className="">
									<VscAccount></VscAccount>
								</div>
								{
									isAdmin?.role == "admin" ? adminUl : userUl
								}
								
							</div></> : ""
					}
				</div>
			</div>
		</div>
	);
};

export default Nav;
