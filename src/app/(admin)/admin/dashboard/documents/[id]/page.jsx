'use client'
import Loader from '@/components/Loader';
import RejectDialog from '@/components/RejectDialog';
import StateRejectDialog from '@/components/StateRejectDialog';
import { BACKEND_URL } from '@/contants/URLS';
import { getVendorDetailRequest, updateStateVednorRequest, updateVednorRequest } from '@/http';
import React, { useCallback, useState } from 'react'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';


const RenderRow = ({ state, name, field, handleOnChange }) => {
    return (
        <tr>
            <td className="border p-1 text-sm">{name}</td>
            <td className="border p-1 text-sm">{state?.vendor?.name}</td>
            <td className="border p-1 text-sm">{state?.POnumber}</td>
            <td className="border p-1 text-sm">{state?.amount}</td>

            <td className="border p-1 text-sm">{state?.attach ? <a className="text-blue-500" href={`${BACKEND_URL}/${state?.attach}`}>OPEN</a> : <span className='text-red-500'>No Provider</span>}</td>

            <td className="border p-1 text-sm"> {state?.sign ? <a className="text-blue-500" href={`${BACKEND_URL}/${state?.sign}`}>OPEN</a> : <span className='text-red-500'>No Provider</span>}</td>

            <td className="border p-1 text-sm">{state?.ship?.file ? <a className="text-blue-500" href={`${BACKEND_URL}/${state?.ship?.file}`}>OPEN</a> : <span className='text-red-500'>No Provider</span>}</td>

            <td className="border p-1 text-sm">{state?.recieve?.file ? <a className="text-blue-500" href={`${BACKEND_URL}/${state?.recieve?.file}`}>OPEN</a> : <span className='text-red-500'>No Provider</span>}</td>

            <td className="border p-1 text-sm text-black">
                <select value={state.status} onChange={(e) => handleOnChange(e.target.value,field)}>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                </select>
            </td>
        </tr>
    )
}

const page = ({ params }) => {
    const [aloading, setaLoading] = useState(false);
    const [rloading, setrLoading] = useState(false);
    const [messageInputOpen, setMessageInputOpen] = useState(null);
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



    const handleChangeStatus = async (status,state,message) => {
        try {
            setaLoading(true)
            const formData = new FormData();
            formData.append('status', status);
            formData.append('state', state);
            formData.append('message', message);
            const { data } = await updateStateVednorRequest(formData, id)
            toast.success(data.message);
            
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }finally{
            getVendorDetail()
            setMessageInputOpen(null);
            setaLoading(false)
        }
    }


   


    const handleOnChange = useCallback((value, state) => {
        if(value == "rejected"){
            setMessageInputOpen({value,state});
            return
        }
        handleChangeStatus(value,state,'');
    }, []);
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
                        !isLoading && data &&
                        <>
                            <div>
                                <h2 className='text-3xl'>Deal ID: {data.dealId}</h2>
                                <h2 className='text-3xl'>Borrower Name: {data.owner.name}</h2>
                                <h2 className='text-3xl'>Address: {data.owner.address}</h2>
                            </div>


                            <div class="relative overflow-x-auto mt-10" style={{ marginTop: "5rem" }}>
                                <table class="w-full text-sm text-left text-gray-500 ">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Vendor Type
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Vendor Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                PO Number
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Amount
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Attchment
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Sign Attachment
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Shipped Attachment
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Received Attachment
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.mdse?.amount &&
                                            <RenderRow state={data?.mdse} name={"MDSE"} field={'mdse'} handleOnChange={handleOnChange} />
                                        }
                                        {
                                            data?.freight?.amount &&
                                            <RenderRow state={data?.freight} name={"freight"} field={'freight'} handleOnChange={handleOnChange} />
                                        }
                                        {
                                            data?.freight2?.amount &&
                                            <RenderRow state={data?.freight2} name={"freight2"} field={'freight2'} handleOnChange={handleOnChange} />
                                        }
                                        {
                                            data?.warehouse?.amount &&
                                            <RenderRow state={data?.warehouse} name={"warehouse"} field={'warehouse'} handleOnChange={handleOnChange} />
                                        }
                                        {
                                            data?.misc?.amount &&
                                            <RenderRow state={data?.misc} name={"misc"} field={'misc'} handleOnChange={handleOnChange} />
                                        }


                                    </tbody>

                                </table>
                                {
                                    !isLoading && !data &&
                                    <div className='w-full flex items-center justify-center text-3xl py-10'>
                                        No Vendor
                                    </div>
                                }

                            </div>
                        </>
                    }
                    <StateRejectDialog open={!!messageInputOpen} onClose={() => setMessageInputOpen(null)} setMessage={setMessage} message={message} handleReject={() => handleChangeStatus(messageInputOpen?.value, messageInputOpen.state,message)} rloading={aloading}/>
                </div>
            </div>

        </>

    )
}

export default page