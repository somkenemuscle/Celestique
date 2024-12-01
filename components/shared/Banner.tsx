import React from 'react'
import Image from 'next/image'
import banner from '../../public/assets/images/banner2.png.png'

export default function Banner() {
    return ( 
        <div className="h-96 my-12  relative">
            <Image
                src={banner}
                alt="Description of the image"
                className="h-full w-full border-lg object-cover"
            />
            <div className="absolute inset-0 flex flex-col font-sans items-center lg:items-start  lg:pl-14   justify-center text-center z-10 text-white">
                <h2 className="text-5xl font-bold mb-2 tracking-widest text-pretty">Discover your style</h2>
                <h2 className="text-2xl font-semibold tracking-wide text-pretty mb-2">Transform your look, transform your life </h2>
                <h2 className="text-xl font-semibold tracking-wide  text-pretty mb-7">Confidence begins here</h2>
                <button className="mt-20 px-6 py-2 tracking-wide font-medium text-lg items-center hover:bg-white hover:text-black hover:border-black border border-solid text-white border-white">
                    SHOP NOW
                </button>
            </div>
        </div>


    )
}
