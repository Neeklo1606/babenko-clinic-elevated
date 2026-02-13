import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, BookOpen, Mic, PenTool } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import doctorPhoto from "@/assets/doctor-hero-v2.png";

const metrics = [
  { value: "9+", label: "лет опыта" },
  { value: "2 000+", label: "пациентов" },
  { value: "100+", label: "процедур/мес" },
];

const timeline = [
  { year: "2015", title: "Врач дерматологического диспансера", desc: "Клиническая практика в дерматовенерологии" },
  { year: "2017", title: "Заведующий стационарным отделением", desc: "Кожно-венерологический диспансер, организация лечебного процесса" },
  { year: "2020", title: "Заведующий стационарным отделением ГБУЗ КККВД", desc: "Руководство отделением, внедрение современных протоколов лечения" },
  { year: "", title: "Организатор здравоохранения", desc: "Дополнительная квалификация в области управления медицинскими учреждениями" },
  { year: "", title: "Диссертационная работа", desc: "Научное исследование на тему здоровой кожи" },
];

const specializations = [
  "Акне и постакне", "Розацеа", "Пигментация", "Возрастные изменения",
  "Лазерные методики", "Инъекционная косметология", "Аппаратные процедуры",
  "Онкодерматология", "Дерматоскопия", "Аутоиммунные дерматозы",
  "Экзема и атопический дерматит", "Псориаз",
];

const procedures = [
  { name: "Первичная консультация дерматолога", desc: "Осмотр, сбор анамнеза, план обследования", price: "от 3 000 ₽" },
  { name: "Цифровая дерматоскопия", desc: "Полное картирование новообразований кожи", price: "от 5 000 ₽" },
  { name: "Лазерное удаление новообразований", desc: "CO₂-лазер, под местной анестезией", price: "от 4 000 ₽" },
  { name: "Биопсия кожи", desc: "Забор материала с гистологическим исследованием", price: "от 6 000 ₽" },
  { name: "Мезотерапия лица", desc: "Индивидуальный коктейль, 1 зона", price: "от 8 000 ₽" },
  { name: "Биоревитализация", desc: "Препараты на основе гиалуроновой кислоты", price: "от 10 000 ₽" },
  { name: "Ботулинотерапия", desc: "Коррекция мимических морщин", price: "от 12 000 ₽" },
  { name: "Химический пилинг", desc: "Поверхностный и срединный, подбор по типу кожи", price: "от 5 000 ₽" },
  { name: "Плазмотерапия (PRP)", desc: "Аутологичная плазма, 1 сеанс", price: "от 7 000 ₽" },
  { name: "Фототерапия (UVB 311 нм)", desc: "Курсовое лечение хронических дерматозов", price: "от 2 500 ₽" },
  { name: "Криодеструкция", desc: "Удаление бородавок и кератом жидким азотом", price: "от 2 000 ₽" },
  { name: "Контурная пластика", desc: "Филлеры для коррекции объёмов и контуров", price: "от 15 000 ₽" },
];

const achievements = [
  { title: "12 публикаций", desc: "в рецензируемых медицинских журналах", icon: BookOpen },
  { title: "Спикер конференций", desc: "Россия, Европа, международные конгрессы", icon: Mic },
  { title: "Автор методик", desc: "собственные протоколы лечения хронических дерматозов", icon: PenTool },
];

const reviews = [
  { text: "Владимир Юрьевич — внимательный и компетентный специалист. Всё объясняет доступно, назначает только необходимое лечение. Результат виден уже через месяц.", name: "Анна К.", date: "Ноябрь 2024" },
  { text: "Отличный врач! Профессиональный подход, грамотная диагностика. Очень доволен результатом лечения.", name: "Дмитрий С.", date: "Октябрь 2024" },
  { text: "Обратилась с проблемой кожи, которую не могли решить другие врачи. Владимир Юрьевич подобрал эффективное лечение. Рекомендую!", name: "Мария В.", date: "Сентябрь 2024" },
];

const DoctorProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span>Врачи</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Бабенко В.Ю.</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-20 pt-4">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <img
                src={doctorPhoto}
                alt="Бабенко Владимир Юрьевич"
                className="w-full max-w-md mx-auto rounded-xl shadow-xl shadow-primary/10 object-cover aspect-[3/4]"
              />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="flex flex-col justify-center">
              <h1 className="text-4xl lg:text-[48px] font-semibold text-primary leading-[1.15] tracking-[-0.01em] mb-3">
                Бабенко<br />Владимир Юрьевич
              </h1>
              <p className="text-xl text-muted-foreground mb-1">
                Врач-дерматовенеролог
              </p>
              <p className="text-lg text-muted-foreground/80 mb-1">
                Заведующий стационарным отделением ГБУЗ КККВД
              </p>
              <p className="text-lg text-primary font-medium mb-8">
                Опыт работы с 2015 года
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {metrics.map((m) => (
                  <div key={m.label} className="glass-card p-4 text-center">
                    <div className="text-4xl font-semibold text-primary leading-none mb-1">{m.value}</div>
                    <div className="text-sm text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>

              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200 w-fit">
                Записаться к врачу
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary mb-14">
            Образование
          </motion.h2>
          <div className="relative pl-8 lg:pl-12">
            {/* Vertical line */}
            <div className="absolute left-3 lg:left-5 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-8 lg:-left-12 top-1.5 w-6 h-6 rounded-full bg-primary/15 border-[3px] border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="glass-card p-5 ml-2">
                    <span className="text-sm font-semibold text-primary">{item.year}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary mb-12">
            Специализация
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-wrap gap-3">
            {specializations.map((tag) => (
              <span
                key={tag}
                className="glass-card px-5 py-2.5 rounded-full text-base text-foreground/80 border border-transparent hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary mb-14">
            Проводимые процедуры
          </motion.h2>
          <div className="space-y-3">
            {procedures.map((proc, i) => (
              <motion.div
                key={proc.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="glass-card px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-foreground lg:w-[280px] shrink-0">{proc.name}</h3>
                <p className="text-sm text-muted-foreground flex-1">{proc.desc}</p>
                <span className="text-xl font-semibold text-primary shrink-0 lg:w-[130px] lg:text-right">{proc.price}</span>
                <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold shadow-md shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200 shrink-0 w-fit">
                  Записаться
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-5">
                  <a.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-primary-foreground/70">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary mb-14 text-center">
            Отзывы пациентов
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reviews.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card p-7 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed flex-1 mb-5">{r.text}</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card max-w-2xl mx-auto p-10 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Запишитесь на приём</h2>
            <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Услуга</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  <option>Выберите услугу</option>
                  {procedures.map(p => <option key={p.name}>{p.name}</option>)}
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
              <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-200 mt-2">
                Отправить заявку
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorProfile;
