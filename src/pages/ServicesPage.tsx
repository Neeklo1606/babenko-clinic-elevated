import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { services } from "@/data/clinic-data";

type Category = "all" | "dermatology" | "trichology" | "cosmetology";

const filterLabels: { key: Category; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "dermatology", label: "Дерматология" },
  { key: "trichology", label: "Трихология" },
  { key: "cosmetology", label: "Косметология" },
];

const ServicesPage = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered = useMemo(() => {
    let result = services;
    if (activeFilter !== "all") result = result.filter((s) => s.direction === activeFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.symptoms.some((sym) => sym.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeFilter, query]);

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Услуги</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-[56px] font-semibold text-primary mb-6">
            Услуги клиники
          </motion.h1>

          {/* Search */}
          <div className="max-w-[600px] mb-10">
            <div className="relative flex items-center h-14 bg-card rounded-2xl border-2 border-transparent focus-within:border-primary transition-colors">
              <Search className="absolute left-5 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по услугам и симптомам..."
                className="w-full h-full bg-transparent pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground/60 outline-none"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-14 overflow-x-auto pb-2">
            {filterLabels.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 h-11 px-6 rounded-[10px] text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/30 text-primary hover:bg-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    className="block bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col"
                  >
                    <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      {service.directionLabel}
                    </span>
                    <h3 className="text-xl font-semibold text-primary mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-medium text-primary">{service.price}</span>
                      <span className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16 text-lg">
              Ничего не найдено. Попробуйте другой запрос.
            </p>
          )}
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ServicesPage;
