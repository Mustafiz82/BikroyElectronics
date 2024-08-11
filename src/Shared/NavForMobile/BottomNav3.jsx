import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BottomNav.css'
import { FaCartPlus, FaHeart } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { RiLayoutGridFill } from 'react-icons/ri';
import { FiShoppingBag } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';
import { SlLogout } from 'react-icons/sl';

const BottomNav3 = () => {

    const list = document.querySelectorAll('.list');

    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }

    list.forEach((item) =>
        item.addEventListener('click', activeLink));


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
        <div className="body">
            <div className="navigation">
                <ul>
                    <li className="list active">
                        <Link to="/">
                            <span className="icon">
                                <FaHome className="text-xl text-white" />                        </span>
                            <span className="text">Home</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/allproduct">
                            <span className="icon">
                                <RiLayoutGridFill className="text-xl text-white" />                        </span>
                            <span className="text">All Product</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/cart">
                            <span className="icon">
                                <FaHeart className="text-xl text-white" />                        </span>
                            <span className="text">Wishlist</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/wishlist">
                            <span className="icon">
                                <FaCartPlus className="text-xl text-white" />                        </span>
                            <span className="text">Cart</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className="list">
                        <Link to="/accountNav">
                            <span className="icon">
                                <MdAccountCircle className="text-xl text-white" />                        </span>
                            <span className="text">Account</span>
                            <span className="circle"></span>
                        </Link>
            
                    </li>
                    <div className="indicator "></div>
                </ul>
            </div>
        </div>
    );
};

export default BottomNav3;
