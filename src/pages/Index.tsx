import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Directions from "@/components/Directions";
import Expertise from "@/components/Expertise";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Directions />
      <Expertise />
      <WhyUs />
      <Footer />
    </div>
  );
};

export default Index;
