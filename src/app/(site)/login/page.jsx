'use client'
import { loginRequest } from '@/http';
import { UserContext } from '@/providers/UserProvider';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {isAuth} = useContext(UserContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const formData = new FormData();

      formData.append('email',email);
      formData.append('password',password);

      const {data} = await loginRequest(formData);
      toast.success(data.message);
      router.push('/verify-otp');
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(isAuth){
      router.push('/dashboard')
    }
  },[isAuth])
  return (
    <section className='pt-[120px] pb-10'>
      <>
  
        <div className="min-h-screen  text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 p-6 sm:p-12 flex items-center justify-center">
             
              <div className="mt-12 flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl md:text-4xl font-extrabold">Sign In</h1>
                <div className="w-full flex-1 mt-8">
                  <form className="mx-auto max-w-md" onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      type="password"
                      placeholder="Password"
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit' disabled={loading} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                      <span className="ml-3">{loading ? 'Loading' : 'Sign In'}</span>
                    </button>
                    <p className='font-light mt-2'>
                    If you don't have account <Link href={'/register'} className='!text-foreground-1 font-normal'>Sign Up</Link>
                   </p>
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