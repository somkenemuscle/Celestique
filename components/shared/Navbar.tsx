import Link from "next/link"

function Navbar() {
    return (
        <nav>
            <Link href={'/products'}><button className='bg-slate-700 p-4'>
                Products</button>
            </Link>

            <Link href={'/products/collections/men'}><button className='bg-slate-700 p-4'>
                Men</button>
            </Link>

            <Link href={'/products/collections/women'}><button className='bg-slate-700 p-4'>
                Women</button>
            </Link>

            <Link href={'/sign-in'}><button className='bg-slate-700 p-4'>
                Login</button>
            </Link>

            <Link href={'/products'}><button className='bg-slate-700 p-4'>
                Search</button>
            </Link>
        </nav>
    )
}

export default Navbar