import React from "react";
import signUpImage from "../../assets/Signup/Sign Up.jpeg";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch ,useSelector} from "react-redux";
import { createUser, signInWithGoogle } from "../../redux/features/user/userSlice";

const Regestration = () => {
	const { register, handleSubmit } = useForm();
    const dispatch = useDispatch()
	const { isLoading } = useSelector((state) => state.userSlice);
	const navigate = useNavigate()

	
    const onSubmit = async (data) => {
        try {
            await dispatch(createUser({name : data.userName, email: data.email, password: data.password }));

            console.log(data.userName);
            // Handle success if needed
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error (if createUser thunk rejects)
        }
    };
    const handleGoogleSignin = async (data) => {
        try {
            await dispatch(signInWithGoogle({name : data.userName, email: data.email, password: data.password }));

            console.log(data.userName);
            // Handle success if needed
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error (if createUser thunk rejects)
        }
    };


    

	return (
		<div className="flex flex-col lg:flex-row  justify-between max-w-screen-xl mx-auto ">
			<div className="  lg:block lg:w-1/2">
				<img className="w-full h-80 object-cover" src={signUpImage} alt="" />
			</div>
			<div className="lg:w-1/2 flex justify-center">
				<div className=" max-w-[500px] font-poppins py-5 lg:py-20 px-10">
					<h1 className="font-inter font-medium text-2xl lg:text-4xl">
						Create an Account
					</h1>

					<p className="mt-5 font-medium">Enter your detail below</p>

					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register("userName", { required: true })}
							type="text"
							className="outline-none mt-8 py-2 w-full border-b-2 border-gray-400"
							placeholder="Name"
						/>
						<input
							{...register("email", { required: true })}
							type="text"
							className="outline-none mt-8 py-2 w-full border-b-2 border-gray-400"
							placeholder="Email"
						/>
						<input
							{...register("password", { required: true })}
							type="text"
							className="outline-none mt-8 py-2 w-full border-b-2 border-gray-400"
							placeholder="password"
						/>

						<button className="btn mt-8 btn-primary border-none bg-primary text-white w-full rounded-md">
                        {isLoading ? (
									<div className="flex gap-2 justify-center items-center">
										<span className="loading loading-spinner loading-sm"></span>
										<span>Creating Account...</span>
									</div>
								) : (
									"Create Account"
								)}{" "}
						</button>
						<button onClick={handleGoogleSignin} className="btn mt-2 btn-outline  w-full rounded-md">
							<FcGoogle className="mr-2 text-xl" />
							Sign in with google
						</button>
					</form>

					<p className="text-center mt-8">
						Already have an account{" "}
						<Link
							to="/login"
							className="ml-4 border-b-2 border-gray-500 pb-1"
						>
							sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Regestration;
