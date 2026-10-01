import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarketShell from "@/components/market/MarketShell";
import { Chip, Photo, Rating, SectionHead, SlotChip, bookUrl } from "@/components/market/parts";
import { btn } from "@/components/market/Btn";
import { dayLabel, fromRub, getClinic, getDoctor, getService, nearest } from "@/data/market";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";

const DoctorPage = () => {
  const { id } = useParams();
  const d = getDoctor(id);
  const navigate = useNavigate();
  const first = d ? nearest(d.slots) : null;
  const [day, setDay] = useState(first?.day ?? 0);
  if (!d) return <NotFound />;
  const clinic = getClinic(d.clinicId)!;
  const times = d.slots[day] ?? [];

  return (
    <MarketShell back title={d.name}>
      <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-2 lg:grid lg:grid-cols-[380px_1fr] lg:gap-12 lg:px-10 lg:pt-8">
        <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-surface-2"><Photo src={d.image} alt={d.name} eager /></div>
        <div>
          <h1 className="mt-5 text-[30px] font-medium leading-tight tracking-[-0.03em] lg:mt-0 lg:text-[44px]">{d.name}</h1>
          <p className="mt-1 text-[16px] text-ink-2">{d.role} · {d.years} лет опыта</p>
          <Rating rating={d.rating} reviews={d.reviews} className="mt-2" />
          <Link to={`/clinics/${clinic.id}`} className="mt-1 block text-[14.5px] underline decoration-line-strong underline-offset-4">{clinic.name} · {clinic.address}</Link>

          <section className="mt-6 rounded-[22px] border border-line bg-surface p-4 lg:p-6">
            <h2 className="text-[20px] font-medium tracking-[-0.02em]">Свободное время</h2>
            <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
              {[0, 1, 2, 3, 4].map((x) => <Chip key={x} active={x === day} onClick={() => setDay(x)} className={cn(!d.slots[x]?.length && "text-ink-3")}>{dayLabel(x)}</Chip>)}
            </div>
            {times.length ? (
              <div className="mt-3 flex flex-wrap gap-2">{times.map((t) => <SlotChip key={t} time={t} onClick={() => navigate(bookUrl({ clinic: clinic.id, service: d.services[0], day, time: t, doctor: d.id }))} />)}</div>
            ) : <p className="mt-3 text-[14.5px] text-ink-2">В этот день приёма нет.{first && <> Ближайшее: {dayLabel(first.day).toLowerCase()} в {first.times[0]}.</>}</p>}
          </section>

          <section className="pt-10">
            <SectionHead title="Услуги" />
            <ul>{d.services.map((sid) => { const s = getService(sid)!; return (
              <li key={sid} className="flex items-center justify-between gap-3 border-b border-line py-3.5">
                <div><p className="text-[15.5px]">{s.name}</p><p className="text-[13px] text-ink-2">{s.duration}</p></div>
                <span className="text-[15px] font-medium">{fromRub(clinic.prices[sid])}</span>
              </li>); })}</ul>
          </section>

          <section className="pt-10">
            <SectionHead title="О враче" />
            <p className="text-[15.5px] leading-relaxed text-ink-2">{d.bio}</p>
            <h3 className="eyebrow mb-2 mt-6">Образование</h3>
            <ul className="space-y-2">{d.education.map((e) => <li key={e} className="border-l-2 border-lime pl-3 text-[15px]">{e}</li>)}</ul>
          </section>

          {first && <Link to={bookUrl({ clinic: clinic.id, service: d.services[0], day: first.day, time: first.times[0], doctor: d.id })} className={btn({ size: "lg", block: true, className: "mt-8 lg:w-auto" })}>Записаться · {dayLabel(first.day)} {first.times[0]}</Link>}
        </div>
      </div>
    </MarketShell>
  );
};

export default DoctorPage;
