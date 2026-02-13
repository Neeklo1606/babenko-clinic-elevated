import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { directions } from "@/data/clinic-data";

const DirectionsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />
      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Направления</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-[56px] font-semibold text-primary mb-6"
          >
            Направления клиники
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Мы специализируемся на трёх ключевых направлениях дерматологии и косметологии
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {directions.map((dir, i) => (
              <motion.div
                key={dir.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Link
                  to={`/directions/${dir.slug}`}
                  className="block bg-card rounded-[20px] border border-border p-12 pb-16 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative h-full"
                >
                  <dir.icon className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
                  <h2 className="text-[28px] font-semibold text-primary mb-3">{dir.name}</h2>
                  <p className="text-base text-muted-foreground leading-[1.6] mb-8">
                    {dir.description}
                  </p>
                  <span className="absolute bottom-12 left-12 flex items-center gap-2 text-primary font-medium">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default DirectionsPage;
