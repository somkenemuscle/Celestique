'use client';

import Link from 'next/link';

export default function Footer() {
    const sections = [
        {
            title: 'About Us',
            links: [
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
            ],
        },
        {
            title: 'Customer Service',
            links: [
                { href: '/shipping', label: 'Shipping Policy' },
                { href: '/returns', label: 'Return Policy' },
                { href: '/terms', label: 'Terms of Service' },
            ],
        },
        {
            title: 'Stay Connected',
            links: [
                {
                    href: 'https://www.facebook.com',
                    label: 'Facebook',
                    external: true,
                },
                {
                    href: 'https://www.instagram.com',
                    label: 'Instagram',
                    external: true,
                },
                {
                    href: 'https://www.twitter.com',
                    label: 'Twitter',
                    external: true,
                },
            ],
        },
        {
            title: 'Need Help?',
            links: [
                {
                    href: '/search',
                    label: 'Search',
                    external: true,
                },
                {
                    href: 'https://www.instagram.com',
                    label: 'Instagram',
                    external: true,
                },
                {
                    href: 'https://www.twitter.com',
                    label: 'Twitter',
                    external: true,
                },
            ],
        },
    ];

    return (
        <>
            <div className='bg-white text-gray-600 text-sm font-sans p-4 lg:p-10 text-left lg:text-center border mt-20 border-t-gray-300'>
                <h1 className='font-extrabold text-sm tracking-wider mb-4 text-black'>ABOUT US</h1>
                We are more than just a brand. We aim to inspire confidence when it comes to how you dress and present yourself to the world. We have gone beyond offering just women’s clothing and accessories, to become an authority in fashion and beauty in our own right, endeavoring to build a community of #EveryBODYinPLT. If fast delivery and easy returns are your thing then PLT should be your go-to for women’s clothing online.
            </div>
            <footer className="bg-black text-white py-8 font-sans text-sm">

                <div className="container mx-auto px-4">
                    <div className="leading-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20 mt-10">
                        {sections.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-sm font-bold mb-4">{section.title}</h3>
                                <ul>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.href}
                                                className="hover:underline text-gray-300"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8 border-t border-gray-200 pt-4">
                        <p className="text-xs">&copy; 2024 Celestique. All rights reserved</p>
                    </div>
                </div>
            </footer>
        </>

    );
}


