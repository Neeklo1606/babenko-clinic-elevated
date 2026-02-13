import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const branches = [
  {
    name: "Филиал 1 — Центральный",
    address: "г. Новокузнецк, ул. Кирова, 95",
    phone: "+7 (3843) 123-456",
    hours: "Пн-Пт: 8:00–20:00, Сб: 9:00–16:00",
  },
  {
    name: "Филиал 2 — Новоильинский",
    address: "г. Новокузнецк, ул. Новоселов, 30",
    phone: "+7 (3843) 654-321",
    hours: "Пн-Пт: 8:00–20:00, Сб: 9:00–16:00",
  },
];

const ContactsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Контакты</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-[56px] font-semibold text-primary mb-6">
            Контакты
          </motion.h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Два филиала в Новокузнецке. Выберите удобный для вас
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {branches.map((branch, i) => (
              <motion.div key={branch.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="glass-card p-8">
                <h2 className="text-2xl font-semibold text-primary mb-6">{branch.name}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <a href={`tel:${branch.phone.replace(/\D/g, '')}`} className="text-primary font-medium text-lg hover:opacity-80 transition-opacity">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{branch.hours}</span>
                  </div>
                </div>
                <div className="mt-6 h-48 bg-muted rounded-xl flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Карта</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick contact */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="tel:+73843123456" className="glass-card p-6 flex items-center gap-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Позвонить</p>
                <p className="text-sm text-muted-foreground">+7 (3843) 123-456</p>
              </div>
            </a>
            <a href="https://wa.me/73843123456" target="_blank" rel="noopener noreferrer" className="glass-card p-6 flex items-center gap-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div>
                <p className="font-semibold text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Написать</p>
              </div>
            </a>
            <a href="mailto:info@clinicbabenko.ru" className="glass-card p-6 flex items-center gap-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">info@clinicbabenko.ru</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default ContactsPage;
