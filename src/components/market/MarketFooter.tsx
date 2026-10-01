import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";

const groups: [string, [string, string][]][] = [
  ["Сервис", [["Стоматологии", "/clinics"], ["Врачи", "/doctors"], ["Мои записи", "/bookings"]]],
  ["Услуги", [["Лечение кариеса", "/services/caries"], ["Чистка", "/services/cleaning"], ["Имплантация", "/services/implant"]]],
  ["Клиникам", [["Подключить клинику", "/for-clinics"]]],
  ["Документы", [["Соглашение", "/for-clinics"], ["Конфиденциальность", "/for-clinics"]]],
];

const MarketFooter = () => (
  <footer className="border-t border-line bg-ivory">
    <div className="mx-auto max-w-[1320px] px-5 py-12 lg:px-10 lg:py-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Wordmark />
          <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ink-2">Стоматологии Ставрополя: цены, врачи и свободное время в одном месте.</p>
        </div>
        {groups.map(([title, links]) => (
          <div key={title}>
            <h4 className="eyebrow mb-3">{title}</h4>
            <ul className="space-y-2.5">
              {links.map(([l, to]) => (
                <li key={l}><Link to={to} className="text-[14.5px] text-ink hover:text-ink-2">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-[13px] text-ink-3">© 2026 дента · Ставрополь. Имеются противопоказания, необходима консультация специалиста.</p>
    </div>
  </footer>
);

export default MarketFooter;
