import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">О клинике</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">О нас</Link>
              <Link to="/doctors" className="block text-muted-foreground hover:text-primary transition-colors">Врачи</Link>
              <Link to="/about#reviews" className="block text-muted-foreground hover:text-primary transition-colors">Отзывы</Link>
              <Link to="/about#licenses" className="block text-muted-foreground hover:text-primary transition-colors">Лицензии</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">Услуги</h4>
            <div className="space-y-2 text-sm">
              <Link to="/directions/dermatology" className="block text-muted-foreground hover:text-primary transition-colors">Дерматология</Link>
              <Link to="/directions/trichology" className="block text-muted-foreground hover:text-primary transition-colors">Трихология</Link>
              <Link to="/directions/cosmetology" className="block text-muted-foreground hover:text-primary transition-colors">Косметология</Link>
              <Link to="/prices" className="block text-muted-foreground hover:text-primary transition-colors">Цены</Link>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+73843123456" className="block hover:text-primary transition-colors">+7 (3843) 123-456</a>
              <a href="mailto:info@clinicbabenko.ru" className="block hover:text-primary transition-colors">info@clinicbabenko.ru</a>
              <a href="https://wa.me/73843123456" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">WhatsApp</a>
              <p>г. Новокузнецк</p>
              <p>Пн — Пт: 8:00 — 20:00</p>
              <p>Сб: 9:00 — 16:00</p>
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-end justify-between">
            <Link to="/">
              <img src={logo} alt="Клиника Бабенко" className="h-10 opacity-60" />
            </Link>
            <div className="flex gap-4 mt-6">
              {["VK", "TG"].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all duration-200 text-xs font-semibold">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2025 Клиника Бабенко. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
