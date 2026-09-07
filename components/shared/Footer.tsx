'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { FooterSections } from '@/constants/footer';

export default function Footer() {
    return (
        <footer className="bg-ink-900 text-ink-300">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
                <div className="h-px bg-white/10" />
                <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.5fr_2fr]">
                    <div className="max-w-sm">
                        <h2 className="font-display text-2xl font-medium tracking-[0.02em] text-white">Celestique</h2>
                        <p className="mt-4 text-sm leading-relaxed text-ink-400">
                            A considered wardrobe for the everyday. Restrained design, honest
                            materials and pieces made to stay with you well beyond a single season.
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <Link href="#" aria-label="Instagram" className="text-ink-400 transition-colors hover:text-white">
                                <Instagram strokeWidth={1.5} className="h-5 w-5" />
                            </Link>
                            <Link href="#" aria-label="Facebook" className="text-ink-400 transition-colors hover:text-white">
                                <Facebook strokeWidth={1.5} className="h-5 w-5" />
                            </Link>
                            <Link href="#" aria-label="Twitter" className="text-ink-400 transition-colors hover:text-white">
                                <Twitter strokeWidth={1.5} className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {FooterSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white">
                                    {section.title}
                                </h3>
                                <ul className="mt-4 space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-ink-400 transition-colors hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pb-10 pt-6 sm:flex-row">
                    <p className="text-xs text-ink-500">&copy; {new Date().getFullYear()} Celestique. All rights reserved.</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-ink-500">Visa · Mastercard · Verve · Paystack</p>
                </div>
            </div>
        </footer>
    );
}
