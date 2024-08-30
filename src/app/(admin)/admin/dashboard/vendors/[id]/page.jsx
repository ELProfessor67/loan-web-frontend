'use client'
import Loader from '@/components/Loader';
import RejectDialog from '@/components/RejectDialog';
import { BACKEND_URL } from '@/contants/URLS';
import { getVendorDetailRequest, updateVednorRequest } from '@/http';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const page = ({ params }) => {
    const [aloading, setaLoading] = useState(false);
    const [rloading, setrLoading] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [message, setMessage] = useState('')
    const { id } = params;

    const getVendorDetail = async () => {
        try {
            const { data } = await getVendorDetailRequest(id);
            return data.vendor
        } catch (error) {
            return null
        }
    }
    const { data, isLoading } = useQuery(id, getVendorDetail)



    const handleApprove = async () => {
        try {
            setaLoading(true)
            const formData = new FormData();
            formData.append('status','complete');
            const {data} = await updateVednorRequest(formData,id)
            toast.success(data.message);
            setaLoading(false)
        } catch (error) {
            console.log(error.message)
            setaLoading(false)
            toast.error(error?.response?.data?.message)
           
        }
    }


    const handleReject = async () => {
        try {
            setrLoading(true)
            const formData = new FormData();
            formData.append('status','reject');
            formData.append('message',message);
            const {data} = await updateVednorRequest(formData,id)
            toast.success(data.message);
            setrLoading(false)
            setRejectOpen(false)
        } catch (error) {
            console.log(error.message)
            setrLoading(false)
            toast.error(error?.response?.data?.message)
           
        }
    }
    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg">
                    {
                        isLoading &&
                        <div className='w-full h-screen flex items-center justify-center'>
                            <Loader />
                        </div>
                    }

                    {
                        !isLoading &&
                        <>
                           
                            <div className="w-full  mt-8 max-w-4xl mx-auto" >
                                    <h1>User Info</h1>
                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Name
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.name}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Email
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.email}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Address
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.address}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                City
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.city}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                State
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.state}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Phone
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.phone}
                                            />
                                        </div>
                                    </div>


                                    <h1 className='mt-5'>Amounts and Attechments</h1>


                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Amout
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.amount}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Backoffice
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.backoffice.amount}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Backoffice Attachment
                                            </label>
                                            <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.backoffice.file?.replace(/\\/g, '/')}`}
                                                className="w-full text-black cursor-pointer px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                               
                                            >
                                                Click To View
                                            </a>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                            Freight
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.freight.amount}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                            Freight Pallets
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.freight.amount}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Freight Attachment
                                            </label>
                                            <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.freight.file?.replace(/\\/g, '/')}`}
                                                className="w-full text-black cursor-pointer px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                               
                                            >
                                                Click To View
                                            </a>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Sales
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.sales.amount}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Sales Attachment
                                            </label>
                                            <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.sales.file?.replace(/\\/g, '/')}`}
                                                className="w-full text-black cursor-pointer px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                               
                                            >
                                                Click To View
                                            </a>
                                        </div>
                                    </div>
                                    {
                                        data?.warehouse.amount != 0 &&
                                        <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                            <div className='flex flex-1 flex-col gap-1'>
                                                <label>
                                                Warehouse
                                                </label>
                                                <input
                                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                    readOnly={true}
                                                    value={data?.warehouse.amount}
                                                />
                                            </div>
                                            <div className='flex flex-1 flex-col gap-1'>
                                                <label>
                                                Warehouse Attachment
                                                </label>
                                                <a
                                                    target="_zeeshan"
                                                    href={`${BACKEND_URL}/${data?.warehouse.file?.replace(/\\/g, '/')}`}
                                                    className="w-full text-black cursor-pointer px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                
                                                >
                                                    Click To View
                                                </a>
                                            </div>
                                        </div>
                                    }
                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Profit
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.profit.amount}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Profit Percentage
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={Number(data?.profit.amount)/Number(data?.sales.amount)}
                                            />
                                        </div>
                                    </div>
                            </div>
                            <div className='w-full flex items-center justify-between mt-10'>
                                <button className='py-2 px-4 rounded-md text-white bg-red-600' onClick={() => setRejectOpen(true)}>Reject</button>
                                <button className='py-2 px-4 rounded-md text-white bg-green-600' onClick={handleApprove} disabled={aloading}>{aloading ? 'Loading...' : 'Approve'}</button>
                            </div>
                        </>
                    }
                </div>
            </div>
            <RejectDialog open={rejectOpen} onClose={() => setRejectOpen(false)} rloading={rloading} handleReject={handleReject} message={message} setMessage={setMessage}/>
        </>

    )
}

export default page