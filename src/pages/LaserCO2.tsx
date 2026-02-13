import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, Clock, Calendar, ChevronDown, Stethoscope, ShieldCheck, Sparkles, Syringe, HeartPulse } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import laserProcess from "@/assets/laser-process-3d.png";

const indications = [
  "Мимические и возрастные морщины",
  "Постакне и атрофические рубцы",
  "Гиперпигментация и неровный тон",
  "Расширенные поры",
  "Дряблость и снижение тургора кожи",
  "Фотостарение",
  "Стрии (растяжки)",
  "Кератозы и доброкачественные образования",
  "Неровный рельеф кожи",
];

const contraindications = [
  "Беременность и лактация",
  "Активные воспалительные процессы на коже",
  "Онкологические заболевания",
  "Склонность к келоидным рубцам",
  "Приём изотретиноина (менее 6 мес. назад)",
  "Сахарный диабет в стадии декомпенсации",
  "Эпилепсия",
  "Острые инфекционные заболевания",
];

const steps = [
  { num: "01", title: "Консультация", desc: "Осмотр, оценка показаний, подбор параметров", time: "15 мин", icon: Stethoscope },
  { num: "02", title: "Подготовка", desc: "Очищение кожи, нанесение разметки", time: "10 мин", icon: Sparkles },
  { num: "03", title: "Анестезия", desc: "Аппликационная анестезия кремом", time: "20 мин", icon: Syringe },
  { num: "04", title: "Процедура", desc: "Фракционная обработка CO₂-лазером", time: "15–30 мин", icon: ShieldCheck },
  { num: "05", title: "Уход", desc: "Нанесение регенерирующего комплекса", time: "10 мин", icon: HeartPulse },
];

const beforeAfterPairs = [
  { comment: "3 месяца после процедуры — рубцы постакне" },
  { comment: "2 месяца после процедуры — пигментация" },
  { comment: "4 месяца после процедуры — морщины" },
];

const prepChecklist = [
  "Исключить загар и солярий за 2 недели",
  "Отменить ретиноиды за 7 дней",
  "Не использовать скрабы и пилинги за 5 дней",
  "Сообщить врачу обо всех принимаемых препаратах",
  "При герпесе в анамнезе — профилактический курс",
];

const rehab = [
  { period: "День 1–3", desc: "Покраснение, отёк, чувство жжения. Обработка антисептиком, увлажняющие средства." },
  { period: "День 4–7", desc: "Активное шелушение. Не удалять корочки. SPF 50+ обязательно." },
  { period: "Неделя 2–4", desc: "Розоватый оттенок кожи. Разрешена лёгкая декоративная косметика." },
  { period: "Месяц 1–3", desc: "Полное восстановление текстуры. Нарастание эффекта неоколлагенеза." },
];

const prices = [
  { zone: "Лицо полностью", price: "15 000 ₽" },
  { zone: "Периорбитальная область", price: "8 000 ₽" },
  { zone: "Шея", price: "12 000 ₽" },
  { zone: "Декольте", price: "14 000 ₽" },
  { zone: "Кисти рук", price: "10 000 ₽" },
  { zone: "Лицо + шея", price: "24 000 ₽" },
];

const doctors = [
  { name: "Бабенко Елена Викторовна", role: "Врач-дерматовенеролог, косметолог", experience: "Стаж 18 лет" },
  { name: "Иванова Марина Сергеевна", role: "Врач-дерматолог высшей категории", experience: "Стаж 15 лет" },
  { name: "Козлов Дмитрий Андреевич", role: "Врач-дерматолог, к.м.н.", experience: "Стаж 12 лет" },
];

const faqData = [
  { q: "Больно ли делать лазерную шлифовку?", a: "Перед процедурой наносится аппликационная анестезия, которая действует 20–30 минут. Во время обработки ощущается лёгкое покалывание и тепло. Большинство пациентов оценивают дискомфорт на 3–4 из 10." },
  { q: "Сколько процедур нужно для результата?", a: "В большинстве случаев достаточно 1–3 процедур с интервалом 4–6 недель. Количество зависит от глубины проблемы и индивидуальной реакции кожи." },
  { q: "Когда виден результат?", a: "Первые улучшения заметны через 2–3 недели после заживления. Максимальный эффект развивается в течение 3–6 месяцев за счёт неоколлагенеза." },
  { q: "Можно ли делать летом?", a: "Мы рекомендуем проводить процедуру в осенне-зимний период, когда минимальна инсоляция. Летом обязательно использование SPF 50+ и ограничение пребывания на солнце." },
  { q: "Какое оборудование используется?", a: "Мы работаем на фракционном CO₂-лазере Lumenis UltraPulse — золотой стандарт лазерной шлифовки. Это позволяет точно контролировать глубину и плотность воздействия." },
  { q: "Есть ли риск осложнений?", a: "При соблюдении протокола и рекомендаций риски минимальны. Возможны временное покраснение и отёк (проходят за 5–7 дней). Гиперпигментация — при несоблюдении солнцезащиты." },
  { q: "Как подготовиться к процедуре?", a: "За 2 недели исключить загар, за неделю — ретиноиды и кислоты. При герпесе в анамнезе врач назначит профилактический курс противовирусных препаратов." },
  { q: "С какого возраста можно делать?", a: "Процедура рекомендована пациентам старше 25 лет. Для лечения рубцов постакне — по показаниям и с 18 лет после консультации врача." },
];

