import React from 'react'
import ManPic from '../../public/assets/images/boy.webp'
import WomanPic from '../../public/assets/images/girl2.webp'
import Image from 'next/image'
import Link from 'next/link'


export default function GenderGridImage() {
    return (
        <div className="h-[600px] grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-10 my-5  px-3 lg:px-8">
            {/* Image 1 */}
            <div className="relative group overflow-hidden border-lg">
                <div className=" transition-transform  transform group-hover:scale-105" style={{ transition: 'transform 1s ease-in-out' }}>
                    <Image
                        src={ManPic}
                        alt="Men"
                        width={500}
                        height={300}
                       className="w-full object-cover h-full border-lg"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 border-lg group-hover:bg-opacity-50 flex flex-col items-center justify-center text-white transition-opacity">
                    <h2 className="text-xl font-medium tracking-wider">Men</h2>
                    <Link href={'/products/collections/men'}>
                        <button className="mt-4 px-6 py-2 font-sans font-medium tracking-wider hover:bg-white hover:text-black border border-solid text-white shadow-md opacity-0 group-hover:opacity-100 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-1000">
                            View Collection
                        </button>
                    </Link>
                </div>
            </div>


            {/* Image 2 */}
            <div className=" relative group overflow-hidden border-lg">
                <div className=" transition-transform  transform group-hover:scale-105" style={{ transition: 'transform 1s ease-in-out' }}>
                    <Image
                        src={WomanPic}
                        alt="Women"
                        width={500}
                        height={500}
                        className="w-full object-cover border-lg"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0  group-hover:bg-opacity-50 flex flex-col items-center justify-center text-white transition-opacity">
                    <h2 className="text-xl font-medium tracking-wider">Women</h2>
                    <Link href={'/products/collections/women'}>
                        <button className="mt-4 px-6 py-2 font-sans font-medium tracking-wider text-sm hover:bg-white hover:text-black border border-solid text-white  shadow-md opacity-0 group-hover:opacity-100 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-1000" >
                            View Collection
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}