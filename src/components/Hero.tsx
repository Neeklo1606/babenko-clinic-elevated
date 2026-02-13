import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import doctorHero from "@/assets/doctor-hero-new.png";
import logo from "@/assets/logo.png";

const metrics = [
  { value: "18 лет", label: "средний опыт" },
  { value: "12 врачей", label: "высшая категория" },
  { value: "2 филиала", label: "в городе" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-background pt-20 lg:pt-0">
      {/* ── MOBILE HERO ── */}
      <div className="lg:hidden w-full min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Logo */}
          <img src={logo} alt="Клиника Бабенко" className="w-[120px] mb-10" />

          {/* Doctor photo */}
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-lg mb-8">
            <img
              src={doctorHero}
              alt="Врач клиники"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>

          <h1 className="text-[40px] font-bold text-primary leading-tight tracking-[-0.02em] mb-3">
            Клиника Бабенко
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Дерматология и косметология экспертного уровня
          </p>
          <p className="flex items-center gap-1.5 text-base text-muted-foreground/70 mb-10">
            <MapPin className="w-4 h-4" />
            Новокузнецк, 2 филиала
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 w-full mb-12">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-[32px] font-bold text-primary leading-none">
                  {m.value.split(" ")[0]}
                </span>
                <span className="text-[13px] text-muted-foreground mt-1">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 w-full">
            <Link
              to="/appointment"
              className="flex items-center justify-center bg-primary text-primary-foreground h-14 w-full rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform duration-200"
            >
              Записаться на приём
            </Link>
            <Link
              to="/doctor/babenko"
              className="flex items-center justify-center border-2 border-primary text-primary h-14 w-full rounded-xl text-lg font-semibold active:bg-primary/5 transition-colors duration-200"
            >
              Выбрать врача
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP HERO ── */}
      <div className="hidden lg:flex relative z-10 w-[40%] items-center min-h-[90vh] pl-[8%] pr-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-[72px] font-bold text-primary leading-[1.05] tracking-[-0.02em] mb-4">
            Клиника Бабенко
          </h1>
          <p className="text-2xl text-muted-foreground font-normal mb-3 max-w-md">
            Дерматология, трихология, косметология
          </p>
          <p className="text-lg text-muted-foreground/70 mb-12 max-w-md">
            Экспертный уровень. Доказательная медицина. Новокузнецк
          </p>

          <div className="flex flex-col gap-3 mb-14">
            {[
              { accent: "18 лет", text: "— средний опыт врачей" },
              { accent: "12 врачей", text: "высшей категории" },
              { accent: "2 филиала", text: "в городе" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="text-base"
              >
                <span className="font-semibold text-primary">{m.accent}</span>{" "}
                <span className="text-muted-foreground">{m.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              to="/appointment"
              className="flex items-center justify-center bg-primary text-primary-foreground h-14 w-[220px] rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200"
            >
              Записаться на приём
            </Link>
            <Link
              to="/doctor/babenko"
              className="flex items-center justify-center border-2 border-primary text-primary h-14 w-[180px] rounded-xl text-lg font-semibold hover:bg-primary/5 transition-all duration-200"
            >
              Выбрать врача
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Desktop photo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="hidden lg:block absolute top-0 right-0 w-[60%] h-full"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/40 to-transparent w-[25%]" />
        <img
          src={doctorHero}
          alt="Врач клиники Бабенко"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'contrast(1.1) brightness(1.0)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
