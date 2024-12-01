import Link from 'next/link'
import React from 'react'

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://sfycdn.speedsize.com/f872e742-7b4a-4913-b7dc-4d0ce34f2142/ash-luxe.com/cdn/shop/files/femalejerseyblack.png?v=1732179139&width=360',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '35',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Casual Shirt',
        href: '#',
        imageSrc: 'https://sfycdn.speedsize.com/f872e742-7b4a-4913-b7dc-4d0ce34f2142/ash-luxe.com/cdn/shop/files/AshluxeKalakutaShieldT-shirtWhite_9aad53fa-d2be-4c9d-bded-278715d6ce7c.png?v=1731681315&width=360',
        imageAlt: "Front of men's Casual Shirt in blue.",
        price: '45',
        color: 'Blue',
      },
      {
        id: 3,
        name: 'Sporty Hoodie',
        href: '#',
        imageSrc: 'https://sfycdn.speedsize.com/f872e742-7b4a-4913-b7dc-4d0ce34f2142/ash-luxe.com/cdn/shop/files/AshluxeZipUpDenimJacketBlack.png?v=1709206633&width=360',
        imageAlt: "Front of men's Sporty Hoodie in grey.",
        price: '60',
        color: 'Grey',
      },
      {
        id: 4,
        name: 'Classic Jeans',
        href: '#',
        imageSrc: 'https://sfycdn.speedsize.com/f872e742-7b4a-4913-b7dc-4d0ce34f2142/ash-luxe.com/cdn/shop/files/AshluxeFelaInspiredBadgeT-shirtBlack.png?v=1709206207&width=360',
        imageAlt: "Front view of Classic Jeans in dark denim.",
        price: '70',
        color: 'Dark Denim',
      }
      
    
  ]

export default function TopSellerProducts() {
    return (
            <div>
                <h2 className="text-xl font-sans tracking-normal text-gray-900">Top sellers</h2>
                <div className="mt-6 grid grid-cols-1  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                {products.map((product) => (
                    <div key={product.id} >
                        <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className="aspect-square w-full  object-cover lg:aspect-auto lg:h-80"
                        />
                        <div className="mt-5  px-1">

                            <h3 className="font-sans text-gray-900">
                                <Link href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0 truncate" />
                                    {product.name}
                                </Link>
                            </h3>
                            <p className="text-sm font-medium  text-gray-700">₦{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
           
            </div>
    )
}
