'use client'
import { registerRequest } from '@/http';
import { UserContext } from '@/providers/UserProvider';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {isAuth} = useContext(UserContext)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const formData = new FormData();
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('address',address);
      formData.append('state',state);
      formData.append('city',city);
      formData.append('phone',phone);

      const {data} = await registerRequest(formData);
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
                <h1 className="text-3xl md:text-4xl font-extrabold">Sign Up</h1>
                <form className="w-full  mt-8" onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-md">
                  <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                      type="text"
                      placeholder="Enter your name"
                      required={true}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
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
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      type="text"
                      placeholder="Your Address"
                      required={true}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className='flex flex-col md:flex-row md:gap-2'>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      type="text"
                      placeholder="Your State"
                      required={true}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      type="text"
                      placeholder="Your City"
                      required={true}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    </div>

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                      type="phone"
                      placeholder="Your Phone"
                      required={true}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      <span className="ml-3">{loading ? 'Loading...' : 'Sign Up'} </span>
                    </button>
                    <p className='font-light mt-2'>
                    If you already have account <Link href={'/login'} className='!text-foreground-1 font-normal'>Sign In</Link>
                   </p>
                  </div>
                </form>
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