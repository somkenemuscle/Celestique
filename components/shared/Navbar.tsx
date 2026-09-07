'use client'

import { Fragment, useState, useRef } from 'react'
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
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { navigation } from '@/constants/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { getCart } from '@/services/cart';
import useCartStore from '@/store/cartStore';
import useFirstNameStore from '@/store/usernameStore';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import DropDown from '../ui/DropDown';
import ProductDropdown from '../ui/ProductDropdown';



export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { firstname, setFirstname } = useFirstNameStore();
    let cartItemCount = useCartStore((state) => state.cart.items.length);
    const setGlobalCart = useCartStore((state) => state.setGlobalCart);
    const [ShowDropDown, setShowDropDown] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Tracks the currently open dropdown
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownUlRef = useRef<HTMLUListElement | null>(null);



    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && dropdownUlRef.current && !dropdownUlRef.current.contains(event.target as Node)) {
                setShowDropDown(false);
                setOpenDropdown(null); // Close all dropdowns
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const storedFirstname = localStorage.getItem('firstname');
        if (storedFirstname) {
            setFirstname(storedFirstname);
        }
        async function fetchCart() {
            try {
                const res = await getCart();
                useCartStore.getState().setGlobalCart(res.cart);
            } catch (error) {
                setShowDropDown(false);
                console.error(error);
                setGlobalCart({
                    items: [],
                    subtotal: 0,
                    deliveryFee: 0,
                    totalPrice: 0
                });
            }
        }
        fetchCart();
    }, [firstname]);


    //Dropdown toggle function
    function DropDownFunc() {
        setShowDropDown(!ShowDropDown)
    }
    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    };



    return (
        <div className="sticky top-0 z-50 w-full bg-white">
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
                                            className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium uppercase tracking-[0.15em] text-gray-900 data-[selected]:border-ink-900 data-[selected]:text-ink-900"
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
                            {firstname ? (
                                <>
                                    <div className="flow-root">
                                        <Link href="/customer/orders" className="-m-2 block p-2 font-medium text-gray-900">
                                            Order History
                                        </Link>
                                    </div>
                                    <div className="flow-root font-medium">
                                        Logout
                                    </div>
                                </>

                            ) : (
                                <>
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
                                </>
                            )}

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
            <header className="relative border-t border-ink-100 bg-white">
                <nav aria-label="Top" className="mx-auto max-w-full px-3 sm:px-6 lg:px-10">
                    {/* Tier 2: main row */}
                    <div className="relative flex h-16 items-center justify-between border-b border-ink-100 lg:h-20">
                        {/* Left: menu (mobile / tablet only) */}
                        <div className="flex flex-1 items-center lg:flex-none">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="relative -ml-1.5 inline-flex items-center gap-2 p-1.5 text-ink-900 lg:hidden"
                            >
                                <span className="absolute -inset-0.5" />
                                <Bars3Icon aria-hidden="true" className="size-6" />
                                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] sm:inline">
                                    Menu
                                </span>
                            </button>
                        </div>

                        {/* Center: wordmark */}
                        <div className="pointer-events-none absolute inset-x-0 flex justify-center">
                            <Link href="/" className="pointer-events-auto">
                                <h1 className="font-display text-2xl font-medium tracking-[0.02em] text-ink-900 sm:text-3xl lg:text-[2rem]">
                                    Celestique
                                </h1>
                            </Link>
                        </div>

                        {/* Right: actions */}
                        <div className="flex flex-1 items-center justify-end lg:flex-none">
                            <div className="hidden lg:flex relative" ref={dropdownRef}>
                                <Link href={firstname ? '' : '/sign-in'} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600 hover:text-ink-900">
                                    {firstname ? (
                                        <button onClick={DropDownFunc} className="inline-flex items-center outline-none">
                                            Hi, {firstname}
                                            {ShowDropDown ? (
                                                <ChevronUpIcon className="pl-1 w-5 h-5" />
                                            ) : (
                                                <ChevronDownIcon className="pl-1 w-5 h-5" />
                                            )}
                                        </button>
                                    ) : (
                                        'Sign in'
                                    )}
                                </Link>
                                {ShowDropDown && <DropDown />}
                            </div>

                            <div className="hidden lg:ml-6 lg:flex lg:items-center">
                                <Link href="#" className="flex items-center hover:text-gray-800">
                                    <img
                                        alt="Flag of Nigeria"
                                        src="https://flagcdn.com/w320/ng.png"
                                        className="block h-auto w-5 shrink-0"
                                    />
                                </Link>
                                <span aria-hidden="true" className="ml-6 h-5 w-px bg-ink-200" />
                            </div>

                            <div className="flex lg:ml-5">
                                <Link href="/customer/wishlist" className="p-1.5 text-ink-900 hover:text-ink-500 lg:p-2">
                                    <span className="sr-only">WishLists</span>
                                    <HeartIcon aria-hidden="true" className="size-5 lg:size-6" />
                                </Link>
                            </div>

                            <div className="flex">
                                <Link href="/search" className="p-1.5 text-ink-900 hover:text-ink-500 lg:p-2">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon aria-hidden="true" className="size-5 lg:size-6" />
                                </Link>
                            </div>

                            <div className="flow-root">
                                <Link href="/cart" className="group relative flex items-center p-1.5 text-ink-900 lg:p-2">
                                    <ShoppingBagIcon aria-hidden="true" className="size-5 group-hover:text-ink-500 lg:size-6" />
                                    {cartItemCount > 0 && (
                                        <span className="absolute -right-0.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white lg:h-5 lg:w-5 lg:text-xs">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tier 3: category bar */}
                    <div className="hidden border-b border-ink-100 lg:block">
                        <ul
                            className="flex items-center justify-center gap-x-10 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-ink-900"
                            ref={dropdownUlRef}
                        >
                            {navigation.categories.map((category) => (
                                <li key={category.id} className="relative">
                                    <button
                                        onClick={() => toggleDropdown(category.id)}
                                        className="link-underline uppercase hover:text-ink-500"
                                    >
                                        {category.name}
                                    </button>
                                    {openDropdown === category.id && (
                                        <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-4">
                                            {category.sections.map((section) => (
                                                <ProductDropdown
                                                    key={section.id}
                                                    links={section.items.map((item) => ({
                                                        name: item.name,
                                                        href: item.href,
                                                    }))}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}

                            {navigation.pages.map((page) => (
                                <li key={page.name}>
                                    <Link href={page.href} className="link-underline hover:text-ink-500">
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}
