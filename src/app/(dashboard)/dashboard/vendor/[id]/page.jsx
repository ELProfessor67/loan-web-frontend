'use client';

import ViewReason from "@/components/ViewResong";
import { BACKEND_URL } from "@/contants/URLS";
import { getVendorDetailRequest } from "@/http";
import { useState } from "react";
import { useQuery } from "react-query";


const renderRow = (
    vendorType,

    state,
    setState
) => (
    <tr key={vendorType} className={`border-b ${vendorType === 'SALES' || vendorType === 'OROFIT' ? 'bg-green-100' : 'bg-white'}`}>
        <td className="border-r p-1 text-sm">{vendorType}</td>
        <td className="border-r p-1 text-sm">
            {state?.vendor?.name}
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.POnumber} />
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" value={state?.amount} />
        </td>
        <td className="border-r p-1 text-sm">
            {state?.attach && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.attach}`}>OPEN</a>}
        </td>
        <td className="border-r p-1 text-sm">
            {state?.sign && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.sign}`}>OPEN</a>}
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.ship?.date} />
        </td>

        <td className="border-r p-1 text-sm">
            {state?.ship?.file && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.ship?.file}`}>OPEN</a>}
        </td>
        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.recieve?.date} />
        </td>

        <td className="border-r p-1 text-sm">
            {state?.recieve?.file && <a className="text-blue-500" href={`${BACKEND_URL}/${state?.recieve?.file}`}>OPEN</a>}

        </td>

        <td className="border-r p-1 text-sm">
            <input type="text" className="w-full  px-1" readOnly value={state?.tracking?.number} />
        </td>
        <td className="p-1 text-sm border-r">
             {state?.tracking?.link && <a className="text-blue-500" href={state?.tracking?.link}>OPEN</a>}
          
        </td>

        <td className="p-1 text-sm border-r">
           <span> {state?.amount && state.status}</span><br/>
            {
                state.status == 'rejected' &&  <span className="text-red-500 cursor-pointer" onClick={() => setState(state.message)}>View</span>
            }
        </td>
        
        
    </tr>
)


const page = ({ params }) => {
    const { id } = params;
    const [state,setState] = useState(null)

    const getVendorDetail = async () => {
        try {
            const { data } = await getVendorDetailRequest(id);
            return data.vendor
        } catch (error) {
            return null
        }
    }
    const { data, isLoading } = useQuery(id, getVendorDetail)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg ">
                    <div className='h-fit'>

                        <div className="p-4 bg-green-50 font-sans text-sm">
                            <h1 className="text-2xl font-bold mb-4">DEAL {data?.dealId}</h1>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h2 className="font-bold">{data?.company?.name}</h2>
                                    <p>{data?.company?.address}</p>


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
                                        <th className="border p-1">Sign Attachement</th>
                                        <th className="border p-1">Ship Date</th>
                                        <th className="border p-1">attach</th>
                                        <th className="border p-1">Received Date</th>
                                        <th className="border p-1">attach</th>
                                        <th className="border p-1">Tracking Number</th>
                                        <th className="border p-1">Tracking Link</th>
                                        <th className="border p-1">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.mdse.amount && 
                                        renderRow('mdse', data?.mdse,setState)
                                    }
                                    {
                                        data?.freight.amount && 
                                        renderRow('freight', data?.freight,setState)
                                    }   
                                    { data?.freight2.amount && renderRow('freight2', data?.freight2, setState)}
                                    {data?.warehouse?.amount && renderRow('warehouse', data?.warehouse, setState)}
                                    {renderRow('serviceCharge', data?.serviceCharge, setState)}
                                    {renderRow('serviceCharge2', data?.serviceCharge2, setState)}
                                    {data?.misc.amount && renderRow('misc', data?.misc, setState)}
                                    {renderRow('sales', data?.sales, setState)}
                                    {renderRow('profit', data?.profit, setState)}
                                    {renderRow('PIE', data?.PIE, setState)}
                                    {/* {renderRow('Profit Return To Customer', data?.PRC)} */}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div >
            <ViewReason onClose={() => setState(null)} open={!!state} message={state}/>
        </>

    )
}

export default page