'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
    const [email, setEmail] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        toast.success('Thanks for subscribing');
        setEmail('');
    }

    return (
        <section className="bg-ink-900 text-white">
            <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:px-10">
                <span className="eyebrow text-white/60">Celestique Club</span>
                <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">
                    Be first to the new season
                </h2>
                <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
                    Early access to collections, private sales and styling notes, straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full border border-white/30 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="shrink-0 bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-900 transition-colors hover:bg-white/80"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
