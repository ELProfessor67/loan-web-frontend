import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'


const ViewReason = ({ open, onClose,message }) => {
    
    return (
        <div className={`fixed px-4 py-4  top-0 left-0 right-0 bottom-0 z-[10000] bg-black/10 ${open ? 'block' : 'hidden'}`} style={{ alignContent: 'center' }}>
            <div className='max-w-[40rem] relative px-3 py-5  bg-white shadow-xl mx-auto rounded-md'>
                <button className='text-black/90 text-3xl absolute right-4 top-4' onClick={onClose}>
                    <IoMdClose />
                </button>

                <div className='mt-1'>
                    <h1>Rejection Reason</h1>
                    <p className='text-[16px] leading-[24px] text-black/80 mt-4'>{message}</p>
                </div>
                
            </div>
        </div>
    )
}

export default ViewReason