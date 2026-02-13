import { motion } from "framer-motion";
import { Microscope, Flower2, Syringe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const directions = [
  {
    title: "Дерматология",
    description: "Диагностика и лечение заболеваний кожи с применением современных методик",
    icon: Microscope,
    link: "/dermatology",
  },
  {
    title: "Трихология",
    description: "Комплексное восстановление здоровья волос и кожи головы",
    icon: Flower2,
    link: "#",
  },
  {
    title: "Косметология",
    description: "Инъекционные и аппаратные методики для омоложения и коррекции",
    icon: Syringe,
    link: "/services/laser-co2",
  },
];

const Directions = () => {
  return (
    <section id="направления" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[32px] lg:text-[56px] font-semibold text-primary mb-6 lg:mb-16 lg:text-center"
        >
          Направления
        </motion.h2>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative bg-card rounded-[20px] border border-border p-12 pb-16 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <dir.icon className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-[28px] font-semibold text-primary mb-3">{dir.title}</h3>
              <p className="text-base text-muted-foreground leading-[1.6] line-clamp-3 mb-6">
                {dir.description}
              </p>
              <Link
                to={dir.link}
                className="absolute bottom-12 left-12 flex items-center gap-2 text-primary font-medium text-base hover:underline"
              >
                Узнать больше <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-4 md:hidden">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={dir.link}
                className="flex items-center gap-4 bg-card rounded-2xl border border-border p-6 shadow-sm active:shadow-md transition-all duration-200"
              >
                <div className="shrink-0">
                  <dir.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[22px] font-semibold text-primary">{dir.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {dir.description}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-primary shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directions;
