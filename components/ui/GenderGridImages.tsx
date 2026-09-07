import Image from 'next/image'
import Link from 'next/link'

const panels = [
    {
        label: 'Men',
        href: '/products/collections/men',
        image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/11-07-24_S7_81_WJCS2691_WhiteBlack_CZ_DJ_14-26-49_39405_PXF.jpg?v=1731347683&width=1200&height=1500&crop=center',
    },
    {
        label: 'Women',
        href: '/products/collections/women',
        image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S3_8_SKE7959_MultiColor_TK_IM_10-07-14_82848_PXF.jpg?v=1730150986&width=1200&height=1500&crop=center',
    },
]

export default function GenderGridImage() {
    return (
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-6 lg:px-20">
            {panels.map((panel) => (
                <Link
                    key={panel.label}
                    href={panel.href}
                    className="group relative block h-[70vh] min-h-[440px] overflow-hidden bg-ink-900"
                >
                    <Image
                        src={panel.image}
                        alt={panel.label}
                        width={1200}
                        height={1500}
                        className="h-full w-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <h2 className="font-display text-4xl font-medium tracking-wide sm:text-5xl">{panel.label}</h2>
                        <span className="mt-5 inline-flex items-center border border-white/80 px-7 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 group-hover:bg-white group-hover:text-ink-900">
                            View collection
                        </span>
                    </div>
                </Link>
            ))}
        </section>
    )
}
