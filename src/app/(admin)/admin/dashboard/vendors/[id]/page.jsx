'use client'
import Loader from '@/components/Loader';
import RejectDialog from '@/components/RejectDialog';
import { BACKEND_URL } from '@/contants/URLS';
import { getVendorDetailRequest, updateVednorRequest } from '@/http';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';



const renderRow = (
    vendorType,

    state,
    setState
) => (
    <tr key={vendorType} className={`border-b ${vendorType === 'SALES' || vendorType === 'OROFIT' ? 'bg-green-100' : 'bg-white'}`}>
        <td className="border-r p-1 text-sm">{vendorType}</td>
        <td className="border-r p-1 text-sm">
            {state?.vendor?.name}
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.POnumber} />
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" value={state?.amount} />
        </td>
        <td className="border-r p-1 text-sm">
            {state?.attach && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.attach}`}>OPEN</a>}
        </td>
        <td className="border-l p-1 text-sm">
            {state?.sign && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.sign}`}>OPEN</a>}

        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.ship?.date} />
        </td>
        <td className="border-r p-1 text-sm">
            {state?.ship?.file && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.ship?.file}`}>OPEN</a>}
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.recieve?.date} />
        </td>

        <td className="border-r p-1 text-sm">
            {state?.recieve?.file && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.recieve?.file}`}>OPEN</a>}

        </td>

        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.tracking?.number} />
        </td>
        <td className="p-1 text-sm">
            {state?.tracking?.link && <a className="text-blue-500" href={state?.tracking?.link}>OPEN</a>}

        </td>

        
    </tr>
)

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
                            <div className="p-4">
                                <div className="p-4 rounded-lg ">
                                    <div className='h-fit'>

                                        <div className="p-4 bg-green-50 font-sans text-sm">
                                            <h1 className="text-2xl font-bold mb-4">DEAL {data?.dealId}</h1>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <h2 className="font-bold">{data?.company?.name}</h2>
                                                    <p>{data?.company?.address}</p>


                                                </div>
                                            </div>
                                            <table className="w-full border-collapse border text-xs">
                                                <thead>
                                                    <tr className="bg-green-700 text-white">
                                                        <th className="border p-1">Vendor Type</th>
                                                        <th className="border p-1">Vendor Name</th>
                                                        <th className="border p-1">PO Number</th>
                                                        <th className="border p-1">Amount</th>
                                                        <th className="border p-1">Attach</th>
                                                        <th className="border p-1">Sign Attachment</th>
                                                        <th className="border p-1">Ship Date</th>
                                                        <th className="border p-1">attach</th>
                                                        <th className="border p-1">Received Date</th>
                                                        <th className="border p-1">attach</th>
                                                        <th className="border p-1">Tracking Number</th>
                                                        <th className="border p-1">Tracking Link</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderRow('mdse', data?.mdse)}
                                                    {renderRow('freight', data?.freight)}
                                                    {renderRow('freight2', data?.freight2)}
                                                    {renderRow('warehouse', data?.warehouse)}
                                                    {renderRow('serviceCharge', data?.serviceCharge)}
                                                    {renderRow('serviceCharge2', data?.serviceCharge2)}
                                                    {renderRow('misc', data?.misc)}
                                                    {renderRow('sales', data?.sales)}
                                                    {renderRow('profit', data?.profit)}
                                                    {renderRow('PIE', data?.PIE)}
                                                    {renderRow('Profit Return To Customer', data?.PRC)}

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div >
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