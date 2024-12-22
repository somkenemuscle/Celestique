'use client'
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}
