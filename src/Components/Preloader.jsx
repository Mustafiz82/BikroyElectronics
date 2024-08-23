// Preloader.js
import React from 'react';
import "./Preloader.css"
import logo from "../assets/Logo/Logo-white.png"


const Preloader = () => {
    return (
        <div className="">
            <div className="preloader ">
                <div className="circle1 relative"></div>
                <div className="logo-container">
                </div>
                <img src={logo} alt="Logo" className="logo absolute top-1/2 -translate-x-1/2 -translate-y-1/2  left-1/2  " />
                <div className="text font-Enter">
                    <span>B</span>
                    <span>I</span>
                    <span>K</span>
                    <span>R</span>
                    <span>O</span>
                    <span>Y</span>
                    <span > &nbsp;</span>
                    <span > &nbsp;</span>
                    
                    <span> </span>
                    <span>E</span>
                    <span>L</span>
                    <span>E</span>
                    <span>C</span>
                    <span>T</span>
                    <span>R</span>
                    <span>O</span>
                    <span>N</span>
                    <span>I</span>
                    <span>C</span>
                    <span>S</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;