'use client'
import { addUserBankRequest } from '@/http'
import { UserContext } from '@/providers/UserProvider'
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { toast } from 'react-toastify'

const page = () => {
  const [holderName,setholderName] = useState('')
  const [accountNumber,setaccountNumber] = useState('')
  const [routingNumber,setroutingNumber] = useState('')
  const [bankName,setbankName] = useState('')
  const [accountType,setaccountType] = useState('');

  const {user} = useContext(UserContext);


  useEffect(() => {
    if(user?.bank){
      setholderName(user?.bank?.holderName)
      setaccountNumber(user?.bank?.accountNumber)
      setroutingNumber(user?.bank?.routingNumber)
      setbankName(user?.bank?.bankName)
      setaccountType(user?.bank?.accountType)
    }
  },[user]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData();
      formData.append('holderName',holderName)
      formData.append('accountNumber',accountNumber)
      formData.append('routingNumber',routingNumber)
      formData.append('bankName',bankName)
      formData.append('accountType',accountType)

      const {data} = await addUserBankRequest(formData);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <>

      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg ">
          <h1>Bank Details</h1>
          <form className="w-full  mt-14" onSubmit={handleSubmit}>

            <div className="mx-auto max-w-xl">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                type="text"
                placeholder="Holder Name"
                required={true}
                value={holderName}
                onChange={(e) => setholderName(e.target.value)}
                
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                type="text"
                placeholder="Account Number"
                required={true}
                value={accountNumber}
                onChange={(e) => setaccountNumber(e.target.value)}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                type="text"
                placeholder="Rounting Number"
                required={true}
                value={routingNumber}
                onChange={(e) => setroutingNumber(e.target.value)}
              />

              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                type="text"
                placeholder="Bank Name"
                required={true}
                value={bankName}
                onChange={(e) => setbankName(e.target.value)}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                type="text"
                placeholder="Account Type"
                required={true}
                value={accountType}
                onChange={(e) => setaccountType(e.target.value)}
              />


              <button type='submit' className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <FaArrowRight />
                <span className="ml-3">{user?.bank ? "Update": "Add"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default page