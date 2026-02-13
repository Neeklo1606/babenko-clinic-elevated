import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Shield, Phone, Mail, User, Clock, CalendarDays, Stethoscope, FolderHeart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const directions = [
  "Дерматология",
  "Трихология",
  "Косметология (инъекционная)",
  "Косметология (аппаратная)",
];

const doctorsByDirection: Record<string, { name: string; initials: string }[]> = {
  "Дерматология": [
    { name: "Бабенко Елена Викторовна", initials: "БЕ" },
    { name: "Иванова Марина Сергеевна", initials: "ИМ" },
    { name: "Козлов Дмитрий Андреевич", initials: "КД" },
  ],
  "Трихология": [
    { name: "Петрова Анна Игоревна", initials: "ПА" },
    { name: "Сидорова Ольга Николаевна", initials: "СО" },
  ],
  "Косметология (инъекционная)": [
    { name: "Бабенко Елена Викторовна", initials: "БЕ" },
    { name: "Козлов Дмитрий Андреевич", initials: "КД" },
  ],
  "Косметология (аппаратная)": [
    { name: "Иванова Марина Сергеевна", initials: "ИМ" },
    { name: "Козлов Дмитрий Андреевич", initials: "КД" },
  ],
};

const timeSlots = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:30", available: true },
  { time: "14:00", available: true },
  { time: "15:30", available: false },
  { time: "17:00", available: true },
  { time: "18:30", available: true },
];

const guarantees = [
  "Конфиденциальность данных",
  "SMS-подтверждение записи",
  "Напоминание за день до приёма",
  "Возможность переноса онлайн",
];

const Appointment = () => {
  const [direction, setDirection] = useState("");
  const [dirOpen, setDirOpen] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [docOpen, setDocOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const availableDoctors = direction ? doctorsByDirection[direction] || [] : Object.values(doctorsByDirection).flat().filter((d, i, arr) => arr.findIndex(x => x.name === d.name) === i);

  // Calendar helpers
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Monday-first
  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const isDateAvailable = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    const dayOfWeek = d.getDay();
    return d >= new Date(today.getFullYear(), today.getMonth(), today.getDate()) && dayOfWeek !== 0;
  };

  const formatDate = (day: number) => `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(214 100% 97%) 0%, hsl(210 20% 98.4%) 50%, hsl(210 20% 98.4%) 100%)" }} />
      <div className="fixed inset-0 pointer-events-none hero-grid-bg opacity-30" />

      <div className="relative z-10 pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h1 className="text-4xl lg:text-[48px] font-semibold text-primary leading-tight tracking-[-0.01em]">
              Запись на приём
            </h1>
            <p className="text-lg text-muted-foreground mt-3">
              Выберите удобное время и врача
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Main Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-3">
              <div className="glass-card p-8 lg:p-12" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>

                  {/* Direction */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Направление</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setDirOpen(!dirOpen); setDocOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-background text-left text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <FolderHeart className="w-5 h-5 text-primary" />
                        </div>
                        <span className={direction ? "text-foreground" : "text-muted-foreground/50"}>
                          {direction || "Выберите направление"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground ml-auto transition-transform duration-200 ${dirOpen ? "rotate-180" : ""}`} />
                      </button>
                      {dirOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                          {directions.map((d) => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => { setDirection(d); setDirOpen(false); setDoctor(""); }}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/5 transition-colors ${direction === d ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doctor */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Врач</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setDocOpen(!docOpen); setDirOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-background text-left text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Stethoscope className="w-5 h-5 text-primary" />
                        </div>
                        <span className={doctor ? "text-foreground" : "text-muted-foreground/50"}>
                          {doctor || "Выберите врача или оставьте любого"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground ml-auto transition-transform duration-200 ${docOpen ? "rotate-180" : ""}`} />
                      </button>
                      {docOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => { setDoctor(""); setDocOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/5 transition-colors ${!doctor ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}
                          >
                            Любой специалист
                          </button>
                          {availableDoctors.map((d) => (
                            <button
                              key={d.name}
                              type="button"
                              onClick={() => { setDoctor(d.name); setDocOpen(false); }}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/5 transition-colors flex items-center gap-3 ${doctor === d.name ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}
                            >
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                                {d.initials}
                              </div>
                              {d.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Date - inline calendar */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Дата приёма</label>
                    <div className="rounded-xl border border-border bg-background p-4">
                      {/* Month nav */}
                      <div className="flex items-center justify-between mb-4">
                        <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                          <ChevronDown className="w-4 h-4 rotate-90" />
                        </button>
                        <span className="text-sm font-semibold text-foreground">{monthNames[calMonth]} {calYear}</span>
                        <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        </button>
                      </div>
                      {/* Day headers */}
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {dayNames.map((d) => (
                          <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
                        ))}
                      </div>
                      {/* Days */}
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: offset }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                          const available = isDateAvailable(day);
                          const dateStr = formatDate(day);
                          const selected = selectedDate === dateStr;
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={!available}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`h-9 rounded-lg text-sm font-medium transition-all duration-150
                                ${selected ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : ""}
                                ${available && !selected ? "hover:bg-primary/10 text-foreground" : ""}
                                ${!available ? "text-muted-foreground/30 cursor-not-allowed" : "cursor-pointer"}
                              `}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Удобное время</label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                            ${selectedTime === slot.time ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : ""}
                            ${slot.available && selectedTime !== slot.time ? "bg-secondary/60 text-foreground hover:bg-primary/10 hover:text-primary" : ""}
                            ${!slot.available ? "bg-muted/40 text-muted-foreground/30 cursor-not-allowed line-through" : "cursor-pointer"}
                          `}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/20" />

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Имя</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван Петров"
                        className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Телефон</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Email для подтверждения</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.ru"
                        className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      Согласен на{" "}
                      <a href="#" className="text-primary hover:underline">обработку персональных данных</a>
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!agreed}
                    className="w-full bg-primary text-primary-foreground h-14 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
                  >
                    Записаться на приём
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Side card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="glass-card p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-4">Гарантии клиники</h3>
                  <ul className="space-y-3">
                    {guarantees.map((g) => (
                      <li key={g} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="glass-card p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Или позвоните нам</p>
                  <a href="tel:+74951234567" className="text-2xl font-semibold text-primary hover:underline block mb-1">
                    +7 (3843) 99-99-99
                  </a>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Пн — Сб 8:00 — 20:00
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Appointment;
