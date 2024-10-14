'use client'
import { CiMedal } from "react-icons/ci";
import { BsBuilding } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoThumbsUpOutline } from "react-icons/io5";
import { FaCog, FaPrint, FaOilCan, FaUsers, FaTshirt, FaShieldAlt, FaWarehouse, FaHeadset, FaTruck, FaMicrochip, FaEllipsisH } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { sendEmailRequest } from "@/http";



const industries = [
    { icon: FaCog, label: "Manufacturing", color: "text-orange-500" },
    { icon: FaUsers, label: "Staffing", color: "text-orange-500" },
    { icon: FaWarehouse, label: "Wholesale / Distribution", color: "text-orange-500" },
    { icon: FaTruck, label: "Transportation", color: "text-orange-500" },
    { icon: FaPrint, label: "Printing", color: "text-orange-500" },
    { icon: FaTshirt, label: "Apparel", color: "text-orange-500" },
    { icon: FaHeadset, label: "Business Services", color: "text-orange-500" },
    { icon: FaMicrochip, label: "Technology", color: "text-orange-500" },
    { icon: FaOilCan, label: "Oil Field", color: "text-orange-500" },
    { icon: FaShieldAlt, label: "Security", color: "text-orange-500" },
    { icon: FaEllipsisH, label: "More", color: "text-orange-500" },
];

