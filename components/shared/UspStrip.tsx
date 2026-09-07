import { Truck, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';

const items = [
    { icon: Truck, title: 'Free delivery', copy: 'On all orders above ₦15,000' },
    { icon: RefreshCw, title: 'Easy returns', copy: '14-day hassle-free returns' },
    { icon: ShieldCheck, title: 'Secure checkout', copy: 'Encrypted payments, always' },
    { icon: Sparkles, title: 'Authentic pieces', copy: 'Sourced and quality-checked' },
];

export default function UspStrip() {
    return (
        <section className="border-y border-ink-100 bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 sm:px-10 lg:grid-cols-4 lg:px-20">
                {items.map(({ icon: Icon, title, copy }) => (
                    <div key={title} className="flex flex-col items-center gap-2 text-center">
                        <Icon strokeWidth={1.25} className="h-6 w-6 text-ink-700" />
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-900">{title}</p>
                        <p className="text-xs text-ink-400">{copy}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
