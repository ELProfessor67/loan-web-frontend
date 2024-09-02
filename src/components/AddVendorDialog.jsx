import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Stepper from './Stepper';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { addVendorRequest, getServiceChargeRequest } from '@/http';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const AddVendorDialog = ({ open, onClose,members }) => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [backofficeAmount, setbackofficeAmount] = useState('');
    const [freightAmount, setfreightAmount] = useState('');
    const [freightPallets, setfreightPallets] = useState('');
    const [salesAmount, setsalesAmount] = useState('');
    const [profitAmount, setprofitAmount] = useState('');
    const [warehouseAmount, setwarehouseAmount] = useState('');
    const [backoffice, setbackoffice] = useState(null)
    const [freight, setfreight] = useState(null)
    const [sales, setsales] = useState(null)
    const [warehouse, setwarehouse] = useState(null)
    const [serviceCharge, setServiceCharge] = useState(200);
    const queryClient = useQueryClient()
   

    const [loading, setLoading] = useState(false);

    const getServiceCharge = async () => {
        try {
            const {data} = await getServiceChargeRequest()
            setServiceCharge(data.serviceCharge);
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getServiceCharge()
    },[])

    useEffect(() => {
        // profit = Sales-freight-service charges-backofficd-vendor amount
        const amount2 = Number(amount) || 0;
        const sales = Number(salesAmount) || 0;
        const freight = Number(freightAmount) || 0;
        const serviceCharge2 = Number(serviceCharge) || 0;
        const backoffice = Number(backofficeAmount) || 0;
        const profit = sales-freight-serviceCharge2-backoffice-amount2;
        setprofitAmount(profit)
    },[salesAmount,amount,backofficeAmount,freightAmount])



    const handleAddVendor = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('address',address);
            formData.append('city',city);
            formData.append('state',state);
            formData.append('phone',phone);
            formData.append('amount',amount);
            formData.append('backofficeAmount',backofficeAmount);
            formData.append('freightAmount',freightAmount);
            formData.append('freightPallets',freightPallets);
            formData.append('salesAmount',salesAmount);
            formData.append('profitAmount',profitAmount);
            if(warehouseAmount){
                formData.append('warehouseAmount',warehouseAmount);
                formData.append('warehouse',warehouse);
            }else{
                formData.append('warehouseAmount',0);
            }
            formData.append('backoffice',backoffice);
            formData.append('freight',freight);
            formData.append('sales',sales);

            const {data} = await addVendorRequest(formData);
            queryClient.invalidateQueries('uservendor');
            setLoading(false)
            onClose()
            toast.success(data.message);
            setName('')
            setEmail('')
            setAddress('')
            setCity('')
            setState('')
            setPhone('')
            setAmount('')
            setbackofficeAmount('')
            setfreightAmount('')
            setfreightPallets('')
            setsalesAmount('')
            setprofitAmount('')
            setfreight('')
            setbackoffice('')
            setsales('')
            setwarehouse('');

        } catch (error) {
            setLoading(false)
            console.error(error.message);
            onClose()
            toast.error(error?.response?.data?.message);

        }
    }

    const handleNameChange = e => {
        const name = e.target.value; 
        const member = members?.find(m => m.name == name);
        if(member){
            setEmail(member.email)
            setAddress(member.address)
            setCity(member.city)
            setState(member.state)
            setPhone(member.phone)
        }
        setName(name)
    }

    const handleAttechmentChange = (e, setState) => {
        const file = e.target.files[0];
        setState(file)
    }
    return (
        <div className={`fixed px-4 py-4  top-0 left-0 right-0 bottom-0 z-[10000] bg-black/10 ${open ? 'block' : 'hidden'}`} style={{ alignContent: 'center' }}>
            <div className='max-w-[50rem] relative px-3 py-5  bg-white shadow-xl mx-auto rounded-md'>
                <button className='text-black/90 text-3xl absolute right-4 top-4' onClick={onClose}>
                    <IoMdClose />
                </button>
                <Stepper step={step} />
                <div className='h-[20rem] md:h-[40rem] mt-4 overflow-y-auto'>
                    {
                        step == 0 ?
                            (
                                <div className="w-full  mt-8" >
                                    
                                    <div className="mx-auto max-w-xl">
                                        <input
                                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                                            type="text"
                                            placeholder="Enter your name"
                                            required={true}
                                            value={name}
                                            onChange={(e) => handleNameChange(e)}
                                            list="member"
                                        />
                                        <datalist id='member'>
                                            {
                                                members && members.map(({name,_id},i) => (
                                                    <option key={name}>{name}</option>
                                                ))
                                            }
                                        </datalist>
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


                                        <button onClick={() => setStep(1)} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <FaArrowRight />
                                            <span className="ml-3">Next Step</span>
                                        </button>
                                    </div>
                                </div>
                            ) : step == 1 ?
                                (
                                    <div className="w-full  mt-8" >
                                        
                                        <div className="mx-auto max-w-xl">
                                            <button className='text-2xl text-black mb-3' onClick={() => setStep(0)}>
                                                <FaArrowLeft/>
                                            </button>
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                                type="number"
                                                placeholder="Amount"
                                                required={true}
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                            <div className='flex flex-col md:flex-row md:gap-2'>
                                                <input
                                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                    type="number"
                                                    placeholder="Backoffice Amount"
                                                    required={true}
                                                    value={backofficeAmount}
                                                    onChange={(e) => setbackofficeAmount(e.target.value)}
                                                />
                                                <label htmlFor='backoffice' className="w-full cursor-pointer block customFileInput before:text-[10px] px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4 whitespace-pre">
                                                    {backoffice?.name ? backoffice.name?.slice(0, 20) : 'Backoffice Attechment'}
                                                </label>
                                                <input
                                                    hidden={true}
                                                    id='backoffice'
                                                    type="file"
                                                    required={true}
                                                    onChange={(e) => handleAttechmentChange(e, setbackoffice)}

                                                />
                                            </div>


                                            <div className='flex flex-col md:flex-row md:gap-2'>
                                                <input
                                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                    type="number"
                                                    placeholder="Freight Amount"
                                                    required={true}
                                                    value={freightAmount}
                                                    onChange={(e) => setfreightAmount(e.target.value)}
                                                />
                                                <input
                                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                    type="number"
                                                    placeholder="Pallets Amount"
                                                    required={true}
                                                    value={freightPallets}
                                                    onChange={(e) => setfreightPallets(e.target.value)}
                                                />
                                                <label htmlFor='freight' className="w-full cursor-pointer block customFileInput before:text-[10px] px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4 whitespace-pre">
                                                    {freight?.name ? freight.name?.slice(0, 20) : 'Freight Attechment'}
                                                </label>
                                                <input
                                                    hidden={true}
                                                    id='freight'
                                                    type="file"
                                                    required={true}
                                                    onChange={(e) => handleAttechmentChange(e, setfreight)}

                                                />
                                            </div>


                                            <div className='flex flex-col md:flex-row md:gap-2'>
                                                <input
                                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                    type="number"
                                                    placeholder="Sales Amount"
                                                    required={true}
                                                    value={salesAmount}
                                                    onChange={(e) => setsalesAmount(e.target.value)}
                                                />
                                                <label htmlFor='sales' className="w-full cursor-pointer block customFileInput before:text-[10px] px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4 whitespace-pre">
                                                    {sales?.name ? sales.name?.slice(0, 20) : 'Sales Attechment'}
                                                </label>
                                                <input
                                                    hidden={true}
                                                    id='sales'
                                                    type="file"
                                                    required={true}
                                                    onChange={(e) => handleAttechmentChange(e, setsales)}

                                                />
                                            </div>


                                            <div className='flex flex-col md:flex-row md:gap-2'>
                                                <input
                                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                    type="number"
                                                    placeholder="Warehouse Amount"
                                                    required={false}
                                                    value={warehouseAmount}
                                                    onChange={(e) => setwarehouseAmount(e.target.value)}
                                                />
                                                <label htmlFor='warehouse' className="w-full cursor-pointer block customFileInput before:text-[10px] px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4 whitespace-pre">
                                                    {warehouse?.name ? warehouse.name?.slice(0, 20) : 'Warehouse Attechment'}
                                                </label>
                                                <input
                                                    hidden={true}
                                                    id='warehouse'
                                                    type="file"
                                                    required={Boolean(warehouseAmount)}
                                                    onChange={(e) => handleAttechmentChange(e, setwarehouse)}

                                                />
                                            </div>


                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                type="phone"
                                                placeholder={`Your Profit ${profitAmount  || 0}, ${(profitAmount)/(salesAmount || 0)}%`}
                                                readOnly
                                            />
                                            <input
                                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4"
                                                type="phone"
                                                placeholder={`Service Charge ${serviceCharge}`}
                                                readOnly
                                            />



                                            <button onClick={() => setStep(2)} className="mt-5 tracking-wide font-semibold bg-foreground-1 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <FaArrowRight />
                                                <span className="ml-3">Next Step</span>
                                            </button>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className='h-full w-full flex items-center justify-center flex-col gap-4'>
                                        <div className="header-right-btn f-right d-lg-block">
                                            <button className="btn header-btn" onClick={handleAddVendor} disabled={loading}>
                                               {loading ? 'Loading...' : 'Add Now'} 
                                            </button>
                                        </div>
                                        <button className='text-black' onClick={() => setStep(0)}>Check Again</button>
                                    </div>
                                )
                    }

                </div>
            </div>
        </div>
    )
}

export default AddVendorDialog