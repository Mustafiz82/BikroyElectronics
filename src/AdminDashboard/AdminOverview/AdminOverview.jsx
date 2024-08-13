import React from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import LineCharts from './Charts/LineCharts';
import PieChart from './Charts/PieChart';

const AdminOverview = () => {

    //total products , total sold products , total sold price , total customers , total orders , pending orders  

    const convertToShortFormat = (number) => {
        if (number < 1000) {
            return number.toString();
        } else if (number >= 1000 && number < 100000) {
            return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else if (number >= 100000 && number < 10000000) {
            return (number / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
        } else if (number >= 10000000) {
            return (number / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
        }
    }




    return (
        <div>
            <div className='flex '>
                <div className=' gap-5 grid grid-cols-3'>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#db4444] to-[#ff8c8c] p-4 rounded-lg shadow-lg">
                        <span className='text-5xl font-bold'>58</span>
                        <p className='text-sm mt-2'>Total Products</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-28 text-white bg-gradient-to-r from-[#34a853] to-[#81c784] p-4 rounded-lg shadow-lg">
                        <div className='flex items-center gap-1 text-4xl font-bold'>
                            <FaBangladeshiTakaSign />
                            <span>{convertToShortFormat(2485555554)}</span>
                        </div>
                        <p className='text-sm mt-2'>Total Sales</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#4285f4] to-[#8ab4f8] p-4 rounded-lg shadow-lg">
                        <span className='text-5xl font-bold'>76</span>
                        <p className='text-sm mt-2'>Orders</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#fbbc05] to-[#ffe082] p-4 rounded-lg shadow-lg">
                        <span className='text-5xl font-bold'>12</span>
                        <p className='text-sm mt-2'>Pending</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#ff7043] to-[#ffab91] p-4 rounded-lg shadow-lg">
                        <span className='text-5xl font-bold'>9</span>
                        <p className='text-sm mt-2'>Returns</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#ff7043] to-[#ffab91] p-4 rounded-lg shadow-lg">
                        <span className='text-5xl font-bold'>9</span>
                        <p className='text-sm mt-2'>Returns</p>
                    </div>
                </div>
                <div className='w-[350px]'>
                    <PieChart></PieChart>
                </div>
            </div>


            <div className='mt-10'>
                <LineCharts></LineCharts>
                
            </div>
        </div>
    );
};

export default AdminOverview;
