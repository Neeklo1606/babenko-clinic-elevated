import { Link, useNavigate } from "react-router-dom";
import { ImageOff, Star } from "lucide-react";
import { Clinic, Doctor, dayLabel, dayLong, fromRub, getClinic, getService, nearest, reviewsWord } from "@/data/market";
import { btn } from "./Btn";
import { cn } from "@/lib/utils";

export const bookUrl = (p: { clinic: string; service?: string | null; day?: number; time?: string; doctor?: string }) => {
  const s = new URLSearchParams({ clinic: p.clinic });
  if (p.service) s.set("service", p.service);
  if (p.day !== undefined) s.set("day", String(p.day));
  if (p.time) s.set("time", p.time);
  if (p.doctor) s.set("doctor", p.doctor);
  return `/booking?${s}`;
};

export const Rating = ({ rating, reviews, className }: { rating: number; reviews: number; className?: string }) =>
  reviews ? (
    <span className={cn("inline-flex items-center gap-1.5 text-[14.5px]", className)}>
      <Star className="h-[15px] w-[15px] fill-ink text-ink" strokeWidth={0} />
      <span className="font-medium">{rating.toFixed(1)}</span>
      <span className="text-ink-3">·</span>
      <span className="text-ink-2">{reviewsWord(reviews)}</span>
    </span>
  ) : <span className={cn("text-[14.5px] text-ink-2", className)}>Новая клиника · пока без отзывов</span>;

export const Photo = ({ src, alt, className, eager }: { src?: string; alt: string; className?: string; eager?: boolean }) =>
  src ? <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onLoad={(e) => e.currentTarget.classList.add("is-loaded")} className={cn("img-fade h-full w-full object-cover", className)} />
    : <div className={cn("flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-2 text-ink-3", className)}><ImageOff className="h-6 w-6" strokeWidth={1.5} /><span className="text-[13px]">Фото скоро появятся</span></div>;

export const Chip = ({ active, children, onClick, className }: { active?: boolean; children: React.ReactNode; onClick?: () => void; className?: string }) => (
  <button onClick={onClick} aria-pressed={active} className={cn("inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[14.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40",
    active ? "border-graphite bg-graphite text-ivory" : "border-line-strong bg-surface text-ink hover:bg-surface-2", className)}>{children}</button>
);

export const SlotChip = ({ time, onClick, active }: { time: string; onClick: () => void; active?: boolean }) => (
  <button onClick={onClick} className={cn("h-11 min-w-[72px] rounded-xl px-3 text-[15px] font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40",
    active ? "bg-graphite text-lime" : "bg-lime-soft text-ink hover:bg-lime")}>{time}</button>
);

export const SectionHead = ({ title, action }: { title: string; action?: React.ReactNode }) => (
  <div className="mb-4 flex items-end justify-between gap-4">
    <h2 className="text-[24px] font-medium leading-tight tracking-[-0.025em] lg:text-[32px]">{title}</h2>
    {action}
  </div>
);

export const ClinicCard = ({ c, service }: { c: Clinic; service?: string | null }) => {
  const navigate = useNavigate();
  const s = getService(service);
  const price = s ? c.prices[s.id] : Math.min(...Object.values(c.prices));
  const n = nearest(c.slots);
  return (
    <article className="min-w-0 overflow-hidden rounded-[22px] border border-line bg-surface">
      <Link to={`/clinics/${c.id}${service ? `?service=${service}` : ""}`} className="block aspect-[16/10] overflow-hidden bg-surface-2">
        <Photo src={c.images[0]} alt={c.name} />
      </Link>
      <div className="p-4 lg:p-5">
        <Link to={`/clinics/${c.id}${service ? `?service=${service}` : ""}`}><h3 className="text-[21px] font-medium tracking-[-0.02em]">{c.name}</h3></Link>
        <Rating rating={c.rating} reviews={c.reviews} className="mt-1" />
        <p className="mt-1 text-[14.5px] text-ink-2">{c.distanceKm.toString().replace(".", ",")} км · {c.address}</p>
        <p className="mt-0.5 text-[14px] text-ink-2">Открыто до {c.openUntil}</p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3.5">
          <div className="min-w-0">
            <p className="text-[12.5px] text-ink-3">{s ? "По вашему запросу" : "Услуги"}</p>
            <p className="truncate text-[15px]">{s?.name ?? `${Object.keys(c.prices).length} направлений`}</p>
          </div>
          <p className="shrink-0 text-[16px] font-medium">{s ? fromRub(price) : `от ${price.toLocaleString("ru-RU")} ₽`}</p>
        </div>

        {n ? (
          <div className="mt-3.5">
            <p className="text-[13px] text-ink-2">{n.day <= 1 ? `Ближайшее время ${dayLabel(n.day).toLowerCase()}` : `Ближайшая запись ${dayLong(n.day)}`}</p>
            <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4">
              {n.times.map((t) => <SlotChip key={t} time={t} onClick={() => navigate(bookUrl({ clinic: c.id, service, day: n.day, time: t }))} />)}
            </div>
          </div>
        ) : <p className="mt-3.5 text-[14px] text-ink-2">Свободного времени пока нет</p>}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to={`/clinics/${c.id}${service ? `?service=${service}` : ""}#time`} className={btn({ variant: "dark", size: "md" })}>{n && n.day > 2 ? "Расписание" : "Все время"}</Link>
          <Link to={`/clinics/${c.id}${service ? `?service=${service}` : ""}`} className={btn({ variant: "secondary", size: "md" })}>О клинике</Link>
        </div>
      </div>
    </article>
  );
};

