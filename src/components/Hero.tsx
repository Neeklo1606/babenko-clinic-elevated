import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import doctorHero from "@/assets/doctor-hero.avif";

const metrics = [
  { accent: "18 лет", text: "— средний опыт врачей" },
  { accent: "12 врачей", text: "высшей категории" },
  { accent: "2 филиала", text: "в городе" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Left content */}
      <div className="relative z-10 w-full lg:w-[40%] flex items-center min-h-[90vh] pl-[8%] pr-6 lg:pr-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-20 lg:py-0 w-full flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Mobile doctor photo */}
          <div className="lg:hidden mb-10">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden mx-auto shadow-lg">
              <img
                src={doctorHero}
                alt="Врач клиники Бабенко"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <h1 className="text-5xl lg:text-[72px] font-bold text-primary leading-[1.05] tracking-[-0.02em] mb-4">
            Клиника Бабенко
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground font-normal mb-3 max-w-md">
            Дерматология, трихология, косметология
          </p>
          <p className="text-base lg:text-lg text-muted-foreground/70 mb-12 max-w-md">
            Экспертный уровень. Доказательная медицина. Новокузнецк
          </p>

          {/* Metrics */}
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 mb-14 w-full justify-center lg:justify-start">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="text-sm lg:text-base"
              >
                <span className="font-semibold text-primary">{m.accent}</span>{" "}
                <span className="text-muted-foreground">{m.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/appointment"
              className="flex items-center justify-center bg-primary text-primary-foreground h-14 w-full sm:w-[220px] rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
            >
              Записаться на приём
            </Link>
            <Link
              to="/doctor/babenko"
              className="flex items-center justify-center border-2 border-primary text-primary h-14 w-full sm:w-[180px] rounded-xl text-lg font-semibold hover:bg-primary/5 transition-all duration-200"
            >
              Выбрать врача
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right photo — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="hidden lg:block absolute top-0 right-0 w-[60%] h-full"
      >
        {/* Gradient fade from left */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/60 to-transparent w-[30%]" />
        <img
          src={doctorHero}
          alt="Врач клиники Бабенко"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