const LaserCO2 = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumbs */}
      <div className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span>Услуги</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">Лазерная шлифовка CO₂</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pb-20 pt-4" style={{ background: "linear-gradient(180deg, hsl(210 20% 98.4%) 0%, hsl(214 100% 97%) 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-3">
              <p className="text-sm text-muted-foreground mb-3">Косметология / Лазерные процедуры</p>
              <h1 className="text-4xl lg:text-[52px] font-semibold text-primary leading-[1.1] tracking-[-0.015em] mb-4">
                Лазерная шлифовка кожи&nbsp;CO₂
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Эффективное омоложение и выравнивание текстуры кожи фракционным углекислотным лазером
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="lg:col-span-2 glass-card p-8 text-center lg:text-right">
              <div className="text-[42px] font-semibold text-primary leading-none mb-2">от 15 000 ₽</div>
              <div className="flex items-center justify-center lg:justify-end gap-2 text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm">60 минут</span>
              </div>
              <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200">
                Записаться
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + 3D */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-[28px] font-semibold text-primary mb-6">Что это</h2>
              <div className="space-y-4 text-lg text-foreground/80 leading-[1.6]">
                <p>Фракционная лазерная шлифовка CO₂ — это аппаратная методика омоложения и восстановления кожи, основанная на контролируемом термическом повреждении микрозон эпидермиса и дермы.</p>
                <p>Углекислотный лазер генерирует луч с длиной волны 10 600 нм, который избирательно поглощается водой в клетках кожи. Это вызывает точечное испарение повреждённых тканей, запуская естественные процессы регенерации.</p>
                <p>Фракционный принцип означает, что лазер обрабатывает не всю поверхность, а создаёт микроскопические каналы — микротермальные зоны. Между ними остаются участки неповреждённой кожи, которые служат источником быстрого восстановления.</p>
                <p>В результате активируется синтез нового коллагена и эластина (неоколлагенез), формируется новый матрикс дермы. Кожа становится плотнее, ровнее, моложе.</p>
                <p>Методика признана золотым стандартом лечения рубцов, морщин и фотостарения международными дерматологическими сообществами.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex justify-center">
              <img src={laserProcess} alt="3D визуализация процесса CO₂ лазерной шлифовки" className="w-full max-w-lg rounded-2xl shadow-xl shadow-primary/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Indications / Contraindications */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">Показания</h2>
              <ul className="space-y-3">
                {indications.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-base text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Противопоказания</h2>
              <ul className="space-y-3">
                {contraindications.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-base text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary text-center mb-16">
            Как проходит процедура
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
            {/* Connecting line — desktop */}
            <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-px bg-border" />
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }} className="flex flex-col items-center text-center relative">
                <div className="w-[80px] h-[80px] rounded-2xl bg-primary/10 flex items-center justify-center mb-4 relative z-10">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-2">{step.num}</span>
                <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug mb-2">{step.desc}</p>
                <span className="text-xs text-primary font-medium">{step.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary text-center mb-16">
            Результаты
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {beforeAfterPairs.map((pair, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-5 overflow-hidden">
                <div className="flex gap-0 rounded-xl overflow-hidden mb-4 relative">
                  {/* Placeholder before */}
                  <div className="w-1/2 aspect-square bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-medium">До</span>
                  </div>
                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-primary z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground z-20" />
                  {/* Placeholder after */}
                  <div className="w-1/2 aspect-square bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <span className="text-xs text-primary font-medium">После</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">{pair.comment}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">* Реальные фотографии пациентов доступны на консультации</p>
        </div>
      </section>

      {/* Preparation & Rehab */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Подготовка</h2>
              <ul className="space-y-3">
                {prepChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span className="text-base text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Реабилитация</h2>
              <div className="space-y-5">
                {rehab.map((r, i) => (
                  <div key={r.period} className="relative pl-6 border-l-2 border-primary/20">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-primary" />
                    <p className="text-sm font-semibold text-primary mb-0.5">{r.period}</p>
                    <p className="text-sm text-foreground/80">{r.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary text-center mb-14">
            Цены
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {prices.map((p, i) => (
              <motion.div key={p.zone} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass-card p-6 flex flex-col items-center text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <h3 className="text-lg font-medium text-foreground mb-2">{p.zone}</h3>
                <p className="text-2xl font-semibold text-primary mb-4">{p.price}</p>
                <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold shadow-md shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200">
                  Записаться
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary text-center mb-14">
            Врачи, выполняющие процедуру
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {doctors.map((doc, i) => (
              <motion.div key={doc.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-semibold text-primary">
                    {doc.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{doc.name.split(" ").slice(0, 2).join(" ")}</h3>
                <p className="text-sm text-muted-foreground mb-1">{doc.role}</p>
                <p className="text-xs text-primary font-medium mb-4">{doc.experience}</p>
                <Link to="/doctor/babenko" className="text-sm text-primary font-medium hover:underline">
                  Профиль врача →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-semibold text-primary text-center mb-14">
            Частые вопросы
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqData.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="glass-card w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <span className="text-base font-medium text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 mt-1" : "max-h-0"}`}>
                  <div className="px-6 py-4 text-sm text-foreground/80 leading-relaxed bg-card rounded-b-2xl">
                    {faq.a}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card max-w-2xl mx-auto p-10 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Записаться на процедуру</h2>
            <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Врач</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  <option>Любой специалист</option>
                  {doctors.map(d => <option key={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Зона обработки</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  {prices.map(p => <option key={p.zone}>{p.zone} — {p.price}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Дата</label>
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

export default LaserCO2;
