import clinic1 from "@/assets/m/clinic-1.jpg";
import clinic2 from "@/assets/m/clinic-2.jpg";
import clinic3 from "@/assets/m/clinic-3.jpg";
import doctor1 from "@/assets/m/doctor-1.jpg";
import doctor2 from "@/assets/m/doctor-2.jpg";
import doctor3 from "@/assets/m/doctor-3.jpg";
import doctor4 from "@/assets/m/doctor-4.jpg";
import pPain from "@/assets/m/p-pain.jpg";
import pClean from "@/assets/m/p-clean.jpg";
import pSmile from "@/assets/m/p-smile.jpg";
import pImplant from "@/assets/m/p-implant.jpg";
import pKid from "@/assets/m/p-kid.jpg";
import pAlign from "@/assets/m/p-align.jpg";

export const CITY = "Ставрополь";

export interface Service { id: string; name: string; short: string; category: string; duration: string; from: number; image?: string; about: string }

export const services: Service[] = [
  { id: "caries", name: "Лечение кариеса", short: "Лечить зуб", category: "Терапия", duration: "45–60 мин", from: 4500, image: pPain, about: "Удаление поражённых тканей и пломба из светоотверждаемого композита. Обычно за один визит." },
  { id: "canals", name: "Лечение каналов", short: "Болит зуб", category: "Терапия", duration: "60–90 мин", from: 7500, image: pPain, about: "Эндодонтическое лечение под микроскопом при пульпите и периодонтите." },
  { id: "cleaning", name: "Профессиональная чистка", short: "Чистка", category: "Гигиена", duration: "60 мин", from: 3200, image: pClean, about: "Ультразвук, Air Flow, полировка и фторирование. Рекомендуется раз в полгода." },
  { id: "extraction", name: "Удаление зуба", short: "Удаление", category: "Хирургия", duration: "30–60 мин", from: 2500, image: pSmile, about: "Простое и сложное удаление, включая зубы мудрости, под местной анестезией." },
  { id: "implant", name: "Имплантация", short: "Имплантация", category: "Хирургия", duration: "60–90 мин", from: 32000, image: pImplant, about: "Установка импланта с последующей коронкой. Цена указана за имплант без коронки." },
  { id: "braces", name: "Брекеты", short: "Брекеты", category: "Ортодонтия", duration: "90 мин", from: 45000, image: pAlign, about: "Металлические, керамические и сапфировые системы. Цена за одну челюсть." },
  { id: "aligners", name: "Элайнеры", short: "Элайнеры", category: "Ортодонтия", duration: "40 мин", from: 120000, image: pAlign, about: "Прозрачные капы для выравнивания зубов. Цена за курс лечения." },
  { id: "whitening", name: "Отбеливание", short: "Отбеливание", category: "Эстетика", duration: "90 мин", from: 15000, image: pSmile, about: "Кабинетное отбеливание за один визит, осветление до 8 тонов." },
  { id: "kids", name: "Детская стоматология", short: "Детский стоматолог", category: "Детский приём", duration: "30–45 мин", from: 2000, image: pKid, about: "Осмотр, лечение молочных зубов и герметизация фиссур в спокойной обстановке." },
];

export const getService = (id?: string | null) => services.find((s) => s.id === id);

export const problems = [
  { service: "canals", title: "Болит зуб", hint: "Приём сегодня", image: pPain },
  { service: "cleaning", title: "Нужна чистка", hint: "от 3 200 ₽", image: pClean },
  { service: "implant", title: "Нет зуба", hint: "Имплантация", image: pImplant },
  { service: "extraction", title: "Удалить зуб", hint: "от 2 500 ₽", image: pSmile },
  { service: "aligners", title: "Неровные зубы", hint: "Брекеты и элайнеры", image: pAlign },
  { service: "kids", title: "Ребёнку", hint: "Детские врачи", image: pKid },
];

export interface Clinic {
  id: string; name: string; images: string[]; rating: number; reviews: number; distanceKm: number;
  address: string; district: string; openUntil: string; phone: string; kids: boolean;
  prices: Record<string, number>; slots: Record<number, string[]>; pin: { x: number; y: number }; about: string;
  ratingDist: number[];
}

