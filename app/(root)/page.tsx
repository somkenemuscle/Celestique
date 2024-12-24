import HeroSection from "@/components/ui/HeroSection";
import GenderGridImage from "@/components/ui/GenderGridImages";
import ProductSet1 from "@/components/shared/ProductSet1";
import ProductSet2 from "@/components/shared/ProductSet2";



export default function Home() {
  return (
    <div>
      <HeroSection videoUrl="https://cdn.shopify.com/videos/c/o/v/f4f59cd761da4057807fd19b9e2ab16b.mp4" />
      <ProductSet1 header="SHOP THE LATEST" subheader="Men's T-Shirts" />
      <GenderGridImage />
      <ProductSet2 header="FEMALE CATALOGUE" subheader="Dress & Gowns" />
      <HeroSection videoUrl="https://cdn.shopify.com/videos/c/o/v/189099819a87448e8de16605f2ba18f1.mp4" />
      <ProductSet2 header="FEMALE CATALOGUE" subheader="Dress & Gowns" />
    </div>
  );
}
