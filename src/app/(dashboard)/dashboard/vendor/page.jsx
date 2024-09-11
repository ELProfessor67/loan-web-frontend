'use client';
import AddMembers from '@/components/AddMembers';
import AddVendorDialog from '@/components/AddVendorDialog';
import CompanyAdd from '@/components/CompanyAdd';
import ViewReason from '@/components/ViewResong';
import { getAllCompanyRequest, getUserMemberRequest, getUserVendorRequest } from '@/http';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';



const Tags = [
    ['All','all'],
    ['Pending','pending'],
    ['Complete','complete'],
    ['Rejected','reject'],
]

const page = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState('all');
    const [members, setMembers] = useState([]);
    const [memberOpen,setMemberOpen] = useState(false);
    const [companyOpen,setCompanyOpen] = useState(false);


    const getMembers = async () => {
        try {
            const {data} = await getUserMemberRequest();
            return data.members;
        } catch (error) {
            return []
        }
    }
    const getCompany = async () => {
        try {
            const {data} = await getAllCompanyRequest();
  
            return data.companies;
        } catch (error) {
            return []
        }
    }

    const getVendors = async () => {
        try {
            const {data} = await getUserVendorRequest();
            return data.vendors;
        } catch (error) {
            return []
        }
    }
    const {data, isLoading} = useQuery('uservendor', getVendors)
    const {data:mdata, isLoading:misLoading} = useQuery('usermember', getMembers)
    const {data:cdata, isLoading:cisLoading} = useQuery('usercompany', getCompany)
  
    
    
    const getDataByStatus = (status) => {
        if(status == 'all') return data
        if(status == 'pending') return data.filter(v => v.status == 'pending');
        if(status == 'complete') return data.filter(v => v.status == 'complete');
        if(status == 'reject') return data.filter(v => v.status == 'reject');
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg ">
                    <div className='min-h-screen'>
                        <div className='flex items-center justify-between'>
                            <h1>Vendor</h1>
                            <div className='flex flex-row flex-wrap gap-4'>
                                <div className="header-right-btn f-right d-lg-block">
                                    <button className="btn header-btn" onClick={() => setCompanyOpen(true)}>
                                        Add Company
                                    </button>
                                </div>
                                <div className="header-right-btn f-right d-lg-block">
                                    <button className="btn header-btn" onClick={() => setAddOpen(true)}>
                                        Add Deals
                                    </button>
                                </div>
                                <div className="header-right-btn f-right d-lg-block">
                                    <button className="btn header-btn" onClick={() => setMemberOpen(true)}>
                                        Add Vendor
                                    </button>
                                </div>
                            </div>
                           
                        </div>


                        <div className='flex items-center gap-5 mt-24'>
                            {Tags.map(tag => (
                                <button onClick={() => setStatus(tag[1])} className={`py-2 px-4 rounded-3xl text-white ${tag[1] == 'pending' ? 'bg-gray-600' : tag[1] == 'complete' ? 'bg-green-600': tag[1] == 'reject' ? 'bg-red-600' : 'bg-black/50'} ${status == tag[1] ? 'opacity-50' : 'opacity-100'}`}>
                                    {tag[0]}
                                </button>
                            ))}
                        </div>
                        <div className='mt-20'>
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left text-gray-500 ">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                #
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Vendor Name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Amount
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Sales
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Profit
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !isLoading &&
                                            data.length != 0 && getDataByStatus(status)?.map((vendor,i) => (
                                                <tr class="bg-white border-b  " key={vendor._id}>
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                        {i+1}
                                                    </th>
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                        {vendor?.name}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        ${vendor.amount}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        ${vendor.sales.amount}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        ${vendor.profit.amount}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        
                                                        <span className={`py-2 px-4 rounded-3xl text-white ${vendor.status == 'pending' ? 'bg-gray-600' : vendor.status == 'complete' ? 'bg-green-600': 'bg-red-600'}`}>{vendor.status}</span>
                                                        {
                                                            vendor.status == 'reject' &&
                                                            <button className='block text-blue-500 mt-3' onClick={() => setMessage(vendor.message)}>View Reason</button>
                                                        }
                                    
                                                    </td>

                                                    <td class="px-6 py-4">
                                                        <Link href={`/dashboard/vendor/${vendor._id}`} className='text-blue-500'>View</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        } 
                                    </tbody>
                                    
                                </table>
                                {
                                    !isLoading && getDataByStatus(status).length == 0 &&
                                    <div className='w-full flex items-center justify-center text-3xl py-10'>
                                        No Vendor
                                    </div>
                                }
                               
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <AddVendorDialog open={addOpen} onClose={() => setAddOpen(false)} members={mdata} companies={cdata} setMemberOpen={setMemberOpen}/>
            <ViewReason message={message} open={message} onClose={() => setMessage(null)}/>
            <AddMembers open={memberOpen} onClose={() => setMemberOpen(false)}/>
            <CompanyAdd open={companyOpen} onClose={() => setCompanyOpen(false)} />
        </>

    )
}

export default page