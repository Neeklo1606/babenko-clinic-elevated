import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Atom, FileText, CheckCircle, BookOpen, Mic, PenTool } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const values = [
  { icon: Monitor, title: "Современное оборудование", description: "Аппаратура последнего поколения для точной диагностики и лечения" },
  { icon: Atom, title: "Научный подход", description: "Протоколы основаны на международных клинических исследованиях" },
  { icon: FileText, title: "Индивидуальные протоколы", description: "Персональный план лечения для каждого пациента" },
  { icon: CheckCircle, title: "Гарантия результата", description: "Контроль эффективности на каждом этапе" },
];

const achievements = [
  { title: "18 лет", desc: "средний опыт врачей", icon: BookOpen },
  { title: "12 000+", desc: "пациентов доверяют нам", icon: Mic },
  { title: "2 филиала", desc: "в Новокузнецке", icon: PenTool },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">О клинике</span>
          </nav>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-[56px] font-semibold text-primary mb-8">
            О клинике Бабенко
          </motion.h1>
          <div className="max-w-3xl space-y-5 text-lg text-foreground/80 leading-[1.6] mb-20">
            <p>Клиника Бабенко — это центр экспертной дерматологии и косметологии в Новокузнецке. Мы работаем с 2006 года и специализируемся на диагностике и лечении заболеваний кожи, волос и ногтей.</p>
            <p>Наша команда — 12 врачей высшей категории, каждый из которых регулярно проходит обучение в ведущих клиниках России и Европы. Мы используем только методы, подтверждённые доказательной медициной.</p>
            <p>В клинике работают два филиала, оснащённых современным оборудованием от ведущих мировых производителей. Индивидуальный подход к каждому пациенту — основа нашей практики.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 max-w-3xl mx-auto text-center">
            {achievements.map((stat, i) => (
              <motion.div key={stat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex flex-col items-center">
                <span className="text-[56px] font-extralight text-primary-foreground leading-none mb-3">{stat.title}</span>
                <span className="text-lg text-primary-foreground/70">{stat.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="reviews" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-primary text-center mb-16">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8 flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section id="licenses" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-primary mb-8">Лицензии и сертификаты</h2>
          <p className="text-lg text-muted-foreground mb-12">Клиника имеет все необходимые лицензии для осуществления медицинской деятельности</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {["Лицензия на медицинскую деятельность", "Сертификат ISO 9001", "Аккредитация Минздрава"].map((lic) => (
              <div key={lic} className="glass-card p-6">
                <div className="w-20 h-28 mx-auto mb-4 bg-primary/5 rounded-lg flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary/40" />
                </div>
                <p className="text-sm text-foreground font-medium">{lic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

export default AboutPage;
