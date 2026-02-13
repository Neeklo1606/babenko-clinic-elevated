import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Directions from "@/components/Directions";
import SymptomSearch from "@/components/SymptomSearch";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import MobileContacts from "@/components/MobileContacts";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <Hero />
      <Directions />
      <SymptomSearch />
      <Expertise />
      <WhyUs />
      <MobileContacts />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;
