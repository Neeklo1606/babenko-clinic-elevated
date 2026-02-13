import { motion } from "framer-motion";
import { Microscope, Flower2, Syringe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const directions = [
  {
    title: "Дерматология",
    description:
      "Диагностика и лечение заболеваний кожи с применением современных методик и оборудования экспертного класса",
    icon: Microscope,
    link: "/dermatology",
  },
  {
    title: "Трихология",
    description:
      "Комплексное восстановление здоровья волос и кожи головы на основе доказательной медицины",
    icon: Flower2,
    link: "#",
  },
  {
    title: "Косметология",
    description:
      "Инъекционные и аппаратные методики для естественного омоложения и эстетической коррекции",
    icon: Syringe,
    link: "/services/laser-co2",
  },
];

const Directions = () => {
  return (
    <section id="направления" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-[56px] font-semibold text-primary text-center mb-16"
        >
          Направления клиники
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {directions.map((dir, i) => (
            <motion.div
              key={dir.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative bg-card rounded-[20px] border border-border p-12 pb-16 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-6">
                <dir.icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-[28px] font-semibold text-primary mb-3">
                {dir.title}
              </h3>
              <p className="text-base text-muted-foreground leading-[1.6] line-clamp-3 mb-6">
                {dir.description}
              </p>
              <Link
                to={dir.link}
                className="absolute bottom-12 left-12 flex items-center gap-2 text-primary font-medium text-base hover:underline transition-all duration-200"
              >
                Узнать больше
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directions;
