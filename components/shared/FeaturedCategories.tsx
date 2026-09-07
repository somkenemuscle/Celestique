import Image from 'next/image';
import Link from 'next/link';

const categories = [
    {
        name: 'Tops',
        href: '/products/collections/women/tops',
        image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S3_8_SKE7959_MultiColor_TK_IM_10-07-14_82848_PXF.jpg?v=1730150986&width=800&height=1000&crop=center',
    },
    {
        name: 'Dresses',
        href: '/products/collections/women/dresses',
        image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/11-07-24_S7_81_WJCS2691_WhiteBlack_CZ_DJ_14-26-49_39405_PXF.jpg?v=1731347683&width=800&height=1000&crop=center',
    },
    {
        name: 'Shirts',
        href: '/products/collections/men/shirts',
        image: 'https://cdn.shopify.com/s/files/1/0293/9277/files/10-25-24_S3_8_SKE7959_MultiColor_TK_IM_10-07-14_82848_PXF.jpg?v=1730150986&width=800&height=1000&crop=center',
    },
];

export default function FeaturedCategories() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-20">
            <div className="mb-10 text-center">
                <span className="eyebrow">Browse</span>
                <h2 className="mt-2 font-display text-3xl font-medium text-ink-900 sm:text-4xl">Shop by category</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
                {categories.map((cat) => (
                    <Link key={cat.name} href={cat.href} className="group relative block overflow-hidden">
                        <div className="aspect-[3/4] overflow-hidden bg-ink-100">
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                width={800}
                                height={1000}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-transparent p-6">
                            <span className="border-b border-white pb-1 font-display text-2xl text-white">
                                {cat.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
