'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/providers/UserProvider';
import { verifyOTPRequest } from '@/http';

const page = () => {
    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser, setIsAuth } = useContext(UserContext);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const formData = new FormData();
            formData.append('OTP', OTP);

            const { data } = await verifyOTPRequest(formData);
            setUser(data.user)
            setIsAuth(true)
            setLoading(false)
            toast.success(data.message);
            router.push('/dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error?.message);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        }

    }

    return (
        <section className='pt-[120px] pb-10'>
            <>
                
                <div className="min-h-screen  text-gray-900 flex justify-center">
                    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                        <div className="lg:w-1/2 p-6 sm:p-12 flex items-center justify-center">

                            <div className="mt-12 flex flex-col items-center justify-center w-full">
                                <h1 className="text-3xl md:text-4xl font-extrabold">Verify OTP</h1>
                                <div className="w-full flex-1 mt-8">
                                    <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
                                        <div className='flex items-center justify-center'>
                                            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure inputClassName="border border-black !w-[4rem] !h-[4rem]" />
                                        </div>
                                        <button className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg
                                                className="w-6 h-6 -ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy={7} r={4} />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">Verify</span>
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                            <div
                                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                                style={{
                                    backgroundImage:
                                        'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </>



        </section>
    )
}

export default page