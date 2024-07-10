import React from 'react';
import Countdown from 'react-countdown';
import drone from "../../assets/banner/bannerAdd.png"
import { Link } from 'react-router-dom';

const BannerAdd = () => {

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
		return (
			<div className="flex items-center font-medium gap-5">
				<div className='bg-white text-black p-2 rounded-full w-20 h-20 text-center'>
					<h1 className="text-3xl font-bold">{days}</h1>
					<h1 className="text-base">Days</h1>
				</div>
				<div className='bg-white text-black p-2 rounded-full w-20 h-20 text-center'>
					<h1 className="text-3xl font-bold">{hours}</h1>
					<h1 className="text-base">Hours</h1>
				</div>
				<div className='bg-white text-black p-2 rounded-full w-20 h-20 text-center'>
					<h1 className="text-3xl font-bold">{minutes}</h1>
					<h1 className="text-base">Munite</h1>
				</div>
				<div className='bg-white text-black p-2 rounded-full w-20 h-20 text-center'>
					<h1 className="text-3xl font-bold">{seconds}</h1>
					<h1 className="text-base">Second</h1>
				</div>
			</div>
		);
	};

    return (
        <div className=''>
             <div className="flex text-white justify-around items-center w-full h-[500px] bg-black ">
                <div className='space-y-10'>
                    <h1 className='text-4xl font-medium '>
                        Enhance your <br /> videography Experience 
                    </h1>
                    <Countdown
							className="tet-xl "
							date={Date.now() + 458895000}
							renderer={renderer}
						/>

                        <Link  to="/allproduct/productdetail/66868dcfa2b06ff3e542c63f" className='btn btn-success bg-green-400 rounded-sm px-8 text-white'>Buy Now</Link>
                </div>
                <div>
                    <img style={{filter:"drop-shadow(0px 5px 25px rgba(255, 255, 255, 0.5))" }} src={drone} className="  m-10 shadow-slate-200  "srcset="" />
                </div>
            </div>
        </div>
    );
};

export default BannerAdd;