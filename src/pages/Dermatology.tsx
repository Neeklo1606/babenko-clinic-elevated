import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Zap, Shield, Microscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dermaHero from "@/assets/derma-hero-3d.png";
import iconLaser from "@/assets/icon-laser.png";
import iconAnalysis from "@/assets/icon-analysis.png";
import iconCryo from "@/assets/icon-cryo.png";
import iconBiopsy from "@/assets/icon-biopsy.png";
import iconPhototherapy from "@/assets/icon-phototherapy.png";
import iconConsultation from "@/assets/icon-consultation.png";

const services = [
  { title: "Лазерная терапия", description: "Удаление новообразований, сосудистых патологий и пигментации лазером последнего поколения", price: "от 5 000 ₽", icon: iconLaser },
  { title: "Дерматоскопия", description: "Цифровая диагностика новообразований кожи с сохранением карты родинок", price: "от 3 000 ₽", icon: iconAnalysis },
  { title: "Криотерапия", description: "Криодеструкция доброкачественных образований жидким азотом", price: "от 2 500 ₽", icon: iconCryo },
  { title: "Биопсия кожи", description: "Забор биоматериала для гистологического исследования и точной диагностики", price: "от 4 000 ₽", icon: iconBiopsy },
  { title: "Фототерапия", description: "Лечение псориаза, витилиго и экземы узкополосным УФ-излучением", price: "от 3 500 ₽", icon: iconPhototherapy },
  { title: "Консультация", description: "Первичный осмотр и составление персонального плана лечения", price: "от 2 000 ₽", icon: iconConsultation },
];

const doctors = [
  { name: "Бабенко Елена Викторовна", role: "Главный врач, дерматолог", experience: "Стаж 18 лет", specialization: "Дерматоскопия, онкодерматология, хронические дерматозы" },
  { name: "Иванова Марина Сергеевна", role: "Врач-дерматолог высшей категории", experience: "Стаж 15 лет", specialization: "Аллергодерматология, аутоиммунные заболевания кожи" },
  { name: "Козлов Дмитрий Андреевич", role: "Врач-дерматолог, к.м.н.", experience: "Стаж 12 лет", specialization: "Лазерная дерматология, эстетическая коррекция" },
];

const equipment = [
  { title: "FotoFinder ATBM", description: "Автоматическое картирование всего тела для мониторинга новообразований кожи", icon: Microscope },
  { title: "Candela GentleMax Pro", description: "Александритовый и Nd:YAG лазер для безопасного удаления образований", icon: Zap },
  { title: "Daavlin UV Series", description: "Узкополосная фототерапия 311 нм для лечения хронических дерматозов", icon: Shield },
];

const Dermatology = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span>Направления</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Дерматология</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="min-h-[50vh] flex items-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(210 20% 98.4%) 0%, hsl(205 100% 97%) 100%)" }}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-5xl lg:text-[56px] font-semibold text-primary leading-[1.1] tracking-[-0.015em] mb-5">
                Дерматология
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Диагностика и лечение заболеваний кожи на основе доказательной медицины
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200">
                Записаться к дерматологу
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden lg:flex justify-center">
              <img src={dermaHero} alt="Дерматология 3D" className="w-[460px] h-[460px] object-contain animate-float drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About + Sticky Form */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: About */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-[32px] font-semibold text-primary mb-8">О направлении</h2>
                <div className="space-y-5 text-lg text-foreground/80 leading-[1.6]">
                  <p>
                    Дерматологическое отделение клиники Бабенко — это экспертная помощь при заболеваниях кожи, волос и ногтей. Мы используем только методы, подтверждённые международными клиническими исследованиями, и следуем актуальным протоколам Европейской академии дерматологии.
                  </p>
                  <p>
                    Каждый пациент проходит комплексную диагностику, включающую цифровую дерматоскопию, лабораторные исследования и при необходимости — гистологическую верификацию. Это позволяет нам ставить точные диагнозы и назначать максимально эффективное лечение.
                  </p>
                  <p>
                    Наши специалисты регулярно проходят обучение в ведущих клиниках России и Европы, участвуют в научных конференциях и имеют публикации в рецензируемых медицинских журналах.
                  </p>
                  <p>
                    Мы работаем с полным спектром дерматологических заболеваний: от аллергических реакций и акне до сложных аутоиммунных патологий и онкологического скрининга кожи. Индивидуальный подход к каждому пациенту — основа нашей практики.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Sticky form */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Записаться к дерматологу</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Выбор врача</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option>Любой специалист</option>
                        {doctors.map(d => <option key={d.name}>{d.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Дата приёма</label>
                      <input type="date" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Телефон</label>
                      <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50" />
                    </div>
                    <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-200 mt-2">
                      Записаться
                    </button>
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
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-[40px] font-semibold text-primary text-center mb-16">
            Услуги дерматологии
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card p-7 flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <img src={s.icon} alt={s.title} className="w-[100px] h-[100px] object-contain mb-5" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-5 flex-1">{s.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-primary font-semibold">{s.price}</span>
                  <button className="text-sm border border-primary text-primary px-4 py-2 rounded-xl hover:bg-primary/5 transition-all duration-200 flex items-center gap-1.5">
                    Подробнее <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-[40px] font-semibold text-primary text-center mb-16">
            Дерматологи клиники
          </motion.h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {doctors.map((doc, i) => (
              <motion.div key={doc.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                {/* Avatar placeholder */}
                <div className="w-[120px] h-[120px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-3xl font-semibold text-primary">
                    {doc.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-semibold text-primary mb-1">{doc.name}</h3>
                  <p className="text-muted-foreground mb-1">{doc.role}</p>
                  <p className="text-sm text-muted-foreground/80 mb-1">{doc.experience}</p>
                  <p className="text-sm text-muted-foreground/80">{doc.specialization}</p>
                </div>
                <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200 shrink-0">
                  Записаться
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-[40px] font-semibold text-primary-foreground text-center mb-16">
            Оборудование
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {equipment.map((eq, i) => (
              <motion.div key={eq.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 p-7 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-5">
                  <eq.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-3">{eq.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{eq.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dermatology;
