import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Направления", href: "#направления" },
    { label: "Врачи", href: "/doctor/babenko" },
    { label: "Услуги", href: "/services/laser-co2" },
    { label: "Цены", href: "#цены" },
    { label: "О клинике", href: "#о-клинике" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border"
          : "bg-background/95 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Клиника Бабенко" className="h-10" />
        </Link>

        {/* Nav — center */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-base tracking-wide"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-base tracking-wide"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Right side — contacts + CTA */}
        <div className="hidden md:flex items-center gap-6">
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
      </div>
    </motion.header>
  );
};

export default Header;
