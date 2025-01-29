import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify';


const SendMail = ({ open, onClose, message }) => {
    const [loading, setLoading] = useState(false);


    const handleSend= useCallback((e) => {
        e.preventDefault()
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.error("Google Service is busy please try again later");
        },1000);
    },[])
    return (
        <div className={`fixed px-4 py-4  top-0 left-0 right-0 bottom-0 z-[10000] bg-black/10 ${open ? 'block' : 'hidden'}`} style={{ alignContent: 'center' }}>
            <div className='max-w-[40rem] relative px-3 py-5  bg-white shadow-xl mx-auto rounded-md'>
                <button className='text-black/90 text-3xl absolute right-4 top-4' onClick={onClose}>
                    <IoMdClose />
                </button>

                <div className='mt-1'>
                    <h1 className='text-2xl text-center'>Send Mail</h1>
                    <p className='text-[16px] leading-[24px] text-black/80 mt-4'>{message}</p>
                </div>
                <form className="mx-auto max-w-md" onSubmit={handleSend}>
                    <input
                        className="w-full px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        required={true}
                    />
                    <input
                        className="w-full px-2 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                        type="text"
                        placeholder="Subject"
                        required={true}
                    />

                    <textarea
                        className="w-full px-2 py-2 h-[5rem] rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                        type="text"
                        placeholder="Message"
                        required={true}
                    />
                    <button type='submit' disabled={loading} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                        
                        <span className="ml-3">{loading ? 'Loading...' : 'Send Mail'}</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SendMail