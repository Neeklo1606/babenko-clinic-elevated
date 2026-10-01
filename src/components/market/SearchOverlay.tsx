import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Search, X } from "lucide-react";
import { clinics, doctors, popularSearches, services } from "@/data/market";

interface Props { open: boolean; initial: string; onClose: () => void }

const Row = ({ title, sub, onClick, icon }: { title: string; sub?: string; onClick: () => void; icon?: React.ReactNode }) => (
  <li>
    <button onClick={onClick} className="flex min-h-[56px] w-full items-center gap-3 border-b border-line py-2 text-left active:bg-ink/5">
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px]">{title}</span>
        {sub && <span className="block truncate text-[13.5px] text-ink-2">{sub}</span>}
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3" strokeWidth={1.75} />
    </button>
  </li>
);

const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="mt-6"><h3 className="eyebrow mb-1">{label}</h3><ul>{children}</ul></section>
);

const matchService = (q: string) => {
  const t = q.toLowerCase();
  return services.find((s) => s.name.toLowerCase().includes(t) || s.short.toLowerCase().includes(t) || t.includes(s.short.toLowerCase()))
    ?? (t.includes("болит") ? services[1] : t.includes("чист") ? services[2] : t.includes("удал") ? services[3] : undefined);
};

const SearchOverlay = ({ open, initial, onClose }: Props) => {
  const [q, setQ] = useState(initial);
  const [recent, setRecent] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem("recent-search") || "[]"); } catch { return []; } });
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setQ(initial);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => input.current?.focus(), 60);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; clearTimeout(t); window.removeEventListener("keydown", esc); };
  }, [open, initial, onClose]);

  const term = q.trim().toLowerCase();
  const res = useMemo(() => ({
    s: services.filter((x) => (x.name + x.short + x.category).toLowerCase().includes(term)),
    d: doctors.filter((x) => (x.name + x.role).toLowerCase().includes(term)),
    c: clinics.filter((x) => (x.name + x.address).toLowerCase().includes(term)),
  }), [term]);

  const go = (label: string, to: string) => {
    const next = [label, ...recent.filter((r) => r !== label)].slice(0, 5);
    setRecent(next);
    localStorage.setItem("recent-search", JSON.stringify(next));
    onClose();
    navigate(to);
  };
  const free = (text: string) => {
    const s = matchService(text);
    go(text, s ? `/clinics?service=${s.id}` : "/clinics");
  };

  if (!open) return null;
  const empty = term && !res.s.length && !res.d.length && !res.c.length;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Поиск" className="fixed inset-0 z-[60] overflow-y-auto bg-ivory animate-in fade-in-0 duration-200">
      <div className="sticky top-0 z-10 bg-ivory px-5 pt-2">
        <div className="mx-auto flex h-[60px] max-w-2xl items-center gap-2">
          <button onClick={onClose} aria-label="Назад" className="-ml-2.5 flex h-11 w-11 items-center justify-center rounded-xl hover:bg-ink/5"><ArrowLeft className="h-5 w-5" strokeWidth={1.75} /></button>
          <label className="flex h-12 flex-1 items-center gap-2.5 rounded-2xl border border-line bg-surface px-3.5 focus-within:border-ink/40">
            <Search className="h-[18px] w-[18px] text-ink-3" strokeWidth={1.75} />
            <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && term && free(q)}
              placeholder="Услуга, врач или клиника" aria-label="Поиск" className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink-3" />
            {q && <button onClick={() => setQ("")} aria-label="Очистить" className="-mr-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-ink-2 hover:bg-ink/5"><X className="h-4 w-4" /></button>}
          </label>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-5 pb-16">
        {!term ? (
          <>
            {recent.length > 0 && <Group label="Недавние запросы">{recent.map((r) => <Row key={r} title={r} onClick={() => free(r)} icon={<Clock className="h-[18px] w-[18px] text-ink-3" strokeWidth={1.75} />} />)}</Group>}
            <Group label="Популярное">{popularSearches.map((r) => <Row key={r} title={r} onClick={() => free(r)} />)}</Group>
          </>
        ) : empty ? (
          <p className="mt-10 text-[16px] text-ink-2">Ничего не нашли по запросу «{q}». Попробуйте проще — например, «болит зуб».</p>
        ) : (
          <>
            {res.s.length > 0 && <Group label="Услуги">{res.s.map((s) => <Row key={s.id} title={s.name} sub={`от ${s.from.toLocaleString("ru-RU")} ₽`} onClick={() => go(s.name, `/clinics?service=${s.id}`)} />)}</Group>}
            {res.d.length > 0 && <Group label="Врачи">{res.d.map((d) => <Row key={d.id} title={d.name} sub={d.role} onClick={() => go(d.name, `/doctors/${d.id}`)} />)}</Group>}
            {res.c.length > 0 && <Group label="Клиники">{res.c.map((c) => <Row key={c.id} title={c.name} sub={c.address} onClick={() => go(c.name, `/clinics/${c.id}`)} />)}</Group>}
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SearchOverlay;
