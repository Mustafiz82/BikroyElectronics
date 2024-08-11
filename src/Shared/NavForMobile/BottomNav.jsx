import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FiShoppingBag } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { SlLogout } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { signOut } from "firebase/auth";
import auth from '../../../firebase.config';
import { setUser } from '../../redux/features/user/userSlice';


const BottomNav = () => {

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(setUser({
                name: "",
                email: ""
            }))
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            <div className=" flex w-screen ">
                <button className="btn flex-1  p-2  h-auto ">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                    ? "text-primary "
                                    : ""
                        }
                    >
                        <div className='flex justify-center items-center gap-2  flex-col'> <FaHome className="text-xl" /> <span className='font-medium'>Home</span></div>
                    </NavLink>
                </button>
                <button className="btn flex-1  p-2  h-auto ">
                    <NavLink
                        to="/wishlist"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                    ? "text-primary font-bold "
                                    : ""
                        }
                    >
                        <div className='flex justify-center items-center gap-2  flex-col'> <FaHeart className="text-xl" /> <span className='font-medium'>wishList</span></div>
                    </NavLink>
                </button>
                <button className="btn flex-1  p-2  h-auto ">
                    <NavLink
                        to="/cart"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? "pending"
                                : isActive
                                    ? "text-primary font-bold "
                                    : ""
                        }
                    >
                        <div className='flex justify-center items-center gap-2  flex-col'> <FaCartPlus className="text-xl" /> <span className='font-medium'>Cart</span></div>
                    </NavLink>
                </button>
                <button className="btn flex-1  p-2  h-auto ">
                    <div className="dropdown  dropdown-end">
                        <div tabIndex={0} role="button" className="">
                            <div className='flex justify-center items-center gap-2  flex-col'> <MdAccountCircle className="text-xl" /> <span className='font-medium'>Account</span></div>                        </div>
                        <ul
                            tabIndex={0}
                            className="menu z-10 -mt-56  -mr-8  space-y-2  text-xl rounded backdrop-blur-[150px] rgba(0,0,0,0.5)] text-white bg-black menu-sm dropdown-content  p-3    w-52"
                        >
                            <li className=" ">
                                <div className="flex gap-2 flex-row">
                                    <span>
                                        {" "}
                                        <MdAccountCircle className="text-xl "></MdAccountCircle>
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
                        </ul>
                    </div>
                </button>
            </div>

        </div>
    );
};

export default BottomNav;