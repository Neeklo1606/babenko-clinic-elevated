import { motion } from "framer-motion";
import { Monitor, Atom, FileText, CheckCircle } from "lucide-react";

const items = [
  {
    icon: Monitor,
    title: "Современное оборудование",
    description: "Аппаратура последнего поколения для точной диагностики и эффективного лечения",
  },
  {
    icon: Atom,
    title: "Научный подход",
    description: "Протоколы лечения основаны на международных клинических исследованиях",
  },
  {
    icon: FileText,
    title: "Индивидуальные протоколы",
    description: "Персональный план лечения с учётом особенностей каждого пациента",
  },
  {
    icon: CheckCircle,
    title: "Гарантия результата",
    description: "Контроль эффективности на каждом этапе лечения и коррекции",
  },
];

const WhyUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-[48px] font-semibold text-primary text-center mb-16"
        >
          Почему мы
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 flex gap-5 items-start hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
