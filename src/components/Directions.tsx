import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import iconDermatology from "@/assets/icon-dermatology.png";
import iconTrichology from "@/assets/icon-trichology.png";
import iconCosmetology from "@/assets/icon-cosmetology.png";

const directions = [
  {
    title: "Дерматология",
    description: "Диагностика и лечение заболеваний кожи с применением современных методик и оборудования",
    icon: iconDermatology,
  },
  {
    title: "Трихология",
    description: "Комплексное восстановление здоровья волос и кожи головы на основе доказательной медицины",
    icon: iconTrichology,
  },
  {
    title: "Косметология",
    description: "Инъекционные и аппаратные методики для естественного омоложения и коррекции",
    icon: iconCosmetology,
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
          className="text-4xl lg:text-[48px] font-semibold text-primary text-center mb-16"
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
              className="glass-card p-8 flex flex-col items-center text-center group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <img
                src={dir.icon}
                alt={dir.title}
                className="w-[140px] h-[140px] object-contain mb-6"
              />
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {dir.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6 line-clamp-2">
                {dir.description}
              </p>
              <a
                href="#"
                className="mt-auto flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
              >
                Подробнее
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directions;
