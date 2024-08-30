'use client';
import AddVendorDialog from '@/components/AddVendorDialog';
import { getUserVendorRequest } from '@/http';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';

const page = () => {
  const [vendor, setVendor] = useState();


  const getVendors = async () => {
    try {
      const { data } = await getUserVendorRequest();
      return data.vendors;
    } catch (error) {
      return []
    }
  }
  const { data, isLoading } = useQuery('uservendor', getVendors);



  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg ">
          <div className='min-h-screen'>
            <div className='flex items-center justify'>
              <h1>Dashboard</h1>
            </div>

            <div className='mt-20'>
              <div className='flex items-center justify-center flex-wrap gap-4'>

                <div className='w-[18rem] h-[13rem] bg-blue-1 rounded-md flex items-center justify-center flex-col'>
                  <h2 className='text-white/90'>Total Vendor</h2>
                  <h1 className='text-white text-7xl'>{data?.length}</h1>
                </div>
                <div className='w-[18rem] h-[13rem] bg-orange-1 rounded-md flex items-center justify-center flex-col'>
                  <h2 className='text-white/90'>Pending Vendor</h2>
                  <h1 className='text-white text-7xl'>{data?.filter(v => v.status == 'pending').length}</h1>
                </div>
                <div className='w-[18rem] h-[13rem] bg-yellow-1 rounded-md flex items-center justify-center flex-col'>
                  <h2 className='text-white/90'>Complete Vendor</h2>
                  <h1 className='text-white text-7xl'>{data?.filter(v => v.status == 'complete').length}</h1>
                </div>
                <div className='w-[18rem] h-[13rem] bg-purple-1 rounded-md flex items-center justify-center flex-col'>
                  <h2 className='text-white/90'>rejeted Vendor</h2>
                  <h1 className='text-white text-7xl'>{data?.filter(v => v.status == 'reject').length}</h1>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default page