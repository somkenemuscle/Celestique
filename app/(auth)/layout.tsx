export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="mx-auto w-full max-w-xl px-4 py-16 sm:py-20">
            {children}
        </main>
    );
}
