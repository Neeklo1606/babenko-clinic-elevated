import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "Направления", href: "#направления" },
    { label: "Врачи", href: "/doctor/babenko" },
    { label: "Услуги", href: "/services/laser-co2" },
    { label: "Цены", href: "#цены" },
    { label: "О клинике", href: "#о-клинике" },
  ];

  const NavLink = ({ item }: { item: typeof navItems[0] }) =>
    item.href.startsWith("/") ? (
      <Link
        to={item.href}
        onClick={() => setMenuOpen(false)}
        className="text-muted-foreground hover:text-primary transition-colors text-base tracking-wide"
      >
        {item.label}
      </Link>
    ) : (
      <a
        href={item.href}
        onClick={() => setMenuOpen(false)}
        className="text-muted-foreground hover:text-primary transition-colors text-base tracking-wide"
      >
        {item.label}
      </a>
    );

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 lg:h-20 bg-background/95 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={logo} alt="Клиника Бабенко" className="h-8 lg:h-10" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <a
                href="tel:+73843123456"
                className="flex items-center gap-2 text-primary font-medium text-base hover:opacity-80 transition-opacity"
              >
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

          {/* Mobile: phone + burger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:+73843123456"
              className="w-10 h-10 flex items-center justify-center text-primary"
              aria-label="Позвонить"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center text-foreground"
              aria-label="Меню"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
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
                  {item.href.startsWith("/") ? (
                    <Link
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-5 text-xl text-foreground active:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-5 text-xl text-foreground active:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="tel:+73843123456"
                className="block py-5 text-xl text-primary font-medium border-b border-border"
              >
                +7 (3843) 123-456
              </a>
            </nav>
            <div className="px-6 pb-8">
              <Link
                to="/appointment"
                onClick={() => setMenuOpen(false)}
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
