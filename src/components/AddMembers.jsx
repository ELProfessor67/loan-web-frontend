import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Stepper from './Stepper';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { addUserMemberRequest, addVendorRequest, getServiceChargeRequest } from '@/http';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const AddMembers = ({ open, onClose }) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    
    const queryClient = useQueryClient()
   

    const [loading, setLoading] = useState(false);





    const handleAddVendor = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('address',address);
            formData.append('city',city);
            formData.append('state',state);
            formData.append('phone',phone);

            const {data} = await addUserMemberRequest(formData);
            queryClient.invalidateQueries('usermember');
            setLoading(false)
            onClose()
            toast.success(data.message);
            setName('')
            setEmail('')
            setAddress('')
            setCity('')
            setState('')
            setPhone('')
           

        } catch (error) {
            setLoading(false)
            console.error(error.message);
            onClose()
            toast.error(error?.response?.data?.message);

        }
    }

  

    return (
        <div className={`fixed px-4 py-4  top-0 left-0 right-0 bottom-0 z-[10000] bg-black/10 ${open ? 'block' : 'hidden'}`} style={{ alignContent: 'center' }}>
            <div className='max-w-[50rem] relative px-3 py-5  bg-white shadow-xl mx-auto rounded-md'>
                <button className='text-black/90 text-3xl absolute right-4 top-4' onClick={onClose}>
                    <IoMdClose />
                </button>
                <div className='h-[20rem] md:h-[40rem] mt-4 overflow-y-auto'>
                <div className="w-full  mt-8" >
                                    
                                    <div className="mx-auto max-w-xl">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                            type="text"
                                            placeholder="Enter your name"
                                            required={true}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                          
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                            type="email"
                                            placeholder="Email"
                                            required={true}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                            type="text"
                                            placeholder="Your Address"
                                            required={true}
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <div className='flex flex-col md:flex-row md:gap-2'>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                type="text"
                                                placeholder="Your State"
                                                required={true}
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                            />
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                type="text"
                                                placeholder="Your City"
                                                required={true}
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>

                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                            type="phone"
                                            placeholder="Your Phone"
                                            required={true}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />


                                        <button onClick={handleAddVendor} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <FaArrowRight />
                                            <span className="ml-3">Add Vendor</span>
                                        </button>
                                    </div>
                                </div>

                </div>
            </div>
        </div>
    )
}

export default AddMembers