export const DoctorCard = ({ d, service, showClinic = true }: { d: Doctor; service?: string | null; showClinic?: boolean }) => {
  const navigate = useNavigate();
  const clinic = getClinic(d.clinicId)!;
  const sid = service && d.services.includes(service) ? service : d.services[0];
  const s = getService(sid);
  const n = nearest(d.slots);
  return (
    <article className="min-w-0 rounded-[22px] border border-line bg-surface p-3.5">
      <div className="flex min-w-0 gap-3.5">
        <Link to={`/doctors/${d.id}`} className="block h-[112px] w-[90px] shrink-0 overflow-hidden rounded-2xl bg-surface-2"><Photo src={d.image} alt={d.name} /></Link>
        <div className="min-w-0 flex-1 py-0.5">
          <Link to={`/doctors/${d.id}`}><h3 className="text-[17px] font-medium leading-[1.25] tracking-[-0.015em]">{d.name}</h3></Link>
          <p className="mt-0.5 text-[13.5px] leading-snug text-ink-2">{d.role}</p>
          <p className="text-[13.5px] leading-snug text-ink-2">{d.years} лет опыта{showClinic && ` · ${clinic.name}`}</p>
          <Rating rating={d.rating} reviews={d.reviews} className="mt-1.5 text-[13.5px]" />
          <p className="mt-1.5 flex min-w-0 gap-1.5 text-[13px]"><span className="truncate text-ink-2">{s?.name}</span><span className="shrink-0 font-medium">{fromRub(clinic.prices[sid])}</span></p>
        </div>
      </div>
      <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-line pt-3">
        <div className="min-w-0">
          <p className="text-[12.5px] text-ink-3">Ближайшее время</p>
          <p className="text-[15px] font-medium">{n ? `${dayLabel(n.day)}, ${n.times[0]}` : "Нет свободного времени"}</p>
        </div>
        <button onClick={() => navigate(n ? bookUrl({ clinic: clinic.id, service: sid, day: n.day, time: n.times[0], doctor: d.id }) : `/doctors/${d.id}`)} className={btn({ variant: "primary", size: "sm", className: "shrink-0 px-4" })}>Выбрать время</button>
      </div>
    </article>
  );
};

export const MapCanvas = ({ items, selected, onSelect, className }: { items: Clinic[]; selected?: string; onSelect?: (id: string) => void; className?: string }) => (
  <div className={cn("relative overflow-hidden bg-surface-2", className)}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="100" height="100" fill="hsl(var(--surface-2))" />
      <path d="M0 62 C 30 55, 45 70, 100 58" stroke="hsl(var(--ink) / 0.06)" strokeWidth="6" fill="none" />
      <path d="M58 0 L 52 100" stroke="hsl(var(--surface))" strokeWidth="2.2" />
      <path d="M0 35 L 100 40" stroke="hsl(var(--surface))" strokeWidth="2.2" />
      <path d="M20 0 L 34 100 M0 82 L 100 76 M78 0 L 86 100 M0 14 L 100 20" stroke="hsl(var(--surface))" strokeWidth="1.1" />
      <circle cx="44" cy="20" r="7" fill="hsl(var(--lime-soft))" />
      <circle cx="84" cy="88" r="9" fill="hsl(var(--lime-soft))" />
    </svg>
    {items.map((c) => {
      const on = c.id === selected;
      return (
        <button key={c.id} onClick={() => onSelect?.(c.id)} aria-label={c.name} style={{ left: `${c.pin.x}%`, top: `${c.pin.y}%` }}
          className={cn("absolute -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-[12.5px] font-medium shadow-float transition-transform", on ? "z-10 scale-110 bg-graphite text-lime" : "bg-surface text-ink")}>
          {c.reviews ? c.rating.toFixed(1) : "Новая"}
        </button>
      );
    })}
  </div>
);
