import { signOut } from 'firebase/auth';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { SlLogout } from 'react-icons/sl';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.config';
import { setUser } from '../../redux/features/user/userSlice';

const AccountNav = () => {


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
        <div className='h-[500px]'>
            <div className="join w-full gap-2 join-vertical">
                <div className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "><div className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <MdAccountCircle className="text-xl "></MdAccountCircle>
                        </span>{" "}
                        <Link to="/Dashboard/myaccount">
                            Manage My account
                        </Link>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </div>
                <div className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <FiShoppingBag className="text-xl "></FiShoppingBag>
                        </span>{" "}
                        <Link to="/Dashboard/myorders">
                            My Order
                        </Link>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </div>
                <div className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <TiDeleteOutline className="text-xl "></TiDeleteOutline>
                        </span>{" "}
                        <Link to="/Dashboard/mycancellation">
                            {" "}
                            My Cancellation
                        </Link>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </div>
                <div className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div onClick={handleLogout} className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <SlLogout className="text-xl "></SlLogout>
                        </span>{" "}
                        Logout{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </div>

            </div>
        </div>
    );
};

export default AccountNav;