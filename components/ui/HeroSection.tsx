import Link from "next/link";


function HeroSection() {
    return (
        <div>
            <Link href='/products'>
                <video
                    src="https://cdn.shopify.com/videos/c/o/v/189099819a87448e8de16605f2ba18f1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                >
                </video>
            </Link>
        </div>
    );
}

export default HeroSection;
