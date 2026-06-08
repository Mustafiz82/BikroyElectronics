import React from 'react';
import { FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
                <div className='flex justify-center'>
                    {/* Changed to FaTimesCircle with an amber pulse animation */}
                    <FaTimesCircle className='text-9xl text-amber-500 animate-pulse' />
                </div>
                <h1 className='text-2xl font-bold mt-4'>Payment Cancelled</h1>
                <p className='text-gray-600 mt-2'>
                    The payment process was cancelled. No charges have been made to your account.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                    {/* Link to go back and attempt checkout again */}
                    <Link to="/cart" className='btn border-none rounded-md px-6 py-2 text-white bg-amber-500 hover:bg-amber-600 transition-all duration-200'>
                        Return to Cart
                    </Link>
                    <Link to="/" className='btn border-none rounded-md px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;