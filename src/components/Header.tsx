import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Направления", href: "/directions" },
  { label: "Врачи", href: "/doctors" },
  { label: "Услуги", href: "/services" },
  { label: "Цены", href: "/prices" },
  { label: "О клинике", href: "/about" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 lg:h-20 bg-background/95 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-6">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="Клиника Бабенко" className="h-8 lg:h-10" />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-base tracking-wide transition-colors relative pb-1 ${
                  isActive(item.href)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <a href="tel:+73843123456" className="flex items-center gap-2 text-primary font-medium text-base hover:opacity-80 transition-opacity">
                <Phone className="w-4 h-4" />
                +7 (3843) 123-456
              </a>
              <span className="text-xs text-muted-foreground">Пн-Вс 8:00-20:00</span>
            </div>
            <Link
              to="/appointment"
              className="bg-primary text-primary-foreground h-11 px-6 rounded-[10px] text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
            >
              Записаться
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a href="tel:+73843123456" className="w-10 h-10 flex items-center justify-center text-primary" aria-label="Позвонить">
              <Phone className="w-5 h-5" />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 flex items-center justify-center text-foreground" aria-label="Меню">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background pt-16 flex flex-col lg:hidden"
          >
            <nav className="flex-1 flex flex-col px-6 py-8">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-border">
                  <Link
                    to={item.href}
                    className={`block py-5 text-xl transition-colors ${
                      isActive(item.href) ? "text-primary font-medium" : "text-foreground active:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <div className="border-b border-border">
                <Link to="/contacts" className={`block py-5 text-xl transition-colors ${isActive("/contacts") ? "text-primary font-medium" : "text-foreground"}`}>
                  Контакты
                </Link>
              </div>
              <a href="tel:+73843123456" className="block py-5 text-xl text-primary font-medium border-b border-border">
                +7 (3843) 123-456
              </a>
            </nav>
            <div className="px-6 pb-8">
              <Link
                to="/appointment"
                className="flex items-center justify-center w-full h-14 bg-primary text-primary-foreground rounded-xl text-lg font-semibold"
              >
                Записаться на приём
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
