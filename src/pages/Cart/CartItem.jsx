import React, { useState } from 'react';
import { TiDelete } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { useUpdateCartMutation } from '../../redux/api/baseApi';

const CartItem = ({ item }) => {

    const [updateCart, { data: updateStatus }] = useUpdateCartMutation()
    const [deleteCart, { }]

    // console.log(cartData)



    const handleUpdateCart = (e, data) => {

        const id = data?._id
        console.log(id, data)

        const updatedItem = { quantity: parseInt(e.target.value) };
        console.log("Updating item:", updatedItem);

        updateCart({ id, data: updatedItem })

    };


    


    return (
        <div className="grid grid-cols-9  font-medium my-16">
            <div className="flex relative items-center col-span-4  gap-2">
                <div>
                    <img src={item?.imageUrl} className="w-10  p-0" alt="" />
                </div>
                <h1 className="max-w-72 col-span-2">
                    {" "}
                    {item?.title}
                </h1>
                <h1 className="text-red-500 text-xl   -top-1 absolute"><TiDelete />
                </h1>

            </div>
            <h1 className="col-span-2">BDT {item?.price}</h1>
            <div className="col-span-2">
                <input
                    onChange={(e) => handleUpdateCart(e, item)}
                    type="number"
                    defaultValue={item?.quantity}
                    className="input w-16 input-bordered"
                />
            </div>
            <h1 className="">BDT {parseInt(item?.price) * (item?.quantity)}</h1>

        </div>
    );
};

export default CartItem;