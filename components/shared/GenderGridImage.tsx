import React from 'react'
import ManPic from '../../public/assets/images/man-in-white-and-light-tan-outfit.jpg'
import Image from 'next/image'

export default function GenderGridImage() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-12">
            {/* Image 1 */}
            <div className="relative group overflow-hidden border-lg">
                <div className="h-full w-full transition-transform  transform group-hover:scale-105" style={{ transition: 'transform 1s ease-in-out' }}>
                    <Image
                        src={ManPic}
                        alt="Men"
                        className="h-full w-full object-cover border-lg"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-35 border-lg group-hover:bg-opacity-50 flex flex-col items-center justify-center text-white transition-opacity">
                    <h2 className="text-xl font-medium tracking-wider">Men</h2>
                    <button className="mt-4 px-6 py-2 font-sans font-medium tracking-wider hover:bg-white hover:text-black border border-solid text-white shadow-md opacity-0 group-hover:opacity-100 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-1000">
                        View Collection
                    </button>
                </div>
            </div>

            {/* Image 2 */}
            <div className="relative group overflow-hidden border-lg">
                <div className="h-full w-full transition-transform  transform group-hover:scale-105" style={{ transition: 'transform 1s ease-in-out' }}>
                    <img
                        src="https://sfycdn.speedsize.com/f872e742-7b4a-4913-b7dc-4d0ce34f2142/https://ash-luxe.com/cdn/shop/files/Women_Card_900x.png?v=1732712936"
                        alt="Women"
                        className="h-full w-full object-cover border-lg"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-35 group-hover:bg-opacity-50 flex flex-col items-center justify-center text-white transition-opacity">
                    <h2 className="text-xl font-medium tracking-wider">Women</h2>
                    <button className="mt-4 px-6 py-2 font-sans font-medium tracking-wider text-sm hover:bg-white hover:text-black border border-solid text-white  shadow-md opacity-0 group-hover:opacity-100 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-1000" >
                        View Collection
                    </button>
                </div>
            </div>

        </div>

    )
}
