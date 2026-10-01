import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowUpDown, ChevronDown, List, Map as MapIcon, Pencil, SlidersHorizontal, X } from "lucide-react";
import MarketShell, { useShell } from "@/components/market/MarketShell";
import { Chip, ClinicCard, MapCanvas, Photo, Rating, bookUrl } from "@/components/market/parts";
import { Btn, btn } from "@/components/market/Btn";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Clinic, clinics, dayLabel, getService, nearest, services } from "@/data/market";
import { cn } from "@/lib/utils";

const sorts = [["rec", "По рекомендации"], ["near", "Ближе"], ["rating", "По рейтингу"], ["cheap", "Сначала дешевле"], ["soon", "Раньше свободное время"]] as const;
const priceSteps = [3000, 5000, 7000, 10000, 50000];

const useFilters = () => {
  const [sp, setSp] = useSearchParams();
  const get = (k: string) => sp.get(k);
  const set = (patch: Record<string, string | null>) => {
    const n = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => (v === null || v === "" ? n.delete(k) : n.set(k, v)));
    setSp(n, { replace: true });
  };
  return { get, set, sp };
};

const apply = (list: Clinic[], f: (k: string) => string | null) => {
  const service = f("service"), when = f("when"), max = Number(f("max") || 0), min = Number(f("rating") || 0), district = f("district");
  let r = list.filter((c) => {
    if (service && !c.prices[service]) return false;
    if (when === "today" && !c.slots[0]?.length) return false;
    if (when === "tomorrow" && !c.slots[1]?.length) return false;
    if (max) { const p = service ? c.prices[service] : Math.min(...Object.values(c.prices)); if (p > max) return false; }
    if (min && c.rating < min) return false;
    if (district && c.district !== district) return false;
    if (f("kids") && !c.kids) return false;
    if (f("near") && c.distanceKm > 3) return false;
    return true;
  });
  const price = (c: Clinic) => (service ? c.prices[service] : Math.min(...Object.values(c.prices)));
  const soon = (c: Clinic) => { const n = nearest(c.slots); return n ? n.day * 100 + parseInt(n.times[0]) : 9999; };
  const s = f("sort") || "rec";
  r = [...r].sort((a, b) => s === "near" ? a.distanceKm - b.distanceKm : s === "rating" ? b.rating - a.rating : s === "cheap" ? price(a) - price(b) : s === "soon" ? soon(a) - soon(b) : b.rating * b.reviews - a.rating * a.reviews);
  return r;
};

const plural = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "клиника" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "клиники" : "клиник");

