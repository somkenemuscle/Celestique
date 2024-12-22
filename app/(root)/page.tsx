import HeroSection from "@/components/ui/HeroSection";
import GenderGridImage from "@/components/ui/GenderGridImages";
import ProductSet1 from "@/components/shared/ProductSet1";
import ProductSet2 from "@/components/shared/ProductSet2";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductSet1/>
      <GenderGridImage />
      <ProductSet2/>
    </div>
  );
}
