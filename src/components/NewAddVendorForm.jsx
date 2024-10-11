import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Stepper from './Stepper';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { addVendorRequest, getServiceChargeRequest, getUniqueIdRequest } from '@/http';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { userAgent } from 'next/server';
import { UserContext } from '@/providers/UserProvider';

const NewAddVendorForn = ({ open, onClose, members, companies, setMemberOpen ,salescompany}) => {

    const {user} = useContext(UserContext)
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false);
    const [serviceChargeAmount,setServiceChargeAmount] = useState(0);
    const [message,setMessage] = useState(null);
    const [mdse,setmdse] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [freight,setfreight] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [freight2,setfreight2] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [warehouse,setwarehouse] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [serviceCharge,setserviceCharge] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [misc,setmisc] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [sales,setsales] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [profit,setprofit] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [PRC,setPRC] = useState({
        vendor: '',
        POnumber: '',
        amount: '',
        attach: '',
        ship: {
          date: '',
          file: ''
        },
        recieve: {
          date: '',
          file: ''
        },
        tracking: {
          link: '',
          number: ''
        }
    })
    const [dealId, setdealId] = useState(0);

    


    const handleVendorChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                vendor: value
            }
        })
    }
    const handlePONumberChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                POnumber: value
            }
        })
    }
    const handleAmountChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                amount: value
            }
        })
    }
    const handleShipDateChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                ship: {
                    ...prev.ship,
                    date: value
                }
            }
        })
    }
    const handleRecieveDateChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                recieve: {
                    ...prev.recieve,
                    date: value
                }
            }
        })
    }

    const handleTrackingNUmberChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                tracking: {
                    ...prev.tracking,
                    number: value
                }
            }
        })
    }
    const handleTrackingLinkChange = (setState,value) => {
        setState(prev => {
            return {
                ...prev,
                tracking: {
                    ...prev.tracking,
                    link: value
                }
            }
        })
    }


    const handleAttachFileChange = (e,setState) => {
        const [file] = e.target.files;
        setState(prev => {
            return {
                ...prev,
                attach: file
            }
        })
    }
    const handleShipAttachFileChange = (e,setState) => {
        const [file] = e.target.files;
        setState(prev => {
            return {
                ...prev,
                ship: {
                    ...prev.ship,
                    file: file
                }
            }
        })
    }
    const handleRecieveAttachFileChange = (e,setState) => {
        const [file] = e.target.files;
        setState(prev => {
            return {
                ...prev,
                recieve: {
                    ...prev.recieve,
                    file: file
                }
            }
        })
    }



    async function getId() {
        try {
            const { data } = await getUniqueIdRequest();
            setdealId(data.id);
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getId()
    }, [])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            
            formData.append('dealId',dealId);



            formData.append('mdseVendor',mdse.vendor);
            formData.append('mdsePOnumber',mdse.POnumber);
            formData.append('mdseAmount',mdse.amount);
            formData.append('mdseShipDate',mdse.ship.date);
            formData.append('mdseRecieveDate',mdse.recieve.date);
            formData.append('mdseTrackingNumber',mdse.tracking.number);
            formData.append('mdseTracking',mdse.tracking.link);
            formData.append('mdseAttach',mdse.attach);
            formData.append('mdseShipFile',mdse.ship.file);
            formData.append('mdseRecieveFile',mdse.recieve.file);



            formData.append('freightVendor',freight.vendor);
            formData.append('freightPOnumber',freight.POnumber);
            formData.append('freightAmount',freight.amount);
            formData.append('freightShipDate',freight.ship.date);
            formData.append('freightRecieveDate',freight.recieve.date);
            formData.append('freightTrackingNumber',freight.tracking.number);
            formData.append('freightTracking',freight.tracking.link);
            formData.append('freightAttach',freight.attach);
            formData.append('freightShipFile',freight.ship.file);
            formData.append('freightRecieveFile',freight.recieve.file);


            formData.append('freight2Vendor',freight2.vendor);
            formData.append('freight2POnumber',freight2.POnumber);
            formData.append('freight2Amount',freight2.amount);
            formData.append('freight2ShipDate',freight2.ship.date);
            formData.append('freight2RecieveDate',freight2.recieve.date);
            formData.append('freight2TrackingNumber',freight2.tracking.number);
            formData.append('freight2Tracking',freight2.tracking.link);
            formData.append('freight2Attach',freight2.attach);
            formData.append('freight2ShipFile',freight2.ship.file);
            formData.append('freight2RecieveFile',freight2.recieve.file);


            formData.append('warehouseVendor',warehouse.vendor);
            formData.append('warehousePOnumber',warehouse.POnumber);
            formData.append('warehouseAmount',warehouse.amount);
            formData.append('warehouseShipDate',warehouse.ship.date);
            formData.append('warehouseRecieveDate',warehouse.recieve.date);
            formData.append('warehouseTrackingNumber',warehouse.tracking.number);
            formData.append('warehouseTracking',warehouse.tracking.link);
            formData.append('warehouseAttach',warehouse.attach);
            formData.append('warehouseShipFile',warehouse.ship.file);
            formData.append('warehouseRecieveFile',warehouse.recieve.file);


            formData.append('serviceChargeVendor',serviceCharge.vendor);
            formData.append('serviceChargePOnumber',serviceCharge.POnumber);
            formData.append('serviceChargeAmount',serviceCharge.amount);
            formData.append('serviceChargeShipDate',serviceCharge.ship.date);
            formData.append('serviceChargeRecieveDate',serviceCharge.recieve.date);
            formData.append('serviceChargeTrackingNumber',serviceCharge.tracking.number);
            formData.append('serviceChargeTracking',serviceCharge.tracking.link);
            formData.append('serviceChargeAttach',serviceCharge.attach);
            formData.append('serviceChargeShipFile',serviceCharge.ship.file);
            formData.append('serviceChargeRecieveFile',serviceCharge.recieve.file);


            formData.append('miscVendor',misc.vendor);
            formData.append('miscPOnumber',misc.POnumber);
            formData.append('miscAmount',misc.amount);
            formData.append('miscShipDate',misc.ship.date);
            formData.append('miscRecieveDate',misc.recieve.date);
            formData.append('miscTrackingNumber',misc.tracking.number);
            formData.append('miscTracking',misc.tracking.link);
            formData.append('miscAttach',misc.attach);
            formData.append('miscShipFile',misc.ship.file);
            formData.append('miscRecieveFile',misc.recieve.file);



            formData.append('salesVendor',sales.vendor);
            formData.append('salesPOnumber',sales.POnumber);
            formData.append('salesAmount',sales.amount);
            formData.append('salesShipDate',sales.ship.date);
            formData.append('salesRecieveDate',sales.recieve.date);
            formData.append('salesTrackingNumber',sales.tracking.number);
            formData.append('salesTracking',sales.tracking.link);
            formData.append('salesAttach',sales.attach);
            formData.append('salesShipFile',sales.ship.file);
            formData.append('salesRecieveFile',sales.recieve.file);


            formData.append('profitVendor',profit.vendor);
            formData.append('profitPOnumber',profit.POnumber);
            formData.append('profitAmount',profit.amount);
            formData.append('profitShipDate',profit.ship.date);
            formData.append('profitRecieveDate',profit.recieve.date);
            formData.append('profitTrackingNumber',profit.tracking.number);
            formData.append('profitTracking',profit.tracking.link);
            formData.append('profitAttach',profit.attach);
            formData.append('profitShipFile',profit.ship.file);
            formData.append('profitRecieveFile',profit.recieve.file);


            formData.append('PRCVendor',PRC.vendor);
            formData.append('PRCPOnumber',PRC.POnumber);
            formData.append('PRCAmount',PRC.amount);
            formData.append('PRCShipDate',PRC.ship.date);
            formData.append('PRCRecieveDate',PRC.recieve.date);
            formData.append('PRCTrackingNumber',PRC.tracking.number);
            formData.append('PRCTracking',PRC.tracking.link);
            formData.append('PRCAttach',PRC.attach);
            formData.append('PRCShipFile',PRC.ship.file);
            formData.append('PRCRecieveFile',PRC.recieve.file);

            


            const { data } = await addVendorRequest(formData);
            queryClient.invalidateQueries('uservendor');


            setmdse({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setmdse({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setfreight({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setfreight2({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setwarehouse({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setserviceCharge({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setmisc({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })
            setsales({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })

            setprofit({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })

            setPRC({
                vendor: '',
                POnumber: '',
                amount: '',
                attach: '',
                ship: {
                  date: '',
                  file: ''
                },
                recieve: {
                  date: '',
                  file: ''
                },
                tracking: {
                  link: '',
                  number: ''
                }
            })

            onClose();
            

        } catch (error) {
            setLoading(false)
            console.error(error.message);
            onClose()
            toast.error(error?.response?.data?.message);

        }
    }



    //get service charge
    useEffect(() => {
      const getServiceCharge = async () => {
        try {
            const res = await getServiceChargeRequest();
            setServiceChargeAmount(res.data.serviceCharge)
            // setserviceCharge(prev => ({...prev,amount: `${res.data.serviceCharge}%`}));
        } catch (error) {
          console.log('Error while getting serviec charge')
        }
      }
      getServiceCharge()
    },[]);






    useEffect(() => {
      // profit = total cost - renvenue

      const totalCost = Number(mdse.amount || 0) + Number(freight.amount || 0) + Number(freight2.amount || 0) + Number(warehouse.amount || 0) + Number(misc.amount || 0);
      const revenue = Number(sales.amount || 0);
      
      if (totalCost > 0 && revenue > 0) {
          const Totalprofit = revenue - totalCost;
          const profitPercentage = (Totalprofit / revenue) * 100;
          console.log(totalCost, revenue, profitPercentage);
          
          // Set profit in state with two decimal places
          setprofit(prev => ({
              ...prev,
              amount: `${Totalprofit.toFixed(2)} | ${profitPercentage.toFixed(2)}%`
          }));
          
          let totalCharge;

          if (profitPercentage <= 40) {
              const assumedProfit = (revenue * 40) / 100;
              totalCharge = (Number(serviceChargeAmount) / 100) * assumedProfit;
              setserviceCharge(prev => ({
                  ...prev,
                  amount: `${totalCharge.toFixed(2)} | ${serviceChargeAmount}%`
              }));
              setMessage(`Your profit is ${profitPercentage.toFixed(2)} percent. We charge service charges according to 40 percent, so the amount according to 40 percent will be ${totalCharge.toFixed(2)}.`);
          } else {
              totalCharge = (Number(serviceChargeAmount) / 100) * Totalprofit;
              setserviceCharge(prev => ({
                  ...prev,
                  amount: `${totalCharge.toFixed(2)} | ${serviceChargeAmount}%`
              }));
              setMessage(null);
          }

          //calculate return to customer
          const returnToCustomerProfit = Totalprofit - totalCharge;
          const returnToCustomerProfitPercentage = (returnToCustomerProfit / revenue) * 100;
          setPRC(prev => ({...prev,amount: `${returnToCustomerProfit} | ${returnToCustomerProfitPercentage?.toFixed(2)}%`}));
      }



  }, [mdse,freight,freight2,warehouse,misc,sales,serviceChargeAmount]);



    const renderRow = (
        vendorType,
        vendorOptions,
        state,
        setState,
        isEdittable=true
    ) => (
        <tr key={vendorType} className={`border-b ${vendorType === 'SALES' || vendorType === 'OROFIT' ? 'bg-green-100' : 'bg-white'}`}>
            <td className="border-r p-1 text-sm">{vendorType}</td>
            <td className="border-r p-1 text-sm">
                <select className="w-full bg-transparent text-sm " value={state.value} onChange={(e) => handleVendorChange(setState,e.target.value)}>
                    <option value="">Select Vendor</option>
                    {vendorOptions?.map(option => (
                        <option key={option._id} value={option._id}>{option?.name}</option>
                    ))}
                </select>
            </td>
            <td className="border-r p-1 text-sm">
                <input type="text" className="w-full  px-1" value={state.POnumber} onChange={(e) => handlePONumberChange(setState,e.target.value)} readOnly={!isEdittable}/>
            </td>
            <td className="border-r p-1 text-sm">
                <input type={isEdittable ? "number": "text"} className="w-full  px-1" value={state.amount} onChange={(e) => handleAmountChange(setState,e.target.value)}  readOnly={!isEdittable}/>
            </td>
            <td className="border-r p-1 text-sm">
                <label htmlFor={`file-${vendorType}`} className="cursor-pointer text-blue-600 hover:underline text-sm">
                    {state.attach?.name || "Choose file"}
                </label>
                <input
                    id={`file-${vendorType}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleAttachFileChange(e, setState)}
                 readOnly={!isEdittable}/>
            </td>
            <td className="border-r p-1 text-sm">
                <input type="text" className="w-full  px-1" value={state.ship?.date} onChange={(e) => handleShipDateChange(setState,e.target.value)}  readOnly={!isEdittable}/>
            </td>
            <td className="border-r p-1 text-sm">
                <label htmlFor={`ship-${vendorType}`} className="cursor-pointer text-blue-600 hover:underline text-sm">
                    {state.ship?.file?.name || "Choose file"}
                </label>
                <input
                    id={`ship-${vendorType}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleShipAttachFileChange(e, setState)}
                 readOnly={!isEdittable}/>
            </td>
            <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1"  value={state.recieve?.date} onChange={(e) => handleRecieveDateChange(setState,e.target.value)} readOnly={!isEdittable}/>
            </td>

            <td className="border-r p-1 text-sm">
                <label htmlFor={`recieve-${vendorType}`} className="cursor-pointer text-blue-600 hover:underline text-sm">
                    {state.recieve?.file?.name || "Choose file"}
                </label>
                <input
                    id={`recieve-${vendorType}`}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleRecieveAttachFileChange(e, setState)}
                 readOnly={!isEdittable}/>
            </td>

            <td className="border-r p-1 text-sm">
                <input type="text" className="w-full  px-1" value={state.tracking?.number} onChange={(e) => handleTrackingNUmberChange(setState,e.target.value)} readOnly={!isEdittable}/>
            </td>
            <td className="p-1 text-sm">
                <input type="text" className="w-full  px-1" value={state.tracking?.link} onChange={(e) => handleTrackingLinkChange(setState,e.target.value)} placeholder="Tracking Link"  readOnly={!isEdittable}/>
            </td>
        </tr>
    )

    return (
        <div className={`fixed px-4 py-4  top-0 left-0 right-0 bottom-0 z-[10000] bg-black/10 ${open ? 'block' : 'hidden'}`} style={{ alignContent: 'center' }}>
            <div className='max-w-[80rem] relative px-3 py-5  bg-white shadow-xl mx-auto rounded-md'>
                <button className='text-black/90 text-3xl absolute right-4 top-4' onClick={onClose}>
                    <IoMdClose />
                </button>
                <div className='h-[20rem] md:h-[30rem] mt-4 overflow-y-auto'>
                    <div className="p-4 bg-green-50 font-sans text-sm">
                        <h1 className="text-2xl font-bold mb-4">DEAL {dealId}</h1>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <h2 className="font-bold">{user?.company?.name}</h2>
                                <p>{user?.company?.address}</p>
                              
                            
                            </div>
                        </div>
                        <table className="w-full border-collapse border text-xs">
                            <thead>
                                <tr className="bg-green-700 text-white">
                                    <th className="border p-1">Vendor Type</th>
                                    <th className="border p-1">Vendor Name</th>
                                    <th className="border p-1">PO Number</th>
                                    <th className="border p-1">Amount</th>
                                    <th className="border p-1">Attach</th>
                                    <th className="border p-1">Ship Date</th>
                                    <th className="border p-1">attach</th>
                                    <th className="border p-1">Received Date</th>
                                    <th className="border p-1">attach</th>
                                    <th className="border p-1">Tracking Number</th>
                                    <th className="border p-1">Tracking Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRow('mdse', members,mdse,setmdse)}
                                {renderRow('freight', members,freight,setfreight)}
                                {renderRow('freight2', members,freight2,setfreight2)}
                                {renderRow('warehouse', members,warehouse,setwarehouse)}
                                {renderRow('misc', members,misc,setmisc)}
                                {renderRow('sales', salescompany,sales,setsales)}
                                {renderRow('profit', members,profit,setprofit,false)}
                                {renderRow('serviceCharge', members,serviceCharge,setserviceCharge,false)}
                                {renderRow('Profit Return To Customer', members,PRC,setPRC,false )}
                              
                            </tbody>
                        </table>

                        {
                          message &&
                          <p className='flex text-sm mt-2'>
                            <b className='whitespace-pre mr-1'>Note :</b>
                            {message}
                          </p>
                        }

                        <div className='flex justify-center py-3'>
                            <button onClick={handleSubmit} className='py-2 px-4 rounded-md bg-blue-1'>{loading ? 'Loading...': 'SUBMIT'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewAddVendorForn