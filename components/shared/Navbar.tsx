'use client'

import { Fragment, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline'
import { navigation } from '@/constants/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { getCart } from '@/services/cart'
import useCartStore from '@/store/cartStore'


export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { setGlobalCart } = useCartStore();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [firstname, setFirstname] = useState('');


    //Get users firstname
    function GetFirstname() {
        const firstname = localStorage.getItem('firstname');
        if (firstname) {
            setFirstname(firstname);
        }
    }


    //Fetch Users Cart
    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await getCart();
                setGlobalCart(res.cart)
            } catch (error) {
                console.error(error);
            }
        }
        GetFirstname();
        fetchCart();


        // Listen to cart changes using Zustand subscribe
        const unsubscribe = useCartStore.subscribe((state) => {
            const newCount = state.cart.items.length; // Extract the specific value
            setCartItemCount(newCount); // Update the local state
        });

        // Cleanup the subscription on unmount
        return () => unsubscribe();
    }, [setGlobalCart]);



    return (
        <div className="bg-white w-full fixed top-0 z-50">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden lg:fixed">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>



                        {/* Links */}
                        <TabGroup className="mt-2">
                            <div className="border-b border-gray-200">
                                <TabList className="-mb-px flex space-x-8 px-4">
                                    {navigation.categories.map((category) => (
                                        <Tab
                                            key={category.name}
                                            className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                                        >
                                            {category.name}
                                        </Tab>
                                    ))}
                                </TabList>
                            </div>
                            <TabPanels as={Fragment}>
                                {navigation.categories.map((category) => (
                                    <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                        <div className="grid grid-cols-2 gap-x-4">

                                        </div>
                                        {category.sections.map((section) => (
                                            <div key={section.name}>
                                                <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                    {section.name}
                                                </p>
                                                <ul
                                                    role="list"
                                                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                    className="mt-6 flex flex-col space-y-6"
                                                >
                                                    {section.items.map((item) => (
                                                        <li key={item.name} className="flow-root">
                                                            <Link href={item.href} className="-m-2 block p-2 text-gray-500">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className="flow-root">
                                <Link href="/sign-in" className="-m-2 block p-2 font-medium text-gray-900">
                                    Sign in
                                </Link>
                            </div>
                            <div className="flow-root">
                                <Link href="/register" className="-m-2 block p-2 font-medium text-gray-900">
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6">
                            <Link href="#" className="-m-2 flex items-center p-2">
                                <img
                                    alt=""
                                    src="https://flagcdn.com/w320/ng.png"
                                    className="block h-auto w-5 shrink-0"
                                />
                            </Link>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>


            {/* ON LARGE SCREEN */}
            <header className="relative bg-gray-50 border-b border-gray-200">
                <p className="p-3 text-center tracking-wider bg-black px-4 text-xs text-white sm:px-6 lg:px-10">
                    FREE DELIVERY ON ORDERS ABOVE ₦10,000!*
                </p>

                <nav aria-label="Top" className="mx-auto max-w-full  px-4 py-2 sm:px-6 lg:px-20">
                    <div className="">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative rounded-md  p-2 text-gray-500 lg:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <h1 className="font-extrabold text-" id='logo'> ᥫ᭡ Celestique</h1>
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            <div className="relative flex">
                                                <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium  transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-gray-900 data-[open]:text-gray-900">
                                                    {category.name}
                                                </PopoverButton>
                                            </div>

                                            <PopoverPanel
                                                transition
                                                className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                                                <div className="relative bg-white">
                                                    <div className="mx-auto max-w-full px-20">
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">

                                                            </div>
                                                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                {category.sections.map((section) => (
                                                                    <div key={section.name}>
                                                                        <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                            {section.name}
                                                                        </p>
                                                                        <ul
                                                                            role="list"
                                                                            aria-labelledby={`${section.name}-heading`}
                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                        >
                                                                            {section.items.map((item) => (
                                                                                <li key={item.name} className="flex">
                                                                                    <Link href={item.href} className="hover:text-gray-800">
                                                                                        {item.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverPanel>
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium  hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </PopoverGroup>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <Link href={firstname ? '#' : '/register'} className="text-sm font-medium  hover:text-gray-800">
                                        {firstname ? `Hi, ${firstname}` : 'Register'}
                                    </Link>

                                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                    <Link href={firstname ? '#' : '/sign-in'} className="text-sm font-medium  hover:text-gray-800">
                                        {firstname ? 'Contact Us' : 'Sign In'}

                                    </Link>
                                </div>

                                <div className="hidden lg:ml-8 lg:flex">
                                    <Link href="#" className="flex items-center  hover:text-gray-800">
                                        <img
                                            alt="Flag of Nigeria"
                                            src="https://flagcdn.com/w320/ng.png"
                                            className="block h-auto w-5 shrink-0"
                                        />

                                        {/* <span className="ml-3 block text-sm font-medium">NIG</span> */}
                                    </Link>
                                    <span aria-hidden="true" className="ml-6 h-6 w-px bg-gray-300" />

                                </div>


                                <div className="flex lg:ml-8">
                                    <Link href="#" className="p-2  hover:text-gray-500">
                                        <span className="sr-only">WishList</span>
                                        <HeartIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>


                                {/* Search */}
                                <div className="flex lg:ml-1">
                                    <Link href="/search" className="p-2  hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                                    </Link>
                                </div>


                                {/* Cart */}
                                <div className="ml-2 flow-root lg:ml-3">
                                    <Link href="/cart" className="group -m-2 flex items-center p-2 relative">
                                        <ShoppingBagIcon
                                            aria-hidden="true"
                                            className="w-6 h-6  group-hover:text-gray-500"
                                        />
                                        {cartItemCount > 0 && (
                                            <span className="absolute top-1 -right-0 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-xs font-bold">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