const Content = () => {
  const { get, set } = useFilters();
  const { openSearch, city } = useShell();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<null | "more" | "sort" | "price">(null);
  const [draft, setDraft] = useState<Record<string, string | null>>({});
  const [selected, setSelected] = useState<string>();
  const service = getService(get("service"));
  const view = get("view") === "map" ? "map" : "list";
  const result = useMemo(() => apply(clinics, get), [get]);
  const draftCount = apply(clinics, (k) => (k in draft ? draft[k] : get(k))).length;
  const sortLabel = sorts.find(([k]) => k === (get("sort") || "rec"))![1];
  const max = get("max");

  const openMore = () => { setDraft({}); setSheet("more"); };
  const dv = (k: string) => (k in draft ? draft[k] : get(k));
  const toggleDraft = (k: string, v: string) => setDraft((d) => ({ ...d, [k]: dv(k) === v ? null : v }));
  const sel = result.find((c) => c.id === selected) ?? result[0];

  return (
    <>
      <div className="sticky top-[60px] z-30 bg-ivory lg:top-[72px]">
        <div className="mx-auto max-w-[1320px] px-5 lg:px-10">
          <button onClick={() => openSearch(service?.name ?? "")} className="flex h-[52px] w-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 text-left">
            <span className="min-w-0"><span className="block truncate text-[15.5px] font-medium">{service?.name ?? "Все услуги"}</span><span className="block text-[12.5px] text-ink-2">{city}</span></span>
            <Pencil className="h-4 w-4 shrink-0 text-ink-2" strokeWidth={1.75} />
          </button>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-3">
            <Chip active={get("when") === "today"} onClick={() => set({ when: get("when") === "today" ? null : "today" })}>Сегодня</Chip>
            <Chip active={!!get("near")} onClick={() => set({ near: get("near") ? null : "1" })}>Рядом</Chip>
            <Chip active={!!max} onClick={() => setSheet("price")}>{max ? `Цена · до ${Number(max).toLocaleString("ru-RU")} ₽` : "Цена"}<ChevronDown className="h-4 w-4" /></Chip>
            <Chip active={!!get("rating")} onClick={() => set({ rating: get("rating") ? null : "4.8" })}>Рейтинг 4.8+</Chip>
            <Chip active={!!(get("district") || get("kids"))} onClick={openMore}><SlidersHorizontal className="h-4 w-4" />Ещё</Chip>
          </div>
        </div>
      </div>

      {view === "list" ? (
        <div className="mx-auto max-w-[1320px] px-5 pb-24 lg:px-10 lg:pb-16">
          <div className="flex h-10 items-center justify-between">
            <p className="text-[14px] text-ink-2">{result.length} {plural(result.length)}</p>
            <button onClick={() => setSheet("sort")} className="flex h-10 items-center gap-1.5 text-[14px] font-medium"><ArrowUpDown className="h-4 w-4" />{sortLabel}</button>
          </div>
          {result.length ? (
            <div className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">{result.map((c) => <ClinicCard key={c.id} c={c} service={service?.id} />)}</div>
          ) : (
            <div className="mt-10 rounded-[22px] border border-line bg-surface p-6 text-center">
              <p className="text-[17px] font-medium">Под фильтры ничего не подошло</p>
              <p className="mt-1 text-[14.5px] text-ink-2">Попробуйте убрать часть условий.</p>
              <Btn variant="dark" className="mt-4" onClick={() => navigate(`/clinics${service ? `?service=${service.id}` : ""}`, { replace: true })}>Сбросить фильтры</Btn>
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-[calc(100svh-60px-124px-64px)] lg:mx-10 lg:mb-10 lg:h-[640px] lg:overflow-hidden lg:rounded-[22px]">
          <MapCanvas items={result} selected={sel?.id} onSelect={setSelected} className="absolute inset-0" />
          {sel && (
            <div className="absolute inset-x-0 bottom-16 lg:bottom-5">
              <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5"
                onScroll={(e) => { const el = e.currentTarget; const i = Math.round(el.scrollLeft / (el.clientWidth * 0.86)); if (result[i] && result[i].id !== sel.id) setSelected(result[i].id); }}>
                {result.map((c) => {
                  const n = nearest(c.slots);
                  return (
                    <Link key={c.id} to={`/clinics/${c.id}${service ? `?service=${service.id}` : ""}`} className={cn("flex w-[86%] max-w-[360px] shrink-0 snap-center gap-3 rounded-[20px] bg-surface p-3 shadow-float", c.id === sel.id && "ring-2 ring-graphite")}>
                      <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl"><Photo src={c.images[0]} alt={c.name} /></div>
                      <div className="min-w-0">
                        <p className="truncate text-[16px] font-medium">{c.name}</p>
                        <Rating rating={c.rating} reviews={c.reviews} className="text-[13px]" />
                        <p className="text-[13px] text-ink-2">{c.distanceKm.toString().replace(".", ",")} км · {n ? `${dayLabel(n.day)} ${n.times[0]}` : "нет записи"}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <button onClick={() => set({ view: view === "map" ? null : "map" })}
        className={cn("fixed left-1/2 z-30 flex h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-graphite px-5 text-[15px] font-medium text-ivory shadow-float", view === "map" ? "top-[196px] lg:top-[210px]" : "bottom-[calc(64px+env(safe-area-inset-bottom)+16px)] lg:bottom-8")}>
        {view === "map" ? <><List className="h-4 w-4" />Список</> : <><MapIcon className="h-4 w-4" />Карта</>}
      </button>

      <Drawer open={sheet === "sort"} onOpenChange={(o) => !o && setSheet(null)}>
        <DrawerContent className="pb-safe rounded-t-[28px] border-0 bg-ivory">
          <div className="px-5 pb-6 pt-3">
            <DrawerTitle className="text-[22px] font-medium">Сортировка</DrawerTitle>
            <ul className="mt-2">{sorts.map(([k, l]) => (
              <li key={k}><button onClick={() => { set({ sort: k === "rec" ? null : k }); setSheet(null); }} className="flex h-14 w-full items-center justify-between border-b border-line text-left text-[16px]">{l}{(get("sort") || "rec") === k && <span className="h-2.5 w-2.5 rounded-full bg-graphite" />}</button></li>
            ))}</ul>
            <p className="mt-3 text-[12.5px] text-ink-3">«По рекомендации» — сочетание рейтинга и количества отзывов. Клиники не платят за место в списке.</p>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={sheet === "price"} onOpenChange={(o) => !o && setSheet(null)}>
        <DrawerContent className="pb-safe rounded-t-[28px] border-0 bg-ivory">
          <div className="px-5 pb-6 pt-3">
            <DrawerTitle className="text-[22px] font-medium">Цена{service ? ` · ${service.name}` : ""}</DrawerTitle>
            <div className="mt-4 flex flex-wrap gap-2">
              {priceSteps.map((p) => <Chip key={p} active={max === String(p)} onClick={() => { set({ max: max === String(p) ? null : String(p) }); setSheet(null); }}>до {p.toLocaleString("ru-RU")} ₽</Chip>)}
            </div>
            {max && <Btn variant="ghost" className="mt-4 -ml-3" onClick={() => { set({ max: null }); setSheet(null); }}><X className="h-4 w-4" />Убрать</Btn>}
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={sheet === "more"} onOpenChange={(o) => !o && setSheet(null)}>
        <DrawerContent className="max-h-[90svh] rounded-t-[28px] border-0 bg-ivory">
          <div className="overflow-y-auto px-5 pb-4 pt-3">
            <DrawerTitle className="text-[22px] font-medium">Фильтры</DrawerTitle>
            {([
              ["Когда", "when", [["today", "Сегодня"], ["tomorrow", "Завтра"]]],
              ["Рейтинг", "rating", [["4.5", "4.5+"], ["4.8", "4.8+"]]],
              ["Район", "district", [["Центр", "Центр"], ["Юго-Запад", "Юго-Запад"], ["Северо-Запад", "Северо-Запад"]]],
              ["Услуга", "service", services.map((s) => [s.id, s.short])],
            ] as [string, string, string[][]][]).map(([title, k, opts]) => (
              <section key={k} className="mt-6">
                <h3 className="eyebrow mb-2.5">{title}</h3>
                <div className="flex flex-wrap gap-2">{opts.map(([v, l]) => <Chip key={v} active={dv(k) === v} onClick={() => toggleDraft(k, v)}>{l}</Chip>)}</div>
              </section>
            ))}
            <section className="mt-6">
              <h3 className="eyebrow mb-2.5">Дополнительно</h3>
              <Chip active={!!dv("kids")} onClick={() => toggleDraft("kids", "1")}>Детский приём</Chip>
            </section>
          </div>
          <div className="pb-safe grid grid-cols-[auto_1fr] gap-2 border-t border-line bg-ivory px-5 py-3">
            <Btn variant="secondary" size="lg" onClick={() => setDraft({ when: null, rating: null, district: null, kids: null, max: null, near: null })}>Сбросить</Btn>
            <Btn variant="primary" size="lg" disabled={!draftCount} onClick={() => { set(draft); setSheet(null); }}>{draftCount ? `Показать ${draftCount} ${plural(draftCount)}` : "Нет клиник"}</Btn>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const ClinicsPage = () => (
  <MarketShell back title="Стоматологии" hideFooter right={<></>}>
    <Content />
  </MarketShell>
);

export default ClinicsPage;
