import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Stepper from './Stepper';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { addUserCompanyRequest, addUserMemberRequest, addVendorRequest, getServiceChargeRequest } from '@/http';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { UserContext } from '@/providers/UserProvider';

const CompanyAdd = ({ open, onClose }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [accountNumber, setaccountNumber] = useState('');
    const [routingNumber, setroutingNumber] = useState('');
    const [bankName, setbankName] = useState('');
    const [bankAddress, setbankAddress] = useState('');


    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user && user.company){
            setName(user.company.name)
            setAddress(user.company.address)
            setemail(user.company.email)
            setphone(user.company.phone)
            setaccountNumber(user.company.accountNumber)
            setroutingNumber(user.company.routingNumber)
            setbankName(user.company.bankName)
            setbankAddress(user.company.bankAddress)
        }
    },[user])


    const queryClient = useQueryClient()


    const [loading, setLoading] = useState(false);





    const handleAddCompany = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name', name);
            formData.append('address', address);
            formData.append('phone',phone);
            formData.append('accountNumber',accountNumber);
            formData.append('routingNumber',routingNumber);
            formData.append('bankName',bankName);
            formData.append('bankAddress',bankAddress);
            formData.append('email',email);


            const { data } = await addUserCompanyRequest(formData);
            queryClient.invalidateQueries('usercompany');
            setLoading(false)
            onClose()
            toast.success(data.message);
 

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
                <div className='h-[20rem] md:h-[25rem] mt-4 overflow-y-auto'>
                    <div className="w-full  mt-8" >

                        <div className="mx-auto max-w-xl">
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                type="text"
                                placeholder="Company name"
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
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Company Address"
                                required={true}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="phone"
                                placeholder="Enter Phone"
                                required={true}
                                value={phone}
                                onChange={(e) => setphone(e.target.value)}
                            />

                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Bank Account Number"
                                required={true}
                                value={accountNumber}
                                onChange={(e) => setaccountNumber(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Bank Routing Number"
                                required={true}
                                value={routingNumber}
                                onChange={(e) => setroutingNumber(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Bank Name"
                                required={true}
                                value={bankName}
                                onChange={(e) => setbankName(e.target.value)}
                            />
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                type="text"
                                placeholder="Enter Bank Address"
                                required={true}
                                value={bankAddress}
                                onChange={(e) => setbankAddress(e.target.value)}
                            />

                            <button onClick={handleAddCompany} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <FaArrowRight />
                                <span className="ml-3"> {user?.company ? 'Update': 'Add' } </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompanyAdd