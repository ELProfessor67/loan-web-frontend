'use client';
import AddVendorDialog from '@/components/AddVendorDialog';
import { getAllVendorRequest, getUserVendorRequest } from '@/http';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';


function TotalCostCalulator(deal){
    const totalCost = Number(deal?.mdse?.amount || 0) + Number(deal?.freight?.amount || 0) + Number(deal?.freight2?.amount || 0) + Number(deal?.warehouse?.amount || 0) + Number(deal?.misc?.amount || 0);
    return totalCost;
}


const Tags = [
    ['Pending','pending'],
    ['Complete','complete'],
    ['Rejected','reject'],
]

const page = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [status, setStatus] = useState('pending');

    const getAllVendors = async () => {
        try {
            const {data} = await getAllVendorRequest();
            return data.vendors;
        } catch (error) {
            return []
        }
    }
    const {data, isLoading} = useQuery('allvendor', getAllVendors)
    
    
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
                            <h1>Vendors Requests</h1>
                            
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
                                               Deal Id
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Total Cost
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Revenue/Sales
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Profit
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Status
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !isLoading &&
                                            data.length != 0 && getDataByStatus(status)?.map((vendor) => (
                                                <tr class="bg-white border-b  ">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                        {vendor?.dealId}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        ${TotalCostCalulator(vendor)}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        ${vendor.sales.amount}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        ${vendor.profit.amount}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        
                                                        <span className={`py-2 px-4 rounded-3xl text-white ${vendor.status == 'pending' ? 'bg-gray-600' : vendor.status == 'complete' ? 'bg-green-600': 'bg-red-600'}`}>{vendor.status}</span>
                                                        
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        
                                                       <Link href={`/admin/dashboard/vendors/${vendor._id}`} className='text-blue-500 hover:text-blue-100'>
                                                       View
                                                       </Link>
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
        </>

    )
}

export default page