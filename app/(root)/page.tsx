import HeroSection from "@/components/ui/HeroSection";
import GenderGridImage from "@/components/ui/GenderGridImages";
import ProductSet1 from "@/components/shared/ProductSet1";
import ProductSet2 from "@/components/shared/ProductSet2";
import UspStrip from "@/components/shared/UspStrip";
import FeaturedCategories from "@/components/shared/FeaturedCategories";
import Newsletter from "@/components/shared/Newsletter";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection
        imageUrl="https://www.bolapsd.xyz/cdn/shop/files/88.jpg?v=1788559375&width=2000"
        eyebrow="New Season"
        title={"Quiet luxury,\nworn every day"}
        subtitle="Considered essentials in a restrained palette, made to last and made to layer."
        ctaLabel="Shop the collection"
        ctaHref="/products"
      />

      <UspStrip />

      <ProductSet1 header="Shop the latest" subheader="Men's T-Shirts" />

      <FeaturedCategories />

      <GenderGridImage />

      <HeroSection
        imageUrl="https://www.bolapsd.xyz/cdn/shop/files/88.jpg?v=1788559375&width=2000"
        eyebrow="The Edit"
        title={"Made for\nthe evening"}
        subtitle="Dresses and gowns with a sculptural line, for the moments that ask for more."
        ctaLabel="Explore the edit"
        ctaHref="/products/collections/women/dresses"
        align="left"
        height="tall"
      />

      <ProductSet2 header="Female catalogue" subheader="Dresses & Gowns" />

      <Newsletter />
    </div>
  );
}
