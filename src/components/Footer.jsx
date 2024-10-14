import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-[#0a1f44] text-white py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h2 className="font-bold text-lg mb-4 text-white">SERVICES</h2>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">Accounts Receivable Financing</a></li>
                                <li><a href="#" className="hover:underline">Invoice Factoring</a></li>
                                <li><a href="#" className="hover:underline">Loan Workouts</a></li>
                                <li><a href="#" className="hover:underline">Payroll Funding</a></li>
                                <li><a href="#" className="hover:underline">Purchase Order Financing</a></li>
                                <li><a href="#" className="hover:underline">Tax Lien Resolution</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg mb-4 text-white">RESOURCES</h2>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">Invoice Factoring Rates</a></li>
                                <li><a href="#" className="hover:underline">FAQs</a></li>
                                <li><a href="#" className="hover:underline">Financial Calculators</a></li>
                                <li><a href="#" className="hover:underline">How Invoice Factoring Works</a></li>
                                <li><a href="#" className="hover:underline">Insights Blog</a></li>
                                <li><a href="#" className="hover:underline">QuickBooks Reconciliation</a></li>
                                <li><a href="#" className="hover:underline">What Does a Factoring Company Do?</a></li>
                                <li><a href="#" className="hover:underline">White Papers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg mb-4 text-white">PARTNER WITH US</h2>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">Broker Referral Program</a></li>
                                <li><a href="#" className="hover:underline">Careers</a></li>
                                <li><a href="#" className="hover:underline">Company Reviews</a></li>
                                <li><a href="#" className="hover:underline">Industries We Serve</a></li>
                                <li><a href="#" className="hover:underline">What is a Factoring Company</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg mb-4 text-white">COMPANY INFO</h2>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">About Us</a></li>
                                <li><a href="#" className="hover:underline">Careers</a></li>
                                <li><a href="#" className="hover:underline">Insights Blog</a></li>
                                <li><a href="#" className="hover:underline">Our Team</a></li>
                                <li><a href="#" className="hover:underline">Contact Us</a></li>
                            </ul>
                            <h2 className="font-bold text-lg mt-6 mb-4">CUSTOMERS</h2>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:underline">eFactor Login</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 text-center">
                        <img src="/assets/img/logo/logo.png" alt="Universal Funding Corporation" className="mx-auto mb-4 h-12 w-auto" />
                        <p className="text-xs">
                            Copyright © 2009-{new Date().getFullYear()} Universal Funding Corporation and its related entities. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer