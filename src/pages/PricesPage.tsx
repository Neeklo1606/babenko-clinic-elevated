import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { services, directions } from "@/data/clinic-data";

const PricesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Цены</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-[56px] font-semibold text-primary mb-6">
            Цены на услуги
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Актуальные цены на все процедуры клиники
          </p>

          {directions.map((dir) => {
            const dirServices = services.filter((s) => s.direction === dir.slug);
            return (
              <motion.div key={dir.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                <h2 className="text-3xl font-semibold text-primary mb-8">{dir.name}</h2>
                <div className="glass-card overflow-hidden">
                  {dirServices.map((service, i) => (
                    <div key={service.id} className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 gap-3 ${i < dirServices.length - 1 ? "border-b border-border" : ""}`}>
                      <div className="flex-1">
                        <Link to={`/services/${service.id}`} className="text-base font-medium text-foreground hover:text-primary transition-colors">
                          {service.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-0.5">{service.duration}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-semibold text-primary">{service.price}</span>
                        <Link
                          to="/appointment"
                          className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:scale-[1.02] transition-all shrink-0"
                        >
                          Записаться
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default PricesPage;