const page = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await sendEmailRequest({email, subject, message, name});
            toast.success('Email sent successfully');
        } catch (error) {
            toast.error('Failed to send email');
        }finally{
            setEmail('');
            setSubject('');
            setMessage('');
            setName('');
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
                <main className="container mx-auto px-4 py-5 md:py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Turn Your Unpaid <br />
                            Invoices Into <span className="text-blue-600">Cash.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            Apply now and get funded within 24 hours of approval.
                        </p>
                        <ul className="space-y-2 w-[80%] flex flex-wrap gap-3 items-center justify-between">
                            <li className="flex items-center text-xl font-medium">
                                <span className="text-orange-500 mr-2 text-2xl">%</span>
                                Rates as low as .55%
                            </li>
                            <li className="flex items-center text-xl font-medium">
                                <span className="text-orange-500 mr-2 text-2xl">⏱</span>
                                Apply in minutes
                            </li>
                            <li className="flex items-center text-xl font-medium">
                                <span className="text-orange-500 mr-2 text-2xl">✓</span>
                                No hidden fees
                            </li>
                            <li className="flex items-center text-xl font-medium">
                                <span className="text-orange-500 mr-2 text-2xl">✓</span>
                                Easy direct deposit
                            </li>
                        </ul>
                    </div>

                    <div className="md:w-1/2 bg-[#1e2a4a] text-white p-8 rounded-lg">
                        <h2 className="text-sm font-semibold mb-2 text-center text-white">
                            COMPLETE THIS FORM TO GET YOUR
                        </h2>
                        <h3 className="text-lg font-semibold mb-4 text-center text-white">
                            PERSONALIZED RATE INFORMATION
                        </h3>
                        <h4 className="text-3xl font-bold mb-6 text-center text-white">Get My Rate Now</h4>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Full Name*" className="w-full p-3 rounded text-black" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" placeholder="Email Address*" className="w-full p-3 rounded text-black" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" placeholder="Subject" className="w-full p-3 rounded text-black" value={subject} onChange={(e) => setSubject(e.target.value)} />
                            <textarea placeholder="Message" className="w-full h-32 p-3 rounded text-black" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded hover:bg-green-600 transition-colors">
                               {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>

            <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                {/* Stats Section */}
                <div className="bg-slate-600 rounded-lg p-4 mb-8">
                    <div className="flex flex-wrap justify-between text-white text-center">
                        <div className="w-1/2 sm:w-1/4 mb-4 sm:mb-0 flex flex-col items-center gap-2">
                            <span><CiMedal size={50} /></span>
                            <p className=" sm:text-sm font-semibold text-white text-xl">Best Factoring<br />Company of 2021</p>
                        </div>
                        <div className="w-1/2 sm:w-1/4 mb-4 sm:mb-0 flex flex-col items-center gap-2">
                            <span><BsBuilding size={50} /></span>
                            <p className=" sm:text-sm font-semibold text-white text-xl">$2 Billion+ Funded<br />for Company Growth</p>
                        </div>
                        <div className="w-1/2 sm:w-1/4 flex flex-col items-center gap-2">
                            <span><FiUsers size={50} /></span>
                            <p className=" sm:text-sm font-semibold text-white text-xl">3,000+<br />Satisfied Clients</p>
                        </div>
                        <div className="w-1/2 sm:w-1/4 flex flex-col items-center gap-2">
                            <span><IoThumbsUpOutline size={50} /></span>
                            <p className=" sm:text-sm font-semibold text-white tex">A+ Rating Better<br />Business Bureau</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
                        Are your receivables building<br className="hidden sm:inline" />
                        up, but <span className="text-blue-600">your cash flow is tight?</span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Video Section */}
                        <div className="w-full md:w-1/2">
                            <div className="relative pb-[56.25%]">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Universal Funding: Need Working Capital Fast?"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full md:w-1/2">
                            <p className="text-lg mb-6">
                                Universal Funding funds up to 90% of your invoices, offering you a critical boost in cash flow helping you
                                pay your employees, vendors and other expenses while you wait for your customers to pay their bills.
                            </p>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition duration-300 text-lg">
                                Get Funded Fast
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <section className="bg-[#f0f8ff] py-12 px-4">
                <div className="max-w-6xl mx-auto ">
                    <h2 className="text-4xl font-bold text-center !mb-12">
                        Specialized funding <span className="text-blue-600">solutions for your industry</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6">
                        {industries.map((industry, index) => (
                            <div key={index} className="flex flex-row items-center justify-center ">
                                <div className="flex items-center justify-start w-[12rem] gap-2">
                                    <industry.icon className={`text-2xl ${industry.color}`} />
                                    <span className="text-sm font-medium">{industry.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-4xl font-bold text-center !mb-10 text-blue-900">
                    <span className="text-black">Why</span> invoice factoring is your best choice
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bank Line of Credit */}
                    <div className="border rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">Bank Line of Credit</h2>
                        <p className="text-sm text-blue-500 mb-2">Credit Line:</p>
                        <p className="text-2xl font-bold mb-4">$20,000-$500,000</p>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">▲</span>
                                <span>Advance Rate: 85-90%</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">▲</span>
                                <span>First 30 Days: 2-4%</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">▲</span>
                                <span>Requires access to accounting software and bank account for approval</span>
                            </li>
                        </ul>
                    </div>

                    {/* Universal Funding Corporation */}
                    <div className="border rounded-lg p-6 shadow-md bg-blue-600 text-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-white">Universal Funding Corporation</h2>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm mb-2 text-white">Invoice Monthly Volume:</p>
                        <p className="text-2xl font-bold mb-4 text-white/70">$25K- $20M/mo</p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">✓</span>
                                <span>Advance Rate: up to 95%</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">✓</span>
                                <span>First 30 Days: 0.55-2%</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-yellow-400 mr-2">✓</span>
                                <span>Does not require access to your private banking and accounting information</span>
                            </li>
                        </ul>
                        <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition duration-300">
                            Get Funded Fast →
                        </button>
                    </div>

                    {/* Merchant Cash Advance Provider */}
                    <div className="border rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">Merchant Cash Advance Provider</h2>
                        <p className="text-sm text-blue-500 mb-2">Credit Line:</p>
                        <p className="text-2xl font-bold mb-4">$1,000-$500,000</p>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">▲</span>
                                <span>Advance Rate: Based on loan amount</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">▲</span>
                                <span>Fixed loan fee rate: 35-50%</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">▲</span>
                                <span>Requires access to bank account for daily withdrawals</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page