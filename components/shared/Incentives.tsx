'use client'
import { CheckCircleIcon, Ship, ShipIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react'
import { ShoppingCart } from 'react-feather';
import { FaShip } from 'react-icons/fa';

export default function Incentives() {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Data for the items
    const items = [

        {
            title: 'Secured Payment',
            description: [
                'Safe and encrypted payment',
                'methods for your peace of mind.',
            ],

            icon: <CheckCircleIcon className="w-8 h-8 " />,
            //check circle icon from react hero icons
        },
        {
            title: 'Delivery',
            description: [
                'On-time delivery with tracking',
                'available for your convenience.',
            ],
            icon: <ShoppingCart className="w-8 h-8 " />
            //carticon
        },
        {
            title: 'Shipping',
            description: [
                'Fast and reliable shipping',
                'to your doorstep, worldwide.',
            ],
            icon: <FaShip className="w-8 h-8 " />,
            ///shipping icon
        },
    ]

    // This function calculates the active index based on scroll position
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const scrollPosition = container.scrollLeft
            const itemWidth = container.offsetWidth // Item width is the container width
            const index = Math.floor(scrollPosition / itemWidth)
            setActiveIndex(index)
        }
    }

    // Add event listener for scroll event
    useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
        }

        // Cleanup on unmount
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    return (
        <div className="px-4 py-28 mt-16 bg-zinc-100">
            {/* Grid Layout for larger screens (above 768px) */}
            <div className="hidden md:grid grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-4">
                            {item.icon}
                        </div>
                        <h3 className='font-medium text-base'>{item.title}</h3>
                        <p className='text-base font-normal tracking-tight'>
                            {item.description.map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < item.description.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                ))}
            </div>

            {/* Carousel for smaller screens (below 768px) */}
            <div className="md:hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex scroll-container overflow-x-auto space-x-4"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth',
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full md:w-64 flex flex-col items-center text-center"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                {item.icon}
                            </div>
                            <h3 className='font-semibold'>{item.title}</h3>
                            <p className='text-base font-normal tracking-tighter'>
                                {item.description.map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < item.description.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots for tracking the position (only visible below 768px) */}
            <div className="md:hidden flex justify-center mt-4 space-x-2">
                {items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-black' : 'bg-gray-400'
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    )
}
