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
import Multiselect from 'multiselect-react-dropdown';




const option = [
  { name: 'mdse', id: 1 },
  { name: 'freight', id: 2 },
  { name: 'freight2', id: 3 },
  { name: 'warehouse', id: 4 },
  { name: 'misc', id: 5 },
]

const NewAddVendorForn = ({ open, onClose, members, companies, setMemberOpen, salescompany }) => {

  const { user } = useContext(UserContext)
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false);
  const [serviceChargeAmount, setServiceChargeAmount] = useState(5);
  const [serviceChargeAmount2, setServiceChargeAmount2] = useState(2);
  const [miniumRevenue, setminiumRevenue] = useState(0);
  const [miniumRevenueAmout, setminiumRevenueAmout] = useState(0);
  const [escrowAmout, setescrowAmout] = useState(0);
  const [assumedProfitd, setassumedProfit] = useState(0);
  const [message, setMessage] = useState(null);
  const [message2, setMessage2] = useState(null);
  const [selectedValue, setSelectedValue] = useState([{ name: 'mdse', id: 1 }]);

  const [mdse, setmdse] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [freight, setfreight] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [freight2, setfreight2] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [warehouse, setwarehouse] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [serviceCharge, setserviceCharge] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [serviceCharge2, setserviceCharge2] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [misc, setmisc] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
    name: 'misc',
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
  const [sales, setsales] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [profit, setprofit] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  const [PRC, setPRC] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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

  const [PIE, setPIE] = useState({
    vendor: '',
    POnumber: '',
    amount: '',
    attach: '',
    sign: '',
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
  });
  const [dealId, setdealId] = useState(0);



  // onSelect handler
  const onSelect = (selectedList, selectedItem) => {
    setSelectedValue(selectedList);
  };

  // onRemove handler
  const onRemove = (selectedList, removedItem) => {
    setSelectedValue(selectedList);
  };




  const handleVendorChange = (setState, value) => {
    setState(prev => {
      return {
        ...prev,
        vendor: value
      }
    })
  }
  const handlePONumberChange = (setState, value) => {
    setState(prev => {
      return {
        ...prev,
        POnumber: value
      }
    })
  }
  const handleAmountChange = (setState, value) => {
    setState(prev => {
      return {
        ...prev,
        amount: value
      }
    })
  }
  const handleShipDateChange = (setState, value) => {
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
  const handleRecieveDateChange = (setState, value) => {
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

  const handleTrackingNUmberChange = (setState, value) => {
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
  const handleTrackingLinkChange = (setState, value) => {
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


  const handleAttachFileChange = (e, setState) => {
    const [file] = e.target.files;
    setState(prev => {
      return {
        ...prev,
        attach: file
      }
    })
  }

  const handleSignFileChange = (e, setState) => {

    const [file] = e.target.files;
    setState(prev => {
      return {
        ...prev,
        sign: file
      }
    })
  }
  const handleShipAttachFileChange = (e, setState) => {
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
  const handleRecieveAttachFileChange = (e, setState) => {
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

      formData.append('dealId', dealId);


      formData.append('mdseVendor', mdse.vendor);
      formData.append('mdsePOnumber', mdse.POnumber);
      formData.append('mdseAmount', mdse.amount);
      formData.append('mdseShipDate', mdse.ship.date);
      formData.append('mdseRecieveDate', mdse.recieve.date);
      formData.append('mdseTrackingNumber', mdse.tracking.number);
      formData.append('mdseTracking', mdse.tracking.link);
      formData.append('mdseAttach', mdse.attach);
      formData.append('mdseShipFile', mdse.ship.file);
      formData.append('mdseRecieveFile', mdse.recieve.file);
      formData.append('mdseSign', mdse.sign);



      formData.append('freightVendor', freight.vendor);
      formData.append('freightPOnumber', freight.POnumber);
      formData.append('freightAmount', freight.amount);
      formData.append('freightShipDate', freight.ship.date);
      formData.append('freightRecieveDate', freight.recieve.date);
      formData.append('freightTrackingNumber', freight.tracking.number);
      formData.append('freightTracking', freight.tracking.link);
      formData.append('freightAttach', freight.attach);
      formData.append('freightShipFile', freight.ship.file);
      formData.append('freightRecieveFile', freight.recieve.file);
      formData.append('freightSign', freight.sign);


      formData.append('freight2Vendor', freight2.vendor);
      formData.append('freight2POnumber', freight2.POnumber);
      formData.append('freight2Amount', freight2.amount);
      formData.append('freight2ShipDate', freight2.ship.date);
      formData.append('freight2RecieveDate', freight2.recieve.date);
      formData.append('freight2TrackingNumber', freight2.tracking.number);
      formData.append('freight2Tracking', freight2.tracking.link);
      formData.append('freight2Attach', freight2.attach);
      formData.append('freight2ShipFile', freight2.ship.file);
      formData.append('freight2RecieveFile', freight2.recieve.file);
      formData.append('freight2Sign', freight2.sign);


      formData.append('warehouseVendor', warehouse.vendor);
      formData.append('warehousePOnumber', warehouse.POnumber);
      formData.append('warehouseAmount', warehouse.amount);
      formData.append('warehouseShipDate', warehouse.ship.date);
      formData.append('warehouseRecieveDate', warehouse.recieve.date);
      formData.append('warehouseTrackingNumber', warehouse.tracking.number);
      formData.append('warehouseTracking', warehouse.tracking.link);
      formData.append('warehouseAttach', warehouse.attach);
      formData.append('warehouseShipFile', warehouse.ship.file);
      formData.append('warehouseRecieveFile', warehouse.recieve.file);
      formData.append('warehouseSign', warehouse.sign);


      formData.append('serviceChargeVendor', serviceCharge.vendor);
      formData.append('serviceChargePOnumber', serviceCharge.POnumber);
      formData.append('serviceChargeAmount', serviceCharge.amount);
      formData.append('serviceChargeShipDate', serviceCharge.ship.date);
      formData.append('serviceChargeRecieveDate', serviceCharge.recieve.date);
      formData.append('serviceChargeTrackingNumber', serviceCharge.tracking.number);
      formData.append('serviceChargeTracking', serviceCharge.tracking.link);
      formData.append('serviceChargeAttach', serviceCharge.attach);
      formData.append('serviceChargeShipFile', serviceCharge.ship.file);
      formData.append('serviceChargeRecieveFile', serviceCharge.recieve.file);


      formData.append('serviceCharge2Vendor', serviceCharge2.vendor);
      formData.append('serviceCharge2POnumber', serviceCharge2.POnumber);
      formData.append('serviceCharge2Amount', serviceCharge2.amount);
      formData.append('serviceCharge2ShipDate', serviceCharge2.ship.date);
      formData.append('serviceCharge2RecieveDate', serviceCharge2.recieve.date);
      formData.append('serviceCharge2TrackingNumber', serviceCharge2.tracking.number);
      formData.append('serviceCharge2Tracking', serviceCharge2.tracking.link);
      formData.append('serviceCharge2Attach', serviceCharge2.attach);
      formData.append('serviceCharge2ShipFile', serviceCharge2.ship.file);
      formData.append('serviceCharge2RecieveFile', serviceCharge2.recieve.file);



      formData.append('miscVendor', misc.vendor);
      formData.append('miscPOnumber', misc.POnumber);
      formData.append('miscAmount', misc.amount);
      formData.append('miscName', misc.name);
      formData.append('miscShipDate', misc.ship.date);
      formData.append('miscRecieveDate', misc.recieve.date);
      formData.append('miscTrackingNumber', misc.tracking.number);
      formData.append('miscTracking', misc.tracking.link);
      formData.append('miscAttach', misc.attach);
      formData.append('miscShipFile', misc.ship.file);
      formData.append('miscRecieveFile', misc.recieve.file);
      formData.append('miscSign', misc.sign);



      formData.append('salesVendor', sales.vendor);
      formData.append('salesPOnumber', sales.POnumber);
      formData.append('salesAmount', sales.amount);
      formData.append('salesShipDate', sales.ship.date);
      formData.append('salesRecieveDate', sales.recieve.date);
      formData.append('salesTrackingNumber', sales.tracking.number);
      formData.append('salesTracking', sales.tracking.link);
      formData.append('salesAttach', sales.attach);
      formData.append('salesShipFile', sales.ship.file);
      formData.append('salesRecieveFile', sales.recieve.file);
      formData.append('salesSign', sales.sign);


      formData.append('profitVendor', profit.vendor);
      formData.append('profitPOnumber', profit.POnumber);
      formData.append('profitAmount', profit.amount);
      formData.append('profitShipDate', profit.ship.date);
      formData.append('profitRecieveDate', profit.recieve.date);
      formData.append('profitTrackingNumber', profit.tracking.number);
      formData.append('profitTracking', profit.tracking.link);
      formData.append('profitAttach', profit.attach);
      formData.append('profitShipFile', profit.ship.file);
      formData.append('profitRecieveFile', profit.recieve.file);


      formData.append('PRCVendor', PRC.vendor);
      formData.append('PRCPOnumber', PRC.POnumber);
      formData.append('PRCAmount', PRC.amount);
      formData.append('PRCShipDate', PRC.ship.date);
      formData.append('PRCRecieveDate', PRC.recieve.date);
      formData.append('PRCTrackingNumber', PRC.tracking.number);
      formData.append('PRCTracking', PRC.tracking.link);
      formData.append('PRCAttach', PRC.attach);
      formData.append('PRCShipFile', PRC.ship.file);
      formData.append('PRCRecieveFile', PRC.recieve.file);

      formData.append('PIEAmout', PIE.amount);



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
        name: '',
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
        setServiceChargeAmount(Number(res.data.serviceCharge))
        setServiceChargeAmount2(Number(res.data.serviceCharge2))
        setminiumRevenue(Number(res.data.miniumRevenue))
        setminiumRevenueAmout(Number(res.data.miniumRevenueAmout))
        setescrowAmout(Number(res.data.escrowAmout))
        setassumedProfit(Number(res.data.assumedProfit))
        // setserviceCharge(prev => ({...prev,amount: `${res.data.serviceCharge}%`}));
      } catch (error) {
        console.log('Error while getting serviec charge')
      }
    }
    getServiceCharge()
  }, []);







  useEffect(() => {
    console.log(mdse.amount, freight.amount, freight2.amount, warehouse.amount, misc.amount, serviceChargeAmount, sales.amount, 'value')
    let isLessThen25000 = false;
    // Calculate total cost
    const totalCost =
      Number(mdse.amount || 0) +
      Number(freight.amount || 0) +
      Number(freight2.amount || 0) +
      Number(warehouse.amount || 0) +
      Number(misc.amount || 0);

    // Ensure revenue is at least 25,000
    let revenue = Number(sales.amount || 0);
    if (revenue < miniumRevenue) {
      setMessage2(`Your sales amount is ${revenue}, which is less than or equal to 25,000. Service charges are calculated based on a sales amount of ${miniumRevenue} with a fixed service charge of 1,250 deducted.`)
      revenue = miniumRevenue;
      isLessThen25000 = true;

      const Totalprofit = revenue - totalCost;
      const charge = miniumRevenueAmout;
      const serviceCharge = (charge / Totalprofit) * 100;

      setserviceCharge((prev) => ({
        ...prev,
        amount: `${miniumRevenueAmout} | ${serviceCharge.toFixed(2)}%`,
      }));

      // Update service charge state
      setserviceCharge2((prev) => ({
        ...prev,
        amount: `0 | ${0}%`,
      }));


      let prifitInPIE = (Number(20) / 100) * Totalprofit;
      setPIE((prev) => ({
        ...prev,
        amount: `${prifitInPIE.toFixed(2)} | ${20}%`,
      }));

      // Calculate return to customer
      const returnToCustomerProfit = Totalprofit - (charge);
      const returnToCustomerProfitPercentage =
        (returnToCustomerProfit / revenue) * 100;

      // Update PRC state
      setPRC((prev) => ({
        ...prev,
        amount: `${returnToCustomerProfit.toFixed(2)} | ${returnToCustomerProfitPercentage.toFixed(2)}%`,
      }));

    } else {
      setMessage2(null)
      isLessThen25000 = false
    }

    console.log(totalCost, revenue, "Calculated Total Cost and Revenue");

    if (totalCost > 0 && revenue > 0 && !isLessThen25000) {
      // Calculate profit and profit percentage
      const Totalprofit = revenue - totalCost;
      const profitPercentage = (Totalprofit / revenue) * 100;

      console.log(
        `Total Cost: ${totalCost}, Revenue: ${revenue}, Profit: ${Totalprofit}, Profit %: ${profitPercentage.toFixed(2)}`
      );

      // Set profit in state with two decimal places
      setprofit((prev) => ({
        ...prev,
        amount: `${Totalprofit.toFixed(2)} | ${profitPercentage.toFixed(2)}%`,
      }));

      let totalCharge;
      let totalCharge2;

      // If profit percentage is <= 40%, calculate service charge assuming profit is 40%
      if (profitPercentage <= assumedProfitd) {
        const assumedProfit = (revenue * assumedProfitd) / 100; // Assume profit is 40%
        totalCharge = (Number(serviceChargeAmount) / 100) * assumedProfit;
        totalCharge2 = (Number(serviceChargeAmount2) / 100) * assumedProfit;
        let prifitInPIE = (Number(20) / 100) * assumedProfit;

        // Update service charge state
        setserviceCharge((prev) => ({
          ...prev,
          amount: `${totalCharge.toFixed(2)} | ${serviceChargeAmount}%`,
        }));

        // Update service charge state
        setserviceCharge2((prev) => ({
          ...prev,
          amount: `${totalCharge2.toFixed(2)} | ${serviceChargeAmount2}%`,
        }));

        setPIE((prev) => ({
          ...prev,
          amount: `${prifitInPIE.toFixed(2)} | ${20}%`,
        }));

        // Display message
        setMessage(
          `Your profit is ${profitPercentage.toFixed(
            2
          )}% which is less than or equal to 40%. Service charges are calculated assuming a 40% profit, resulting in ${totalCharge.toFixed(2)}.`
        );
      } else {
        setMessage(null);
        // If profit percentage is > 40%, calculate service charge based on actual profit
        totalCharge = (Number(serviceChargeAmount) / 100) * Totalprofit;
        totalCharge2 = (Number(serviceChargeAmount2) / 100) * Totalprofit;
        let prifitInPIE = (Number(20) / 100) * Totalprofit;

        // Update service charge state
        setserviceCharge((prev) => ({
          ...prev,
          amount: `${totalCharge.toFixed(2)} | ${serviceChargeAmount}%`,
        }));

        // Update service charge state
        setserviceCharge2((prev) => ({
          ...prev,
          amount: `${totalCharge2.toFixed(2)} | ${serviceChargeAmount2}%`,
        }));

        setPIE((prev) => ({
          ...prev,
          amount: `${prifitInPIE.toFixed(2)} | ${20}%`,
        }));

        // Clear message since profit is higher than 40%
        setMessage(null);
      }

      // Calculate return to customer
      const returnToCustomerProfit = Totalprofit - (totalCharge + totalCharge2);
      const returnToCustomerProfitPercentage =
        (returnToCustomerProfit / revenue) * 100;

      // Update PRC state
      setPRC((prev) => ({
        ...prev,
        amount: `${returnToCustomerProfit.toFixed(2)} | ${returnToCustomerProfitPercentage.toFixed(2)}%`,
      }));

      console.log(
        `Return to Customer Profit: ${returnToCustomerProfit}, Return %: ${returnToCustomerProfitPercentage.toFixed(2)}`
      );
    }
  }, [mdse, freight, freight2, warehouse, misc, sales, serviceChargeAmount]);




  const renderRow = (
    vendorType,
    vendorOptions,
    state,
    setState,
    isEdittable = true
  ) => (
    <tr key={vendorType} className={`border-b ${vendorType === 'SALES' || vendorType === 'OROFIT' ? 'bg-green-100' : 'bg-white'}`}>
      {vendorType == 'misc' ? <td className="border-r p-1 text-sm">
        <input type="text" className="w-full  px-1" value={state.name} onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))} readOnly={!isEdittable} />
      </td> : <td className="border-r p-1 text-sm">{vendorType}</td>}

      <td className="border-r p-1 text-sm">
        <select className="w-full bg-transparent text-sm " value={state.value} onChange={(e) => handleVendorChange(setState, e.target.value)}>
          <option value="">Select Vendor</option>
          {vendorOptions?.map(option => (
            <option key={option._id} value={option._id}>{option?.name}</option>
          ))}
        </select>
      </td>
      <td className="border-r p-1 text-sm">
        <input type="text" className="w-full  px-1" value={state.POnumber} onChange={(e) => handlePONumberChange(setState, e.target.value)} readOnly={!isEdittable} />
      </td>
      <td className="border-r p-1 text-sm">
        <input type={isEdittable ? "number" : "text"} className="w-full  px-1" value={state.amount} onChange={(e) => handleAmountChange(setState, e.target.value)} readOnly={!isEdittable} />
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
          readOnly={!isEdittable} />
      </td>
      <td className="border-r p-1 text-sm">
        <input type="text" className="w-full  px-1" value={state.ship?.date} onChange={(e) => handleShipDateChange(setState, e.target.value)} readOnly={!isEdittable} />
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
          readOnly={!isEdittable} />
      </td>
      <td className="border-r p-1 text-sm">
        <input type="text" className="w-full  px-1" value={state.recieve?.date} onChange={(e) => handleRecieveDateChange(setState, e.target.value)} readOnly={!isEdittable} />
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
          readOnly={!isEdittable} />
      </td>

      <td className="border-r p-1 text-sm">
        <input type="text" className="w-full  px-1" value={state.tracking?.number} onChange={(e) => handleTrackingNUmberChange(setState, e.target.value)} readOnly={!isEdittable} />
      </td>
      <td className="p-1 text-sm">
        <input type="text" className="w-full  px-1" value={state.tracking?.link} onChange={(e) => handleTrackingLinkChange(setState, e.target.value)} placeholder="Tracking Link" readOnly={!isEdittable} />
      </td>



      <td className="border-l p-1 text-sm">
        <label htmlFor={`sign-${vendorType}`} className="cursor-pointer text-blue-600 hover:underline text-sm">
          {state.sign?.name || "Choose file"}
        </label>
        <input
          id={`sign-${vendorType}`}
          type="file"
          className="hidden"
          onChange={(e) => handleSignFileChange(e, setState)} />
      </td>
    </tr>
  )








  const renderResultRow = (
    vendorType,
    vendorOptions,
    state,
    setState,
    isEdittable = true
  ) => (
    <tr key={vendorType} className={`border-b ${vendorType === 'SALES' || vendorType === 'OROFIT' ? 'bg-green-100' : 'bg-white'}`}>
      <td className="border-r p-1 text-sm">{vendorType}</td>
      <td className="border-r p-1 text-sm">

      </td>
      <td className="border-r p-1 text-sm">

      </td>
      <td className="border-r p-1 text-sm">
        <input type={isEdittable ? "number" : "text"} className="w-full  px-1" value={state.amount} onChange={(e) => handleAmountChange(setState, e.target.value)} readOnly={!isEdittable} />
      </td>
      <td className="border-r p-1 text-sm">

      </td>
      <td className="border-r p-1 text-sm">

      </td>
      <td className="border-r p-1 text-sm">

      </td>
      <td className="border-r p-1 text-sm">

      </td>

      <td className="border-r p-1 text-sm">

      </td>

      <td className="border-r p-1 text-sm">

      </td>
      <td className="p-1 border-r  text-sm">

      </td>
      <td className="p-1 text-sm">

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
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-bold">{user?.company?.name}</h2>
                <p>{user?.company?.address}</p>
              </div>

              <div className='flex flex-col gap-1'>
                <label>Selct Vendor Type</label>
                <Multiselect
                  options={option}
                  selectedValues={selectedValue}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="name"
                  placeholder='Select Vendor Types'
                />
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
                  <th className="border p-1">Sign Attachment</th>
                </tr>
              </thead>
              <tbody>
                {selectedValue.find(value => value.name == 'mdse') && renderRow('mdse', members, mdse, setmdse)}
                {selectedValue.find(value => value.name == 'freight') && renderRow('freight', members, freight, setfreight)}
                {selectedValue.find(value => value.name == 'freight2') && renderRow('freight2', members, freight2, setfreight2)}
                {selectedValue.find(value => value.name == 'warehouse') && renderRow('warehouse', members, warehouse, setwarehouse)}
                {selectedValue.find(value => value.name == 'misc') && renderRow('misc', members, misc, setmisc)}
                {renderRow('sales', salescompany, sales, setsales)}
                {renderResultRow('profit', members, profit, setprofit, false)}
                {renderResultRow('PIE', members, PIE, setPIE, false)}
                {renderResultRow('serviceCharge', members, serviceCharge, setserviceCharge, false)}
                {renderResultRow('serviceCharge2', members, serviceCharge2, setserviceCharge2, false)}
                {/* {renderResultRow('Profit Return To Customer', members, PRC, setPRC, false)} */}

              </tbody>
            </table>

            {
              message &&
              <p className='flex text-sm mt-2'>
                <b className='whitespace-pre mr-1'>Note :</b>
                {message}
              </p>
            }
            {
              message2 &&
              <p className='flex text-sm mt-2'>
                <b className='whitespace-pre mr-1'>Note :</b>
                {message2}
              </p>
            }
            <p className='flex text-sm mt-2'>
              <b className='whitespace-pre mr-1'>Note :</b>
              {escrowAmout}% of the profit will remain in escrow and will be returned after a certain period.
            </p>

            <div className='flex justify-center py-3'>
              <button onClick={handleSubmit} className='py-2 px-4 rounded-md bg-blue-1'>{loading ? 'Loading...' : 'SUBMIT'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default NewAddVendorForn