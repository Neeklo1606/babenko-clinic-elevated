import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import MarketShell, { useShell } from "@/components/market/MarketShell";
import { ClinicCard, DoctorCard, MapCanvas, SectionHead } from "@/components/market/parts";
import { btn } from "@/components/market/Btn";
import { clinics, doctors, problems, services } from "@/data/market";

const intents = ["caries", "canals", "cleaning", "extraction", "implant", "braces", "kids"];

const Hero = () => {
  const { openSearch } = useShell();
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-[1320px] px-5 pb-10 pt-6 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-16 lg:px-10 lg:pb-20 lg:pt-16">
      <div>
        <p className="eyebrow">Стоматологии Ставрополя</p>
        <h1 className="mt-3 text-[36px] font-medium leading-[1.04] tracking-[-0.04em] min-[390px]:text-[38px] lg:text-[72px]">
          Стоматолог рядом.<br /><span className="text-ink-3">Свободно уже сегодня.</span>
        </h1>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-2 lg:text-[18px]">Сравните цены, врачей и отзывы. Запишитесь онлайн за минуту, без звонков.</p>
      </div>
      <div className="mt-7 lg:mt-0">
        <button onClick={() => openSearch()} className="flex h-14 w-full items-center gap-3 rounded-2xl border border-line-strong bg-surface px-4 text-left text-[16px] text-ink-3 transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
          <Search className="h-5 w-5 text-ink" strokeWidth={1.75} />Что беспокоит или какая услуга?
        </button>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
          {intents.map((id) => {
            const s = services.find((x) => x.id === id)!;
            return <button key={id} onClick={() => navigate(`/clinics?service=${id}`)} className="h-10 shrink-0 rounded-full bg-surface-2 px-4 text-[14.5px] hover:bg-ink/10">{s.short}</button>;
          })}
        </div>
        <Link to="/clinics?when=today" className={btn({ variant: "primary", size: "lg", block: true, className: "mt-4" })}>Найти время на сегодня</Link>
        <p className="mt-3 text-[13.5px] text-ink-2"><span className="font-medium text-ink">{clinics.length} клиник</span> · свободное время уже сегодня в {clinics.filter((c) => c.slots[0]?.length).length} из них</p>
      </div>
    </section>
  );
};

const Problems = () => (
  <section className="mx-auto max-w-[1320px] px-5 py-8 lg:px-10 lg:py-14">
    <SectionHead title="С чем обращаются" />
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
      {problems.map((p) => (
        <Link key={p.title} to={`/clinics?service=${p.service}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-surface-2">
          <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-surface/95 p-3">
            <p className="text-[15.5px] font-medium leading-tight">{p.title}</p>
            <p className="text-[13px] text-ink-2">{p.hint}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const Nearby = () => (
  <section className="mx-auto max-w-[1320px] px-5 py-8 lg:px-10 lg:py-14">
    <SectionHead title="Свободно сегодня" action={<Link to="/clinics?when=today" className="flex h-11 items-center gap-1 text-[15px] font-medium">Все<ArrowRight className="h-4 w-4" /></Link>} />
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
      {clinics.filter((c) => c.slots[0]?.length).map((c) => <div key={c.id} className="w-[86%] shrink-0 snap-start lg:w-auto"><ClinicCard c={c} /></div>)}
    </div>
  </section>
);

const MapTeaser = () => (
  <section className="mx-auto max-w-[1320px] px-5 py-8 lg:px-10 lg:py-14">
    <Link to="/clinics?view=map" className="relative block overflow-hidden rounded-[22px] border border-line">
      <MapCanvas items={clinics} className="aspect-[16/11] lg:aspect-[16/6]" />
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 lg:inset-x-auto lg:left-5 lg:w-[380px]">
        <div><p className="text-[16px] font-medium">Клиники на карте</p><p className="text-[13.5px] text-ink-2">Выберите ближайшую к дому или работе</p></div>
        <span className={btn({ variant: "dark", size: "icon" })}><ArrowRight className="h-5 w-5" /></span>
      </div>
    </Link>
  </section>
);

const Doctors = () => (
  <section className="mx-auto max-w-[1320px] px-5 py-8 lg:px-10 lg:py-14">
    <SectionHead title="Врачи с высоким рейтингом" action={<Link to="/doctors" className="flex h-11 items-center gap-1 text-[15px] font-medium">Все<ArrowRight className="h-4 w-4" /></Link>} />
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">{doctors.slice(0, 4).map((d) => <DoctorCard key={d.id} d={d} />)}</div>
  </section>
);

const How = () => (
  <section className="mx-auto max-w-[1320px] px-5 py-10 lg:px-10 lg:py-16">
    <div className="rounded-[28px] bg-graphite p-6 text-ivory lg:p-12">
      <h2 className="text-[28px] font-medium leading-tight tracking-[-0.03em] lg:text-[40px]">Как работает запись</h2>
      <ol className="mt-6 grid gap-5 lg:grid-cols-3 lg:gap-10">
        {[["Опишите проблему", "Или выберите услугу, покажем подходящие клиники."], ["Сравните", "Цены, рейтинг, расстояние и ближайшее время рядом."], ["Запишитесь", "Выберите время, клиника подтвердит запись."]].map(([t, d], i) => (
          <li key={t} className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime text-[15px] font-medium text-ink">{i + 1}</span>
            <div><p className="text-[17px] font-medium">{t}</p><p className="mt-1 text-[14.5px] text-ivory/60">{d}</p></div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const ForClinics = () => (
  <section className="mx-auto max-w-[1320px] px-5 pb-12 lg:px-10 lg:pb-20">
    <div className="flex flex-col gap-4 rounded-[28px] border border-line bg-surface p-6 lg:flex-row lg:items-center lg:justify-between lg:p-10">
      <div><p className="eyebrow">Для стоматологий</p><p className="mt-2 text-[22px] font-medium tracking-[-0.02em] lg:text-[28px]">Новые пациенты без рекламного бюджета</p></div>
      <Link to="/for-clinics" className={btn({ variant: "dark", size: "lg" })}>Подключить клинику</Link>
    </div>
  </section>
);

const Index = () => (
  <MarketShell>
    <Hero /><Problems /><Nearby /><MapTeaser /><Doctors /><How /><ForClinics />
  </MarketShell>
);

export default Index;
