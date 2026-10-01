import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, Phone, Star, X } from "lucide-react";
import MarketShell from "@/components/market/MarketShell";
import { Chip, DoctorCard, MapCanvas, Photo, Rating, SectionHead, SlotChip, bookUrl } from "@/components/market/parts";
import { Btn, btn } from "@/components/market/Btn";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { dayLabel, doctors, fromRub, getClinic, getService, nearest, reviews, reviewsWord, services } from "@/data/market";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";

const ClinicPage = () => {
  const { id } = useParams();
  const c = getClinic(id);
  const [sp, setSp] = useSearchParams();
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [full, setFull] = useState(false);
  const [pick, setPick] = useState(false);
  const first = c ? nearest(c.slots) : null;
  const [day, setDay] = useState<number>(Number(sp.get("day") ?? first?.day ?? 0));

  useEffect(() => { if (location.hash === "#time") document.getElementById("time")?.scrollIntoView({ block: "start" }); }, []);
  if (!c) return <NotFound />;

  const sid = sp.get("service") && c.prices[sp.get("service")!] ? sp.get("service")! : null;
  const s = getService(sid);
  const offered = services.filter((x) => c.prices[x.id]);
  const team = doctors.filter((d) => d.clinicId === c.id);
  const times = c.slots[day] ?? [];
  const minPrice = s ? c.prices[s.id] : Math.min(...Object.values(c.prices));
  const setService = (v: string) => { const n = new URLSearchParams(sp); n.set("service", v); setSp(n, { replace: true }); setPick(false); };

  return (
    <MarketShell noHeader hideNav hideFooter>
      <div className="mx-auto max-w-[1320px] pb-[calc(96px+env(safe-area-inset-bottom))] lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:px-10 lg:pb-16 lg:pt-6">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 lg:rounded-[22px]">
            <button className="h-full w-full" onClick={() => c.images.length && setFull(true)} aria-label="Открыть галерею"><Photo src={c.images[photo]} alt={c.name} eager /></button>
            <div className="absolute inset-x-0 top-0 flex justify-between p-3">
              <button onClick={() => navigate(-1)} aria-label="Назад" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface/95"><ArrowLeft className="h-5 w-5" strokeWidth={1.75} /></button>
              <button onClick={() => setFav(!fav)} aria-label="В избранное" aria-pressed={fav} className="flex h-11 w-11 items-center justify-center rounded-full bg-surface/95"><Heart className={cn("h-5 w-5", fav && "fill-ink")} strokeWidth={1.75} /></button>
            </div>
            {c.images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {c.images.map((_, i) => <button key={i} onClick={() => setPhoto(i)} aria-label={`Фото ${i + 1}`} className={cn("h-2 rounded-full transition-all", i === photo ? "w-5 bg-surface" : "w-2 bg-surface/60")} />)}
                <span className="ml-1 rounded-full bg-graphite/80 px-2 text-[12px] leading-5 text-ivory">{photo + 1} / {c.images.length}</span>
              </div>
            )}
          </div>

          <div className="px-5 pt-5 lg:px-0">
            <h1 className="text-[30px] font-medium leading-tight tracking-[-0.03em] lg:text-[40px]">{c.name}</h1>
            <Rating rating={c.rating} reviews={c.reviews} className="mt-1.5" />
            <div className="mt-2 flex items-center justify-between gap-3 text-[14.5px]">
              <span className="text-ink-2">{c.address} · открыто до {c.openUntil}</span>
              <a href="#location" className="shrink-0 font-medium underline decoration-line-strong underline-offset-4">На карте</a>
            </div>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">{c.about}</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <section id="time" className="mx-5 mt-6 scroll-mt-4 rounded-[22px] border border-line bg-surface p-4 lg:mx-0 lg:mt-0 lg:p-6">
            <h2 className="text-[20px] font-medium tracking-[-0.02em]">Свободное время</h2>
            <button onClick={() => setPick(true)} className="mt-3 flex w-full items-center justify-between rounded-xl bg-surface-2 px-3.5 py-2.5 text-left">
              <span><span className="block text-[12.5px] text-ink-2">Услуга</span><span className="text-[15px] font-medium">{s?.name ?? "Выбрать услугу"}</span></span>
              <span className="text-[15px] font-medium">{s ? fromRub(c.prices[s.id]) : "Изменить"}</span>
            </button>
            <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
              {[0, 1, 2, 3, 4, 5, 6].map((d) => <Chip key={d} active={d === day} onClick={() => setDay(d)} className={cn(!c.slots[d]?.length && "text-ink-3")}>{dayLabel(d)}</Chip>)}
            </div>
            {times.length ? (
              <div className="mt-3 flex flex-wrap gap-2">{times.map((t) => <SlotChip key={t} time={t} onClick={() => navigate(bookUrl({ clinic: c.id, service: sid, day, time: t }))} />)}</div>
            ) : (
              <p className="mt-3 text-[14.5px] text-ink-2">На этот день мест нет.{first && <> Ближайшее: <button className="font-medium text-ink underline underline-offset-4" onClick={() => setDay(first.day)}>{dayLabel(first.day).toLowerCase()} в {first.times[0]}</button></>}</p>
            )}
          </section>

          <section className="px-5 pt-10 lg:px-0">
            <SectionHead title="Услуги и цены" />
            <ul>
              {offered.map((x) => (
                <li key={x.id} className="flex items-center justify-between gap-3 border-b border-line py-3.5">
                  <div className="min-w-0"><p className="text-[15.5px]">{x.name}</p><p className="text-[13px] text-ink-2">{x.duration}</p></div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-[15px] font-medium">{fromRub(c.prices[x.id])}</span>
                    <button onClick={() => { setService(x.id); document.getElementById("time")?.scrollIntoView({ behavior: "smooth" }); }} className={btn({ variant: "secondary", size: "sm" })}>Выбрать</button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="lg:col-span-2">
          {team.length > 0 && (
            <section className="px-5 pt-10 lg:px-0">
              <SectionHead title="Врачи" />
              <div className="grid gap-3 lg:grid-cols-2">{team.map((d) => <DoctorCard key={d.id} d={d} service={sid} showClinic={false} />)}</div>
            </section>
          )}

          {c.reviews > 0 && (
            <section className="px-5 pt-10 lg:px-0">
              <SectionHead title="Отзывы" />
              <div className="flex items-center gap-6 rounded-[22px] border border-line bg-surface p-5">
                <div><p className="text-[44px] font-medium leading-none tracking-[-0.04em]">{c.rating.toFixed(1)}</p><p className="mt-1 text-[13px] text-ink-2">{reviewsWord(c.reviews)}</p></div>
                <div className="flex-1 space-y-1.5">
                  {c.ratingDist.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 text-[12px] text-ink-2"><span className="w-2">{5 - i}</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-graphite" style={{ width: `${p}%` }} /></div></div>
                  ))}
                </div>
              </div>
              <div className="no-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:px-0">
                {reviews.map((r) => (
                  <article key={r.name} className="w-[82%] shrink-0 rounded-[22px] border border-line bg-surface p-4 lg:w-auto">
                    <div className="flex items-center justify-between"><p className="text-[15px] font-medium">{r.name}</p><span className="flex items-center gap-1 text-[13px]"><Star className="h-3.5 w-3.5 fill-ink" strokeWidth={0} />{r.rating}</span></div>
                    <p className="text-[12.5px] text-ink-3">{r.date}</p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{r.text}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section id="location" className="scroll-mt-4 px-5 pt-10 lg:px-0">
            <SectionHead title="Как добраться" />
            <div className="overflow-hidden rounded-[22px] border border-line">
              <MapCanvas items={[c]} selected={c.id} className="aspect-[16/9] lg:aspect-[16/5]" />
              <div className="bg-surface p-4">
                <p className="flex items-center gap-2 text-[15.5px]"><MapPin className="h-4 w-4" strokeWidth={1.75} />{c.address}, Ставрополь</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(`Ставрополь, ${c.address}`)}`} target="_blank" rel="noreferrer" className={btn({ variant: "secondary" })}>Маршрут</a>
                  <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className={btn({ variant: "outline" })}><Phone className="h-4 w-4" />Позвонить</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 backdrop-blur-md lg:hidden">
        <div className="flex h-[76px] items-center justify-between gap-3 px-5">
          <div><p className="text-[17px] font-medium">{fromRub(minPrice)}</p><p className="text-[12.5px] text-ink-2">{s ? "за выбранную услугу" : "минимальная цена"}</p></div>
          <Btn size="lg" onClick={() => navigate(`/booking?clinic=${c.id}`)}>Записаться</Btn>
        </div>
      </div>

      <Drawer open={pick} onOpenChange={setPick}>
        <DrawerContent className="pb-safe max-h-[85svh] rounded-t-[28px] border-0 bg-ivory">
          <div className="overflow-y-auto px-5 pb-6 pt-3">
            <DrawerTitle className="text-[22px] font-medium">Услуга</DrawerTitle>
            <ul className="mt-2">{offered.map((x) => (
              <li key={x.id}><button onClick={() => setService(x.id)} className="flex h-14 w-full items-center justify-between border-b border-line text-left text-[16px]">{x.name}<span className="text-[15px] text-ink-2">{fromRub(c.prices[x.id])}</span></button></li>
            ))}</ul>
          </div>
        </DrawerContent>
      </Drawer>

      {full && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] flex flex-col bg-graphite">
          <div className="flex justify-between p-3 text-ivory"><span className="px-2 py-3 text-[14px]">{photo + 1} / {c.images.length}</span><button onClick={() => setFull(false)} aria-label="Закрыть" className="flex h-11 w-11 items-center justify-center"><X className="h-6 w-6" /></button></div>
          <div className="no-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto" onScroll={(e) => setPhoto(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
            {c.images.map((src, i) => <img key={i} src={src} alt="" loading={i ? "lazy" : "eager"} decoding="async" className="w-full shrink-0 snap-center object-contain" />)}
          </div>
        </div>
      )}
    </MarketShell>
  );
};

export default ClinicPage;
