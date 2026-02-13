import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { directions, doctors, services } from "@/data/clinic-data";

const DirectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const direction = directions.find((d) => d.slug === slug);

  if (!direction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="text-4xl font-semibold text-primary">Направление не найдено</h1>
          <Link to="/directions" className="text-primary mt-4 inline-block hover:underline">← Все направления</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const dirDoctors = doctors.filter((d) => d.directions.includes(slug!));
  const dirServices = services.filter((s) => s.direction === slug);

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <Link to="/directions" className="hover:text-primary transition-colors">Направления</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{direction.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 lg:py-20" style={{ background: "linear-gradient(180deg, hsl(210 20% 98.4%) 0%, hsl(205 100% 97%) 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
              <h1 className="text-5xl lg:text-[56px] font-semibold text-primary leading-[1.1] mb-5">{direction.name}</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">{direction.fullDescription}</p>
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                Записаться
              </Link>
            </motion.div>

            {/* Sticky form */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Записаться</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Врач</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option>Любой специалист</option>
                        {dirDoctors.map((d) => <option key={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Телефон</label>
                      <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50" />
                    </div>
                    <Link
                      to={`/appointment`}
                      className="flex items-center justify-center w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all mt-2"
                    >
                      Записаться
                    </Link>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-[40px] font-semibold text-primary text-center mb-16">Услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dirServices.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-7 flex flex-col hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-2">{s.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-primary font-semibold">{s.price}</span>
                  <Link to={`/services/${s.id}`} className="text-sm border border-primary text-primary px-4 py-2 rounded-xl hover:bg-primary/5 transition-all flex items-center gap-1.5">
                    Подробнее <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-[40px] font-semibold text-primary text-center mb-16">Врачи</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {dirDoctors.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <Link to={`/doctors/${doc.id}`} className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition-all duration-300 block">
                  <div className="w-[100px] h-[100px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl font-semibold text-primary">
                      {doc.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-primary mb-1">{doc.name}</h3>
                    <p className="text-muted-foreground text-sm">{doc.specialization}</p>
                    <p className="text-sm text-muted-foreground/80">Стаж {doc.experience} лет</p>
                  </div>
                  <Link
                    to="/appointment"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:scale-[1.02] transition-all shrink-0"
                  >
                    Записаться
                  </Link>
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

export default DirectionPage;
