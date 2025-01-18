'use client'
import { updateUserRequest } from '@/http';
import { UserContext } from '@/providers/UserProvider';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
    const { user, setIsAuth } = useContext(UserContext);
    const [serviceCharge, setServiceCharge] = useState(0);
    const [serviceCharge2, setServiceCharge2] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setServiceCharge(user?.adminServiceCharge);
        setServiceCharge2(user?.adminServiceCharge2);
    }, [user]);


    const handleUpdate = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("adminServiceCharge", serviceCharge);
            formData.append("adminServiceCharge2", serviceCharge2);
            const res = await updateUserRequest(formData);
            toast.success('Service Charge Change Successfully');
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }


    return (
        <div className="p-4 sm:ml-64 relative ">
            <div className="p-4 rounded-lg h-screen flex items-center justify-center mx-auto">
                <div className='p-4 bg-white shadow-md rounded-md w-[40rem]'>
                    <h2>Service Charge</h2>



                    <div className='space-y-2'>
                        <label>Service Charge 1</label>
                        <input
                            className="w-full py-3 px-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                            type="number"
                            required={true}
                            value={serviceCharge}
                            placeholder='Service charge in percentage'
                            onChange={(e) => setServiceCharge(e.target.value)}

                        />
                    </div>


                    <div className='space-y-2'>
                        <label>Service Charge 2</label>
                        <input
                            className="w-full py-3 px-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                            type="number"
                            required={true}
                            value={serviceCharge2}
                            placeholder='Service charge in percentage'
                            onChange={(e) => setServiceCharge2(e.target.value)}

                        />
                    </div>

                    <button type='submit' onClick={handleUpdate} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">

                        <span className="ml-3">{loading ? "Loading...": "Update"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page