// slots keyed by day offset: 0 = today, 1 = tomorrow ...
export const clinics: Clinic[] = [
  { id: "smile-atelier", name: "Smile Atelier", images: [clinic1, clinic3, clinic2], rating: 4.9, reviews: 124, distanceKm: 1.2, address: "ул. Ленина, 42", district: "Центр", openUntil: "21:00", phone: "+7 (8652) 50-42-42", kids: true,
    prices: { caries: 4500, canals: 8000, cleaning: 3500, extraction: 2800, implant: 35000, whitening: 16000, kids: 2200 }, slots: { 0: ["16:30", "17:00", "18:30"], 1: ["10:00", "11:30", "15:00"], 2: ["09:30", "14:00"] }, pin: { x: 40, y: 46 },
    about: "Терапия, гигиена и эстетика в историческом центре. Работаем под микроскопом.", ratingDist: [92, 6, 1, 1, 0] },
  { id: "dental-atelier", name: "Dental Atelier", images: [clinic2, clinic1, clinic3], rating: 4.8, reviews: 211, distanceKm: 2.4, address: "пр. Карла Маркса, 7", district: "Центр", openUntil: "20:00", phone: "+7 (8652) 23-07-07", kids: false,
    prices: { caries: 5200, canals: 9500, cleaning: 3200, extraction: 3000, implant: 38000, braces: 52000, aligners: 140000, whitening: 15000 }, slots: { 0: ["15:00", "19:00"], 1: ["12:00", "16:30"], 3: ["10:00"] }, pin: { x: 60, y: 30 },
    about: "Клиника полного цикла: от лечения до ортодонтии и имплантации.", ratingDist: [86, 10, 2, 1, 1] },
  { id: "white-room", name: "White Room", images: [clinic3, clinic2, clinic1], rating: 4.9, reviews: 87, distanceKm: 3.1, address: "ул. Доваторцев, 61", district: "Юго-Запад", openUntil: "22:00", phone: "+7 (8652) 61-61-00", kids: true,
    prices: { caries: 4800, cleaning: 3900, extraction: 2500, implant: 32000, braces: 45000, aligners: 120000, kids: 2000 }, slots: { 0: ["17:30", "18:00", "20:00"], 1: ["09:00", "13:00"] }, pin: { x: 72, y: 66 },
    about: "Хирургия и ортодонтия, отдельное детское отделение.", ratingDist: [90, 7, 2, 1, 0] },
  { id: "dent-lab", name: "Дент Лаб", images: [clinic1, clinic2], rating: 4.6, reviews: 58, distanceKm: 4.6, address: "ул. 50 лет ВЛКСМ, 18", district: "Северо-Запад", openUntil: "19:00", phone: "+7 (8652) 77-18-18", kids: true,
    prices: { caries: 3600, canals: 6900, cleaning: 2900, extraction: 2200, kids: 1800 }, slots: { 1: ["11:00", "17:00"], 2: ["10:30"] }, pin: { x: 24, y: 24 },
    about: "Доступная терапия и детский приём рядом с домом.", ratingDist: [72, 18, 6, 2, 2] },
  { id: "ortho-point", name: "Ortho Point", images: [], rating: 0, reviews: 0, distanceKm: 5.3, address: "ул. Тухачевского, 22", district: "Юго-Запад", openUntil: "20:00", phone: "+7 (8652) 22-22-90", kids: false,
    prices: { braces: 48000, aligners: 130000 }, slots: { 6: ["12:00", "15:00"] }, pin: { x: 30, y: 74 },
    about: "Ортодонтический центр. Новая клиника на сервисе.", ratingDist: [0, 0, 0, 0, 0] },
];

export const getClinic = (id?: string) => clinics.find((c) => c.id === id);

export interface Doctor {
  id: string; name: string; role: string; spec: "Терапевт" | "Хирург" | "Ортодонт" | "Имплантолог" | "Детский" | "Гигиенист";
  years: number; rating: number; reviews: number; clinicId: string; image: string; services: string[];
  slots: Record<number, string[]>; education: string[]; bio: string;
}

