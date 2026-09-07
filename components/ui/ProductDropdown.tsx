'use client'

import Link from "next/link"

export default function ProductDropdown({ links, onNavigate }: ProductDropdownProps) {
    return (
        <div className="min-w-[13rem] border border-ink-100 bg-white shadow-[0_18px_50px_-18px_rgba(17,17,17,0.28)]">
            <ul className="py-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="block px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
