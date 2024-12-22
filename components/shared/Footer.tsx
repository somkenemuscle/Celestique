'use client';

import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white items-start pt-16 pb-10 bottom-0 mt-24">
            <div className=" mx-auto  sm:px-7 lg:px-9 px-6">
                {/* Grid layout */}
                <div className="flex flex-col md:justify-between md:flex-row">
                    {/* Logo and description */}
                    <div>
                        <h2 className="text-2xl font-bold">Celestique</h2>
                        <p className="mt-3 text-gray-400">
                        Where elegance meets excellence. At Celestique,<br/> we craft garments that embody grace, sophistication,<br/> and timeless style.
                        </p>
                        <h3 className="text-lg font-semibold mb-4 mt-5">Stay Connected</h3>
                        <div className="flex space-x-4 mb-4">
                            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-white hover:scale-150 hover:transition-transform hover:object-scale-down" style={{ transition: 'transform 0.2s ease-in-out' }}>
                                <FaFacebook size={20} />
                            </Link>
                            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white hover:scale-150 hover:transition-transform hover:object-scale-down" style={{ transition: 'transform 0.2s ease-in-out' }}>
                                <FaInstagram size={20} />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-white hover:scale-150 hover:transition-transform hover:object-scale-down" style={{ transition: 'transform 0.2s ease-in-out' }}>
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white hover:scale-150 hover:transition-transform hover:object-scale-down" style={{ transition: 'transform 0.2s ease-in-out' }}>
                                <FaLinkedin size={20} />
                            </Link>
                        </div>
                        
                    </div>

                    {/* Quick Links */}
                    <div className='md:text-start  md:px-28'>
                        <h3 className="text-lg font-semibold md:mb-4 mb-3 mt-5 md:mt-0">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link href="#" className="hover:text-gray-300 ">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <a href="/producs" className="hover:text-white">
                                    Shop
                                </a>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media & Newsletter */}
                    {/* <div>
                        <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
                        <div className="flex space-x-4 mb-4">
                            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
                                <FaFacebook size={20} />
                            </Link>
                            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
                                <FaInstagram size={20} />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
                                <FaLinkedin size={20} />
                            </Link>
                        </div>
                        
                    </div> */}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row md:justify-between text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Celestique. All Rights Reserved.</p>
                    <div className="md:space-x-4 md:inline-flex">
                        <p  className="hover:text-white">
                            Privacy Policy
                        </p>
                        <p className="hover:text-white">
                            Terms of Service
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

  