export const doctors: Doctor[] = [
  { id: "ivanov", name: "Александр Иванов", role: "Стоматолог-терапевт", spec: "Терапевт", years: 12, rating: 4.9, reviews: 48, clinicId: "dental-atelier", image: doctor1, services: ["caries", "canals", "whitening"], slots: { 0: ["18:30"], 1: ["12:00", "16:30"] }, education: ["СтГМУ, стоматология, 2012", "Ординатура по терапевтической стоматологии, 2014", "Курс микроскопной эндодонтии, Москва, 2019"], bio: "Лечит каналы под микроскопом, занимается художественной реставрацией зубов." },
  { id: "orlova", name: "Мария Орлова", role: "Стоматолог-гигиенист", spec: "Гигиенист", years: 8, rating: 5.0, reviews: 76, clinicId: "smile-atelier", image: doctor2, services: ["cleaning", "whitening"], slots: { 0: ["17:00"], 1: ["10:00", "11:30"] }, education: ["СтГМУ, стоматология, 2016", "Сертификат EMS Swiss Dental Academy, 2021"], bio: "Бережная профессиональная гигиена и подбор домашнего ухода." },
  { id: "sokolov", name: "Игорь Соколов", role: "Ортодонт", spec: "Ортодонт", years: 21, rating: 4.8, reviews: 112, clinicId: "white-room", image: doctor3, services: ["braces", "aligners"], slots: { 1: ["09:00", "13:00"] }, education: ["СтГМА, стоматология, 2003", "Ординатура по ортодонтии, 2005", "Сертифицированный доктор Invisalign"], bio: "Лечит взрослых и подростков, работает с брекетами и элайнерами." },
  { id: "kuzmina", name: "Анна Кузьмина", role: "Детский стоматолог", spec: "Детский", years: 6, rating: 4.9, reviews: 64, clinicId: "white-room", image: doctor4, services: ["kids", "caries"], slots: { 0: ["17:30", "20:00"], 1: ["13:00"] }, education: ["СтГМУ, стоматология, 2018", "Ординатура по детской стоматологии, 2020"], bio: "Находит подход к детям, первый визит проводит в формате знакомства." },
  { id: "petrov", name: "Денис Петров", role: "Хирург-имплантолог", spec: "Имплантолог", years: 15, rating: 4.9, reviews: 39, clinicId: "smile-atelier", image: doctor1, services: ["implant", "extraction"], slots: { 1: ["15:00"], 2: ["09:30", "14:00"] }, education: ["СтГМУ, стоматология, 2009", "Ординатура по хирургической стоматологии, 2011", "Курсы Straumann, Швейцария"], bio: "Сложные удаления, синус-лифтинг и имплантация." },
];

export const getDoctor = (id?: string) => doctors.find((d) => d.id === id);

export const reviews = [
  { name: "Екатерина", date: "12 сентября", rating: 5, text: "Лечила два зуба, всё объяснили заранее и назвали точную цену. Без боли и очень аккуратно." },
  { name: "Олег", date: "3 сентября", rating: 5, text: "Записался на сегодня вечером через сервис, приняли минута в минуту." },
  { name: "Ирина", date: "28 августа", rating: 4, text: "Хорошая чистка, приятный врач. Немного подождала на ресепшене." },
];

export const popularSearches = ["Болит зуб", "Чистка зубов", "Имплантация", "Удаление зуба мудрости"];

/* helpers */
export const rub = (n: number) => `${n.toLocaleString("ru-RU").replace(/,/g, " ")} ₽`;
export const fromRub = (n?: number) => (n ? `от ${rub(n)}` : "Цена уточняется");
export const reviewsWord = (n: number) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} отзыв`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} отзыва`;
  return `${n} отзывов`;
};
const wd = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
export const dayLabel = (off: number) => {
  if (off === 0) return "Сегодня";
  if (off === 1) return "Завтра";
  const d = new Date(); d.setDate(d.getDate() + off);
  return wd[d.getDay()];
};
export const dayLong = (off: number) => {
  if (off < 2) return dayLabel(off).toLowerCase();
  const d = new Date(); d.setDate(d.getDate() + off);
  return `${d.getDate()} ${months[d.getMonth()]}`;
};
export const nearest = (slots: Record<number, string[]>) => {
  const days = Object.keys(slots).map(Number).filter((k) => slots[k]?.length).sort((a, b) => a - b);
  return days.length ? { day: days[0], times: slots[days[0]] } : null;
};
export const clinicsForService = (sid?: string | null) => (sid ? clinics.filter((c) => c.prices[sid]) : clinics);
