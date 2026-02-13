import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { services, doctors } from "@/data/clinic-data";

const ServicePage = () => {
  const { id } = useParams<{ id: string }>();

  // Redirect old laser-co2 route
  if (id === "laser-co2") {
    const service = services.find((s) => s.id === "laser-co2");
    if (!service) return null;
  }

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="text-4xl font-semibold text-primary">Услуга не найдена</h1>
          <Link to="/services" className="text-primary mt-4 inline-block hover:underline">← Все услуги</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedDoctors = doctors.filter((d) => d.directions.includes(service.direction));

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-primary transition-colors">Услуги</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-20" style={{ background: "linear-gradient(180deg, hsl(210 20% 98.4%) 0%, hsl(214 100% 97%) 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
              <p className="text-sm text-muted-foreground mb-3">{service.directionLabel}</p>
              <h1 className="text-4xl lg:text-[52px] font-semibold text-primary leading-[1.1] mb-4">{service.name}</h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">{service.fullDescription}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 glass-card p-8 text-center lg:text-right">
              <div className="text-[42px] font-semibold text-primary leading-none mb-2">{service.price}</div>
              <div className="flex items-center justify-center lg:justify-end gap-2 text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{service.duration}</span>
              </div>
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                Записаться
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-[40px] font-semibold text-primary text-center mb-16">Специалисты</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {relatedDoctors.map((doc) => (
              <Link key={doc.id} to={`/doctors/${doc.id}`} className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300 block">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-semibold text-primary">
                    {doc.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{doc.name}</h3>
                <p className="text-sm text-muted-foreground">{doc.specialization}</p>
                <p className="text-sm text-primary font-medium mt-2">Стаж {doc.experience} лет</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-primary mb-4">Запишитесь на процедуру</h2>
          <p className="text-lg text-muted-foreground mb-8">Выберите удобное время и врача</p>
          <Link
            to="/appointment"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Записаться на приём
          </Link>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ServicePage;
