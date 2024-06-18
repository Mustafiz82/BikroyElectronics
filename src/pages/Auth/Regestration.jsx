import React from 'react';
import signUpImage from "../../assets/Signup/Sign Up.jpeg"
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';


const Regestration = () => {
    return (
        <div className='flex gap- justify-between max-w-screen-xl mx-auto '>
            <div className=' w-1/2' >
                <img className='w-full' src={signUpImage} alt="" />
            </div>
           <div className='w-1/2 flex justify-center'>
           <div className=' max-w-[500px] font-poppins py-20 px-10'>
                <h1 className='font-inter font-medium text-4xl'>Create an Account</h1>

                <p className='mt-5 font-medium'>Enter your detail below</p>

                <form >
                    <input type="text" className='outline-none mt-8 py-2 w-full border-b-2 border-gray-400' placeholder='Name'  />
                    <input type="text" className='outline-none mt-8 py-2 w-full border-b-2 border-gray-400' placeholder='Email'  />
                    <input type="text" className='outline-none mt-8 py-2 w-full border-b-2 border-gray-400' placeholder='password'  />

                    <button className='btn mt-8 btn-primary border-none bg-primary text-white w-full rounded-md' >Create Account</button>
                    <button className='btn mt-2 btn-outline  w-full rounded-md' ><FcGoogle  className='mr-2 text-xl'/>
                    Sign in with google</button>
                </form>

                <p className='text-center mt-8'>Already have an account <Link to="/login" className='ml-4 border-b-2 border-gray-500 pb-1'>sign in</Link></p>

            </div>
           </div>
        </div>
    );
};

export default Regestration;