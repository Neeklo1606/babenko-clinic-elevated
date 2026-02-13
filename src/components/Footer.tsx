import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contacts */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>+7 (3843) 99-99-99</p>
              <p>info@clinicbabenko.ru</p>
              <p>г. Новокузнецк</p>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">График работы</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Пн — Пт: 8:00 — 20:00</p>
              <p>Сб: 9:00 — 16:00</p>
              <p>Вс: выходной</p>
            </div>
          </div>

          {/* Logo */}
          <div className="flex flex-col items-end justify-between">
            <img src={logo} alt="Клиника Бабенко" className="h-10 opacity-60" />
            <div className="flex gap-4 mt-6">
              {["VK", "TG"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all duration-200 text-xs font-semibold"
                >
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
