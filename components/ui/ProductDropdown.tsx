'use client'

import Link from "next/link"

export default function ProductDropdown({ links }: ProductDropdownProps) {

    return (
        <div className="z-50  top-full absolute  bg-white border rounded w-44 mt-3 justify-center shadow-sm tracking-wide">
            <ul className="p-3 text-sm">
                {links.map((link, index) => (
                    <li key={index} className="px-3 py-2 hover:bg-gray-100 hover:rounded">
                        <Link href={link.href} className="hover:text-gray-600">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}