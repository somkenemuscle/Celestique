'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from 'lucide-react';
import { navigation } from '@/constants/navigation';
import Link from 'next/link';
import { getCart } from '@/services/cart';
import useCartStore from '@/store/cartStore';
import useFirstNameStore from '@/store/usernameStore';
import DropDown from '../ui/DropDown';
import ProductDropdown from '../ui/ProductDropdown';


export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { firstname, setFirstname } = useFirstNameStore();
    const cartItemCount = useCartStore((state) => state.cart.items.length);
    const setGlobalCart = useCartStore((state) => state.setGlobalCart);

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const navRef = useRef<HTMLElement | null>(null);

    function closeMenus() {
        setShowUserMenu(false);
        setOpenCategory(null);
    }

    // Close desktop menus on outside click or Escape
    useEffect(() => {
        function handlePointer(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                closeMenus();
            }
        }
        function handleKey(event: KeyboardEvent) {
            if (event.key === 'Escape') closeMenus();
        }
        document.addEventListener('mousedown', handlePointer);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handlePointer);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    useEffect(() => {
        const storedFirstname = localStorage.getItem('firstname');
        if (storedFirstname) setFirstname(storedFirstname);

        async function fetchCart() {
            try {
                const res = await getCart();
                useCartStore.getState().setGlobalCart(res.cart);
            } catch (error) {
                console.error(error);
                setGlobalCart({ items: [], subtotal: 0, deliveryFee: 0, totalPrice: 0 });
            }
        }
        fetchCart();
    }, [firstname]);

    function toggleCategory(id: string) {
        setShowUserMenu(false);
        setOpenCategory((prev) => (prev === id ? null : id));
    }

    function toggleUserMenu() {
        setOpenCategory(null);
        setShowUserMenu((prev) => !prev);
    }

    return (
        <div className="sticky top-0 z-50 w-full bg-white">
            {/* Mobile slide-over menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-ink-900/30 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-50 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
                            <span className="font-display text-xl font-medium tracking-[0.02em] text-ink-900">Celestique</span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="-mr-1.5 p-1.5 text-ink-500 hover:text-ink-900"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>

                        {/* Categories */}
                        <div className="px-5 py-6">
                            {navigation.categories.map((category) => (
                                <div key={category.id} className="mb-7 last:mb-0">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-900">
                                        {category.name}
                                    </p>
                                    <ul className="mt-4 flex flex-col space-y-3.5">
                                        {category.sections.flatMap((section) => section.items).map((item) => (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setOpen(false)}
                                                    className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Pages */}
                        <div className="space-y-4 border-t border-ink-100 px-5 py-6">
                            {navigation.pages.map((page) => (
                                <Link
                                    key={page.name}
                                    href={page.href}
                                    onClick={() => setOpen(false)}
                                    className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-900"
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </div>

                        {/* Account */}
                        <div className="mt-auto space-y-4 border-t border-ink-100 px-5 py-6 text-sm">
                            {firstname ? (
                                <>
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">Hi, {firstname}</p>
                                    <Link href="/customer/orders" onClick={() => setOpen(false)} className="block text-ink-700 hover:text-ink-900">
                                        Your orders
                                    </Link>
                                    <Link href="/customer/wishlist" onClick={() => setOpen(false)} className="block text-ink-700 hover:text-ink-900">
                                        Wishlist
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/sign-in" onClick={() => setOpen(false)} className="block text-ink-700 hover:text-ink-900">
                                        Sign in
                                    </Link>
                                    <Link href="/register" onClick={() => setOpen(false)} className="block text-ink-700 hover:text-ink-900">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative border-t border-ink-100 bg-white">
                <nav ref={navRef} aria-label="Top" className="mx-auto max-w-full px-3 sm:px-6 lg:px-10">
                    {/* Main row */}
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
                            <Link href="/" onClick={closeMenus} className="pointer-events-auto">
                                <h1 className="font-display text-2xl font-medium tracking-[0.02em] text-ink-900 sm:text-3xl lg:text-[2rem]">
                                    Celestique
                                </h1>
                            </Link>
                        </div>

                        {/* Right: actions */}
                        <div className="flex flex-1 items-center justify-end lg:flex-none">
                            <div className="relative hidden lg:flex">
                                {firstname ? (
                                    <button
                                        onClick={toggleUserMenu}
                                        className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600 outline-none transition-colors hover:text-ink-900"
                                    >
                                        Hi, {firstname}
                                        <ChevronDownIcon
                                            className={`h-4 w-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href="/sign-in"
                                        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600 hover:text-ink-900"
                                    >
                                        Sign in
                                    </Link>
                                )}
                                {showUserMenu && firstname && <DropDown onNavigate={closeMenus} />}
                            </div>

                            <div className="hidden lg:ml-6 lg:flex lg:items-center">
                                <img
                                    alt="Nigeria"
                                    src="https://flagcdn.com/w320/ng.png"
                                    className="block h-auto w-5 shrink-0"
                                />
                                <span aria-hidden="true" className="ml-6 h-5 w-px bg-ink-200" />
                            </div>

                            <div className="flex lg:ml-5">
                                <Link href="/customer/wishlist" onClick={closeMenus} className="p-1.5 text-ink-900 hover:text-ink-500 lg:p-2">
                                    <span className="sr-only">Wishlist</span>
                                    <HeartIcon aria-hidden="true" className="size-5 lg:size-6" />
                                </Link>
                            </div>

                            <div className="flex">
                                <Link href="/search" onClick={closeMenus} className="p-1.5 text-ink-900 hover:text-ink-500 lg:p-2">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon aria-hidden="true" className="size-5 lg:size-6" />
                                </Link>
                            </div>

                            <div className="flow-root">
                                <Link href="/cart" onClick={closeMenus} className="group relative flex items-center p-1.5 text-ink-900 lg:p-2">
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

                    {/* Category bar */}
                    <div className="hidden border-b border-ink-100 lg:block">
                        <ul className="flex items-center justify-center gap-x-10 py-3.5 text-[12px] font-bold uppercase tracking-[0.2em] text-ink-900">
                            {navigation.categories.map((category) => {
                                const links = category.sections.flatMap((section) =>
                                    section.items.map((item) => ({ name: item.name, href: item.href }))
                                );
                                const isOpen = openCategory === category.id;
                                return (
                                    <li key={category.id} className="relative">
                                        <button
                                            onClick={() => toggleCategory(category.id)}
                                            aria-expanded={isOpen}
                                            className={`inline-flex items-center gap-1 uppercase transition-colors ${isOpen ? 'text-ink-500' : 'hover:text-ink-500'}`}
                                        >
                                            {category.name}
                                            <ChevronDownIcon
                                                className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3">
                                                <div className="animate-nav-flyout">
                                                    <ProductDropdown links={links} onNavigate={closeMenus} />
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}

                            {navigation.pages.map((page) => (
                                <li key={page.name}>
                                    <Link
                                        href={page.href}
                                        onClick={closeMenus}
                                        className="link-underline hover:text-ink-500"
                                    >
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
