import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import MarketShell from "@/components/market/MarketShell";
import { Btn, btn } from "@/components/market/Btn";
import { dayLong, fromRub, getClinic, getDoctor, getService } from "@/data/market";
import NotFound from "./NotFound";

export interface Booking { id: string; clinic: string; service?: string; doctor?: string; day: number; time: string; name: string; phone: string; created: number }
export const loadBookings = (): Booking[] => { try { return JSON.parse(localStorage.getItem("bookings") || "[]"); } catch { return []; } };

const BookingPage = () => {
  const [sp] = useSearchParams();
  const c = getClinic(sp.get("clinic") ?? undefined);
  const s = getService(sp.get("service"));
  const d = getDoctor(sp.get("doctor") ?? undefined);
  const day = Number(sp.get("day") ?? 0);
  const time = sp.get("time") ?? "";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [err, setErr] = useState<{ name?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  if (!c || !time) return <NotFound />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    const er = { name: name.trim().length < 2 ? "Укажите имя" : undefined, phone: digits.length !== 11 ? "Номер из 11 цифр, например +7 918 123-45-67" : undefined };
    setErr(er);
    if (er.name || er.phone) return;
    setLoading(true);
    setTimeout(() => {
      const b: Booking = { id: crypto.randomUUID(), clinic: c.id, service: s?.id, doctor: d?.id, day, time, name: name.trim(), phone, created: Date.now() };
      localStorage.setItem("bookings", JSON.stringify([b, ...loadBookings()]));
      setLoading(false); setDone(true);
    }, 600);
  };

  const summary = (
    <div className="rounded-[22px] border border-line bg-surface p-4">
      <p className="text-[13px] text-ink-2">{c.name} · {c.address}</p>
      <p className="mt-1 text-[22px] font-medium tracking-[-0.02em]">{dayLong(day)[0].toUpperCase() + dayLong(day).slice(1)}, {time}</p>
      <div className="mt-3 space-y-1 border-t border-line pt-3 text-[14.5px]">
        <p className="flex justify-between"><span className="text-ink-2">Услуга</span><span>{s?.name ?? "Консультация"}</span></p>
        {d && <p className="flex justify-between"><span className="text-ink-2">Врач</span><span>{d.name}</span></p>}
        <p className="flex justify-between"><span className="text-ink-2">Стоимость</span><span className="font-medium">{s ? fromRub(c.prices[s.id]) : "уточняется"}</span></p>
      </div>
    </div>
  );

  if (done) return (
    <MarketShell hideFooter>
      <div className="mx-auto max-w-lg px-5 pb-12 pt-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime"><Check className="h-7 w-7" /></span>
        <h1 className="mt-5 text-[32px] font-medium leading-tight tracking-[-0.035em]">Вы записаны</h1>
        <p className="mt-2 text-[16px] text-ink-2">Клиника подтвердит запись звонком или сообщением на {phone}.</p>
        <div className="mt-6">{summary}</div>
        <div className="mt-6 grid gap-2">
          <Link to="/bookings" className={btn({ variant: "dark", size: "lg" })}>Мои записи</Link>
          <Link to="/" className={btn({ variant: "secondary", size: "lg" })}>На главную</Link>
        </div>
      </div>
    </MarketShell>
  );

  return (
    <MarketShell back title="Запись" hideNav hideFooter>
      <form onSubmit={submit} noValidate className="mx-auto max-w-lg px-5 pb-[calc(110px+env(safe-area-inset-bottom))] pt-2">
        {summary}
        <h2 className="mt-8 text-[20px] font-medium">Ваши данные</h2>
        {([["name", "Имя", name, setName, "text", "given-name"], ["phone", "Телефон", phone, setPhone, "tel", "tel"]] as const).map(([k, l, v, fn, type, ac]) => (
          <label key={k} className="mt-4 block">
            <span className="text-[14px] text-ink-2">{l}</span>
            <input type={type} autoComplete={ac} inputMode={type === "tel" ? "tel" : undefined} value={v} onChange={(e) => fn(e.target.value)} aria-invalid={!!err[k]}
              className="mt-1.5 h-14 w-full rounded-2xl border border-line-strong bg-surface px-4 text-[16px] outline-none focus:border-ink/50 aria-[invalid=true]:border-destructive" />
            {err[k] && <span className="mt-1 block text-[13px] text-destructive">{err[k]}</span>}
          </label>
        ))}
        <p className="mt-4 text-[12.5px] text-ink-3">Нажимая «Подтвердить», вы соглашаетесь на обработку персональных данных. Оплата — в клинике после приёма.</p>
        <div className="pb-safe fixed inset-x-0 bottom-0 border-t border-line bg-ivory/95 px-5 py-3 backdrop-blur-md">
          <div className="mx-auto max-w-lg"><Btn type="submit" size="lg" block loading={loading}>Подтвердить запись</Btn></div>
        </div>
      </form>
    </MarketShell>
  );
};

export default BookingPage;
