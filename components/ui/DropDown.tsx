'use client'

import Link from "next/link"
import { LogOut } from "@/services/auth"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useFirstNameStore from "@/store/usernameStore";

export default function DropDown({ onNavigate }: { onNavigate?: () => void }) {
    const { setFirstname } = useFirstNameStore();
    const router = useRouter();

    async function HandleLogOut() {
        onNavigate?.();
        try {
            const res = await LogOut();
            router.push('/sign-in');
            toast.success(res.message);
            localStorage.removeItem('firstname');
            setFirstname('');
        } catch (error) {
            console.log(error);
        }
    }

    const item =
        "block w-full px-4 py-2.5 text-left text-[11px] uppercase tracking-[0.16em] transition-colors";

    return (
        <div className="animate-nav-flyout absolute right-0 top-full mt-3 w-52 border border-ink-100 bg-white shadow-[0_18px_50px_-18px_rgba(17,17,17,0.28)]">
            <ul className="py-2">
                <li>
                    <Link href="/customer/orders" onClick={onNavigate} className={`${item} text-ink-500 hover:bg-ink-50 hover:text-ink-900`}>
                        Your orders
                    </Link>
                </li>
                <li>
                    <Link href="/customer/wishlist" onClick={onNavigate} className={`${item} text-ink-500 hover:bg-ink-50 hover:text-ink-900`}>
                        Wishlist
                    </Link>
                </li>
                <li className="mt-1 border-t border-ink-100 pt-1">
                    <button onClick={HandleLogOut} className={`${item} text-ink-500 hover:bg-ink-50 hover:text-red-600`}>
                        Log out
                    </button>
                </li>
            </ul>
        </div>
    )
}
