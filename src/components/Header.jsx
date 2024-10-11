"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const pathname = usePathname();
  return (
    <header>
                    {/* Header Start */}
                    <div className="header-area header-transparent">
                        <div className="main-header  header-sticky">
                            <div className="container-fluid">
                                <div className="row align-items-center">
                                    {/* Logo */}
                                    <div className="col-xl-2 col-lg-2 col-md-1">
                                        <div className="logo">
                                            <a href="/">
                                                <img src="assets/img/logo/logo.png" alt="" className='w-[8rem]'/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-10 col-lg-10 col-md-10">
                                        <div className="menu-main d-flex align-items-center justify-content-end">
                                            {/* Main-menu */}
                                            <div className="main-menu f-right d-none d-lg-block">
                                                <nav>
                                                    <ul id="navigation">
                                                        <li className={pathname == "/" && 'active'}>
                                                            <Link href="/">Home</Link>
                                                        </li>
                                                        <li  className={pathname == "/about" && 'active'}>
                                                            <Link href="/about">About</Link>
                                                        </li>
                                                        <li  className={pathname == "/services" && 'active'}>
                                                            <Link href="/services">Services</Link>
                                                        </li>
                                                        <li  className={pathname == "/contact" && 'active'}>
                                                            <Link href="/contact">Contact</Link>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                            <div className="header-right-btn f-right d-none d-lg-block">
                                                <Link href="/login" className="btn header-btn">
                                                    Get Stated
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mobile Menu */}
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Header End */}
                </header>
  )
}

export default Header