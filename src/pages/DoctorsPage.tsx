import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import MarketShell from "@/components/market/MarketShell";
import { Chip, DoctorCard } from "@/components/market/parts";
import { doctors } from "@/data/market";

const specs = ["Терапевт", "Хирург", "Ортодонт", "Имплантолог", "Детский", "Гигиенист"];

const DoctorsPage = () => {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") ?? "";
  const spec = sp.get("spec");
  const set = (k: string, v: string | null) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  const list = doctors.filter((d) => (!spec || d.spec === spec || (spec === "Хирург" && d.spec === "Имплантолог")) && (d.name + d.role).toLowerCase().includes(q.toLowerCase()));
  return (
    <MarketShell>
      <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-4 lg:px-10 lg:pt-10">
        <h1 className="text-[32px] font-medium tracking-[-0.035em] lg:text-[48px]">Врачи Ставрополя</h1>
        <label className="mt-4 flex h-[52px] items-center gap-3 rounded-2xl border border-line bg-surface px-4 focus-within:border-ink/40 lg:max-w-xl">
          <Search className="h-[18px] w-[18px] text-ink-3" strokeWidth={1.75} />
          <input value={q} onChange={(e) => set("q", e.target.value)} placeholder="Врач или специальность" aria-label="Врач или специальность" className="h-full flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink-3" />
        </label>
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-3">
          {specs.map((s) => <Chip key={s} active={spec === s} onClick={() => set("spec", spec === s ? null : s)}>{s}</Chip>)}
        </div>
        <div className="mt-1 grid gap-3 lg:grid-cols-2 lg:gap-4">{list.map((d) => <DoctorCard key={d.id} d={d} />)}</div>
        {!list.length && <p className="mt-8 text-[16px] text-ink-2">Никого не нашли. Попробуйте другой запрос.</p>}
      </div>
    </MarketShell>
  );
};

export default DoctorsPage;
