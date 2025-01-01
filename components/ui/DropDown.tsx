'use client'

import Link from "next/link"
import { LogOut } from "@/services/auth"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useFirstNameStore from "@/store/usernameStore";

export default function DropDown() {
    const { setFirstname } = useFirstNameStore();
    const router = useRouter();

    async function HandleLogOut() {
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

    return (
        <div className="z-50  top-full absolute  bg-white border rounded w-44 mt-3 justify-center shadow-sm tracking-wide">
            <ul className="p-3 text-sm">
                <Link href={'/customer/orders'}> <li className="px-3 py-2 hover:bg-gray-100 hover:rounded">Your Orders</li></Link>
                <hr className="my-3" />
                <button onClick={HandleLogOut} className="px-3 py-2 bg-red-700 hover:bg-red-500 text-white justify-self-center rounded w-full">Logout</button>
            </ul>
        </div>
    )
}