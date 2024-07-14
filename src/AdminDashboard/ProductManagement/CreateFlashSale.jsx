import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../redux/api/baseApi';

const CreateFlashSale = () => {
    //   const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [endTime, setEndTime] = useState('');

    const { data: products } = useGetProductsQuery()


    const handleProductSelection = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const products = selectedProducts
        const startTime = e.target.startTime.value
        const endTime = e.target.endTime.value
        const discount = e.target.discount.value

        if(products?.length == 0 ){
            return setErrorText("No product has been chosen . please select products to create flashSale")
        }
        setErrorText("")

        const object = {    
            products, startTime, endTime, discount
        }

        console.log(object)


        //     const flashSaleData = {
        //       products: selectedProducts,
        //       startTime,
        //       endTime,
        //     };
        //     // Send data to the backend
        //     fetch('/api/flashsales', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(flashSaleData),
        //     })
        //       .then(response => response.json())
        //       .then(data => console.log('Flash sale created:', data))
        //       .catch(error => console.error('Error creating flash sale:', error));
    };

    console.log(selectedProducts)

    return (
        <div className="mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Flash Sale</h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex justify-center gap-10   '>
                    <div className='flex-1 space-y-6'>
                        <label htmlFor='startTime' className="block mt-4">
                            <span className="text-gray-700">Start Time</span>
                            <input
                                type="datetime-local"
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                                name='startTime'
                                required

                            />
                        </label>
                        <label className="block mt-4">
                            <span className="text-gray-700">End Time</span>
                            <input
                                type="datetime-local"
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                                name='endTime'
                                required
                            />

                        </label>
                        <label className="block mt-4">
                            <span className="text-gray-700">Discount</span>
                            <input
                                type="number" min="01" max="100"
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                                name='discount' required />
                        </label>
                        <button type="submit" className="btn w-full  btn-primary bg-primary my-4 rounded-sm border-none">
                    Create Flash Sale
                </button>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-normal  mb-2">Select Products</h2>
                        <div className="max-h-80 overflow-y-auto border border-gray-300 p-2 rounded-md">
                            {products?.map((product) => (
                                <div key={product?._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        // id={`product-${product?._id}`}
                                        className="mr-2"
                                        // checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleProductSelection(product?._id)}
                                    />
                                    <label htmlFor={`product-${product.id}`} className="text-gray-700">
                                        {product?.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

               <div className='text-primary mt-2' >
               {
                    errorText
                }
               </div>
               
            </form>
        </div>
    );
};

export default CreateFlashSale;
