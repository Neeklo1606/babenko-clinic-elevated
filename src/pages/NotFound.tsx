import { Link } from "react-router-dom";
import MarketShell from "@/components/market/MarketShell";
import { btn } from "@/components/market/Btn";

const NotFound = () => (
  <MarketShell>
    <div className="mx-auto max-w-lg px-5 py-20 text-center">
      <p className="text-[64px] font-medium tracking-[-0.05em]">404</p>
      <p className="mt-2 text-[16px] text-ink-2">Такой страницы нет. Возможно, клиника изменила адрес.</p>
      <Link to="/clinics" className={btn({ className: "mt-6" })}>Все стоматологии</Link>
    </div>
  </MarketShell>
);

export default NotFound;
