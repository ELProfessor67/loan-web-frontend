'use client';

import { BACKEND_URL } from "@/contants/URLS";
import { getVendorDetailRequest } from "@/http";
import { useQuery } from "react-query";





const page = ({params}) => {
    const { id } = params;

    const getVendorDetail = async () => {
        try {
            const { data } = await getVendorDetailRequest(id);
            return data.vendor
        } catch (error) {
            return null
        }
    }
    const { data, isLoading } = useQuery(id, getVendorDetail)

    if(isLoading){
        return<h1>Loading...</h1>
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg ">
                    <div className="max-w-4xl mx-auto p-4 bg-green-50">
                        <h1 className="text-2xl font-bold text-center text-green-800 mb-4">DEAL {data?.dealId}</h1>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <h2 className="font-bold">{data?.company?.name}</h2>
                                <p>{data?.company?.address}</p>
                            
                            </div>
                        </div>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-green-700 text-white text-xs">
                                    <th className="border border-green-600 p-1">Day of Week</th>
                                    <th className="border border-green-600 p-1">VENDOR</th>
                                    <th className="border border-green-600 p-1">AMOUNT</th>
                                    <th className="border border-green-600 p-1">SHIP DATE BY VENOR</th>
                                    <th className="border border-green-600 p-1">RECIEVED DATE WHSE</th>
                                    <th className="border border-green-600 p-1">RECIEVED BY SALES</th>
                                    <th className="border border-green-600 p-1">Unpaid Leave</th>
                                    <th className="border border-green-600 p-1">Other</th>
                                    <th className="border border-green-600 p-1">TOTAL Hrs</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">VENDOR</td>
                                    <td className="border border-green-300 p-1">{data?.name}</td>
                                    <td className="border border-green-300 p-1 text-right">{data?.amount}</td>
                                    <td className="border border-green-300 p-1">{data?.dealDate}</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1">
                                    <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.copyOrderAttachment.file?.replace(/\\/g, '/')}`}
                                                className="cursor-pointer text-blue-500 "
                                                title="Copy Order Attachment "
                                               
                                            >
                                                CPA
                                            </a>
                                    </td>
                                    <td className="border border-green-300 p-1 text-right">{data?.amount}</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">FREIGHT</td>
                                    <td className="border border-green-300 p-1">{data?.freight?.companyName}</td>
                                    <td className="border border-green-300 p-1 text-right">{data?.freight?.amount}</td>
                                    <td className="border border-green-300 p-1">
                                    <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.freight?.shipped?.file?.replace(/\\/g, '/')}`}
                                                className="cursor-pointer text-blue-500 "
                                                title="Copy Order Attachment "
                                               
                                            >
                                                {data?.freight?.shipped?.date}
                                            </a>
                                    </td>
                                    <td className="border border-green-300 p-1">
                                    <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.freight?.recive?.file?.replace(/\\/g, '/')}`}
                                                className="cursor-pointer text-blue-500 "
                                                title="Copy Order Attachment "
                                               
                                            >
                                                {data?.freight?.recive?.date}
                                            </a>
                                    </td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right"> {data?.freight?.amount}</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">WAREHOUSE</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right">{data?.warehouse?.amount}</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1">
                                    <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.warehouse?.file?.replace(/\\/g, '/')}`}
                                                className="cursor-pointer text-blue-500 "
                                                title="Warehouse Attachment "
                                               
                                            >
                                                Attachment
                                            </a>
                                    </td>
                                    <td className="border border-green-300 p-1 text-right">{data?.warehouse?.amount}</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">SALES</td>
                                    <td className="border border-green-300 p-1">{data?.sales?.companyName}</td>
                                    <td className="border border-green-300 p-1 text-right">{data?.sales?.amount}</td>
                                    <td className="border border-green-300 p-1">
                                    <a
                                                target="_zeeshan"
                                                href={`${BACKEND_URL}/${data?.freight?.shipped?.file?.replace(/\\/g, '/')}`}
                                                className="cursor-pointer text-blue-500 "
                                                title="Copy Order Attachment "
                                               
                                            >
                                                {data?.freight?.shipped?.date}
                                            </a>
                                    </td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right">{data?.sales?.amount}</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">SET AMOUT PAID</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right">3,000.00</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">OROFIT</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right">{data?.profit?.amount}</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right">{data?.profit?.amount}</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">#VALUE!</td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1"></td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="bg-green-100">
                                    <td className="border border-green-300 p-1 font-bold">Total Hrs:</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">{Number(data?.amount || 0)+Number(data?.freight?.amount || 0)+Number(data?.sales?.amount || 0)+Number(data?.warehouse?.amount || 0)+Number(data?.profit?.amount || 0)}</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right font-bold">{Number(data?.amount || 0)+Number(data?.freight?.amount || 0)+Number(data?.sales?.amount || 0)+Number(data?.warehouse?.amount || 0)+Number(data?.profit?.amount || 0)}</td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">Rate/Hour:</td>
                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                    <td className="border border-green-300 p-1 text-right">23.00</td>
                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                    <td className="border border-green-300 p-1 text-right">15.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1"></td>
                                </tr>
                                <tr>
                                    <td className="border border-green-300 p-1 font-bold">Total Pay:</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">#########</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">#########</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right">0.00</td>
                                    <td className="border border-green-300 p-1 text-right font-bold">#########</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="mt-4 text-sm">
                            <p>Total Hours Reported: 74,159.00</p>
                            <p>Total Pay: #########</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default page