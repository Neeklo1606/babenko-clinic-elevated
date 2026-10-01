import { Link, useParams } from "react-router-dom";
import MarketShell from "@/components/market/MarketShell";
import { ClinicCard, DoctorCard, SectionHead } from "@/components/market/parts";
import { btn } from "@/components/market/Btn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { clinicsForService, dayLabel, doctors, getService, nearest, rub } from "@/data/market";
import NotFound from "./NotFound";

const faq = [
  ["Сколько стоит итоговое лечение?", "Точную цену врач назовёт после осмотра. На сервисе указана стартовая стоимость в каждой клинике."],
  ["Можно ли отменить запись?", "Да, в разделе «Мои записи» в любой момент. Клиника получит уведомление."],
  ["Нужно ли платить онлайн?", "Нет, оплата в клинике после приёма."],
];

const ServicePage = () => {
  const { id } = useParams();
  const s = getService(id);
  if (!s) return <NotFound />;
  const list = clinicsForService(s.id);
  const prices = list.map((c) => c.prices[s.id]);
  const soon = list.map((c) => nearest(c.slots)).filter(Boolean).sort((a, b) => a!.day - b!.day)[0];
  const docs = doctors.filter((d) => d.services.includes(s.id));
  return (
    <MarketShell back title={s.name}>
      <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-2 lg:px-10 lg:pt-10">
        <h1 className="text-[34px] font-medium leading-[1.05] tracking-[-0.04em] lg:text-[56px]">{s.name}<br /><span className="text-ink-3">в Ставрополе</span></h1>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-2">{s.about}</p>
        <dl className="mt-5 grid grid-cols-3 gap-2 lg:max-w-xl">
          {[["Цена", prices.length ? `от ${rub(Math.min(...prices))}` : "уточняется"], ["Клиник", String(list.length)], ["Ближайшее", soon ? `${dayLabel(soon.day)} ${soon.times[0]}` : "—"]].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-surface-2 p-3"><dt className="text-[12px] text-ink-2">{k}</dt><dd className="mt-0.5 text-[14px] font-medium leading-snug">{v}</dd></div>
          ))}
        </dl>
        <Link to={`/clinics?service=${s.id}`} className={btn({ size: "lg", block: true, className: "mt-5 lg:w-auto" })}>Найти время</Link>

        <section className="pt-12"><SectionHead title="Клиники" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{list.slice(0, 3).map((c) => <ClinicCard key={c.id} c={c} service={s.id} />)}</div></section>
        {docs.length > 0 && <section className="pt-12"><SectionHead title="Врачи" /><div className="grid gap-3 lg:grid-cols-2">{docs.map((d) => <DoctorCard key={d.id} d={d} service={s.id} />)}</div></section>}
        <section className="pt-12 lg:max-w-3xl">
          <SectionHead title="Частые вопросы" />
          <Accordion type="single" collapsible>
            {faq.map(([q, a]) => <AccordionItem key={q} value={q} className="border-line"><AccordionTrigger className="text-left text-[16px] font-medium hover:no-underline">{q}</AccordionTrigger><AccordionContent className="text-[15px] text-ink-2">{a}</AccordionContent></AccordionItem>)}
          </Accordion>
        </section>
      </div>
    </MarketShell>
  );
};

export default ServicePage;
