import { motion } from "framer-motion";
import heroImage from "@/assets/hero-3d.png";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden hero-grid-bg">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--hero-gradient)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-[64px] font-semibold text-primary leading-[1.1] tracking-[-0.015em] mb-6">
              Современная дерматология и&nbsp;косметология
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Доказательная медицина. Экспертный уровень. 2&nbsp;филиала в&nbsp;Новокузнецке
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200">
                Записаться на приём
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary/5 transition-all duration-200">
                Наши направления
              </button>
            </div>
          </motion.div>

          {/* Right 3D composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex justify-center"
          >
            <img
              src={heroImage}
              alt="3D glass geometric composition"
              className="w-[500px] h-[500px] object-contain animate-float drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
