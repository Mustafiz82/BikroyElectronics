import React from 'react';
import { useGetusersQuery, useUpdateUserRoleMutation } from '../../redux/api/baseApi';
import { Link } from 'react-router-dom';

const CustomerList = () => {

    const { data: userList, isLoading } = useGetusersQuery({customer : true})
    const [makeAdmin , {data:updateStauts , isLoading:updateLoading}] = useUpdateUserRoleMutation()
    const elements = Array.from({ length: 7 });


    const handleMakeAdmin = (email) => {
        console.log(email , "email")
        makeAdmin({email})
    }

    console.log(userList)
    return (
        <div>
            <div>

                {isLoading ? elements?.map((_, index) => (
                    <div key={index} className="grid my-10 grid-cols-9 font-medium ">
                        <div className="flex relative items-center col-span-4 gap-2">
                            <div className="skeleton w-10 h-10 "></div>
                            <h1 className="skeleton w-52 h-6 rounded-sm col-span-2"></h1>
                            <h1 className="text-red-500 text-xl -top-1 absolute"></h1>
                        </div>
                        <h1 className="col-span-2 skeleton w-20 h-6 rounded-sm"></h1>
                        <div className="col-span-2">
                            <h1 className="skeleton w-5 h-5"></h1>
                        </div>
                        <div className="skeleton w-16 h-10 rounded-md"></div>
                    </div>
                )) : ""}
                <div className="">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    userList?.map((item, index) => <tr>
                                        <th>{index + 1}</th>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td onClick={() => handleMakeAdmin(item?.email)} title='click to make admin'> <button className='btn btn-primary max-w-48 px-2 w-full btn-md border-none outline-none rounded-md bg-primary ' >{updateLoading ? "Making Admin ..." : item?.role || "Make Admin"}</button></td>
                                    </tr>)
                                }
                               
                                {/* row 3 */}

                            </tbody>
                        </table>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default CustomerList;