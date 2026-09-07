import Link from "next/link";

type HeroSectionProps = {
    videoUrl?: string;
    imageUrl?: string;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
    align?: "left" | "center";
    height?: "full" | "tall";
};

function HeroSection({
    videoUrl,
    imageUrl,
    eyebrow = "New Season",
    title = "Quiet luxury,\nworn every day",
    subtitle = "Considered essentials in a restrained palette, made to last and made to layer.",
    ctaLabel = "Shop the collection",
    ctaHref = "/products",
    align = "left",
    height = "full",
}: HeroSectionProps) {
    return (
        <section
            className={`relative w-full overflow-hidden bg-ink-900 ${
                height === "full" ? "h-[78vh] min-h-[520px] lg:h-[88vh]" : "h-[60vh] min-h-[440px]"
            }`}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <video
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/20" />

            <div
                className={`relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:px-10 lg:px-20 lg:pb-24 ${
                    align === "center" ? "items-center text-center" : "items-start text-left"
                }`}
            >
                {eyebrow && (
                    <span className="eyebrow mb-4 text-white/80">{eyebrow}</span>
                )}
                <h1 className="font-display text-4xl font-medium leading-[1.05] text-white sm:text-5xl lg:text-7xl">
                    {title.split("\n").map((line, i) => (
                        <span key={i} className="block">
                            {line}
                        </span>
                    ))}
                </h1>
                {subtitle && (
                    <p className={`mt-5 max-w-md text-sm leading-relaxed text-white/75 ${align === "center" ? "mx-auto" : ""}`}>
                        {subtitle}
                    </p>
                )}
                {ctaLabel && (
                    <Link
                        href={ctaHref}
                        className="mt-8 inline-flex items-center border border-white/80 bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-900 transition-colors duration-300 hover:bg-transparent hover:text-white"
                    >
                        {ctaLabel}
                    </Link>
                )}
            </div>
        </section>
    );
}

export default HeroSection;
