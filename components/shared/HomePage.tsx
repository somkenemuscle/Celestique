import React from 'react'
import TopSellerProducts from './TopSellerProducts'
import GenderGridImage from './GenderGridImage'
import ProductsList from './ProductsList'
import Banner from './Banner'
import Incentives from './Incentives'
import Footer from './Footer'

export default function HomePage() {
    return (
        <>
            <div className='mx-auto max-w-6xl lg:px-9 px-6 pb-6 mt-16 lg:max-w-7xl '>
                <TopSellerProducts />
                <GenderGridImage />


                <ProductsList />
                <Banner />
                <ProductsList />
            </div>
            <Incentives />

        </>
    )
}
