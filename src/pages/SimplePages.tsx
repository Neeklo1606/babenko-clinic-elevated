import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import MarketShell from "@/components/market/MarketShell";
import { Btn, btn } from "@/components/market/Btn";
import { dayLong, getClinic, getService } from "@/data/market";
import { loadBookings } from "./BookingPage";

export const BookingsPage = () => {
  const [list, setList] = useState(loadBookings);
  const cancel = (id: string) => { const n = list.filter((b) => b.id !== id); setList(n); localStorage.setItem("bookings", JSON.stringify(n)); };
  return (
    <MarketShell>
      <div className="mx-auto max-w-2xl px-5 pb-12 pt-4 lg:pt-10">
        <h1 className="text-[32px] font-medium tracking-[-0.035em]">Мои записи</h1>
        {list.length ? (
          <ul className="mt-5 space-y-3">{list.map((b) => { const c = getClinic(b.clinic); return (
            <li key={b.id} className="rounded-[22px] border border-line bg-surface p-4">
              <p className="text-[20px] font-medium">{dayLong(b.day)}, {b.time}</p>
              <p className="mt-1 text-[14.5px] text-ink-2">{getService(b.service)?.name ?? "Консультация"} · {c?.name}, {c?.address}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/clinics/${b.clinic}`} className={btn({ variant: "secondary", size: "sm" })}>О клинике</Link>
                <Btn variant="ghost" size="sm" onClick={() => cancel(b.id)}>Отменить</Btn>
              </div>
            </li>); })}</ul>
        ) : (
          <div className="mt-8 rounded-[22px] border border-line bg-surface p-6 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-ink-3" strokeWidth={1.5} />
            <p className="mt-3 text-[17px] font-medium">Пока нет записей</p>
            <p className="mt-1 text-[14.5px] text-ink-2">Найдите стоматолога и выберите удобное время.</p>
            <Link to="/clinics" className={btn({ className: "mt-4" })}>Найти клинику</Link>
          </div>
        )}
      </div>
    </MarketShell>
  );
};

export const ProfilePage = () => (
  <MarketShell>
    <div className="mx-auto max-w-2xl px-5 pb-12 pt-4 lg:pt-10">
      <h1 className="text-[32px] font-medium tracking-[-0.035em]">Профиль</h1>
      <p className="mt-2 text-[16px] text-ink-2">Вход по номеру телефона появится скоро. Записи уже сохраняются на этом устройстве.</p>
      <ul className="mt-6">{[["/bookings", "Мои записи"], ["/doctors", "Врачи"], ["/for-clinics", "Для клиник"]].map(([to, l]) => (
        <li key={to}><Link to={to} className="flex h-14 items-center border-b border-line text-[17px]">{l}</Link></li>
      ))}</ul>
    </div>
  </MarketShell>
);

export const ForClinicsPage = () => (
  <MarketShell back title="Для клиник">
    <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-4 lg:px-10 lg:pt-12">
      <h1 className="max-w-3xl text-[36px] font-medium leading-[1.05] tracking-[-0.04em] lg:text-[60px]">Пациенты Ставрополя записываются к вам сами</h1>
      <p className="mt-4 max-w-xl text-[16px] text-ink-2">Покажите цены, врачей и свободное время. Оплата только за пришедших пациентов.</p>
      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {[["0 ₽", "за подключение"], ["24/7", "онлайн-запись без администратора"], ["1 день", "на запуск карточки клиники"]].map(([v, l]) => (
          <div key={l} className="rounded-[22px] border border-line bg-surface p-5"><p className="text-[36px] font-medium tracking-[-0.04em]">{v}</p><p className="text-[14.5px] text-ink-2">{l}</p></div>
        ))}
      </div>
      <a href="mailto:clinics@denta.ru?subject=Подключение клиники" className={btn({ variant: "dark", size: "lg", className: "mt-8" })}>Оставить заявку</a>
    </div>
  </MarketShell>
);
