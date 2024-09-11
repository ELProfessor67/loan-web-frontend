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
            formData.append('status', 'complete');
            const { data } = await updateVednorRequest(formData, id)
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
            formData.append('status', 'reject');
            formData.append('message', message);
            const { data } = await updateVednorRequest(formData, id)
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

                            {/* <div className="w-full  mt-8 max-w-4xl mx-auto" >
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

                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Type
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.type}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Place Order Number
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.PONumber}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-1 flex-col gap-1 mt-3'>
                                            <label>
                                                Terms
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.terms}
                                            />
                                    </div>


                                    <h1 className='mt-5'>Amounts and Attechments</h1>

                                    <div className='flex flex-1 flex-col gap-1 mt-3'>
                                            <label>
                                                Deal Id
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.dealId}
                                            />
                                    </div>

                                    <div className='flex flex-1 flex-col gap-1 mt-3'>
                                            <label>
                                            copy of purchase order and attach
                                            </label>
                                            <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.copyOrderAttachment?.file?.replace(/\\/g, '/')}`}
                                                className="w-full text-black cursor-pointer px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                               
                                            >
                                                Click To View
                                            </a>
                                        </div>

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
                                    <div className='flex flex-1 flex-col gap-1 mt-3'>
                                            <label>
                                            Freight Company Address
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.freight.companyName}
                                            />
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
                                            Tracking Link
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.freight.trackingLink}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                            Shipped Date
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.freight.shippedDate}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                            Recive Date
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.freight.reciveDate}
                                            />
                                        </div>
                                        
                                    </div>



                                    <div className='flex items-center gap-4 flex-col md:flex-row mt-3'>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Sales Company Name
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.sales.companyName}
                                            />
                                        </div>
                                        <div className='flex flex-1 flex-col gap-1'>
                                            <label>
                                                Sales Company Address
                                            </label>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                                readOnly={true}
                                                value={data?.sales.companyAddress}
                                            />
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
                            </div> */}


                            <div className="p-4 sm:ml-44">
                                <div className="p-4 rounded-lg ">
                                    <div className="max-w-4xl mx-auto p-4 bg-green-50">
                                        <h1 className="text-2xl font-bold text-center text-green-800 mb-4">DEAL {data?.dealId}</h1>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <h2 className="font-bold">{data?.company?.name}</h2>
                                                <p>{data?.company?.address}</p>

                                            </div>
                                        </div>

                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-green-700 text-white text-xs">
                                                    <th className="border border-green-600 p-1">Day of Week</th>
                                                    <th className="border border-green-600 p-1">VENDOR</th>
                                                    <th className="border border-green-600 p-1">AMOUNT</th>
                                                    <th className="border border-green-600 p-1">SHIP DATE BY VENOR</th>
                                                    <th className="border border-green-600 p-1">RECIEVED DATE WHSE</th>
                                                    <th className="border border-green-600 p-1">RECIEVED BY SALES</th>
                                                    <th className="border border-green-600 p-1">Unpaid Leave</th>
                                                    <th className="border border-green-600 p-1">Other</th>
                                                    <th className="border border-green-600 p-1">TOTAL Hrs</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">VENDOR</td>
                                                    <td className="border border-green-300 p-1">{data?.name}</td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.amount}</td>
                                                    <td className="border border-green-300 p-1">{data?.dealDate}</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1">
                                                        <a
                                                            target="_zeeshan"
                                                            href={`${BACKEND_URL}/${data?.copyOrderAttachment.file?.replace(/\\/g, '/')}`}
                                                            className="cursor-pointer text-blue-500 "
                                                            title="Copy Order Attachment "

                                                        >
                                                            CPA
                                                        </a>
                                                    </td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">FREIGHT</td>
                                                    <td className="border border-green-300 p-1">{data?.freight?.companyName}</td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.freight?.amount}</td>
                                                    <td className="border border-green-300 p-1">
                                                        <a
                                                            target="_zeeshan"
                                                            href={`${BACKEND_URL}/${data?.freight?.shipped?.file?.replace(/\\/g, '/')}`}
                                                            className="cursor-pointer text-blue-500 "
                                                            title="Copy Order Attachment "

                                                        >
                                                            {data?.freight?.shipped?.date}
                                                        </a>
                                                    </td>
                                                    <td className="border border-green-300 p-1">
                                                        <a
                                                            target="_zeeshan"
                                                            href={`${BACKEND_URL}/${data?.freight?.recive?.file?.replace(/\\/g, '/')}`}
                                                            className="cursor-pointer text-blue-500 "
                                                            title="Copy Order Attachment "

                                                        >
                                                            {data?.freight?.recive?.date}
                                                        </a>
                                                    </td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right"> {data?.freight?.amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">WAREHOUSE</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.warehouse?.amount}</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1">
                                                        <a
                                                            target="_zeeshan"
                                                            href={`${BACKEND_URL}/${data?.warehouse?.file?.replace(/\\/g, '/')}`}
                                                            className="cursor-pointer text-blue-500 "
                                                            title="Warehouse Attachment "

                                                        >
                                                            Attachment
                                                        </a>
                                                    </td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.warehouse?.amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">SALES</td>
                                                    <td className="border border-green-300 p-1">{data?.sales?.companyName}</td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.sales?.amount}</td>
                                                    <td className="border border-green-300 p-1">
                                                        <a
                                                            target="_zeeshan"
                                                            href={`${BACKEND_URL}/${data?.freight?.shipped?.file?.replace(/\\/g, '/')}`}
                                                            className="cursor-pointer text-blue-500 "
                                                            title="Copy Order Attachment "

                                                        >
                                                            {data?.freight?.shipped?.date}
                                                        </a>
                                                    </td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.sales?.amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">SET AMOUT PAID</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right">3,000.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">OROFIT</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.profit?.amount}</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right">{data?.profit?.amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">#VALUE!</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1"></td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-green-100">
                                                    <td className="border border-green-300 p-1 font-bold">Total Hrs:</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">{Number(data?.amount || 0) + Number(data?.freight?.amount || 0) + Number(data?.sales?.amount || 0) + Number(data?.warehouse?.amount || 0) + Number(data?.profit?.amount || 0)}</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right font-bold">{Number(data?.amount || 0) + Number(data?.freight?.amount || 0) + Number(data?.sales?.amount || 0) + Number(data?.warehouse?.amount || 0) + Number(data?.profit?.amount || 0)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">Rate/Hour:</td>
                                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                                    <td className="border border-green-300 p-1 text-right">23.00</td>
                                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1"></td>
                                                </tr>
                                                <tr>
                                                    <td className="border border-green-300 p-1 font-bold">Total Pay:</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">#########</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">#########</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                                    <td className="border border-green-300 p-1 text-right font-bold">#########</td>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        <div className="mt-4 text-sm">
                                            <p>Total Hours Reported: 74,159.00</p>
                                            <p>Total Pay: #########</p>
                                        </div>
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
            <RejectDialog open={rejectOpen} onClose={() => setRejectOpen(false)} rloading={rloading} handleReject={handleReject} message={message} setMessage={setMessage} />
        </>

    )
}

export default page