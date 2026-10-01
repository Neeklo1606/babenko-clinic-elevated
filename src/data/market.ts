import clinic1 from "@/assets/m/clinic-1.jpg";
import clinic2 from "@/assets/m/clinic-2.jpg";
import clinic3 from "@/assets/m/clinic-3.jpg";
import doctor1 from "@/assets/m/doctor-1.jpg";
import doctor2 from "@/assets/m/doctor-2.jpg";
import doctor3 from "@/assets/m/doctor-3.jpg";
import pPain from "@/assets/m/p-pain.jpg";
import pClean from "@/assets/m/p-clean.jpg";
import pSmile from "@/assets/m/p-smile.jpg";
import pImplant from "@/assets/m/p-implant.jpg";
import pKid from "@/assets/m/p-kid.jpg";
import pAlign from "@/assets/m/p-align.jpg";

export const CITY = "Ставрополь";

export const intents = ["Болит зуб", "Лечить зуб", "Чистка", "Удаление", "Имплантация", "Брекеты", "Детский стоматолог"];

export const problems = [
  { id: "pain", title: "Болит зуб", hint: "Приём сегодня", image: pPain },
  { id: "clean", title: "Нужна чистка", hint: "от 3 200 ₽", image: pClean },
  { id: "implant", title: "Нет зуба", hint: "Имплантация", image: pImplant },
  { id: "remove", title: "Нужно удалить зуб", hint: "от 2 500 ₽", image: pSmile },
  { id: "align", title: "Неровные зубы", hint: "Брекеты и элайнеры", image: pAlign },
  { id: "kids", title: "Стоматолог ребёнку", hint: "Детские врачи", image: pKid },
];

export interface Clinic {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  address: string;
  service: string;
  price: string;
  slots: string[];
  pin: { x: number; y: number };
}

export const clinics: Clinic[] = [
  { id: "smile-atelier", name: "Smile Atelier", image: clinic1, rating: 4.9, reviews: 124, distance: "1,2 км", address: "ул. Ленина, 42", service: "Лечение кариеса", price: "от 4 500 ₽", slots: ["16:30", "17:00", "18:30"], pin: { x: 38, y: 44 } },
  { id: "dental-atelier", name: "Dental Atelier", image: clinic2, rating: 4.8, reviews: 211, distance: "2,4 км", address: "пр. Карла Маркса, 7", service: "Профессиональная чистка", price: "от 3 200 ₽", slots: ["15:00", "19:00"], pin: { x: 62, y: 30 } },
  { id: "white-room", name: "White Room", image: clinic3, rating: 4.9, reviews: 87, distance: "3,1 км", address: "ул. Доваторцев, 61", service: "Имплантация", price: "от 32 000 ₽", slots: ["17:30", "18:00", "20:00"], pin: { x: 70, y: 66 } },
];

export interface Doctor {
  id: string;
  name: string;
  role: string;
  years: number;
  rating: number;
  clinic: string;
  next: string;
  image: string;
}

export const doctors: Doctor[] = [
  { id: "ivanov", name: "Александр Иванов", role: "Стоматолог-терапевт", years: 12, rating: 4.9, clinic: "Dental Atelier", next: "Сегодня · 18:30", image: doctor1 },
  { id: "orlova", name: "Мария Орлова", role: "Стоматолог-гигиенист", years: 8, rating: 5.0, clinic: "Smile Atelier", next: "Сегодня · 17:00", image: doctor2 },
  { id: "sokolov", name: "Игорь Соколов", role: "Ортодонт", years: 21, rating: 4.8, clinic: "White Room", next: "Завтра · 10:00", image: doctor3 },
];

export const services = ["Лечение кариеса", "Лечение каналов", "Профессиональная чистка", "Удаление зуба", "Имплантация", "Брекеты", "Элайнеры", "Отбеливание", "Коронки", "Детская стоматология"];

export const popularSearches = ["Болит зуб", "Чистка зубов", "Имплантация", "Удаление зуба мудрости"];
