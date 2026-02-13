import { motion } from "framer-motion";

const stats = [
  { value: "18 лет", label: "средний опыт врачей" },
  { value: "12 000+", label: "пациентов" },
  { value: "2", label: "филиала" },
];

const Expertise = () => {
  return (
    <section className="relative py-32 bg-primary overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-semibold text-primary-foreground mb-20"
        >
          12 врачей высшей категории
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-3xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <span className="text-[56px] font-extralight text-primary-foreground leading-none mb-3">
                {stat.value}
              </span>
              <span className="text-lg text-primary-foreground/70">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
