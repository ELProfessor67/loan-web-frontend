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
    const [accountNumber, setaccountNumber] = useState('');
    const [routingNumber, setroutingNumber] = useState('');
    const [bankName, setbankName] = useState('');
    const [bankAddress, setbankAddress] = useState('');
    const [contactName, setContactName] = useState('');

    const queryClient = useQueryClient()


    const [loading, setLoading] = useState(false);





    const handleAddVendor = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('state', state);
            formData.append('phone', phone);
            formData.append('accountNumber', accountNumber);
            formData.append('routingNumber', routingNumber);
            formData.append('bankName', bankName);
            formData.append('bankAddress', bankAddress);
            formData.append('contactName', contactName);

            const { data } = await addUserMemberRequest(formData);
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
            setaccountNumber('')
            setroutingNumber('')
            setbankAddress('')
            setbankName('')
            setContactName('')


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
                                placeholder="Enter Vendor Name"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="email"
                                placeholder="Enter Vendor Email"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="phone"
                                placeholder="Enter Vendor Phone"
                                required={true}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Vendor Contact Name"
                                required={true}
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                            />

                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Vendor Address"
                                required={true}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <div className='flex flex-col md:flex-row md:gap-2'>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                    type="text"
                                    placeholder="Enter Vendor State"
                                    required={true}
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                    type="text"
                                    placeholder="Enter Vendor City"
                                    required={true}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>





                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Vendor Bank Account Number"
                                required={true}
                                value={accountNumber}
                                onChange={(e) => setaccountNumber(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Vendor Bank Routing Number"
                                required={true}
                                value={routingNumber}
                                onChange={(e) => setroutingNumber(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Vendor Bank Name"
                                required={true}
                                value={bankName}
                                onChange={(e) => setbankName(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Vendor Bank Address"
                                required={true}
                                value={bankAddress}
                                onChange={(e) => setbankAddress(e.target.value)}
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