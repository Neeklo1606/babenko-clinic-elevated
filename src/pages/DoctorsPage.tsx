import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { doctors, directions } from "@/data/clinic-data";

const DoctorsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Врачи</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-[56px] font-semibold text-primary mb-6">
            Наши врачи
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Команда специалистов высшей квалификации с многолетним опытом
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/doctors/${doc.id}`}
                  className="block glass-card p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <span className="text-2xl font-semibold text-primary">
                      {doc.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-1">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{doc.specialization}</p>
                  <p className="text-sm text-muted-foreground/80 mb-1">{doc.category}</p>
                  <p className="text-sm text-primary font-medium mb-4">Стаж {doc.experience} лет</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.directions.map((dirSlug) => {
                      const dir = directions.find((d) => d.slug === dirSlug);
                      return dir ? (
                        <span key={dirSlug} className="text-xs bg-primary/5 text-primary px-2.5 py-1 rounded-full">{dir.name}</span>
                      ) : null;
                    })}
                  </div>
                  <span className="text-primary font-semibold">{doc.price}</span>
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

export default DoctorsPage;
