import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Clock, UserRound, X } from "lucide-react";
import MarketShell from "@/components/market/MarketShell";
import { Btn, btn } from "@/components/market/Btn";
import { dayLabel, dayLong, doctors, fromRub, getClinic, getDoctor, getService, services } from "@/data/market";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

export interface Booking { id: string; clinic: string; service?: string; doctor?: string; day: number; time: string; name: string; phone: string; created: number }
export const loadBookings = (): Booking[] => { try { return JSON.parse(localStorage.getItem("bookings") || "[]"); } catch { return []; } };

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const STEPS = ["Услуга", "Время", "Данные"];

const BookingPage = () => {
  const [sp, setSp] = useSearchParams();
  const navigate = useNavigate();
  const c = getClinic(sp.get("clinic") ?? undefined);
  const s = getService(sp.get("service"));
  const d = getDoctor(sp.get("doctor") ?? undefined);
  const dayParam = sp.get("day");
  const time = sp.get("time") ?? "";
  const mode = sp.get("mode") === "doctor" || d ? "doctor" : "time";

  const [step, setStep] = useState(() => (time ? 2 : s ? 1 : 0));
  const [selDay, setSelDay] = useState<number | null>(dayParam ? Number(dayParam) : null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [err, setErr] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (patch: Record<string, string | null>) => {
    const n = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => (v == null ? n.delete(k) : n.set(k, v)));
    setSp(n, { replace: true });
  };

  const clinicServices = useMemo(() => (c ? services.filter((x) => c.prices[x.id]) : []), [c]);
  const clinicDoctors = useMemo(() => (c ? doctors.filter((x) => x.clinicId === c.id && (!s || x.services.includes(s.id))) : []), [c, s]);
  if (!c) return <NotFound />;

  const slots = mode === "doctor" && d ? d.slots : c.slots;
  const days = Object.keys(slots).map(Number).filter((k) => slots[k]?.length).sort((a, b) => a - b);
  const activeDay = selDay != null && days.includes(selDay) ? selDay : days[0];

  const back = () => (step > 0 && !(step === 1 && !s) ? setStep(step - 1) : navigate(-1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    const er = { name: name.trim().length < 2 ? "Укажите имя" : undefined, phone: digits.length !== 11 ? "Номер из 11 цифр, например +7 918 123-45-67" : undefined };
    setErr(er);
    if (er.name || er.phone) return;
    setLoading(true);
    setTimeout(() => {
      const b: Booking = { id: crypto.randomUUID(), clinic: c.id, service: s?.id, doctor: d?.id, day: Number(dayParam ?? 0), time, name: name.trim(), phone, created: Date.now() };
      localStorage.setItem("bookings", JSON.stringify([b, ...loadBookings()]));
      setLoading(false); setDone(true);
    }, 600);
  };

  const summary = (
    <div className="rounded-[22px] border border-line bg-surface p-5">
      <p className="text-[13px] text-ink-3">{c.name} · {c.address}</p>
      <p className="mt-1.5 text-[24px] font-medium leading-tight tracking-[-0.025em]">{cap(dayLong(Number(dayParam ?? 0)))}, {time}</p>
      <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[14.5px]">
        <div className="flex justify-between gap-4"><dt className="text-ink-2">Услуга</dt><dd className="text-right">{s?.name ?? "Консультация"}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-ink-2">Врач</dt><dd className="text-right">{d?.name ?? "Любой свободный"}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-ink-2">Стоимость</dt><dd className="text-right font-medium">{s ? fromRub(c.prices[s.id]) : "Уточняется"}</dd></div>
      </dl>
    </div>
  );

  if (done) return (
    <MarketShell hideFooter>
      <div className="mx-auto max-w-lg animate-fade-in px-5 pb-12 pt-10">
        <span className="flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-lime"><Check className="h-8 w-8" strokeWidth={2.25} /></span>
        <h1 className="mt-6 text-[34px] font-medium leading-[1.05] tracking-[-0.04em]">Вы записаны</h1>
        <p className="mt-2 text-[16px] leading-relaxed text-ink-2">Клиника подтвердит запись звонком или сообщением на {phone}.</p>
        <div className="mt-7">{summary}</div>
        <div className="mt-6 grid gap-2">
          <Link to="/bookings" className={btn({ variant: "dark", size: "lg" })}>Мои записи</Link>
          <Link to="/" className={btn({ variant: "secondary", size: "lg" })}>На главную</Link>
        </div>
      </div>
    </MarketShell>
  );

  const chip = (active: boolean) => cn(
    "flex h-12 items-center justify-center rounded-2xl border text-[15px] font-medium tabular-nums transition-all duration-200 active:scale-[0.97]",
    active ? "border-graphite bg-graphite text-ivory" : "border-line-strong bg-surface hover:border-ink/40",
  );

  return (
    <MarketShell noHeader hideNav hideFooter>
      <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto grid h-[58px] max-w-lg grid-cols-[44px_1fr_44px] items-center px-3">
          <button onClick={back} aria-label="Назад" className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-ink/5"><ArrowLeft className="h-5 w-5" strokeWidth={1.75} /></button>
          <div className="text-center"><p className="text-[16px] font-medium leading-tight">{c.name}</p><p className="text-[12px] text-ink-3">Шаг {step + 1} из 3 · {STEPS[step]}</p></div>
          <Link to={`/clinics/${c.id}`} aria-label="Закрыть" className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors hover:bg-ink/5"><X className="h-5 w-5" strokeWidth={1.75} /></Link>
        </div>
        <div className="mx-auto grid max-w-lg grid-cols-3 gap-1.5 px-5 pb-2">
          {STEPS.map((_, i) => <div key={i} className="h-[3px] overflow-hidden rounded-full bg-line"><div className={cn("h-full rounded-full bg-graphite transition-all duration-500 ease-out", i <= step ? "w-full" : "w-0")} /></div>)}
        </div>
      </header>

      <div key={step} className="mx-auto max-w-lg animate-fade-in px-5 pb-[calc(120px+env(safe-area-inset-bottom))] pt-6">
        {step === 0 && (
          <>
            <h1 className="text-[28px] font-medium leading-[1.1] tracking-[-0.035em]">Что нужно сделать?</h1>
            <p className="mt-2 text-[15px] text-ink-2">Цены клиники, итог врач назовёт до начала лечения.</p>
            <div className="mt-6 divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-surface">
              {clinicServices.map((x) => (
                <button key={x.id} onClick={() => { set({ service: x.id }); setStep(time ? 2 : 1); }}
                  className={cn("flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-ink/[0.03]", s?.id === x.id && "bg-lime/25")}>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-medium">{x.name}</span>
                    <span className="mt-0.5 block text-[13px] text-ink-3">{x.category} · {x.duration}</span>
                  </span>
                  <span className="shrink-0 text-[14.5px] font-medium tabular-nums">{fromRub(c.prices[x.id])}</span>
                </button>
              ))}
              <button onClick={() => { set({ service: null }); setStep(time ? 2 : 1); }} className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-ink/[0.03]">
                <span><span className="block text-[16px] font-medium">Не знаю, нужна консультация</span><span className="mt-0.5 block text-[13px] text-ink-3">Врач осмотрит и составит план</span></span>
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-[28px] font-medium leading-[1.1] tracking-[-0.035em]">Когда удобно?</h1>
            <p className="mt-2 text-[15px] text-ink-2">{s ? `${s.name} · ${fromRub(c.prices[s.id])}` : "Консультация"}</p>

            <div role="tablist" className="relative mt-6 grid grid-cols-2 rounded-2xl bg-ink/[0.05] p-1">
              <span aria-hidden className={cn("absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-xl bg-surface shadow-sm transition-transform duration-300 ease-out", mode === "doctor" && "translate-x-full")} />
              {([["time", "По времени", Clock], ["doctor", "По врачу", UserRound]] as const).map(([k, l, I]) => (
                <button key={k} role="tab" aria-selected={mode === k} onClick={() => set({ mode: k, doctor: k === "time" ? null : clinicDoctors[0]?.id ?? null, time: null })}
                  className={cn("relative z-10 flex h-11 items-center justify-center gap-2 text-[15px] font-medium transition-colors", mode === k ? "text-ink" : "text-ink-3")}>
                  <I className="h-4 w-4" strokeWidth={1.75} />{l}
                </button>
              ))}
            </div>

            {mode === "doctor" && (
              clinicDoctors.length ? (
                <div className="mt-5 space-y-2">
                  {clinicDoctors.map((x) => (
                    <button key={x.id} onClick={() => set({ doctor: x.id, time: null })}
                      className={cn("flex w-full items-center gap-3 rounded-[20px] border p-3 text-left transition-all duration-200", d?.id === x.id ? "border-graphite bg-surface" : "border-line bg-surface/60 hover:border-ink/30")}>
                      <img src={x.image} alt="" loading="lazy" className="h-14 w-14 rounded-2xl object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15.5px] font-medium">{x.name}</span>
                        <span className="block text-[13px] text-ink-3">{x.role} · {x.years} лет опыта</span>
                      </span>
                      <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors", d?.id === x.id ? "border-graphite bg-graphite text-ivory" : "border-line-strong")}>{d?.id === x.id && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}</span>
                    </button>
                  ))}
                </div>
              ) : <p className="mt-5 rounded-[20px] border border-line bg-surface p-4 text-[14.5px] text-ink-2">Врачи этой клиники пока не добавлены. Выберите время, администратор подберёт специалиста.</p>
            )}

            {days.length ? (
              <>
                <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
                  {days.map((k) => (
                    <button key={k} onClick={() => { setSelDay(k); set({ time: null }); }}
                      className={cn("flex h-[64px] min-w-[76px] shrink-0 flex-col items-center justify-center rounded-2xl border transition-all duration-200 active:scale-[0.97]", activeDay === k ? "border-graphite bg-graphite text-ivory" : "border-line-strong bg-surface")}>
                      <span className="text-[15px] font-medium">{dayLabel(k)}</span>
                      <span className={cn("text-[12px]", activeDay === k ? "text-ivory/70" : "text-ink-3")}>{slots[k].length} {slots[k].length === 1 ? "окно" : slots[k].length < 5 ? "окна" : "окон"}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {slots[activeDay].map((t) => (
                    <button key={t} onClick={() => set({ day: String(activeDay), time: t })} className={chip(time === t && dayParam === String(activeDay))}>{t}</button>
                  ))}
                </div>
              </>
            ) : <p className="mt-6 text-[14.5px] text-ink-2">Свободного времени нет. Позвоните в клинику: <a className="font-medium underline" href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{c.phone}</a></p>}
          </>
        )}

        {step === 2 && (
          <form id="bk" onSubmit={submit} noValidate>
            {summary}
            <h2 className="mt-8 text-[22px] font-medium tracking-[-0.02em]">Ваши данные</h2>
            {([["name", "Имя", name, setName, "text", "given-name"], ["phone", "Телефон", phone, setPhone, "tel", "tel"]] as const).map(([k, l, v, fn, type, ac]) => (
              <label key={k} className="mt-4 block">
                <span className="text-[14px] text-ink-2">{l}</span>
                <input type={type} autoComplete={ac} inputMode={type === "tel" ? "tel" : undefined} value={v} onChange={(e) => fn(e.target.value)} aria-invalid={!!err[k]}
                  className="mt-1.5 h-14 w-full rounded-2xl border border-line-strong bg-surface px-4 text-[16px] outline-none transition-colors focus:border-graphite aria-[invalid=true]:border-destructive" />
                {err[k] && <span className="mt-1.5 block text-[13px] text-destructive">{err[k]}</span>}
              </label>
            ))}
            <p className="mt-5 text-[12.5px] leading-relaxed text-ink-3">Нажимая «Подтвердить», вы соглашаетесь на обработку персональных данных. Оплата в клинике после приёма.</p>
          </form>
        )}
      </div>

      {step > 0 && (
        <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/90 px-5 py-3 backdrop-blur-md">
          <div className="mx-auto max-w-lg">
            {step === 1
              ? <Btn size="lg" block disabled={!time} onClick={() => setStep(2)}>{time ? `Продолжить · ${dayLabel(Number(dayParam))}, ${time}` : "Выберите время"}</Btn>
              : <Btn type="submit" form="bk" size="lg" block loading={loading}>Подтвердить запись</Btn>}
          </div>
        </div>
      )}
    </MarketShell>
  );
};

export default BookingPage;
