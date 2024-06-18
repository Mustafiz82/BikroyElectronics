import React from 'react';
import signUpImage from "../../assets/Signup/Sign Up.jpeg"
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
             <div className='flex gap- justify-between max-w-screen-xl mx-auto '>
            <div className=' w-1/2' >
                <img className='w-full' src={signUpImage} alt="" />
            </div>
           <div className='w-1/2 flex justify-center'>
           <div className=' max-w-[500px] font-poppins py-20 px-10'>
                <h1 className='font-inter font-medium text-3xl'>Log in to BikroyElectronics</h1>

                <p className='mt-5 font-medium'>Enter your detail below</p>

                <form >
                
                    <input type="text" className='outline-none mt-8 py-2 w-full border-b-2 border-gray-400' placeholder='Email'  />
                    <input type="text" className='outline-none mt-8 py-2 w-full border-b-2 border-gray-400' placeholder='password'  />

                    <button className='btn mt-8 btn-primary border-none bg-primary text-white w-full rounded-md' >Create Account</button>
                  
                </form>

                <p className='text-center mt-8'>Didn't have an account <Link to="/signUp" className='ml-4 border-b-2 border-gray-500 pb-1'>sign up</Link></p>

            </div>
           </div>
        </div>
        </div>
    );
};

export default Login;