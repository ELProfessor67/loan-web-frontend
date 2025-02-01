import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'


const StateRejectDialog = ({ open, onClose,handleReject,rloading,message,setMessage }) => {
    
    return (
        <div className={`fixed px-4 py-4  top-0 left-0 right-0 bottom-0 z-[10000] bg-black/10 ${open ? 'block' : 'hidden'}`} style={{ alignContent: 'center' }}>
            <div className='max-w-[40rem] relative px-3 py-5  bg-white shadow-xl mx-auto rounded-md'>
                <button className='text-black/90 text-3xl absolute right-4 top-4' onClick={onClose}>
                    <IoMdClose />
                </button>

                <div className='mt-5'>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Add Message here...' className='w-full border border-gray-400 rounded-md p-3 h-[12rem]'/>
                    <div className='w-full flex items-center justify-between mt-10 px-5'>
                        <button className='py-2 px-4 rounded-md text-white bg-gray-400' onClick={onClose}>Cancel</button>
                        <button className='py-2 px-4 rounded-md text-white bg-red-600' onClick={handleReject} disabled={rloading}>{rloading ? 'Loading...' : 'Reject'}</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default StateRejectDialog