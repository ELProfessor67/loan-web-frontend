"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathname = usePathname();
    return (
        <header className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
            <Image src="/assets/img/logo/logo.png" alt="Universal Funding Corporation Logo" width={100} height={50} />
            <div className="flex items-center space-x-4">
            
                <Link href="/login" className="bg-blue-600 text-white font-bold text-lg rounded-full px-6 py-2 hover:bg-blue-700 transition-colors">
                    Get Started
                </Link>
            </div>
        </header>
    )
}

export default Header