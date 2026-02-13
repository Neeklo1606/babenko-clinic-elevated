import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const popularSymptoms = [
  "Выпадение волос",
  "Акне",
  "Розацеа",
  "Морщины",
  "Пигментация",
];

type Category = "all" | "dermatology" | "trichology" | "cosmetology";

interface Service {
  name: string;
  category: Category;
  categoryLabel: string;
  description: string;
  price: string;
  link: string;
  symptoms: string[];
}

const services: Service[] = [
  {
    name: "Дерматоскопия новообразований",
    category: "dermatology",
    categoryLabel: "Дерматология",
    description: "Цифровая диагностика родинок и новообразований кожи с помощью дерматоскопа",
    price: "от 2 000 ₽",
    link: "/dermatology",
    symptoms: ["родинки", "новообразования", "пятна"],
  },
  {
    name: "Лечение акне",
    category: "dermatology",
    categoryLabel: "Дерматология",
    description: "Комплексная терапия угревой болезни с индивидуальным подбором протокола",
    price: "от 5 000 ₽",
    link: "/dermatology",
    symptoms: ["акне", "угри", "прыщи", "воспаления"],
  },
  {
    name: "Лечение розацеа",
    category: "dermatology",
    categoryLabel: "Дерматология",
    description: "Современные методы контроля и лечения розацеа на всех стадиях",
    price: "от 4 500 ₽",
    link: "/dermatology",
    symptoms: ["розацеа", "покраснение", "сосуды"],
  },
  {
    name: "Лечение псориаза",
    category: "dermatology",
    categoryLabel: "Дерматология",
    description: "Индивидуальные протоколы терапии псориаза с контролем ремиссии",
    price: "от 6 000 ₽",
    link: "/dermatology",
    symptoms: ["псориаз", "шелушение", "бляшки"],
  },
  {
    name: "Трихоскопия",
    category: "trichology",
    categoryLabel: "Трихология",
    description: "Компьютерная диагностика волос и кожи головы с анализом фолликулов",
    price: "от 3 000 ₽",
    link: "#",
    symptoms: ["выпадение волос", "облысение", "перхоть"],
  },
  {
    name: "Мезотерапия кожи головы",
    category: "trichology",
    categoryLabel: "Трихология",
    description: "Инъекции витаминных коктейлей для стимуляции роста волос",
    price: "от 5 500 ₽",
    link: "#",
    symptoms: ["выпадение волос", "тонкие волосы", "алопеция"],
  },
  {
    name: "PRP-терапия волос",
    category: "trichology",
    categoryLabel: "Трихология",
    description: "Плазмотерапия для восстановления волосяных фолликулов собственной плазмой",
    price: "от 8 000 ₽",
    link: "#",
    symptoms: ["выпадение волос", "облысение", "алопеция"],
  },
  {
    name: "Лазерная шлифовка CO2",
    category: "cosmetology",
    categoryLabel: "Косметология",
    description: "Фракционное омоложение кожи с выравниванием рельефа и стимуляцией коллагена",
    price: "от 15 000 ₽",
    link: "/services/laser-co2",
    symptoms: ["морщины", "рубцы", "постакне", "пигментация"],
  },
  {
    name: "Биоревитализация",
    category: "cosmetology",
    categoryLabel: "Косметология",
    description: "Инъекции гиалуроновой кислоты для глубокого увлажнения и восстановления кожи",
    price: "от 7 000 ₽",
    link: "#",
    symptoms: ["сухость", "морщины", "тусклая кожа"],
  },
  {
    name: "Ботулинотерапия",
    category: "cosmetology",
    categoryLabel: "Косметология",
    description: "Коррекция мимических морщин препаратами ботулотоксина типа А",
    price: "от 9 000 ₽",
    link: "#",
    symptoms: ["морщины", "мимические морщины", "лоб"],
  },
  {
    name: "Химический пилинг",
    category: "cosmetology",
    categoryLabel: "Косметология",
    description: "Контролируемое обновление кожи кислотами для выравнивания тона и текстуры",
    price: "от 4 000 ₽",
    link: "#",
    symptoms: ["пигментация", "постакне", "тусклая кожа", "пигментные пятна"],
  },
  {
    name: "Контурная пластика",
    category: "cosmetology",
    categoryLabel: "Косметология",
    description: "Коррекция объёмов лица филлерами на основе гиалуроновой кислоты",
    price: "от 12 000 ₽",
    link: "#",
    symptoms: ["носогубные складки", "губы", "скулы"],
  },
];

const filterLabels: { key: Category; label: string }[] = [
  { key: "all", label: "Все направления" },
  { key: "dermatology", label: "Дерматология" },
  { key: "trichology", label: "Трихология" },
  { key: "cosmetology", label: "Косметология" },
];

const SymptomSearch = () => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);

  const searchTerm = activeSymptom || query;

  const filtered = useMemo(() => {
    let result = services;

    if (activeFilter !== "all") {
      result = result.filter((s) => s.category === activeFilter);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.symptoms.some((sym) => sym.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeFilter, searchTerm]);

  const handleSymptomClick = (symptom: string) => {
    if (activeSymptom === symptom) {
      setActiveSymptom(null);
      setQuery("");
    } else {
      setActiveSymptom(symptom);
      setQuery(symptom);
    }
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setActiveSymptom(null);
  };

  return (
    <section className="bg-secondary py-24 lg:py-[120px]">
      <div className="container mx-auto px-6">
        {/* ── Symptom Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl lg:text-[40px] font-semibold text-primary mb-4">
            Не знаете к какому врачу обратиться?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Опишите симптом — мы подскажем специалиста
          </p>

          {/* Search bar */}
          <div className="max-w-[720px] mx-auto">
            <div className="relative flex items-center h-16 bg-card rounded-2xl shadow-md border-2 border-transparent focus-within:border-primary transition-colors duration-200">
              <Search className="absolute left-6 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Например: выпадение волос, акне, пигментные пятна..."
                className="w-full h-full bg-transparent pl-14 pr-36 text-lg text-foreground placeholder:text-muted-foreground/60 outline-none"
              />
              <button className="absolute right-2 h-12 w-[120px] hidden sm:flex items-center justify-center bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:opacity-90 transition-opacity">
                Найти
              </button>
              <button className="absolute right-2 h-12 w-12 flex sm:hidden items-center justify-center bg-primary text-primary-foreground rounded-xl">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Popular symptoms */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 items-center">
              <span className="text-sm text-muted-foreground mr-1">
                Популярные симптомы:
              </span>
              {popularSymptoms.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSymptomClick(s)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    activeSymptom === s
                      ? "border-2 border-primary text-primary bg-primary/5"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Filter + Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl lg:text-5xl font-semibold text-primary mb-10">
            Все направления клиники
          </h2>

          {/* Filter buttons */}
          <div className="flex gap-3 mb-14 overflow-x-auto pb-2 scrollbar-hide">
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

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => (
                <motion.div
                  key={service.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {service.categoryLabel}
                  </span>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-medium text-primary">
                      {service.price}
                    </span>
                    <Link
                      to={service.link}
                      className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-200"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16 text-lg">
              Ничего не найдено. Попробуйте другой запрос или позвоните нам.
            </p>
          )}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-primary p-12 lg:p-16 text-center"
        >
          <h3 className="text-2xl lg:text-4xl font-semibold text-primary-foreground mb-4">
            Не нашли нужную услугу?
          </h3>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Позвоните нам — консультант подберёт процедуру
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+73843123456"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-card text-primary rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5" />
              Позвонить
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 border-2 border-primary-foreground text-primary-foreground rounded-xl text-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SymptomSearch;
