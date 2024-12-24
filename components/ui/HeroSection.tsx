import Link from "next/link";

function HeroSection({ videoUrl }: { videoUrl: string }) {
    return (
        <div>
            <Link href='/products'>
                <video
                    src={videoUrl}
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


