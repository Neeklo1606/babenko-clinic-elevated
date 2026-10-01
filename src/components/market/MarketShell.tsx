import { createContext, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, ChevronDown, Menu, MapPin, Search, Stethoscope, User, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import Wordmark from "./Wordmark";
import SearchOverlay from "./SearchOverlay";
import MarketFooter from "./MarketFooter";
import { Btn } from "./Btn";
import { CITY } from "@/data/market";
import { cn } from "@/lib/utils";

interface ShellCtx { openSearch: (q?: string) => void; openCity: () => void; city: string }
const Ctx = createContext<ShellCtx>({ openSearch: () => {}, openCity: () => {}, city: CITY });
export const useShell = () => useContext(Ctx);

const cities = ["Ставрополь", "Михайловск"];
const nav = [
  { to: "/", label: "Поиск", icon: Search, end: true },
  { to: "/clinics", label: "Клиники", icon: Stethoscope },
  { to: "/bookings", label: "Записи", icon: CalendarDays },
  { to: "/profile", label: "Профиль", icon: User },
];
const deskNav = [["/clinics", "Стоматологии"], ["/doctors", "Врачи"], ["/bookings", "Мои записи"], ["/for-clinics", "Для клиник"]];

interface Props { children: React.ReactNode; title?: string; back?: boolean; right?: React.ReactNode; hideNav?: boolean; hideFooter?: boolean; transparentHeader?: boolean; noHeader?: boolean }

const MarketShell = ({ children, title, back, right, hideNav, hideFooter, noHeader }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState<{ open: boolean; q: string }>({ open: false, q: "" });
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [city, setCity] = useState(CITY);
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const ctx: ShellCtx = { openSearch: (q = "") => setSearch({ open: true, q }), openCity: () => setCityOpen(true), city };

  return (
    <Ctx.Provider value={ctx}>
      <div className="min-h-screen bg-ivory text-ink">
        {!noHeader && (
          <header className={cn("sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200", scrolled ? "border-line bg-ivory/95 backdrop-blur-md" : "border-transparent bg-ivory")}>
            <div className="mx-auto flex h-[60px] max-w-[1320px] items-center justify-between gap-2 px-5 lg:h-[72px] lg:px-10">
              {back ? (
                <div className="flex min-w-0 items-center gap-1">
                  <Btn variant="ghost" size="icon" aria-label="Назад" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))} className="-ml-2.5"><ArrowLeft className="h-5 w-5" strokeWidth={1.75} /></Btn>
                  <span className="truncate text-[17px] font-medium tracking-[-0.01em]">{title}</span>
                </div>
              ) : <Wordmark />}

              <nav className="hidden items-center gap-1 lg:flex">
                {deskNav.map(([to, l]) => (
                  <NavLink key={to} to={to} className={({ isActive }) => cn("rounded-xl px-3.5 py-2 text-[15px] transition-colors", isActive ? "bg-surface-2 text-ink" : "text-ink-2 hover:text-ink")}>{l}</NavLink>
                ))}
              </nav>

              <div className="flex shrink-0 items-center gap-1">
                {right ?? (back ? null : (
                  <>
                    <button onClick={() => setCityOpen(true)} className="flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-[15px] font-medium hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40">
                      <MapPin className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.75} />{city}<ChevronDown className="h-4 w-4 text-ink-3" strokeWidth={1.75} />
                    </button>
                    <Btn variant="ghost" size="icon" aria-label="Меню" className="-mr-2.5 lg:hidden" onClick={() => setMenuOpen(true)}><Menu className="h-5 w-5" strokeWidth={1.75} /></Btn>
                  </>
                ))}
                <Link to="/profile" aria-label="Профиль" className="ml-1 hidden h-11 w-11 items-center justify-center rounded-xl bg-surface-2 hover:bg-ink/10 lg:flex"><User className="h-5 w-5" strokeWidth={1.75} /></Link>
              </div>
            </div>
          </header>
        )}

        <main key={useLocation().pathname} className={cn("animate-page",!hideNav && "pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0")}>{children}</main>
        {!hideFooter && <MarketFooter />}

        {!hideNav && (
          <nav aria-label="Основная навигация" className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 backdrop-blur-md lg:hidden">
            <ul className="mx-auto grid h-[64px] max-w-md grid-cols-4 px-2">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.end} className="flex h-full flex-col items-center justify-center gap-1 text-[11.5px] font-medium">
                    {({ isActive }) => (
                      <>
                        <span className={cn("flex h-7 w-12 items-center justify-center rounded-full transition-colors", isActive ? "bg-graphite text-lime" : "text-ink-3")}><n.icon className="h-[19px] w-[19px]" strokeWidth={1.75} /></span>
                        <span className={isActive ? "text-ink" : "text-ink-3"}>{n.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <SearchOverlay open={search.open} initial={search.q} onClose={() => setSearch({ open: false, q: "" })} />

        <Drawer open={cityOpen} onOpenChange={setCityOpen}>
          <DrawerContent className="pb-safe rounded-t-[28px] border-0 bg-ivory">
            <div className="px-5 pb-6 pt-3">
              <DrawerTitle className="text-[24px] font-medium tracking-[-0.02em]">Город</DrawerTitle>
              <p className="mt-1 text-[14px] text-ink-2">Сейчас сервис работает в Ставрополе и пригороде.</p>
              <ul className="mt-3">
                {cities.map((c) => (
                  <li key={c}>
                    <button onClick={() => { setCity(c); setCityOpen(false); }} className="flex h-14 w-full items-center justify-between border-b border-line text-left text-[16px]">
                      {c}{c === city && <span className="flex h-6 items-center rounded-full bg-lime px-2.5 text-[12px] font-medium">Выбран</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </DrawerContent>
        </Drawer>

        <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
          <DrawerContent className="pb-safe rounded-t-[28px] border-0 bg-ivory">
            <div className="px-5 pb-6 pt-3">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-[24px] font-medium tracking-[-0.02em]">Меню</DrawerTitle>
                <Btn variant="ghost" size="icon" aria-label="Закрыть" onClick={() => setMenuOpen(false)}><X className="h-5 w-5" /></Btn>
              </div>
              <ul className="mt-2">
                {deskNav.map(([to, l]) => (
                  <li key={to}><Link to={to} onClick={() => setMenuOpen(false)} className="flex h-14 items-center border-b border-line text-[17px]">{l}</Link></li>
                ))}
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Ctx.Provider>
  );
};

export default MarketShell;
